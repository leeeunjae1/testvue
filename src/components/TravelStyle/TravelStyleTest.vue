<template>
    <div class="survey-container">
      <header class="header">
        <h2>{{ questions[currentQuestionIndex].id }}</h2>
        <p>{{ questions[currentQuestionIndex].text }}</p>
      </header>
      <div class="content">
        <div class="radio-buttons">
          <div v-for="(option, index) in questions[currentQuestionIndex].options" :key="index">
            <input 
              type="radio" 
              :id="`option-${index}`" 
              :value="option.value" 
              v-model="selectedOption" 
              hidden
            />
            <label 
              :for="`option-${index}`" 
              class="radio-button" 
              @click="selectOption(option.value)">
              {{ option.text }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'SurveyStartPage',
    data() {
      return {
        currentQuestionIndex: 0, // 현재 질문의 인덱스
        selectedOption: null, // 선택된 옵션을 저장
        results: {
          P: 0,
          J: 0,
          S: 0,
          N: 0,
          F: 0,
          T: 0,
          E: 0,
          I: 0
        },
        questions: [ // 질문 배열
          {
            id: "Q01.",
            text: "여행을 떠날 때 계획은",
            options: [
              { text: "내가 걷는 길이 곧 여행코스", value: "P" },
              { text: "계획은 필수!", value: "J" },
            ],
          },
          {
            id: "Q02.",
            text: "여행 경비는",
            options: [
              { text: "당장 국제 거지만 안되면 되지!", value: "P" },
              { text: "걸어다니는 계산기로 변신", value: "J" },
            ],
          },
          {
            id: "Q03.",
            text: "여행을 다녀온 후",
            options: [
              { text: "스윗홈.. 침대로 점프!", value: "P" },
              { text: "캐리어를 열고 물건을 정리한다", value: "J" },
            ],
          },
          {
            id: "Q04.",
            text: "여행지에서 식사할 때",
            options: [
              { text: "유~명한 맛집을 작정하고 노리는 헌터", value: "S" },
              { text: "처음 본 순간 사랑에 빠진 길거리 가게", value: "N" },
            ],
          },
          {
            id: "Q05.",
            text: "여행에 다녀온 나는",
            options: [
              { text: "엄청난 후유증으로 다음 여행을 기다린다", value: "N" },
              { text: "사진 공유 + 다시 일상으로 .. ", value: "S" },
            ],
          },
          {
            id: "Q06.",
            text: "화려한 건축물을 보며 드는 생각은",
            options: [
              { text: "＂어떤 방법으로 지었을까?＂ 고민한다", value: "S" },
              { text: "＂와 멋있다...＂ 감탄한다", value: "N" },
            ],
          },
          {
            id: "Q07.",
            text: "아침에 늦잠 잔 친구에게",
            options: [
              { text: "＂푹 잤다 ~ 여행이 역시 피곤하지?＂", value: "F" },
              { text: "＂내일은 시간 지키자!＂", value: "T" },
            ],
          },
          {
            id: "Q08.",
            text: "여행중 친구에게 사고가 났을 경우 나의 반응은?",
            options: [
              { text: "＂괜찮아?!  다친 데는 없어?＂", value: "F" },
              { text: "＂여행자 보험 들었어?＂", value: "T" },
            ],
          },
          {
            id: "Q09.",
            text: "친구가 쓸데없는 기념품을 살 때",
            options: [
              { text: "＂그래 니가 행복하다면...＂", value: "F" },
              { text: "＂그거 쓰지도 않고 쓰레기 된다＂", value: "T" },
            ],
          },
          {
            id: "Q10.",
            text: "나는 여행지를 선택할 때 주로",
            options: [
              { text: "사람이 많은 도시로", value: "E" },
              { text: "나무가 많은 자연으로", value: "I" },
            ],
          },
          {
            id: "Q11.",
            text: "숙소를 구할 때",
            options: [
              { text: "저녁에 바비큐 파티를 여는 곳", value: "E" },
              { text: "조용하고 아늑한 곳", value: "I" },
            ],
          },
          {
            id: "Q12.",
            text: "여행지에 대한 감상을",
            options: [
              { text: "말로 내뱉어야 직성이 풀린다", value: "E" },
              { text: "내 마음 속에 저장..☆ 마음에 담고 느낀다", value: "I" },
            ],
          },
        ],
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
        this.results[option]++; // 이 부분에서 올바르게 각 결과 값에 점수를 더해야 합니다.
        // 다음 질문으로 넘어가는 로직
        // 마지막 질문이 아니라면 인덱스를 증가시킨다
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.selectedOption = null; // 선택된 옵션 초기화
        } else {
          // 마지막 질문이라면 결과 처리
          this.finishSurvey();
        }
      },
      finishSurvey() {
          // 결과 데이터 객체 생성
          const surveyResults = {
              EI: this.results.E > this.results.I ? 'E' : 'I',
              SN: this.results.S > this.results.N ? 'S' : 'N',
              FT: this.results.F > this.results.T ? 'F' : 'T',
              PJ: this.results.P > this.results.J ? 'P' : 'J',
          };

          // 결과 문자열 생성
          const styleCode = `${surveyResults.EI}${surveyResults.SN}${surveyResults.FT}${surveyResults.PJ}`;
          console.log('Survey Code:', styleCode);

          // 서버에 결과 전송
          this.updateMemberStyle(styleCode);

          // 결과 페이지로 라우팅
          this.$router.push({
              name: 'StyleResult',
              query: { surveyResults: JSON.stringify(surveyResults) }
          });
      },
      async updateMemberStyle(styleCode) {
          try {
              const response = await this.$axios.post('/api/v1/user/updateStyle', { memberStyle: styleCode });
              console.log('Update Response:', response.data);
          } catch (error) {
              console.error('Failed to update style:', error);
          }
      },
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

  .survey-container {
    background-image: url('@/assets/images/travel2.jpg'); /* 여기에 이미지 파일의 경로를 넣으세요 */
    background-size: contain; /* 이미지가 컨테이너를 꽉 채우도록 설정 */
    background-position: center; /* 이미지가 컨테이너의 중앙에 위치하도록 설정 */
    background-repeat: no-repeat; /* 이미지가 반복되지 않도록 설정 */
    background-color: #8EDFFD;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .header h2 {
    font-family: "Nanum Gothic", sans-serif;
    font-style: normal;
    color: #ffec99; /* 글자 색상 */
    font-size: 5rem; /* 글자 크기 */
    font-weight: bold; /* 글자 두께 */
    text-shadow: 
    3px 3px 0px #ffd700, /* 글자의 오른쪽과 아래쪽에 황금색 그림자 */
    -1px -1px 0 #ffd700, /* 글자의 왼쪽과 위쪽에 황금색 그림자 */
    3px 3px 15px rgba(0, 0, 0, 0.2); /* 글자 주변에 부드러운 검은색 그림자로 깊이감 추가 */
  }
    
  .header p {
  padding-top: 10px;
  padding-bottom: 20px;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  }

  .start-button {
    font-family: "Nanum Gothic", sans-serif;
    font-style: normal;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    background-color: #fff;
    border: none;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
    width: 200px;
  }
  


  .radio-buttons {
  /* 라디오 버튼을 담는 컨테이너 스타일 */
}

.radio-button {
  /* 버튼처럼 보이게 하기 위한 스타일 */
  font-family: "Nanum Gothic", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  display: block;
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 20px 10px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 500px;
  height: 65px;

}

.radio-button:hover {
    /* 호버 효과 */
    background-color: #F7C347; /* 호버 시 배경 색상 */
    color: #fff; /* 호버 시 글자 색상 */
    border-color: #F7C347; /* 호버 시 테두리 색상 */
  }



/* 숨겨진 라디오 버튼 */
input[type="radio"] {
  display: none;
}
  </style>

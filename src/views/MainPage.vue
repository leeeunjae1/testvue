<template>
  <!-- 기존 메인 이미지-->
  <!-- <div class="full-screen-background">
  </div> -->
  <div>
    <SlideMainImg class="main-vis" />
  </div>

  <div class="divider"></div>

  <div class="recommend-style">
    <h2 class="mb-3">여행스타일 추천</h2>
    <div class="main-travel-style">
      <div class="main-travel-style-txt" > 
        <div v-if="isValidStyle" style="font-size: 22px;">
          당신의 여행스타일은<span style="color: #f7c347">
            {{ getMbtiNickname() }} </span
          >입니다.
        </div>
      </div>
    </div>
    <RecommendBanner/>
  </div>


    <div class="recommand-card"></div>
  <div class="divider"></div>

  <div class="chat">
    <div class="recommand-card">

      <div :class="['card horizontal_card', { 'is-hovering': hoverActive }]">
          <div class="card_content">

            <div class="card_front">
                <div class="left_section">
                   동행자를<br/> 찾는것이 목적지보다<br/> <span style="color:#FFC83B; font-weight:bold; font-size:30px;">어렵다고<br/> 느껴지나요?</span>
                </div>
                <div class="right_section">
                  <img :src="require('@/assets/images/alone.jpg')" alt="Report" style="width: 350px; height: 350px; margin-left: 10px;
                   border-top-right-radius: 7px; border-bottom-right-radius: 5px;">
                </div>
            </div>

            <div class="card_back">
                <div class="left_section">
                   같은 여행 스타일의 <br/> 친구들과 <br/><span style="color:#3ba7ff; font-weight:bold; font-size:30px;"> 만나보세요!</span>
                </div>
                <div class="right_section">
                  <img :src="require('@/assets/images/surfing1.jpg')" alt="Report" style="width: 350px; height: 350px; margin-left: 10px;
                   border-top-right-radius: 7px; border-bottom-right-radius: 5px;">
                </div>
            </div>

          </div>
      </div>

      <div class="right-banner">
        <div>
        <p class="right-banner-header">나의 여행 메이트</p>
        </div>
        <div>
          <p class="right-banner-subtitle">비슷한 여행취향, 완벽한 동행</p>
        </div>
        <div>
          <p class="right-banner-subtitle">이제 여행 메이트 매칭으로 더 즐거운 여행을 시작하세요.</p>
        </div>
        <router-link to="/chatting">
          <div class="fancy_text" 
              @mouseover="hoverActive = true" 
              @mouseleave="hoverActive = false">
              여행메이트 찾으러가기 >>
          </div>
        </router-link>
      </div>

    </div>
  </div>
  <div class="divider" ></div>
  <div class="my-travel-course">
    <h2 class="mb-3">나만의 여행 코스</h2>
    <MyCourse />
  </div>

  <div class="divider" ></div>
  <div class="travel-course">
    <div class="recommand-card">
      <div class="taste-review-banner">
          <div class="banner-content">
              <h1>제주도민 평가단 모집</h1>
              <p>내가 가는곳이 핫 플레이스!(꾸며야함)</p>
              <button class="btn-join">지금 신청하기</button>
          </div>
      </div>
    </div>
  </div>
  <div class="divider" ></div>

  <div class="divider"></div>
  <CarouselBanner />
  <div class="divider"></div>

  <div class="travel-course">
    <LatestReviews />
  </div>
  <div class="divider"></div>
</template>

<script>

import LatestReviews from "../components/Review/LatestReviews.vue";
import SlideMainImg from "../components/MainPage/SlideMainImg.vue";
import CarouselBanner from "../components/MainPage/CarouselBanner.vue";
import MyCourse from "../components/MainPage/MyCourse.vue";
import RecommendBanner from "../components/MainPage/RecommendBanner.vue";
// @ is an alias to /src
/* eslint-disable */
export default {
  name: "MainPage",
  components: { 
    LatestReviews,
    SlideMainImg,
    SlideMainImg,
    CarouselBanner,
    MyCourse,
    RecommendBanner
  },
  
  data(){
    return {
      memberStyle: '로딩 중...', // 초기값 설정
      mbtiNicknames: { // MBTI 별명 매핑
        "ISFJ": "여행한정 인싸",
        "INFJ": "감성 여행자",
        "INTJ": "효율 계획러",
        "ISTJ": "프로 엑셀러",
        "ISFP": "힐링 여행러",
        "INFP": "로맨틱 여행파",
        "INTP": "한적 스팟러",
        "ISTP": "프로 혼행러",
        "ESFJ": "프로 핫스팟러",
        "ENFJ": "프로 여행러",
        "ENTJ": "효율 로보트",
        "ESTJ": "엑셀 마스터",
        "ESFP": "여행 즉흥론자",
        "ENFP": "여행 무계획러",
        "ENTP": "위기탈출 넘버원",
        "ESTP": "프로 플렉서"
      },
      hoverActive: false, // hover 상태를 추적하는 데이터
    };
  },

  computed: {
    isValidStyle() {
      // MBTI 스타일 문자열의 유효성 검사를 안전하게 수행
      return Object.prototype.hasOwnProperty.call(this.mbtiNicknames, this.memberStyle);
    }
  },

  mounted() {
    this.fetchUserInfo();
  },

  methods: {
    async fetchUserInfo() {
      try {
        const response = await this.$axios.get("/api/v1/user/info/detail");
        this.$store.commit("auth/SET_USER_NAME", response.data.userName);
        this.$store.commit("auth/SET_USER_IMAGE", response.data.images);
        this.memberStyle = response.data.memberStyle; // 스타일 정보를 로컬 데이터에 저장
        console.log("API response:", response.data); // API 응답 로깅
      } catch (error) {
        console.error("인증된 사용자가 아닙니다. : ", error);
        this.memberStyle = '정보를 불러올 수 없습니다'; // 에러 처리 추가
      }
    },
    getMbtiNickname() {
      return this.mbtiNicknames[this.memberStyle] || '알 수 없는 스타일';
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/mainpage_style.css";

/* 공통 스타일 */
.card {
  position:relative;
  width: 150px;
  height: 350px;
  margin: 20px;
  perspective: 900px;
  border: 10px;
  margin-right: 60px;
} 
.card .card_content {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px; transition: transform 1s;
  transform-style: preserve-3d;
} 

.left_section,
.right_section {
    flex: 1; /* 두 섹션이 동일한 너비를 갖도록 설정합니다 */
}

.left_section{
  padding-left: 10px;
  padding-right: 10px;
}

.right_section {
    border-right: none; /* 오른쪽 섹션의 경계선을 제거합니다 */
}

.card:hover .card_content {
  transition: transform 0.5s;
} 

.card .card_front,.card .card_back {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffd8581b;
  border-radius: 10px;
  font-size: 20px;
  color: #FFC83B;
  text-align: center;
  backface-visibility: hidden;
} 

.card .card_back {
  background: #3ba7ff3a;
  color: #3ba7ff;
} 

/* 가로로 뒤집히는 카드 */
.horizontal_card:hover .card_content {
  transform: rotateY(180deg);
} 

.horizontal_card .card_back {
  transform: rotateY(180deg);
} 

.horizontal_card.is-hovering .card_content {
  transform: rotateY(180deg);
}

.right-banner{
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로로 배치 */
  text-align: start;
  margin-left: 50px;
  padding-top: 20px;
}

.right-banner-header{
  font-size:28px;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
}

.right-banner-subtitle{
  font-size:22px;
  font-weight: 400;
  margin-bottom: 15px;
}

.fancy_text {
    margin-top: 80px;
    font-size: 24px; /* 텍스트 크기 */
    color: #ffffff; /* 텍스트 색상 */
    background: linear-gradient(45deg, #ffe4a0, #FFC83B); /* 배경 그라디언트 */
    padding: 10px 20px; /* 내부 여백 */
    border-radius: 8px; /* 둥근 테두리 */
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6); /* 그림자 효과 */
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4); /* 텍스트 그림자 */
    font-weight: bold; /* 글자 굵기 */
    display: inline-block; /* 올바른 패딩과 배경을 위해 */
    transition: all 0.3s ease; /* 부드러운 전환 효과 */
}

.fancy_text:hover {
    transform: scale(1.1); /* 마우스 오버 시 텍스트 확대 */
    cursor: pointer; /* 마우스 커서 모양 변경 */
     background: linear-gradient(45deg, #abd9ff, #3ba7ff); /* 배경 그라디언트 */
}

.taste-review-banner {
    background-image: url('@/assets/images/orange.jpg'); /* 배경 이미지 설정 */
    background-size: cover; /* 배경 이미지를 배너 크기에 맞게 조정 */
    text-align: center; /* 텍스트 중앙 정렬 */
    color: white; /* 텍스트 색상 */
    padding: 50px 20px; /* 상하, 좌우 패딩 설정 */
    width: 100%;
}

.banner-content {
    max-width: 600px; /* 최대 너비 설정 */
    margin: 0 auto; /* 가운데 정렬 */
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 추가 */
    padding: 20px; /* 내부 여백 */
    border-radius: 10px; /* 테두리 둥글게 */
}

.banner-content h1 {
    margin-bottom: 20px; /* 제목과 내용 사이의 여백 */
    font-size: 36px; /* 제목 글자 크기 */
}

.banner-content p {
    font-size: 18px; /* 본문 글자 크기 */
    margin-bottom: 30px; /* 본문과 버튼 사이의 여백 */
}

.btn-join {
    font-size: 20px; /* 버튼 글자 크기 */
    padding: 10px 20px; /* 버튼 패딩 */
    background-color: #f76c6c; /* 버튼 배경 색상 */
    color: white; /* 버튼 글자 색상 */
    border: none; /* 테두리 제거 */
    border-radius: 5px; /* 버튼 테두리 둥글게 */
    cursor: pointer; /* 마우스 오버 시 커서 변경 */
    transition: background-color 0.3s; /* 색상 변화 애니메이션 */
}

.btn-join:hover {
    background-color: #fa8072; /* 마우스 오버 시 버튼 색상 변경 */
}
</style>

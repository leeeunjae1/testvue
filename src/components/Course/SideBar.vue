<template>
  <div class="container">
    <VueResizable
        class="left-area"
        :max-width="Infinity"
        :active="['r']"
        v-if="isVisibleSideBar">
        <!-- <div class="bottom-btn-area">
          <Button class="save-btn" @click="saveReview">
            저장
          </Button>
        </div> -->

        <!-- 장소 카드 -->
      <div class="card-container">
        <div class="card-header">
          <h2><input style="text-align:center;" placeholder="장소 이름" v-model="title"  :readonly="true"/></h2>
          <p><Input style="text-align:center;" placeholder="주소 | 카테고리" :value="addressCopy" @input="updateAddress" :readonly="true" /> <span class="category">{{ category }}</span></p>
        </div>

        <div class="card-body">
          <div class="image-gallery">
            <div class="image-area">
              <div class="iw-file-input">
                <img :src="image" alt="Uploaded Image" v-if="image"/>
              </div>
            </div>
          </div>
          <div class="tags">
            <span class="tag-label">{{ mapTag }}</span>
            <span class="budget-label">예산: {{ budget }}</span>
          </div>
      
          <div class="rate-area">
            <FormRating :grade="grade" :readOnly="true"/>
          </div>
        </div>


        <div class="card-footer">
          <span class="review-span" >{{ review }}</span>
        </div>
      </div>

    </VueResizable>

  </div>

</template>
<script>
import VueResizable from 'vue-resizable';
import { EventBus } from '@/EventBus'; // EventBus를 가져옵니다.
import FormRating from './FormRating';
export default {
name: 'SideBar',
components: {
  VueResizable,
  FormRating
},
props: {
  address: String,
  value: String // MainMap 컴포넌트에서 전달된 주소 데이터
},
data() {
  return {
    isVisibleSideBar: true,
    addressCopy: '', // 초기화를 제거합니다.
    title: '',
    grade: 0,
    review: '',
    lonCopy: 0.0,
    latCopy: 0.0,
    image: '',
    mapTag: '#',
    date: '',
    budget: 0,
    dates: [],
    budgetSummary: {},
    category: '',
  };
},
mounted() {
    EventBus.$on('mapClick', (data) => {
        this.title = data.title || '';
        this.addressCopy = data.address || '';
        this.grade = data.grade || 0;
        this.review = data.review || '';
        this.lonCopy = data.lonCopy;
        this.latCopy = data.latCopy;
        this.image = data.image || '';
        this.mapTag = data.mapTag ? data.mapTag.map(tag => `#${tag}`).join(' ') : '';
        this.course = data.course || '';
        this.budget = data.budget || 0;
        this.category = '  |  '+data.category|| '';
    });
},
methods: {
  onChangeFiles(e) {
    this.fileList.push(...e.target.files);
    console.log(this.fileList);
  },
  
  updateAddress(event) {
    this.$emit('update:address', event.target.value);
  },
  // saveReview() {
  //   try{
  //   this.$axios.post('https://jejurang.site/api/map/saveMap', {
  //     title: this.title,
  //     addressCopy: this.addressCopy,
  //     grade: this.grade,
  //     review: this.review,
  //     lonCopy: this.lonCopy,
  //     latCopy: this.latCopy,
  //     image: this.image,
  //     category: this.category,
  //     course: this.course
  //   }).then(response => {
  //     console.log('저장 성공:', response);
  //   })
  // }catch(error){
  //   console.error("저장하기 에러" + error);
  // }
  // } 
},
}
</script>
<style lang="scss" scoped>

.container {
    display: flex;
    justify-content: flex-start; /* 자식 요소들을 컨테이너의 시작 부분에서 정렬 */
    align-items: stretch; /* 자식 요소들이 컨테이너를 꽉 채우도록 늘림 */
    /* flex-direction: column; 제거 또는 아래로 변경 */
    flex-direction: row; /* 자식 요소들을 가로로 나란히 배치 */
    max-width: 1200px;
  }
  
  .left-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; /* 필요하다면 */
  }
  
  .card-container, .card-header, .card-body, .card-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; /* 내부 컨테이너들이 left-area의 전체 너비를 차지하도록 */
  }
  
  .image-gallery, .tags, .rate-area {
    display: flex;
    justify-content: center;
    width: 100%; /* 이미지, 태그, 평점 영역이 각각 가운데 정렬되도록 */
  }
  
  .review-span {
    text-align: center;
    display: block; /* span을 블록 레벨 요소처럼 보이게 함 */
    white-space: pre-wrap; /* 공백과 줄바꿈을 유지 */
    overflow-wrap: break-word; /* 긴 단어가 넘치지 않도록 줄바꿈 */
    margin: 10px 0; /* 위아래 마진 추가 */
    padding: 10px; /* 패딩 추가 */
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 4px; /* 둥근 테두리 모양 */
    min-height: 100px; /* 최소 높이 */
    width: 100%; /* 너비 */
    font-size: 22px;
    border: none;
    color:#444444;
  }
  
  .tag-label {
    margin-left: 90px;
    margin-right: 70px; /* 오른쪽에 20px의 공간을 추가 */
  }
  
  .budget-label {
    
    margin-left: 80px; /* 왼쪽에 20px의 공간을 추가 */
  }
  
   .bottom-btn-area {
    text-align: right;
    padding-right: 10px;
    > .save-btn {
        color: #fff;
        font-weight: bold;
          background-color: #ee9e06;
    }
  }
  
  .card-container {
    width: 100%; /* 또는 원하는 너비 */
    height: 600px;
    border: 1px solid #ddd; /* 경계선 스타일 */
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    overflow: hidden; /* 자식 요소들이 테두리 밖으로 넘어가지 않게 함 */
    background-color: #fff; /* 배경색 */
  }
  
  .card-header, .card-footer {
    padding: 15px;
  }
  
  .card-header > h2 {
    margin: 0;
    color: #444444; /* 제목 색상 */
    font-size: 2.5rem; /* 제목 크기 */
  }
  
  .card-header > p {
    margin: 5px 0 0; /* 상단에 여백, 나머지는 0 */
    color: #444444; /* 문단 색상 */
    font-size: 20px;
  }
  .card-header{
    background: linear-gradient(to top, #f2eee5 40%, #e5c1c5 100%);
  }
  
  .card-body {
    padding: 15px;
    background: linear-gradient(to top, #c3e2dd 20%, #f2eee5 100%);
  }
  
  .card-footer {
    background: linear-gradient(to top, #6eceda 10%, #c3e2dd 100%);
  }
  
  .image-gallery {
    display: flex;
    justify-content: space-around; /* 이미지 간격 동일하게 */
  }
  
  .image-gallery img {
    border-radius: 20px; /* 이미지 모서리 둥글게 */
    width: 300px; /* 이미지 너비 */
    height: 260px; /* 이미지 비율 유지 */
    margin: 0 5px; /* 이미지 사이 여백 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자를 추가하여 입체적인 느낌을 강조 */
  }
  
  .tags {
    margin-top: 10px;
  }
  
  .tags span {
    display: inline-block;
    background-color: #eee; /* 태그 배경색 */
    border-radius: 16px; /* 태그 모서리 둥글게 */
    padding: 5px 10px; /* 태그 패딩 */
    margin: 5px; /* 태그 간 여백 */
    font-size: 1.25em; /* 태그 폰트 크기 */
    border: 1px solid #ccc; /* 경계선을 추가하여 더욱 입체적으로 보이도록 함 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자를 추가하여 입체적인 느낌을 강조 */
    transition: transform 0.3s, box-shadow 0.3s; /* 상호작용에 대한 시각적 피드백을 위해 트랜지션 추가 */
  }
  
  .tags span:hover {
    transform: translateY(-2px); /* 마우스를 올렸을 때 태그가 약간 떠오르는 효과 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 마우스 호버 시 그림자를 강조하여 더 입체적으로 보임 */
  }
  
  
  .card-footer {
    display: flex;
    justify-content: space-between; /* 푸터 내부 요소 간격 동일하게 */
    align-items: center; /* 푸터 내부 요소 세로 중앙 정렬 */
    padding: 10px 15px;
  }
  
  .card-footer button {
    padding: 5px 10px;
    border-radius: 4px; /* 버튼 모서리 둥글게 */
    border: none;
    cursor: pointer; /* 클릭 가능하게 */
  }
  .card-header Input {
    border: none; /* 테두리 제거 */
    outline: none; /* 클릭 시 나타나는 아웃라인 제거 */
    background: transparent; /* 배경색 투명으로 설정 */
    color: inherit; /* 부모 요소로부터 색상 상속 */
    font-family: inherit; /* 부모 요소로부터 폰트 상속 */
    font-size: inherit; /* 부모 요소로부터 폰트 크기 상속 */
    padding: 0; /* 내부 패딩 제거 */
    margin: 0; /* 외부 마진 제거 */
  }
  
  .card-header Input[readonly] {
    pointer-events: none; /* 읽기 전용 입력란에서 마우스 이벤트 제거 */
    cursor: default; /* 커서 스타일 기본으로 설정 */
  }
  
  
</style>
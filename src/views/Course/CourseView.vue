<template>
  <div id="app">
    <div class="content-wrapper">
      <h1>제주랑이 소개하는 <span class="highlight">추천코스</span></h1>
      <div class="mainMap">
        <MainMap/>
      </div>
      <div class="sideBar">
        <SideBar class="side-bar"/>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import MainMap from '@/components/Course/MainMap'
  import SideBar from '@/components/Course/SideBar'
  
  export default {
    name: 'App',
    components: {
      MainMap,
      SideBar
    }
  }
  </script>
  
  <style scoped>

    
  #app {
    display: flex; /* Flex 컨테이너로 설정 */
    flex-direction: column; /* 자식 요소들을 세로로 배치 */
    align-items: center; /* 모든 자식 요소들을 가로 축 중앙에 정렬 */
    justify-content: center; /* 모든 자식 요소들을 세로 축 중앙에 정렬 */
    padding-top: 85px;
    width: 100%; /* 컨테이너 너비 전체 사용 */
    height: 2000px;
    background-color: #8EDFFD;
  }
  .content-wrapper {
    width: 70%; /* 중앙 컨텐츠 영역의 너비 */
    height:100%;
    background-color: #FFFFFF; /* 중앙 컨텐츠 영역의 배경색 */
    box-shadow: 5px 5px 15px #1275D64d; /* 선택적으로 그림자 추가 */
    padding: 20px; /* 내부 여백 */
    display: flex; /* 플렉스박스를 사용 */
    flex-direction: column; /* 자식 요소들을 위에서 아래로 배치 */
    align-items: center; /* 가로축을 기준으로 중앙 정렬 */
    justify-content: center; /* 세로축을 기준으로 중앙 정렬 */
    background: linear-gradient(135deg, #f2f2f2, #8EDFFD);
  }

  .mainMap, .sideBar {
    margin-bottom: 20px; /* 요소들 사이의 여백 설정 */
  }
   .sideBar {
    width: 100%; /* mainMap과 sideBar의 너비를 전체의 80%로 설정 */
  }
  
  .h1 {
    margin-bottom: 20px; /* 제목과 다음 요소 사이의 여백 */
  }
  .highlight {
    color: #F7C347; /* 예시 색상, 원하는 색상 코드로 변경 가능 */
    font-size: 45px;
  }
  </style>
  
  
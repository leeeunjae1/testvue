<template>
    <div class="survey-container">
      <!-- 배경색이 적용된 전체 컨테이너 -->
      <header class="header">
        <!-- 페이지 상단 부분 -->
        <h1>MBTI로 알아보는</h1>
        <h1>여행스타일</h1>
        <p>나만의 여행스타일은?</p>
      </header>
      <div class="content">
        <!-- 메인 컨텐츠 부분 -->
        <router-link to="/traveltest">
        <button class="start-button">알아보러 가기</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Vue 컴포넌트의 스크립트 부분
    name: 'SurveyStartPage',
    // 컴포넌트의 데이터와 메소드를 정의할 수 있습니다.
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
  
  .header h1 {
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
  
  .start-button:hover {
    transform: scale(1.05);
  }
  
  .header p {
  padding-top: 40px;
  padding-bottom: 20px;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 30px;
  }
  </style>
  
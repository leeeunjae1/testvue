<template>
    <div class="course-cards-container">
      <div
        class="course-card"
        v-for="card in cards"
        :key="card.id"
        :style="{ backgroundImage: 'url(' + card.imageUrl + ')' }"
        @click="goTo(card.link)"
      >
        <div class="course-card-content">
          <p v-html="card.title"></p>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          {
            id: 1,
            title: '여행은 계획에서 시작,',
            description: '당신의 일정에 맞춤',
            imageUrl: require('@/assets/images/mybn01.jpg'),
            link: '#'
          },
          {
            id: 2,
            title: '제주랑',
            description: '여행 모든 것을 한곳에서',
            imageUrl: require('@/assets/images/mybn03.jpg'),
            link: '#'
          },
          {
            id: 3,
            title: '제주의 밤을 책임질 ',
            description: '숙소 정보 여기에 모였다',
            imageUrl: require('@/assets/images/mybn02.jpg'),
            link: '#'
          },
          {
            id: 4,
            title: '나만의 여행 코스',
            description: '한눈에 쉽게 확인하세요',
            imageUrl: require('@/assets/images/mybn04.jpg'),
            link: '#'
          }
          // 다른 카드 객체들을 여기에 추가할 수 있습니다.
        ]
      };
    },
    methods: {
      goTo(url) {
        window.location.href = url;
      }
    }
  };
  </script>
  
  <style scoped>
  @import "@/assets/css/mainpage_style.css";
  </style>
  
<template>
    <ul class="recommend-card-list">
      <li class="recommend-card" v-for="item in recommendItems" :key="item.id">
        <span class="best">BEST</span>
        <div class="img_scale">
          <div class="img_wrap" :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }"></div>
        </div>
        <div class="recommend-info">
          <em>{{ item.duration }}</em>
          <div class="recommend-info-contents">
            <strong>{{ item.title }}</strong>
            <span class="area">{{ item.location }}</span>
            <span>{{ item.date }}</span>
          </div>
        </div>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recommendItems: [
          {
            id: 1,
            imageUrl:  require('@/assets/images/img01.jpg'),
            duration: '구경할 곳',
            title: '성산 일출봉',
            location: '제주시',
            date: '쉬어갈 곳'
          },
          {
            id: 2,
            imageUrl:  require('@/assets/images/img02.jpg'),
            duration: '가볼만한 곳',
            title: '오셜록 뮤지엄',
            location: '서귀포시',
            date: '쉬어갈 곳'
          },
          {
            id: 3,
            imageUrl:  require('@/assets/images/img03.jpg'),
            duration: '쉬어갈 곳',
            title: '바당차차 민박',
            location: '성산읍',
            date: '쉬어갈 곳'
          },
        ]
      };
    },
  };
  </script>
  
  <style scoped>
  @import "@/assets/css/mainpage_style.css";
  </style>
  
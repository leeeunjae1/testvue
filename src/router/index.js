// eslint-disable-next-line
/* eslint-disable */

import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import ChattingView from '../views/Chat/ChattingView.vue'
import ReviewBoard from '../views/Review/ReviewBoard.vue'
import ChatRoom from '../views/Chat/ChatRoom.vue';
import RecommendList from '../views/Recommend/RecommendList.vue'
import RecommendListFood from '../components/RecommendList/RecommendListFood.vue' 
import RecommendListHotel from '../components/RecommendList/RecommendListHotel.vue' 
import RecommendListPlace from '../components/RecommendList/RecommendListPlace.vue' 
import RecommendListEvent from '../components/RecommendList/RecommendListEvent.vue' 
import RecommendDetail from '../views/Recommend/RecommendDetail.vue'
import RecommendDetailFood from '../components/RecommendDetail/RecommendDetailFood.vue'
import RecommendDetailPlace from '../components/RecommendDetail/RecommendDetailPlace.vue'
import RecommendDetailHotel from '../components/RecommendDetail/RecommendDetailHotel.vue'
import RecommendDetailEvent from '../components/RecommendDetail/RecommendDetailEvent.vue'
//import RecommendList from '../views/RecommendListPlace.vue' 
import MainMap from '@/components/Course/MainMap.vue'
import CourseView from '../views/Course/CourseView.vue'
import TravelStyle from '@/views/TravelStyle/TravelStyle.vue';
import TravelStyleTest from '@/components/TravelStyle/TravelStyleTest.vue'
import StyleResult from '@/components/TravelStyle/StyleResult.vue'
import SocialSignUp from'@/views/SocialSignUp.vue'
import MonthCalendar from '../views/schedule/MonthCalendar.vue'
import PlanCourse from '../views/schedule/PlanCourse.vue'



const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/result',
    name: 'StyleResult',
    component: StyleResult,
    props: true // 이렇게 설정하면 모든 params가 props로 전달됩니다.
  },
  {
    path: '/travel',
    name: 'TravelStyle',
    component: TravelStyle
  },
  {
    path: '/traveltest',
    name: 'TravelStyleTest',
    component: TravelStyleTest
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: ReviewBoard
  },
  {
  path: '/schedule',
    name: 'schedule',
    component: MonthCalendar
  },

  {
    path: '/plancourse',
      name: 'plancourse',
      component: PlanCourse
  },

  {
    path: '/course',
    name: 'course',
    component: CourseView
  },
  {
    path: '/mainmap',
    name: 'mainmap',
    component: MainMap
  },
  {
    path: '/list',
    name: 'RecommendList',
    component: RecommendList
  },
  {
    path: '/listfood',
    name: 'listfood',
    component: RecommendListFood
  },
  {
    path: '/listplace',
    name: 'listplace',
    component: RecommendListPlace
  },
  {
    path: '/listhotel',
    name: 'listhotel',
    component: RecommendListHotel
  },
  {
    path: '/listevent',
    name: 'listevent',
    component: RecommendListEvent
  },
  {
    path: '/detail',
    name: 'recommenddetail',
    component: RecommendDetail
  },
  {
    path: '/detailfood/:recommendFoodId',
    name: 'detailfood',
    component: RecommendDetailFood,
    props: true  // 이를 통해 라우트 파라미터를 prop으로 전달합니다.
  },
  {
    path: '/detailplace/:recommendPlaceId',
    name: 'detailplace',
    component: RecommendDetailPlace,
    props: true
  },
  {
    path: '/detailhotel/:recommendHotelId',
    name: 'detailhotel',
    component: RecommendDetailHotel,
    props: true
  },
  {
    path: '/detailevent/:recommendEventId',
    name: 'detailevent',
    component: RecommendDetailEvent,
    props: true
  },
  {
    path: '/chatting',
    name: 'chatting',
    component: ChattingView
  },
  {
    path: '/chat/room/:roomId', // 동적 세그먼트를 사용한 경로
    name: 'ChatRoom',
    component: ChatRoom,
    props: true // 컴포넌트에 URL 파라미터를 props로 전달
  },
  {
    path: '/social', // 동적 세그먼트를 사용한 경로
    name: 'SocialSignUp',
    component: SocialSignUp,
  },
  // {
  //   path: '/social', // 이 경로는 카카오 개발자 콘솔에 설정한 리디렉트 URI와 일치해야 합니다.
  //   component: () => import('@/views/SocialSignUp.vue') // OAuth2 콜백을 처리할 컴포넌트
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
});

export default router
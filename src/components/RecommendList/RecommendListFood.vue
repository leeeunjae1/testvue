// eslint-disable-next-line
/* eslint-disable */

<template>
  <div>
      <div class="recomemnd_info">
        <div class="info_contents">
          <div>
            <h4 style="font-weight: 900;">제주도 음식점 리스트</h4>
            <span style="font-weight: 900;">음식점 추천 태그</span>
          </div>
          <div class="tag-wrap">
             <!-- paging 처리  1 -->
              <button type="button" class="btn btn-outline-dark"
                  :class="{ 'active': selectedTag === '' }"
                  @click="selectTag('')">전체</button>
              <button type="button" class="btn btn-outline-primary"
                  :class="{ 'active': selectedTag === '한식' }"
                  @click="selectTag('한식')">한식</button>
              <button type="button" class="btn btn-outline-primary"
                  :class="{ 'active': selectedTag === '중식' }"
                  @click="selectTag('중식')">중식</button>
              <button type="button" class="btn btn-outline-primary"
                  :class="{ 'active': selectedTag === '일식' }"
                  @click="selectTag('일식')">일식</button>
              <button type="button" class="btn btn-outline-primary"
                  :class="{ 'active': selectedTag === '양식' }"
                  @click="selectTag('양식')">양식</button>
              <button type="button" class="btn btn-outline-primary"
                  :class="{ 'active': selectedTag === '분식' }"
                  @click="selectTag('분식')">분식</button>
              <button type="button" class="btn btn-outline-primary"
                  :class="{ 'active': selectedTag === '카페' }"
                  @click="selectTag('카페')">카페</button>
              <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '디저트' }"
              @click="selectTag('디저트')">디저트</button>
              <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '혼저옵서개' }"
              @click="selectTag('혼저옵서개')">혼저옵서개</button>
              <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '반려동물동반입장' }"
              @click="selectTag('반려동물동반입장')">반려동물동반입장</button>    
          </div> <!-- tag-wrap-->
        </div>
        <div>
          <img alt="map" src="@/assets/images/map.png" style="width:160px">
        </div>
      </div> <!--recomemnd_info -->

      <div class="content_list">
        <div style="width: 820px; margin: 16px auto; text-align:left;">
            <span class="headline2" >추천 맛집</span>
            <span style="margin-left: 5px;">제주랑 고객님들이 엄선한 맛집 입니다</span>
        </div>
        <div class="card-wrap">
          <div :key="i" v-for="(food, i) in filteredFoods">
            <!-- 상세페이지 이동 -->
            <div @click="goToDetail(food.recommendFoodId)" class="card">
              <div class="card-image">
                <img :src="food.recommendFoodImgPath || 'default-image-url'" alt="Review Image">
                <!-- <div class="score">{{ food.recommendFoodStar }}</div> -->
              </div>
              <div class="card-content">
                <div class="card-title-wrap">
                  <div class="card-title">{{ food.recommendFoodTitle }}</div>
                  <!-- 영업시간 -->
                  <div>
                    <span class="status" :class="getStatusClass(food.recommendFoodClosetime)">
                        {{ getStatusMessage(food.recommendFoodClosetime) }}
                    </span>
                  </div>
                </div>
                <div class="card-option-blue">{{ food.recommendFoodRegion }}</div>
                <div class="card-subtitle">{{ food.recommendFoodIntroduction }}</div>
                <div class="card-option">{{ food.recommendFoodTag }}</div>
              </div> <!-- card-content -->
            </div> <!-- goToDetail -->
          </div> <!-- v-for -->
        </div> <!-- card-wrap -->
      </div> <!-- content_list -->
      <!-- paging 처리  2 컴포넌트 불러오기 -->
      <PaginationComponent
          :total-pages="totalPages"
          :current-page="currentPage"
          :current-tag="selectedTag"
          @changePage="gotoPage"
        />
  </div>
</template>

<script>
/* eslint-disable */
import PaginationComponent from './PaginationComponent.vue';

export default {
  name: 'RecommendListFood',
  components: {
    PaginationComponent
  },
  props:{
    region: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      loading: false,
      recommendListFood: [],
      selectedRegion: this.region, // prop을 직접 사용
      selectedTag: '',  // 초기값으로 '전체' 태그 활성화
      currentPage: 1, // currentPage로 업데이트
      totalPages: 0,
      pageSize: 12  // 페이지 크기 정의
    };
  },
  //created, mounted
  methods: {
    gotoPage(pageNumber) {
    if (this.currentPage !== pageNumber) {
      this.currentPage = pageNumber;
      this.fetchData(); // 데이터를 다시 불러오도록 함수 호출
      console.log(`Page updated to: ${pageNumber}`); // 로그 출력으로 확인
      }
    },
    //api axios 요청
    fetchData() {
      this.loading = true; // 데이터 요청 시작 시 로딩 상태 활성화
        const params = {
        page: this.currentPage - 1,  // Ensure page is zero-indexed if backend expects it
        size: this.pageSize, // pageSize 사용
        sort: "recommendFoodId,desc",
        tag: this.selectedTag,
        region: this.selectedRegion // prop을 직접 사용
    };

    // 요청 파라미터 로그로 확인
    console.log('Requesting data with params:', params); 
    
  // Axios 요청에 params 적용
  this.$axios.get(`/api/recommend/listfood`, { params })
  .then((response) => {
        if (response.data.content.length === 0) {
          console.error('No data returned for the page:', this.currentPage);
          this.recommendListFood = [];
          this.totalPages = 0;
          this.loading = false;
        } else {
          this.recommendListFood = response.data.content.map(item => {
            const tags = item.recommendFoodTag.split(',');
            // 태그가 3개 이상인 경우, 처음 3개만 선택
            if (tags.length > 3) { 
              item.recommendFooodTag = tags.slice(0, 3).join(', ');
            }
            // recommendPlaceTag의 길이 줄임 처리
            if (item.recommendFoodTag.length > 14) {
              item.recommendFoodTag = item.recommendFoodTag.slice(0, 14) + '.';
            }
            // 음식점 소개가 24글자 이상인 경우, 줄임말 처리
            if (item.recommendFoodIntroduction.length > 30) {
              item.recommendFoodIntroduction = item.recommendFoodIntroduction.substring(0, 30) + '...';
            }
            // 음식점 이름 줄이기 
            if (item.recommendFoodTitle.length > 6) {
              item.recommendFoodTitle = item.recommendFoodTitle.substring(0, 6) + '.';
            }
            return item;
          });
          this.totalPages = response.data.totalPages;
          this.loading = false; // 데이터 로딩 완료
          console.log("데이터요청 성공: ", response.data);
        }
      })
      .catch((error) => {
          // 요청 중 에러 발생
          console.error("에러났어요 : " + error);
          this.loading = false; // 에러 발생 시 로딩 상태 비활성화
    });
  },
  selectTag(tag) { //태그 필터링
      this.selectedTag = tag; // 선택된 태그 업데이트
      this.currentPage = 1;
      this.fetchData(); // 필요하다면 데이터를 다시 가져옵니다
  },
    //영업중, 영업마감
    isOperating(closeTime) {
      if (!closeTime) return '휴무일'; // 휴무일 처리
      
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const [closeHours, closeMinutes] = closeTime.split(':').map(Number);

      if (currentHours < closeHours || (currentHours === closeHours && currentMinutes < closeMinutes)) {
        return '영업중';
      } else {
        return '영업마감';
      }
    },
    getStatusClass(closeTime) {
      const status = this.isOperating(closeTime);
      return {
        'card-opentime': status === '영업중',  // '영업중'에 해당하는 CSS 클래스
        'card-closetime': status === '영업마감' // '영업마감'에 해당하는 CSS 클래스
      };
    },
    getStatusMessage(closeTime) {
      return this.isOperating(closeTime);
    },
      goToDetail(recommendFoodId) {
      if (!recommendFoodId) {
        console.error("Error: recommendFoodId 찾을 수 없음");
        return; // recommendFoodId가 정의되지 않았다면, 유효한 ID 없이 네비게이션을 시도하지 않도록 조기 반환합니다.
      }
      console.log("이동 할 recommendFoodId:", recommendFoodId);
      this.$router.push({ name: 'detailfood', params: { recommendFoodId } });
    } //goToDetail
  },
    computed: {
    filteredFoods() {
      return this.recommendListFood.filter(food => {
        return (!this.region || food.recommendFoodRegion === this.region) &&
              (!this.selectedTag || food.recommendFoodTag.includes(this.selectedTag));
      });
    }
  },
  watch: {
    region(newVal) {
      this.selectedRegion = newVal; // prop 변경 시 selectedRegion 업데이트
      this.currentPage = 1;
      this.fetchData();
      }
    },
  mounted() {
      this.fetchData(); //컴포넌트가 마운트 될 때 데이터를 가져옴
    },
};
</script>

<style scoped>
@import "@/assets/css/recommendList_style.css";
</style>

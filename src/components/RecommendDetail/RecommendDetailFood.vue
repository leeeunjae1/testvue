<template>
    <div id="container-wrap">
        <!-- 헤더 크기만큼 패딩 -->
        <div class="divider" ></div>
        <div id="container-wrap" class="div-cont">
            <div id="contents">
              <div :key="i" v-for="(food, i) in recommendListDetailFood">
                <div id="subleft-cont">
                    <div id="div_profile">
                            <div class="cont-main"  >
                                <div >
                                    <img :src="food.recommendFoodImgPath || 'default-image-url'" alt="Review Image">
                                </div>
                                <div class="detail-content">
                                    <div class="detail-title-wrap">
                                        <h4>{{ food.recommendFoodTitle }}</h4>
                                        <div class="detail-subtitle">{{ food.recommendFoodIntroduction }}</div>
                                      <!-- 평균 평점 (숫자와 별로 표시) -->
                                      <div style="font-size: 20px;">
                                        평점 {{ replyFoodStar }}
                                        <span v-for="star in 5" :key="star" class="star"
                                            :class="{ filled: star <= Math.round(replyFoodStar) }">★</span>
                                      </div>
                                        <!-- 영업상태 -->
                                        <div>
                                            <span class="status" :class="getStatusClass(food.recommendFoodClosetime)">
                                                {{ getStatusMessage(food.recommendFoodClosetime) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="detail-option">{{ food.recommendFoodAddress }}</div>
                                    <div class="detail-option">{{ food.recommendFoodPhoneNo }}</div>
                                    <div class="detail-option">{{ food.recommendFoodTag }}</div>
                                </div>
                            </div>
                            <div class="cont-sub">
                                <div class="cont-time">
                                    <h6>영업시간</h6>
                                    <ul>
                                        <li v-for="day in ['월', '화', '수', '목', '금', '토', '일']" :key="day">
                                        {{ day }}요일: <span>{{ food.recommendFoodOpentime }}</span> - <span>{{ food.recommendFoodClosetime }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h6>{{ food.recommendFoodTitle }} 정보</h6>
                                    <div>{{ food.recommendFoodAllTag }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cont-reply">
                            <h6>방문자 평가</h6>
                            <div>
                            <!-- 태그 Read -->
                            <span>이런 점이 좋았어요</span>
                            <div class="cont-chart">
                                <FoodChart :recommendFoodId="food.recommendFoodId" />
                            </div>
                          </div>
                             <!-- 버튼 클릭 이벤트에 food.id 전달 -->
                             <button @click="createModal(recommendFoodId)" style="font-size: 12px; cursor: pointer">평점쓰기</button>
                             <!-- food.recommendFoodId를 activeFoodId로 설정하여 전달 -->
                            <CreateModalFood
                                v-if="replyModalCreate"
                                :replyModalCreate="replyModalCreate"
                                :recommendFoodId="activeFoodId" 
                                :type="currentType"
                                @close="closeModal" />
                            </div>
                    </div>
                <div id="subright-cont">
                    <div class="mini-map">
                      <div v-for="(food, i) in recommendListDetailFood" :key="i">
                          <KakaoMap :latitude="food.recommendFoodLatitude" :longitude="food.recommendFoodLongitude" />
                      </div>
                    </div>
                  <!-- recommendListfoodRegion 표시 -->
                  <div class="recommend-list">
                      <h6 style="text-align: left;">
                        <span>{{ food.recommendFoodRegion }}</span>
                        주변
                        <span>{{ food.recommendFoodCategory }}</span>
                      </h6>
                      <div>
                      <ul>
                        <li v-for="(food, index) in recommendListFoodRegion" :key="index" class="recommend-item">
                          <div @click="goToDetail(food.recommendFoodId)" class="recommend-info">
                            <div class="recommend-name-region">
                              <span class="recommend-name">{{ food.recommendFoodTitle }}</span>
                              <span class="recommend-region"><span></span>{{ food.recommendFoodRegion }}</span>
                            </div>
                            <div class="recommend-details">
                              <span class="recommend-tag">{{ food.recommendFoodTag }}</span>
                              <img class="recommend-photo" :src="food.recommendFoodImgPath || 'default-image-url'" alt="식당 사진">
                            </div>
                          </div> <!-- goToDetail recommend-info -->
                        </li><!-- v-for -->
                      </ul>
                      </div>
                  </div><!-- recommend-list -->
                </div>
              </div>
            </div>

        </div>
    </div>
</template>

<script>
import KakaoMap from "@/components/KakaoMap/KakaoMap.vue";
import CreateModalFood from './CreateModalFood.vue';
import FoodChart from './FoodChart.vue';

export default {
  name: 'RecommendListDetailFood',
  data() {
    return {
      recommendListDetailFood: [],
      replyModalCreate: false,
      activeFoodId: null,  // 활성화된 음식 ID 저장, 모달 전달
      currentType: 'food',
      foodRegion: '', //주변 지역 정보
      placeLatitude: 0,
      placeLongitude: 0,
      recommendListFoodRegion: [],
      replyFoodStar: '', //관광지 평점 정보
      recommendReplyStar: '',
      //replyFoodTags: ''
    };
  },
  components: {
    KakaoMap,
    CreateModalFood,
    FoodChart
  },
  props: {
    recommendFoodId: {  // 외부에서 전달받는 ID prop
      type: Number,
      required: true
    }
  },
  methods: {
    async fetchFoodDetails() {
        if (!this.recommendFoodId) {
            console.error("recommendFoodId가 정의되지 않았습니다!");
            return;
        }
        try {
            let response = await this.$axios.get(`/api/recommend/listfood/${this.recommendFoodId}`);
            if (response.data) {
                const data = response.data;
                // 데이터 가공
                data.recommendFoodTag = data.recommendFoodTag.split(',').slice(0, 8).join(', ');
                data.recommendFoodAllTag = data.recommendFoodAllTag.split(',').slice(0, 16).join(', ');
                this.recommendListDetailFood = [data];
                this.foodRegion = data.recommendFoodRegion;
                this.placeLatitude = data.recommendFoodLatitude;
                this.placeLongitude = data.recommendFoodLongitude;
                this.replyModalCreate = false;
                this.fetchRegionData(); // fetchRegionData 호출
                this.fetchRatingData(); //fetchRatingData 호출 
                //this.fetchReplyTags();
            }
            console.log("로딩 된 지역 정보:", this.foodRegion);
            console.log("로딩 된 상세페이지 정보:", this.recommendListDetailFood);
        } catch (error) {
            console.error('음식점 세부 정보를 가져오는 중 에러 발생:', error);
        }
    }, //fetchFoodDetails
    async fetchRegionData() {
    try {
      const params = {
        page: 0,
        size: 3, // 최대 3개의 항목만 가져옴
        sort: "recommendFoodRegion,desc",
        region: this.foodRegion
      };
      const response = await this.$axios.get("/api/recommend/listfood", { params });
      if (response.data.content.length === 0) {
        console.error('No data returned for the page:', this.currentPage);
        this.recommendListFoodRegion = [];
        this.totalPages = 0;
      } else {
        // 최대 3개의 항목만 추출하여 저장
        this.recommendListFoodRegion = response.data.content.slice(0, 3).map(item => {
          // recommendfoodTag를 최대 3개까지만 추출
          const tags = item.recommendFoodTag ? item.recommendFoodTag.split(',').slice(0, 2).join(', ') : '';
          return { ...item, recommendFoodTag: tags };
        });
        console.log("로딩된 지역 정보:", this.recommendListFoodRegion);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }, //fetchRegionData
  async fetchRatingData() {
    console.log("fetchRatingData() 메서드가 호출되었습니다.");
    try {
        const response = await this.$axios.get(`/api/recommendreply/food/average/star/${this.recommendFoodId}`);
        console.log("API 응답:", response.data);  // API 응답을 확인하기 위한 로그

        if (!response.data || response.data === "평점을 기다리고 있어요") {
            this.replyFoodStar = response.data; // 평점 문자열 또는 "평점을 기다리고 있어요" 메시지를 처리
        } else {
            this.replyFoodStar = Math.round(response.data); // 소수점 제거하고 반올림
            console.log("반올림 처리된 평균 평점:", this.replyFoodStar);
        }
    } catch (error) {
        console.error("평균 평점 데이터를 가져오는 중 오류가 발생했습니다:", error);
        this.replyFoodStar = "평점 정보 없음";
    }
  }, //fetchRatingData
  // async fetchReplyTags() {
  //     if (!this.recommendFoodId) {
  //     console.error("recommendFoodId가 정의되지 않았습니다!");
  //     return;
  //   }
  //   try {
  //     let response = await this.$axios.get(`/api/recommendreply/food/reads/tag-counting/${this.recommendFoodId}`);
  //     if (response.data) {
  //       // 객체 배열을 문자열 배열로 변환합니다.
  //       const tags = response.data.map(tagObject => {
  //         const key = Object.keys(tagObject)[0]; // 객체에서 키를 가져옵니다.
  //         const value = tagObject[key]; // 키에 해당하는 값을 가져옵니다.
  //         return `${key}: ${value}`; // "태그명: 개수" 형태의 문자열을 만듭니다.
  //       });
  //       this.replyFoodTags = tags; // 변환된 문자열 배열을 저장합니다.
  //     }
  //     console.log("로딩 된 태그 정보:", this.replyFoodTags);
  //   } catch (error) {
  //     console.error('태그 정보를 가져오는 중 에러 발생:', error);
  //   }
  // }, //fetchReplyTags
    isOperating(closeTime) {  //영업중, 영업마감
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
    }, //isOperating
    createModal(recommendFoodId) {
      // 모달을 생성하는 로직
      console.log("createModalFood 생성");
      //console.log("모달 생성, ID:", recommendFoodId); // 로그 추가하여 ID 확인
      // activeFoodId 설정으로 모달에 ID 전달
      this.activeFoodId = recommendFoodId; // 모달 생성 ID
      console.log("모달에 전달될 ID:", this.activeFoodId);  // 모달에 전달될 ID가 올바르게 설정되었는지 확인
      this.replyModalCreate = true;
      console.log("createModalFood 생성:", this.replyModalCreate);
    }, //createModal
    closeModal() {
      // 모달을 닫는 로직
      console.log("createModal 닫기");
      this.replyModalCreate = false;
      this.activeFoodId = null;  // 모달 닫을 때 ID 초기화
    },
    getStatusClass(closeTime) {
      const status = this.isOperating(closeTime);
      return {
        'card-opentime': status === '영업중',  // '영업중'에 해당하는 CSS 클래스
        'card-closetime': status === '영업마감' // '영업마감'에 해당하는 CSS 클래스
      };
    }, //getStatusClass
    getStatusMessage(closeTime) {
      return this.isOperating(closeTime);
    }, //getStatusMessage
    goToDetail(recommendFoodId) {
    if (!recommendFoodId) {
      console.error("Error: recommendFoodId 찾을 수 없음");
      return;
    }
    console.log("이동 할 recommendFoodId:", recommendFoodId);
    this.$router.push({ name: 'detailfood', params: { recommendFoodId } }).catch(err => {
    console.error(err);
    });  //recommendFoodId 페이지 이동
  }, //goToDetail
  refreshPage() {
    // 페이지 새로 고침
    window.location.reload();
  } //refreshPage
  },
  mounted() {
    this.fetchFoodDetails();
     // 페이지 새로 고침 이벤트 리스너 추가
    this.$router.afterEach(() => {
    this.refreshPage();
  });
  }
}
</script>

<style scoped>
.divider {
  padding-top: 70px;
}
@import "@/assets/css/recommendDetail_style.css";
</style>
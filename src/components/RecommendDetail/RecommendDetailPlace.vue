<template>
  <div id="container-wrap">
      <div id="container-wrap" class="div-cont">
          <div id="contents">
            <div :key="i" v-for="(place, i) in recommendListDetailPlace">
              <div id="subleft-cont">
                  <div id="div_profile">
                          <div class="cont-main"  >
                              <div class="reply-img-wrap">
                                  <img :src="place.recommendPlaceImgPath || 'default-image-url'" alt="Detail Image" class="cont-main-img">
                              </div>
                              <div class="detail-content">
                                  <div class="detail-info-wrap">
                                      <div class="detail-info-header">
                                        <div>
                                          <h2 class="detail-title">{{ place.recommendPlaceTitle }}</h2>
                                        </div>
                                        <!-- 영업상태 -->
                                        <div>
                                          <span class="status" :class="getStatusClass(place.recommendPlaceClosetime)">
                                              {{ getStatusMessage(place.recommendPlaceClosetime) }}
                                          </span>
                                        </div>
                                      </div>
                                      <div class="detail-subtitle">{{ place.recommendPlaceIntroduction }}</div>
                                      <!-- 평균 평점 (숫자와 별로 표시) -->
                                      <div class="detail-rating">
                                        <span v-for="star in 5" :key="star" class="star"
                                            :class="{ filled: star <= Math.round(replyPlaceStar) }">★</span>
                                        <span class="rating-txt">{{ replyPlaceStar }}</span>
                                      </div>
                                  </div>
                                  <div class="detail-option-wrap">
                                    <div class="detail-option">
                                      <span class="detail-option-icon"><font-awesome-icon :icon="['fas', 'location-dot']" /></span>
                                      <span>{{ place.recommendPlaceAddress }}</span>
                                    </div>
                                    <div class="detail-option">
                                      <span class="detail-option-icon"><font-awesome-icon :icon="['fas', 'square-phone']" /></span>
                                      <span>{{ place.recommendPlacePhoneNo }}</span>
                                    </div>
                                    <div class="detail-option">
                                      <span class="detail-option-icon"><font-awesome-icon :icon="['fas', 'tag']" /></span>
                                      <span>{{ place.recommendPlaceTag }}</span>
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div class="cont-sub">
                              <div class="cont-time">
                                  <div>
                                    <h4 class="detail-title">영업시간</h4>
                                    <ul>
                                        <li v-for="day in ['월', '화', '수', '목', '금', '토', '일']" :key="day">
                                          <div class="cont-time-wrap">
                                          <div>
                                            {{ day }}요일: 
                                          </div>
                                          <div>
                                            <span>{{ place.recommendPlaceOpentime }}</span>
                                            - 
                                            <span>{{ place.recommendPlaceClosetime }}</span>
                                        </div>
                                        </div>
                                        </li>
                                    </ul>
                                  </div>
                                  <div class="detail-tags-wrap">
                                    <h4 class="detail-title">{{ place.recommendPlaceTitle }} 태그</h4>
                                    <div>
                                      <button
                                        type="button"
                                        class="btn btn-outline-primary detail-tags"
                                        v-for="tag in parseTags(place.recommendPlaceAllTag)"
                                        :key="tag"
                                      >
                                        {{ tag }}
                                      </button>
                                    </div>
                                  </div>
                            </div><!-- cont-time -->
                        <div class="cont-reply">
                          <div class="cont-reply-info">
                            <h4 class="detail-title">방문자 평가</h4>
                            <div class="detail-info-header cont-reply-line" >
                              <p class="detail-reply-txt">😎 이런 점이 좋았어요</p>
                              <div>
                              <button type="button" class="btn btn-primary btn-reply" @click="createModal(recommendPlaceId)" style="cursor: pointer">
                                <span><font-awesome-icon :icon="['far', 'pen-to-square']" /></span>평점쓰기</button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="cont-chart">
                                <!-- PlaceChart 컴포넌트에 recommendPlaceId를 전달합니다 -->
                                <PlaceChart :recommendPlaceId="place.recommendPlaceId" />
                            </div>
                          </div>
                          <div class="cont-reply-caution">
                            <span class="cont-reply-caution-massage">😊 이 {{place.recommendPlaceCategory }}는 여러 방문객들의 생생한 평가를 통해 신뢰를 쌓았어요. 여러분도 마음 편히 즐겨보세요!</span>
                            <p class="cont-reply-caution-massage">※홍보 및 비방 등 부적절한 평가는  평점 산정에서 제외될 수 있습니다.</p>
                          </div>
                           <!-- Place.recommendPlaceId를 activePlaceId로 설정하여 전달 -->
                          <CreateModalPlace
                              v-if="replyModalCreate"
                              :replyModalCreate="replyModalCreate"
                              :recommendPlaceId="activePlaceId" 
                              :type="currentType"
                              @close="closeModal" />
                        </div><!-- cont-reply -->
                    </div><!-- cont-sub -->
                  </div><!-- div_profile -->

                  </div>
              <div id="subright-cont">
                  <div class="mini-map">
                    <div v-for="(place, i) in recommendListDetailPlace" :key="i" >
                        <!-- 기타 컨텐츠 -->
                        <KakaoMap :latitude="place.recommendPlaceLatitude" :longitude="place.recommendPlaceLongitude" 
                        :placeTitle="place.recommendPlaceTitle" />
                    </div>
                  </div>
                  <!-- recommendListplaceRegion 표시 -->
                  <div class="recommend-list">
                      <h6 style="text-align: left;">
                        <span>{{ place.recommendPlaceRegion }}</span>
                        주변
                        <span>{{ place.recommendPlaceCategory }}</span>
                      </h6>
                      <div>
                      <ul>
                        <li v-for="(place, index) in recommendListPlaceRegion" :key="index" >
                          <div @click="goToDetail(place.recommendPlaceId)" class="recommend-info">
                            <div class="recommend-name-region">
                              <p class="recommend-name">{{ place.recommendPlaceTitle }}</p>
                              <p class="recommend-region"><span><font-awesome-icon :icon="['fas', 'location-dot']" /></span>{{ place.recommendPlaceRegion }}</p>
                            </div>
                            <div class="recommend-details">
                              <p class="recommend-tag">{{ place.recommendPlaceTag }}</p>
                              <div>
                                <img class="recommend-photo" :src="place.recommendPlaceImgPath || 'default-image-url'" alt="관광지 사진">
                              </div>
                            </div>
                          </div> <!-- goToDetail recommend-info -->
                        </li> <!-- v-for -->
                      </ul>
                      </div>
                  </div> <!-- recommend-list -->
              </div>
            </div>
          </div>

      </div>
  </div>
</template>

<script>
import KakaoMap from "@/components/KakaoMap/KakaoMap.vue";
import CreateModalPlace from './CreateModalPlace.vue';
import PlaceChart from './PlaceChart.vue';

export default {
name: 'RecommendListDetailPlace',
data() {
  return {
    recommendListDetailPlace: [],
    replyModalCreate: false,
    activePlaceId: null,  // 활성화된 음식 ID 저장, 모달 전달
    currentType: 'place',
    placeRegion: '', //주변 지역 정보
    placeLatitude: 0,
    placeLongitude: 0,
    recommendListPlaceRegion: [],
    replyPlaceStar: '', //관광지 평점 정보
    recommendReplyStar: '',
    placeTitle:'',
    //replyPlaceTags: ''
  };
},
components: {
  KakaoMap,
  CreateModalPlace,
  PlaceChart
},
props: {
  recommendPlaceId: {  // 외부에서 전달받는 ID prop
    type: Number,
    required: true
  }
},
methods: {
  async fetchPlaceDetails() {
      if (!this.recommendPlaceId) {
          console.error("recommendPlaceId가 정의되지 않았습니다!");
          return;
      }
      try {
          let response = await this.$axios.get(`/api/recommend/listplace/${this.recommendPlaceId}`);
          if (response.data) {
              const data = response.data;
              // 데이터 가공
              data.recommendPlaceTag = data.recommendPlaceTag ? data.recommendPlaceTag.split(',').slice(0, 8).join(', ') : '';
              data.recommendPlaceAllTag = data.recommendPlaceAllTag ? data.recommendPlaceAllTag.split(',').slice(0, 16).join(', ') : '';
              this.recommendListDetailPlace = [data];
              this.placeRegion = data.recommendPlaceRegion;
              this.placeLatitude = data.recommendPlaceLatitude;
              this.placeLongitude = data.recommendPlaceLongitude;
              this.placeTitle = data.recommendPlaceTitle;
              this.replyModalCreate = false;
              this.fetchRegionData(); // fetchRegionData 호출
              this.fetchRatingData(); //fetchRatingData 호출 
              // this.fetchReplyTags();
          }
          console.log("로딩 된 지역 정보:", this.placeRegion);
          console.log("로딩 된 상세페이지 정보:", this.recommendListDetailPlace);
      } catch (error) {
          console.error('관광지 세부 정보를 가져오는 중 에러 발생:', error);
      }
  }, //fetchPlaceDetails
  async fetchRegionData() {
  try {
    const params = {
      page: 0,
      size: 3, // 최대 3개의 항목만 가져옴
      sort: "recommendPlaceRegion,desc",
      region: this.placeRegion
    };
    const response = await this.$axios.get("/api/recommend/listplace", { params });
    if (response.data.content.length === 0) {
      console.error('No data returned for the page:', this.currentPage);
      this.recommendListPlaceRegion = [];
      this.totalPages = 0;
    } else {
      // 최대 3개의 항목만 추출하여 저장
      this.recommendListPlaceRegion = response.data.content.slice(0, 3).map(item => {
        // recommendPlaceTag를 최대 3개까지만 추출
        const tags = item.recommendPlaceTag ? item.recommendPlaceTag.split(',').slice(0, 2).join(', ') : '';
        return { ...item, recommendPlaceTag: tags };
      });
      console.log("로딩된 지역 정보:", this.recommendListPlaceRegion);
    }
  } catch (error) {
    console.error("에러 발생:", error);
  }
}, //fetchRegionData
  async fetchRatingData() {
      console.log("fetchRatingData() 메서드가 호출되었습니다.");
      try {
        // API URL 수정: 동적 ID를 경로에 포함
        const response = await this.$axios.get(`/api/recommendreply/place/average/star/${this.recommendPlaceId}`);
        if (!response.data || response.data === "평점을 기다리고 있어요") {
          this.replyPlaceStar = response.data; // API 응답이 평점 문자열 또는 평균 평점 없음 메시지
        } else {
          // 소수점을 제거하고 반올림
          this.replyPlaceStar = Math.round(response.data);
        }
        console.log("평균 평점:", this.replyPlaceStar);
      } catch (error) {
        console.error("평균 평점 데이터를 가져오는 중 오류가 발생했습니다:", error);
        this.replyPlaceStar = "평점 정보 없음";
      }
  }, //fetchRatingData

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
  createModal(recommendPlaceId) {
    // 모달을 생성하는 로직
    console.log("createModalPlace 생성");
    //console.log("모달 생성, ID:", recommendPlaceId); // 로그 추가하여 ID 확인
    // activePlaceId 설정으로 모달에 ID 전달
    this.activePlaceId = recommendPlaceId; // 모달 생성 ID
    console.log("모달에 전달될 ID:", this.activePlaceId);  // 모달에 전달될 ID가 올바르게 설정되었는지 확인
    this.replyModalCreate = true;
    console.log("createModalPlace 생성:", this.replyModalCreate);
  }, //createModal
  closeModal() {
    // 모달을 닫는 로직
    console.log("createModal 닫기");
    this.replyModalCreate = false;
    this.activePlaceId = null;  // 모달 닫을 때 ID 초기화
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
  goToDetail(recommendPlaceId) {
    if (!recommendPlaceId) {
      console.error("Error: recommendPlaceId 찾을 수 없음");
      return;
    }
    console.log("이동 할 recommendPlaceId:", recommendPlaceId);
    this.$router.push({ name: 'detailplace', params: { recommendPlaceId } }).catch(err => {
    console.error(err);
    });  //recommendPlaceId 페이지 이동
  }, //goToDetail
  refreshPage() {
    // 페이지 새로 고침
    window.location.reload();
  }, //refreshPage
  parseTags(tagsString) {
    //태그 버튼 디자인 적용
    return tagsString.split(',').map(tag => tag.trim());
  },
  },
  mounted() {
    this.fetchPlaceDetails();
    // 페이지 새로 고침 이벤트 리스너 추가
    this.$router.afterEach(() => {
    this.refreshPage();
    });
  },
  compute: { //기존 데이터를 바탕으로 새로운 데이터 값을 생성할 때
  }
}
</script>

<style scoped>
@import "@/assets/css/recommendDetail_style.css";

</style>
<template>
    <div id="container-wrap">
        <div id="container-wrap" class="div-cont">
            <div id="contents">
              <div :key="i" v-for="(hotel, i) in recommendListDetailHotel">
                <div id="subleft-cont">
                    <div id="div_profile">
                            <div class="cont-main"  >
                                <div >
                                    <img :src="hotel.recommendHotelImgPath || 'default-image-url'" alt="Review Image">
                                </div>
                                <div class="detail-content">
                                    <div class="detail-title-wrap">
                                        <h4>{{ hotel.recommendHotelTitle }}</h4>
                                        <div class="detail-subtitle">{{ hotel.recommendHotelIntroduction }}</div>
                                        <!-- 평균 평점 (숫자와 별로 표시) -->
                                        <div style="font-size: 20px;">
                                          평점 {{ replyHotelStar }}
                                          <span v-for="star in 5" :key="star" class="star"
                                              :class="{ filled: star <= Math.round(replyHotelStar) }">★</span>
                                        </div>
                                        <!-- 영업상태 -->
                                        <div>
                                            <span class="status" :class="getStatusClass(hotel.recommendHotelClosetime)">
                                                {{ getStatusMessage(hotel.recommendHotelClosetime) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="detail-option">{{ hotel.recommendHotelAddress }}</div>
                                    <div class="detail-option">{{ hotel.recommendHotelPhoneNo }}</div>
                                    <div class="detail-option">{{ hotel.recommendHotelTag }}</div>
                                </div>
                            </div>
                            <div class="cont-sub">
                                <div class="cont-time">
                                    <h6>영업시간</h6>
                                    <ul>
                                        <li v-for="day in ['월', '화', '수', '목', '금', '토', '일']" :key="day">
                                        {{ day }}요일: <span>{{ hotel.recommendHotelOpentime }}</span> - <span>{{ hotel.recommendHotelClosetime }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h6>{{ hotel.recommendHotelTitle }} 정보</h6>
                                    <div>{{ hotel.recommendHotelAllTag }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cont-reply">
                            <h6>방문자 평가</h6>
                            <div>
                            <!-- 태그 Read -->
                            <span>이런 점이 좋았어요</span>
                            <div class="cont-chart">
                                <HotelChart :recommendHotelId="hotel.recommendHotelId" />
                            </div>
                          </div>
                             <!-- 버튼 클릭 이벤트에 Hotel.id 전달 -->
                             <button @click="createModal(recommendHotelId)" style="font-size: 12px; cursor: pointer">평점쓰기</button>
                             <!-- Hotel.recommendHotelId를 activeHotelId로 설정하여 전달 -->
                            <CreateModalHotel
                                v-if="replyModalCreate"
                                :replyModalCreate="replyModalCreate"
                                :recommendHotelId="activeHotelId" 
                                :type="currentType"
                                @close="closeModal" />
                            </div>
                    </div>
                <div id="subright-cont">
                    <div class="mini-map">
                      <div v-for="(hotel, i) in recommendListDetailHotel" :key="i">
                          <KakaoMap :latitude="hotel.recommendHotelLatitude" :longitude="hotel.recommendHotelLongitude" />
                      </div>
                    </div>
                  <!-- recommendListHotelRegion 표시 -->
                  <div class="recommend-list">
                      <h6 style="text-align: left;">
                        <span>{{ hotel.recommendHotelRegion }}</span>
                        주변
                        <span>{{ hotel.recommendHotelCategory }}</span>
                      </h6>
                      <div>
                      <ul>
                        <li v-for="(hotel, index) in recommendListHotelRegion" :key="index" class="recommend-item">
                          <div @click="goToDetail(hotel.recommendHotelId)" class="recommend-info">
                            <div class="recommend-name-region">
                              <span class="recommend-name">{{ hotel.recommendHotelTitle }}</span>
                              <span class="recommend-region"><span></span>{{ hotel.recommendHotelRegion }}</span>
                            </div>
                            <div class="recommend-details">
                              <span class="recommend-tag">{{ hotel.recommendHotelTag }}</span>
                              <img class="recommend-photo" :src="hotel.recommendHotelImgPath || 'default-image-url'" alt="관광지 사진">
                            </div>
                          </div><!-- goToDetail -->
                        </li><!-- v-for -->
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
  import CreateModalHotel from './CreateModalHotel.vue';
  import HotelChart from './HotelChart.vue';
  
  export default {
  name: 'RecommendListDetailHotel',
  data() {
    return {
      recommendListDetailHotel: [],
      replyModalCreate: false,
      activeHotelId: null,  // 활성화된 음식 ID 저장, 모달 전달
      currentType: 'hotel',
      hotelRegion: '', //주변 지역 정보
      placeLatitude: 0,
      placeLongitude: 0,
      recommendListHotelRegion: [],
      replyHotelStar: '', //관광지 평점 정보
      recommendReplyStar: '',
      //replyHotelTags: ''
    };
  },
  components: {
    KakaoMap,
    CreateModalHotel,
    HotelChart
  },
  props: {
    recommendHotelId: {  // 외부에서 전달받는 ID prop
      type: Number,
      required: true
    }
  },
  methods: {
    async fetchHotelDetails() {
      //this.isLoading = true;  // 데이터 로딩 시작
        if (!this.recommendHotelId) {
            console.error("recommendHotelId is undefined!");
            //this.isLoading = false;
            return;
        }
        try {
            let response = await this.$axios.get(`/api/recommend/listhotel/${this.recommendHotelId}`);
            if (response.data) {
                const data = response.data;
                data.recommendHotelTag = data.recommendHotelTag ? data.recommendHotelTag.split(',').slice(0, 8).join(', ') : '';
                data.recommendHotelAllTag = data.recommendHotelAllTag ? data.recommendHotelAllTag.split(',').slice(0, 16).join(', ') : '';
                this.recommendListDetailHotel = [data];
                this.hotelRegion = data.recommendHotelRegion;
                this.placeLatitude = data.recommendHotelLatitude;
                this.placeLongitude = data.recommendHotelLongitude;
                this.replyModalCreate = false;
                this.fetchRegionData(); // fetchRegionData 호출
                this.fetchRatingData(); //fetchRatingData 호출 
                //this.fetchReplyTags();
            }
            console.log("로딩 된 지역 정보:", this.hotelRegion);
            console.log("로딩 된 상세페이지 정보:", this.recommendListDetailHotel);
        } catch (error) {
            console.error('Error fetching Hotel details:', error);
        }
    }, //fetchHotelDetails
    async fetchRegionData() {
  try {
    const params = {
      page: 0,
      size: 3, // 최대 3개의 항목만 가져옴
      sort: "recommendHotelRegion,desc",
      region: this.hotelRegion
    };
    const response = await this.$axios.get("/api/recommend/listhotel", { params });
    if (response.data.content.length === 0) {
      console.error('No data returned for the page:', this.currentPage);
      this.recommendListHotelRegion = [];
      this.totalPages = 0;
    } else {
      // 최대 3개의 항목만 추출하여 저장
      this.recommendListHotelRegion = response.data.content.slice(0, 3).map(item => {
        // recommendHotelTag를 최대 3개까지만 추출
        const tags = item.recommendHotelTag ? item.recommendHotelTag.split(',').slice(0, 2).join(', ') : '';
        return { ...item, recommendHotelTag: tags };
      });
      console.log("로딩된 지역 정보:", this.recommendListHotelRegion);
    }
  } catch (error) {
    console.error("에러 발생:", error);
  }
}, //fetchRegionData
async fetchRatingData() {
      console.log("fetchRatingData() 메서드가 호출되었습니다.");
      try {
        // API URL 수정: 동적 ID를 경로에 포함
        const response = await this.$axios.get(`/api/recommendreply/hotel/average/star/${this.recommendHotelId}`);
        if (!response.data || response.data === "평점을 기다리고 있어요") {
          this.replyHotelStar = response.data; // API 응답이 평점 문자열 또는 평균 평점 없음 메시지
        } else {
          // 소수점을 제거하고 반올림
          this.replyHotelStar = Math.round(response.data);
        }
        console.log("평균 평점:", this.replyHotelStar);
      } catch (error) {
        console.error("평균 평점 데이터를 가져오는 중 오류가 발생했습니다:", error);
        this.replyHotelStar = "평점 정보 없음";
      }
  }, //fetchRatingData
  // async fetchReplyTags() {
  //     if (!this.recommendHotelId) {
  //     console.error("recommendHotelId가 정의되지 않았습니다!");
  //     return;
  //   }
  //   try {
  //     let response = await this.$axios.get(`/api/recommendreply/hotel/reads/tag-counting/${this.recommendHotelId}`);
  //     if (response.data) {
  //       // 객체 배열을 문자열 배열로 변환합니다.
  //       const tags = response.data.map(tagObject => {
  //         const key = Object.keys(tagObject)[0]; // 객체에서 키를 가져옵니다.
  //         const value = tagObject[key]; // 키에 해당하는 값을 가져옵니다.
  //         return `${key}: ${value}`; // "태그명: 개수" 형태의 문자열을 만듭니다.
  //       });
  //       this.replyHotelTags = tags; // 변환된 문자열 배열을 저장합니다.
  //     }
  //     console.log("로딩 된 태그 정보:", this.replyHotelTags);
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
    createModal(recommendHotelId) {
      // 모달을 생성하는 로직
      console.log("createModalHotel 생성");
      //console.log("모달 생성, ID:", recommendHotelId); // 로그 추가하여 ID 확인
      // activeHotelId 설정으로 모달에 ID 전달
      this.activeHotelId = recommendHotelId; // 모달 생성 ID
      console.log("모달에 전달될 ID:", this.activeHotelId);  // 모달에 전달될 ID가 올바르게 설정되었는지 확인
      this.replyModalCreate = true;
      console.log("createModalHotel 생성:", this.replyModalCreate);
    }, //createModal
    closeModal() {
      // 모달을 닫는 로직
      console.log("createModal 닫기");
      this.replyModalCreate = false;
      this.activeHotelId = null;  // 모달 닫을 때 ID 초기화
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
    goToDetail(recommendHotelId) {
    if (!recommendHotelId) {
      console.error("Error: recommendHotelId 찾을 수 없음");
      return;
    }
    console.log("이동 할 recommendHotelId:", recommendHotelId);
    this.$router.push({ name: 'detailhotel', params: { recommendHotelId } }).catch(err => {
    console.error(err);
    });  //recommendHotelId 페이지 이동
    }, //goToDetail
    refreshPage() {
    // 페이지 새로 고침
      window.location.reload();
    }
    },
    mounted() {
      this.fetchHotelDetails();
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
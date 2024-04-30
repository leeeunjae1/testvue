<template>
    <div id="container-wrap">
        <div id="container-wrap" class="div-cont">
            <div id="contents">
              <div :key="i" v-for="(event, i) in recommendListDetailEvent">
                <div id="subleft-cont">
                    <div id="div_profile">
                            <div class="cont-main"  >
                                <div >
                                    <img :src="event.recommendEventImgPath || 'default-image-url'" alt="Review Image">
                                </div>
                                <div class="detail-content">
                                    <div class="detail-title-wrap">
                                        <h4>{{ event.recommendEventTitle }}</h4>
                                        <div class="detail-subtitle">{{ event.recommendEventIntroduction }}</div>
                                        <!-- 평균 평점 (숫자와 별로 표시) -->
                                        <div style="font-size: 20px;">
                                        평점 {{ replyEventStar }}
                                        <span v-for="star in 5" :key="star" class="star"
                                            :class="{ filled: star <= Math.round(replyEventStar) }">★</span>
                                      </div>
                                        <!-- 영업상태 -->
                                        <div>
                                            <span class="status" :class="getStatusClass(event.recommendEventClosetime)">
                                                {{ getStatusMessage(event.recommendEventClosetime) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="detail-option">{{ event.recommendEventAddress }}</div>
                                    <div class="detail-option">{{ event.recommendEventPhoneNo }}</div>
                                    <div class="detail-option">{{ event.recommendEventTag }}</div>
                                </div>
                            </div>
                            <div class="cont-sub">
                                <div class="cont-time">
                                    <h6>영업시간</h6>
                                    <ul>
                                        <li v-for="day in ['월', '화', '수', '목', '금', '토', '일']" :key="day">
                                        {{ day }}요일: <span>{{ event.recommendEventOpentime }}</span> - <span>{{ event.recommendEventClosetime }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h6>{{ event.recommendEventTitle }} 정보</h6>
                                    <div>{{ event.recommendEventAllTag }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cont-reply">
                            <h6>방문자 평가</h6>
                            <div>
                            <!-- 태그 Read -->
                            <span>이런 점이 좋았어요</span>
                            <div class="cont-chart">
                                <!-- PlaceChart 컴포넌트에 recommendPlaceId를 전달합니다 -->
                                <EventChart :recommendEventId="event.recommendEventId" />
                            </div>
                          </div>
                             <!-- 버튼 클릭 이벤트에 Event.id 전달 -->
                             <button @click="createModal(recommendEventId)" style="font-size: 12px; cursor: pointer">평점쓰기</button>
                             <!-- Event.recommendEventId를 activeEventId로 설정하여 전달 -->
                            <CreateModalEvent
                                v-if="replyModalCreate"
                                :replyModalCreate="replyModalCreate"
                                :recommendEventId="activeEventId" 
                                :type="currentType"
                                @close="closeModal" />
                            </div>
                    </div>
                <div id="subright-cont">
                    <div class="mini-map">
                      <div v-for="(event, i) in recommendListDetailEvent" :key="i">
                          <KakaoMap :latitude="event.recommendEventLatitude" :longitude="event.recommendEventLongitude" />
                      </div>
                    </div>
                  <!-- recommendListEventRegion 표시 -->
                  <div class="recommend-list">
                      <h6 style="text-align: left;">
                        <span>{{ event.recommendEventRegion }}</span>
                        주변
                        <span>{{ event.recommendEventCategory }}</span>
                      </h6>
                      <div>
                      <ul>
                        <li v-for="(event, index) in recommendListEventRegion" :key="index" class="recommend-item">
                          <div @click="goToDetail(event.recommendEventId)" class="recommend-info">
                            <div class="recommend-name-region">
                              <span class="recommend-name">{{ event.recommendEventTitle }}</span>
                              <span class="recommend-region"><span></span>{{ event.recommendEventRegion }}</span>
                            </div>
                            <div class="recommend-details">
                              <span class="recommend-tag">{{ event.recommendEventTag }}</span>
                              <img class="recommend-photo" :src="event.recommendEventImgPath || 'default-image-url'" alt="관광지 사진">
                            </div>
                          </div> <!-- goToDetail -->
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
  import CreateModalEvent from './CreateModalEvent.vue';
  import EventChart from './EventChart.vue';
  
  export default {
  name: 'RecommendListDetailEvent',
  data() {
    return {
      recommendListDetailEvent: [],
      replyModalCreate: false,
      activeEventId: null,  // 활성화된 음식 ID 저장, 모달 전달
      currentType: 'event',
      eventRegion: '', //주변 지역 정보
      placeLatitude: 0,
      placeLongitude: 0,
      recommendListEventRegion: [],
      replyEventStar: '', //축제행사 평점 정보
      recommendReplyStar: '',
      //replyEventTags: ''
    };
  },
  components: {
    KakaoMap,
    CreateModalEvent,
    EventChart
  },
  props: {
    recommendEventId: {  // 외부에서 전달받는 ID prop
      type: Number,
      required: true
    }
  },
  methods: {
    async fetchEventDetails() {
      //this.isLoading = true;  // 데이터 로딩 시작
        if (!this.recommendEventId) {
            console.error("recommendEventId is undefined!");
            //this.isLoading = false;
            return;
        }
        try {
            let response = await this.$axios.get(`/api/recommend/listevent/${this.recommendEventId}`);
            if (response.data) {
                const data = response.data;
                data.recommendEventTag = data.recommendEventTag ? data.recommendEventTag.split(',').slice(0, 8).join(', ') : '';
                data.recommendEventAllTag = data.recommendEventAllTag ? data.recommendEventAllTag.split(',').slice(0, 16).join(', ') : '';
                this.recommendListDetailEvent = [data];
                this.eventRegion = data.recommendEventRegion;
                this.placeLatitude = data.recommendEventLatitude;
                this.placeLongitude = data.recommendEventLongitude;
                this.replyModalCreate = false;
                this.fetchRegionData(); // fetchRegionData 호출
                this.fetchRatingData(); //fetchRatingData 호출 
                //this.fetchReplyTags();
            }
            console.log("로딩 된 지역 정보:", this.eventeRegion);
            console.log("로딩 된 상세페이지 정보:", this.recommendListDetailEvent);
        } catch (error) {
            console.error('축제행사 세부 정보를 가져오는 중 에러 발생:', error);
        }
    }, //fetchEventDetails
    async fetchRegionData() {
    try {
      const params = {
        page: 0,
        size: 3, // 최대 3개의 항목만 가져옴
        sort: "recommendEventRegion,desc",
        region: this.EventRegion
      };
      const response = await this.$axios.get("/api/recommend/listevent", { params });
      if (response.data.content.length === 0) {
        console.error('No data returned for the page:', this.currentPage);
        this.recommendListEventRegion = [];
        this.totalPages = 0;
      } else {
        // 최대 3개의 항목만 추출하여 저장
        this.recommendListEventRegion = response.data.content.slice(0, 3).map(item => {
          // recommendEventTag를 최대 3개까지만 추출
          const tags = item.recommendEventTag ? item.recommendEventTag.split(',').slice(0, 2).join(', ') : '';
          return { ...item, recommendEventTag: tags };
        });
        console.log("로딩된 지역 정보:", this.recommendListEventRegion);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }, //fetchRegionData
  async fetchRatingData() {
      console.log("fetchRatingData() 메서드가 호출되었습니다.");
      try {
        // API URL 수정: 동적 ID를 경로에 포함
        const response = await this.$axios.get(`/api/recommendreply/event/average/star/${this.recommendEventId}`);
        if (!response.data || response.data === "평점을 기다리고 있어요") {
          this.replyEventStar = response.data; // API 응답이 평점 문자열 또는 평균 평점 없음 메시지
        } else {
          // 소수점을 제거하고 반올림
          this.replyEventStar = Math.round(response.data);
        }
        console.log("평균 평점:", this.replyEventStar);
      } catch (error) {
        console.error("평균 평점 데이터를 가져오는 중 오류가 발생했습니다:", error);
        this.replyEventStar = "평점 정보 없음";
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
    createModal(recommendEventId) {
      // 모달을 생성하는 로직
      console.log("createModalEvent 생성");
      //console.log("모달 생성, ID:", recommendEventId); // 로그 추가하여 ID 확인
      // activeEventId 설정으로 모달에 ID 전달
      this.activeEventId = recommendEventId; // 모달 생성 ID
      console.log("모달에 전달될 ID:", this.activeEventId);  // 모달에 전달될 ID가 올바르게 설정되었는지 확인
      this.replyModalCreate = true;
      console.log("createModalEvent 생성:", this.replyModalCreate);
    }, //createModal
    closeModal() {
      // 모달을 닫는 로직
      console.log("createModal 닫기");
      this.replyModalCreate = false;
      this.activeEventId = null;  // 모달 닫을 때 ID 초기화
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
    goToDetail(recommendEventId) {
    if (!recommendEventId) {
      console.error("Error: recommendEventId 찾을 수 없음");
      return;
    }
    console.log("이동 할 recommendEventId:", recommendEventId);
    this.$router.push({ name: 'detailevent', params: { recommendEventId } }).catch(err => {
    console.error(err);
    });  //recommendEventId 페이지 이동
  }, //goToDetail
    refreshPage() {
      //// 페이지 새로 고침
      window.location.reload();
    } 
    },
    mounted() {
      this.fetchEventDetails();
        // 페이지 새로 고침 이벤트 리스너 추가
      this.$router.afterEach(() => {
      this.refreshPage();
    });
    }
  }
  </script>
  
  <style scoped>
  @import "@/assets/css/recommendDetail_style.css";
  </style>
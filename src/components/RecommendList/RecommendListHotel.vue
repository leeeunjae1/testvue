<template>
  <div>
    <div class="recomemnd_info">
        <div class="info_contents">
          <div>
            <h4 style="font-weight: 900;">제주도 숙박 리스트</h4>
            <span style="font-weight: 900;">숙박 추천 태그</span>
          </div>
          <div class="tag-wrap">
            <button type="button" class="btn btn-outline-dark"
                  :class="{ 'active': selectedTag === '' }"
                  @click="selectTag('')">전체</button>
                  <button type="button" class="btn btn-outline-primary"
          :class="{ 'active': selectedTag === '친구' }"
          @click="selectTag('친구')">친구</button>
          <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '혼자' }"
              @click="selectTag('혼자')">혼자</button>
          <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '커플' }"
              @click="selectTag('커플')">커플</button>
              <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '가족' }"
              @click="selectTag('가족')">가족</button>
          <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '아이' }"
              @click="selectTag('아이')">아이</button>
          <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '호텔' }"
              @click="selectTag('호텔')">호텔</button>
          <button type="button" class="btn btn-outline-primary"
          :class="{ 'active': selectedTag === '펜션' }"
          @click="selectTag('펜션')">펜션</button>
          <button type="button" class="btn btn-outline-primary"
              :class="{ 'active': selectedTag === '독채' }"
              @click="selectTag('액티비티')">액티비티</button>
          <button type="button" class="btn btn-outline-primary"
          :class="{ 'active': selectedTag === '캠핑장' }"
          @click="selectTag('캠핑장')">캠핑장</button>
          <button type="button" class="btn btn-outline-primary"
          :class="{ 'active': selectedTag === '오션뷰' }"
          @click="selectTag('오션뷰')">오션뷰</button>
          <button type="button" class="btn btn-outline-primary"
          :class="{ 'active': selectedTag === '수영장' }"
          @click="selectTag('수영장')">수영장</button>
          <button type="button" class="btn btn-outline-primary"
          :class="{ 'active': selectedTag === '반려동물동반입장' }"
          @click="selectTag('반려동물동반입장')">반려동물동반입장</button>
          </div>
        </div>
        <div>
          <img alt="map" src="@/assets/images/map.png" style="width:160px">
        </div>
    </div> <!-- recomemnd_info -->
    <div class="content_list">
        <div style="width: 820px; margin: 16px auto; text-align:left;">
            <span class="headline2" >제주도 쉬어갈 곳</span>
            <span style="margin-left: 5px;">제주랑 고객님들이 엄선한 놀거리 입니다</span>
        </div>
        <div class="card-wrap">
        <!-- <div v-for="list in recommendList" :key="list.id"> -->
          <div :key="i" v-for="(hotel, i) in filteredHotels">
            <div div @click="goToDetail(hotel.recommendHotelId)" class="card">
              <div class="card-image">
                <img :src="hotel.recommendHotelImgPath || 'default-image-url'" alt="Review Image">
                <!-- <div class="score">{{ hotel.recommendHotelStar }}</div> -->
              </div>
              <div class="card-content">
                <div class="card-title-wrap">
                  <div class="card-title">{{ hotel.recommendHotelTitle }}</div>
                  <!-- 영업시간 -->
                  <div>
                    <span class="status" :class="getStatusClass(hotel.recommendHotelClosetime)">
                        {{ getStatusMessage(hotel.recommendHotelClosetime) }}
                    </span>
                  </div>
                </div>
                <div class="card-option-blue">{{ hotel.recommendHotelRegion }}</div>
                <div class="card-subtitle">{{ hotel.recommendHotelIntroduction }}</div>
                <div class="card-option">{{ hotel.recommendHotelTag }}</div>
              </div>
            </div><!-- goToDetail -->
          </div> <!-- v-for -->
        </div> <!-- card-wrap -->
      </div> <!-- content_list -->
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
  name: 'RecommendListHotel',
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
      recommendListHotel: [],
      currentPage: 1, // currentPage로 업데이트
      totalPages: 0,
      pageSize: 12,  // 페이지 크기 정의
      selectedTag: '',  // 초기값으로 '전체' 태그 활성화
      selectedRegion: this.region // prop을 직접 사용
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
        size: this.pageSize,
        sort: "recommendHotelId,desc",
        tag: this.selectedTag,
        region: this.selectedRegion // prop을 직접 사용
    };

    // 요청 파라미터 로그로 확인
    console.log('Requesting data with params:', params); 

    // Axios 요청에 params 적용
   this.$axios.get("/api/recommend/listhotel", { params })
   .then((response) => {
        if (response.data.content.length === 0) {
          console.error('No data returned for the page:', this.currentPage);
          this.recommendListHotel = [];
          this.totalPages = 0;
          this.loading = false;
        } else {
          this.recommendListHotel = response.data.content.map(item => {
            const tags = item.recommendHotelTag.split(',');
            // 태그가 3개 이상인 경우, 처음 3개만 선택
            if (tags.length > 3) { 
              item.recommendHotelTag = tags.slice(0, 3).join(', ');
            }
            // recommendHotelTag의 길이 줄임 처리
            if (item.recommendHotelTag.length > 14) {
              item.recommendHotelTag = item.recommendHotelTag.slice(0, 14) + '.';
            }
            // 음식점 소개가 24글자 이상인 경우, 줄임말 처리
            if (item.recommendHotelIntroduction.length > 30) {
              item.recommendHotelIntroduction = item.recommendHotelIntroduction.substring(0, 30) + '...';
            }
            // 음식점 이름 줄이기 
            if (item.recommendHotelTitle.length > 6) {
              item.recommendHotelTitle = item.recommendHotelTitle.substring(0, 6) + '.';
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
        this.loading = false; 
    });
  },
  selectTag(tag) { //태그 필터링
      this.selectedTag = tag; // 선택된 태그 업데이트
      this.currentPage = 1;
      this.fetchData();
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
  goToDetail(recommendHotelId) {
  if (!recommendHotelId) {
    console.error("Error: recommendHotelId 찾을 수 없음");
    return;
  }
  console.log("이동 할 recommendHotelId:", recommendHotelId);
  this.$router.push({ name: 'detailhotel', params: { recommendHotelId } });
  } //goToDetail
},
computed: {
  filteredHotels() {
    return this.recommendListHotel.filter(hotel => {
      return (!this.region || hotel.recommendHotelRegion === this.region) &&
             (!this.selectedTag || hotel.recommendHotelTag.includes(this.selectedTag));
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
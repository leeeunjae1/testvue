<template>
  <h2 class="mb-3">여행 후기 게시판</h2>
  <div class="latestReview-cards">
    <div
      v-for="(review, index) in latestReviews"
      :key="index"
      class="latestReview-card"
      @click="openModal(review)"
    >
      <div class="latestReview-image">
        <img
          :src="
            review.reviewImages.length > 0
              ? review.reviewImages[0].imageUri
              : 'default-image-url'
          "
          alt="ReviewImage"
        />
        <div class="review-hover-text">자세한 후기 보기</div>
      </div>

      <h5>{{ review.reviewTitle }}</h5>
      <div>{{ review.reviewSubtitle }}</div>
      <div>{{ formatDate(review.reg_date) }}</div>
    </div>
    <!--조회 모달창 -->
    <ReviewModal
      v-if="selectedReview && isModalVisible"
      :review="selectedReview"
      :isModalVisible="isModalVisible"
      @close="closeModal"
    />
    <router-link class="more-reviews" to="/reviews">
      여행 후기 더보기</router-link
    >
  </div>
</template>
<script>
import ReviewModal from "./ReviewModal.vue";
export default {
  components: {
    ReviewModal,
  },
  data() {
    return {
      allReviews: [],
      latestReviews: [],
      selectedReview: null,
      isModalVisible: false,
    };
  },
  created() {
    this.fetchAllReviews();
  },
  methods: {
    async fetchAllReviews() {
      try {
        const response = await this.$axios.get("/api/reviews");
        this.allReviews = response.data.content;
        this.latestReviews = this.allReviews.slice(0, 4); //전체리뷰에서 최신 3개 선택
      } catch (error) {
        if (error.response && error.response.data) {
          //백엔드에서 보낸 에러메시지 표시
          alert(`${error.response.data.message}`);
          console.error(error.response.data.message);
        } else {
          console.error("에러났어요 : " + error);
        }
      }
    },
    // 날짜를 인자로 받아서 원하는 형태의 문자열로 변환하여 반환
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toISOString().substring(0, 10); // YYYY-MM-DD 형식으로 반환
    },
    async openModal(review) {
      try {
        const response = await this.$axios.get(
          `/api/reviews/${review.reviewId}`
        );
        this.selectedReview = response.data;
        this.isModalVisible = true;
        console.log("openModal called with review:", review);
        console.log(
          "selectedReview : " +
            this.selectedReview +
            response.data +
            review.reviewId
        );

        const repliesResponse = await this.$axios.get(
          `/api/reviews/${review.reviewId}/replies`
        );
        this.selectedReview.replies = repliesResponse.data;
        console.log("replies :", this.selectedReview.replies);
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`${error.response.data.message}`);
          console.error(error.response.data.message);
        } else {
          console.error("리뷰 상세 정보를 가져오는 중 에러 발생 :  ", error);
        }
      }
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
<style scoped>
.latestReview-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 0px; /* 카드 사이의 간격 */
}

.latestReview-card {
  flex: 1;
  min-width: 15%; /* 최소 너비 */
  background-color: transparent;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
  margin: 10px;
  cursor: pointer;
  position: relative; /* 호버 텍스트 위치 지정을 위해 상대 위치 설정 */
}
.latestReview-image {
  height: 200px; /* 이미지 컨테이너의 높이를 고정 */
  overflow: hidden; /* 이미지가 컨테이너를 벗어날 경우 숨김 처리 */
  position: relative; /* 하위 요소에 대한 위치 지정 기준 설정 */
  margin-bottom: 20px;
}
.latestReview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.latestReview-content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-reviews {
  display: block;
  text-align: center;
  justify-content: center;
  margin-top: 20px;
  text-decoration: none;
  /* 더보기 링크 스타일 */
}
.review-hover-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7); /* 배경색 설정 */
  color: #fff;
  padding: 10px 0;
  opacity: 0; /* 기본적으로 텍스트는 보이지 않음 */
  transition: opacity 0.3s; /* 페이드 효과 */
  font-weight: bold; /* 글자 두께 */
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
}

.latestReview-card:hover .review-hover-text {
  opacity: 1; /* 호버 시 텍스트 보임 */
}
</style>
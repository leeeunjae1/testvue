<template>
  <div>
    <div class="divider" style="padding: 60px" />
    <div class="main-text">여행 <span class="highlight">후기</span> 게시판</div>
    <p class="sub-text">
      당신의 여행이 더욱 특별해질 수 있게 여행기록을 공유하세요
    </p>

    <div class="container">
      <div class="region-list">
        <div
          class="region-item"
          :class="{ active: selectedRegion === '' }"
          @click="selectRegion('')"
        >
          전체 지역
        </div>
        <div
          class="region-item"
          :class="{ active: selectedRegion === '제주 북부' }"
          @click="selectRegion('제주 북부')"
        >
          제주 북부
        </div>
        <div
          class="region-item"
          :class="{ active: selectedRegion === '제주 남부' }"
          @click="selectRegion('제주 남부')"
        >
          제주 남부
        </div>
        <div
          class="region-item"
          :class="{ active: selectedRegion === '제주 동부' }"
          @click="selectRegion('제주 동부')"
        >
          제주 동부
        </div>
        <div
          class="region-item"
          :class="{ active: selectedRegion === '제주 서부' }"
          @click="selectRegion('제주 서부')"
        >
          제주 서부
        </div>
      </div>

      <div class="reviews">
        <div class="create-review">
          <div>
            <span
              @click="createReview"
              style="font-size: 12px; cursor: pointer"
            >
              글쓰기 </span
            ><font-awesome-icon
              :icon="['far', 'pen-to-square']"
              size="xl"
              style="cursor: pointer"
              @click="createReview"
            />
          </div>
        </div>
        <!-- 리뷰쓰기 모달창 -->
        <CreateReview
          v-if="isModalCreate"
          :isModalCreate="isModalCreate"
          @cancel="cancelCreate"
          @close="closeModal()"
          @deleted="fetchData"
        />
        <div class="review-search">
          <div class="search-input">
            <!-- 검색창 -->
            <input
              id="input-default"
              type="text"
              v-model="searchQuery"
              @keyup.enter="performSearch"
              placeholder="검색어를 입력하세요"
            />
            <!-- 검색 버튼 -->
            <button class="search-button" type="submit" @click="performSearch">
              검 색
            </button>
          </div>
        </div>
        <!--조회 모달창 -->
        <ReviewModal
          v-if="selectedReview && isModalVisible && !isModalEditing"
          :isModalVisible="isModalVisible"
          :review="selectedReview"
          @refresh-modal="openModal"
          @close="closeModal()"
          @edit="startEditing"
          @click.self="closeModal()"
        />
        <!-- 수정 모달창 -->
        <UpdateReview
          v-if="isModalEditing"
          :isModalEditing="isModalEditing"
          :review="selectedReview"
          @cancel="cancelEditing"
          @close="closeModal()"
          @deleted="fetchData"
        />
        <!--게시글 반복 카드-->
        <div class="cards-container">
          <div
            v-for="review in displayReviews"
            :key="review.id"
            class="review-card"
          >
            <!-- 이미지 -->
            <div class="review-image" @click="openModal(review)">
              <img
                :src="
                  review.reviewImages.length > 0
                    ? review.reviewImages[0].imageUri
                    : 'default-image-url'
                "
                alt="Review Image"
              />
            </div>
            <!-- 게시글 콘텐츠 -->
            <div class="review-content">
              <div class="card-main">
                <div class="review-title" @click="openModal(review)">
                  [{{ review.reviewLocation }}] {{ review.reviewTitle }}
                </div>
                <div class="subtitle" @click="openModal(review)">
                  {{ review.reviewSubtitle }}
                </div>
                <div
                  class="truncate"
                  @click="openModal(review)"
                  v-html="review.reviewContent"
                ></div>
              </div>
              <div class="review-footer">
                <div class="footer-container">
                  <span class="likes" @click="incrementLikes(review)">
                    <font-awesome-icon
                      :icon="['fas', 'heart']"
                      size="lg"
                      style="color: #e00b0b"
                    />
                    {{ review.reviewLike }}
                  </span>
                  <font-awesome-icon
                    :icon="['far', 'comment']"
                    size="lg"
                    flip="horizontal"
                  />
                  <span class="comment">. {{ review.replyCount }}</span>
                </div>
                <div class="footer-container">
                  <span class="date">{{ formatDate(review.reg_date) }}</span>
                  <span class="author">{{ review.author }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <span
        v-for="n in totalPages"
        :key="n"
        @click="changePage(n - 1)"
        class="page-item"
        :class="{ active: n === page + 1 }"
      >
        {{ n }}
      </span>
    </div>
  </div>
</template>

<script>
import ReviewModal from "@/components/Review/ReviewModal.vue";
import UpdateReview from "@/components/Review/UpdateReview.vue";
import CreateReview from "@/components/Review/CreateReview.vue";

/* eslint-disable */

export default {
  name: "ReviewBoard",
  components: {
    ReviewModal,
    UpdateReview,
    CreateReview,
  },
  data() {
    return {
      allReviews: [], // 복수형으로 변경하여 여러 후기 데이터를 담을 수 있도록 함
      page: 0,
      totalPages: 0,
      selectedRegion: "", //기본값 전체로 설정
      searchQuery: "",
      searchResults: [], //검색결과 저장 배열
      searchPerformed: false, //검색이 수행되었는지 여부를 추적하는 변수
      isModalVisible: false, //모달 기본 닫혀있기
      selectedReview: null,
      isModalEditing: false,
      replies: null,
      isModalCreate: false,
    };
  },
  computed: {
    displayReviews() {
      //검색 결과가 있을 경우 검색결과를, 그렇지 않을 경우 지역 필터링 결과 또는 전체 리뷰를 반환
      if (this.searchResults.length > 0) {
        return this.searchResults;
      } else if (this.selectedRegion) {
        return this.filteredReviewsByRegion;
      } else {
        return this.allReviews;
      }
    },
    filteredReviewsByRegion() {
      return this.selectedRegion
        ? this.allReviews.filter(
            (review) => review.reviewLocation === this.selectedRegion
          )
        : this.allReviews;
    },
  },
  watch: {
    isModalVisible(newValue) {
      console.log("isModalVisible changed:", newValue);
      if (newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },

  //created, mounted같은 생명주기 훅을 사용하여 후기 데이터를 가져오기
  methods: {
    async fetchData() {
      try {
        const params = {
          page: this.page,
          size: 6, // 페이지 당 표시할 리뷰 수
          reviewLocation: this.selectedRegion, // 선택된 지역을 파라미터로 추가
          keyword: this.searchQuery,
        };
        const response = await this.$axios.get("/api/reviews", {
          params,
        });

        this.allReviews = response.data.content;
        this.totalPages = response.data.totalPages; // 백엔드로부터 전체 페이지 수 받기
        //성공적으로 데이터를 받아온 경우
        console.log("데이터요청 성공 : " + response.data);
        console.log(this.allReviews);
        this.isModalVisible = false;
        this.isModalEditing = false;
        this.isModalCreate = false;
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
    async openModal(review) {
      try {
        const response = await this.$axios.get(
          `/api/reviews/${review.reviewId}`
        );
        this.selectedReview = response.data;
        this.isModalVisible = true;
        this.isModalEditing = false;
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
    createReview() {
      console.log("createReview called");
      this.isModalCreate = true;
      console.log("Create modal state:", this.isModalCreate);
    },

    startEditing() {
      this.isModalEditing = true;
      this.isModalVisible = false;
    },
    cancelCreate() {
      this.isModalCreate = false;
    },
    cancelEditing() {
      this.isModalEditing = false; // 수정 모드 종료
      this.isModalVisible = true; // 조회 모달 창 표시
    },
    closeModal() {
      this.isModalVisible = false;
      this.isModalEditing = false;
      this.isModalCreate = false;
      this.refreshList();
    },
    async refreshList() {
      await this.fetchData();
    },
    performSearch() {
      this.selectedRegion = ""; // 검색 시 지역 선택 초기화
      if (!this.searchQuery && !this.selectedRegion) {
        alert("검색어 또는 지역을 입력하세요.");
        return;
      }
      this.page = 0; // 검색 시 페이지 초기화
      this.fetchData();
    },

    async incrementLikes(review) {
      // 좋아요를 증가시키는 로직
      review.reviewLike += 1;
      try {
        // 백엔드 서버에 변경사항을 전달
        await this.$axios.post(
          `/api/reviews/${review.reviewId}`,
          {
            reviewLike: review.reviewLike,
          },
          console.log(review)
        );
        // 필요하다면 응답 처리
      } catch (error) {
        if (error.response && error.response.data) {
          //백엔드에서 보낸 에러메시지 표시
          alert(`${error.response.data.message}`);
          console.error(error.response.data.message);
        } else {
          console.error("좋아요 업데이트 중 에러 발생: " + error);
        }
      }
    },
    // 날짜를 인자로 받아서 원하는 형태의 문자열로 변환하여 반환
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toISOString().substring(0, 10); // YYYY-MM-DD 형식으로 반환
    },
    changePage(page) {
      this.page = page;
      this.fetchData();
    },
    selectRegion(region) {
      this.searchQuery = "";
      this.selectedRegion = region;
      this.page = 0; // 페이지 번호를 초기화
      this.fetchData(); // 새로운 데이터 로딩
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
@import "@/assets/css/reviewboard_style.css";
</style>
<template>
  <div class="imageModal-overlay" @click="closeModal">
    <div class="review-modal" v-if="isModalVisible">
      <!-- 조회 모달창 -->

      <div class="review-head-bts">
        <div
          class="review-cl-bt"
          @click="$emit('close')"
          style="color: #6e6e6e"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" size="2xl" />
        </div>
        <div v-if="isOwner" class="review-update-delete">
          <div class="review-update-button" @click="editReview">
            <span style="font-size: 12px"> 수정 </span
            ><font-awesome-icon :icon="['far', 'pen-to-square']" size="xl" />
          </div>

          <div
            class="review-delete-button"
            @click="deleteReview(review.reviewId)"
          >
            <span style="font-size: 12px"> 삭제 </span
            ><font-awesome-icon :icon="['far', 'trash-can']" size="xl" />
          </div>
        </div>
      </div>

      <div class="review-modal-content">
        <div class="review-board-name">여행 후기 게시판 〉〉</div>
        <div class="review-title">
          [{{ review.reviewLocation }}] {{ review.reviewTitle }}
        </div>
        <div class="review-subtitle">{{ review.reviewSubtitle }}</div>
        <div class="review-footer-modal">
          <div class="review-footer-container-modal">
            <span class="review-likes" @click="incrementLikes(review)">
              <font-awesome-icon
                :icon="['fas', 'heart']"
                size="lg"
                style="color: #e00b0b"
              />
              {{ review.reviewLike }}
            </span>
          </div>
          <div class="review-footer-container-modal">
            <span class="review-date">{{ formatDate(review.reg_date) }}</span>
            <span class="review-author">{{ review.author }}</span>
          </div>
        </div>
        <!-- 이미지 부분-->
        <div class="review-slider-container">
          <div class="review-click" @click="prevImage">
            <font-awesome-icon :icon="['fas', 'chevron-left']" size="2xl" />
          </div>
          <div
            class="image-container"
            @click="openImageModal"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <div v-if="isHovering" class="image-hover-text">
              이미지 전체보기
            </div>
            <img :src="currentImageUrl" alt="Images" />
            <!-- Image count overlay -->
            <div class="image-count-overlay">
              {{ currentImageIndex + 1 }} / {{ review.reviewImages.length }}
            </div>
          </div>
          <div class="review-click" @click="nextImage">
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="2xl" />
          </div>
        </div>

        <!-- 이미지 전체창 모달 -->
        <div
          v-if="isImageModalVisible"
          class="imageModal-overlay"
          @click.self="closeImageModal"
        >
          <div class="imageModal-content">
            <div class="head-bts">
              <div
                class="review-cl-bt"
                @click="closeImageModal"
                style="color: #6e6e6e"
              >
                <font-awesome-icon :icon="['fas', 'xmark']" size="2xl" />
              </div>
            </div>
            <img :src="currentImageUrl" alt="Full size image" />
          </div>
        </div>

        <div class="review-modal-main" v-html="review.reviewContent" />
        <!-- 댓글 -->
        <div
          class="review-replies"
          v-for="(reply, index) in review.replies"
          :key="index"
        >
          <div class="review-replies-header">
            <div class="review-replyer">{{ reply.reviewReplyer }}</div>
            <div class="review-reply-date">
              {{ formatDate(reply.reg_date) }}
            </div>
          </div>
          <div class="review-reply">
            <div v-if="!reply.isEditing" class="reply-main">
              <div class="review-reply-content">
                {{ reply.reviewReplyContent }}
              </div>
              <div class="review-reply-control">
                <div
                  class="review-reply-update"
                  @click="editReply(reply.reviewReplyId)"
                >
                  수정
                </div>
                <div
                  class="review-reply-delete"
                  @click="deleteReply(reply.reviewReplyId)"
                >
                  삭제
                </div>
              </div>
            </div>
            <div v-else class="review-reply-main">
              <input
                class="review-reply-content-input"
                v-model="reply.editingContent"
                @keyup.enter="updateReply(reply)"
              />
              <div class="review-reply-control">
                <button
                  class="review-reply-update-save"
                  @click="updateReply(reply)"
                >
                  저장
                </button>
                <button
                  class="review-reply-update-cancel"
                  @click="reply.isEditing = false"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-new-reply">
        <input
          class="review-reply-writing"
          v-model="reviewReplyContent"
          @keyup.enter="postReply"
          placeholder="댓글을 입력해주세요.."
        />
        <button @click="postReply">등 록</button>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateReview from "../Review/UpdateReview.vue";
/* eslint-disable */

export default {
  components: {
    UpdateReview,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
    isModalVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      currentImageIndex: 0,
      selectedReview: null, //선택된 리뷰 ID
      reviewReplyContent: "", //댓글 내용
      reviewReplyer: "",
      isImageModalVisible: false,
    };
  },
  computed: {
    currentImageUrl() {
      if (
        this.review &&
        this.review.reviewImages &&
        this.currentImageIndex < this.review.reviewImages.length
      ) {
        return this.review.reviewImages[this.currentImageIndex].imageUri;
      }
      return "default-image-url"; // 혹은 기본 이미지의 URL
    },
    isOwner() {
      const ownerStatus = this.$store.state.auth.email === this.review.author;
      console.log("로그인한 사용자의 게시글이 맞는가?", ownerStatus);
      return ownerStatus;
    },
  },
  created() {
    this.fetchUserProfile();
  },

  methods: {
    async fetchUserProfile() {
      try {
        const response = await this.$axios.get("/api/v1/user/info/detail");
        console.log("API response:", response); // API 응답 로깅
        this.$store.commit("auth/SET_USER_EMAIL", response.data.email);
      } catch (error) {
        console.error("인증된 사용자가 아닙니다. : ", error);
      }
    },
    //댓글작성 메소드
    async postReply() {
      if (!this.reviewReplyContent.trim() && !this.reviewReplyer.trim()) {
        alert("댓글 내용을 입력하세요");
        return;
      }
      try {
        const response = await this.$axios.post(
          `https://jejurang.site:8080/api/reviews/${this.review.reviewId}/reply`,
          {
            reviewReplyer: this.reviewReplyer,
            reviewReplyContent: this.reviewReplyContent,
          }
        );
        alert("댓글이 등록되었습니다.");
        this.reviewReplyer = "";
        this.reviewReplyContent = "";
        //부모컴포넌트에 review객체를 보내고 새로고침 요청
        this.$emit("refresh-modal", this.review);
      } catch (error) {
        if (error.response && error.response.data) {
          //백엔드에서 보낸 에러메시지 표시
          alert(`${error.response.data.message}`);
          console.error(error.response.data.message);
        } else {
          console.error("댓글 작성 실패 : ", error);
        }
      }
    },
    openImageModal() {
      this.isImageModalVisible = true;
    },
    closeImageModal() {
      this.isImageModalVisible = false;
    },
    editReview() {
      //부모컴포넌트에 edit 이벤트를 발생 시키고 현재 리뷰 id를 전달
      this.$emit("edit", this.review.reviewId);
    },

    async deleteReview(reviewId) {
      if (confirm("게시글을 정말 삭제하시겠습니까?")) {
        try {
          await this.$axios.delete(
            `https://jejurang.site:8080/api/reviews/${reviewId}`
          );
          alert("게시글이 삭제 되었습니다.");
          this.$emit("close");
          this.$emit("deleted");
        } catch (error) {
          if (error.response && error.response.data) {
            //백엔드에서 보낸 에러메시지 표시
            alert(`${error.response.data.message}`);
            console.error(error.response.data.message);
          } else {
            console.error("리뷰 삭제에 실패하였습니다: ", error);
          }
        }
      }
    },
    editReply(replyId) {
      // 댓글 ID를 사용하여 현재 댓글 객체를 찾습니다.
      const reply = this.review.replies.find(
        (r) => r.reviewReplyId === replyId
      );

      // 댓글 객체를 찾았다면 수정 상태로 전환합니다.
      if (reply) {
        // 다른 댓글들의 수정 상태를 해제합니다.
        this.review.replies.forEach((r) => {
          r.isEditing = false;
        });

        // 현재 댓글의 편집 상태를 true로 설정하고, 현재 내용을 복사합니다.
        reply.isEditing = true;
        reply.editingContent = reply.reviewReplyContent;
      } else {
        console.error("해당하는 댓글을 찾을 수 없습니다.");
      }
    },

    async updateReply(reply) {
      try {
        await this.$axios.put(
          `https://jejurang.site:8080/api/reviews/${reply.reviewReplyId}/reply`,
          {
            reviewReplyContent: reply.editingContent,
          }
        );
        reply.reviewReplyContent = reply.editingContent;
        reply.isEditing = false;
        alert("댓글이 수정되었습니다.");
      } catch (error) {
        if (error.response && error.response.data) {
          //백엔드에서 보낸 에러메시지 표시
          alert(`${error.response.data.message}`);
          console.error(error.response.data.message);
        } else {
          console.error("댓글 수정에 실패하였습니다: ", error);
        }
      }
    },
    async deleteReply(replyId) {
      if (confirm("댓글을 정말 삭제하시겠습니까?")) {
        try {
          await this.$axios.delete(
            `https://jejurang.site:8080/api/reviews/${replyId}/reply`
          );
          alert("댓글이 삭제되었습니다.");
          this.$emit("refresh-modal", this.review);
        } catch (error) {
          if (error.response && error.response.data) {
            //백엔드에서 보낸 에러메시지 표시
            alert(`${error.response.data.message}`);
            console.error(error.response.data.message);
          } else {
            console.error("댓글 삭제에 실패하였습니다: ", error);
          }
        }
      }
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

    nextImage() {
      if (this.currentImageIndex < this.review.reviewImages.length - 1) {
        this.currentImageIndex++;
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
    // 날짜를 인자로 받아서 원하는 형태의 문자열로 변환하여 반환
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/review_modal.css";

.imageModal-overlay {
  position: fixed; /* 화면에 고정 */
  top: 50%;
  left: 50%;
  width: 100vw; /* 모달의 너비 */
  height: 100vh; /* 모달의 높이 */
  background-color: rgba(0, 0, 0, 0.6); /* 배경색 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소들 위에 나타나도록 z-index 설정 */
  transform: translate(-50%, -50%); /* 중앙 정렬을 위해 변환 적용 */
}

.imageModal-content {
  position: relative; /* 상대 위치 설정 */
  max-width: 90vw; /* 화면 너비를 초과하지 않도록 */
  max-height: 90vh; /* 화면 높이를 초과하지 않도록 */
  display: flex; /* flex 컨테이너로 설정 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.imageModal-content img {
  max-width: 100%; /* 이미지의 실제 크기를 유지하되, 컨테이너 너비를 초과하지 않도록 함 */
  max-height: 100%; /* 이미지의 실제 크기를 유지하되, 컨테이너 높이를 초과하지 않도록 함 */
}
.image-container {
  position: relative;
  cursor: pointer;
}
</style>
// eslint-disable-next-line
/* eslint-disable */

<template>
    <div class="reply-modal-overlay" v-if="replyModalCreate">
      <div class="reply-modal">
        <div class="reply-modal-body">
          <div class="reply-info">
            <div>
                <img class="reply-image" :src="recommendPlaceImgPath || 'default-image-url'" alt="Review Image">
            </div>
            <div class="reply-info-text">
                <h5>{{ recommendPlaceTitle }} 방문하셨나요? :)</h5>
                <span>{{ recommendPlaceIntroduction }}</span>
            </div>
          </div>
        </div>
        <div class="reply-contents">
          <form @submit.prevent="submitReplyModal" class="review-form">
            <div class="star-rating">
              <!-- 평점 -->
              <span
              class="star"
              v-for="star in 5"
              :key="star"
              :class="{ filled: star <= reply.recommendReplyStar }"
              @click="setRating(star)">
              ★
              </span>
            </div>
            <div class="feedback-buttons">
              <button
                v-for="option in feedbackOptions"
                :key="option"
                :class="{ 'feedback-button-selected': reply.recommendReplyTagValue && reply.recommendReplyTagValue.includes(option) }"
                class="feedback-button"
                @click="toggleFeedback(option)"
              >
                {{ option }}
              </button>
            </div>
            <div class="modal-btn">
              <!-- <button class="action-button cancel" @click="close">취소</button> -->
              <button type="button" class="btn btn-secondary cancel" style="width: 120px" @click="close">취소</button>
              <!-- <button class="action-button confirm" @click="submitFeedback">제출</button> -->
              <button type="button" class="btn btn-primary confirm" style="width: 120px" @click="submitFeedback">제출</button>
            </div>
          </form>
       </div>
      </div>
    </div>
  </template>

<script>

export default {
  props: {
    recommendPlaceId: Number,  // 푸드 ID
    replyModalCreate: Boolean,
    type: {
      type: String,
      default: 'Place',  // 기본적으로 제공되는 유형
      validator: function (value) {
        // type이 지정된 값 중 하나인지 검증
        return ['Place', 'hotel', 'event', 'place'].includes(value);
      }
    }
  },
  data() {
    return {
      rating: 0,
      recommendPlaceImgPath: '',
      recommendPlaceTitle: '',
      recommendPlaceIntroduction: '',
      reply: {
        recommendPlaceId: null,
        recommendReplyStar: '',
        recommendReplyTagValue: []
      }
    };
  },
  computed: {
    feedbackOptions() {
      // 항목 유형에 따른 피드백 옵션 제공
      const options = {
        food: ['😋음식이 맛있어요', '💚재료가 신선해요', '🍚양이 많아서 좋아요', '🧡가성비가 좋아요', '😍또 가고 싶어요'],
        hotel: ['💙객실이 깨끗해요', '😎위치가 좋아요', '😍서비스 만족해요', '🍽조식이 맛있어요', '👀경치가 좋아요'],
        event: ['🤗내용이 흥미로워요', '🚗접근성이 좋아요', '💙만족스러운 시설', '😍분위기가 좋아요', '✨다시 참여할래요'],
        place: ['💙경치가 멋져요', '🚗접근성이 좋아요', '😊편의시설 갖춰짐', '💛편안하게 즐겨요', '📸사진 찍기 좋아요']
      };
      return options[this.type] || [];  // type이 유효하지 않은 경우 빈 배열 반환
    }
  },
  methods: {
    async fetchPlaceDetails() {
      if (!this.recommendPlaceId) {
          console.error("recommendPlaceId is not provided!");
          return;
      }
      console.log("전달 받은 PlaceID:", this.recommendPlaceId);  // 현재 ID 로깅
      try {
          const response = await this.$axios.get(`/api/recommend/listplace/${this.recommendPlaceId}`);
          if (response.data) {
          this.recommendPlaceImgPath = response.data.recommendPlaceImgPath;
          this.recommendPlaceTitle = response.data.recommendPlaceTitle;
          this.recommendPlaceIntroduction = response.data.recommendPlaceIntroduction;
          }
      } catch (error) {
          console.error('Error fetching Place details:', error);
      }
    },//fetchPlaceDetails
    submitReplyModal(){
      //this.createModal();
    },
  async createModal(){
    const formData = new FormData();
    formData.append("recommendPlaceId", this.reply.recommendPlaceId);
    formData.append("recommendReplyStar", this.reply.recommendReplyStar);
    formData.append("recommendReplyTagValue", this.reply.recommendReplyTagValue);
    // formData.append("recommendReplyTagValue", JSON.stringify(this.reply.recommendReplyTagValue));
    
    console.log("POST요청 푸드ID:", this.reply.recommendPlaceId);
    console.log("POST요청 data:", {
    recommendReplyStar: this.reply.recommendReplyStar,
        recommendReplyTagValue: this.reply.recommendReplyTagValue
    });

    try {
      const response = await this.$axios.post(`/api/recommendreply/place/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
      },
      });
      console.log('Server Response:', response);
      this.$emit("close");
    } catch (error) {
      console.error("POST request failed:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  }, //createModal
    setRating(star) {
      this.reply.recommendReplyStar = star; // 이 부분에서 실제로 `recommendReplyStar`가 업데이트되는지 확인
      console.log("Updated recommendReplyStar:", this.reply.recommendReplyStar); // 업데이트된 recommendReplyStar 값 출력
      //this.rating = star;
    }, //setRating
    toggleFeedback(option) {
      // 배열을 안전하게 접근하기 위해 reply 객체 내부의 recommendReplyTagValue를 참조
      if (!this.reply.recommendReplyTagValue) {
        this.reply.recommendReplyTagValue = []; // 배열이 undefined일 경우 초기화
      }
      const index = this.reply.recommendReplyTagValue.indexOf(option);
      if (index === -1) {
        this.reply.recommendReplyTagValue.push(option); // 옵션이 배열에 없으면 추가
        console.log("선택 추가된 태그정보:", option); // 추가된 옵션 로깅
      } else {
        this.reply.recommendReplyTagValue.splice(index, 1); // 옵션이 이미 배열에 있으면 제거
        console.log("선택 제거 된 태그정보:", option); // 제거된 옵션 로깅
      }
      console.log("현재 저장된 태그:", this.reply.recommendReplyTagValue); // 현재 배열 상태 로깅
    }, //toggleFeedback
    close(){
      // 이벤트를 발생시켜 부모 컴포넌트에게 모달을 닫으라고 알립니다.
      this.$emit('close');
    }, //close
    submitFeedback() {
      // 사용자가 제출 버튼을 누른 후에 실행될 함수
      this.createModal(); // 서버로 데이터를 전송하는 함수 직접 호출
      this.$router.push({ name: 'detailplace', params: { recommendPlaceId: this.recommendPlaceId } }).catch(err => {
      console.error(err);
    });
    }, //submitFeedback
  },
    watch: {
        recommendPlaceId(newVal) {
            if (newVal) {
                console.log("recommendPlaceId has changed to:", newVal);  // ID 변경 감지 로그
                this.fetchPlaceDetails();
        }
    }
  },
  mounted() {
    // props 값을 data에 할당
    // props에서 받은 recommendPlaceId를 data reply: { recommendPlaceId: null}에 넣기
    this.reply.recommendPlaceId = this.recommendPlaceId;
    if (this.recommendPlaceId) {
      console.log("Mounted with recommendPlaceId:", this.recommendPlaceId);  // 마운트 시 ID 로깅
      this.fetchPlaceDetails();
    }
  },
  
};
</script>

<style scoped>
@import "@/assets/css/createModal_style.css";
</style>
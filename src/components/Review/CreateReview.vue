<template>
  <div class="update-modal-overlay">
    <div class="update-modal" v-if="isModalCreate">
      <div class="update-modal-body">
        <h2>게시글 작성</h2>
        <form @submit.prevent="submitForm" class="review-form">
          <div class="update-form-group">
            <label for="title">제목</label>
            <input
              id="title"
              type="text"
              v-model="review.reviewTitle"
              class="update-form-control-title"
            />
            <select
              id="location"
              v-model="review.reviewLocation"
              class="update-form-control-location"
            >
              <option value="전체 지역">전체 지역</option>
              <option value="제주 북부">제주 북부</option>
              <option value="제주 남부">제주 남부</option>
              <option value="제주 동부">제주 동부</option>
              <option value="제주 서부">제주 서부</option>
            </select>
          </div>
          <div class="update-form-group">
            <label for="subtitle">부제목</label>
            <input
              id="subtitle"
              type="text"
              v-model="review.reviewSubtitle"
              class="update-form-control"
            />
          </div>
          <div class="update-form-group">
            <label for="newImages">이미지 업로드</label>
            <input
              id="newImages"
              type="file"
              @change="handleFiles"
              multiple
              class="update-form-control"
            />
          </div>
          <div class="image-preview-container">
            <div
              v-for="(image, index) in review.reviewImages"
              :key="'new-' + index"
              class="image-preview"
            >
              <span class="image-name">✓ {{ image.imageName }} </span>

              <div
                class="btn-remove"
                @click="removeNewImage(index)"
                style="color: #6e6e6e"
              >
                <font-awesome-icon :icon="['fas', 'xmark']" />
              </div>
            </div>
          </div>
          <div class="update-form-group">
            <!--tiptap3 Editor-->
            <link
              href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
              rel="stylesheet"
            />

            <AppTextEditor v-model="review.reviewContent" :max-limit="500" />
          </div>
          <div class="update-form-actions">
            <button
              type="button"
              @click="$emit('cancel')"
              class="btn btn-secondary"
            >
              취 소
            </button>
            <button type="submit" class="btn btn-primary">저 장</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script >
import AppTextEditor from "./AppTextEditor";

/* eslint-disable */

export default {
  name: "CreateReview",
  components: { AppTextEditor },
  props: {
    isModalCreate: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      review: {
        reviewTitle: "",
        reviewSubtitle: "",
        reviewLocation: "제주 전체",
        reviewContent: "",
        reviewImages: [],
      },
    };
  },
  methods: {
    submitForm() {
      this.createReview();
    },
    handleFiles(event) {
      // 새로 선택된 파일들을 배열로 변환
      const files = Array.from(event.target.files);
      // 새 이미지 파일들을 newReviewImages 배열에 저장하고, 표시를 위해 이미지 이름과 함께 객체를 만듭니다.
      const newImagesData = files.map((file) => ({
        imageName: file.name,
        file: file, // 파일 데이터
        isNew: true,
      }));
      this.review.reviewImages.push(...newImagesData); // 이미지 데이터를 reviewImages 배열에 추가합니다.
    },

    removeNewImage(index) {
      // 새 이미지를 배열에서 제거합니다.
      this.review.reviewImages.splice(index, 1);
    },

    async createReview() {
      const formData = new FormData();
      formData.append("reviewTitle", this.review.reviewTitle);
      formData.append("reviewSubtitle", this.review.reviewSubtitle);
      formData.append("reviewLocation", this.review.reviewLocation);
      formData.append("reviewContent", this.review.reviewContent);

      // 새로운 이미지와 기존 이미지를 formData에 추가하는 코드
      this.review.reviewImages.forEach((image) => {
        if (image.isNew) {
          // 새로운 이미지 파일 추가
          formData.append("reviewImages", image.file);
        }
      });
      // FormData 내용 검사
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      try {
        const response = await this.$axios.post(`https://ec2-3-34-189-167.ap-northeast-2.compute.amazonaws.com:8080/api/reviews`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.$emit("close");
      } catch (error) {
        if (error.response && error.response.data) {
          //백엔드에서 보낸 에러메시지 표시
          alert(`${error.response.data.message}`);
          console.error(error.response.data.message);
        } else {
          console.error("업데이트 실패 : ", error);
        }
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/review_modal_update.css";
</style>
  
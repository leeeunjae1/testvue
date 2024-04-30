<template>
  <div class="modal-overlay">
    <div class="login-modal-content">
      <h1 class="modal-title">
        {{ currentStep === 0 ? "이미지 추가" : "추가정보" }}
      </h1>
      <form @submit.prevent="socialRegister" class="signup-form">
        <!-- 프로필 이미지와 이름 입력 구역 (단계 1) -->
        <div v-if="currentStep === 0" class="signup-group">
          <div class="signup-group">
            <div style="padding-top: 30px">
              <h5 style="padding-bottom: 30px">
                이름과 프로필사진을 등록해주세요
              </h5>
            </div>
            <div class="file-upload-container">
              <!-- 프로필 이미지 업로드 구역 -->
              <div class="file-upload-wrapper">
                <div class="image-upload-preview" v-if="profileImageSrc">
                  <img :src="profileImageSrc" class="profile-image" />
                  <button
                    type="button"
                    class="image-edit-button"
                    @click.prevent="triggerFileInput"
                  >
                    &#9998;
                  </button>
                  <!-- 이모티콘은 적절한 아이콘으로 교체 가능 -->
                </div>
                <div v-else class="image-upload-placeholder">
                  <button
                    type="button"
                    @click="triggerFileInput"
                    class="file-upload-button"
                  ></button>
                </div>
                <input
                  type="file"
                  id="profileImage"
                  ref="profileImage"
                  @change="handleFileChange"
                  style="display: none"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="email">이메일</label>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="이메일"
                required
                readonly
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                id="userName"
                v-model="userName"
                required
                placeholder="이름"
                class="input-field"
                readonly
              />
            </div>

            <button @click="nextStep" class="next-button">다음</button>
          </div>
        </div>

        <div v-if="currentStep === 1" style="margin-top: 20px">
          <div class="signup-group-name" style="width: 300px">
            <select id="gender" v-model="gender" required>
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
          </div>
          <div class="signup-group-name">
            <img src="@/assets/images/age.png" class="input-icon" alt="Icon" />
            <!-- 나이 이미지 아이콘 -->
            <input
              type="number"
              id="age"
              v-model="age"
              required
              placeholder="   나이"
              class="input-field"
            />
          </div>

          <div>
            <div class="signup-group-name">
              <img
                src="@/assets/images/location.png"
                class="input-icon"
                alt="Icon"
              />
              <input
                type="text"
                placeholder="    우편번호"
                class="input-field"
                v-model="zonecode"
                readonly
              />
              <button
                id="postcode"
                type="button"
                @click="openPostcode"
                class="icon-button"
              >
                <font-awesome-icon icon="search" style="color: #65b7f3" />
              </button>
            </div>

            <div class="signup-group-name" style="padding-left: 40px">
              <input
                type="text"
                v-model="roadAddress"
                placeholder="주소"
                class="input-field"
                readonly
              />
            </div>

            <div class="signup-group-name" style="padding-left: 40px">
              <input
                type="text"
                v-model="detailAddress"
                placeholder="상세주소"
                class="input-field"
                @blur="saveAddress"
                ref="detailAddress"
              />
            </div>
            <div style="padding-left: 10px; font-weight: bold">
              <span style="font-weight: bold; color: #68c7ff">Q. </span> 당신의
              가장 좋아하는 여행지는 어디인가요?
            </div>
            <div style="padding-left: 40px">
              <input
                type="text"
                v-model="answer"
                placeholder="질문에 대한 답을 적어주세요"
                class="input-field"
                ref="answer"
              />
            </div>
          </div>
          <button type="submit" class="signup-button">상세정보 저장</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  data() {
    return {
      userName: this.userName,
      email: this.email,
      age: null,
      gender: "",
      address: "",
      answer: "",
      profileImageFile: null, // 선택된 파일 저장
      currentStep: 0, // 현재 단계를 추적하는 속성
      profileImageSrc: null, // 선택된 이미지의 데이터 URL을 저장
      zonecode: "",
      roadAddress: "",
      detailAddress: "",
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  mounted() {
    this.fetchAccessToken();
  },
  methods: {
    async fetchAccessToken() {
      const code = this.$route.query.code;
      await this.$axios({
        method: "post",
        url: "/api/v1/accessToken",
        params: {
          code: code, // URL 인코딩이 필요 없는 경우
        },
      })
        .then((response) => {
          console.log("code : ", code);
          console.log(response);

          this.processLoginResponse(response);
        })
        .catch((error) => {
          console.error("Error message:", error.message);
        });
    },
    processLoginResponse(response) {
      //jwt 토큰을 헤더에서 추출
      const jwtToken =
        response.headers["authorization"] || response.headers["Authorization"];
      const kakaoAccessToken = response.data.kakaoAccessToken; // 서버 응답에서 kakaoAccessToken 추출
      this.userName = response.data.userName; // 예: 사용자 이름
      this.email = response.data.email; // 예: 이메일
      console.log(userName, email, kakaoAccessToken);

      if (jwtToken && kakaoAccessToken) {
        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("kakaoAccessToken", kakaoAccessToken); // 로컬 스토리지에 카카오 액세스 토큰 저장
        localStorage.setItem("userName", this.userName);
        localStorage.setItem("email", this.email);

        this.$store.dispatch("auth/kakaoAccessToken", {
          jwtToken,
          kakaoAccessToken,
          userName,
          email,
        });

        if (response.data.isNewMember) {
          this.$router.push({
            path: "/social",
            query: { token: jwtToken },
          });
        } else {
          this.$router.push("/").then(() => {
            // 페이지 이동 후 새로고침
            window.location.reload();
          });
        }
      }
    },

    socialRegister() {
      const kakaoAccessToken = this.$store.state.auth.kakaoAccessToken;
      console.log("회원정보", kakaoAccessToken);
      if (!kakaoAccessToken) {
        alert("엑세스 토큰이 누락되었습니다.");
        return;
      }
      //추가 회원 정보와 함께 백엔드로 요청
      const formData = new FormData();
      // 멤버 정보를 객체로 생성
      formData.append("memberName", this.userName);
      formData.append("memberEmail", this.email);
      formData.append("memberAge", this.age);
      formData.append("memberGender", this.gender);
      formData.append("memberAddress", this.address);
      formData.append("memberFindPasswordAnswer", this.answer);
      // 액세스 토큰 추가
      formData.append("accessToken", kakaoAccessToken);

      // 프로필 이미지 파일 추가
      if (this.profileImageFile) {
        formData.append("files", this.profileImageFile);
      }
      console.log("서버 요청 전송 데이터:", formData); // 요청 전송 직전
      //회원가입요청보내기
      this.$axios
        .put("/api/v1/signup-with-kakao", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/").then(() => {
            // 페이지 이동 후 새로고침
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data.message || "오류가 발생했습니다.");
        });
    },
    triggerFileInput() {
      console.log("File input triggered");
      this.$refs.profileImage.click();
    },
    handleFileChange() {
      const file = this.$refs.profileImage.files[0];
      if (file) {
        // 데이터 URL을 읽어 이미지 미리보기를 설정합니다.
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImageSrc = e.target.result; // 미리보기 이미지를 데이터 URL로 설정
        };
        reader.readAsDataURL(file);
        // 파일 객체를 저장합니다.
        this.profileImageFile = file;
      }
    },
    nextStep() {
      // 현재 단계를 증가시키는 로직
      if (this.currentStep < 1) {
        this.currentStep++;
      }
    },
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
          this.zonecode = data.zonecode; // 우편번호
          this.roadAddress = data.roadAddress; // 도로명 주소
          this.detailAddress = ""; // 상세 주소는 초기화
          // 이제 세 부분의 주소를 합쳐서 `address`에 저장
          this.address = `${data.roadAddress}`; // 도로명 주소로 초기 설정
          this.$refs.detailAddress.focus(); // 상세 주소 필드에 포커스를 줍니다.
        },
      }).open();
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/login_style.css";
</style>
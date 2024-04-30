<template>
  <!-- 모달 창 -->
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="login-modal-content">
      <span class="close" @click.self="$emit('close')">&times;</span>
      <h1 class="modal-title">
        {{ title }}
      </h1>

      <!-- 로그인 폼 -->
      <form
        v-if="currentView === 'login'"
        @submit.prevent="login"
        class="login-form"
      >
        <!-- 로그인 필드 -->
        <div class="form-group">
          <label for="email">이메일</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="이메일"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <div class="password-container">
            <input
              :type="passwordFieldType"
              id="password"
              v-model="password"
              placeholder="비밀번호"
              required
            />
            <span class="password-toggle-icon" @click="togglePasswordVisibility"
              >&#128065;</span
            >
          </div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              font-size: 12px;
            "
          >
            <div>비밀번호를 잊으셨나요?</div>
            <div
              @click="switchView('reset')"
              @close="closePasswordModal"
              style="cursor: pointer; color: #68c7ff"
            >
              비밀번호 찾기
            </div>
          </div>
        </div>

        <button type="submit" class="submit-button">로그인</button>
        <p>OR</p>
        <button class="google-signin" @click="redirectToKakaoLogin">
          카카오 계정으로 로그인하기
        </button>
        <p class="signup-prompt">
          아직 회원이 아니신가요?
          <a @click="switchView('signup')">회원가입 하기</a>
        </p>
      </form>

      <!-- 비밀번호 찾기 모달-->
      <div v-else-if="currentView === 'reset'">
        <form @submit.prevent="resetPassword" class="reset-password-form">
          <div class="reset-password-name">
            <img
              src="@/assets/images/person1.png"
              class="input-icon"
              alt="Icon"
            />
            <input
              type="text"
              id="name"
              v-model="resetName"
              required
              placeholder="이름"
              class="input-field"
            />
          </div>
          <div class="reset-password-name">
            <img
              src="@/assets/images/email.png"
              class="input-icon"
              alt="Icon"
            />
            <!-- 이미지 아이콘 -->
            <input
              type="email"
              id="email"
              v-model="resetEmail"
              required
              placeholder="이메일"
              class="input-field"
            />
          </div>
          <div class="reset-password-question">
            <div>
              <span style="font-weight: bold; color: #68c7ff; font-size: 20px"
                >Q.
              </span>
              당신의 가장 좋아하는 여행지는 어디인가요?
            </div>
            <input
              type="text"
              v-model="resetAnswer"
              placeholder="질문에 대한 답을 적어주세요"
              class="input-field"
            />
          </div>
          <button type="submit" class="submit-button">임시비밀번호 받기</button>
        </form>
      </div>

      <!-- 회원가입 폼 -->
      <form v-else @submit.prevent="register" class="signup-form">
        <!-- 약관 동의 창 (단계 0) -->
        <div v-if="currentStep === 0" class="terms-conditions">
          <div class="terms-header">
            <img
              src="@/assets/images/haru.png"
              style="height: 100px; width: 70px"
              alt="Icon"
            />
            <h5 style="font-weight: bold; padding-top: 20px">
              제주랑에 오신 것을 환영합니다.
            </h5>
            <p style="color: #c8c8c8; padding-top: 15px">
              제주랑 서비스를 이용하시려면 개인정보 이용약관 및 <br />서비스
              이용약관 동의가 필요합니다.
            </p>
          </div>
          <div class="terms-content">
            <ul class="terms-list">
              <li class="terms-list-item">
                <div class="terms-label-container">
                  <label class="terms-item">
                    <input
                      type="checkbox"
                      v-model="terms.PersonalInformation"
                      :checked="terms.PersonalInformation"
                    />
                    (필수) 개인정보 수집 및 이용 안내
                  </label>
                </div>
                <button type="button" class="more-button" @click="showTerms">
                  <font-awesome-icon icon="chevron-right" />
                </button>
              </li>
              <terms-of-service
                v-if="isTermsVisible"
                @close="isTermsVisible = false"
              ></terms-of-service>

              <li class="terms-list-item">
                <div class="terms-label-container">
                  <label for="service-terms" class="terms-item">
                    <input
                      type="checkbox"
                      id="service-terms"
                      v-model="terms.service"
                      :checked="terms.service"
                    />
                    (필수) 서비스 이용 약관
                  </label>
                </div>
                <button
                  type="button"
                  class="more-button"
                  @click="showPersonalInformation"
                >
                  <font-awesome-icon icon="chevron-right" />
                </button>
              </li>
              <personal-information
                v-if="isPersonalInformationVisible"
                @close="isPersonalInformationVisible = false"
              />

              <li>
                <label class="terms-item">
                  <input
                    type="checkbox"
                    v-model="terms.privacy"
                    :checked="terms.privacy"
                  />
                  (필수) 모욕 및 명예훼손 발언금지
                </label>
              </li>
            </ul>

            <label class="terms-item">
              <input
                type="checkbox"
                v-model="terms.all"
                :checked="terms.all"
                @change="selectAll"
              />
              전체동의
            </label>
          </div>
          <button
            :class="{
              'next-button': true,
              'disabled-button':
                !terms.PersonalInformation || !terms.service || !terms.privacy,
            }"
            :disabled="
              !terms.PersonalInformation || !terms.service || !terms.privacy
            "
            @click="nextStep"
          >
            동의하고 다음으로
          </button>
        </div>

        <!-- 프로필 이미지와 이름 입력 구역 (단계 1) -->
        <div v-if="currentStep === 1" class="signup-group">
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
                  @click="triggerFileInput"
                >
                  &#9998;
                </button>
                <!-- 이모티콘은 적절한 아이콘으로 교체 가능 -->
              </div>
              <div v-else class="image-upload-placeholder">
                <button
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
          <div class="signup-group-name" style="margin-top: 40px">
            <img src="@/assets/images/name.png" class="input-icon" alt="Icon" />
            <!-- 이미지 아이콘 -->
            <input
              type="text"
              id="name"
              v-model="name"
              required
              placeholder="이름"
              class="input-field"
            />
            <select id="gender" v-model="gender" required>
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
          </div>
          <div class="signup-name">
            <p>반드시 실명을 입력해주세요.</p>
          </div>
          <button @click="nextStep" class="next-button">다음</button>
        </div>

        <div v-else-if="currentStep === 2" style="margin-top: 20px">
          <div class="signup-group-name">
            <img
              src="@/assets/images/email.png"
              class="input-icon"
              alt="Icon"
            />
            <!-- 이미지 아이콘 -->
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="이메일"
              class="input-field"
            />
          </div>
          <div class="input-group" style="padding-bottom: 13px">
            <img
              src="@/assets/images/password.png"
              class="input-icon"
              alt="Icon"
            />
            <!-- 비밀번호 이미지 아이콘 -->
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="비밀번호"
              class="input-field"
            />
          </div>
          <div class="input-group" style="padding-bottom: 13px">
            <img
              src="@/assets/images/passwordCheck.png"
              class="input-icon"
              alt="Icon"
            />
            <!-- 비밀번호 확인 이미지 아이콘 -->
            <input
              type="password"
              id="password-confirm"
              v-model="passwordConfirm"
              required
              placeholder="비밀번호 확인"
              class="input-field"
              :class="{
                'is-valid': passwordMatch,
                'is-invalid': !passwordMatch,
              }"
            />
            <span v-if="passwordMatch" class="icon is-small is-right">
              <font-awesome-icon
                icon="fa-solid fa-check"
                style="color: #65b7f3"
              />
            </span>
            <span v-else class="icon is-small is-right">
              <font-awesome-icon
                icon="fa-solid fa-xmark"
                style="color: #f7c347"
              />
            </span>
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
          <button type="submit" class="signup-button">회원가입</button>
        </div>

        <!-- 회원가입 완료 메시지 (단계 3) -->
        <div v-if="currentStep === 3" class="signup-complete">
          <h2>제주랑에 오신걸 환영합니다!</h2>
          <p>제주랑이 준비한<br />맞춤여행소개 서비스를 이용해보세요</p>
          <button @click="gotoLogin">나만의 여행스타일 바로가기</button>
          <button @click="$emit('close')">화면 닫기</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import TermsOfService from "@/components/Agreement/TermsOfService.vue";
import PersonalInformation from "@/components/Agreement/PersonalInformation.vue";

export default {
  components: {
    TermsOfService,
    PersonalInformation,
  },
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: "", // 비밀번호 확인을 위한 새로운 데이터 속성
      showModal: false,
      showFindPasswordModal: false,
      currentView: "login", // 현재 보여줄 뷰
      passwordFieldType: "password",
      showSignupModal: false, // 회원가입 모달을 관리할 새로운 데이터 속성
      name: "",
      email: "",
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
      isTermsVisible: false,
      isPersonalInformationVisible: false,
      terms: {
        PersonalInformation: false,
        all: false,
        service: false,
        privacy: false,
      },
      resetName: "",
      resetEmail: "",
      resetAnswer: "",
    };
  },
  computed: {
    passwordMatch: function () {
      return this.password === this.passwordConfirm;
    },
    title() {
      switch (this.currentView) {
        case "login":
          return "로그인";
        case "reset":
          return "비밀번호 재설정";
        case "signup":
          return "회원가입";
        default:
          return "로그인";
      }
    },
  },
  methods: {
    redirectToKakaoLogin() {
      //카카오 로그인페이지로 리디렉션할 url 생성
      //client_id와 redirect_ri는 실제 어플리케이션에 맞게 변경해야한다.
      const CLIENT_ID = "100bde42d2ac4c0bf9cf54655e5395cc";
      const REDIRECT_URI = "https://ec2-3-34-189-167.ap-northeast-2.compute.amazonaws.com:8081/social";

      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      //사용자를 카카오 로그인페이지로 리디렉션
      window.location.href = kakaoAuthUrl;
    },
    login() {
      const data = {
        memberEmail: this.username,
        memberPassword: this.password,
      };
      this.$axios
        .post("/login", data) // this.$axios로 변경
        .then((response) => {
          const jwtToken =
            response.headers["authorization"] ||
            response.headers["Authorization"];
          if (jwtToken) {
            localStorage.setItem("Authorization", jwtToken);

            this.$emit("login-success"); //모달닫기 이벤트 전송
            window.location.reload();
          } else {
            alert("JWT 토큰을 받지 못했습니다.");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert("로그인 실패: " + error.message);
        });
    },
    nextStep() {
      // 현재 단계를 증가시키는 로직
      if (this.currentStep < 2) {
        this.currentStep++;
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    // switchToSignup() {
    //   this.showModal = false; // 로그인 모달 닫기
    //   this.showSignupModal = true; // 회원가입 모달 열기
    // },
    triggerFileInput() {
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
    validatePassword() {
      if (this.password !== this.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      }
      return true;
    },
    register() {
      if (!this.validatePassword()) {
        return; // 비밀번호가 일치하지 않으면 등록 절차 중단
      }
      // 비밀번호가 일치하면 회원가입 로직을 계속 진행
      const formData = new FormData();
      // 멤버 정보를 객체로 생성
      const member = {
        memberName: this.name,
        memberEmail: this.email,
        memberPassword: this.password,
        memberAge: this.age,
        memberGender: this.gender,
        memberAddress: this.address,
        memberFindPasswordAnswer: this.answer,
      };

      // 'member' 객체를 JSON 문자열로 변환하여 추가
      formData.append(
        "member",
        new Blob([JSON.stringify(member)], { type: "application/json" })
      );

      // 프로필 이미지 파일 추가
      if (this.profileImageFile) {
        formData.append("files", this.profileImageFile);
      }

      // 서버에 POST 요청
      this.$axios
        .post("/api/v1/join", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Registration successful:", response);
          alert("회원가입이 성공적으로 완료되었습니다.");
          this.currentStep++; // 회원가입 성공 후 다음 단계로
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          alert(
            "회원가입 실패: " +
              (error.response.data.message || "오류가 발생했습니다.")
          );
        });
    },

    switchView(view) {
      this.currentView = view; // 현재 뷰 전환
    },
    closeModal() {
      // this.showModal = false;
      this.currentView = "login"; // 모달을 닫을 때 로그인 뷰로 리셋
      this.$emit("close");
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
    saveAddress() {
      // 우편번호, 도로명 주소, 상세 주소를 합쳐 `address`에 저장
      this.address =
        `${this.zonecode} ${this.roadAddress} ${this.detailAddress}`.trim();
    },
    selectAll(event) {
      const checked = event.target.checked;
      this.terms.PersonalInformation = checked;
      this.terms.all = checked;
      this.terms.service = checked;
      this.terms.privacy = checked;
    },
    showTerms() {
      this.isTermsVisible = !this.isTermsVisible;
    },
    showPersonalInformation() {
      this.isPersonalInformationVisible = !this.isPersonalInformationVisible;
    },
    gotoLogin() {
      // 로그인 페이지로 이동
      this.$router.push("/login");
    },
    resetPassword() {
      // 멤버 정보를 객체로 생성
      const data = {
        memberName: this.resetName,
        memberEmail: this.resetEmail,
        memberFindPasswordAnswer: this.resetAnswer,
      };

      // 서버에 POST 요청
      this.$axios
        .post("/api/v1/user/findpassword", data)
        .then((response) => {
          console.log("Registration successful:", response);
          alert("임시 비밀번호가 전송되었습니다.");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          alert(
            "비밀번호 찾기 실패: " +
              (error.response.data.message || "오류가 발생했습니다.")
          );
        });
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/login_style.css";
</style>
<template>
  <nav :class="{ 'main-page': isMainPage, scrolled: isScrolled }">
    <router-link class="main-logo" to="/"
      ><img src="./assets/images/jejurang-logo.png" style="width: 140px" />
    </router-link>

    <div class="nav-links">
      <router-link to="/chatting"> 메이트 찾기</router-link>
      <router-link to="/reviews"> 여행후기 </router-link>
      <router-link to="/list">리스트</router-link>
      <router-link to="/course">코스</router-link>
      <router-link to="/travel">여행스타일</router-link>
    </div>
    <div class="login">
      <div v-if="!isAuthenticated">
        <button @click="showLoginModal">로그인</button>
      </div>
      <div v-else class="user-info">
        <img
          v-if="userImage"
          :src="userImage || 'default-image-url'"
          class="user-image"
        />
        {{ userName }} 님 환영합니다..
        <button @click="logout">로그아웃</button>
      </div>
    </div>
    <login-modal
      v-if="showModal"
      @close="showModal = false"
      @login-success="handleLoginSuccess"
    />
  </nav>
  <router-view />
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/reviews">Review</router-link> |
    <router-link to="/schedule">schedule</router-link>
  </nav> -->
</template>

<script>
import LoginModal from "./components/LogIn.vue";
/* eslint-disable */
export default {
  name: "App",
  components: {
    LoginModal,
  },
  data() {
    return {
      showModal: false,
      isAuthenticated: !!localStorage.getItem("Authorization"),
      isScrolled: false,
    };
  },
  computed: {
    isMainPage() {
      return this.$route.path === "/";
    },

    isTravel() {
      return this.$route.path === "/travel";
    },

    userName() {
      return this.$store.state.auth.userName; // Vuex 스토어에서 사용자 이름 가져오기
    },
    userImage() {
      return this.$store.state.auth.images;
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.fetchUserName(); // 로그인 되어 있을 때만 사용자 정보를 가져옵니다.
    }
  },
  watch: {
    "$store.state.auth.isAuthenticated"(newValue) {
      if (newValue === true) {
        this.handleLoginSuccess();
      }
    },
  },
  methods: {
    async fetchUserName() {
      try {
        const response = await this.$axios.get("/api/v1/user/info/detail");
        this.$store.commit("auth/SET_USER_NAME", response.data.userName);
        this.$store.commit("auth/SET_USER_IMAGE", response.data.images);
        this.$store.commit("auth/SET_AUTHENTICATED", true);

        // 설문조사 필요 여부 확인 후 조치
        if (response.data.needSurvey) {
          this.promptSurvey();
        }

        console.log("API response:", response.data); // API 응답 로깅
      } catch (error) {
        console.error("로그인해주세요 : ", error);
        this.$store.commit("auth/SET_AUTHENTICATED", false);
        this.isAuthenticated = false; // 에러 발생 시 인증 상태 업데이트
      }
    },
    promptSurvey() {
      // 간단한 confirm 창을 사용하여 설문 조사 유도
      if (
        confirm(
          "나만의 여행스타일을 알아보세요! 검사 페이지로 이동하시겠습니까?"
        )
      ) {
        this.$router.push("/travel"); // 설문 조사 페이지로 리디렉션
      }
    },
    showLoginModal() {
      this.showModal = true;
    },
    logout() {
      // Vuex 상태 초기화
      this.$store.commit("auth/SET_TOKEN", null);
      this.$store.commit("auth/SET_USER_EMAIL", null);
      this.$store.commit("auth/SET_USER_NAME", null);
      this.$store.commit("auth/SET_USER_IMAGE", null);
      this.$store.commit("auth/SET_AUTHENTICATED", null);
      this.$store.commit("auth/CLEAR_AUTH_DATA", null);

      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem("Authorization");
      localStorage.removeItem("email");
      localStorage.removeItem("userName");
      localStorage.removeItem("images");
      localStorage.removeItem("memberEmail");
      localStorage.removeItem("token");
      localStorage.removeItem("kakaoAccessToken");

      this.isAuthenticated = false;
      // 로그아웃 성공 메시지 표시 후 페이지 새로 고침
      alert("로그아웃 되었습니다.");
      this.$router.push("/");
    },

    handleLoginSuccess() {
      //상태를 업데이트 하거나 필요한 ui 변경을 수행합니다.
      this.isAuthenticated = true;
      this.showModal = false;
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.isScrolled = window.scrollY > window.innerHeight;
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.main-page #app {
  background-image: url("./assets/images/navbar-img.png"); /* 전체 페이지 배경 이미지 설정 */
  background-size: cover; /* 배경 이미지 꽉 차게 */
  background-position: center center; /* 배경 이미지 중앙 정렬 */
}
.app:not(.main-page) {
  background: none;
}

nav {
  display: flex;
  justify-content: center;
  padding: 25px;
  background-color: transparent; /* 기본 배경색 */
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  transition: background-color 0.3s; /* 부드러운 전환 효과 */
  background-size: cover;
  z-index: 1000;
}

.nav-links {
  display: flex;
  gap: 70px;
}

.main-logo {
  font-size: 25px;
  color: #000000;
  position: absolute;
  left: 50px;
}
nav.scrolled,
nav:not(.main-page) {
  background-color: white;
}
.nav-links,
.main-logo,
.login {
  transition: color 0.3s;
}
nav.scrolled {
  background-color: white; /* 스크롤 시 배경색 변경 */
  color: black; /* 스크롤 시 텍스트 색상 변경 */
}

nav.main-page .nav-links a,
nav.main-page .main-logo,
nav.main-page .login {
  color: white;
}

nav.scrolled .nav-links a,
nav.scrolled .main-logo,
nav.scrolled .login,
nav:not(.main-page) .nav-links a,
nav:not(.main-page) .main-logo,
nav:not(.main-page) .login,
.dark-text .nav-links a,
.dark-text .main-logo,
.dark-text .login {
  color: black;
}

nav a {
  font-size: 23px;
  font-weight: bold;
  text-decoration: none;
  color: #000000;
}

nav a.router-link-exact-active {
  font-size: 25px;
  color: #ffc83b;
}

.login {
  text-align: right;
  position: absolute;
  right: 30px;
  font-size: 18px;
  cursor: pointer;
}
.user-info {
  display: flex;
  align-items: center;
}

.user-image {
  width: 40px; /* 이미지 크기 설정 */
  height: 40px; /* 이미지 크기 설정 */
  border-radius: 50%; /* 원형 이미지 */
  object-fit: cover; /* 이미지 비율 유지 */
  margin-right: 10px; /* 텍스트와의 간격 */
}
.login button {
  margin-left: 10px;
  padding: 10px 20px; /* 좌우 패딩을 늘려서 버튼이 더 넓게 보이게 합니다 */
  border-radius: 5px; /* 모서리 둥글기를 적당히 조절합니다 */
  border: 1px solid #ffc83b; /* 테두리 색상을 조절합니다 */
  background-color: #ffc83b; /* 버튼 배경색을 노란색으로 설정합니다 */
  color: white; /* 버튼 내 텍스트 색상을 흰색으로 설정합니다 */
  font-weight: bold; /* 텍스트를 굵게 합니다 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
}
</style>
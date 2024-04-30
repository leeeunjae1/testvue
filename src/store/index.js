import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

/*
const socket = {
  namespaced: true,
  state: () => ({
    connection: null, // WebSocket connection
    isConnected: false,
    messages: [],
  }),
  mutations: {
    SOCKET_CONNECT(state) {
      state.isConnected = true;
    },
    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },

    SOCKET_MESSAGE(state, message) {
      state.messages.push(message);

    mutations: {
        savePlanInfo(state, payload) {
            state.planInfo = payload;
        }

    },
  },
  actions: {
 connect({ commit, state }) {
    // 이미 연결된 WebSocket이 있는지 확인하고, 연결이 열려 있으면 재연결을 시도하지 않습니다.
    if (state.isConnected) {
      console.log("WebSocket is already open using existing connection.");
      return;
    }
    const ws = new WebSocket('wss://example.com/socket');
    ws.onopen = () => {
      commit('SOCKET_CONNECT');
    };
    ws.onmessage = (event) => {
      commit('SOCKET_MESSAGE', event.data);
    };
    ws.onclose = () => {
      commit('SOCKET_DISCONNECT');
    };
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      commit('SOCKET_DISCONNECT');
    };
    state.connection = ws;  // WebSocket 연결 객체를 Vuex 상태에 저장합니다.
  },
    disconnect({ commit, state }) {
      if (state.connection) {
        state.connection.close();
        console.log("WebSocket connection is being closed.");
        commit('SOCKET_DISCONNECT');
      }
    },
    sendMessage({ state }, message) {
      if (state.connection && state.connection.readyState === WebSocket.OPEN) {
        state.connection.send(message);
      }
    }
  }
}
*/
const authModule = {
  namespaced: true,
  state: {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    user : null,
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('userName') || null,
    images: localStorage.getItem('images') || null,
    email: localStorage.getItem('email') || null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    kakaoAccessToken: localStorage.getItem('kakaoAccessToken') || null,  // 카카오 액세스 토큰 상태 추가
  },
  getters: {
    isAuthenticated: state => !!state.token,
    token: state => state.token,
    userName: state => state.userName,
    email: state => state.email,
    user: state => state.user,
    kakaoAccessToken: state => state.kakaoAccessToken,  // 카카오 로그인 상태 확인
  },
  mutations: {
    
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
      if (!isAuthenticated) {
        localStorage.removeItem('accessToken');
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    SET_USER_EMAIL(state, email){
      state.email = email;
      console.log('로그인 사용자 : ',state.email)
      localStorage.setItem('memberEmail', email);
    },
    SET_USER_NAME(state, userName){
      state.userName = userName;
      console.log('로그인 사용자 이름 : ',state.userName)
      localStorage.setItem('userName', userName); // 로컬 스토리지에 사용자 이름 저장
    },
    SET_USER_IMAGE(state, images){
      state.images = images;
      console.log('로그인 사용자 이미지 : ',state.images)
      localStorage.setItem('images', images); // 로컬 스토리지에 사용자 이름 저장
    },
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      state.isAuthenticated = !!accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    },
    
    SET_REFRESH_TOKEN(state, refreshToken) {
      state.refreshToken = refreshToken;
      localStorage.setItem('refreshToken', refreshToken);
    },
    CLEAR_AUTH_DATA(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // 추가로, 사용자 정보도 초기화할 수 있습니다.
    },
    SET_KAKAO_ACCESS_TOKEN(state, kakaoAccessToken) {
      state.kakaoAccessToken = kakaoAccessToken;
      localStorage.setItem('kakaoAccessToken', kakaoAccessToken);
      
    },
  },
  actions: {
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    setUserName({commit}, userName){
      commit('SET_USER_NAME', userName);
    },
    logout({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_AUTHENTICATED', false);
      commit('CLEAR_AUTH_DATA');
      
    },
    login({ commit }, user) {
      commit('SET_USER', user);
      commit('SET_AUTHENTICATED', true);
    },
    setAuthenticated({ commit }, value) {
      commit('SET_AUTHENTICATED', value);
    },
    kakaoAccessToken({ commit }, { kakaoAccessToken, userName, email }) {
      commit('SET_KAKAO_ACCESS_TOKEN', kakaoAccessToken);
      commit('SET_USER_NAME', userName);
      commit('SET_USER_EMAIL', email);
      commit('SET_AUTHENTICATED', true);
    },
  },
  };

const mapModule = {
  namespaced: true,
  state: {
    curLonCopy: undefined,
    curLatCopy: undefined,
    curMapId: undefined,
    curTitle: undefined,
    curAddress: undefined,
    curGrade: undefined,
    curReview: undefined,
    review: null,
    inputState: false,
  },
  mutations: {
    SET_REVIEW(state, review) {
      state.review = review;
    },
    SET_INPUT_STATE(state, status) {
      state.inputState = status;
    },
    SET_MAPS(state, maps) {
      state.maps = maps;
    },
    SET_LON_LAT(state, { lonCopy, latCopy }) {
      state.curLonCopy = lonCopy;
      state.curLatCopy = latCopy;
    },
    SET_CUR_MAP_ID(state, id) {
      state.curMapId = id;
    },
    SET_CUR_TITLE(state, title) {
      state.curTitle = title;
    },
    SET_CUR_ADDRESS(state, address) {
      state.curAddress = address;
    },
    SET_CUR_GRADE(state, grade) {
      state.curGrade = grade;
    },
    SET_CUR_REVIEW(state, review) {
      state.curReview = review;
    },
    SET_MAP(state, map) {
      state.curMapId = map ? map.id : undefined;
      state.curLatCopy = map ? map.latCopy : undefined;
      state.curLonCopy = map ? map.lonCopy : undefined;
      state.curTitle = map ? map.title : undefined;
      state.curGrade = map ? map.grade : undefined;
      state.curAddress = map ? map.address : undefined;
      state.curReview = map ? map.review : undefined;
    },
  },
  actions: {
    setReview({ commit }, review) {
      commit('SET_REVIEW', review);
    },
    setInputState({ commit }, status) {
      commit('SET_INPUT_STATE', status);
    },
    setMaps({ commit }, maps) {
      commit('SET_MAPS', maps);
    },
    setLonLat({ commit }, { lonCopy, latCopy }) {
      commit('SET_LON_LAT', { lonCopy, latCopy });
    },
    setCurMapId({ commit }, id) {
      commit('SET_CUR_MAP_ID', id);
    },
    setCurTitle({ commit }, title) {
      commit('SET_CUR_TITLE', title);
    },
    setCurAddress({ commit }, address) {
      commit('SET_CUR_ADDRESS', address);
    },
    setCurGrade({ commit }, grade) {
      commit('SET_CUR_GRADE', grade);
    },
    setCurReview({ commit }, review) {
      commit('SET_CUR_REVIEW', review);
    },
    setMap({ commit }, map) {
      commit('SET_MAP', map);
    },
  },
};

// Vuex 스토어 인스턴스 생성
export default createStore({
  modules: {
    auth: authModule,
    map: mapModule,
  },
  // 만약 전역 상태가 필요하다면 여기에 추가합니다.
  plugins: [createPersistedState()],
});
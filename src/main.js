import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { EventBus } from '@/EventBus';
import '@/assets/css/font.css';
import VueAxios from 'vue-axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Axios 인스턴스 생성 및 설정
const axiosInstance = axios.create({
  baseURL: 'http://jejurang.site:8080'
});


axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('Authorization'); // 여기를 수정
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

store.dispatch('auth/refreshApp');

const app = createApp(App);
library.add(fas, far)

app.config.globalProperties.$axios = axiosInstance; // 이 부분은 이미 설정되었으므로, 이 줄만 필요
app.use(store).component('font-awesome-icon', FontAwesomeIcon).use(router).use(VueAxios, axios).mount('#app');



app.config.globalProperties.productionTip = false
app.config.globalProperties.$EventBus = EventBus;
app.config.globalProperties.$http = axios;




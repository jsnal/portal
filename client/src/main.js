import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiService from './common/api';

import 'github-markdown-css/github-markdown.css';
import 'boxicons/css/boxicons.min.css';
import '@/assets/main.css';
import '@/assets/markdown.css';

Vue.config.productionTip = false;
ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

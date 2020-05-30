import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import 'github-markdown-css/github-markdown.css';
import 'boxicons/css/boxicons.min.css';
import 'flexboxgrid/css/flexboxgrid.min.css';
import '@/assets/main.css';
import '@/assets/markdown.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

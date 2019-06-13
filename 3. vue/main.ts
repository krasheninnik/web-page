import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { University, IPerson } from './university';
Vue.config.productionTip = false;

new Vue({
  // data: {
  //   u: University,
  // },
  router,
  render: (h) => h(App),
}).$mount('#app');

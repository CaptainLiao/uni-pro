// 重置storage
import './libs/init/version'

import Vue from 'vue'
import App from './App.vue'


import './router'

Vue.config.productionTip = false

const app = new Vue({
  ...App
});

app.$mount();

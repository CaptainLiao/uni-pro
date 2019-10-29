// 重置storage,必须在其他所有操作之前引入
import './libs/version';

import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

new App().$mount()

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router'
import iView from 'iview'
import VueI18n from 'vue-i18n';
import axios from 'axios'
import store from './store/index.js'
import './less/index.less'
import locale from 'iview/dist/locale/en-US'
import htmlToPdf from './utils/htmlToPdf'  


Vue.use( iView )
//Vue.use( iView, { locale } ) //开启英文模式
Vue.use( VueI18n );
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(htmlToPdf) 
// axios公共配置
//陈 53
//梁 25
//服务器 48
axios.defaults.baseURL = 'http://10.71.202.130:8658/';
axios.defaults.headers.common[ 'Content-Type' ] = 'application/json;charset=UTF-8';
axios.defaults.headers.common[ 'Accept' ] = 'application/json';
/* eslint-disable no-new */
new Vue( {
    el: '#app',
    store,
    router,
    iView,
    template: '<App/>',
    components: { App }
} )
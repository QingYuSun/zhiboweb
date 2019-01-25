import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

 System.import('vue-resource').then(function(resource) {
    Vue.use(resource)
    Vue.http.options.emulateJSON = true;
    //session 失效跳转
    // Vue.http.interceptors.push((request, next) => {
    //     next((response) => {
    //         if(response.status == 200 && response.body.status == 'UNLOGIN'){
    //             window.location.hash = "#/login"
    //         }
    //     });
    // });

    /*Vue.http.interceptors.push((request, next) => {
       console.log("http.interceptors:  " + request.url);
       request.url = 'babyAdminServer/' + request.url
       console.log("after http.interceptors:  " + request.url);
    next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        console.log('全局 返回')
         if(response.body.code == '401'){
                window.location.hash = "#/logout"
        }
        return response
    })
})*/

});

import App from './App'
import Main from './components/Main'
import Allcourse from './components/Allcourse'
import User from './components/user/User'
import vshow from './components/vshow'
import Concern from './components/Concern'
 const routes = [
  { path: '', component: Main },
  { path: '/Main', component: Main },
  { path: '/Allcourse', component: Allcourse },
  { path: '/User', component: User },
  { path: '/Vshow', component: vshow },
  { path: '/Concern', component: Concern }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
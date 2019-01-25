<template>
  <div class="live-header">
    <div class="li-all-width live-headlist">
      <div class="live-logo">
          <img src="../assets/logo.png">
      </div>
      <div class="live-list">
        <nav>
          <ul>
            <router-link to="/Main">首页</router-link>
            <router-link to="/Allcourse">全部课程</router-link>
            <router-link v-if="loginidtype != 0" to="/Concern">我的收藏</router-link>
            <router-link v-if="loginidtype != 0" to="/User">个人中心</router-link>
            <!-- <router-link to="/Concern">我的收藏</router-link>
            <router-link to="/User">个人中心</router-link> -->
          </ul>
        </nav>
      </div>
      <div class="live-login">
        <div v-if="loginsuccess == 0" class="login-on">
          <a :href="urlherf">登录</a>
          <!-- <a @click="login">登录</a> -->
          <!-- <a href="">注册</a> -->
        </div>
        <div v-if="loginsuccess == 1" class="login-on loginto">
          <img v-if="toxiang == 0" src="../assets/head.png">
          <img v-if="toxiang == 1" :src="headimage">
          <!-- <a href="">注册</a> -->
          <a class="logout" href="javascript:;" @click="logout">退出</a>
        </div>
        <!-- <div class="E-mail">
          <i class="el-icon-picture"></i>
        </div>
 -->        <!-- <div class="search">
          <input placeholder="推荐搜索" type="text" name="sosuo">
          <i class="el-icon-search"></i>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
  .live-header{
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
  }
  .live-headlist{
    height: 100%;
  }
  .live-logo{
    float: left;
    width: 180px;
    height: 100%;
  }
  .live-logo img{
    width: 100%;
    height: 100%;
  }
  .live-list nav ul a{
    line-height: 60px;
    height: 60px;
    padding: 0 20px;
    display: inline-block;
    font-size: 14px;
  }
  .live-list nav ul a:hover{
    color: #8fe687;
  }
  .live-list{
    float: left;
    margin-left: 50px;
  }
  .live-login{
    float: right;
    height: 36px;
    padding:12px 0;
  }
  .search{
    float: right;
    height: 31px;
    line-height: 36px;
    position: relative;
  }
  .search input{
    height: 20px;
    padding: 5px; 
    outline:none;
  }
  .search i{
    position: absolute;
    top: 10px;
    right: 8px;
  }
  .login-on{
    float: right;
    line-height: 36px;
    margin-right: 10px;
    position: relative;
  }
  .login-on:hover .logout{
    display: block;
  }
  .logout{
    position: absolute;
    top: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
    width: 100%;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    display: none;
  }
  .loginto{
    width: 38px;
    height: 38px;
  }
  .loginto img{
    width: 100%;
    height: 100%;
  }
  .E-mail{
    float: right;
    line-height: 36px;
    margin-left: 10px;
  }
</style>
<script>
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
  import md5 from 'js-md5';
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        param:'',
        packagekey:'cbf347521dd7d642dcb10d0520ab6c7a',
        objType:'2',
        objectid:'EzQ319HuHN8done',
        openAppID:'944283151634',
        loginsuccess:0,
        urlherf:'',
        code:'',
        item:[],
        toxiang:0,
        headimage:'',
        loginidtype:0,
        newobjType:'',
        newuserid:'',
        newobjectid:'',
        Unicode:'',
        loginif:0
      };
    },
    created:function(){
      let _this    = this
      //微信登录链接
      var uri = encodeURIComponent("http://www.ztengit.com:8089");
      var url = `https://open.weixin.qq.com/connect/qrconnect?appid=wx7c60116bca56735f&redirect_uri=${uri}&response_type=code&scope=snsapi_login`
      _this.urlherf = url;

      //判断是否登录过
      _this.loginif = sessionStorage.getItem("loginif") === null || sessionStorage.getItem("loginif") === undefined ? 0 : sessionStorage.getItem("loginif");
      

      if (_this.loginif == 1 || _this.loginif == 2) {
        _this.loginsuccess = 1;
        //判断是否是智腾用户
        _this.loginidtype = sessionStorage.getItem("loginid") === null || sessionStorage.getItem("loginid") === undefined ? 0 : sessionStorage.getItem("loginid");
        if (_this.loginidtype == 0) {
          _this.toxiang = 0;
        }else{
          _this.toxiang = 1;
          _this.headimage = sessionStorage.getItem("headImg");
        }
      }else{
        var skipurl = location.search;  //获取url中"?"符后的字串
        var theRequest = new Object();
        if (skipurl.indexOf("?") != -1) {
            var str = skipurl.substr(1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
              theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }

        console.log(theRequest.code);

        if (theRequest.code != null) {
          _this.code = theRequest.code;
          _this.texturl();
        }
      }

      /*this.loginidtype = localStorage.getItem('loginid');*/
    },
    methods: {
      logout(){
        window.location.href="http://www.ztengit.com";
        sessionStorage.clear();
      },
      package(){
        let stringA=this.Unicode.join("&");
        console.log(stringA);
        let stringSignTemp=`${ stringA }&key=377729078cacd0711f00d4df8df260a3`;
        let sign = md5(stringSignTemp).toUpperCase();
        let stringB = encodeURI(stringA);
        this.param = `${ stringB }&sign=${ sign }`;
        this.eventtime();
      },
      eventtime:function(){
          let that    = this
          /*let url     = `https://m.campus.qq.com/api/open/getUserInfo?${ that.param }`;*/ //个人数据
          let url     = `api/open/getAdminInfo?${ that.param }`; //查看是否是管理员
          var reqData     = {}
          that.$http.get(API_PROXY + url,reqData,{"emulateJSON":true}).then(function (res) {
            if(res.body.code == 0) {
              let data = res.body.data;
              sessionStorage.setItem("role", data.role);
              console.log(data.role);
            }
          },function(res){
            // 响应错误回调
          });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      texturl:function(){
          var that = this
          var url =`api/commonLogin/getUser?code=${that.code}&appid=wx7c60116bca56735f`;
          var reqData = {};
              /*this.userid*/ //需要的参数id
              /*reqData.code = 'aaaaa'*/
          that.$http.jsonp(url,reqData,{"emulateJSON":true}).then(function (res){

            if(res.body.code == 0){
              that.loginsuccess = 1;
            }
            if(res.body.data == undefined){
              alert('您还不是智腾用户')
              that.toxiang = 0;
              this.loginidtype = 0;
              localStorage.setItem('loginid',0);
            }else{
              let data    = res.body.data;
              that.item = data;
              that.login();

              this.newuserid = that.item[0].userid;
              this.newobjectid = that.item[0].schoolid;
              this.newobjType = 2;
              /*this.newuserid = 'D5chxF7lVD4done';
              this.newobjectid = 'vBO1Jm6Nbd4done';
              this.newobjType = 2;*/

              let timestamp = Date.parse(new Date());
              this.Unicode=[`timestamp=${ timestamp }`,'devCode=3tYjQGzKXNXeNujF','devType=1',`objType=${ this.newobjType }`,`objectid=${ this.newobjectid }`,`userid=${ this.newuserid }`];
              this.Unicode.sort();
              this.package();
            }
          })
      },
      login(){
        var url ='zteng-web/index/login'
        var that = this
        var reqData = {};
            /*this.userid*/ //需要的参数id
            /*reqData.code = 'aaaaa'*/
            reqData.code = that.item[0].userid,
            reqData.userName = that.item[0].name,
            reqData.headImg = that.item[0].head

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
              this.loginidtype = that.item[0].type;
              /*localStorage.setItem('loginid',this.loginidtype);*/
              sessionStorage.setItem("loginid", this.loginidtype);
              sessionStorage.setItem("loginif", 1);
              sessionStorage.setItem("code", that.item[0].userid);
              sessionStorage.setItem("userName", that.item[0].name);
              sessionStorage.setItem("headImg", that.item[0].head);

              that.headimage = that.item[0].head;
              if (!that.headimage) {
                that.toxiang = 0
              }else{
                that.toxiang = 1
              }
              console.log(that.headimage);
            }else{
                
            }
        })
      }
    }
  }
</script>
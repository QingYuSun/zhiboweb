<template>
  <div class="li-all-width tags-classify">
        <div class="curriculum-warp">
            <div class="tags-home-title">
                <i class="li-hot"></i>
                <span>热门推荐</span>
            </div>
            <div class="curriculum">
                <ul>
                    <!-- <li>
                        <img class="ckg">
                        <div class="ckg-title">
                            <div class="li-ckg-time">
                                <span>视频标题</span>
                                <div class="li-new-right">
                                    <i class="el-icon-time"></i>
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div>
                                <div class="li-new-left">
                                    <i class="el-icon-star-off"></i>
                                    <span>点击收藏</span>
                                </div>
                                <span class="li-new-right">100播放</span>
                            </div>
                        </div>
                    </li> -->
                    <li v-for="(item,index) in hotline" @click="videolistclick(item)">
                        <img class="ckg" :src="item.firstFrame">
                        <div class="ckg-title">
                            <div class="li-ckg-time">
                                <span class="li-word-css">{{item.title}}</span>
                                <div class="li-new-right">
                                    <i class="el-icon-time"></i>
                                    <span>{{item.longtime}}</span>
                                </div>
                            </div>
                            <div>
                                <div class="li-new-left li-name-head">
                                    <img :src="item.headImg">
                                    <span>{{item.userName}}</span>
                                </div>
                                <span class="li-new-right">{{item.count}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loading-add loading-add-add">
                <a v-if="hosthide" @click="addvideolist">查看更多</a>
            </div>
        </div>
        <div class="curriculum-warp">
            <div class="tags-home-title">
                <i class="li-new"></i>
                <span>最新上传</span>
            </div>
            <div class="curriculum">
                <ul>
                    <li v-for="(curitem,index) in items" @click="videolistclick(curitem)">
                        <img class="ckg" :src="curitem.firstFrame">
                        <div class="ckg-title">
                            <div class="li-ckg-time">
                                <span class="li-word-css">{{curitem.title}}</span>
                                <div class="li-new-right">
                                    <i class="el-icon-time"></i>
                                    <span>{{curitem.longtime}}</span>
                                </div>
                            </div>
                            <div>
                                <!-- <div class="li-new-left">
                                    <i class="el-icon-star-off"></i>
                                    <span>点击收藏</span>
                                </div> -->
                                <div class="li-new-left li-name-head">
                                    <img :src="curitem.headImg">
                                    <span>{{curitem.userName}}</span>
                                </div>
                                <span class="li-new-right">{{curitem.count}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loading-add">
                <a v-if="newhide" @click="addvideolisttime">查看更多</a>
            </div>
        </div>
  </div>
</template>

<style>
    .curriculum-warp{
        margin-bottom: 50px;
    }
    .tags-classify{
        margin-top: 50px;
    }
    .tags-home-title{
        width: 100%;
        height: 70px;
        overflow: hidden;
    }
    .tags-home-title span{
        float: left;
        line-height: 65px;
        font-size: 28px;
        color: #8fe687;
    }
    .tags-home-title i{
        display: inline-block;
        width: 45px;
        height: 55px;
        background-image: url(../assets/icon.png);
        background-repeat: no-repeat;
        float: left;
    }
    .tags-home-title a{
        float: right;
        line-height: 50px;
        font-size: 12px;
    }
    .li-hot{
        background-position: -255px -45px;
    }
    .li-new{
        background-position: -300px -45px;
    }
    .float-right{
        float: right;
    }
    .loading-add{
        text-align: center;
        padding-bottom: 50px; 
    }
    .loading-add-add{
        border-bottom: 1px solid #8fe687;
    }
    .loading-add a{
        display: block;
        width: 120px;
        line-height: 40px;
        border: 2px solid #8fe687;
        margin: 0 auto;
        color: #8fe687;
        font-size: 15px;
        box-shadow: 0 5px 15px #ccc;
        border-radius: 20px;
        cursor: default;
    }
    
</style>

<script>
export default {
  name: 'hello',
  data () {
    return {
        msg: 'Welcome to222 Your Vue.js App',
        hotline:[],
        items:[],
        limitge:8,
        pageye:1,
        totalCount:0,
        limitgetime:8,
        pageyetime:1,
        totalCounttime:0,
        hosthide:true,
        newhide:true,
    }
  },
  created(){
    this.newlimit();
    this.ListByTime();
  },
  methods:{
    videolistclick(item){
        localStorage.setItem('vid',item.videoId);
        localStorage.setItem('title',item.title);
        localStorage.setItem('vidurl',item.url);
        localStorage.setItem('vidfirstFrame',item.firstFrame);
        localStorage.setItem('userId',item.userId);
        localStorage.setItem('videouserhead',item.headImg);
        localStorage.setItem('uservidername',item.userName);

        this.$router.push('/Vshow');
    },
    newlimit(){
        //加载更热
        var url ='zteng-web/tVideo/open/selectVideoList'
        var that = this
        var reqData = {};
            reqData.limit = that.limitge,
            reqData.page = that.pageye

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var date = res.body.data;
                that.hotline = date;
                that.totalCount = res.body.totalCount;
                console.log(res.body.totalCount);
                console.log(JSON.stringify(that.hotline));
            }
        })
    },
    addvideolist(){
        var that = this
        //加载更多更热
        var allpage = Math.ceil(that.totalCount/that.limitge);
        console.log(that.totalCount);
        console.log(that.limitge);

        console.log(allpage);
        console.log(that.pageye);
        that.pageye++;
        if (that.pageye <= allpage) {
            
            var url ='zteng-web/tVideo/open/selectVideoList'
            
            var reqData = {};
                reqData.limit = that.limitge,
                reqData.page = that.pageye

            that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                console.log(res.body);
                if(res.body.status == 'SUCCEED'){
                    var date = res.body.data;
                    that.hotline = that.hotline.concat(date);
                }
            })
        }else{
            that.hosthide = false;
        }
    },
    ListByTime(){
        //加载最新
        var url ='zteng-web/tVideo/open/selectVideoListByTime'
        var that = this
        var reqData = {};
            reqData.limit = that.limitgetime,
            reqData.page = that.pageyetime,
            /*reqData.classify = 
            reqData.topic = */

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var date = res.body.data;
                that.items = date;
                that.totalCounttime = res.body.totalCount;
            }
        })
    },
    addvideolisttime(){
        var that = this
        //加载更多更热
        var allpagetime = Math.ceil(that.totalCounttime/that.limitgetime);
        console.log(that.totalCounttime);
        console.log(that.limitgetime);
        that.pageyetime++;
        if (that.pageyetime <= allpagetime) {
            
            var url ='zteng-web/tVideo/open/selectVideoListByTime'
            
            var reqData = {};
                reqData.limit = that.limitgetime,
                reqData.page = that.pageyetime

            that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                console.log(res.body);
                if(res.body.status == 'SUCCEED'){
                    var date = res.body.data;
                    that.items = that.items.concat(date);
                }else{
                    
                }
            })
        }else{
            that.newhide = false;
        }
    }
  }
}
</script>
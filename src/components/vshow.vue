<template>
            <div class="show-main li-all-width">
                <div class="section">
                    <div class="show-video">
                        <div class="video-left li-new-left">
                            <video v-if="loginho == 0" autoplay="autoplay" id="myvideo" :src="vidurlk" :poster="vidfirstFramek" height="100%" width="100%" controls controlslist="nodownload">
                            </video>
                            <video v-if="loginho == 1" autoplay="autoplay" id="myvideo" :src="videoinfor.url" :poster="videoinfor.firstFrame" height="100%" width="100%" controls controlslist="nodownload">
                            </video>
                            
                        </div>
                        <div class="video-right li-new-right">
                            <!-- <div class="selected">
                                <span>选集</span>
                            </div> -->
                            <div class="mbsf section">
                                <i></i>
                                <span>相关推荐</span>
                            </div>
                            <div class="scroller-area" v-for="(item,index) in items">
                                <div class="scroller" @click="cutvideid(item)">
                                    <!-- <div class="scrollerlist">
                                        <i>{{index}}</i>
                                    </div> -->
                                    <div class="scroller-img">
                                        <img :src="item.firstFrame">
                                    </div>
                                    <div class="scroller-word">
                                        <span>{{item.title}}</span>
                                        <p>{{item.count}}次播放</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="show-title li-new-left">
                            <div class="li-video-title">
                                <span class="title-video" v-if="loginho == 0">{{titlesk}}</span>
                                <span class="title-video" v-if="loginho == 1" v-else>{{videoinfor.title}}</span>
                                <div v-if="redheart == 0" class="li-collect-ture" @click="collectclick">
                                    <i class="el-icon-star-off"></i>
                                    <span>收藏</span>
                                </div>
                                <div v-if="redheart == 1" class="li-collect-ture" @click="collectdeletelclick">
                                    <span>已收藏</span>
                                </div>
                            </div>
                            <div class="li-new-right li-video-author">
                                <img v-if="loginho == 0" :src="vidhead">
                                <img v-if="loginho == 1" :src="videoinfor.headImg">
                                <span v-if="loginho == 0">{{vidusername}}</span>
                                <span v-if="loginho == 1">{{videoinfor.userName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="show-down">
                    <div class="comment-on">
                        <!-- <div class="advertisement">
                            <img src="../assets/carousel1.png">
                        </div> -->
                        <div class="all-comments2">
                            <div class="wechat">
                                <div class="wechat">
                                    <div class="li-new-left li-comment-district">
                                        <i></i>
                                        <span>评论区</span>
                                    </div>
                                    <p>{{contentcont}}/300</p>
                                </div>
                                <div class="comments-frame">
                                    <textarea data-maxlength="300" name="content" placeholder="看点槽点，不吐不快！别憋着，马上大声说出来吧！" v-model="content"></textarea>
                                </div>
                                <div class="publish-loading">
                                    <a @click="VideoinsertComm">发表评论</a>
                                </div>
                            </div>
                            <div class="who-all">
                                <div class="my-all">
                                    <ul>
                                        <li>
                                            全部评论
                                            <!-- <em>(124)</em> -->
                                        </li>
                                        <!-- <li class="fright">
                                            我的评论消息
                                        </li> -->
                                    </ul>
                                </div>
                                    <div class="comment-list-main comment-list-box">
                                        <div class="comment-list-body">
                                            <div class="comment-item" data-id="4709522908" v-for="(comitem,index) in Commentiddata">
                                                <div class="comment-content">
                                                    <div class="comment-user-avatar">
                                                        <a ><img _hz="" :src="comitem.commentImg"></a>
                                                    </div>
                                                    <div class="comment-section">
                                                        <div class="comment-user-info">
                                                            <a class="redname" target="_blank" @click="transmitname(comitem.commentName,comitem.commentUid,comitem.tVideoCommId)">
                                                                {{comitem.commentName}}
                                                            </a>
                                                            <span class="comment-timestamp">{{newtime(comitem.createTime)}}</span>
                                                        </div>
                                                        <div class="comment-text">
                                                            <!-- <p>{{comitem.commentContent}}</p> -->
                                                            <p v-if="comitem.toReplyCommId == null">{{comitem.commentContent}}</p>
                                                            <p v-else>回复：<i @click="transmitname(comitem.toReplyCommName,comitem.toReplyUid,comitem.toReplyCommId)">{{comitem.toReplyCommName}}</i>  {{comitem.commentContent}}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>
<style>
    .show-main{
        min-height: 300px;
        margin-top: 30px;
    }
    .show-title{
        float: left;
        background-color: #363535;
        width: 804px;
        height: 100px;
        box-shadow: 0px 5px 20px #000;
    }
    .video-left{
        width: 804px;
        height: 500px;
        background-color: #000;
    }
    .video-right{
        width: 220px;
        height: 600px;
        background-color: #393939;
    }
    .video-right2{
        width: 280px;
        float: left;
        background-color: #fff;
    }
    .mbsf span{
        display: inline-block;
        line-height: 30px;
        float: left;
        font-size: 15px;
        color: #fff;
        margin-left: 8px;
    }
    .mbsf i{
        width: 5px;
        height: 30px;
        background-color: #8fe687;
        display: inline-block;
        float: left;
    }
    .li-video-title{
        float: left;
        margin: 10px;
    }
    .title-video{
        color: #fff;
        font-size: 21px;
    }
    .li-collect-ture{
        margin-top: 25px;
        cursor: default;
    }
    .li-collect-ture i{
        color: #fff;
    }
    .li-collect-ture span{
        color: #fff;
        font-size: 13px;
    }
    .li-video-author{
        margin: 10px;
        text-align: center;
    }
    .li-video-author img{
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    .li-video-author span{
        display: block;
        color: #fff;
        line-height: 20px;
        font-size: 13px;
        margin-top: 10px;
    }

    #myvideo{
        display: block;
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .selected{
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        padding-top: 10px;
        padding-left: 10px;
    }
    .selected2{
        color: #000;
        font-size: 12px;
        line-height: 20px;
        padding-top: 10px;
        padding-left: 10px;
    }
    .mbsf{
        margin-top: 30px;
        padding-left: 10px;
    }
    
    /*.scroller-area{
        height: 420px;
        overflow-y:scroll;
    }*/
    ::-webkit-scrollbar {display:none}
    .scroller-img{
        position: absolute;
        top: 18px;
        left: 25px;
        width: 90px;
        height: 50px;
    }
    .scroller-img2{
        position: absolute;
        top: 18px;
        left: 10px;
        width: 120px;
        height: 60px;
    }
    .scroller2{
        position: relative;
        zoom: 1;
        position: relative;
        padding: 15px 10px 15px 136px;
        height: 64px;
    }
    .scroller-img2 img{
        width: 100%;
        height: 100%;
    }
    .scroller{
        position: relative;
        zoom: 1;
        position: relative;
        padding: 15px 10px 15px 130px;
        height: 54px;
    }
    .scroller-word2 span{
        font-size: 13px;
        line-height: 19px;
        color:#000;
    }
    .scroller-word2 p{
        font-size: 12px;
        color: #999;
    }
    .scroller-img img{
        width: 100%;
        height: 100%;
    }
    .scrollerlist{
        position: absolute;
        left: 10px;
        top: 25px;
    }
    .scroller-word{
        color: #fff;
    }
    .scroller-word span{
        font-size: 13px;
        line-height: 19px;
        display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    }
    .scroller-word p{
        font-size: 12px;
        color: #999;
    }
    .show-down{
        margin-top: 30px;
        overflow: hidden;
    }
    .comment-on{
        width: 804px;
        float: left;
        margin-bottom: 40px;
    }
    .advertisement{
        width: 100%;
        height: 90px;
    }
    .advertisement img{
        width: 100%;
        height: 100%;
    }
    .broadcast{
        float: right;
        width: 280px;
    }
    .all-comments2{
        margin-top: 20px;
        background-color: #fff;
        padding: 10px;
    }
    .wechat span{
        float: left;
    }
    .wechat p{
        float: right;
        font-family: Constantia,Georgia;
        font-size: 18px;
        font-weight: 400;
        color: #909090;
    }
    .wechat{
        overflow: hidden;
    }
    .comments-frame{
        margin: 5px 10px;
    }
    .comments-frame textarea{
        min-height: 81px;
        width: 100%;
        padding: 4px;
        box-sizing: border-box;
        line-height: 20px;
        font-size: 12px;
        border: 2px solid #d4d9dd;
        box-shadow: inset 0 3px 3px #ebebeb;
        outline: 0;
        resize: vertical;
        overflow: hidden;
    }
    .publish-loading a{
        text-align: center;
        float: right;
        min-width: 120px;
        height: 28px;
        line-height: 28px;
        margin-right: 20px;
        cursor: default;
        border-radius: 15px;
        background-color: #8fe687;
        color: #fff;
    }
    .publish-loading a:hover{
        background-color: #25a3f3;
    }
    .who-all{
        overflow: hidden;
        padding-top: 20px;
    }
    .my-all ul{
        overflow: hidden;
        border-bottom: 1px solid #ccc;
    }
    .my-all ul li{
        float: left;
        line-height: 30px;
        height: 30px;
        padding: 0 20px;
    }
    .my-all ul li.fright{
        float: right;
    }


    .comment-pager{
        margin: 10px 0;
        color: #6c6c6c;
        clear: both;
    }
    .comment-pager li{
        float: left;
        margin-right: 3px;
        line-height: 22px;
        font-size: 14px;
    }
    .comment-pager li a{
    color: #2fb3ff;
    outline: 0;
    text-decoration: none;
    }
    
    .comment-pager-state{
        float: left;
        font-size: 12px;
        color: #909090;
    }
    .comment-pager .comment-pager-turn a{
        padding: 0 5px;
    }
    .comment-pager .comment-pager-turn li{
        border: 1px solid #c6c6c6;
    }
    .comment-pager-turn{
        float: right;
    }
    .comment-pager-page{
        float: right;
    }
    .comment-pager .comment-pager-page a{
        padding: 1px 3px;
    }
    .comment-pager .comment-pager-page span{
        color: #fff;
        background: #c6c6c6;
        display: block;
        padding: 1px 3px;
    }



.comment-pager-header{
    overflow: hidden;
}
    .comment-list-box {
    margin: 10px 0;
}
.comment-list-box .comment-item {
    overflow: hidden;
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
}
.comment-area a {
    display: inline-block;
    color: #2fb3ff;
}
.comment-list-box .comment-user-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
.comment-list-box .comment-user-avatar {
    float: left;
    margin-right: 10px;
}
.comment-list-box .comment-section {
    overflow: hidden;
    zoom: 1;
}
.comment-list-box .comment-user-info {
    font-size: 14px;
    color: #bbb;
}
.comment-list-box .comment-text {
    padding-top: 5px;
    margin-bottom: 10px;
    font-size: 14px;
}
.comment-list-box .comment-user-info a, .comment-list-box .comment-user-info span {
    display: inline-block;
    margin-right: 2px;
    vertical-align: middle;
}
.comment-list-box .comment-user-info .comment-timestamp {
    margin-left: 16px;
}
.comment-list-box .comment-user-info a, .comment-list-box .comment-user-info span {
    display: inline-block;
    margin-right: 2px;
    vertical-align: middle;
}
.comment-list-box .comment-user-info a, .comment-list-box .comment-user-info span {
    display: inline-block;
    margin-right: 2px;
    vertical-align: middle;
}
.comment-list-box .comment-timestamp {
    font-size: 12px;
    color: #bbb;
}
.comment-list-box .comment-text p {
    font-size: 14px;
}
.li-comment-district span{
    font-size: 15px;
}
.li-comment-district i{
    width: 30px;
    height: 30px;
    display: inline-block;
    background-image: url(/static/img/icon.65554ca.png);
    float: left;
    background-position: -55px -60px;
    background-repeat: no-repeat;
}
</style>
<script>
export default {
  name: 'hello',
  data () {
    return {
        msg: 'Welcome to222 Your Vue.js App',
        videosID:0,
        videoinfor:{},
        items:[],
        Recommendlimit:4,
        Recommendpage:1,
        Commentiddata:[],//视频评论
        content:'',
        ReplyUiddata:'',
        ReplyCommIddata:'',
        contentcont:0,
        titlesk:'',
        vidurlk:'',
        vidfirstFramek:'',
        userId:'',
        loginid:0,
        loginho:0,
        username:"",
        vidusername:'',
        vidhead:'',
        redheart:0
    }
  },
  created(){
    this.loca();
    this.username = sessionStorage.getItem("userName") === null || sessionStorage.getItem("userName") === undefined ? "" : sessionStorage.getItem("userName");
  },
  watch:{
    content(){
       this.contentcont = this.content.length;
       if (this.contentcont > 300) {
        this.content = this.content.substr(0, 300);
       }
    }
  },
  methods:{
    loca(){
        var vid = localStorage.getItem('vid');
        var titles = localStorage.getItem('title');
        var vidurl = localStorage.getItem('vidurl');
        var vidfirstFrame = localStorage.getItem('vidfirstFrame');
        var userId = localStorage.getItem('userId');
        /*var loginid = localStorage.getItem('loginid');*/
        var loginid = sessionStorage.getItem("loginid");
        var videouserhead = localStorage.getItem('videouserhead');
        var uservidername = localStorage.getItem('uservidername');


        console.log(loginid);
        this.videosID = vid;
        this.titlesk = titles;
        this.vidurlk = vidurl;
        this.vidfirstFramek = vidfirstFrame;
        this.userId = userId;
        this.vidhead = videouserhead;
        this.vidusername = uservidername;

        if (loginid == null || loginid == 0) {
            console.log('loginid==0')
            this.loginho = 0;
            
        }else{
            console.log('loginid!=0')
            this.tVideoComm();
            this.videodata();
            this.loginho = 1;

        }
        this.videodatauserId();
    },
    newtime:function(el){
        return moment(el).format('YYYY-MM-DD')
    },
    cutvideid(item){

        localStorage.setItem('vid',item.videoId);
        localStorage.setItem('title',item.title);
        localStorage.setItem('vidurl',item.url);
        localStorage.setItem('vidfirstFrame',item.firstFrame);
        localStorage.setItem('userId',item.userId);

        /*let vid = localStorage.getItem('vid');
        this.videosID = vid;
        this.videodata();
        this.tVideoComm();*/
        this.loca();
    },
    transmitname(name,ReplyUid,ReplyCommId){
        this.content = `回复:${ name }`;
        this.ReplyUiddata = ReplyUid;
        this.ReplyCommIddata = ReplyCommId;
    },
    VideoinsertComm(){
        //评论
        var that = this
        if (that.loginho == 0) {
            alert("评论请智腾用户先登录");
            return;
        }
        var fdStart = this.content.indexOf("回复");

        var date = moment().format("YYYY-MM-DD");
        var url ='zteng-web/tVideoComm/insertComm'
        
        if (that.content == "") {
            alert("内容不能为空");
            return;
        }
        if(fdStart == 0){
              //表示strCode是以回复开头
              var reqData = {};
                  reqData.commentUid = that.videosID, //评论人id
                  reqData.commentContent = that.content,  //评论内容
                  reqData.createTime =  date,// 评论时间
                  reqData.videoId  = that.videosID,//评论视频id
                  reqData.toReplyUid = that.ReplyUiddata,
                  reqData.toReplyCommId = that.ReplyCommIddata
            }else if(fdStart == -1){
              //表示strCode不是以回复开头
              var reqData = {};
                  reqData.commentUid = that.videosID, //评论人id
                  reqData.commentContent = this.content,  //评论内容
                  reqData.createTime =  date,// 评论时间
                  reqData.videoId  = that.videosID//评论视频id
            }
        
            
        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
              that.content = ''
              that.tVideoComm();
            }else{
                
            }
        })
      },
    tVideoComm(){
        //获取评论
        var url ='zteng-web/tVideoComm/selectCommList'
        var that = this
        var reqData = {};
            reqData.videoId = that.videosID,

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
              let data = res.body.data;
              that.Commentiddata = data;
            }else{
                
            }
        })
      },
      videodata(){
        var url ='zteng-web/tVideo/selectVideoByVideoId'
        var that = this
        var reqData = {};
            reqData.videoId = that.videosID,

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var data = res.body.data;
                that.videoinfor = data;
                that.redheart = that.videoinfor.iscollection;
                console.log(JSON.stringify(that.videoinfor));
            }else{
                  
            }
        })
      },
      videodatauserId(){
        //视频为您推荐
          var url ='zteng-web/tVideo/open/selectVideoListByUserId'
          var that = this
          var userIdreq
          if (that.loginid == null || that.loginid == 0) {
            userIdreq = that.userId
          }else{
            userIdreq = videoinfor.userId
          }
          var reqData = {};
              reqData.videoId = that.videosID,
              reqData.limit = that.Recommendlimit,
              reqData.page = that.Recommendpage,
              reqData.userId = userIdreq

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                  var data = res.body.data;
                  that.items = data;
              }else{
                  
              }
          })
      },
      collectclick(){
        var that = this
        if (that.loginho == 0) {
            alert("收藏请智腾用户先登录");
            return;
        }else{
            var url ='zteng-web/tVideo/insertCollection'
            
            var reqData = {};
                reqData.videoId = that.videosID,

            that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                console.log(res.body);
                if(res.body.status == 'SUCCEED'){
                    this.redheart = 1;
                }else{
                      
                }
            })
        }
    },
    collectdeletelclick(){
        //取消收藏
        var that = this
        if (that.redheart == 1) {
          var url ='zteng-web/tVideo/deleteCollection'
          
          var reqData = {};
              reqData.videoId = that.videosID,

          that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
              console.log(res.body);
              if(res.body.status == 'SUCCEED'){
                that.redheart = 0;
              }else{
                  
              }
          })
        }
    }
  }
}
</script>
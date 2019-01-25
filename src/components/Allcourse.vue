<template>
<div class="allwarp">
  <div class="choose-warp">
      <div class="li-all-width">
        <div class="all-Category">
            <div class="one-Category">
                <table>
                  <tr>
                    <th>年级分类 ：</th>
                    <th v-for="(item,index) in grade" @click="gradeclick(item)" :class="{Selected : radeactiveIndex == item.index}"><a href="javascript:;">{{item.word}}</a></th>
                  </tr>
                  <tr>
                    <th>课程类别 ：</th>
                    <th v-for="(classitem,index) in course" @click="courseclick(classitem)" :class="{Selected : courseactiveIndex == classitem.index}"><a href="javascript:;">{{classitem.word}}</a></th>
                  </tr>
                </table>
            </div>
        </div>
      </div>
  </div>
  <div class="li-all-width li-tags-classify">
        <div class="curriculum-warp">
            <div class="choose-Display">
                <a :class="{Displayblock : activeIndex == 0}" @click="allhost">最热</a>
                <a :class="{Displayblock : activeIndex == 1}" @click="alltime">最新</a>
            </div>
            <div class="curriculum">
                <ul>
                    <li v-for="(item,index) in items" @click="allvideolistclick(item)">
                        <img class="ckg" :src="item.firstFrame">
                        <div class="ckg-title">
                            <div class="li-ckg-time">
                                <span>{{item.title}}</span>
                                <div class="li-new-right">
                                    <i class="el-icon-time"></i>
                                    <span>{{item.longtime}}</span>
                                </div>
                            </div>
                            <div>
                                <!-- <div class="li-new-left">
                                    <i class="el-icon-star-off"></i>
                                    <span>点击收藏</span>
                                </div> -->
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
        </div>
        <div class="pages-warp">
            <div class="common">
              <span>共{{countpage}}条记录</span>
            </div>
            <div class="page-count" v-if="allpage > 1">
                <el-pagination
                 @current-change="handleCurrentChange"
                  background="false"
                  layout="prev, pager, next"
                  :page-size="1"
                  :total="allpage">
                </el-pagination>
            </div>
        </div>
    </div>
</div>
</template>
<style>
.choose-warp{
  width: 100%;
  background-color: #4d4d4d;
}
.one-Category{
  color: #fff;
  padding: 30px 0;
}
.one-Category table tr th{
  color: #bfbfbf;
  padding-right: 30px;
  text-align: left;
}
.one-Category table tr th a{
  color: #bfbfbf;
}
.one-Category table tr{
  height: 50px;
}
.one-Category table tr th.Selected a{
  color: #81b840;
}
.curriculum-warp{
    margin-bottom: 50px;
}
.li-tags-classify{
    margin-top: 20px;
}
.choose-Display{
  margin: 0 0 20px 0;
  height: 50px;
  border-bottom: 2px solid #8fe687;
}
.choose-Display a{
  display: inline-block;
  padding: 3px 12px;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 10px;
  cursor: default;
}
.Displayblock{
  color: #39a84a;
  background-color: #8fe687;
  border-radius: 10px;
  color: #fff;
}
</style>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to222 Your Vue.js App',
      grade:[{
        index:0,
        word:'全部'
      },
      {
        index:1,
        word:'小学'
      },
      {
        index:2,
        word:'初中'
      },
      {
        index:3,
        word:'高中'
      },
      {
        index:4,
        word:'其他'
      }],

      course:[{
        index:0,
        word:'全部'
      },
      {
        index:1,
        word:'语文'
      },
      {
        index:2,
        word:'数学'
      },
      {
        index:3,
        word:'英语'
      },
      {
        index:4,
        word:'政治'
      },
      {
        index:5,
        word:'地理'
      },
      {
        index:6,
        word:'生物'
      },
      {
        index:7,
        word:'物理'
      },
      {
        index:8,
        word:'化学'
      },
      {
        index:9,
        word:'历史'
      },
      {
        index:10,
        word:'其他'
      }],
      items:[],
        radeactiveIndex:0,
        courseactiveIndex:0,
        activeIndex:0,
        limitge:8,
        pageye:1,
        limitgetime:8,
        pageyetime:1,
        classifytime:false,
        topictime:false,
        countpage:0,
        allpage:0
    }
  },
  created(){
    console.log(localStorage.getItem('classify'));
    this.classifytime = localStorage.getItem('classify') === null ||localStorage.getItem('classify') === "null" ? false : localStorage.getItem('classify');
    console.log(this.classifytime);
    for (var i = 0; i < this.course.length; i++) {
        if (this.classifytime == this.course[i].word) {
            this.courseactiveIndex = this.course[i].index;
        }
    }
    this.allhost();
  },
  methods:{
    allvideolistclick(item){
        localStorage.setItem('vid',item.videoId);
        localStorage.setItem('title',item.title);
        localStorage.setItem('vidurl',item.url);
        localStorage.setItem('vidfirstFrame',item.firstFrame);
        localStorage.setItem('userId',item.userId);
        localStorage.setItem('videouserhead',item.headImg);
        localStorage.setItem('uservidername',item.userName);
        
        this.$router.push('/Vshow');
    },
    gradeclick(item){
        this.radeactiveIndex = item.index;
        if (item.index == 0) {
            this.topictime = false;
        }else{
            this.topictime = item.word;
        }
        if (this.activeIndex == 0) {
            this.allhost();
        }
        if (this.activeIndex == 1) {
            this.alltime();
        }
    },
    courseclick(item){
        this.courseactiveIndex = item.index;
        if (item.index == 0) {
            this.classifytime = false;
            localStorage.setItem('classify',null);
        }else{
            this.classifytime = item.word;
            localStorage.setItem('classify',item.word);
        }
        if (this.activeIndex == 0) {
            this.allhost();
        }
        if (this.activeIndex == 1) {
            this.alltime();
        }
    },
    allhost(){
        this.activeIndex = 0;
        var url ='zteng-web/tVideo/open/selectVideoListBy'
        var that = this
        console.log(that.topictime);
        console.log(that.classifytime);
        if (!that.topictime && !that.classifytime) {
          console.log('1');
            var reqData = {};
            reqData.limit = that.limitge,
            reqData.page = that.pageye
        }
        if (that.topictime && that.classifytime ) {
          console.log('2');
            var reqData = {};
            reqData.limit = that.limitge,
            reqData.page = that.pageye,
            reqData.classify = that.topictime,
            reqData.topic = that.classifytime
        }else{
            if (that.classifytime) {
              console.log('3');
                var reqData = {};
                    reqData.limit = that.limitge,
                    reqData.page = that.pageye,
                    reqData.topic = that.classifytime
            }
            if (that.topictime) {
              console.log('4');
                var reqData = {};
                    reqData.limit = that.limitge,
                    reqData.page = that.pageye,
                    reqData.classify = that.topictime
            }
        }
        
        

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var date = res.body.data;
                that.items = date;
                that.countpage = res.body.totalCount;
                that.allpage = Math.ceil(that.countpage/that.limitge);
                console.log(that.allpage);
            }else{
                
            }
        })
    },
    alltime(){
        this.activeIndex = 1;
        var url ='zteng-web/tVideo/open/selectVideoListByTime'
        var that = this
        console.log(that.topictime);
        console.log(that.classifytime);

        if (!that.topictime && !that.classifytime) {
            console.log('1');

            var reqData = {};
            reqData.limit = that.limitgetime,
            reqData.page = that.pageyetime
        }
        if (that.topictime && that.classifytime) {
            console.log('2');
            var reqData = {};
            reqData.limit = that.limitgetime,
            reqData.page = that.pageyetime,
            reqData.classify = that.topictime,
            reqData.topic = that.classifytime
        }else{
            if (that.classifytime) {
                console.log('3');
                var reqData = {};
                    reqData.limit = that.limitgetime,
                    reqData.page = that.pageyetime,
                    reqData.topic = that.classifytime
            }
            if (that.topictime) {
                console.log('4');
                var reqData = {};
                    reqData.limit = that.limitgetime,
                    reqData.page = that.pageyetime,
                    reqData.classify = that.topictime
            }
        }
        
        

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var date = res.body.data;
                that.items = date;
                that.countpage = res.body.totalCount;
                that.allpage = Math.ceil(that.countpage/that.limitgetime);
                console.log(that.allpage)

            }else{
                
            }
        })
    },
    handleCurrentChange(val){
        console.log(`当前 ${val} 页`);
        this.pageyetime = val;
        this.pageye = val;
        if (this.activeIndex == 0) {
            this.allhost();
        }
        if (this.activeIndex == 1) {
            this.alltime();
        }
    }
  }
}
</script>
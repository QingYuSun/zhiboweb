<template>
  <div class="li-all-width">
  <div class="li-all-am">
    <div class="li-collect-warp">
      <div class="li-all-collect">
        <i class="el-icon-star-off"></i>
        <span>全部收藏</span>
      </div>
    </div>
    <div class="tags-classify-collect">
        <div class="li-collect-title">
          <span class="li-all-word">全部收藏</span>
          <span v-if="comallpage !== 0" class="li-all-open">公开{{items.totalCount}}个视频</span>
          <span v-if="comallpage == 0" class="li-all-open">您未收藏视频</span>
        </div>
          <div class="curriculum-warp">
              <div class="curriculum">
                  <ul>
                    <li v-for="(item,index) in items" @click="conavideolist(item.videoId)">
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
                                <!-- <div class="li-new-left">
                                    <span class="already-collect">已收藏</span>
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
              <!-- <div class="common">
                <span>共{{comallpage}}条记录</span>
              </div> -->
              <div class="page-count" v-if="comallpage != 0">
                  <el-pagination
                   @current-change="comhandleCurrentChange"
                    background="false"
                    layout="prev, pager, next"
                    :page-size="1"
                    :total="comallpage">
                  </el-pagination>
              </div>
          </div>
      </div>
      </div>
  </div>
</template>

<style scoped>
.li-all-am{
  margin:50px 0;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 1px 10px 30px #ccc;
}
.li-collect-warp{
  width: 120px;
  height: 100%;
  border-right: 1px solid #8fe687;
  position: absolute;
}
.li-all-collect{
  width: 100%;
  text-align: center;
  margin-top: 40px;
  background-color: #8fe687;
  padding: 6px 0;
  font-size: 14px;
  color: #fff;
}
.li-collect-title{
  margin-left: 25px;
}
.li-all-word{
  font-size: 22px;
  display: inline-block;
  line-height: 50px;
}
.li-all-open{
  font-size: 14px;
  display: block;
  color: #ccc;
  line-height: 30px;
  border-bottom: 1px solid #8fe687;
  margin-bottom: 30px;
}
.tags-classify-collect{
  width: 870px;
  float: right;
  margin-right: 30px;
}
.curriculum-warp{
  margin-bottom: 50px;
}
.already-collect:hover{
  color: #8fe687;
  cursor: default;
}
</style>

<script>
export default {
  name: 'hello',
  data () {
    return {
        msg: 'Welcome to222 Your Vue.js App',
        items:[],
        conlimit:8,
        conpage:1,
        comallpage:0

    }
  },
  created(){
    this.concerndata();
  },
  methods:{
    conavideolist(id){
        localStorage.setItem('vid',id)
        this.$router.push('/Vshow');
    },
    concerndata(){
        //视频详情
        console.log('关注')
        var url ='zteng-web/tVideo/selectVideoByCollection'
        var that = this
        var reqData = {};
          reqData.limit = that.conlimit,
          reqData.page = that.conpage

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
          console.log(res.body);
          if(res.body.status == 'SUCCEED'){
              var data = res.body.data;
              that.items = data;
              that.comallpage = Math.ceil(res.body.totalCount/that.conlimit);
          }else{
              
          }
        })
    },
    comhandleCurrentChange(val){
        this.conpage = val;
        this.concerndata();
        console.log(`当前 ${val} 页`);
    }
  }
}
</script>
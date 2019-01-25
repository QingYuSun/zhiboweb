<template>
  <div class="fans-warp">
    <expand-box :title="title">
      <div slot="body" class="fans-main">

        <div class="curriculum">
          <ul>
            <li v-for="(item,index) in items" @click="hisvideolist(item.videoId)">
              <img class="ckg" :src="item.firstFrame">
              <div class="ckg-title">
                <div class="li-ckg-time">
                  <span class="li-word-css">{{item.title}}</span>
                  <div class="li-new-right">
                    <i class="el-icon-time"></i>
                    <span>{{item.longtime}}</span>
                  </div>
                </div>
                <!-- <div class="li-new-left">
                  <span class="already-collect">已收藏</span>
                </div> -->
                <div class="li-new-left li-name-head">
                    <img :src="item.headImg">
                    <span>{{item.userName}}</span>
                </div>
                <span class="li-new-right">{{item.count}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="pages-warp">
            <!-- <div class="common">
              <span>共{{incountpage}}条记录</span>
            </div> -->
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
    </expand-box>
  </div>
</template>
<script>
  import ExpandBox from '../Com/ExpandBox.vue'
export default {
  name: 'hello',
  data () {
    return {
      title:"我的关注",
      items:[],
      allpage:0,
      hislimit:6,
      hispage:1
    }
  },
  created(){
    this.fansdata();
  },
  methods:{
    fansdata(){
        //视频详情
        console.log('关注')
        var url ='zteng-web/tVideo/selectRelations'
        var that = this
        var reqData = {};
        reqData.limit = that.hislimit,
        reqData.page = that.hispage

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
          console.log(res.body);
          if(res.body.status == 'SUCCEED'){
              var data = res.body.data;
              that.items = data;
              that.allpage = Math.ceil(res.body.totalCount/that.hislimit);
          }else{
              
          }
        })
    },
    handleCurrentChange(val){
      this.hispage = val;
      this.fansdata();
      console.log(`当前 ${val} 页`);
    },
    hisvideolist(id){
        localStorage.setItem('vid',id)
        this.$router.push('/Vshow');
    },
  },
  components:{
    'expand-box':ExpandBox
  }
}
</script>
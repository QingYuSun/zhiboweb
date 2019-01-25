<template>
  <div class="fans-warp">
    <expand-box :title="title">
      <div slot="body" class="fans-main">
        <div class="curriculum">
          <ul>
            <li v-for="(item,index) in items" @click="hisvideolist(item.videoId)">
              <div class="test">
                <a @click.stop="open4(item)">删除视频</a>
              </div>
              <img class="ckg">
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
              <span>共{{countpage}}条记录</span>
            </div> -->
            <div class="page-count" v-if="hisallpage > 1">
                <el-pagination
                 @current-change="hishandleCurrentChange"
                  background="false"
                  layout="prev, pager, next"
                  :page-size="1"
                  :total="hisallpage">
                </el-pagination>
            </div>
        </div>

      </div>
    </expand-box>
  </div>
</template>

<style>
  .test{
    position: absolute;
    right: 0;
    top:0;
    width: 80px;
    height: 25px;
    text-align: center;
    background: linear-gradient(45deg,#0000,#000);
  }
  .test a{
      display: inline-block;
      line-height: 25px;
      font-size: 13px;
      color: #fff;
      cursor: default;
  }
  .test a:hover{
      color: red;
  }
</style>

<script>
import ExpandBox from '../Com/ExpandBox.vue'
var AWS = require('aws-sdk');

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: "WKF6JNOFNI6RPX39TQH7",
  secretAccessKey: "GyKlykAJgnXWCn6taOqWIupEXhbfF28nShBO06Ka",
  endpoint: "eos-beijing-1.cmecloud.cn",
  s3ForcePathStyle: true,
  signatureVersion: 'v2',
  sslEnabled: false
});


export default {
  name: 'hello',
  data () {
    return {
      title: '我的视频',
      items:[],
      hislimit:6,
      hispage:1,
      hisallpage:0
    }
  },
  created(){
    this.historydata();
  },
  methods:{
    //删除视频
    open4(itemdata) {
      console.log(itemdata.url);
        const h = this.$createElement;
        this.$msgbox({
          title: '删除视频',
          message: h('p', null, [
            h('span', null, '是否删除该视频'),
            h('i', { style: 'color: teal' }, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

                var url ='zteng-web/tVideo/deleteVideo'
                var reqData = {};
                    reqData.videoId = itemdata.videoId

                this.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                    console.log(res.body);
                    if(res.body.status == 'SUCCEED'){
                        done();
                        instance.confirmButtonLoading = false;
                        this.$message({
                        type: 'info',
                        message: '删除成功'
                      });
                      this.historydata();

                      var paramsvideo = {
                        Bucket: "zteng/video",
                        Key: this.stringurl(itemdata.url)
                      };
                      s3.deleteObject(paramsvideo, function(err, data) {
                        if (err) {
                          console.log('失败');
                        } else {
                          console.log('成功');
                        }
                      });
                      var paramsimage = {
                        Bucket: "zteng/images",
                        Key: this.stringurl(itemdata.firstFrame)
                      };
                      s3.deleteObject(paramsimage, function(err, data) {
                        if (err) {
                          console.log('失败');
                        } else {
                          console.log('成功');
                        }
                      });
                    }
                })
            } else {
                done();
            }
          }
        })
    },
    hisvideolist(id){
        localStorage.setItem('vid',id)
        this.$router.push('/Vshow');
    },
    historydata(){
        //视频详情
        console.log('我的视频')
        var url ='zteng-web/tVideo/selectVideoListByUpload'
        var that = this
        var reqData = {};
          reqData.limit = that.hislimit,
          reqData.page = that.hispage

        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
          console.log(res.body);
          if(res.body.status == 'SUCCEED'){
              var data = res.body.data;
              that.items = data;
              that.hisallpage = Math.ceil(res.body.totalCount/that.hislimit);
              console.log(that.hisallpage)
          }else{
              
          }
        })
    },
    hishandleCurrentChange(val){
        this.hispage = val;
        this.historydata();
        console.log(`当前 ${val} 页`);
    },
    stringurl(str){
      console.log(str);
      var videourlnuber = str.lastIndexOf("\/");
      return str.substring(videourlnuber + 1, str.length);
    }
  },
  components:{
    'expand-box':ExpandBox
  }
}
</script>
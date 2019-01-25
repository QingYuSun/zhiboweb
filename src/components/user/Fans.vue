<template>
  <div class="fans-warp">
    <expand-box :title="title">
      <div slot="body" class="fans-main">

        <div class="curriculum-warp">
          <div class="fans-warp">
              <div class="li-fans">
                <div class="fans-one" v-for="(item,index) in items">
                  <div class="fans-concern">
                    <a v-if="item.isrelation == 0" @click="focus(item)">+关注</a>
                    <a v-if="item.isrelation == 1" @click="focustrue(item)">已关注</a>
                  </div>
                  <div class="fans-img">
                    <img :src="item.headImg">
                  </div>
                  <span class="li-fans-name">{{item.userName}}</span>
                </div>
              </div>
          </div>
        </div>

      </div>
    </expand-box>
  </div>
</template>
<style>
  .fans-one{
    width: 370px;
    display: inline-block;
    padding: 20px 0;
    margin: 0 30px;
    border-bottom: 1px solid #8fe687;
  }
  .fans-img{
    float: left;
    width: 60px;
    height: 60px;
  }
  .fans-img img{
    width: 100%;
    height: 100%;
     border-radius: 50%;
  }
  .fans-title{
    margin-left: 80px;
    padding-top: 5px;
  }
  .fans-name{
    padding: 3px 0;
  }
  .fans-concern{
    float: right;
    padding-right: 30px;
    margin-top: 17px;
  }
  .fans-concern a{
    border: 1px solid #d9d9d9;
    display: inline-block;
    padding: 1px 3px;
  }

  .li-fans-name{
    line-height: 60px;
    margin-left: 15px;
  }
</style>

<script>
import ExpandBox from '../Com/ExpandBox.vue'
export default {
  name: 'hello',
  data () {
    return {
      title:"我的粉丝",
      items:[]
    }
  },
  created(){
    this.fansdata();
  },
  methods:{
    fansdata(){
        //视频详情
        console.log('关注')
        var url ='zteng-web/tRelation/selectMyRelation'
        var that = this
        var reqData = {};
        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
          console.log(res.body);
          if(res.body.status == 'SUCCEED'){
              var data = res.body.data;
              that.items = data;
          }else{
              
          }
        })
    },
    focustrue(item){
      console.log('删除关注')
        var url ='zteng-web/tRelation/deleteRelation'
        var that = this
        var reqData = {};
            reqData.relationId = item.userId
        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
          console.log(res.body);
          if(res.body.status == 'SUCCEED'){
            item.isrelation = 0
          }else{
              
          }
        })
    },
    focus(item){
      console.log('添加关注')
        var url ='zteng-web/tRelation/insertRelation'
        var that = this
        var reqData = {};
            reqData.fromUserId = item.relationId
        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
          console.log(res.body);
          if(res.body.status == 'SUCCEED'){
              item.isrelation = 1
          }else{
              
          }
        })
    }
  },
  components:{
    'expand-box':ExpandBox
  }
}
</script>
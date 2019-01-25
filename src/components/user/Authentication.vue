<template>
  <div class="add-videowarp">
    <div class="cut-certificate">
      <a @click="cutcer(0)" :class="{acter : identification == 0}" href="javascript:;">我的直播</a>
    </div>
  <div v-if="identification == 0" class="cation-information">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="直播标题" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="直播内容简介" prop="license">
        <el-input v-model="ruleForm.license"></el-input>
      </el-form-item>
      <el-form-item label="直播时间" prop="area">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value1"
            type="datetime"
            align="center"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="结束时间" prop="area">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="value2"
            type="datetime"
            align="center"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="直播地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="直播封面" prop="zipcode">
        <div class="upimages">
          <div class="inpimage">
            <input @change="fileimage" type="file" name="fileimage" accept="image/gif, image/jpeg, image/png">
          </div>
          <div class="showimages">
            <img :src="imageUrl">
          </div>
        </div>
        
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>

  </div>
    <template>
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
  </template>
</template>

<script>

import COS from 'cos-js-sdk-v5';
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

var video, output;
var scale = 0.8;


var config = {
    Bucket: 'zteng-1255932493',
    Region: 'ap-guangzhou'
};
var getAuthorization = function (options, callback) {
    // 方法二（适用于前端调试）
    var authorization = COS.getAuthorization({
        SecretId: 'AKIDSijX6RxLwJRKzPuYGjyykHZeU5QXoyIN',
        SecretKey: 'xf6IFwNXR9hz1nIXXHlzxf7IDsHYeXDf',
        Method: options.Method,
        Key: options.Key,
    });
    callback(authorization);
};
var cos = new COS({
    // 必选参数
    getAuthorization: getAuthorization,
    // 可选参数
    FileParallelLimit: 3,    // 控制文件上传并发数
    ChunkParallelLimit: 3,   // 控制单个文件下分片上传并发数
    ChunkSize: 1024 * 1024,  // 控制分片大小，单位 B
    ProgressInterval: 1000,  // 控制 onProgress 回调的间隔
});
var TaskId;

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to222 Your Vue.js App',
      identification:0,
      imageUrl: 'http://eos-beijing-1.cmecloud.cn/zteng/images/add.png',
     ruleForm: {
          name: '',
          license: '',
          address: '',
          zipcode:'',
          portraiture: '',
          website: '',
          found: '',
          personalityname: '',
          idcard:'',
          telephone:''
        },
        rules: {
          name: [
            { required: true, message: '请输入直播标题', trigger: 'blur' },
            { min: 1, trigger: 'blur' }
          ],
          license: [
            { required: true, message: '请输入直播内容简介', trigger: 'blur' },
            { min: 1, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入直播地址', trigger: 'blur' },
            { min: 1, trigger: 'blur' }
          ]
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }]
        },
        value1: '',
        value2:''
      }
  },
  methods:{
    open() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，成功了',
          type: 'success'
        });
      },

      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$message.error('错了哦，请认真填写');
      },
    submitForm(formName) {
      this.videolive();
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      newtime:function(el){
          return moment(el).format()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cutcer(e){
        this.identification = e
      },
      videolive(){
        var that = this;
        console.log(that.ruleForm.license);
        console.log(that.imageUrl);
        console.log(that.ruleForm.address);
        console.log(that.newtime(that.value1));
        console.log(that.newtime(that.value2));
        console.log(that.ruleForm.name);

        //上传直播
        
        var url ='zteng-web/tVideoLive/insert';
        var reqDatas = {};
            reqDatas.content = that.ruleForm.license,
            reqDatas.endTime = that.newtime(that.value1),
            reqDatas.img = that.imageUrl,
            reqDatas.liveUrl = that.ruleForm.address,
            reqDatas.startTime = that.newtime(that.value2),
            reqDatas.title = that.ruleForm.name
        var reqData = JSON.stringify(reqDatas);
        that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
            console.log(res.body);
            if(res.body.status == 'SUCCEED'){
                var data = res.body.data;
                that.open2();
                that.resetForm(that.ruleForm);
            }else{
                that.open4();
            }
        })
      },
    fileimage(event){
      var that=this;
      var file = event.target.files[0];

      if (file) {
          var params = {Key: file.name,Bucket: "zteng/images", ContentType: file.type, Body: file};
          s3.upload(params, function (err, data) {
            console.log(err ? 'ERROR!' : 'UPLOADED.')
            var paramsacl = {Bucket: "zteng/images",ACL: "public-read",Key: that.filename};
            s3.putObjectAcl(paramsacl, function(err, data) {
              if (err) {

              } else {
                  that.imageUrl = `http://eos-beijing-1.cmecloud.cn/zteng/images/${file.name}`;
                  console.log(that.imageUrl);
              }
            });
          });
        } else {
            console.log('视频失败')
        }
    },
  }
}
</script>

<style>
input[type="file"] {
  color: transparent;
}

  .tags-title{
        width: 100%;
        height: 50px;
    }
    .tags-title span{
        float: left;
        line-height: 50px;
        font-size: 16px;
    }
    .tags-title a{
        float: right;
        line-height: 50px;
        font-size: 12px;
    }
    .curriculum2 ul{
      overflow: hidden;
      margin-bottom: 10px;
      margin: 0 40px;
    }
    .curriculum2 ul li{
      float: left;
      width: 250px;
      background-color: #fff;
      margin: 10px 15px 20px 15px;
    }
    .curriculum2 ul li .ckg{
        width: 100%;
    }
    .ckg-title{
        padding:10px; 
    }
    .user-name{
        padding: 5px 0; 
        position: relative;
    }
    .user-name a{
        margin-left: 20px;
    }
    .user-name img{
        position: absolute;
        top: 7px;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 10px;
    }
    .float-right{
        float: right;
    }
    .my-video{
      padding-left: 20px;
    }

    .pages-warp{
      text-align: center;
      padding-bottom: 80px;
      padding-top: 50px;
    }
    .page-count a{
      color: #878787;
      padding: 8px 12px;
      border: 1px solid #878787;
      font-size: 16px;
      margin: 0 5px;
    }
    .add-videowarp{
      background-color: #fff;
    }
    .cation-information{
      padding: 30px 360px 30px 30px;
    }
    .cut-certificate{
      padding: 10px 30px;
    }
    .cut-certificate a{
      display: inline-block;
      padding: 10px 30px;
      
    }
    .acter{
      border-bottom: 3px solid #7fb940;
    }
    .el-date-picker{
      width: 320px !important;
    }

    .upimages{
      position: relative;
      width: 300px;
      height: 200px;
    }
    .inpimage{
      border:1px dashed #ccc;
      height: 200px;
    }
    .inpimage input{
      width: 300px;
      height: 200px;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 666;
    }
    .showimages{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .showimages img{
      width: 100%;
      height: 100%;
    }
</style>

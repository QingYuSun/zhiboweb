<template>
<div class="fans-warp">
    <expand-box :title="title">
    <div slot="body" class="fans-main">
  <div class="add-videowarp">
    <div class="curriculum-warp">
          <div class="updatevideo">
              <div class="updatevideo-cont">
              <a href="javascript:;">上传视频<i></i><input @change="filevideo" type="file" id="fileData" name="filevideo"></a>
              </div>
          </div>
      </div>
        <div v-show ="show" class="updatedetailed" @click.stop="closeclassify">
          <div class="modalclose" @click.capture="blacknone()"></div>
          <div class="detailedlist">
            <div class="upbelow">
                <span class="zt-repeat">上传文件名字</span>
                <div class="progress-color"><p>上传状态<em>{{Percent}}</em></p></div>
                <div class="pointout">视频文件已上传，请确认视频信息，点击保存，以完成视频上传</div>
            </div>
            <div class="upbelow">
                <span class="zt-repeat">标题</span>
                <input type="text" name="name" v-model="vtitle">
            </div>
            <div class="upbelow">
                <span class="zt-repeat">简介</span>
                <input type="text" name="name" v-model="vdescribe">
            </div>
            <div class="upbelow">
                <span class="zt-repeat">年级</span>
                <!-- <input type="text" name="name" @click.stop="displayshow2"> -->
                <div>
                  <el-select v-model="value4" clearable placeholder="请选择">
                    <el-option
                      v-for="item in optionsvideo"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
            </div>
            <div class="upbelow">
                <span class="zt-repeat">科目</span>
                <!-- <input type="text" name="name" @click.stop="displayshow2"> -->
                <div>
                  <el-select v-model="valuetopic" clearable placeholder="请选择">
                    <el-option
                      v-for="item in optionstopic"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
            </div>
            <!-- <div class="upbelow">
                <span>话题</span>
                <input type="text" name="name">
            </div> -->
            <div class="upbelow">
                <span>标签</span>
                <input type="text" name="name" v-model="vlabel">
            </div>
            <div class="upbelow Save">
              <a @click="uploadvideoaffirm">保存</a>
            </div>
          </div>
        </div>
      <div v-show ="show" class="absoluteblack">
      </div>
      <div>
        <video style="display: none;" id="video" controls="controls" :src="videoSrc">
          <source :src="videoSrc" type="video/mp4">
        </video>
      </div>
      <div style="display: none;" id="output"></div>
  </div>
  </div>
  </expand-box>
  </div>
</template>

<style>
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
  .updatevideo{
    padding-bottom: 50px;
  }
  .updatevideo-cont a{
      width: 180px;
      height: 100px;
      margin: 0 auto;
      display: block;
      margin-top: 150px;
      background-color: #7fb940;
      border-radius: 10px;
      color: #fff;
      font-size: 20px;
      position: relative;
      text-align: right;
      line-height: 100px;
      padding-right: 30px;
  }
  .updatevideo-cont a input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
  }
  .updatevideo-cont a i{
    position: absolute;
    z-index: 9;
    width: 60px;
    height: 60px;
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 9;
    background-image: url(../../assets/upload.png);
  }
  .updatevideo-cont{
    width: 700px;
    height: 400px;
    margin: 0 auto;
    border: 2px dashed #ccc;
    background-color: #e5e5e5;
  }
  .upicon{
    display: block;
    width: 120px;
    background-color: #7fb940;
    margin: 150px auto;
    padding: 20px 10px;
    color: #fff;
    border-radius: 10px;
  }
  .el-upload-dragger{
    background-color: #7fb940;
    border-radius: 6px;
    box-sizing: border-box;
    border: 0;
    width: 290px !important;
    height: 100px !important;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 150px 205px;
  }
  .iconcolor{
    font-size: 67px;
    margin: 20px !important;
    line-height: 50px;
    float: left;
    color: #fff !important;
  }
  .textcolor{
    color: #fff !important;
    font-size: 26px !important;
    margin-top: 20px !important;
    margin-left: -80px;
    width: 340px;
  }
  .textcolor em{
    color: #fff !important;
    display: inherit;
    font-size: 10px !important;
  }
  .absoluteblack{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(0, 0, 0, 0.5)
  }
  .updatedetailed{
    position: fixed;
    top: 0;
    width: 900px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 60px;
    z-index: 100;
    margin: 0 auto;
    margin-top: 60px;
  }
  .detailedlist{
    width: 700px;
    margin: 0 auto;
    padding-top: 50px;
  }
  .progress-color{
    width: 100%;
    height: 30px;
    background-color: #8fe687;
    border-radius: 4px;
  }
  .progress-color p{
    line-height: 30px;
    padding-left: 30px;
    color: #fff;
  }
  .progress-color p em{
    font-size: 18px;
    padding-left: 10px;
  }
  .upbelow{
    margin:20px 0;
  }
  .upbelow .zt-repeat{
    padding:10px 0;
    display: block;
    position: relative;
  }
  .upbelow input{
    display: block;
    width: 400px;
    padding: 8px;
  }
  .Save{
    padding: 30px 0;
    text-align: center;
  }
  .Save a{
    display: block;
    width: 120px;
    color: #fff;
    background-color: #7fb940;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    cursor: default;
  }
  .Save a:hover{
    background-color: #93be65;
  }
  .pointout{
    font-size: 12px;
    padding: 10px 0;
  }
  .classify{
    width: 420px;
    padding-bottom: 10px;
    background-color: #f2f2f2;
  }
  .classifyab{
    position: absolute;
    z-index: 99;
  }
  .classify-table{
    border:1px solid #63c6ff;
  }
  .checked-class{
    line-height: 30px;
    height: 30px;
    padding-left: 5px;
  }
  .classify-table{
    margin: 0 5px;
  }
  .classify-table table{
    width: 100%;
    text-align: center;
  }
  .classify-table table tr td{
    border: 1px solid #ccc;
    padding: 5px 0;
  } 
  .classify-up{
    padding: 5px 13px;
  }

  .modalclose{
    height: 40px;
    width: 40px;
    background-size: 100%;
    float: right;
    margin: 20px 20px 0 0;
    background-image: url(../../assets/cloce.png);
  }
</style>


<script>
import ExpandBox from '../Com/ExpandBox.vue'
import COS from 'cos-js-sdk-v5';
var AWS = require('aws-sdk');
var video, output;
var scale = 0.8;

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: "WKF6JNOFNI6RPX39TQH7",
  secretAccessKey: "GyKlykAJgnXWCn6taOqWIupEXhbfF28nShBO06Ka",
  endpoint: "eos-beijing-1.cmecloud.cn",
  s3ForcePathStyle: true,
  signatureVersion: 'v2',
  sslEnabled: false
});

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
      title: '上传视频',
      show:false,
      show2:false,
      dialogImageUrl: '',
      dialogVisible: false,
      videoSrc: '',
      tempSrc:'',
      tempSrczhuan:'',
      Percent:'',
      filename:'',
      upvideourl:'', //视频url
      upvideoimg:'', //视频图片uel
      videotime:'',
      vtitle:'',
      vlabel:'',
      vdescribe:'',
      imgname:'',
      optionsvideo: [{
          value: '小学',
          label: '小学'
        }, {
          value: '中学',
          label: '中学'
        }, {
          value: '高中',
          label: '高中'
        }, {
          value: '其他',
          label: '其他'
        }],
        value4: '',
        optionstopic: [{
          value: '语文',
          label: '语文'
        }, {
          value: '数学',
          label: '数学'
        }, {
          value: '英语',
          label: '英语'
        }, {
          value: '政治',
          label: '政治'
        }, {
          value: '地理',
          label: '地理'
        }, {
          value: '历史',
          label: '历史'
        }, {
          value: '生物',
          label: '生物'
        }, {
          value: '物理',
          label: '物理'
        }, {
          value: '化学',
          label: '化学'
        }, {
          value: '其他',
          label: '其他'
        }],
        valuetopic: '',
        timestamp:''
    }
  },
  watch: {
    tempSrczhuan:function(){
      this.tupian();
    },
  },
  created:function(){
    
  },
  methods:{
    captureImage:function() {
      
    },
    //转换baset64转换blob
    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    },

    displayshow2:function(){
      this.show2 = true
    },
    tupian(){
      console.log(this.tempSrczhuan);
      var that = this
      that.timestamp = new Date().getTime();
          var file = that.tempSrczhuan;
          if (file) {
              var params = {Key: that.timestamp + that.filename,Bucket: "zteng/images", ContentType: file.type, Body: file};
              s3.upload(params, function (err, data) {
                console.log(err ? 'ERROR!' : 'UPLOADED.')
                 var paramsacl = {Bucket: "zteng/images",ACL: "public-read",Key: that.timestamp + that.filename};
                  s3.putObjectAcl(paramsacl, function(err, data) {
                  if (err) {

                  } else {
                      that.upvideoimg = `http://eos-beijing-1.cmecloud.cn/zteng/images/${that.timestamp}${that.filename}`;
                      console.log(that.upvideoimg);
                  }
                });
              });
            } else {
                console.log('失败')
            }

          /*if (file) {
              if (file.size > 1024 * 1024) {
                  cos.sliceUploadFile({
                      Bucket: config.Bucket, // Bucket 格式：test-1250000000
                      Region: config.Region,
                      Key: 'video/videoimg/'+that.filename,
                      Body: file,
                      TaskReady: function (tid) {
                          TaskId = tid;
                      },
                      onHashProgress: function (progressData) {
                          console.log('onHashProgress', JSON.stringify(progressData));
                      },
                      onProgress: function (progressData) {
                          console.log('onProgress', JSON.stringify(progressData));
                      },
                  }, function (err, data) {
                      console.log(err || data);
                      that.upvideoimg = data.Location;
                  });
              } else {
                  cos.putObject({
                      Bucket: config.Bucket, // Bucket 格式：test-1250000000
                      Region: config.Region,
                      Key: 'video/videoimg/'+that.filename,
                      Body: file,
                      TaskReady: function (tid) {
                          TaskId = tid;
                      },
                      onProgress: function (progressData) {
                          console.log(JSON.stringify(progressData));
                      },
                  }, function (err, data) {
                      console.log(err || data);
                      that.upvideoimg = data.Location;
                  });
              }
          }*/
    },
    canvashuizhi(){
      var self = this
      setTimeout(function() {
        var output = document.getElementById("output");
        var video = document.getElementById("video");
            console.log(video.duration);
            
            self.videotime = video.duration;
            console.log(self.videotime);
        var canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 200;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = document.createElement("img");
        /*img.onload = function(){//图片加载完，再draw 和 toDataURL*/
            self.tempSrc = canvas.toDataURL("image/png");
            img.src = self.tempSrc
            output.appendChild(img); 
            //转换baset64转换blob并上传
            self.tempSrczhuan = self.dataURLtoBlob(self.tempSrc);
        /*};*/
        },3000)
      },
    filevideo(event){
      /*var input = document.createElement('input');
      input.type = 'file';*/
      var that=this;
      var timestampvideo = new Date().getTime();
      var file = event.target.files[0];
      /*input.onchange = function (e) {*/
        that.show = true;
          /*var file = this.files[0]*/
          console.log(file.name);

          that.filename = file.name.substring(0, file.name.indexOf('.'));
          var url = URL.createObjectURL(file);
          that.videoSrc = url
          console.log(url);
          console.log(that.videoSrc);
          document.getElementById("video").src = url;
          that.canvashuizhi();

          if (file) {
              that.Percent = '上传中';
              var params = {Key: `time${timestampvideo}${file.name}`,Bucket: "zteng/video", ContentType: file.type, Body: file};
              s3.upload(params, function (err, data) {
                console.log(err ? 'ERROR!' : 'UPLOADED.')
                var aaa = err ? 'ERROR!' : 'UPLOADED.';
                console.log(aaa);
                if (aaa == 'UPLOADED.' ) {
                  that.Percent = '上传成功';
                  var paramsacl = {Bucket: "zteng/video",ACL: "public-read",Key: `time${timestampvideo}${file.name}`};
                  s3.putObjectAcl(paramsacl, function(err, data) {
                  if (err) {
                    console.log(err);
                  } else {
                      that.upvideourl = `http://eos-beijing-1.cmecloud.cn/zteng/video/time${timestampvideo}${file.name}`;
                      console.log(that.upvideourl);
                  }
                  });
                  
                }
                if (aaa == 'ERROR!' ) {
                  that.Percent = '上传失败';
                }
              });
            } else {
                console.log('上传视频失败')
            }
          /*if (file) {
              if (file.size > 1024 * 1024) {
                  cos.sliceUploadFile({
                      Bucket: config.Bucket, // Bucket 格式：test-1250000000
                      Region: config.Region,
                      Key: 'video/videomp4/'+file.name,
                      Body: file,
                      TaskReady: function (tid) {
                          TaskId = tid;
                      },
                      onHashProgress: function (progressData) {
                          console.log('onHashProgress', JSON.stringify(progressData));
                      },
                      onProgress: function (progressData) {
                          console.log('onProgress', JSON.stringify(progressData));
                          that.Percent = progressData.percent*100;
                          console.log(`进度${that.Percent}`);
                      },
                  }, function (err, data) {
                      console.log(err || data);
                      that.upvideourl = data.Location;
                      console.log(data.Location)
                  });
              } else {
                  cos.putObject({
                      Bucket: config.Bucket, // Bucket 格式：test-1250000000
                      Region: config.Region,
                      Key: file.name,
                      Body: file,
                      TaskReady: function (tid) {
                          TaskId = tid;
                      },
                      onProgress: function (progressData) {
                          console.log(JSON.stringify(progressData));
                      },
                  }, function (err, data) {
                      console.log(err || data);
                  });
              }
          }*/
      /*}*/
      /*input.click();*/
    },
    closeclassify:function(){
      this.show2 = false
    },
    blacknone:function(){
      this.show = false
      this.show2 = false
      console.log('ll');
      var file = document.getElementById("fileData");  
        // for IE, Opera, Safari, Chrome  
        if (file.outerHTML) {
          file.value = ""; 
        } else { // FF(包括3.5) 
          file.value = "";  
        } 
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      timep(s) {
        return s < 10 ? '0' + s: s;
      },
      uploadvideoaffirm(){
        var that =  this
        if (this.Percent == '上传成功') {
          if (that.value4 === "") {
            alert("分类不能为空")
            return;
          }
          if (that.vlabel === "") {
            alert("标签不能为空")
            return;
          }
          if (that.vtitle === "") {
            alert("标题不能为空")
            return;
          }
          if (that.valuetopic === "") {
            alert("年级不能为空")
            return;
          }
          if (that.vdescribe === "") {
            alert("简介不能为空")
            return;
          }
          var url ='zteng-web/tVideo/insertVideo'
          
          var vhour = that.timep(parseInt((that.videotime)/3600));
          var vminute = that.timep(parseInt((that.videotime%3600)/60));
          var vsecond = that.timep(Math.ceil(that.videotime%60));
          var longtiam = `${vhour}:${vminute}:${vsecond}`;
          /*var httpupvideourl = `http://${that.upvideourl}`;*/
          let Time = new Date();
          let Times = Time.getFullYear()+"-"+(Time.getMonth()+1)+"-"+Time.getDate();
          var reqDatas = {
              classify: that.value4, //分类
              count: 0, //播放次数
              createTime: Times, //开始时间
              firstFrame: that.upvideoimg, //第一针时间
              label: that.vlabel, //标签
              longtime: longtiam, //时长
              title: that.vtitle, //标题
              topic: that.valuetopic, //年级
              url: that.upvideourl,
              /*userId: 1,*/ //id
              videoDescribe: that.vdescribe //简介
            };
            var reqData = JSON.stringify(reqDatas);
            console.log(reqData);
            that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                console.log(res.body);
                if(res.body.status == 'SUCCEED'){
                    var date = res.body.data;
                    that.show = false;
                    that.show2 = false;
                }else{
                    alert('保存失败');
                }
            })
          }else{
            alert('上传完成之后保存')
          }
        },
  },
  components:{
    'expand-box':ExpandBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
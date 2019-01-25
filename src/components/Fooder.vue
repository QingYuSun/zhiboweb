<template>
  <div class="vfooder-warp">
      <div class="fooder">
          <div class="work li-new-left">
            <p><i class="icon-phone"></i>0576-88883698<span>周一至周五 9：00-18：00</span></p>
          </div>
          <div class="work li-new-right">
            <p><i class="icon-qq"></i>在线QQ客服<span>周一至周五 9：00-18：00</span></p>
          </div>
      </div>
  </div>
</template>
<style scoped>
  .vfooder-warp{
    width: 100%;
    background-color: #4d4d4d;
    height: 190px;
  }
  .fooder{
    width: 1200px;
    margin: 0 auto;
  }
  .work{
    padding-top:80px; 
  }
  .work p{
    color: #fff;
    position: relative;
    margin-bottom: 20px;
  }
  .work p span{
    display: inherit;
    color: #a6a6a6;
    margin-top: 10px;
  }
  .work p i{
    position: absolute;
    left: -50px;
    top: 0;
    width: 40px;
    height: 40px;
  }
  .icon-phone{
    background-image: url(../assets/phone.png);
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .icon-qq{
    background-image: url(../assets/qq.png);
    background-size: 80%;
    background-repeat: no-repeat;
    margin: 2px 0 0 5px;
  }
</style>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'this is fooder'
    }
  }
}
</script>
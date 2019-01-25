<template>
  <div class="user-show">
    <template v-if="selectedItemrecipe.index == 0">
        <v-indiv></v-indiv>
    </template>
    <template v-if="selectedItemrecipe.index == 1">
        <v-video></v-video>
    </template>
    <template v-if="selectedItemrecipe.index == 2">
        <up-video></up-video>
    </template>
    <template v-if="selectedItemrecipe.index == 3">
        <v-fans></v-fans>
    </template>
    <template v-if="selectedItemrecipe.index == 4">
        <v-authen></v-authen>
    </template>
    <template v-if="selectedItemrecipe.index == 5">
        <v-history></v-history>
    </template>
  </div>
</template>

<style>
  .user-show{
    width: 870px;
    float: right;
    min-height: 394px;
  }
</style>

<script>
import Individual    from './Individual.vue'; //个人资料
import Myvideo    from './Myvideo.vue'; //我的视频
import Upvideo    from './Upvideo.vue'; //上传视频
import Authen    from './Authentication.vue'; //上传视频
import Fans    from './Fans.vue'; //我的粉丝
import History    from './History.vue'; //观看历史
export default {
  name: 'hello',
  props:{
      selectedItemrecipe:Object
  },
  components:{
      'v-indiv':Individual,
      'v-video':Myvideo,
      'up-video':Upvideo,
      'v-authen':Authen,
      'v-fans':Fans,
      'v-history':History
  },
  data () {
    return {
      msg: 'Welcome to222 Your Vue.js App',
    }
  },
  created:function () {
    console.log(JSON.stringify(this.selectedItemrecipe));
    console.log('第3步');
  },
  watch:{
    selectedItemrecipe:function () {
      console.log(JSON.stringify(this.selectedItemrecipe));
      console.log('第3步');
    }
  }
}
</script>
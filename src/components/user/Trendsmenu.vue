<template>
      <div class="user-list">
        <ul>
        <template v-for="(item,index) in menus">
              <li v-if="loginid != 2" :class="{listcolor : activeIndex == item.index}" @click="selected(item)">
                  <a>
                      {{item.type}}
                  </a>
              </li>
              <li v-if="loginid == 2" :class="{listcolor : activeIndex == item.index}" @click="selected(item)">
                  <a>
                      {{item.type}}
                  </a>
              </li>
              <!-- <li v-if="loginid != 2 && item.index != 2" :class="{listcolor : activeIndex == item.index}" @click="selected(item)">
                  <a>
                      {{item.type}}
                  </a>
              </li>
              <li v-if="loginid == 2" :class="{listcolor : activeIndex == item.index}" @click="selected(item)">
                  <a>
                      {{item.type}}
                  </a>
              </li> -->
          </template>
        </ul>
      </div>
</template>
<style>
  .user-list{
    float: left;
    width: 140px;
    background-color: #fff;
  }
  .user-list ul{
    padding: 15px 0;
  }
  .user-list li{
    margin-bottom: 15px;
  }
  .user-list li a{
    line-height: 25px;
    font-size: 14px;
    display: inline-block;
    padding-left: 10px;
  }
  .user-list li.listcolor{
    background-color: #8fe687;
  }
  .user-list li.listcolor a{
    color: #fff;
  }
</style>
<script>
  var menus = [
        {
            index:0,
            type:'我的关注'
        },
        {
            index:5,
            type:'观看历史'
        }
    ]
  var menus2 = [
        {
            index:0,
            type:'我的关注'
        },
        {
            index:1,
            type:'我的视频'
        },
        {
            index:2,
            type:'上传视频'
        },
        {
            index:3,
            type:'我的粉丝'
        },
        {
            index:5,
            type:'观看历史'
        }
    ]
    var menus3 = [
        {
            index:0,
            type:'我的关注'
        },
        {
            index:1,
            type:'我的视频'
        },
        {
            index:2,
            type:'上传视频'
        },
        {
            index:4,
            type:'我的直播'
        },
        {
            index:3,
            type:'我的粉丝'
        },
        {
            index:5,
            type:'观看历史'
        }
    ]
export default {
  data () {
    return {
      msg: 'Welcome to222 Your Vue.js App',
      menus:menus,
      activeIndex:0,
      loginid:0,
      role:0
    }
  },
  created(){
    this.loginid = sessionStorage.getItem("loginid");
    this.role = sessionStorage.getItem("role");

    if (this.loginid == 2) {
      this.menus = menus2
    }
    if (this.role == 2 && this.loginid == 2) {
      this.menus = menus3
    }

  },
  methods:{
    selected:function (item) {
      this.activeIndex = item.index;
      this.$emit('selected', item);
      console.log('第一步');
    }
  }
}
</script>
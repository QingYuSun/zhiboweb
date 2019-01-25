<template>
  <div id="app">
    <div class="wrapper">
        <v-head></v-head>
        <!-- <v-main></v-main> -->
        <router-view></router-view>
        <v-fooder></v-fooder>
    </div>
  </div>
</template>

<script>
    import vHead from './components/Header.vue';
    /*import vMain from './components/Main.vue';*/
    import vFooder from './components/Fooder.vue';
    export default{
        data:function(){
            return{
                msg:'this is homes'
            }
        },
        components:{
            vHead, vFooder
        }
    }
</script>
<style>
    @import "./scss/rest.css";
</style>
<template>
    <div class="user-warp">
        <div class="user li-all-width">
            <div class="li-user-name">
                <div class="concern-num-warp">
                    <img v-if="concernimg !=null" :src="concernimg">
                    <img v-if="concernimg == null" src="../../assets/head.png">
                    <div class="concern-num">
                        <span>{{concernname}}</span>
                        <p>关注人数{{concernpoplenumber}}</p>
                    </div>
                </div>
            </div>
            <div>
                <trends-menu v-on:selected="selected"></trends-menu>
            </div>
            <div>
                <trends-content :selectedItemrecipe="selectedItem"></trends-content>
            </div>
        </div>
    </div>
</template>
<style>
    .user-warp{
        width: 100%;
        border-top: 2px solid #8fe687;
    }
    .li-user-name{
        width: 100%;
        overflow: hidden;
    }
    .concern-num-warp{
        margin-bottom: 20px;
        overflow: hidden;
    }
    .concern-num-warp img{
        float: left;
        width: 60px;
        height: 60px;
    }
    .concern-num{
        margin-left: 80px;
    }
    .concern-num span{
        font-size: 18px;
        color: #606060;
        line-height: 30px;
    }
    .concern-num p{
        font-size: 15px;
        color: #999;
        line-height: 30px;
    }
    .user{
        overflow: hidden;
        margin-top: 20px;
        margin-bottom: 80px;
    }
</style>
<script>
    import TrendsMenu       from './TrendsMenu.vue'
    import TrendsContent    from './TrendsContent.vue'
    export default{
        data(){
            return{
                name:'关注人数',
                dataChange:'',
                selectedItem:{index:0,type:'个人中心'},
                concernpoplenumber:'',
                concernname:'',
                concernimg:null
            }
        },
        components:{
            'trends-menu':TrendsMenu,
            'trends-content':TrendsContent,
        },
        created(){
            this.concerndata();
            this.concernname = sessionStorage.getItem("userName");
            this.concernimg = sessionStorage.getItem("headImg");
        },
        methods:{
            selected:function (item) {
                console.log(JSON.stringify(item));
                this.selectedItem = item;
                console.log('第2步');
            },
            concerndata(){
                //关注人数
                console.log('关注');
                var url ='zteng-web/tVideo/selectRelations'
                var that = this
                var reqData = {};
                reqData.limit = 6,
                reqData.page = 1

                that.$http.post(url, reqData,{"emulateJSON":true}).then(function (res){
                    console.log(res.body);
                    if(res.body.status == 'SUCCEED'){
                        that.concernpoplenumber = res.body.totalCount;
                    }
                })
            }
        }
    }
</script>

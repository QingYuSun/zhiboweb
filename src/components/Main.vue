<template>
    <div>
        <div class="Carousel">
            <img id="wrapper" :src="imgs[imgstime]">
        </div>
        <div class="li-all-width">
            <div class="li-class-title">
                <span>全部分类课程</span>
            </div>
            <div class="li-class-image">
                <table>
                    <template>
                        <tr class="li-first-line">
                            <th v-for="(item,index) in items" v-if="index < 5"><a @click="speedyclass(item.label)"><i></i><span>{{item.label}}</span></a></th>
                        </tr>
                        <tr class="li-tasks">
                            <th v-for="(item,index) in items" v-if="index > 4"><a @click="speedyclass(item.label)"><i></i><span>{{item.label}}</span></a></th>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
        <v-tags></v-tags>
    </div>
</template>
<style>
    .Carousel{
        width: 1024px;
        height: 500px;
        position: relative;
        margin: 0 auto;
    }
    .Carousel img{
        width: 100%;
        height: 100%;
        min-width: 1024px;
    }
    @keyframes fade-in {
        0% {opacity: 0;}
        40% {opacity: 1;}
        90% {opacity: 1;}
        100% {opacity: 0;}
    }  
    @-webkit-keyframes fade-in {
        0% {opacity: 0;}
        40% {opacity: 1;}
        90% {opacity: 1;}
        100% {opacity: 0;}
    }  
    #wrapper {
        animation: fade-in 5s both infinite;/*动画名称*/  
        -webkit-animation:fade-in 5s both infinite;/*针对webkit内核*/  
    }
    .li-class-image table{
        width: 100%;
    }
    .li-class-title{
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
    .li-class-title span{
        font-size: 25px;
        color: #8fe687;
    }
    .li-first-line th i,.li-tasks th i{
        display: block;
        width: 90px;
        height: 90px;
        background-image: url(../assets/icon.png);
        background-repeat: no-repeat;
        margin: 0 auto;
    }
    .li-first-line th:nth-child(1) i{
        background-position: -340px -20px;
    }
    .li-first-line th:nth-child(2) i{
        background-position: -420px -20px;
    }
    .li-first-line th:nth-child(3) i{
        background-position: -500px -20px;
    }
    .li-first-line th:nth-child(4) i{
        background-position: -575px -20px;
    }
    .li-first-line th:nth-child(5) i{
        background-position: -655px -20px;
    }
    
    .li-tasks th:nth-child(1) i{
        background-position: -735px -20px;
    }
    .li-tasks th:nth-child(2) i{
        background-position: -810px -20px;
    }
    .li-tasks th:nth-child(3) i{
        background-position: -890px -20px;
    }
    .li-tasks th:nth-child(4) i{
        background-position: -890px -20px;
    }
    .li-tasks th:nth-child(5) i{
        background-position: -20px -85px;
    }

</style>

<script>

import vTags from './Tags.vue';
export default {
    name: 'app',
    components: {
        'v-tags':vTags
    },
    data(){
        return {
            imgs:{
                '0': require('../assets/carousel1.png'),
                '1': require('../assets/carousel2.jpg'),
                '2': require('../assets/carousel3.png')
            },
            imgstime:0,
            items:[{
                    label: '语文',
                    options: '备注 标签'
                }, 
                {
                    label: '数学',
                    options: '备注 标签'
                }, 
                {
                    label: '英语',
                    options: '备注 标签'
                }, 
                {
                    label: '政治',
                    options: '备注 标签'
                }, 
                {
                    label: '地理',
                    options: '备注 标签'
                }, 
                {
                    label: '历史',
                    options: '备注 标签'
                }, 
                {
                    label: '生物',
                    options: '备注 标签'
                }, 
                {
                    label: '物理',
                    options: '备注 标签'
                }, 
                {
                    label: '化学',
                    options: '备注 标签'
                }, 
                {
                    label: '其他',
                    options: '备注 标签'
                }],
            speedy:{
                '0': '快捷热门入口',
                '1': '快捷热门入口1',
                '2': '快捷热门入口2',
                '3': '快捷热门入口3',
            },
            show: false
        }
    },
    created:function(){
        setInterval(this.Carouseltime,5000);
    },
    methods:{
        Carouseltime:function(){
            this.imgstime++;
            if (this.imgstime > 2) {
                this.imgstime = 0;
            }
        },
        overShow:function(){
            this.show = true
            console.log(this.show)
        },
        outHide:function(){
            this.show = false
            console.log('pp');
        },
        speedyclass(ify){
            localStorage.setItem('classify',ify);
            this.$router.push('/Allcourse');
        },
        speedyinlet(){
            this.$router.push('/Allcourse');
        }
    }
}
</script>
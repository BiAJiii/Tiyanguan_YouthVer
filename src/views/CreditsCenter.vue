<template>
    <div id="shangcheng">
        <van-nav-bar
        left-arrow
        color="#FA5050"
        title="积分商城"
        left-text="返回"
        @click-left="onClickLeft()"
        />
        <van-search placeholder="请输入搜索关键词"  />

        <div id="huodong">
            <span id="title" style="display: block;">热门活动</span>
            <van-image
            style="width: 100%;"
            :src="require('../assets/credits/huodong.png')" />
        </div>
        <div id="tese">
            <span id="title" style="display: block;">特色专区</span>
            <van-grid :border="false" :column-num="3">
                <van-grid-item style="padding: 0;" icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/tese1.png')" />
                </van-grid-item>
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/tese2.png')" />
                </van-grid-item>
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/tese3.png')" />
                </van-grid-item>
            </van-grid>
        </div>
        <div id="jingpin">
            <span id="title" style="display: block;">精品兑换</span>
            <van-grid :border="false" :column-num="2">
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/jingpin1.png')" />
                </van-grid-item>
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/jingpin2.png')" />
                </van-grid-item>
            </van-grid>
            <van-grid :border="false" :column-num="2">
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/jingpin3.png')" />
                </van-grid-item>
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/jingpin4.png')" />
                </van-grid-item>
            </van-grid>
            <van-grid :border="false" :column-num="2">
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/jingpin5.png')" />
                </van-grid-item>
                <van-grid-item  icon="photo-o" text="文字" >
                    <van-image
                    style="width: 100%;"
                    :src="require('../assets/credits/jingpin6.png')" />
                </van-grid-item>
            </van-grid>
        </div>
    </div>
 </template>
 
 <script>
 export default {
     name: 'CreditsCenter',
     props: {
         msg: String
     },
     data() {
         return {

         }
     },
     methods:{
        onClickLeft() {
            this.$router.back()
        },
        
     },

 }
 </script>
 
 <style scoped lang="less">

    #title{
        
        margin-left: 10px;
    }
    #shangcheng {
        background-color: #fff;
    }
    #huodong {
        font-size: 16px;
        font-weight: bold;
    }
    #tese {
        font-size: 16px;
        font-weight: bold;
    }
    #jingpin{
        font-size: 16px;
        font-weight: bold;
    }
 </style>
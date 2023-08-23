<template>
    <div>
        <van-nav-bar
        left-arrow
        color="#FA5050"
        title="分享中心"
        left-text="返回"
        @click-left="onClickLeft"
        />
        <div>
            <van-cell-group 
            v-for="(item,index) in list"
            :key="index"
            inset>
                <van-cell id="title" :title="item.title"/>
                <van-cell id="cont">
                <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <van-field
                        v-model="item.content"
                        rows="2"
                        autosize
                        type="textarea"
                        readonly
                        />
                    </template>
                        
                </van-cell>
                <!-- <van-cell>
                    <template #title>
                    </template>
                    <template #label>
                        <div id="tags">
                            <span>标签：</span>                     
                            <van-tag
                            v-for="(i,index) in item.tags"
                            :key="index"
                            plain size="large" color="#FA5050" >{{ i }}</van-tag> 
                        </div>

                    </template>

                </van-cell> -->

                
            </van-cell-group>
        </div>
    </div>
 </template>
 
 <script>
 import {getShareCenter, searchTags} from '../api/index'
 export default {
     name: 'ReviewsCenter',
     props: {
         msg: String
     },
     data() {
         return {
            list:[],
            param:{
                "feedbackId": '', 
                "userId": '' 
            },
            value1: 0,
            option1: [
                { text: '全部标签', value: 0 },
                { text: '兼容问题', value: 1 },
                { text: '性能过慢', value: 2 },
                { text: '产品建议', value: 3 },
                { text: '用户体验', value: 4 },
                { text: '其他', value: 5 },
            ],
            tagsParam:{
                "userId": '', 
                "tag": "" 
            }
         }
     },
     methods:{
        onClickLeft() {
            this.$router.back()
        },
        getTag(val) {
            if(this.option1[val].text == '全部标签'){
                
                return
            }

            this.tagsParam.tag = this.option1[val].text
            this.tagsParam.userId = this.$store.state.id.userId
            console.log(this.tagsParam)
            searchTags(this.tagsParam).then((res => {
                this.list = res.data.data.data
                console.log(this.list)
            })).catch(res => {
                this.$toast(res.data)
            })
        }
     },
     mounted(){
        getShareCenter().then(({data}) => {
            console.log(data.data.data)
            this.list = data.data.data
        })
     },  
 
 }
 </script>
 
 <style scoped lang="less">
    /deep/ .van-cell-group{
        margin-top: 25px;
    }
    
    /deep/ .van-cell-group{
        margin-left:15px;
        margin-right:15px;
    }


    #likeNumber{
        line-height: 16px;
        font-size: 12px;
        text-align: center;
    }

    /deep/ .van-dropdown-menu__bar{
    height: 30px;
   }
   /deep/ .van-dropdown-menu__title{
    font-size: 14px;
    }
   /deep/ .van-dropdown-menu__item{
    justify-content:left;
    padding-left: 15px
    }

    /deep/ .van-tag--large{
        margin-right: 4px;
    }

    #title {
        font-size: 20px;
    }

    #cont { 

        /deep/ .van-cell__value{
            font-size: 15px;

        }
    }
 </style>
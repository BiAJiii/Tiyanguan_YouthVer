<template>
    <div>
        <van-nav-bar
        left-arrow
        color="#FA5050"
        title="留言中心"
        left-text="返回"
        @click-left="onClickLeft"
        />
        <div>
        <van-dropdown-menu style="background-color: #fff;">
            <van-dropdown-item v-model="value1" :options="option1" @change="getTag(value1)"/>
        </van-dropdown-menu>
            <van-cell-group 
            v-for="(item,index) in list"
            :key="index"
            inset>
                <van-cell :title="item.title" :value="`用户${item.creator}`" />
                <van-cell>
                <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <van-rate v-model="item.score" readonly/>
                    </template>
                    <template #label>
                        <van-field
                        v-model="item.feedbackContent"
                        rows="2"
                        autosize
                        type="textarea"
                        readonly
                        />
                    </template>
                    <template #right-icon>
                        <div :id="`likebutton${index}`" :style="{color:(item.isLike == false?'#000':'#FA5050')}">
                            <van-icon @click="likeButton(item.id,item.isLike,index)" name="good-job-o" size="0.6rem" />
                            <div id="likeNumber">{{item.likesCount}}</div>
                        </div>
                    </template>
                </van-cell>
                <van-cell>
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

                </van-cell>

                <van-cell>
                <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        开发人员
                    </template>
                    <template #label>
                        <van-field
                        v-model="item.developFeedbackContent"
                        rows="3"
                        autosize
                        type="textarea"
                        readonly
                        />
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
 </template>
 
 <script>
 import {getReviewList, likeIt, searchTags} from '../api/index'
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
        likeButton(data,param1,index) {
            this.param.userId = this.$store.state.id.userId
            let likeButton = ''
            // let buttonid = 'likebutton' + index
            likeButton = document.getElementById('likebutton' + index)
            this.param.feedbackId = data
            console.log(likeButton)
            if(param1){
                //已经点过赞了，取消
                likeButton.style.color = '#000'
                this.list[index].isLike = !this.list[index].isLike
                this.list[index].likesCount--
                
            } else {
                //还没点过，点赞
                
                likeButton.style.color = '#FA5050'
                this.list[index].isLike = !this.list[index].isLike
                this.list[index].likesCount++

            }

            likeIt(this.param).then(res => {
                this.$toast(res.data.message)
                // this.list[index].likesCount++
            })
            
        },
        getTag(val) {
            if(this.option1[val].text == '全部标签'){
                getReviewList(this.$store.state.id.userId).then(({data}) => {
                    console.log(data.data.feedbackListVO)
                    this.list = data.data.feedbackListVO
                })
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
        getReviewList(this.$store.state.id.userId).then(({data}) => {
            console.log(data.data.feedbackListVO)
            this.list = data.data.feedbackListVO
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
 </style>
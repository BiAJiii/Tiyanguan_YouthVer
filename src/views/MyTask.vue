<template>
    <div>
        <div id="top">
            <van-nav-bar
            title="我的任务"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
            <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
        </div>
        <van-tabs v-model="activeName"  @click="hintdone()">
            <van-tab title="进行中" name="0">
                <van-card
                v-for="(item,index) in inglist"
                :key = "index"
                :title= "`${item.taskName}`"
                :centered="true"
                @click="show = true;getThis(item)"
                :thumb="require(`../assets/task/task${formNumber[index]}.png`)"
                >   
                
                    <template #desc>
                        <div id="desc">
                            <van-icon name="balance-o" color="#eacd76" /> 积分：{{item.credits}}  | <van-icon name="star-o"  color="#2E6CC6"/> {{ item.type === 0? 'BUG探索':'问卷调查'}}
                        </div>
                    </template>
                    <template #tags>
                        <span>剩余时间：</span>
                        <!-- <van-tag plain type="danger">剩余时间：<van-count-down :time="timeGroup[item.taskId]" format="DD 天 HH 时 mm 分 ss 秒" /></van-tag> -->
                        <van-count-down :time="timeGroup[item.taskId]">
                            <template #default="timeData">
                                <span class="block">{{ timeData.days }}</span>
                                <span class="colon">:</span>
                                <span class="block">{{ timeData.hours }}</span>
                                <span class="colon">:</span>
                                <span class="block">{{ timeData.minutes }}</span>
                                <span class="colon">:</span>
                                <span class="block">{{ timeData.seconds }}</span>
                            </template>
                        </van-count-down>
                    </template>
                    <template #footer>
                        <van-button size="mini" color="#FA5050" type="primary" @click="show = true;toFeedback(item.type,item.taskId,item.id,item.userId)">开始任务</van-button>
                    </template>
                </van-card>.
            </van-tab>
            <van-tab title="已完成" name="1">
                <van-card
                v-for="(item,index) in donelist"
                :key = "index"
                :title= "`${item.taskName}`"
                :centered="true"
                :thumb="require(`../assets/task/task${formNumber[index]}.png`)">
                <template #desc>
                        <div id="desc">
                            <van-icon name="balance-o" color="#eacd76" /> 积分：{{item.credits}}  | <van-icon name="star-o"  color="#2E6CC6"/> {{ item.type === 0? 'BUG探索':'问卷调查'}}
                        </div>
                </template>
                <template #tags>
                    <van-tag id="time" plain type="danger">任务已结束</van-tag>
                </template>
                <template #footer>
                    <van-button size="mini" color="#FA5050" type="primary" @click="toResult(item.type,item.taskId,item.id)">查看结果</van-button>
                </template>
                </van-card>
            </van-tab>
        </van-tabs>
        <div id="hint" v-if="isShow" @click="toTaskList">
            <van-divider>
            点我领取新的任务~
            </van-divider>
        </div>

    </div>
</template>

<script>
import {orderTaskApi} from '../api/index'
export default {
    name: 'MyTask',
    props: {
        msg: String
    },
    data(){
        return {
            isShow:false,
            value1: 0,
            option1: [
                { text: '默认时间排序', value: 0 },
                { text: '积分升序排序', value: 1 },
                { text: '难度降序排序', value: 2 },
            ],
            formNumber:[],

            value:'',
            activeName:'',
            list: [],
            inglist: [],
            donelist: [],
            //倒计时
            timeGroup:{}
        }
    },
    methods:{
        //已完成页面动态渲染hint标签
        hintdone(){
            console.log(this.activeName)
            if(this.activeName == 0){
                this.inglist.length == 0 ? (this.isShow = true): (this.isShow = false)
                console.log(this.isShow)
            }
            if(this.activeName == 1 ){
                this.donelist.length == 0 ? (this.isShow = true): (this.isShow = false)
                console.log(this.isShow)

            }
        },

        //前往反馈页面，通过type判断
        toFeedback(type, val, val2, val3){
            this.$store.commit('todoId_submit', val)
            this.$store.commit('quesFeedbackId_submit',val2)
            this.$store.commit('userId_submit',val3)
            type === 0 ? this.$router.push({name:'feedback'}) : this.$router.push({name:'questionfeedback'})
        },
        toTaskList(){
            this.$router.push({name: 'tasklist'})
        },
        
        toResult(type, val, val1){
            this.$store.commit('checkId_submit', val)
            this.$store.commit('formId_submit', val1)
            type === 0 ? this.$router.push({name:'formresult'}) : this.$router.push({name:'questionresult'})
        },
        onClickLeft() {
            this.$router.back()
        },
        onSearch(val){
            console.log(val)
            // console.log(this.list[0].taskName)
            let a = this.list.filter(item => item.taskName.indexOf(val) > -1)
            console.log(a.length)
            if(!a.length){
                this.$toast.fail('未搜索到该任务')
                return
            }
            this.inglist = []
            this.donelist = []
            a.forEach(item => {
                if(item.status == 0){
                    this.activeName = '0'
                    this.inglist.push(item)
                } else if(item.status == 1){
                    this.activeName = '1'
                    this.donelist.push(item)
                }
            })
        }
    },
    mounted() {
        
        orderTaskApi(this.$store.state.id.userId).then(res => {
            console.log(res.data.data.taskOrderList)
            if(res.data.data.taskOrderList){
                this.list = res.data.data.taskOrderList
                //判断用户任务中的任务的状态码，导入到不同的队伍中
                res.data.data.taskOrderList.forEach(item => {
                    item.status == 0 ? this.inglist.push(item) : this.donelist.push(item)
                })
                this.list.forEach(item => {
                    item
                    this.formNumber.push(Math.ceil(4*Math.random()))
                })
                console.log(this.inglist)
                if(this.inglist.length == 0){
                    this.isShow = 'true'
                }
                console.log(this.inglist.length)
            } else {
                this.isShow = 'true'
            }
            
        })
        


        //添加事件戳
        const now = new Date()
        const nowTimestamp = now.getTime()
        let timeStamp_obj = JSON.parse(localStorage.getItem('stamp'))
        //字符串要变回时间
        let tempObj = {}
        for(let key in timeStamp_obj){
            let temp = key
            //时间字符串转回时间对象
            let a = new Date(timeStamp_obj[key])
            //计算时间戳
            tempObj[temp] = a - nowTimestamp
        }
        this.timeGroup = {...tempObj}
        // console.log(this.timeGroup)


    }
}
</script>

<style scoped lang="less">
   #UserTop {
    padding-top: 50px;
    line-height: 50px;
    background-color: #F4F4F4;
   }
   /deep/ .van-card{
        margin-top: 5px;
   }
   /deep/ .van-card__title {
      font-size: 18px;
      line-height: 32px;
    }
    /deep/ .van-card {
        line-height: 30px;
        font-size: 13px;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 25px;
        background-color:#FFFFFF;
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

    /deep/ .van-button--mini{
        height: 26px;
        font-size: 13px;
    }

    /deep/ .van-tag {
      height: 22px;
      font-size: 12px;
    }

    /deep/ .van-nav-bar__title{
        font-size: 16px;
    }

    #top {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    /deep/ .van-image__img{
      width: 90%;
      height: 90%;
    }

    
    /deep/ .van-icon{
      font-size: 26px;
    }

    #desc {
      font-size: 16px;
    }

    .colon {
        display: inline-block;
        margin: 0 4px;
        color: #E13133
    }
    .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        background-color: #E13133
    }
    /deep/ .van-count-down{
        display: inline;
        margin-top: 5px;
    }
    #hint{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .van-divider{
            font-size: 16px;
            width: 100%;
        }
    }
    #time {
        margin-top: 5px;
    }
</style>
    
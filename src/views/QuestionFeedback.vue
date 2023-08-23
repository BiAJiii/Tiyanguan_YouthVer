<template>
    <div>
        <van-nav-bar
        left-arrow
        color="#FA5050"
        :title="list.name"
        left-text="返回"
        @click-left="onClickLeft"
        />
        <!-- 折叠面板 -->
        
        <van-collapse v-model="activeNames">
            <van-collapse-item 
            v-for="(item,index) in list.questionDtoList"
            :key="index"
            :title="`${item.name}`"
            :name="index + 1 + ''">
                <van-radio-group
                v-for="i in item.optionsList"
                :key="i.name"
                v-model="radioGroup[item.id - 1]">
                    <van-cell-group>
                        <van-cell :title="`${i.name}`" clickable @click="radio = `${i.id}`;">
                            <template #right-icon>
                                <van-radio :name="`${i.id}`" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-collapse-item>
        </van-collapse>
        <div id="commit">
            <van-button color="#FA5050" round block type="info" native-type="submit" @click="submitQuesFeedback()">提交问卷</van-button>
        </div>
    </div>
    
</template>

<script>
import { getQuestionList, submitQuestionFeekback} from '../api/index'
export default {
    name: 'FeedBack',
    props: {
        msg: String
    },
    data(){
        return {
            list: [],
            activeNames:[],
            radio:[],
            radioGroup:[],
            QuesFeedback:{
                orderId:'',
                answerSurvey:'',
                answerQuestions:[

                ],
                chosenOptions:[

                ]
            },
            form:{
                            //单选框
                
            },
        }
    },
    methods:{
        submitQuesFeedback() {
            this.QuesFeedback.chosenOptions = this.radioGroup.map(item => parseInt(item))
            if(this.QuesFeedback.chosenOptions.length < this.list.questionDtoList.length ){
                this.$toast('请完成任务勾选！')
                this.QuesFeedback.chosenOptions = []
                return
            }
            this.QuesFeedback.answerSurvey = this.list.id
            this.list.questionDtoList.forEach(item => {
                this.QuesFeedback.answerQuestions.push(item.id)
            });
            //选项赋值
            this.QuesFeedback.orderId = this.$store.state.id.quesFeedbackId
            console.log(this.QuesFeedback)
            // setTimeout(() => {
            //     this.$router.push({name: 'mytask'})
            // }, 1500);
            
            submitQuestionFeekback(this.QuesFeedback).then(({data}) => {
                this.$toast(data.message)
                this.$router.push({name: 'mytask'})

            })
            // this.$toast('提交成功！')
            
        },
        onClickLeft() {
            this.$router.back()
        },
        onClickRight() {
            console.log(this.list.questionDtoList)
        }
    },
    mounted() {
        getQuestionList(this.$store.state.id.todoId).then(res => {
            this.list = res.data.data.data
            this.activeNames = []
            console.log(this.list)
            for(let i = 0; i < this.list.questionDtoList.length; i++){
                this.activeNames.push(i + 1 + '')
            }
            console.log(this.activeNames)
        })
    }
}
</script>

<style scoped>

.van-cell{
    line-height: 0.3rem;
}
.van-nav-bar__text{
    color: #FA5050
}
#commit{
    margin-top: 20px;
}
</style>
    
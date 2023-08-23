<template>
    <div>
        <van-nav-bar
        left-arrow
        color="#FA5050"
        title="任务反馈"
        left-text="返回"
        @click-left="onClickLeft"
        />
        <van-field label="缺陷名称" :value="list.name" readonly />

        <!-- <van-field name="radio1" label="缺陷状态">
            <template #input>
                <van-radio-group v-model="list.status" direction="horizontal" checked-color="#FA5050" disabled>
                    <van-radio name="0">未受理</van-radio>
                    <van-radio name="1">处理中</van-radio>
                    <van-radio name="2">已处理</van-radio>
                </van-radio-group>
            </template>
        </van-field> -->
        <van-field name="radio" label="缺陷类型">
            <template #input>
                <van-radio-group v-model="list.type" direction="horizontal" checked-color="#FA5050" disabled>
                    <van-radio name="0">功能建议</van-radio>
                    <van-radio name="1">数据错误</van-radio>
                    <van-radio name="2">系统错误</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field name="radio" label="出现频率">
        <template #input>
            <van-radio-group v-model="list.frequency" direction="horizontal" checked-color="#FA5050" disabled>
                <van-radio name="0">偶尔</van-radio>
                <van-radio name="1">经常</van-radio>
                <van-radio name="2">一直</van-radio>
            </van-radio-group>
        </template>
        </van-field>
        <van-field type="textarea" label="操作步骤" :value="list.process" readonly />
        <van-field type="textarea" label="预期结果" :value="list.expectedResult" readonly />
        <van-field type="textarea" label="实际结果" :value="list.actualResult" readonly />
        <van-field name="uploader" label="附件">
            <template #input>
                <van-uploader v-model="fileList" disabled :deletable="false" />
            </template>
        </van-field>
    </div>
</template>

<script>
import { getFormResult } from '../api/index'
export default {
    name: 'FeedBack',
    props: {
        msg: String
    },
    data(){
        return {
            list: {},
            fileList: [

            ]
        }
    },
    methods:{
        submitFeedback() {
            console.log(this.form)
        },
        onClickLeft() {
            this.$router.back()
        },
        
    },
    mounted() {
        console.log(this.$store.state.id.formId)
        getFormResult(this.$store.state.id.formId).then(({data}) =>{
            // console.log(data.data.tbBugDetailVO)
            this.list = data.data.tbBugDetailVO
            console.log(this.list)
            this.list.status = this.list.status + ''
            this.list.frequency = this.list.frequency + ''
            this.list.type = this.list.type + ''
        
            this.list.tbBugAttachListVO.forEach(item => {
                this.fileList.push({url:item.imageUrl})
            })
        })
    }
}
</script>

<style scoped lang="less">

.van-cell{
    line-height:30px;
}
.van-nav-bar__text{
    color: #FA5050
}

/deep/ .van-cell__title{
    font-size: 16px;
}

/deep/ .van-cell{
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>
    
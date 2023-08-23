<template>
    <div>
        <van-nav-bar
        left-arrow
        color="#FA5050"
        title="任务反馈"
        left-text="返回"
        right-text="重置表单"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <van-field
            v-model="form.name"
            name="缺陷名称"
            label="缺陷名称"
            placeholder="缺陷名称"
            :rules="[{ required: true, message: '请填写缺陷名称' }]"
        />
        <!-- <van-field name="radio" label="缺陷状态">
            <template #input>
                <van-radio-group v-model="form.status" direction="horizontal" checked-color="#FA5050">
                    <van-radio name="0">未受理</van-radio>
                    <van-radio name="1">处理中</van-radio>
                    <van-radio name="2">已处理</van-radio>
                </van-radio-group>
            </template>
        </van-field> -->
        <van-field name="radio" label="缺陷类型">
            <template #input>
                <van-radio-group v-model="form.type" direction="horizontal" checked-color="#FA5050">
                    <van-radio name="0">功能建议</van-radio>
                    <van-radio name="1">数据错误</van-radio>
                    <van-radio name="2">系统错误</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field name="radio" label="出现频率">
            <template #input>
                <van-radio-group v-model="form.frequency" direction="horizontal" checked-color="#FA5050">
                    <van-radio name="0">偶尔</van-radio>
                    <van-radio name="1">经常</van-radio>
                    <van-radio name="2">一直</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field
            type="textarea"
            autosize
            v-model="form.process"
            name="操作步骤"
            label="操作步骤"
            :rules="[{ required: true, message: '请写入操作步骤' }]"
        />
        <van-field
            type="textarea"
            autosize
            v-model="form.actualResult"
            name="预期结果"
            label="预期结果"
            :rules="[{ required: true, message: '请写入预期结果' }]"
        />
        <van-field
            type="textarea"
            autosize
            v-model="form.expectedResult"
            name="实际结果"
            label="实际结果"
            :rules="[{ required: true, message: '请写入实际结果' }]"
        />
        <van-field name="uploader" label="附件">
            <template #input>
                <van-uploader v-model="form.uploader" :after-read="afterRead"  :max-size="5000 * 1024" @oversize="onOversize"/>
            </template>
        </van-field>
        <!-- <van-field name="rate" label="评分">
            <template #input>
                <van-rate v-model="form.rate" />
            </template>
        </van-field> -->
        <div style="margin: 16px;">
            <van-button color="#FA5050" round block type="info" native-type="submit" @click="submitFeedback()">提交反馈</van-button>
        </div>
    </div>
</template>

<script>
import { submitFormFeekback ,uploadImgs} from '../api/index'
export default {
    name: 'FeedBack',
    props: {
        msg: String
    },
    data(){
        return {
            list: [],
            form:{
                            //单选框
                //userid
                creator: '',
                //id
                orderId:'',
                //taskid
                taskId:'',
                type: '',
                // status:'',
                frequency:'',
                //文件上传
                uploader: [],
                //评分
                // rate:5,
            
                //输入框
                name:'',
                process:'',
                actualResult:'',
                expectedResult:'',
                tbBugAttachList:[

                ]

            },
        }
    },
    methods:{
        submitFeedback() {
            if(this.form.name==''|| this.form.frequencye=='' || this.form.process=='' || this.form.actualResult=='' || this.form.expectedResult=='' || this.form.type==''){
                this.$toast('请完成表单填写！')
                return
            }

            this.form.taskId = this.$store.state.id.todoId
            this.form.orderId = this.$store.state.id.quesFeedbackId
            this.form.creator = this.$store.state.id.userId
            this.form.type = parseInt(this.form.type)
            // this.form.status = parseInt(this.form.status)
            this.form.frequency = parseInt(this.form.frequency)
            console.log(this.form)
            submitFormFeekback(this.form).then(res => {
                console.log(res.data)
                this.$toast(res.data.message)
                this.$router.push({name: 'mytask'})
            })

        },
        onClickLeft() {
            this.$router.back()
        },
        onClickRight() {
            this.form = {
                //单选框
                type: '',
                status:'',
                frequency:'',
                //文件上传
                uploader: [],
                //评分
                // rate:5,
                //输入框
                name:'',
                process:'',
                actualResult:'',
                expectedResult:'',

            }
        },
        afterRead(file) {
        // 此时可以自行将文件上传至服务器
            console.log('上传')
            
            console.log(file.content);
            uploadImgs({imgBase64: file.content.substring(file.content.indexOf(','),file.content.length)}).then(res => {
                console.log(res)
                this.form.tbBugAttachList.push({imageUrl : res.data.data.url})
                console.log(this.form.tbBugAttachList)
            })
        },
        onOversize(file) {
            console.log(file);
            this.$toast.fail('文件大小不能超过 5Mb');
        },
    },
    mounted() {
        
    }
}
</script>

<style scoped>

.van-cell{
    line-height: 30px;
}
.van-nav-bar__text{
    color: #FA5050
}
</style>
    
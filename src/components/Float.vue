<template>
    <div>
        <div class="floatBtn"
        :class="[{moveBtn: longClick}, `${btnType}Btn`]"
        @touchstart.stop ="touchstart($event)"
        @touchmove.stop ="touchMove($event)"
        @touchend.stop ="touchEnd($event)"
        @click="showPopup"
        >
            <van-icon style="padding-bottom: 5px;" size="25" name="records" />
            <span>反馈</span>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '80%' }"   closeable close-icon="close">
            <van-row id="title" type="flex" justify="space-between" align-items="center">
                <van-col span="2"></van-col>
                <van-col span="8">吐槽一下~</van-col>
                <van-col span="2"></van-col>
            </van-row>
            
            <div id="notice" @click="toTaskList()" >
                <van-notice-bar
                left-icon="volume-o"
                text="快来加入我们~成为青春体验官！！"
                />
                <van-image id="recommand_img" :src="require('../assets/zhaomu.png')" />
            </div>
            <van-cell-group>
                <van-field v-model="review.title"   placeholder="请输入标题" label="标题" />
                <van-field v-model="text" label="标签" type="textarea">
                    <template #input>
                        <van-row style="margin-bottom: 10px;">
                            <van-col span="8"
                                v-for="(item, index) in list"
                                :key="item.name"
                                @click="tagsCilck($event,item,index)"
                            >
                                <van-tag :id="index" plain size="large" color="#FA5050">{{ item.name }}</van-tag> 
                            </van-col>
                            <!-- <van-col span="8"><van-tag ref="xingneng" plain size="large" color="#FA5050">性能过慢</van-tag> </van-col>
                            <van-col span="8"><van-tag ref="chanpin" plain size="large" color="#FA5050">产品建议</van-tag> </van-col>
                            <van-col span="8"><van-tag ref="yonghu" plain size="large" color="#FA5050">用户体验</van-tag> </van-col>
                            <van-col span="8"><van-tag ref="qita" plain size="large" color="#FA5050">其他</van-tag> </van-col> -->
                        </van-row>
                    </template>
                </van-field>

                <van-field
                id="text"
                v-model="review.feedbackContent"
                rows="6"
                autosize
                label="留言"
                type="textarea"
                />
            </van-cell-group>
            <van-field name="rate" label="评分">
                <template #input>
                    <van-rate v-model="review.rate" />
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button color="#FA5050" block type="info" native-type="submit" @click="submitReview()">提交</van-button>
            </div>

          
        </van-popup>
    </div>
</template>

<script>
import {submitReview} from '../api/index'
export default {
    name: 'FloatVue',
    data() {
        return {
            timeOutEvent: 0,
            longClick: 0,
            // 手指原始位置
            oldMousePos: {},
            // 元素原始位置
            oldNodePos: {},
            btnType: 'right',
            //弹出窗
            show: false,
            value:5,
            review: {
                title:'',
                feedbackContent:'',
                score:5,
                creator:'',
                developFeedbackContent:'',
                tags:[]
            },
            list: [
                {
                    name: '兼容问题',
                    isChoosen: false
                },
                {
                    name: '性能过慢',
                    isChoosen: false
                },
                {
                    name: '产品建议',
                    isChoosen: false
                },
                {
                    name: '用户体验',
                    isChoosen: false
                },
                {
                    name: '其他',
                    isChoosen: false
                }
            ],
            tagsList: []
        };
    },
    methods:{
    tagsCilck(e,item,index) {
        
        let obj = document.getElementById(index)
        console.log(obj.innerText)
        if(!item.isChoosen){
           //没有选择
            obj.style.backgroundColor = '#FA5050'
            obj.style.color = '#FFFFFF'
            this.list[index].isChoosen = true
        } else {
            //选过了
            obj.style.backgroundColor = '#fff'
            obj.style.color = '#FA5050'
            this.list[index].isChoosen = false
        }
    },
    toTaskList(){
        this.show = false
        this.$router.push({name: 'home'}, ()=>{}, ()=>{})
    },
    showPopup() {
        this.show = true;
    },
    submitReview() {
        this.review.creator = this.$store.state.id.userId
        console.log(this.review)
        if(this.review.title == '' || this.review.feedbackContent == ''){
            this.$toast('请先完成反馈~')
            return
        }
        //提交的tag列表
        let List = this.list.filter(item => {
            return item.isChoosen == true
        })
        List.forEach(item => {
            this.tagsList.push(item.name)
        })
        this.review.tags = this.tagsList
        console.log(this.review)
        //差个POST请求
        submitReview(this.review).then(res => {
            console.log(res)
            this.$toast.success('提交成功！')
        })
        this.show = false
    },
    touchstart(ev) {
        // 定时器控制长按时间，超过500毫秒开始进行拖拽
        document.body.style.overflow = 'hidden'

        this.timeOutEvent = setTimeout(() => {
            this.longClick = 1;
        }, 50);
        const selectDom = ev.currentTarget;
        const { pageX, pageY } = ev.touches[0]; // 手指位置
        const { offsetLeft, offsetTop } = selectDom; // 元素位置
        // 手指原始位置
        this.oldMousePos = {
            x: pageX,
            y: pageY
        };
        // 元素原始位置
        this.oldNodePos = {
            x: offsetLeft,
            y: offsetTop
        };
        selectDom.style.left = `${offsetLeft}px`;
        selectDom.style.top = `${offsetTop}px`;
    },
    touchMove(ev) {
        // 未达到500毫秒就移动则不触发长按，清空定时器
        clearTimeout(this.timeOutEvent);
        if (this.longClick === 1) {
            const selectDom = ev.currentTarget;
            // x轴偏移量
            const lefts = this.oldMousePos.x - this.oldNodePos.x;
            // y轴偏移量
            const tops = this.oldMousePos.y - this.oldNodePos.y;
            const { pageX, pageY } = ev.touches[0]; // 手指位置
            selectDom.style.left = `${pageX - lefts}px`;
            selectDom.style.top = `${pageY - tops}px`;
        }
    },
    touchEnd(ev) {
        document.body.style.overflow = 'auto'
        // 清空定时器
        clearTimeout(this.timeOutEvent);
        if (this.longClick === 1) {
            this.longClick = 0;
            const selectDom = ev.currentTarget;
            const {clientWidth, clientHeight} = document.body;
            const {offsetLeft, offsetTop} = selectDom;
            selectDom.style.left = 
                (offsetLeft + 50) > (clientWidth / 2) ? 
                'calc(100% - 75px)' : '-5px';
            if (offsetTop < 90) {
                selectDom.style.top = '90px';
            } else if (offsetTop + 36 > clientHeight) {
                selectDom.style.top = `${clientHeight - 36}px`;
            }
            this.btnType = 
                (offsetLeft + 50) > (clientWidth / 2) ? 
                'right' : 'left';
        }
    },
    }
    
};
</script>

<style lang="scss" scoped>
  @mixin notSelect{
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
  }
  @mixin not-touch {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .floatBtn {
    @include notSelect;
    @include not-touch();
    position: fixed;
    z-index: 1;
    overflow: hidden;
    width: 70px;
    left: calc(100% - 70px);
    top: calc(100% - 150px);
    color: #fff;
    background: linear-gradient(#FC7878,#FC5D5D);
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    box-sizing: border-box; 
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    &.rightBtn {
      border-radius: 20px 0 0 20px;
    }
    &.leftBtn {
      border-radius: 0 20px 20px 0;
    }
    &.moveBtn {
      border-radius: 20px;
    }
  }

  #title {
    line-height: 40px;
    font-size: 18px;
    text-align: center;
  }


  #text {
    height: 300px;
  }

  .van-tag--large{
    padding: 2px 8px;
  }
  
  .van-button{
    font-size: 18px;
    border-radius: 6px;

  }



  .van-cell{
    font-size: 16px;
    }

  .van-cell__title .van-field__label{
    min-width: 30px;
    }


</style>

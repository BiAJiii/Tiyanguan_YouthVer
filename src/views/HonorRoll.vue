<template>
    <div>
        <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-divider
        contentPosition="center"
        style="color: #FA5050; border-color: #FA5050; font-size: 20px; font-weight: bolder;"
        >TOP 10</van-divider>
        
            <div ref="top" id="top1"></div>
                <van-cell-group inset>
                    <van-cell title="用户" value="积分" />
                    <van-cell id="top" :value="list[0].credits"> 
                        <template #title>
                            <van-icon class="iconfont" class-prefix="icon" name="jinpai" />
                            <span class="custom-title" style="color: #f8c276;">{{ list[0].userName }}</span>
                        </template>
                    </van-cell>
                    <van-cell id="top" :value="list[1].credits"> 
                        <template #title>
                            <van-icon class="iconfont" class-prefix="icon" name="yinpai" />
                            <span class="custom-title" style="color: #D5CDC3;">{{ list[1].userName }}</span>
                        </template>
                    </van-cell>
                    <van-cell id="top" :value="list[2].credits"> 
                        <template #title>
                            <van-icon class="iconfont" class-prefix="icon" name="tongpai" />
                            <span class="custom-title" style="color: #8f5f1d;">{{ list[2].userName }}</span>
                        </template>
                    </van-cell>

                    <van-cell :title="list[3].userName" :value="list[3].credits" />
                    <van-cell :title="list[4].userName" :value="list[4].credits" />
                    <van-cell :title="list[5].userName" :value="list[5].credits" />
                    <van-cell :title="list[6].userName" :value="list[6].credits" />
                    <van-cell :title="list[7].userName" :value="list[7].credits" />
                    <van-cell :title="list[8].userName" :value="list[8].credits" />
                    <van-cell :title="list[9].userName" :value="list[9].credits" />
        

                </van-cell-group>
        <div ref="bottom1" id="bottom1"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { getRoll } from '../api/index'

export default {
    name: 'HonorRoll',
    props: {
        msg: String
    },
    data(){
        return {
            list: [],
        }
    },
    methods:{
       
        onClickLeft() {
            this.$router.back()
        },
        init() {
            this.$nextTick(() => {
                this.drawBottom()
                this.drawTop() 
            })
        },
        drawTop() {

            var chartDom = this.$refs.top
            var myChart1 = echarts.init(chartDom);
            var option1;

            option1 = {
            graphic: {
                elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                    text: '积分荣誉榜',
                    fontSize: 30,
                    fontWeight: 'bold',
                    lineDash: [0, 200],
                    lineDashOffset: 0,
                    fill: 'transparent',
                    stroke: '#FA5050',
                    lineWidth: 1
                    },
                    keyframeAnimation: {
                    duration: 3000,
                    keyframes: [
                        {
                        percent: 0.7,
                        style: {
                            fill: 'transparent',
                            lineDashOffset: 200,
                            lineDash: [200, 0]
                        }
                        },
                        {
                        // Stop for a while.
                        percent: 0.8,
                        style: {
                            fill: 'transparent'
                        }
                        },
                        {
                        percent: 1,
                        style: {
                            fill: '#FA5050'
                        }
                        }
                    ]
                    }
                }
                ]
            }
            };

            option1 && myChart1.setOption(option1);

        },


        drawBottom() {
            var chartDom = this.$refs.bottom1
            var myChart = echarts.init(chartDom);
            var option = {};

            option = {
                graphic: {
                    elements: [
                            {
                                type: 'group',
                                left: 'center',
                                top: 'center',
                                children: new Array(17).fill(0).map((val, i) => ({
                                type: 'rect',
                                x: i * 20,
                                shape: {
                                    x: 0,
                                    y: -40,
                                    width: 10,
                                    height: 80
                                },
                                style: {
                                    fill: '#5470c6'
                                },
                                keyframeAnimation: {
                                    duration: 1000,
                                    delay: i * 200,
                                    loop: true,
                                    keyframes: [
                                    {
                                        percent: 0.5,
                                        scaleY: 0.3,
                                        easing: 'cubicIn'
                                    },
                                    {
                                        percent: 1,
                                        scaleY: 1,
                                        easing: 'cubicOut'
                                    }
                                    ]
                                }
                                }))
                            }
                        ]
                    }
                };
            option && myChart.setOption(option);
        }
    },
    mounted() {
        getRoll().then(({data}) => {
            this.list = data.data.data
            console.log(this.list)
            this.init()
        })

    }
}
</script>

<style lang="less" scoped>

/deep/ .van-cell{
    font-size: 16px;
}
/deep/ .van-icon{
    margin-right: 4px;
} 

#top{
    line-height: 40px;
}

/deep/ .van-tab{
    font-size: 18px;
}

#bottom1{
    height: 130px;
}
#top1 {
    height: 36px;
}
</style>
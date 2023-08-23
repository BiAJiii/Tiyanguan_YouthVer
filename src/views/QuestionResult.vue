<template>
   <div>
    <van-nav-bar
        title="统计展示"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
    <!-- <button @click="test()">调试按钮</button> -->
    <div
    v-for="item in countData"
    :key="item.name"
    >
        <van-cell :value= "`${item.name}`" />
        <div :id="item.sort" style="height: 260px"></div>
    </div>
   </div>
</template>

<script>
import * as echarts from 'echarts';
import { getResult } from '../api/index'
export default {
    name: 'QuestionResult',
    props: {
        msg: String
    },
    data() {
        return {
            countData: [],
            pieData:[],
            totalEcharts : {}
        }
    },
    methods:{
        drawPie(name, item){
            let echarts1 = echarts.init(document.getElementById(name))
            // 指定图表的配置项和数据
            let option = {}
            
            option = {
                tooltip: {
                    trigger: 'item',
                    // show : false
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 'bottom'
                    // left:'left'
                    // top: 'top'
                },
                series: [
                    {
                    // name: 'Access From',
                    type: 'pie',
                    radius: '60%',
                    data: item,
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            };

            echarts1.setOption(option)
        },
        // test(){
        //     // console.log(this.pieData)
        //     this.pieData.forEach((item,index) => {
        //         this.drawPie(index + 1, item)

        //     })
        // },
        // draw(){
        //     this.$nextTick(()=> {
        //         this.pieData.forEach(item => {
        //             console.log(item)
        //             console.log(1)
        //         })
        //     })
        // },
        onClickLeft() {
            this.$router.back()
        },

    },
    mounted(){
        getResult(this.$store.state.id.checkId).then(({data}) => {
            // console.log(data.data.data.questionResultList)
            //图标data赋值
            this.countData = data.data.data.questionResultList
            console.log(this.countData)
            this.pieData = []
            this.countData.forEach(item => {
                let temp = []
                item.optionResultList.forEach(i => {
                    temp.push({value: i.chosenNum, name:i.name})
                })
                this.pieData.push(temp)
            })

            //图标渲染,不使用nexttick会出现invaild dom的报错。
            this.$nextTick(()=> {
                this.pieData.forEach((item,index) => {
                this.drawPie(index + 1, item)
                })
            })
        })
        // console.log(this.$store.state.id.checkId)
    },  

}
</script>

<style scoped>
.van-cell{
    font-size: 16px;
}
   
</style>
    
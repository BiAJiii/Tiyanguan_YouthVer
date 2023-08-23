<template>

<div>
  <div id="search">
    <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
    <van-dropdown-menu style="background-color: #fff;" >
      <van-dropdown-item v-model="value1" :options="option1" @change="getRank(value1)"/>
    </van-dropdown-menu>
  </div>
  <van-tabs v-model="activeName" >
    <van-tab id="questionlist" title="问卷调查" name="0">
      <van-card
      v-for="(item,index) in questionlist"
      :key = "index"
      :title= "`${item.name}`"
      :centered="true"
      @click="show = true;getThis(item)"  
      :thumb="require(`../assets/task/task${formNumber[index]}.png`)"
      >
        <template #desc>
          <div id="desc">
            <van-icon name="balance-o" color="#eacd76" /> 积分：{{item.credits}} | <van-icon name="chart-trending-o" color="#2E6CC6" /> 难度：{{item.level}}
          </div>
        </template>
        <template #tags>
          <van-tag plain type="danger">开始时间:{{ item.createTime }}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini" color="#FA5050" type="primary" @click="show = true;getThis(item)">查看任务</van-button>
        </template>
      </van-card>
    </van-tab>
    <van-tab id="formlist" title="BUG探索" name="1">
      <van-card
      v-for="(item,index) in formlist"
      :key = "index"
      :title= "`${item.name}`"
      :centered="true"
      @click="show = true;getThis(item)"
      :thumb="require(`../assets/task/task${formNumber[index]}.png`)"
      >
        <template #desc>
          <div id="desc">
            <van-icon name="balance-o" color="#eacd76" /> 积分：{{item.credits}} | <van-icon name="chart-trending-o" color="#2E6CC6" /> 难度：{{item.level}}
          </div>
        </template>
        <template #tags>
          <van-tag id="time" plain color="#E13133">开始时间:{{ item.createTime }}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini" color="#FA5050" type="primary" @click="show = true;getThis()">查看任务</van-button>
        </template>
      </van-card>
    </van-tab>
  </van-tabs>
  <van-overlay :show="show" @click="show = false" style="height: 100%;">
    <div class="wrapper" >
      <div class="block"> 
        <van-cell-group>
          <div id="taskTitle">
            <van-cell center size="large" title="任务详情" style="text-align: center;"/>
          </div>
          <div id="taskSubTitle">
            <van-cell size="large" title="任务描述" :value="`${layData.description}`"/>
            <van-cell size="large" title="资格要求" :value="`${layData.qualification}`" />
            <van-cell size="large" title="任务流程" :value="`${layData.process}`" />
          </div>
        </van-cell-group>
        <div id="takeButton">
          <van-button color="#FA5050" :disabled="gottenId.some(value => {return value== layData.id}) == true?true:false"  @click="takeTask(layData.id)">{{gottenId.some(value => {return value== layData.id}) == true?'已领取':'领取任务'  }}</van-button>
        </div>
      </div>
    </div>
  </van-overlay>

</div>
</template>

<script>
import {getData,takeTaskApi} from '../api/index'
export default {
  name: 'TaskList',
  props: {
    msg: String
  },
  data() {
    return {
      isLoading: false,
      gottenId :[],
      value1: 0,
      option1: [
        { text: '默认时间排序', value: 0 },
        { text: '积分降序排序', value: 1 },
        { text: '难度升序排序', value: 2 },
      ],
      //标签页
      activeName: '',
      //搜索栏
      value:'',
      //任务数据
      list:[],
      formlist:[],
      questionlist:[],
      formNumber: [],
      //遮罩层
      show: false,
      takeTaskParam:{
        "taskId": '', 
        "userId": '', 
        "type": '' 
      },
      flag:true,
      layData:{
        id:"",
        description: "", 
        qualification: "", 
        process: "" 
      },
    };
  },
  // onChange:function(e){
  //   console.log(e)
  // },
  methods:{
    //获取对应任务序列,对特定id任务详细进行渲染
    getThis(item) {
      this.layData = item.tbTaskDetail
      
    },
    //排序
    getRank(val){
      if(val == 0){
        getData('list').then(res => {
                this.list = res.data.data.data
                this.questionlist = []
                this.formlist = []
                res.data.data.data.forEach(item => {
                  item.type == 0 ? this.formlist.push(item) : this.questionlist.push(item)
                })
            })
      } else if(val == 1){
        getData('credit').then(res => {
                this.list = res.data.data.data
                this.questionlist = []
                this.formlist = []
                res.data.data.data.forEach(item => {
                  item.type == 0 ? this.formlist.push(item) : this.questionlist.push(item)
                })
            })
      } else if(val == 2){
        getData('level').then(res => {
                this.list = res.data.data.data
                this.questionlist = []
                this.formlist = []
                res.data.data.data.forEach(item => {
                  item.type == 0 ? this.formlist.push(item) : this.questionlist.push(item)
                })
            })
      }
    },

    //领取任务
    takeTask(taskId) {
      // console.log(this.gottenId.some(value => {return value== this.layData.id}))
      // this.gottenId.find(value => {return value== this.layData.id}) == true?console.log(1):console.log(2)
      this.takeTaskParam.userId = this.$store.state.id.userId
      this.takeTaskParam.taskId = taskId
      this.takeTaskParam.type = this.activeName == '0'? 0 : 1
      this.$store.commit('gottenId_take',taskId)
      console.log(this.takeTaskParam)
      takeTaskApi(this.takeTaskParam).then(res => {
        console.log(res.data.code)
        if(res.data.code == -1){
          this.$toast.fail(res.data.message)
          return
        }
        console.log(res)

        //添加领取的时间
        const now = new Date()
        const nowTimestamp = now.getTime()
        const nowTimestamp_7 = new Date(nowTimestamp + 7 * 24 * 60 * 60 * 1000)
      
        // let timeStamp = nowTimestamp_7 - nowTimestamp
        let timeStamp_obj = {

        }
        let id = taskId
        timeStamp_obj[id] = nowTimestamp_7.toString()
        console.log(timeStamp_obj)
        this.$store.commit('timeStamp_add', timeStamp_obj)
        // console.log(timeStamp_obj)
        console.log(this.$store.state.id.timeStamp)
        this.$toast.success(res.data.message)

      }).catch(res => {
        this.$toast.fail(res.data.message)
      })
      setTimeout(() => {
        this.$router.push({name: 'mytask'})
      }, 1000);

    },
    //搜索
    onSearch(val){
      let a = this.list.filter(item => item.name.indexOf(val) > -1)
      if(!a.length){
        this.$toast('未搜索到该任务')
        return
      }
 
      this.questionlist = []
      this.formlist = []
      a.forEach(item => {
        if(item.type == 1){
          this.activeName = '0'
          this.questionlist.push(item)
        } else {
          this.activeName = '1'
          this.formlist.push(item)
        }
      })
    }
  },
  mounted() {
    // console.log(this.$store.state.id.gottenId)
      console.log(this.formNumber)
      this.gottenId =  this.$store.state.id.gottenId
      getData('list').then(res => {
        this.list = res.data.data.data
        console.log(this.list)
        res.data.data.data.forEach(item => {
          item.type == 0 ? this.formlist.push(item) : this.questionlist.push(item)
        })
        this.list.forEach(item => {
          item
          this.formNumber.push(Math.ceil(4*Math.random()))
        })
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 0.4rem 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.1rem;
}
a {
  color: #42b983;
}
/* 遮罩层 */
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    // width: 350px;
    // height: 400px;
    background-color: #fff;
  }

   /deep/.van-cell__value{
    text-align:left;
    margin-right: 0;
    padding-right: 0;
    min-width: 220px;
  }

  // /deep/ .van-cell__value{
  //   padding-right: 0;
  // }
  /deep/ .van-card{
        margin-top: 25px;
        margin-left: 15px;
        margin-right: 15px;
        background-color: #FFFFFF;
   }
   
  /deep/ .van-card__title {
      font-size: 22px;
      line-height: 32px;
    }
  /deep/ .van-card {
    line-height: 30px;
    font-size: 13px;
  }

   #takeButton {
    margin-top: 20px;
    text-align: center;
    /deep/ .van-button {
      font-size: 16px;
    }
   }

   /deep/ .van-cell__value{
    text-align: left;
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
    #taskTitle{
      .van-cell--large .van-cell__title{
        font-size: 22px;
        font-weight: bold;
      }
    }
    #taskSubTitle{

      .van-cell--large .van-cell__title{
        font-size: 20px;
        // font-weight: bold;
      }
      .van-cell__value{
        font-size: 16px;
      }
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

    #search{
      position: sticky;
      top: 0;
      left: 0;
      z-index: 1000;
    }
    #time{
      margin-top: 5px;
    }

    
</style>

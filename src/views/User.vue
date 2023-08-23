<template>
    <div>
        <div id="UserTop">
            <div id="homeTop">
                <van-row type="flex" justify="space-between" align-items="center">
                    <van-col span="4">
                        <div>
                            <van-icon name="location-o" size="20px">
                                <span id="location">广州</span>
                            </van-icon>
                        </div>
                    </van-col>
                    <van-col span="8"></van-col>
                    <van-col span="5">
                        <van-icon name="chat-o" dot size="26px"/> <van-icon id="add" name="add-o" size="26px"/>
                    </van-col>
                </van-row>
            </div>
            
            <van-row type="flex" justify="space-around" align-items="center">
                <van-col span="6">
                    <van-image
                    round
                    width="100"
                    height="100"
                    :src="require('../assets/user/logo.png')"                     
                    style="padding-left: 0.1rem;"
                    />
                </van-col>
                <!-- <van-col span="4"></van-col> -->
                <van-col span="12" id="UserTop_user" style="font-weight: bold;">
                    <div>用户名:{{ username }}</div>
                    <div>ID:{{ id }}</div>
                </van-col>
            </van-row>
        </div>
        <div id="check">
            <van-grid :gutter="5" :border="false" :column-num="2">
                <van-grid-item>
                    <van-cell id="jifen" center title="积分值" :value="`${credits}`" icon="fire" />
                </van-grid-item>
                <van-grid-item @click="signIn">
                    <van-cell  center title="每日签到" label="今日签到 +1" icon="success">
                        <template #right-icon>
                            <van-icon name="calendar-o" class="calendar-icon" size="1.2rem"/>
                        </template>
                    </van-cell>
                </van-grid-item>
            </van-grid>
        </div>

        <van-divider/>
        <div id="UserList">
            <van-row type="flex">
                <van-col span="6"></van-col>
            </van-row>
        </div>

        <van-cell-group id="Guider" >    
            <van-cell title="我的任务" is-link @click="toMyTask()">
                <template #icon>
                    <van-image
                        style="text-align: center;"
                        width="30"
                        height="30"
                        :src="require('../assets/user/renwu.png')" 
                    />
                </template>
            </van-cell>
            <van-cell title="我的收藏" is-link>
                <template #icon>
                    <van-image
                        width="30"
                        height="30"
                        :src="require('../assets/user/shoucang.png')" 
                    />
                </template>
            </van-cell>
            <van-cell title="积分商城" @click="toCreditsCenter" is-link>
                <template #icon>
                    <van-image
                        width="30"
                        height="30"
                        :src="require('../assets/user/jifen.png')" 
                    />
                </template>
            </van-cell>
            <van-cell title="帮助文档" @click = "toShare()" is-link>
                <template #icon>
                    <van-image
                        width="30"
                        height="30"
                        :src="require('../assets/user/fenxiang.png')" 
                    />
                </template>
            </van-cell>
            <van-cell title="设置" is-link>
                <template #icon>
                    <van-image
                        width="30"
                        height="30"
                        :src="require('../assets/user/shezhi.png')" 
                    />
                </template>
            </van-cell>
        </van-cell-group>

        <van-button id="logout" block @click="logOut">注销</van-button>


    </div>
</template>

<script>
import { getUserInfo } from '../api/index'
export default {
    name: 'UserVue',
    props: {
        msg: String
    },
    data() {
        return {
            username : '',
            credits: '',
            id:''
        }
    },
    methods:{
        toMyTask(){
            this.$router.push({name: 'mytask'})
        },
        signIn(){
            this.$toast.success('签到成功~')
        },
        logOut() {
            window.sessionStorage.clear()
            window.localStorage.clear()
            this.$router.push({name: 'login'})
        },
        toShare() {
            this.$router.push({name: 'sharescenter'})
        },
        toCreditsCenter(){
            this.$router.push({name: 'creditscenter'})
        },
    },
    mounted() {
        
        getUserInfo(this.$store.state.id.userId).then(({data}) => {
            this.$store.commit('userCredits_submit',data.data.data.credits)
            this.credits = this.$store.state.id.credits
        })
        this.username = this.$store.state.id.userName
        this.credits = this.$store.state.id.credits
        this.id = this.$store.state.id.userId
    }
}
</script>

<style scoped lang="less">


    #homeTop{
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        padding: 10px 0;  
        margin-bottom: 10px;  
    }

   #Topper {
    padding-top: 40px;
    
   }  
   #UserTop {
    padding-bottom: 20px;    
    background-color: #FFFFFF;
    // margin-left: 15px;
    // margin-right: 15px;
   }
   #UserList{
    margin-top: 10px;
   }
   #UserTop_user{
    line-height: 50px;
    font-size: 20px;
   }
   #check{
    margin-top: 5px;
    // margin-left: 15px;
    // margin-right: 15px;
        .van-cell{
            padding-left: 0;
            padding-right: 0;
        }
        .van-cell__left-icon{
            margin-left: 0 ;
            margin-right: 10px;
        }
        .van-icon{
            color:#FA5050
        }
   }

   /deep/ .van-cell{
    font-size: 18px;

   }



    #Guider {

        .van-cell{
            padding: 12px 16px;
            line-height: 30px;
            font-size: 22px;
        }
        .van-cell__title{
            margin-left: 10px;
        }
   }

   #jifen {
        .van-cell__value{
            margin-right: 25px;
            font-size: 22px;
            font-weight: bold;
            color:#323233
        
        }

    }

    #location {
        font-size: 18px;
        text-align: center;
    }
    #add{
        padding-left: 5px;
    }

    #logout {
        margin-top: 25px;
        font-size: 20px;
        color:#FA5050;
        height: 50px;
    }
    #homeTop {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 1000;
      padding-top: 5px;
      background-color: #fff;
      line-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
    }
    /deep/ .van-cell__title {
        font-size: 16px;
    }
</style>
    
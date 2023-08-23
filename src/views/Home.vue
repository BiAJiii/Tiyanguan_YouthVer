<template>
    <div>
        <div id="homeTop">
            <van-row type="flex" justify="space-between" align-items="center">
                <van-col span="2"><van-icon name="chat-o" dot size="24px"/></van-col>
                <van-col span="12">青春版任务体验平台</van-col>
                <van-col span="2" @click="signIn"><van-icon name="passed" size="24px"/></van-col>
            </van-row>
        </div>
        <div id="homeNav">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
                <van-swipe-item>
                    <div id="homeNav_swipe">
                        <van-image fit="cover" :src="require('../assets/swipe/轮播1.png')" onclick="location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfcbf3e7e68bfd536&redirect_uri=https%3A%2F%2Fwbs.icbc.com.cn%2Fwbsaccountserviceweb%2FJumpToApp%3FappId%3DQDB%26fromApp%3DCP0000961&response_type=code&scope=snsapi_userinfo&state=icbc&connect_redirect=1#wechat_redirect'"/>
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div id="homeNav_swipe">
                        <van-image fit="contain" :src="require('../assets/swipe/轮播2.png')" onclick="location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfcbf3e7e68bfd536&redirect_uri=https%3A%2F%2Fwbs.icbc.com.cn%2Fwbsaccountserviceweb%2FJumpToApp%3FappId%3DQDB%26fromApp%3DCP0012423&response_type=code&scope=snsapi_userinfo&state=icbc&connect_redirect=1#wechat_redirect'"/>
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div id="homeNav_swipe">
                        <van-image fit="contain" :src="require('../assets/swipe/轮播3.png')" onclick="location.href='https://mp.weixin.qq.com/s/qVouN45DNJhjPVhFIKpXHQ'"/>
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div id="homeNav_swipe">
                        <van-image fit="contain" :src="require('../assets/swipe/轮播4.png')" onclick="location.href='https://imes.mims.icbc.com.cn/ICBCESCommunityWEB/#/home?pageid=b318416f6e6142f699c13d725c796239'"/>
                    </div>
                </van-swipe-item>
            </van-swipe>
        
            <van-grid id="guide" :border="false" :column-num="4" >
                <van-grid-item @click="toMyTask()" >
                    <van-image :src="require('../assets/navImages/woderenwu.png')"/>
                    <div id="nav">我的任务</div>
                </van-grid-item>
                <van-grid-item  @click="toCreditsCenter()">
                    <van-image :src="require('../assets/navImages/duihuan.png')" />
                    <div id="nav">兑换商城</div>
                </van-grid-item>
                <van-grid-item @click="toRoll()">
                    <van-image :src="require('../assets/navImages/rongyubang.png')" />
                    <div id="nav">荣誉月榜</div>
                </van-grid-item>
                <van-grid-item @click="toReviewsCenter()">
                    <van-image :src="require('../assets/navImages/bangzhuwendang.png')" />
                    <div id="nav">反馈中心</div>
                </van-grid-item>
            </van-grid>

        </div>
        <div id="homeTask">
            <van-row type="flex" justify="space-between">
                <van-col span="6" id="recommand" style="padding-left: 0; text-align: left;">推荐任务</van-col>
                <van-col span="3" id="more" @click="toTaskList" style="padding-right: 0;">更多</van-col>
            </van-row>
            <van-grid :border="false" :column-num="2" :gutter="10" style="justify-content:space-between; padding-left: 0;" >
                <van-grid-item style="padding-right: 5px" @click="toTaskList">
                    <van-image
                    id="recommand_img"
                    :src="require('../assets/hometask/hometask1.png')" />
                </van-grid-item>
                <van-grid-item style="padding-right: 0;padding-left: 5px;" @click="toTaskList">
                    <van-image 
                    id="recommand_img"
                    :src="require('../assets/hometask/hometask2.png')" />
                </van-grid-item>
                <van-grid-item style="padding-right: 5px" @click="toTaskList">
                    <van-image 
                    id="recommand_img"
                    :src="require('../assets/hometask/hometask3.png')" />
                </van-grid-item>
                <van-grid-item style="padding-right: 0;padding-left: 5px;" @click="toTaskList">
                    <van-image 
                    id="recommand_img"
                    :src="require('../assets/hometask/hometask4.png')" />
                </van-grid-item>
            </van-grid>

        </div>
    </div>
</template>

<script>
import '@/vant_ui'
export default {
    name: 'HomeVue',
    props: {
        msg: String
    },
    data() {
        return {
            images: [
                
            ],
            
        }
    },
    methods: {
        toCreditsCenter(){
            this.$router.push({name: 'creditscenter'})
        },
        toTaskList(){
            this.$router.push({name: 'tasklist'})
        },
        toMyTask(){
            this.$router.push({name: 'mytask'})
        },
        toRoll(){
            this.$router.push({name: 'honorroll'})
        },
        toReviewsCenter() {
            this.$router.push({name: 'reviewscenter'})
        },
        signIn(){
            this.$toast.success('签到成功~')
        }
    
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    #homeTop{
        /* height: .40rem; */
        line-height: 40px;
        font-size: 20px;
        text-align: center;
    }
    /* 轮播图 */
    .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 190px;
    text-align: center;
    background-color: #39a9ed;

  }

    #guide{
        margin-top: 25px;
        margin-left: 15px;
        margin-right: 15px;
    }

    #homeNav{
        // marigin: 0 15px;
        
        #homeNav_swipe{
            height: 178px;
        }
        #nav{
            font-size: 14px;
            
        }
    }

    #homeTask{
        text-align: center;
        margin-top: 25px;
        margin-left: 15px;
        margin-right: 15px;
        font-size: 18px;
        line-height: 28px;
        #recommand{
            font-size: 18px;
            margin-bottom: 10px;
        }
        #more{
            font-size: 14px;
            margin-bottom: 10px;
        }
        #recommand_img{
            height: 145px;
            width: 145px;
        }
    }
    #homeTop{
      position: sticky;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: #fff;
      line-height: 36px;
    }

</style>
    
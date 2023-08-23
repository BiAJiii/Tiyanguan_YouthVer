<template>
    <van-tabbar route id="tabbar" v-model="active" active-color="#FA5050" inactive-color="#000">
        <van-tabbar-item replace to="/home" icon="home-o" >首页</van-tabbar-item>
        <van-tabbar-item replace to="/tasklist" icon="completed">任务中心</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="contact">我的</van-tabbar-item>
    </van-tabbar>

</template>

<script>
export default {
    name: 'TabbarVue',
    props: {
    msg: String
    },
    data() {
    return {
      active: 0,
    };
  },


}
</script>

<style scoped lang="less">
// /deep/ .van-tabbar-item__icon{
//   font-size: 30px;
// }

/deep/ .van-icon{
  font-size: 26px;
}

/deep/ .van-tabbar-item__text{
  font-size: 14px;
}

</style>
    
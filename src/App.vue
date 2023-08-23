<template>
  <div id="app">
    <router-view></router-view>
    <!-- <router-view></router-view>
    <Float/>
    <div id="tabbar_bottom"></div>
    <Tabbar placeholder="true"/> -->
  </div>
</template>

<script>
// import Tabbar from './components/Tabbar.vue';
// import Float from './components/Float.vue'
export default {
  name: 'App',
  // components: {
  //   Tabbar,
  //   Float
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  /* font-size: .16rem; */
}
body ,html{
  height: 100%;
  background-color:#F4F4F4;
}
#tabbar_bottom{
  height: 50px;
}
/* html{
  font-size: 100px;
} */

</style>

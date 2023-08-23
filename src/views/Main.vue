<template>
  <div>
    <router-view></router-view>
    <Float/>
    <div id="tabbar_bottom"></div>
    <Tabbar placeholder="true"/>
  </div>
</template>
<script>
import Tabbar from '../components/Tabbar.vue';
import Float from '../components/Float.vue'
export default {
  name: 'MyMain',
    data() {
        return {}
    },
    components: {
        Tabbar,
        Float
    }
}
</script>
<style scoped>
.el-header {
    padding: 0
}
</style>
<template>
<div id="Login">

  <van-image id="title"
        contain
        :src="require('../assets/icbc_logo.jpg')"
    />
  <div id="myLogin">

      <van-form @submit="onSubmit">
        <van-field
          size="large"	
          style="color: #FA5050;"
          left-icon="contact"
          v-model="username"
          clearable
          name="username"
          placeholder="请输入用户名"
          :rules="[{ required: true}]"
        />
       
        <!-- <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        /> -->
        <div id="denglu" style="margin: 16px;">
          <van-button color="#FA5050" block type="info" native-type="submit">用户登录</van-button>
          <van-button color="#636B88" block type="info" native-type="submit" @click="ramdomSubmit">游客登录</van-button>
        </div>
      </van-form>
  </div>
</div>
</template>

<script>
import { Login } from '../api/index'
export default {
    name: 'MyLogin',
    props: {
        msg: String
    },
    data(){
        return {
          username:'',
          userDetail: {
            name:''
          }
        }
    },
    methods: {
      onSubmit(values) {
        if(values.username.length > 8){
          this.$toast.fail('用户名长度不可大于8')
          return
        }
        console.log(values.username)
        
        let param = {
          'name' : values.username
        }
        console.log(param)
        Login(param).then(({data}) => {
          window.sessionStorage.setItem('username', values.username)
          console.log(data)
          console.log(data.data.userId)
          this.$store.commit('userId_submit', data.data.userId)
          this.$store.commit('userName_submit', values.username)
          this.$toast.success('登陆成功！')
          this.$router.push({name: 'home'})
        }).catch(res => {
          res
          this.$toast('系统发生错误！')
        })

      },
      generateRandomString() {
          let length = Math.floor(Math.random())
          let str = Math.random().toString(32).substring(6, length);
          return str.slice(2);
        
      },
      ramdomSubmit(){
        let username = this.generateRandomString()
        console.log(this.generateRandomString())
        let param = {
          'name' : username
        }
        Login(param).then(({data}) => {
          window.sessionStorage.setItem('username', username)
          console.log(data)
          this.$store.commit('userId_submit', data.data.userId)
          this.$store.commit('userName_submit', username)
          this.$toast.success('登陆成功！')
          this.$router.push({name: 'home'})
        }).catch(res => {
          res
          this.$toast('系统发生错误！')
        })
      }
    }
}
</script>

<style scoped lang="less">

#myLogin{
  margin: 0;
  width: 370px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .input{
    font-size: 20px;
  }
  }

#Login{
  position : absolute;
  width : 100%;
  height : 100%;
  background-color: #FFFFFF;
  /deep/ .van-button{
    font-size: 18px;
    border-radius: 6px;

  }

  /deep/ .input{
    margin: 0;
  }
}


/deep/ .van-field__left-icon .van-icon{
      font-size: 28px;
      margin-right: 15px;
    }

/deep/ .van-field__right-icon .van-icon{
      font-size: 20px;
    }
/deep/ .van-field__body {
      font-size: 18px;
    }
#title {
  top : 28%;
  width : 375px;
  height : 60px;
}

#denglu{
  .van-button{
    margin-top:6px;
  }
}
</style>
<template>
  <section>
    <el-card class="login">
      <h5 slot="header">欢迎登陆</h5>
      <el-form
        ref="login" v-model="login" :rules="rules"
        size="small">
        <!-- 用户名 -->
        <el-form-item prop="uname">
          <el-input type="text" placeholder="请输入用户名" v-model="login.uname">
            <q-icon icon="person" slot="prefix"></q-icon>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="请输入密码" v-model="login.pwd">
            <q-icon icon="md-lock" slot="prefix"></q-icon>
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <!-- 登陆 -->
        <el-form-item>
          <el-button
            :disabled="canLogin" size="small" type="primary"
            :loading="loading" class="login-button"
            id="TencentCaptcha"
            data-appid="2011187792"
            data-cbfn="dd">
            登&nbsp;&nbsp;陆
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import qIcon from '@/backend/components/qIcon.vue'
import {fetchScript} from '@/backend/utils'

window.dd = function (res) {
  console.log(res)
  // res（未通过验证）= {ret: 1, ticket: null}
  // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
  if (res.ret === 0) {
    alert(res.ticket) // 票据
  }
}

export default {
  name: 'login',
  data () {
    return {
      canLogin: false,
      loading: false,
      login: {
        uname: '',
        pwd: ''
      },
      rules: {
        uname: [
          {required: true, message: '用户名不能为空', trigger: 'blure'},
          {min: 6, max: 20, message: '长度介于6～20个字符', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '密码名不能为空', trigger: 'blure'},
          {min: 6, max: 20, message: '长度介于6～20个字符', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    qIcon
  },
  created () {
    this.test()
  },
  methods: {
    async test () {
      await fetchScript('https://ssl.captcha.qq.com/TCaptcha.js')
    },
    tt (res) {
      console.log(res)
      // res（未通过验证）= {ret: 1, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
      if (res.ret === 0) {
        alert(res.ticket) // 票据
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/backend/styles/mixins.scss';

  // body{
  //   position: absolute;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   top: 0;
  //   background-color: #ccc;
  // }
  .login{
    @include psc();
    width: 360px;
    height: 300px;
  }
  .el-card{
    &__body{
      padding-top: 0;
      .el-form-item{
        margin-top: 30px;
      }
    }
    .login-button{
      display: block;
      width: 100%;
      font-size: 16px;
    }
  }
</style>

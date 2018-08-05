<template>
  <section>
    <el-card class="login">
      <h5 slot="header">欢迎登陆</h5>
      <el-form
        ref="loginForm" :model="loginForm" :rules="rules"
        size="small">
        <!-- 用户名 -->
        <el-form-item prop="uname">
          <el-input type="text" placeholder="请输入用户名" v-model="loginForm.uname">
            <q-icon icon="person" slot="prefix"></q-icon>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.pwd">
            <q-icon icon="md-lock" slot="prefix"></q-icon>
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <!-- 登陆 -->
        <el-form-item>
          <el-button
            :disabled="disabled" size="small" type="primary"
            class="login-button" @click="submit">
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
import {valiSql} from '@/backend/utils/validate.js'

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      veriInstance: null,
      loginForm: {
        uname: '',
        pwd: ''
      },
      rules: {
        uname: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '密码名不能为空', trigger: 'blur'},
          {min: 6, max: 20, message: '长度介于6～20个字符', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    qIcon
  },
  computed: {
    disabled () {
      let res = this.loginForm.uname && this.loginForm.pwd
      res = res && this.loginForm.uname.length >= 6 && this.loginForm.pwd.length >= 6
      res = res && this.loginForm.uname.length < 20 && this.loginForm.pwd.length < 20
      return !res
    }
  },
  created () {
    this.initVeri()
  },
  methods: {
    async initVeri () {
      await fetchScript('https://ssl.captcha.qq.com/TCaptcha.js')
      // 实例化tx防水墙
      this.veriInstance = new TencentCaptcha('2011187792', (res) => {
        this.login(res)
      })
    },
    async login (res) {
      // res（未通过验证）= {ret: 1, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
      if (res.ret === 1) {
        return this.$message({
          message: '验证未通过，请重新验证',
          type: 'error'
        })
      }
      // 登陆
      await this.$store.dispatch('LoginByUsername', {userInfo: this.loginForm, vue: this})
      // 尝试获取token，能获取证明登陆成功，否则失败
      console.log(this.$store.state.user.token)
    },
    submit () {
      // 前端输入验证，防注入
      if (valiSql(this.loginForm.uname) || valiSql(this.loginForm.pwd)) {
        return this.$message({
          message: '休想sql注入',
          type: 'error'
        })
      }
      // 都通过验证则显示验证码
      this.veriInstance.show()
    }
  }
}
</script>

<style lang="scss">
  @import '@/backend/styles/mixins.scss';

  .login{
    @include psc();
    top: 40%;
    width: 360px;
    height: 300px;
    .el-card__body{
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

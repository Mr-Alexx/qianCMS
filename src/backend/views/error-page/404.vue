<template>
  <el-card shadow class="error-page-con">
    <p class="error-page-header">
      <span>4</span>
      <q-icon icon="ios-navigate-outline"></q-icon>
      <span>4</span>
    </p>
    <p class="error-page-msg">
      OOPS&nbsp;&nbsp;&nbsp;&nbsp;PAGE&nbsp;&nbsp;&nbsp;&nbsp;LOST
    </p>
    <div class="error-page-footer">
      <el-button type="text" size="mini">
        <router-link to="/">返回首页</router-link>
      </el-button>
      <el-button type="primary" size="mini" @click="backPage" class="button-back">
        返回上一页
      </el-button>
    </div>
  </el-card>
</template>

<script>
import qIcon from '@/backend/components/qIcon.vue'

export default {
  name: 'page404',
  components: {
    qIcon
  },
  methods: {
    backPage () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({
        name: 'home_index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import './404.scss';
  @import '@/backend/styles/mixins.scss';
  @import '@/backend/styles/colors.scss';
  .error-page{
    $font: 220px;
    &-con{
      width: 640px;
      @include psc();
      text-align: center;
    }
    &-header{
      height: $font;
      font-size: $font;
      color: $primary;
      line-height: $font;
      text-align: center;
      font-weight: 700;
      display: inline-block;
      white-space: nowrap;
      span, i{
        float: left;
      }
      .iconfont{
        font-size: $font;
        color: $success;
        vertical-align: middle !important;
        @include animation(error404animation 3s ease 0s infinite alternate);
      }
    }
    &-msg{
      padding-top: 10px;
      text-align: center;
      letter-spacing: 7px;
      font-size: 30px;
      color: $placeholder;
    }
    &-footer{
      margin: 20px 0;
      padding-right: 60px;
      a{
        color: $secondary-font;
        &:hover{
          color: $primary;
        }
      }
      .el-button{
        padding: 7px 60px;
      }
      .button-back{
        float: right;
      }
    }
  }
  @keyframes error404animation {
    0% {
      @include transform(rotateZ(0deg));
    }
    20% {
      @include transform(rotateZ(-60deg));
    }
    40% {
      @include transform(rotateZ(-10deg));
    }
    60% {
      @include transform(rotateZ(50deg));
    }
    80% {
      @include transform(rotateZ(-20deg));
    }
    100% {
      @include transform(rotateZ(0deg));
    }
  }
</style>

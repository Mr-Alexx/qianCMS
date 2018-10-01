<template>
  <div>
    <el-tooltip content="全屏">
      <i class="iconfont icon-full-screen" @click="screenfull"></i>
    </el-tooltip>
    <el-tooltip :content="`有${msgnum}条消息未读`">
      <router-link class="iconfont icon-ios-notifications msg-tip" :to="{name: 'message_center'}">
        <span v-if="hasUnreadMsg"></span>
      </router-link>
    </el-tooltip>
    <!-- 主题切换 -->
    <theme-switch></theme-switch>
  </div>
</template>

<script>
import themeSwitch from './theme-switch.vue'
import screenfull from 'screenfull'

export default {
  name: 'funcIcon',
  components: {
    themeSwitch
  },
  props: {
    msgnum: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      hasUnreadMsg: true,
      isFullscreen: false
    }
  },
  methods: {
    screenfull () {
      if (!screenfull.enabled) {
        this.$message({
          message: '您的浏览器不支持全屏',
          type: 'warning'
        })
        return false
      }
      this.isFullscreen = !this.isFullscreen
      screenfull.toggle()
    }
  }
}
</script>

<style>

</style>

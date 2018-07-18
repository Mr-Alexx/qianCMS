<template>
  <el-dropdown @command="handleThemeDropdownClick" trigger="click">
    <span class="el-dropdown-link">
      <i class="iconfont icon-md-color-fill"></i>
      <i class="el-icon-caret-bottom"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, k) in themeList"
        :key="k">
        <i :class="['iconfont', `icon-${item.type === 'dark' ? 'ios' : 'md'}-happy`]"></i>
        <i class="custom-circle" :style="`background-color: ${item.color}`"></i>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'themeSwitch',
  data () {
    return {
      themeList: [
        {
          type: 'dark',
          theme: 'primary',
          color: '#409EFF'
        },
        {
          type: 'dark',
          theme: 'success',
          color: '#67C23A'
        },
        {
          type: 'dark',
          theme: 'warning',
          color: '#E6A23C'
        },
        {
          type: 'dark',
          theme: 'danger',
          color: '#F56C6C'
        },
        {
          type: 'light',
          theme: 'primary',
          color: '#409EFF'
        },
        {
          type: 'light',
          theme: 'success',
          color: '#67C23A'
        },
        {
          type: 'light',
          theme: 'warning',
          color: '#E6A23C'
        },
        {
          type: 'light',
          theme: 'danger',
          color: '#F56C6C'
        }
      ]
    }
  },
  methods: {
    handleThemeDropdownClick () {}
  }
}
</script>

<style lang="scss" scoped>
  @import '@/backend/styles/colors.scss';
  .custom-circle{
    display: inline-block;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    position: relative;
    top: 1px;
    margin-left: 10px;
  }
  .iconfont{
    font-size: 23px;
    color: $main-font;
  }
  .el-dropdown-link{
    &:hover{
      .el-icon-caret-bottom{
        color: $light-primary;
      }
    }
    .el-icon-caret-bottom{
      color: $dark-primary;
      position: relative;
      left: -4px;
      top: -4px;
      font-size: 12px;
      color: $dark-primary;
    }
  }
</style>

<style lang="scss">
</style>

<template>
  <el-container class="main">
    <!-- 左侧功能栏 -->
    <el-aside :class="[isCollapse ? 'collapse-aside' : 'expand-aside', 'aside-menu']">
      <flexible-menu :isCollapse="isCollapse"></flexible-menu>
    </el-aside>
    <!-- 右侧主内容 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header class="main-header">
        <!-- 控制左侧导航伸缩 -->
        <div class="navicon-con">
            <q-icon
              icon="ios-menu" :class="{'clollapse-navicon': isCollapse}"
              @click.native="isCollapse = !isCollapse"></q-icon>
        </div>

        <!-- 中间文字显示内容 -->
        <div class="header-middle-con">
            <breadcrumb :currentPath="currentPath"></breadcrumb>
        </div>

        <!-- 最右侧图标和头像 -->
        <div class="header-right-con">
          <div class="header-right-icons-con">
            <el-tooltip content="全屏">
              <i class="iconfont icon-full-screen"></i>
            </el-tooltip>
            <el-tooltip content="锁屏">
              <i class="iconfont icon-md-lock"></i>
            </el-tooltip>
            <el-tooltip :content="`有${msgnum}条消息未读`">
              <i class="iconfont icon-ios-notifications msg-tip">
                <span v-if="hasUnreadMsg"></span>
              </i>
            </el-tooltip>
            <!-- 主题切换 -->
            <theme-switch></theme-switch>
          </div>

          <div class="header-avator-con">
            <!-- 用户菜单 -->
            <el-dropdown @command="handleUserDropdownClick" trigger="click">
              <span class="el-dropdown-link">
                {{user.name}}
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="b" divided>
                  退出登陆
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <img :src="user.avator">
          </div>
        </div>
      </el-header>

      <!-- 标签栏 -->
      <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>

      <!-- 主视图内容 -->
      <el-main class="single-page-con">
        <!-- <keep-alive>
          <router-view></router-view>
        </keep-alive> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import qIcon from '@/backend/components/qIcon.vue'
import breadcrumb from './main-components/breadcrumb-nav.vue'
import themeSwitch from './main-components/theme-switch.vue'
import tagsPageOpened from './main-components/tagsPageOpened.vue'
import flexibleMenu from './main-components/flexible-menu/flexibleMenu.vue'

export default {
  name: 'Main',
  data () {
    return {
      test: '测试',
      isCollapse: false,
      msgnum: 5,
      user: {
        name: 'Mr.Alex', // 用户名称
        avator: './static/images/batman.png'
      },
      pageTagsList: [], // 已打开的tab
      hasUnreadMsg: true, // 控制未读消息圆点
      currentPath: [
        {
          path: '/',
          name: 'index',
          title: '首页'
        }
      ]
    }
  },
  components: {
    breadcrumb,
    themeSwitch,
    tagsPageOpened,
    qIcon,
    flexibleMenu // 左侧菜单栏
  },
  mounted () {
    // this.$loadingbar.start()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 用户菜单选择
    handleUserDropdownClick () {

    }
  }
}
</script>

<style lang="scss">
  @import '../styles/main.scss';
</style>

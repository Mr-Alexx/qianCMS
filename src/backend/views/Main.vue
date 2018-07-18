<style lang="scss">
</style>

<template>
  <el-container class="main">
    <!-- 左侧功能栏 -->
    <el-aside :class="[isCollapse ? 'collapse-aside' : 'expand-aside', 'aside-menu']">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen" @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主内容 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header class="main-header">
        <!-- 控制左侧导航伸缩 -->
        <div class="navicon-con">
          <i
            :class="['iconfont', 'icon-ios-menu', {'clollapse-navicon': isCollapse}]"
            @click="isCollapse = !isCollapse"></i>
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

      <!-- 主试图内容 -->
      <el-main class="single-page-con">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import scrollBar from '@/backend/components/scroll-bar/vue-scroller-bars'
import breadcrumb from './main-components/breadcrumb-nav.vue'
import themeSwitch from './main-components/theme-switch.vue'
import tagsPageOpened from './main-components/tagsPageOpened.vue'

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
    scrollBar,
    breadcrumb,
    themeSwitch,
    tagsPageOpened
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

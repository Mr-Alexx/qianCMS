<template>
  <el-scrollbar style="height: 100%">
    <el-menu
      :collapse="isCollapse"
      class="qian-aside-menu"
      @open="handleOpen"
      @close="handleClose"
      router
      :default-active="activeRoute"
      :default-openeds="defaultOpeneds"
      @select="handleSelect">
      <el-submenu
        v-for="(menu, i) in menus"
        :key="i"
        :index="menu.title">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-if="menu.children && menu.children.length > 0"
            v-for="(subMenu, j) in menu.children"
            :key="j"
            :index="subMenu.router">
            <i :class="subMenu.icon" v-if="subMenu.icon"></i>
            {{subMenu.title}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'flexibleMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    defaultOpeneds: {
      type: Array,
      default () {
        return ['文档管理']
      }
    },
    menus: {
      type: Array,
      default () {
        return [
          {
            title: '系统管理',
            icon: 'el-icon-setting',
            children: [
              {
                router: '/systemConfig',
                title: '系统配置'
              },
              {
                router: '/userManage',
                title: '用户管理'
              },
              {
                router: '/roleManage',
                title: '角色管理'
              }
            ]
          },
          {
            title: '文档管理',
            icon: 'el-icon-document',
            children: [
              {
                router: '/document',
                title: '文档管理'
              },
              {
                router: '/category',
                title: '文档类别'
              },
              {
                router: '/tags',
                title: '标签管理'
              },
              {
                router: '/message',
                title: '留言管理'
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    activeRoute () {
      return this.$store.state.app.activeRoute
    }
  },
  created () {
    this.$store.dispatch('getActiveRoute')
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (index, indexPath) {
      console.log(index)
      this.$store.dispatch('setActiveRoute', index)
    }
  }
}
</script>

<style lang="scss">
  @import '@/backend/styles/colors.scss';
  .el-scrollbar__view {
    height: 100%;
  }
  .qian-aside-menu {
    height: 100%;
    background-color: $aside-menu__bg;
    .el-menu-item, .el-submenu__title {
      color: $aside-menu__color;
      &:hover, &:focus {
        background: none;
        color: $aside-menu-item-active__color;
      }
    }
    .el-submenu {
      background-color: $aside-menu__bg;
      .el-menu {
        background-color: $aside-menu--active__bg;
      }
      &.is-active {
        .el-submenu__title {
          color: $aside-menu-item-active__color;
        }
      }
      &.is-opened {
        .el-menu-item {
          &.is-active {
            background-color: $aside-menu-item--active__bg;
            color: $aside-menu-item-active__color;
          }
        }
      }
    }
    .el-menu-item-group__title {
      display: none;
    }
  }
</style>

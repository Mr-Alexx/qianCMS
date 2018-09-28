<template>
  <el-scrollbar style="height: 100%">
    <el-menu
      :collapse="isCollapse"
      class="qian-aside-menu"
      :default-active="activeRoute"
      :default-openeds="defaultOpeneds"
      @select="handleSelect"
      unique-opened>
      <el-submenu
        v-for="(menu, i) in menuList"
        :key="i"
        :index="menu.meta.title"
        v-if="!menu.hide">
        <template slot="title">
          <i :class="menu.meta.icon"></i>
          <span>{{menu.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-if="menu.children && menu.children.length > 0 && !subMenu.hide"
            v-for="(subMenu, j) in menu.children"
            :key="j"
            :index="subMenu.name">
            <i :class="subMenu.meta.icon" v-if="subMenu.meta.icon"></i>
            {{subMenu.meta.title}}
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
    menus: Array
  },
  computed: {
    menuList () {
      return this.$store.state.app.menuList
    },
    activeRoute () {
      return this.$store.state.app.currentPageName
    }
  },
  created () {
    // this.$store.dispatch('getActiveRoute')
  },
  methods: {
    handleSelect (index, indexPath) {
      // console.log(index, indexPath)
      this.$router.push({
        name: index
      })
      // this.$store.dispatch('setActiveRoute', index)
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

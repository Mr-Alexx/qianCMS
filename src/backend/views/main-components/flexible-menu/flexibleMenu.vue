<template>
  <el-scrollbar style="height: 100%">
    <el-menu
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      default-active="/home"
      :default-openeds="defaultOpeneds">
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
                router: '/docManage',
                title: '文档管理'
              },
              {
                router: '/docType',
                title: '文档类别'
              },
              {
                router: '/tagManage',
                title: '标签管理'
              },
              {
                router: '/msgManage',
                title: '留言管理'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      :to="{name: 'home_index'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="item in currentPath"
      v-if="item.meta.title !== '首页'"
      :key="item.name">
      {{item.meta.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumbNav',
  props: {
    currentPath: Array
  }
}
</script>

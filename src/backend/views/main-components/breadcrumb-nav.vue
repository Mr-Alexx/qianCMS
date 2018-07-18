<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in currentPath"
      :to="{path: item.path}"
      :key="item.name">
      {{item.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumbNav',
  props: {
    currentPath: Array
  },
  mounted () {
    console.log(this.currentPath)
  }
}
</script>

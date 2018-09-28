<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in currentPath"
      :to="{path: item.path}"
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
  },
  watch: {
    currentPath (val) {
      console.log(val)
    }
  }
}
</script>

<template>
  <i
    class="iconfont" :class="'icon-' + icon" v-if="icon"
    :style="{fontSize: size + 'px', color: color, fontWeight: weight}"></i>
</template>

<script>
export default {
  name: 'QianIcon',
  props: {
    // 指定图标类型
    icon: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    weight: {
      type: [Number, String],
      default: 'normal'
    }
  }
}
</script>

<style>
  .iconfont {
    vertical-align: text-bottom;
  }
</style>

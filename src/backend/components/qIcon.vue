<template>
  <i
    class="iconfont" :class="'icon-' + icon" v-if="icon"
    :style="{fontSize: size + 'px', color: color, fontWeight: weight, verticalAlign: 'text-bottom'}"></i>
</template>

<script>
export default {
  name: 'qIcon',
  props: {
    // 指定图表类型
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

<template>
  <div :style="styles" class="qian-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QianRow',
  props: {
    gutter: Number
  },
  computed: {
    styles () {
      let style = {}
      if (this.gutter) {
        style.marginLeft = `-${this.gutter / 2}px`
        style.marginRight = style.marginLeft
      }
      return style
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/mixins/mixins.scss';

  @include b(row) {
    position: relative;
    box-sizing: border-box;
    @include utils-clearfix;
  }
</style>

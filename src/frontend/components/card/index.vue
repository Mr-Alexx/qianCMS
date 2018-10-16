<template>
  <div class="qian-card" :style="{background: bg}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QianCard',
  props: {
    bg: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

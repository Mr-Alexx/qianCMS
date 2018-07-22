<template>
  <section>
    <bmap id-name="sdfd" class="test"></bmap>
  </section>
</template>

<script>
import bmap from '../home/components/charts/bmap.vue'

export default {
  name: 'docCtrl',
  components: {
    bmap
  }
}
</script>

<style lang="scss">
  .test{
    width: 600px;
    height: 500px;
  }
</style>

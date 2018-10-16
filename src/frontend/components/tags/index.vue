<template>
  <qian-card bg="#fff">
    <h3>标签</h3>
    <div>
      <qian-tag
        v-for="(item, i) in tagList"
        :key="i"
        v-if="tagList.length > 0"
        :label="item.name"
        @click.native="tagClick(item)"
        :active="activeTag.name === item.name"></qian-tag>
    </div>
  </qian-card>
</template>

<script>
import QianCard from '../card'
import QianTag from './tag.vue'

export default {
  name: 'QianTags',
  components: {
    QianTag,
    QianCard
  },
  props: {
    tagList: Array
  },
  data () {
    return {
      activeTag: {}
    }
  },
  methods: {
    tagClick (tag) {
      if (tag.name === this.activeTag.name) return
      this.activeTag = tag
      console.log(tag)
    }
  }
}
</script>

<style>

</style>

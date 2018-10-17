<template>
  <qian-card bg="#fff" title="标签">
    <div v-if="tagList.length > 0" class="qian-tags">
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
  data () {
    return {
      activeTag: {}
    }
  },
  computed: {
    tagList () {
      return this.$store.state.app.tagList
    }
  },
  created () {
    if (this.tagList.length <= 0) {
      this.$store.dispatch('getTagList')
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

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(tags) {
    padding-left: 10px;
  }
</style>

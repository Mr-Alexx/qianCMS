<template>
  <div class="qian-mgb">
    <qian-row :gutter="20">
      <qian-col :xs="24" :md="16" :pull="4">
        <time-line :list="timelineList" is-link></time-line>
      </qian-col>
    </qian-row>
  </div>
</template>

<script>
import TimeLine from '@/frontend/components/timeLine'

export default {
  name: 'File',
  components: {
    TimeLine
  },
  computed: {
    timelineList () {
      return this.$store.state.app.timelineList
    }
  },
  created () {
    if (this.timelineList.length <= 0) {
      this.$store.dispatch('getTimelineList')
    }
  }
}
</script>

<style>

</style>

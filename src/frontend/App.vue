<template>
  <div id="qian" :class="{'qian-app--pdt': smallBar}">
    <navbar :small-bar="smallBar"></navbar>
    <div class="qian-container qian-container--pd">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from '@/frontend/components/navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      smallBar: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll (e) {
      const top = window.pageYOffset
      if (top >= 280) {
        if (this.smallBar) return
        this.smallBar = true
      } else {
        if (!this.smallBar) return
        this.smallBar = false
      }
    },
    handleClick () {
      console.log(2)
    }
  },
  watch: {
    '$route' (route) {
      sessionStorage.activeRoute = route.name
      this.$store.commit('SET_ACTIVEROUTE', route.name)
    }
  }
}
</script>

<style lang="scss">
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(app) {
    @include m(pdt) {
      padding-top: $--menu-height + 280px;
    }
  }
</style>

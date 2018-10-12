<template>
  <div id="qian">
    <navbar></navbar>
    <div class="qian-container qian-container--pd">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/frontend/components/navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

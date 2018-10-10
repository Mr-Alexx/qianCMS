<template>
  <div class="qian-navbar">
    <div class="qian-navbar__banner"></div>
    <qian-row :gutter="20" class="qian-menu-container">
      <qian-col :lg="8" :sm="8" class="qian-avatar-container">
        <!-- 头像 -->
        <div class="qian-avatar">
          <img src="/static/images/frontend_avatar.jpg" alt="个人头像" class="qian-avatar__img">
        </div>
      </qian-col>
      <qian-col :lg="16" :sm="16">
        <rect-menu :menu-list="menuList"></rect-menu>
      </qian-col>
    </qian-row>
  </div>
</template>

<script>
import RectMenu from './rectMenu.vue'

export default {
  name: 'navbar',
  components: {
    RectMenu
  },
  data () {
    return {
      menuList: [
        {name: 'aa', label: 'aa'},
        {name: 'bb', label: 'bb'},
        {name: 'cc', label: 'cc'},
        {name: 'dd', label: 'dd'},
        {name: 'ee', label: 'ee'}
      ]
    }
  }
}
</script>

<style lang="scss">
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(navbar) {
    @include e(banner) {
      min-height: 280px;
      background-image: url(https://i.loli.net/2018/10/09/5bbc7c611eaf0.jpg);
      background-size: cover;
    }
  }
  .qian-avatar-container {
    position: relative;
    height: 100%;
  }
  @include b(avatar) {
    width: 200px;
    height: 200px;
    border: 5px solid $--color-white;
    border-radius: 50%;
    overflow: hidden;
    background-color: $--color-white;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -145px;
    @include e(img) {
      width: 100%;
      height: 100%;
      // border-radius: 50%;
    }
  }
  @include b(menu-container) {
    height: 60px;
    padding-top: 10px;
    background-color: $--color-white;
    @include utils-prefix(box-shadow, $--box-shadow-dark);
  }
</style>

<template>
  <div>
    <div class="qian-linemenu">
      <router-link
        v-for="(item, i) in menuList"
        :key="i"
        :class="['qian-linemenu__item', {'is-active': activeRoute === item.name}]"
        @click.native="changeMenu(item.name)"
        :to="{name: item.name}">
        {{item.label}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineMenu',
  props: {
    menuList: Array,
    activeRoute: {
      type: String,
      default: 'index'
    }
  },
  methods: {
    changeMenu (routeName) {
      if (routeName === this.activeRoute) return
      this.$emit('change', routeName)
    }
  }
}
</script>

<style lang="scss">
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(linemenu) {
    @include utils-clearfix;
    height: $--menu-height;
    line-height: $--menu-height;
    font-size: $--font-size-middle;
    @include e(item) {
      float: left;
      padding: 0 15px;
      position: relative;
      color: $--color-text-primary;
      @include utils-prefix(transition, $--all-transition);
      // font-weight: bold;
      &:after {
        position: absolute;
        z-index: 10;
        content: '';
        bottom: -1px;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: $--color-main;
        @include utils-prefix(transform, translateX(-50%));
        @include utils-prefix(transition, $--all-transition);
      }
      &.is-active, &:hover {
        color: $--color-main;
      }
      @include when(active) {
        color: $--color-main;
        &:after {
          width: 100%;
        }
      }
    }
  }
</style>

<template>
  <div class="qian-card" :style="{background: bg}">
    <h3 v-if="title" class="qian-card__title">{{title}}</h3>
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
    },
    title: String
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  // 卡片
  @include b(card) {
    border: 1px solid $--border-color-lighter;
    border-radius: $--border-radius-base;
    @include utils-prefix(transition, $--all-transition);
    padding: 15px;
    @include m(white) {
      background-color: $--color-white;
    }
    &:hover {
      @include utils-prefix(box-shadow, $--box-shadow-light);
    }
    @include e(title) {
      font-size: $--font-size-middle;
      position: relative;
      padding-left: 10px;
      font-weight: 500;
      margin-bottom: 10px;
      &:before {
        position: absolute;
        content: '';
        background: $--color-main;
        left: 0;
        height: 100%;
        width: 3px;
      }
    }
  }
</style>

<template>
  <span :class="['qian-tag', {'is-active': active}]">{{label}}</span>
</template>

<script>
export default {
  name: 'QianTag',
  props: {
    label: String,
    active: Boolean
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(tag) {
    display: inline-block;
    padding: 5px 15px;
    background-color: $--color-white;
    border: $--border-base;
    // @include utils-prefix(transition, $--all-transition);
    margin: 5px;
    border-radius: $--border-radius-base;
    cursor: pointer;
    @include when(active) {
      color: $--color-white;
      background-color: $--color-main;
      border-color: $--color-main;
    }
    &:hover {
      color: $--color-white;
      background-color: $--color-main;
      border-color: $--color-main;
    }
  }
</style>

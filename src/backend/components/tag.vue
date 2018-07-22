<template>
  <transition name="fade">
    <span
      :class="['qian-tag', {'active-tag': active}]">
      <i class="qian-tag-circle"></i>
      {{title}}
      <slot></slot>
      <i
        class="el-icon-close" v-if="closable"
        @click="close"></i>
    </span>
  </transition>
</template>

<script>
export default {
  name: 'tag',
  props: {
    title: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    name: [String, Number]
  },
  methods: {
    close (e) {
      if (this.name === undefined) {
        this.$emit('on-close', event)
      } else {
        this.$emit('on-close', event, this.name)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../styles/colors.scss";
@import "../styles/mixins.scss";
.qian-tag {
  background-color: #fff;
  color: $main-font;
  cursor: pointer;
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid $tl-border;
  white-space: nowrap;
  position: relative;
  padding-left: 10px; // 25px;
  @include transition(padding-left .3s ease);
  &.active-tag{
    padding-left: 25px;
    .qian-tag-circle{
      display: block;
    }
  }
  .qian-tag-circle{
    @include psc(top);
    display: none;
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
  }
  .el-icon-close {
    color: $main-font;
    margin-left: 5px;
    &:hover {
      color: $primary;
    }
  }
  &.active-tag {
    background-color: $primary;
    color: #fff;
    .el-icon-close {
      color: #fff;
    }
  }
}
</style>

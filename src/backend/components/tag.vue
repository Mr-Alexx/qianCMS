<template>
  <span
    :class="['qian-tag', {'is-active': active}]">
    {{title}}
    <slot></slot>
    <i
      class="el-icon-close" v-if="closable"
      @click="close"></i>
  </span>
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
  padding-left: 25px; // 25px;
  &.active-tag{
    padding-left: 25px;
    .qian-tag-circle{
      display: block;
    }
  }
  &:before{
    content: '';
    @include psc(top);
    left: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $tag--bg; // #fff;
  }
  .el-icon-close {
    color: $main-font;
    margin-left: 5px;
    &:hover {
      color: $primary;
    }
  }
  &.is-active {
    background-color: $primary;
    color: #fff;
    @include transition(background-color, .5s, ease);
    .qian-tag-circle {
      background-color: #fff;
      @include transition(background-color, .5s, ease);
    }
    .el-icon-close {
      color: #fff;
    }
  }
}
</style>

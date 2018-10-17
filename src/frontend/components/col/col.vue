<template>
  <div :style="styles" :class="clist">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'QianCol',
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: Number,
    push: Number,
    pull: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    styles () {
      // 获取父元素qian-row的gutter属性
      // 不存在则设为0
      let parent = this.$parent
      while (parent && parent.$options.name !== 'QianRow') {
        parent = parent.$parent
      }
      const gutter = parent ? parent.gutter : 0

      let style = {}
      if (gutter) {
        style.paddingLeft = `${gutter / 2}px`
        style.paddingRight = style.paddingLeft
      }
      return style
    },
    clist () {
      let cls = ['qian-col']
      // qian-col-x qian-col-offset-x...
      const layout = ['span', 'offset', 'pull', 'push']
      layout.forEach(prop => {
        if (this[prop] !== undefined) {
          cls.push(
            prop === 'span'
              ? `qian-col-${this[prop]}`
              : `qian-col-${prop}-${this[prop]}`
          )
        }
      })
      // qian-col-xs-x... qian-col-xs-offset-x...
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
      sizes.forEach(size => {
        if (typeof this[size] === 'number') {
          cls.push(`qian-col-${size}-${this[size]}`)
        } else if (typeof this[size] === 'object') {
          let props = this[size]
          for (let k in props) {
            const prop = props[k]
            cls.push(
              k === 'span'
                ? `qian-col-${size}-${prop}`
                : `qian-col-${size}-${k}-${prop}`
            )
          }
        }
      })

      return cls
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/mixins/mixins.scss';

  // 抽离的公共生成qian-col'-xx'-x, qian-col'-xx'-push-x...方法
  @mixin com($size: "") {
    $str: "";
    @if $size != "" {
      $str: -#{$size};
    }
    .qian-col#{$str}-#{"0"} {
      display: none;
    }

    @for $i from 0 through 24 {
      $w: ($i / 24) * 100%;
      .qian-col#{$str}-#{$i} {
        width: $w;
      }
      .qian-col#{$str}-offset-#{$i} {
        margin-left: $w;
      }
      .qian-col#{$str}-pull-#{$i} {
        position: relative;
        left: $w;
      }
      .qian-col#{$str}-push-#{$i} {
        position: relative;
        right: $w;
      }
    }
  }

  [class*="qian-col-"] {
    float: left;
    box-sizing: border-box;
  }

  @include com();
  // 遍历 xs, sm, md, lg, xl数组
  @for $i from 1 through length($--breakpoints-arr) {
    $item: nth($--breakpoints-arr, $i);
    @include res($item) {
      @include com($item)
    }
  }
</style>

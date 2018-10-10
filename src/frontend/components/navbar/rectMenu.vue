<template>
  <div>
    <ul class="qian-menu">
      <li
        v-for="(item, i) in menuList"
        :key="i"
        :class="['qian-menu__item', {'is-active': activeIndex == i}]"
        @click="changeMenu(i)">
        <router-link :to="{name: item.name}">{{item.label}}</router-link>
        <span class="qian-line-lr"></span>
        <span class="qian-line-tb"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RectMenu',
  props: {
    menuList: Array
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeMenu (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss">
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(menu) {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    @include e(item) {
      // width: 100px;
      padding: 0 30px;
      height: 100%;
      margin: 0 15px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      &:hover, &.is-active{
        color: $--color-main;
        .qian-line-lr, .qian-line-tb{
          &:before{
            left: 0;
            opacity: 1;
          }
          &:after{
            top: 0;
            opacity: 1;
          }
        }
      }
    }
  }

  // 线
  .qian-line-lr, .qian-line-tb{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:before, &:after{
      position: absolute;
      content: '';
      opacity: 0;
      @include utils-prefix(transition, $--main-transition);
      background-color: $--color-main;
    }
    &:before{
      width: 100%;
      height: 1px;
    }
    &:after{
      height: 100%;
      width: 1px;
    }
  }
  .qian-line-lr{
    &:before{
      top: 0;
      left: 50%;
    }
    &:after{
      top: -120%;
      left: 0;
    }
  }
  .qian-line-tb{
    bottom: 0;
    &:before{
      top: 100%;
      left: 130%;
    }
    &:after{
      top: 120%;
      right: 0;
    }
  }
</style>

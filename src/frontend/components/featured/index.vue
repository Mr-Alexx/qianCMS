<template>
  <qian-card title="推荐" class="qian-mgb">
    <ul v-if="list.length > 0" class="qian-featured">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="qian-featured-item">
        <span class="qian-featured-item__num">{{i + 1}}</span>
        <router-link :to="`/article/${item.id}`" class="qian-featured-item__title">
          {{item.title}}
        </router-link>
      </li>
    </ul>
  </qian-card>
</template>

<script>
import QianCard from '../card'

export default {
  name: 'QianFeatured',
  components: {
    QianCard
  },
  computed: {
    list () {
      return this.$store.state.app.featuredList
    }
  },
  mounted () {
    if (this.list.length <= 0) {
      this.$store.dispatch('getFeaturedList')
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(featured) {
    padding-left: 15px;
  }
  @include b(featured-item) {
    padding: 5px 0;
    &:first-child, &:nth-child(2), &:nth-child(3) {
      @include e(num) {
        color: #fff;
      }
    }
    &:first-child {
      @include e(num) {
        background: $--color-main-light-2;
      }
    }
    &:nth-child(2) {
      @include e(num) {
        background: $--color-primary-light-2;
      }
    }
    &:nth-child(3) {
      @include e(num) {
        background: $--color-success-light-2;
      }
    }
    @include e(num) {
      display: inline-block;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.5em;
      text-align: center;
      font-size: $--font-size-small;
      background: $--color-main-bg;
      color: $--color-text-regular;
    }
    @include e(title) {
      margin-left: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
      max-width: calc(100% - 2.5em);
      line-height: 1.5em;
      vertical-align: middle;
      @include utils-prefix(transition, padding-left .3s);
      &:hover {
        text-decoration: underline;
        color: $--color-main;
        padding-left: 5px;
      }
    }
  }
</style>

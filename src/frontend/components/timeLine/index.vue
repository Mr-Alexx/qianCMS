<template>
  <div class="qian-timeline-container">
    <div
      class="qian-timeline"
      v-for="(items, i) in list"
      :key="i">
      <h3 v-if="items.title" class="qian-timeline__title">{{items.title}}</h3>
      <ul v-if="items.children" class="qian-timeline-list">
        <li
          v-for="(item, j) in items.children"
          :key="j"
          class="qian-timeline-item qian-card">
          <span class="qian-timeline-item__time">
            {{item.create_time | timeFilter(true)}}
          </span>
          {{!isLink ? item.title : ''}}
          <router-link :to="`/article/${item.id}`" v-if="isLink" class="qian-timeline-item__title">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { timeFilter } from '@/filters'
import QianCard from '@/frontend/components/card'

export default {
  name: 'TimeLine',
  components: {
    QianCard
  },
  props: {
    list: Array,
    isLink: Boolean
  },
  filters: {
    timeFilter
  }
}
</script>

<style lang="scss">
  @import '@/frontend/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  $--timeline-border: 1px dotted $--color-main-light-4;

  @include b(timeline-container) {
    border-left: $--timeline-border;
  }
  @include b(timeline) {
    padding: 15px 0;
    padding-left: 30px;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }
    @include e(title) {
      padding-bottom: 15px;
      font-size: $--font-size-large;
      position: relative;
      &:before {
        $w: 20px;
        content: '';
        position: absolute;
        left: -30px - $w / 2;
        top: 2px;
        width: $w;
        height: $w;
        border-radius: 50%;
        background-color: $--color-main-light-4;
        @include utils-prefix(box-shadow, $--box-shadow-base);
      }
    }
  }
  @include b(timeline-item) {
    margin-left: 30px;
    padding: 24px 0 24px 15px !important;
    margin-bottom: 15px;
    background-color: $--color-white;
    font-size: $--font-size-middle;
    font-weight: 500;
    position: relative;
    &:hover {
      &:before {
        width: 15px;
        height: 15px;
        left: -69px;
        background-color: $--color-main-light-2;
      }
      &:after {
        border-color: $--color-main-light-2;
      }
    }
    &:before {
      position: absolute;
      content: '';
      left: -67px;
      top: 50%;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      @include utils-prefix(transform, translateY(-50%));
      background-color: $--color-main-light-5;
      z-index: 2;
      @include utils-prefix(transition, $--all-transition);
    }
    &:after {
      content: '';
      position: absolute;
      z-index: 1;
      left: -60px;
      width: 60px;
      top: 50%;
      border-bottom: $--timeline-border;
      @include utils-prefix(transition, $--all-transition);
    }
    &:last-child {
      border-bottom: none;
    }
    @include e(time) {
      display: inline-block;
      margin-right: 10px;
      font-size: $--font-size-small;
      font-style: normal;
      color: $--color-text-regular;
    }
    @include e(title) {
      display: inline-block;
      @include utils-prefix(transition, padding-left .3s);
      &:hover {
        color: $--color-main;
        padding-left: 5px;
        text-decoration: underline;
      }
    }
  }
</style>

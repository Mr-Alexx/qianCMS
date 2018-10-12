<template>
  <div>
    <qian-row :gutter="20">
      <qian-col :xs="0" :md="5">
        <qian-message-board></qian-message-board>
      </qian-col>
      <qian-col :xs="24" :md="14">
        <ul class="qian-article-list">
          <li
            class="qian-card qian-card--white qian-article-item"
            v-for="(item, i) in articleList"
            :key="i">
            <div :span="6" class="qian-article-item__thumbnail">
              <router-link to="/">
                <img :src="item.thumbnail | thumbnail">
              </router-link>
            </div>
            <div :span="18" class="qian-article-item__content">
              <h3>
                <router-link to="/">
                  {{item.title}}
                </router-link>
              </h3>
              <p>{{item.summary}}</p>
              <div>
                <div>
                  <span>
                    <qian-icon icon="ios-happy"></qian-icon>
                    {{item.update_time | timeFilter}}
                  </span>
                  <span>
                    <qian-icon icon="ios-eye"></qian-icon>
                    {{item.views}}
                  </span>
                  <span>
                    <qian-icon icon="ios-at"></qian-icon>
                    {{item.comments}}
                  </span>
                  <span>
                    <qian-icon icon="ios-apple"></qian-icon>
                    {{item.likes}}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </qian-col>
      <qian-col :xs="0" :md="5">
        <qian-featured></qian-featured>
        <qian-tags></qian-tags>
      </qian-col>
    </qian-row>
  </div>
</template>

<script>
import QianMessageBoard from '@/frontend/components/messageBoard'
import QianTags from '@/frontend/components/tags'
import QianFeatured from '@/frontend/components/featured'
import QianCard from '@/frontend/components/card'
import { mapState } from 'vuex'
import { thumbnail } from '@/frontend/filters'
import { timeFilter } from '@/filters'

export default {
  name: 'home',
  components: {
    QianMessageBoard,
    QianTags,
    QianFeatured,
    QianCard
  },
  filters: {
    thumbnail,
    timeFilter
  },
  computed: {
    ...mapState({
      articleList: state => state.app.articleList
    })
  },
  created () {
    this.$store.dispatch('getArticles')
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';

  @include b(article-List) {
    overflow: hidden;
  }
  @include b(article-item) {
    @include utils-clearfix;
    height: 160px;
    margin-bottom: 15px;
    @include utils-prefix(transition, $--all-transition);
    &:hover {
      @include utils-prefix(transform, translateY(-1px));
    }
    // 缩略图
    @include e(thumbnail) {
      float: left;
      width: 220px;
      height: 100%;
      overflow: hidden;
      margin-right: 15px;
      img {
        width: 100%;
        height: auto;
        @include utils-prefix(transition, all .3s linear);
        &:hover {
          @include utils-prefix(transform, scale(1.015, 1.02));
        }
      }
    }
    @include e(content) {
      float: left;
      max-width: calc(100% - 230px);
      height: 100%;
      >h3 {
        font-size: $--font-size-large;
        font-weight: normal;
        a {
          @include utils-prefix(transition, all .3s linear);
          &:hover {
            padding-left: 10px;
          }
        }
      }
      >h3, >div {
        height: 30px;
      }
      >p {
        height: calc(100% - 60px);
        padding-top: 10px;
        text-overflow: ellipsis;
      }
      >div {
        display: table;
        div {
          display: table-cell;
          vertical-align: bottom;
          span {
            display: inline-block;
            margin-right: 15px;
            i {
              vertical-align: middle;
            }
          }
        }
      }
      >p, >div {
        font-size: $--font-size-small;
      }
    }
  }
</style>

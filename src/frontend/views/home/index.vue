<template>
  <div>
    <qian-row :gutter="20">
      <qian-col :xs="0" :md="4">
        <qian-message-board></qian-message-board>
      </qian-col>
      <qian-col :xs="24" :md="14" class="qian-relative">
        <ul class="qian-article-list">
          <li
            class="qian-card qian-card--white qian-article-item"
            v-for="(item, i) in articleList"
            :key="i">
            <div :span="6" class="qian-article-item__thumbnail">
              <router-link :to="`/article/${item.id}`">
                <img :src="item.thumbnail | thumbnail">
              </router-link>
            </div>
            <div :span="18" class="qian-article-item__content">
              <h3>
                <router-link :to="`/article/${item.id}`">
                  {{item.title}}
                </router-link>
              </h3>
              <div>
                <p>{{item.summary | summaryFilter}}</p>
              </div>
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
        <el-pagination
          layout="prev, pager, next"
          :total="count"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="changePage">
        </el-pagination>
      </qian-col>
      <qian-col :xs="0" :md="6">
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
  data () {
    return {
      currentPage: 1,
      pageSize: 5
    }
  },
  filters: {
    thumbnail,
    timeFilter,
    summaryFilter (summary) {
      let str = summary
      if (summary.length > 120) {
        str = summary.substring(0, 120) + '......'
      }
      return str
    }
  },
  computed: {
    ...mapState({
      articleList: state => state.app.articleList,
      tagList: state => state.app.tagList,
      count: state => state.app.count
    })
  },
  async created () {
    if (!this.count) {
      await this.$store.dispatch('getArticleSum')
    }
    if (this.articleList.length <= 0) {
      await this.$store.dispatch('getPaginationArticle', {page: this.currentPage, limit: this.pageSize})
    }
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('getPaginationArticle', {page, limit: this.pageSize})
      window.scrollTo(0, 280)
    }
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
      max-width: calc(100% - 235px);
      height: 100%;
      color: $--color-text-regular;
      >h3 {
        font-size: $--font-size-middle;
        font-weight: 500;
        a {
          @include utils-prefix(transition, padding-left .3s linear);
          &:hover {
            color: $--color-main;
            text-decoration: underline;
            padding-left: 10px;
          }
        }
      }
      >h3, >div {
        height: 30px;
      }
      >div:nth-child(2) {
        height: calc(100% - 60px);
        padding-top: 10px;
        overflow: hidden;
      }
      >div:last-child {
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
  .el-pagination {
    text-align: center;
    margin-bottom: 15px;
    [class*="btn"], ul, li {
      background-color: transparent !important;
    }
  }
  .el-pager li.active {
    color: $--color-main;
  }
</style>

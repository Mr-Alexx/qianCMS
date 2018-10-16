<template>
  <div class="qian-container qian-container--mgb">
    <qian-row :gutter="20">
      <qian-col :md="18" :xs="24">
        <qian-card>
          <article
            v-html="article"
            class="article-content markdown-body editormd-preview-container"></article>
        </qian-card>
      </qian-col>
      <qian-col :md="6" :xs="0">
        <qian-featured></qian-featured>
        <qian-tags :tag-list="tagList"></qian-tags>
      </qian-col>
    </qian-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticleById } from '@/frontend/api'
import QianTags from '@/frontend/components/tags'
import QianFeatured from '@/frontend/components/featured'
import QianCard from '@/frontend/components/card'

export default {
  name: 'customArticle',
  components: {
    QianTags,
    QianFeatured,
    QianCard
  },
  data () {
    return {
      article: ''
    }
  },
  computed: {
    ...mapState({
      tagList: state => state.app.tagList
    })
  },
  props: {
    id: [Number, String]
  },
  created () {
    if (this.tagList.length <= 0) {
      this.$store.dispatch('getTagList')
    }
    getArticleById(this.id).then(res => {
      this.article = res.data.code === 1001 ? res.data.data.html : '获取文章失败'
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss">
  @import '@/styles/common/var.scss';
  @import '@/styles/mixins/mixins.scss';
  // @import '~/plugins/editor.md-master/css/editormd.min.css';
  // @import '~/static/plugins/editor.md-master/css/google_code_prettify_themes/vscode-default.min.css';

  .article-content {
    width: 100%;
    // margin: 20px auto;
    // border-radius: $--border-radius-base;
  }
  @include b(container) {
    @include m(mgb) {
      margin-bottom: 40px;
    }
  }
</style>

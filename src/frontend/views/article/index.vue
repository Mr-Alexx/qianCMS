<template>
  <article v-html="article" class="article-content markdown-body editormd-preview-container"></article>
</template>

<script>
export default {
  name: 'customArticle',
  data () {
    return {
      article: ''
    }
  },
  props: {
    id: [Number, String]
  },
  created () {
    console.log(this.id)
    this.$http('http://localhost:3000/api/v1/article/id/' + this.id).then((res) => {
      this.article = res.data.data.html
      console.log(this.article)
      console.log(this)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss">
  .article-content {
    width: 1080px;
    margin: 20px auto;
  }
</style>

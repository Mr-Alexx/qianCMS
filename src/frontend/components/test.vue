<template>
  <section>
    <a href="manage.html" class="qian-button">后台管理页面入口</a>
    <p>{{test}}</p>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      test: '',
      msg: '后台管理页面入口'
    }
  },
  mounted () {
    const ENV = process.env.NODE_ENV
    const baseUrl = ENV === 'development' ? 'http://localhost:3000/api/' : 'http://imqian.com/api/'
    console.log(baseUrl)
    this.$http.get(baseUrl + 'v1/article/1').then(data => {
      console.log('获取指定id文章：', data)
    })
    this.$http.get(baseUrl + 'v1/article/0/articles').then(data => {
      console.log('获取指定标签的所有文章：', data)
      this.test = data.data
    })
    this.$http.get(baseUrl + 'v1/article/1/2').then(data => {
      console.log('获取分页数据：', data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @mixin transition ($transition) {
    -webkit-transition: $transition;
    -moz-transition: $transition;
    -ms-transition: $transition;
    -o-transition: $transition;
    transition: $transition;
  }
  .qian-button {
    $time: .3s;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: blueviolet;
    text-decoration: none;
    color: #fff;
    margin-top: 0;
    display: inline-block;
    // display: none;
    @include transition(all $time linear);
    &:hover{
      opacity: .7;
      margin-top: -1px;
    }
  }
</style>

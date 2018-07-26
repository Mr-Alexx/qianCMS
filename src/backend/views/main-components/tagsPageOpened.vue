<template>
  <div class="tags-con">
    <div class="tags-inner-scroll-body">
      <tag
        v-for="(item, i) in 10" :key="i"
        @click.native="changeTag($event, i)" closable
        @on-close="handleCloseTag($event, i)"
        :active="activeTag === i">
        首页{{item}}
      </tag>
    </div>
    <div class="close-con">
      <el-dropdown @command="handleTagsOption">
        <span class="el-dropdown-link">
          <el-button type="primary" size="mini">
            标签选项
            <i class="el-icon-caret-bottom"></i>
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
          <el-dropdown-item command="closeOthers" divided>关闭其它</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import tag from '@/backend/components/tag.vue'

export default {
  name: 'tagsPageOpened',
  components: {
    tag
  },
  data () {
    return {
      activeTag: 0 // 激活的tag
    }
  },
  props: {
    pageTagsList: Array
  },
  methods: {
    handleTagsOption (command) {
      this.$alert(command)
    },
    changeTag (e, i) {
      if (e.target.tagName !== 'SPAN') {
        return
      }
      this.activeTag = i
    },
    handleCloseTag (e, i) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
  @import '@/backend/styles/colors.scss';
  @import '@/backend/styles/mixins.scss';
  .tags-con{
    position: relative;
    padding: 4px 10px;
    background-color: #f0f0f0;
    padding-right: 120px;
    // @include box-shadow();
  }
  .tags-inner-scroll-body{
    overflow: visible;
    white-space: nowrap;
  }
  .close-con{
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 2;
    width: 110px;
    text-align: center;
    background-color: rgba(255, 255, 255, .6);
    @include box-shadow(-3px 1px 15px 3px rgba(0, 0, 0, 0.1));
    .el-button{
      margin-top: 6px;
    }
  }
  .qian-tag{
    margin-right: 5px;
  }
</style>

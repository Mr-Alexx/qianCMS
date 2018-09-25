<template>
  <div class="tags-con">
    <div class="tags-ctrl-left">
      <el-button icon="el-icon-arrow-left" @click="scroll(1)"></el-button>
    </div>
    <div
      class="tags-scroll-container"
      @mousewheel="handleScroll"
      @DOMMouseScroll="handleScroll"
      ref="scrollCon">
      <div class="tags-scroll-body" ref="scrollBody" :style="{left: tagLeft + 'px'}">
        <transition-group name="tag-scroll-transition">
          <tag
            v-for="(item, i) in 20" :key="i"
            @click.native="changeTag($event, i)" closable
            @on-close="handleCloseTag($event, i)"
            :active="activeTag === i">
            首页{{item}}
          </tag>
        </transition-group>
      </div>
    </div>
    <div class="tags-ctrl-right">
      <el-button icon="el-icon-arrow-right" @click="scroll(-1)"></el-button>
      <el-dropdown @command="handleTagsOption">
        <span class="el-dropdown-link">
          <el-button icon="el-icon-circle-close-outline"></el-button>
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
      tagLeft: 0,
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
      if (i !== 0 || i !== this.pageTagsList.length - 1) {
        this.moveTag(e)
      }
      this.activeTag = i
    },
    handleCloseTag (e, i) {
      console.log(e)
    },

    /**
     * @description 处理滚动事件,兼容firefox(DOMMouseScroll)
     */
    handleScroll (e) {
      let direction = 0
      // 统一firefox和其它浏览器的方向判断, 负数为下滚,正数为上滚
      // wheelDelta是其它浏览器的(- => 下滚, +)
      // e.detail是firefox的(+ => 下滚, -)
      if (e.type.match(/DOMMouseScroll|mouseWheel/i)) {
        direction = e.wheelDelta ? e.wheelDelta : -(e.detail || 0)
      }
      this.scroll(direction)
    },
    /**
     * @description 左右滚动方法
     * @param {Number} direction 滚动方向 负数: 下滚, 正数: 上滚
     */
    scroll (direction = 0) {
      const step = 100
      if (direction > 0) { // 上滚
        const left = Math.abs(this.tagLeft)
        // 左移距离 >= step时,右移step距离
        // 左移距离 在(0, step)时, 右移0(回原点)
        if (left >= step) {
          this.tagLeft += step
        } else if (left > 0 && left < step) {
          this.tagLeft = 0
        }
      } else if (direction < 0) { // 下滚
        // 滚动过后的长度: scrollBody总长 - 左移距离
        const scrollBodyOffset = this.$refs.scrollBody.offsetWidth
        const scrollConOffset = this.$refs.scrollCon.offsetWidth
        const w = scrollBodyOffset - Math.abs(this.tagLeft)
        // 当剩余长度 > 容器长度时才滚动
        if (w > scrollConOffset) {
          // 最后滚动的时候,取滚动距离与step两者的最小值
          this.tagLeft -= (Math.min(step, w - scrollConOffset))
        }
      } else {
        console.error('您的浏览器不支持DOMMouseScroll或mouseWheel方法')
      }
    },

    /**
     * @description 移动tag方法,一般当tag位于最左或者最右侧时才调用
     * @param {Object} tag tag dom event对象
     */
    moveTag (tag) {
      console.log(tag)
    }
  }
}
</script>

<style lang="scss">
  @import '@/backend/styles/colors.scss';
  @import '@/backend/styles/mixins.scss';
  .tags-con{
    height: 38px;
    position: relative;
    padding-left: 28px;
    padding-right: 60px;
    background-color: #f0f0f0;
    // padding-right: 120px;
    // @include box-shadow();
  }
  .tags-ctrl {
    &-left, &-right {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 2;
      .el-button {
        padding-left: 0;
        padding-right: 0;
        width: 28px;
        height: 100%;
        border-radius: 0;
        font-size: 18px;
        font-weight: 800;
      }
    }
    &-left {
      left: 0;
      width: 28px;
    }
    &-right {
      right: 0;
      width: 60px;
      .el-button, .el-dropdown {
        float: left;
      }
      .el-dropdown {
        height: 100%;
        .el-button {
          border-left: none;
          width: 32px;
          height: 100%;
        }
      }
    }
  }
  .tags-scroll {
    &-container {
      position: relative;
      overflow: hidden;
      height: 100%;
    }
    &-body {
      padding: 3px;
      overflow: visible;
      white-space: nowrap;
      position: absolute;
      height: 100%;
      left: 0;
      @include transition(left, .5s);
      .qian-tag {
        margin-right: 4px;
      }
    }
  }
</style>

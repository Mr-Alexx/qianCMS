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
            v-for="(item, i) in pageTagsList"
            :key="i"
            :ref="item.name"
            @click.native="changeTag($event, i, item)"
            :closable="item.name !== 'home_index'"
            @on-close="handleCloseTag($event, i, item)"
            :active="activeTag === item.name">
            {{item.meta.title}}
          </tag>
        </transition-group>
      </div>
    </div>
    <div class="tags-ctrl-right">
      <el-button icon="el-icon-arrow-right" @click="scroll(-1)"></el-button>
      <el-dropdown @command="closeTags">
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
  props: {
    pageTagsList: Array
  },
  data () {
    return {
      tagLeft: 0,
      step: 100 // tag容器每次移动步长
    }
  },
  computed: {
    activeTag () {
      return this.$store.state.app.currentPageName
    },
    tagsList () {
      return this.$store.state.app.openedPageList
    }
  },
  watch: {
    '$route' (to) {
      // 使用nextTick,防止添加时dom未获取
      this.$nextTick(() => {
        this.moveTag(this.$refs[to.name][0].$el)
      })
    }
  },
  methods: {
    handleTagsOption (command) {
      this.$alert(command)
    },
    changeTag (e, i, route) {
      // 点击到关闭按钮或者已经是激活状态,则跳过
      if (e.target.tagName !== 'SPAN' || e.target.className.match(/active/ig)) {
        return
      }
      if (i !== 0 || i !== this.pageTagsList.length - 1) {
        this.moveTag(this.$refs[route.name][0].$el)
      }
      this.$router.push({
        name: route.name
      })
    },
    handleCloseTag (e, i, route) {
      this.$store.dispatch('removeTag', {route, router: this.$router})
      // 覆盖当前的路由
    },
    /**
     * @description 关闭所有和关闭其它方法
     */
    closeTags (type) {
      const home = this.$store.state.app.openedPageList[0]
      if (type === 'closeAll') {
        // 关闭全部(保留主页)
        // this.$store.commit('SET_OPENEDPAGELIST', [home])
        this.$store.dispatch('setOpenedPageList', [home])
        this.$store.dispatch('setCurrentpageName', home.name)
        this.$router.push({
          name: home.name
        })
      } else {
        // 关闭其它(保留主页和当前激活的)
        const existPage = this.$store.state.app.openedPageList.filter(v => {
          return v.name === home.name || v.name === this.$store.state.app.currentPageName
        })
        // this.$store.commit('SET_OPENEDPAGELIST', existPage)
        this.$store.dispatch('setOpenedPageList', existPage)
      }
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
      if (direction > 0) { // 上滚
        const left = Math.abs(this.tagLeft)
        // 左移距离 >= this.step时,右移this.step距离
        // 左移距离 在(0, this.step)时, 右移0(回原点)
        if (left >= this.step) {
          this.tagLeft += this.step
        } else if (left > 0 && left < this.step) {
          this.tagLeft = 0
        }
      } else if (direction < 0) { // 下滚
        // 滚动过后的长度: scrollBody总长 - 左移距离
        const scrollBodyOffset = this.$refs.scrollBody.offsetWidth
        const scrollConOffset = this.$refs.scrollCon.offsetWidth
        const w = scrollBodyOffset - Math.abs(this.tagLeft)
        // 当剩余长度 > 容器长度时才滚动
        if (w > scrollConOffset) {
          // 最后滚动的时候,取滚动距离与this.step两者的最小值
          this.tagLeft -= (Math.min(this.step, w - scrollConOffset))
        }
      } else {
        console.error('您的浏览器不支持DOMMouseScroll或mouseWheel方法')
      }
    },

    /**
     * @description 移动tag方法,一般当tag位于最左或者最右侧时才调用
     * @param {Object} tag dom对象
     */
    moveTag (tag) {
      const offsetLeft = tag.offsetLeft
      const w = offsetLeft + tag.offsetWidth
      const scrollConOffset = this.$refs.scrollCon.offsetWidth
      if (offsetLeft < -this.tagLeft) {
        // 位于可视区域左侧
        this.tagLeft = 4 - offsetLeft
      } else if ((offsetLeft > -this.tagLeft) && (w < -this.tagLeft + scrollConOffset)) {
        // 位于可视区域
      } else {
        // 位于可视区域右侧
        this.tagLeft = -(w - scrollConOffset + 4)
      }
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
        border-left: none;
        border-bottom: none;
      }
    }
    &-left {
      left: 0;
      width: 28px;
      .el-button {
        border-right: none;
        @include box-shadow(2px 2px 1px 1px rgba(100, 100, 100, 0.1));
      }
    }
    &-right {
      right: 0;
      width: 60px;
      @include box-shadow(-2px 2px 1px 1px rgba(100, 100, 100, 0.1));
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

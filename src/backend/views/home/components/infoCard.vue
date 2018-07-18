<template>
  <el-card
    :shadow="shadow" class="info-icon-card-con"
    :style="{width: cardWidth, height: cHeight}">
    <el-row :gutter="0">
      <el-col
        :span="8" :style="{backgroundColor: color, lineHeight: cHeight}"
        class="info-icon-card-icon">
        <i
        :class="['iconfont', icon]"
        :style="{fontSize: iconSize + 'px'}"></i>
      </el-col>
      <el-col :span="16" class="info-icon-card-content">
        <div>
          <!-- 计数 -->
          <count-up
            :id-name="idName"
            :end-val="endVal"
            :color="color"
            :countSize="countSize"
            :countWeight="countWeight"></count-up>
          <!-- 介绍文本 -->
          <span>{{introText || 'dsfds'}}</span>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import countUp from './countUp.vue'

const _ = require('lodash/core')

export default {
  name: 'infoCard',
  components: {
    countUp
  },
  props: {
    // 给countUp指定一个id，countup插件获取用
    idName: String,
    // 介绍文本
    introText: String,
    // 数值
    endVal: Number,
    // 数值的文字大小
    countSize: {
      type: Number,
      default: 30
    },
    // 文字加粗成都
    countWeight: {
      type: Number,
      default: 700
    },
    color: {
      type: String,
      default: '#409EFF'
    },
    icon: {
      type: String,
      default: 'icon-md-person'
    },
    shadow: {
      type: String,
      default: 'always'
    },
    // 卡片高度
    cardHeight: {
      type: [Number, String],
      default: 100
    },
    // 卡片宽度，支持百分比
    cardWidth: {
      type: [Number, String],
      default: '100%'
    },
    // 图标大小
    iconSize: {
      type: Number,
      default: 40
    }
  },
  computed: {
    // 对于数值型，加px返回；对于字符串型，有%直接返回，否则加%返回
    cHeight () {
      if (_.isNumber(this.cardHeight)) {
        return this.cardHeight + 'px'
      } else if (_.isString(this.cardHeight)) {
        if (this.cardHeight.indexOf('%') !== -1) {
          return this.cardHeight
        } else {
          return this.cardHeight + '%'
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/backend/styles/colors.scss';
  @import '@/backend/styles/variable.scss';
  @import '@/backend/styles/mixins.scss';
  $ic: info-icon-card;
  .#{$ic}-con{
    .el-card__body{
      padding: 0;
      height: 100%;
      @include clearfix();
      text-align: center;
      >div{
        // float: left;
        height: 100%;
      }
    }
  }
  .#{$ic}-icon{
    color: #fff;
    background-color: $primary;
  }
  .#{$ic}-content{
    position: relative;
    height: 100%;
    >div{
      @include psc();
      width: 100%;
      >p{
        padding-top: 5px;
      }
    }
    color: $secondary-font;
    font-size: $small-font;
  }
</style>

<template>
  <el-card>
    <header slot="header">
      近期天网站访问量
    </header>
    <div
      :id="idName"
      :style="{width: cWidth, height: cHeight}"></div>
  </el-card>
</template>

<script>
export default {
  name: 'viewChart',
  data () {
    return {
      option: {
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true // 刻度与标签对齐
          }
        },
        yAxis: {
          name: '访问量 (次)',
          type: 'value'
        },
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: this.renderData,
            color: this.barColor
          }
        ]
      }
    }
  },
  props: {
    // width 和 height
    cWidth: {
      type: String,
      default: '100%'
    },
    cHeight: {
      type: String,
      default: '200px'
    },
    // bar color
    barColor: {
      type: Array,
      default: () => ['#409EFF']
    },
    // 指定echarts图标外层dom元素id
    idName: {
      type: String,
      default: 'view-chart'
    },
    // 渲染数据
    renderData: {
      type: [Object, Array],
      default: () => []
    }
  },
  mounted () {
    // 初始化图表
    this.$echarts(this.idName, this.option)
  }
}
</script>

<style lang="scss">

</style>

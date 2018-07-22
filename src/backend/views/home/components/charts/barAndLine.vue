<template>
  <el-card>
    <header slot="header">
      <slot name="icon" v-if="$slots.icon"></slot> {{title}}
    </header>
    <div
      :id="idName"
      :style="{width: cWidth, height: cHeight}"></div>
  </el-card>
</template>

<script>
export default {
  name: 'chart',
  data () {
    return {
      option: {
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'line' // 'cross'
          }
        },
        grid: {
          top: 30,
          left: '3%',
          right: '4%',
          bottom: 5,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true // 刻度与标签对齐
          }
        },
        yAxis: [
          // bar y
          {
            name: this.barName,
            type: 'value'
          },
          // line y
          {
            name: this.lineName,
            type: 'value',
            show: this.showLine
          }
        ],
        series: [
          {
            name: this.lineName,
            type: 'bar',
            data: this.barData,
            color: [this.barColor],
            label: {
              normal: {
                show: false
              }
            }
          },
          {
            color: [this.lineColor],
            show: this.showLine,
            name: this.barName,
            type: 'line',
            yAxisIndex: 1,
            data: this.lineData,
            label: {
              normal: {
                show: true,
                formatter: '{c}%'
              }
            }
          }
        ]
      }
    }
  },
  props: {
    // 标题
    title: String,
    // 柱状图名称
    barName: String,
    // 折线图名称
    lineName: String,
    // 控制是否显示折线
    showLine: {
      type: Boolean,
      default: false
    },
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
      type: String,
      default: '#409EFF' // primary
    },
    // line color
    lineColor: {
      type: String,
      default: '#F56C6C' // danger
    },
    // 指定echarts图标外层dom元素id
    idName: {
      type: String,
      default: 'view-chart'
    },
    // 渲染柱状图数据
    barData: {
      type: [Object, Array],
      default: () => []
    },
    // 渲染折线图数据
    lineData: {
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

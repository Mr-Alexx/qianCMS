<template>
  <div
    :style="{color: color, fontSize: countSize + 'px', fontWeight: countWeight}"
    :class="className">
    <span v-cloak :id="idName">{{startVal}}</span><span>{{unit}}</span>
    <slot name="intro"></slot>
  </div>
</template>

<script>
import CountUp from 'countup'

export default {
  name: 'countUp',
  data () {
    return {
      unit: '',
      demo: {}
    }
  },
  props: {
    idName: String,
    className: {
      type: String,
      default: ''
    },
    countSize: {
      type: Number,
      default: 30
    },
    countWeight: {
      type: Number,
      default: 700
    },
    color: String,
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2
    },
    delay: {
      type: Number,
      default: 500
    },
    introText: [String, Number],
    options: {
      type: Object,
      default () {
        return {
          useEasing: true,
          useGrouping: true,
          separator: ',', // 分隔符
          decimal: '.' // 小数点
        }
      }
    }
  },
  mounted () {
    // 延时执行初始动画
    this.$nextTick(() => {
      setTimeout(() => {
        const res = this.transformValue(this.endVal)
        const endVal = res.val
        this.unit = res.unit
        let demo = {}
        // 实例化countup插件
        this.demo = demo = new CountUp(this.idName, this.startVal, endVal, this.decimals, this.duration, this.options)
        // 没有报错就开始计数
        if (!demo.error) {
          demo.start()
        }
      }, this.delay)
    })
  },
  methods: {
    // 转化数值和单位方法
    transformValue (val) {
      let endVal = 0
      let unit = ''
      if (val < 1000) {
        endVal = val
      } else if (val >= 1000 && val < 1000000) {
        endVal = parseInt(val / 1000)
        unit = 'K+'
      } else if (val >= 1000000 && val < 10000000000) {
        endVal = parseInt(val / 1000000)
        unit = 'M+'
      } else {
        endVal = parseInt(val / 1000000000)
        unit = 'B+'
      }
      return {
        val: endVal,
        unit: unit
      }
    }
  }
}
</script>

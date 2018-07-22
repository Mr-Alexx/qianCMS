<template>
  <el-row>
    <el-col :md="16" :xs="24">
       <div
        :id="idName"
        :style="{width, height}">
      </div>
    </el-col>
    <el-col :md="8" :xs="0">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        :max-height="parseInt(height)"
        size="mini"
        border>
        <el-table-column
          type="index"
          width="40">
        </el-table-column>
        <el-table-column
          property="area"
          label="地域分布">
        </el-table-column>
        <el-table-column
          property="times"
          label="浏览次数"
          sortable>
        </el-table-column>
        <el-table-column
          property="percentage"
          label="次数占比"
          sortable>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import option from './mapOption.js'

export default {
  name: 'bmap',
  data () {
    return {
      tableData: [{
        area: '广东',
        times: '234',
        percentage: '10%'
      }, {
        area: '北京',
        times: '4324',
        percentage: '11%'
      }, {
        area: '上海',
        times: '11',
        percentage: '12%'
      }, {
        area: '江苏',
        times: '22',
        percentage: '1%'
      }]
    }
  },
  props: {
    idName: {
      type: String,
      default: 'china-map'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
    // mapData: {
    //   type: [Array, Object],
    //   required: true
    // }
  },
  mounted () {
    this.$echarts(this.idName, option)
    for (let i = 0; i < 10; i++) {
      this.tableData.push({
        area: 'area' + i,
        times: i,
        percentage: i + '%'
      })
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(val)
    }
  }
}
</script>

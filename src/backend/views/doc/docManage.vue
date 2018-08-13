<template>
  <section>
    <h5>文档管理</h5>
    <!-- 功能组 -->
    <el-row>
      <el-col :md="12" :sm="24">
        <el-button-group>
          <el-button type="primary" size="mini">添加</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </el-button-group>

        <el-button-group>
          <el-button type="primary" size="mini">启用</el-button>
          <el-button type="primary" size="mini">禁用</el-button>
        </el-button-group>
      </el-col>
      <el-col :md="12" :sm="24">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-cascader
              expand-trigger="click"
              :options="categories"
              v-model="selectCategory">
            </el-cascader>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="请输入关键字" v-model="searchVal">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'docManage',
  props: {
    categories: {
      type: Array,
      default () {
        return [
          {
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则'
            }]
          }
        ]
      }
    }
  },
  data () {
    return {
      searchVal: '',
      selectCategory: []
    }
  }
}
</script>

<style>

</style>

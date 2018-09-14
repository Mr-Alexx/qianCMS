<template>
  <div>
    <el-row>
      <!-- 添加树 -->
      <el-col :span="24">
        <el-button @click="dialogTableVisible = true" type="primary">添加</el-button>
        <el-dialog title="文档分类" :visible.sync="dialogTableVisible">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="right"
            size="small"
            label-width="80px">
            <el-form-item label="父类">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="类名">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="显示">
              <el-switch></el-switch>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group>
                <el-radio>文章</el-radio>
                <el-radio>图片</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="模板">
              <el-select>
                <el-option label="默认"></el-option>
                <el-option label="炫酷"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>

      <!-- 类别树 -->
      <el-col :span="24">
        <el-tree
          :data="categoryTree"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false">
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{node.data.name}}</span>
            <span class="custom-tree-node__button">
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                circle></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle></el-button>
            </span>
          </div>
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      dialogTableVisible: false, // dialog显示/隐藏
      form: {

      },
      rules: {

      }
    }
  },
  computed: {
    categoryTree () {
      return this.$store.state.doc.categories
    }
  },
  async created () {
    if (this.categoryTree <= 0) {
      await this.$store.dispatch('getCategories')
      console.log(this.categoryTree)
    }
  }
}
</script>

<style lang="scss">
  .custom-tree-node {
    -ms-flex: 1;
    flex: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    &__button {
      .el-button {
        padding: 2px;
        font-size: 12px;
      }
      .el-button+.el-button {
        margin-left: 3px;
      }
    }
  }
</style>

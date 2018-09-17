<template>
  <div>
    <el-row>
      <!-- 添加树 -->
      <el-col :span="24">
        <el-button @click="dialogTableVisible = true" type="primary">添加</el-button>
        <category-form
          :options="categoryTree"
          @save="addCategory"
          title="文档分类"
          :visible="dialogTableVisible"></category-form>
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
import categoryForm from './categoryForm.vue'

export default {
  name: 'category',
  components: {
    categoryForm
  },
  data () {
    return {
      dialogTableVisible: false // dialog显示/隐藏
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
  },
  methods: {
    /**
     * @description 子组件category-form保存按钮触发的事件
     */
    addCategory (form) {
      const vue = this
      console.log(form)
      this.$store.dispatch('addCategory', {form, vue})
      // 关闭form
      this.dialogTableVisible = false
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

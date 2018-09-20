<template>
  <div>
    <el-row>
      <!-- 添加树 -->
      <el-col :span="24">
        <el-button @click="showCategoryDialog" type="primary">添加</el-button>
        <category-form
          :options="categoryTree"
          title="文档分类"
          :form-data="category.form"
          :type="category.type"
          :isEdit="category.isEdit"
          :visible="category.dialogVisible"></category-form>
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
                @click="addSubCategory(node, data)"
                circle></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit-outline"
                @click="editCategory(node, data)"
                circle></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteCategory(data)"
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
  computed: {
    category () {
      return this.$store.state.doc.category
    },
    categoryTree () {
      return this.$store.state.doc.category.categoryTree
    }
  },
  created () {
    if (this.categoryTree <= 0) {
      this.$store.dispatch('getCategories')
    }
  },
  methods: {
    showCategoryDialog () {
      this.$store.dispatch('showCategoryDialog')
    },

    /**
     * @description 添加子分类
     */
    addSubCategory (node, data) {
      let parent = [data.id]
      this.getNodeParent(node, parent)
      this.$store.dispatch('showCategoryDialog', {
        isEdit: false,
        type: 'sub',
        form: {parent}
      })
    },

    /**
     * @description 编辑分类
     */
    editCategory (node, data) {
      let parent = [data.id]
      this.getNodeParent(node, parent)
      parent.splice(-1, 1)
      this.$store.dispatch('showCategoryDialog', {
        isEdit: true,
        type: 'sub',
        form: Object.assign(data, {parent})
      })
    },
    getNodeParent (node, parent) {
      if (node.parent !== null && node.parent.key !== undefined) {
        parent.unshift(node.parent.key)
        this.getNodeParent(node.parent, parent)
      }
    },

    /**
     * @description 删除分类
     */
    deleteCategory (data) {
      this.$confirm(`是否删除分类 ${data.name} ?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(async () => {
        const res = await this.$store.dispatch('deleteCategory', data.id)
        this.$message({
          message: res.data.message,
          type: res.data.code === 1001 ? 'success' : 'error'
        })
        if (res.data.code !== 1001) return
        // 更新分类树
        this.$store.dispatch('getCategories')
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1000
        })
      })
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

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button-group>
          <el-button type="primary" @click="addTag">添加</el-button>
          <el-button type="primary" @click="deleteTag(selection)">删除</el-button>
        </el-button-group>
        <tag-form
          :formState="formState"></tag-form>
      </el-col>
      <!-- 标签表格 -->
      <el-col :span="24">
        <el-table
          :data="tags"
          @selection-change="handleSelect">
          <el-table-column
            type="selection"
            width="50"></el-table-column>
          <el-table-column
            label="编号"
            prop="id"></el-table-column>
          <el-table-column
            label="名称"
            prop="name"></el-table-column>
          <el-table-column
            label="创建时间"
            prop="create_time">
            <template slot-scope="scope">
              <span>
                {{scope.row.create_time | timeFilter}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
            prop="update_time">
            <template slot-scope="scope">
              <span>
                {{scope.row.update_time | timeFilter}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="action">
            <template slot-scope="scope">
              <el-button @click="editTag(scope.$index, scope.row)">修改</el-button>
              <el-button
                type="danger"
                @click="deleteTag([scope.row])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tagForm from './tagForm.vue'
import {
  deleteTag
} from '@/backend/api/article.js'

export default {
  name: 'tags',
  components: {
    tagForm
  },
  data () {
    return {
      selection: []
    }
  },
  computed: {
    tags () {
      return this.$store.state.doc.tag.tags
    },
    formState () {
      return this.$store.state.doc.tag.formState
    }
  },
  created () {
    // 手动更新页面时或者第一次时,获取tags
    if (this.tags.length <= 0) {
      this.$store.dispatch('getTags')
    }
  },
  methods: {
    handleSelect (selection) {
      this.selection = selection
    },
    addTag () {
      this.$store.dispatch('showTagDialog')
    },
    editTag (index, tag) {
      this.$store.dispatch('showTagDialog', {
        isEdit: true,
        form: tag,
        visible: true
      })
    },
    /**
     * @description 删除标签
     * @param {Array} tags 标签数组
     */
    async deleteTag (tags) {
      this.$confirm(`是否删除该标签?`, '危险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(async () => {
        const ids = tags.map(v => v.id)
        const res = await deleteTag(ids)
        this.$message({
          message: res.data.message,
          type: res.data.code === 1001 ? 'success' : 'error'
        })
        // 更新tags
        if (res.data.code === 1001) {
          this.$store.dispatch('getTags')
        }
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

</style>

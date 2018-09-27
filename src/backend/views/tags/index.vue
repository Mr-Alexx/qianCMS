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
          :data="tagList"
          @selection-change="handleSelect"
          size="primary">
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
            prop="action"
            fixed="right"
            width="130px">
            <template slot-scope="scope">
              <el-button @click="editTag(scope.$index, scope.row)">修改</el-button>
              <el-button
                type="danger"
                @click="deleteTag([scope.row])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 分页标签 -->
      <el-col :span="24">
        <el-pagination
          class="qian-manage-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tags.length">
        </el-pagination>
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
      selection: [],
      currentPage: 1,
      pageSize: 8
    }
  },
  computed: {
    tags () {
      return this.$store.state.doc.tag.tags
    },
    tagList () {
      if (this.tags.length > 0) {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        return this.tags.slice(start, end)
      }
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
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
          // 判断当前分页下是不是只有这唯一一条记录
          if (this.tagList.length === 1 && this.currentPage !== 1) {
            --this.currentPage
          }
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

<template>
  <section>
    <!-- 功能组 -->
    <el-row class="qian-manage-menu">
      <el-col :md="12" :sm="24" class="qian-manage-menu__group">
        <el-button-group>
          <el-button type="primary" size="mini" class="qian-button--add">
            <router-link :to="{name: 'document_edit'}">添加</router-link>
          </el-button>
          <el-button type="primary" size="mini" @click="deleteArticle">删除</el-button>
        </el-button-group>

        <el-button-group>
          <el-button type="primary" size="mini" @click="updateArticleStatus({display: 1})">显示</el-button>
          <el-button type="primary" size="mini" @click="updateArticleStatus({display: 0})">隐藏</el-button>
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
    <!-- 文章列表 -->
    <el-row>
      <el-col :span="24">
        <el-table
          :data="articles"
          size="primary"
          @selection-change="handleSelect">
          <el-table-column
            type="selection"
            width="50"></el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="80"></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="260"></el-table-column>
          <el-table-column
            prop="update_time"
            label="更新时间"
            width="130">
            <template slot-scope="scope">
              <span>
                {{scope.row.update_time | timeFilter}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="文档类别"
            width="100"></el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            width="80"></el-table-column>
          <el-table-column
            prop="view"
            label="点击数"
            width="100"></el-table-column>
          <el-table-column
            prop="comments"
            label="评论数"
            width="100"></el-table-column>
          <el-table-column
            prop="display"
            label="显示状态">
            <template slot-scope="scope">
              <i :class="`qian-cell-icon el-icon-${scope.row.display ? 'circle-check' : 'remove'}`"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作"
            fixed="right"
            width="140">
            <template slot-scope="scope">
              <el-button @click="edit(scope.$index, scope.row)">修改</el-button>
              <el-button
                type="danger"
                @click="deleteArticle(false, scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <el-pagination
          class="qian-manage-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="articleList.length">
        </el-pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import {
  deleteArticle,
  updateStatus
} from '@/backend/api/article.js'

export default {
  name: 'document',
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
      selectCategory: [],
      selectArticleRows: [], // 选中的表行
      pageSize: 8, // 每页数量
      currentPage: 1 // 当前页数
    }
  },
  computed: {
    ...mapState({
      articleList: state => state.doc.articleList
    }),
    articles () {
      if (this.articleList.length > 0) {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        return this.articleList.slice(start, end)
      }
    }
  },
  created () {
    this.$store.dispatch('getArticleList')
  },
  methods: {
    // 处理文章列表checkbox选择
    handleSelect (selection) {
      this.selectArticleRows = selection
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },

    /**
     * @description 编辑文章
     */
    edit (index, row) {
      this.$router.push({
        name: 'document_edit',
        query: {
          id: row.id
        }
      })
    },

    /**
     * @description 删除文章
     * @param {Boolean} deleteAll 是否是删除全部
     */
    deleteArticle (deleteAll = true, index, row) {
      const rows = deleteAll ? this.selectArticleRows : [row]
      if (rows.length <= 0) return
      this.$confirm('是否将该文章移入回收站?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ids = rows.map(row => {
          return row.id
        })
        try {
          const res = await deleteArticle(ids)
          if (res.data.code === 1001) {
            // 判断当前分页下是不是只有这唯一一条记录
            if (this.articles.length === 1 && this.currentPage !== 1) {
              --this.currentPage
            }
            // 更新文章列表
            this.$store.dispatch('getArticleList', this)
          }
          this.$message({
            message: res.data.message,
            type: res.data.code === 1001 ? 'success' : 'error'
          })
        } catch (err) {
          console.log(err)
          this.$message({
            message: 'failed',
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1000
        })
      })
    },

    /**
     * @description 更新文章状态
     */
    updateArticleStatus (fieldObj, row) {
      const articles = row ? [row] : this.selectArticleRows
      if (articles.length <= 0) return
      const msg = fieldObj.display === 1 ? '显示' : '隐藏'
      this.$confirm(`是否${msg}所选文章`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ids = articles.map(v => v.id)
        try {
          const res = await updateStatus({ids, fieldObj})
          if (res.data.code === 1001) {
            // 更新文章列表
            this.$store.dispatch('getArticleList', this)
          }
          this.$message({
            message: res.data.message,
            type: res.data.code === 1001 ? 'success' : 'error'
          })
        } catch (err) {
          console.log(err)
          this.$message({
            message: 'failed',
            type: 'error'
          })
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
  @import '@/backend/styles/colors.scss';
  $prefix: qian;
  .#{$prefix}-manage {
    &-menu {
      &__title {
        font-size: 14px;
        padding: 10px 0;
      }
    }
    &-menu__group {
      padding-bottom: 20px;
      a {
        color: #fff;
      }
    }
    // &-pagination {
    //   text-align: center;
    //   padding-top: 15px;
    // }
  }
  .qian-cell-icon {
    &.el-icon-circle-check {
      color: $success;
    }
    &.el-icon-remove {
      color: $danger;
    }
  }
  .qian-button--add {
    padding: 0;
    a {
      display: inline-block;
      padding: 7px;
    }
  }
</style>

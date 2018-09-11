<template>
  <section>
    <el-form
      ref="form" :model="form" :rules="rules"
      label-position="right" label-width="80px" size="small" >
      <el-form-item label="文档类别">
        <el-radio-group v-model="form.docType">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2" disabled="">图片</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章类别" prop="category_id">
        <el-select v-model="form.category" placeholder="请选择文章类别">
          <el-option label="js" :value="{id: 1, name: 'js'}"></el-option>
          <el-option label="vue" :value="{id: 2, name: 'vue'}"></el-option>
          <el-option label="node" :value="{id: 3, name: 'node'}"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="小标题" prop="smtitle">
        <el-input v-model="form.smtitle" placeholder="请输入小标题"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-radio-group v-model="form.source">
          <el-radio label="原创"></el-radio>
          <el-radio label="转载"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch v-model="form.display"></el-switch>
      </el-form-item>
      <!-- 标签选择 -->
      <el-form-item label="标签" prop="_tags">
        <el-select v-model="form._tags" multiple placeholder="请选择标签">
          <el-option label="js" :value="1"></el-option>
          <el-option label="vue" :value="2"></el-option>
          <el-option label="node" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="thumbnail-uploader"
          action="http://localhost:3000/api/v1/upload/image"
          :show-file-list="false"
          :on-success="thumbnailUploadSuccess"
          :before-upload="beforeThumbnailUpload">
          <img v-if="form.thumbnail" :src="form.thumbnail" class="thumbnail">
          <i v-else class="el-icon-plus thumbnail-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 摘要 -->
      <el-form-item label="文章摘要" prop="summary">
        <el-input type="textarea" v-model="form.summary"></el-input>
      </el-form-item>
      <!-- markdown编辑器 -->
      <el-form-item label="文章内容" required>
        <editor-md
          editor-id="article-editor"
          :init-data="initEditorContent"
          :init-data-delay="0"
          :onchange="contentOnChange"
          :config="{
            placeholder: '请输入文章内容'
          }"></editor-md>
      </el-form-item>
      <!-- 确定/取消 -->
      <el-form-item>
        <el-button
          type="primary" @click="onSubmit('form')"
          :loading="requesting">
          {{isExist ? '更新' : '添加'}}
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import editorMd from './editorMd.vue'
import {host} from '@/backend/config/index.js'
import {
  getArticle,
  addArticle,
  editArticle
} from '@/backend/api/article.js'

export default {
  name: 'docEdit',
  components: {
    editorMd
  },
  data () {
    return {
      requesting: false,
      isExist: false,
      form: {
        docType: 1,
        category: {id: 1, name: 'js'},
        title: '',
        smtitle: '',
        source: '原创',
        display: true,
        _tags: [],
        tags: '',
        thumbnail: '',
        summary: '',
        // 文章用
        markdown: '',
        html: ''
      },
      rules: {
        category: [
          {required: true, message: '请选择文章类别', trigger: 'change'}
        ],
        title: [
          {required: true, trigger: 'blur', message: '请填写标题'},
          {min: 2, max: 20, message: '长度在2～20个字符', trigger: 'blur'}
        ],
        smtitle: [
          {required: true, trigger: 'blur', message: '请填写小标题'},
          {min: 2, max: 20, message: '长度在2～20个字符', trigger: 'blur'}
        ],
        _tags: [
          {required: true, trigger: 'change', message: '请至少选择一个标签'}
        ],
        summary: [
          {required: true, trigger: 'blur', message: '请填写文章摘要'},
          {min: 20, max: 200, message: '长度在20～200个字符', trigger: 'blur'}
        ]
      },
      maxSize: 2, // 单位M
      dialogVisible: false,
      initEditorContent: '' // 编辑文章时的初始内容
    }
  },
  mounted () {
    this.initDoc()
  },
  methods: {
    /**
     * @description 编辑状态时初始数据
     */
    async initDoc () {
      const id = this.$route.query.id
      if (id) {
        this.isExist = true
        try {
          const res = (await this.$store.dispatch('getArticleById', id)).data.data
          this.form = res
          this.form.category = {id: res.category_id, name: res.category_name}
          console.log(this.form)
        } catch (err) {
          console.log(err)
          this.$message({
            message: '获取文章失败',
            type: 'error'
          })
        }
      } else {
        this.isExist = false
      }
    },
    thumbnailUploadSuccess (res, file) {
      // this.form.thumbnail = URL.createObjectURL(file.raw)
      if (res.data) {
        this.form.thumbnail = `${host}${res.data.path}`
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    /**
     * @description 缩略图上传前的处理
     * @param {Object} file
     */
    beforeThumbnailUpload (file) {
      const allowPicType = file.type.match(/^(image\/)(png|jpeg|gif)$/i)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!allowPicType) {
        this.$message.error('上传头像图片只能是png/jpeg/gif!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return allowPicType && isLt2M
    },
    /**
     * @description 文章内容输入变化时的回调
     */
    contentOnChange ({markdown, html, text}) {
      this.form.markdown = markdown
      this.form.html = html
    },
    /**
     * @description 添加/更新文章
     */
    async onSubmit (formName) {
      // 提交前先校验
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          this.$message({
            message: '请填写必填项',
            type: 'error'
          })
          return false
        }
        // 通过校验才加载loading，防止多次提交
        this.requesting = true
        // console.log(this.form)
        let res = null
        this.form.category_id = this.form.category.id
        this.form.category_name = this.form.category.name
        try {
          if (!this.isExist) {
            res = await addArticle(this.form)
          } else {
            res = await editArticle(this.form)
          }
          const msg = this.isExist ? '更新' : '添加'
          // 添加/更新成功
          if (res.data.code === 1001) {
            this.$message({
              message: `${msg}成功`,
              type: 'success'
            })
            this.loading = false
            this.$router.push('/docManage')
          } else {
            // 添加/更新失败
            this.$message({
              message: `${msg}失败: ${res.data.message}`,
              type: 'error'
            })
            this.loading = false
          }
        } catch (err) {
          this.requesting = false
          console.log(err)
        }
      })
    }
  },
  watch: {
    'form._tags' (newV) {
      if (newV.length > 0) {
        this.form.tags = newV.join(',')
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/backend/styles/colors.scss';
  .thumbnail{
    width: 178px;
    height: 178px;
    display: block;
    &-uploader{
      .el-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
          color: $primary;
        }
      }
      &-icon{
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
    }
  }
</style>

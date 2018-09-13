<template>
  <section>
    <el-form
      ref="form" :model="form" :rules="rules"
      label-position="right" label-width="80px" size="small"
      class="qian-form">
      <el-form-item label="文档类别">
        <el-radio-group v-model="form.docType">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2" disabled="">图片</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章类别" prop="category_id">
        <el-select
          v-model="form.category"
          placeholder="请选择文章类别"
          value-key="id"
          @change="changeCategory">
          <el-option
            v-if="categories.length > 0"
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" @change="changeForm"></el-input>
      </el-form-item>
      <el-form-item label="小标题" prop="smtitle">
        <el-input v-model="form.smtitle" placeholder="请输入小标题" @change="changeForm"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-radio-group v-model="form.source" @change="changeForm">
          <el-radio label="原创"></el-radio>
          <el-radio label="转载"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch v-model="form.display" @change="changeForm"></el-switch>
      </el-form-item>
      <!-- 标签选择 -->
      <el-form-item label="标签" prop="_tags">
        <el-select
          v-model="form._tags"
          multiple
          placeholder="请选择标签"
          value-key="id"
          @change="changeForm">
          <el-option
            v-if="tags.length > 0"
            v-for="item in tags"
            :key="item.id"
            :label="item.tname"
            :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="thumbnail-uploader"
          action="http://localhost:3000/api/v1/upload/image"
          :show-file-list="false"
          :on-success="thumbnailUploadSuccess"
          :before-upload="beforeThumbnailUpload"
          :on-change="changeForm">
          <img v-if="form.thumbnail" :src="form.thumbnail" class="thumbnail">
          <i v-else class="el-icon-plus thumbnail-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 摘要 -->
      <el-form-item label="文章摘要" prop="summary">
        <el-input type="textarea" v-model="form.summary" @change="changeForm"></el-input>
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
      <el-form-item class="qian-form-item-button">
        <el-button
          type="primary" @click="onSubmit('form')"
          :loading="loading">
          {{isExist ? '更新' : '添加'}}
        </el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import editorMd from './editorMd.vue'
import {host} from '@/backend/config/index.js'
import {mapState} from 'vuex'
import {
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
      count: 0,
      loading: false,
      isExist: false,
      formChange: false,
      form: {
        docType: 1,
        category: null,
        category_id: '',
        category_name: '',
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
        category_id: [
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
          {min: 5, max: 200, message: '长度在5～200个字符', trigger: 'blur'}
        ]
      },
      maxSize: 2, // 单位M
      dialogVisible: false,
      initEditorContent: '' // 编辑文章时的初始内容
    }
  },
  computed: {
    ...mapState({
      tags: state => state.doc.tags,
      categories: state => state.doc.categories
    })
  },
  mounted () {
    this.initDoc()
  },
  methods: {
    /**
     * @description 检测表单变化
     */
    changeForm () {
      if (this.formChange) return console.log(1)
      this.formChange = true
    },
    changeCategory (item) {
      this.form.category_id = item.id
      this.form.category_name = item.name
      if (!this.formChange) {
        this.formChange = true
      }
    },
    goback () {
      this.$store.dispatch('goback', this)
    },
    /**
     * @description 编辑状态时初始数据
     */
    async initDoc () {
      // 获取标签和文章类型
      this.$store.dispatch('getTags')
      this.$store.dispatch('getCategories')
      const id = this.$route.query.id
      if (id) {
        this.isExist = true
        try {
          let res = await this.$store.dispatch('getArticleById', id)
          if (res.data.code !== 1001) {
            return this.$message({
              message: res.data.message || '获取文章失败',
              type: 'error'
            })
          }
          // 备份一份
          let form = JSON.parse(JSON.stringify(res.data.data))
          form._tags = JSON.parse(form.tags)
          form.thumbnail = form.thumbnail || ''
          form.display = !!form.display
          form.category = {id: form.category_id, name: form.category_name}
          this.form = form
          this.initEditorContent = form.markdown
          // 文档类型先写死
          this.form.docType = 1
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
      // 防止第一次初始化编辑器内容时触发该事件
      if (++this.count > 2) {
        this.formChange = true
      }
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
        this.loading = true
        let res = null
        try {
          if (!this.isExist) {
            res = await addArticle(this.form)
          } else {
            if (!this.formChange) {
              setTimeout(() => {
                this.loading = false
              }, 1000)
              return this.$message({
                message: '未对文档进行修改',
                type: 'warning',
                duration: 1000
              })
            }
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
          this.loading = false
          console.log(err)
        }
      })
    }
  },
  watch: {
    'form._tags' (newV) {
      if (newV.length > 0) {
        this.form.tags = JSON.stringify(newV)
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
  .qian-form {
    padding-right: 140px;
    &-item-button {
      position: absolute;
      z-index: 100;
      bottom: 0; // 24px;
      right: 27px;
    }
  }
</style>

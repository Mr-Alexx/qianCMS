<template>
  <section>
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="80px" size="small">
      <el-form-item label="文档类别">
        <el-radio-group v-model="form.docType">
          <el-radio label="文章" value="1"></el-radio>
          <el-radio label="图片" value="2"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文档类别">
        <el-select v-model="form.category_id" placeholder="请选择文档类别">
          <el-option label="javascript" value="1"></el-option>
          <el-option label="nodeJs" value="2"></el-option>
          <el-option label="css effect" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="小标题" prop="smTitle">
        <el-input v-model="form.smTitle" placeholder="请输入小标题"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-radio-group v-model="form.source">
          <el-radio label="原创" value="1"></el-radio>
          <el-radio label="转载" value="2"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch v-model="form.display"></el-switch>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tags" multiple placeholder="请选择">
          <el-option label="js" value="1"></el-option>
          <el-option label="vue" value="2"></el-option>
          <el-option label="node" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="thumbnail-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="thumbnailUploadSuccess"
          :before-upload="beforeThumbnailUpload">
          <img v-if="form.thumbnail" :src="form.thumbnail" class="thumbnail">
          <i v-else class="el-icon-plus thumbnail-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 摘要 -->
      <el-form-item label="文章摘要" required="">
        <el-input type="textarea" v-model="form.summary"></el-input>
      </el-form-item>
      <!-- markdown编辑器 -->
      <el-form-item required label="文章内容">
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
        <el-button type="primary" @click="onSubmit">
          {{isExist ? '添加' : '发布'}}
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import editorMd from './editorMd.vue'

export default {
  name: 'docEdit',
  components: {
    editorMd
  },
  props: {
    // 文章是否存在，控制按钮文字用（发布/保存）
    isExist: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        docType: '1',
        category_id: '1',
        title: '',
        smTitle: '',
        source: '1',
        display: true,
        tags: [],
        thumbnail: '',
        summary: '',
        // 文章用
        markdown: '',
        html: ''
      },
      rules: {
        title: [
          {required: true, trigger: 'blur'},
          {min: 1, max: 20, message: '长度在1～20个字符', trigger: 'blur'}
        ],
        smTitle: [
          {required: true, trigger: 'blur'},
          {min: 1, max: 20, message: '长度在1～20个字符', trigger: 'blur'}
        ]
      },
      maxSize: 2, // 单位M
      dialogVisible: false,
      initEditorContent: '' // 编辑文章时的初始内容
    }
  },
  beforeMount () {
    this.initEditorContent = ''
  },
  methods: {
    thumbnailUploadSuccess (res, file) {
      this.form.thumbnail = URL.createObjectURL(file.raw)
    },
    /**
     * @description 缩略图上传前的处理
     * @param {Object} file
    */
    beforeThumbnailUpload (file) {
      console.log(file)
      const isImg = file.type.match(/^(image\/)(png|jpeg)$/i)
      const isLimit = file.size / 1024 / 1024 < this.maxSize
      if (!isImg) {
        this.$message.error('只能上传jpeg/png类型照片')
      }
      if (!isLimit) {
        this.$message.error('照片大小不能超过 2MB！')
      }
      return isImg && isLimit
    },
    /**
     * @description 文章内容输入变化时的回调
    */
    contentOnChange ({markdown, html, text}) {
      // console.log(html)
      // console.log(markdown)
      // console.log(text)
      this.form.markdown = markdown
      this.form.html = html
    },
    /**
     * @description 添加/更新文章
    */
    onSubmit () {}
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

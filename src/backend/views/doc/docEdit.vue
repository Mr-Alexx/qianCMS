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
        <el-select v-model="form.categoryId" placeholder="请选择文档类别">
          <el-option label="javascript" value="1"></el-option>
          <el-option label="nodeJs" value="2"></el-option>
          <el-option label="css effect" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="小标题" prop="title">
        <el-input v-model="form.smTitle"></el-input>
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
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="thumbnailUploadSuccess"
          :before-upload="beforeThumbnailUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: 'docEdit',
  data () {
    return {
      form: {
        docType: '1',
        categoryId: '1',
        title: '',
        smTitle: '',
        source: '1',
        display: true,
        tags: []
      },
      rules: {
        title: [
          {required: true, message: '请输入标题'},
          {min: 1, max: 20, message: '长度在1～20个字符', trigger: 'blur'}
        ]
      },
      imageUrl: '',
      maxSize: 2 // 单位M
    }
  },
  methods: {
    thumbnailUploadSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeThumbnailUpload (file) {
      const isImg = file.type.match(/image\/(jpeg | jpg | png)/ig)
      const isLimit = file.size / 1024 / 1024 < this.maxSize
      if (!isImg) {
        this.$message.error('只能上传jpeg/jpg/png类型照片')
      }
      if (!isLimit) {
        this.$message.error('照片大小不能超过 2MB！')
      }
      return isImg && isLimit
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

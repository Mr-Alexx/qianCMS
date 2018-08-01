<template>
  <section>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3000/api/v1/upload/image"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <img :src="uploadImg" v-if="uploadImg">

    <el-button @click="test">test</el-button>
    <el-button @click="test2">test2</el-button>
  </section>
</template>

<script>
import axios from 'axios'
import {host} from '@/backend/config/index.js'
console.log(host)

export default {
  name: 'docCtrl',
  data () {
    return {
      imageUrl: '',
      uploadImg: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      if (res.data) {
        this.imageUrl = `${host}${res.data.path}`
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload (file) {
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
    test () {
      axios.post('http://localhost:3000/api/v1/upload/image', {})
        .then(data => {
          console.log(data)
        })
    },
    test2 () {
      axios.get('http://localhost:3000/api/v1/article/1')
        .then(data => console.log(data))
    }
  }
}
</script>

<style lang="scss">
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

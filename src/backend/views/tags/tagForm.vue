<template>
  <el-dialog
    :visible="formState.visible"
    @close="closeDialog"
    :title="`${formState.isEdit ? '修改' : '添加'}标签`">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      size="small"
      label-width="80px">
      <el-form-item label="标签名称" prop="name">
        <el-input
          v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">
          {{formState.isEdit ? '保存' : '添加'}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  addTag,
  editTag
} from '@/backend/api/article.js'
import { cloneDeep } from '@/backend/utils'

export default {
  name: 'tagForm',
  props: {
    formState: Object,
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: cloneDeep(this.formState.form),
      rules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 10, message: '类名长度在1~10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    formState: {
      handler (v) {
        this.form = cloneDeep(v.form)
      },
      deep: true
    }
  },
  methods: {
    closeDialog () {
      this.$store.dispatch('closeTagDialog')
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return this.$message({
            message: '请填写必填项',
            type: 'error'
          })
        }
        let res = {}
        if (!this.formState.isEdit) {
          res = await addTag(this.form)
        } else {
          res = await editTag(this.form)
        }
        // 成功则更新tags
        if (res.data.code === 1001) {
          this.$store.dispatch('getTags')
          this.$store.dispatch('closeTagDialog')
        }
        this.$message({
          message: `${this.formState.isEdit ? '修改' : '添加'}: ${res.data.message}`,
          type: `${res.data.code === 1001 ? 'success' : 'error'}`
        })
      })
    }
  }
}
</script>

<style>

</style>

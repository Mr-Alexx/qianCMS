<template>
  <el-dialog
    :visible.sync="visible"
    :title="title">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      size="small"
      label-width="80px">
      <el-form-item label="父类">
        <el-cascader
          :options="options"
          v-model="form.parent"
          @change="changeParent"
          :props="cascaderProps"
          filterable
          change-on-select
          clearable
          placeholder="一级分类"></el-cascader>
        <el-button type="text" @click="clearCascader">清空</el-button>
      </el-form-item>
      <el-form-item label="类名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch
          v-model="form.display"
          :active-value="1"
          :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number :min="0" v-model="form.sort"></el-input-number>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input type="textarea" :rows="2" v-model="form.keywords"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :rows="2" v-model="form.discription"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :loading="loading">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'categoryForm',
  data () {
    return {
      cascaderProps: {
        value: 'id',
        label: 'name'
      },
      loading: false,
      pid: 0,
      rules: {
        name: [
          { required: true, message: '请输入类名', trigger: 'blur' },
          { min: 1, max: 10, message: '类名长度在1~10个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入url', trigger: 'blur' },
          { min: 1, max: 20, message: '类名长度在1~20个字符', trigger: 'blur' }
        ],
        keywords: [
          { required: false },
          { min: 0, max: 255, message: '关键字长度在0~255个字符', trigger: 'blur' }
        ],
        discription: [
          { required: false },
          { min: 0, max: 255, message: '描述长度在0~255个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: '添加'
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    form: {
      type: Object,
      default () {
        return {
          name: '',
          parent: [],
          display: 1,
          sort: 0,
          url: '',
          keywords: '',
          discription: ''
        }
      }
    }
  },
  methods: {
    changeParent (item) {
      this.pid = item[item.length - 1]
    },
    clearCascader () {
      this.form.parent.length > 0 && (this.form.parent = [])
    },
    save () {
      // 提交前先校验
      this.$refs.form.validate(async valid => {
        if (!valid) {
          this.$message({
            message: '请填写必填项',
            type: 'error'
          })
          return false
        }
        // 通过校验才加载loading，防止多次提交
        this.loading = true
        let form = JSON.parse(JSON.stringify(this.form))
        delete form.parent
        form.pid = this.pid
        this.$emit('save', form)
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>

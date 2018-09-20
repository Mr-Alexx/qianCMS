<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="`${isEdit ? '修改' : '添加'}分类`">
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
          :disabled="type !== 'root' && !isEdit"
          placeholder="一级分类"></el-cascader>
        <el-button type="text" @click="clearCascader" v-show="type === 'root' || isEdit">清空</el-button>
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
        <el-input type="textarea" :rows="2" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" :loading="loading">
          {{isEdit ? '保存' : '添加'}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { cloneDeep } from '@/backend/utils'

export default {
  name: 'categoryForm',
  data () {
    return {
      cascaderProps: {
        value: 'id',
        label: 'name'
      },
      form: cloneDeep(this.formData), // 拷贝一份,防止直接修改store的数据
      canSubmit: false,
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
        description: [
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
    type: {
      type: String,
      default: 'root'
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    formData: Object
  },
  computed: {
    dialogVisible: {
      get () {
        return this.visible
      },
      set () {
        this.$store.dispatch('closeCategoryDialog')
      }
    }
  },
  watch: {
    // 监测到props过来的数据时,给form赋值
    formData (val) {
      this.form = cloneDeep(val)
      this.canSubmit = false // 防止初始化时触发formchange
    },
    form: {
      // 这种方式防止未修改提交无效,因form在复制formData的数据时会触发一次
      handler () {
        !this.canSubmit && (this.canSubmit = true)
      },
      deep: true
    }
  },
  methods: {
    changeParent (item) {
      this.canSubmit = true
    },
    clearCascader () {
      if (this.form.parent.length > 0) {
        this.form.parent = []
        this.pid = 0
      }
    },
    submit () {
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
        // delete form.parent
        form.pid = form.parent[form.parent.length - 1] || 0
        const vue = this
        if (!this.isEdit) { // 添加
          this.$store.dispatch('addCategory', {form, vue})
        } else { // 更新
          if (this.canSubmit) {
            this.$store.dispatch('updateCategory', {form, vue})
          } else {
            this.loading = false
            return this.$message({
              message: '请先对分类做出修改',
              type: 'info',
              duration: 1000
            })
          }
        }
        this.$store.dispatch('closeCategoryDialog')
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>

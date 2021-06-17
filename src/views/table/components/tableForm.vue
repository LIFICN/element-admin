
<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" prop="date1">
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      <el-button @click="canelForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) return callback(new Error('年龄不能为空'))
      callback()
    }

    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        type: [],
        resource: '',
        desc: '',
        age: '',
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
        age: [{ required: true, validator: checkAge, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.$emit('submit')
          return
        }

        console.log('error submit!!')
        return false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    canelForm() {
      this.$emit('canel')
    },
  },
}
</script>

<style>
</style>

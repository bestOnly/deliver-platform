<template>
  <div>
    <panel>
      <template #title>
        <span>账户添加</span>
      </template>
      <template #content>
        <el-form
          :model="user"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账户" prop="account">
            <el-input v-model="user.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="userGroup">
            <el-select v-model="user.userGroup" placeholder="请选择用户类型">
              <el-option label="普通管理员" value="普通管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >添加</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { addUser } from '@/api/account.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      user: {
        account: '',
        password: '',
        userGroup: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在5-12位哦', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15位哦', trigger: 'blur' }
        ],
        userGroup: [
          { require: true, message: '请输入管理员类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async submitForm() {
      await addUser(this.user)
      this.$refs.ruleForm.resetFields()
      this.$router.push('/account/index')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped></style>

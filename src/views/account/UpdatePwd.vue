<template>
  <panel>
    <template #title>
      <span>密码修改</span>
    </template>
    <template #content>
      <el-form
        :model="pwdForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="pwdForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="pwdForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="comfirmPwd">
          <el-input type="password" v-model="pwdForm.comfirmPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </panel>
</template>

<script>
import { reg } from '@/utils/validate.js'
import panel from '@/components/panel/Index'
import { regOldpwd, updatePwd } from '@/api/account.js'
import local from '@/utils/local.js'
export default {
  components: {
    panel
  },
  data() {
    var validateOld = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入5-14位字母或数字'))
      } else {
        const { code, msg } = await regOldpwd({
          oldPwd: value
        })
        if (code === '00') {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入6-14位字母或数字'))
      } else {
        // 如果确认密码不为空。那么重新验证一下确认密码
        if (this.pwdForm.comfirmPwd !== '') {
          this.$refs.ruleForm.validateField('comfirmPwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.pwdForm.newPwd) {
        callback(new Error('输入的密码与新密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        password: '',
        newPwd: '',
        comfirmPwd: ''
      },
      rules: {
        password: [{ validator: validateOld, required: true, trigger: 'blur' }],
        newPwd: [{ validator: validatePass, required: true, trigger: 'blur' }],
        comfirmPwd: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await updatePwd({
            newPwd: this.pwdForm.comfirmPwd
          })
          console.log(data)
          this.$refs[formName].resetFields()
          if (confirm('想退出重新登录吗？')) {
            local.clear()
            this.$router.push('/login')
          }
        } else {
          this.$message.error('账户或密码不太正确~')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped></style>

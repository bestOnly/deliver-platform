<template>
  <div class="login-box">
    <div class="box">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <h2>外卖后台管理登录</h2>
        <el-form-item label="账号" prop="uname">
          <el-input
            type="text"
            prefix-icon="iconfont icon-zhanghuffffffpx"
            v-model="loginForm.uname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :type="flagEye ? 'password' : 'text'"
            prefix-icon="iconfont icon-ai-password"
            v-model="loginForm.password"
            autocomplete="off"
          >
            <i
              slot="suffix"
              class="iconfont"
              :class="flagEye ? 'icon-yanjing_bi' : 'icon-yanjing'"
              @click="toggleEye"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import local from '../../utils/local'
import { login } from '@/api/account.js'
import { createRouter } from '@/router/index.js'
export default {
  data() {
    return {
      flagEye: true,
      loginForm: {
        uname: '',
        password: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '账户长度在 5 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '账户长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    toggleEye() {
      this.flagEye = !this.flagEye
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code, token, role } = await login({
            account: this.loginForm.uname,
            password: this.loginForm.password
          })
          if (code === 0) {
            local.set('token', token)
            local.set('role', role)
            createRouter()
            sessionStorage.setItem('admin', this.loginForm.uname)
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          } else if (code === 1) {
            return false
          }
        } else {
          this.$message.error('登录失败')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>

<style lang="less" scoped>
.login-box {
  height: 100%;
  background-color: rgb(0, 136, 141);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 500px;
    height: 500px;
    padding: 30px;
    padding-right: 50px;
    h2 {
      text-align: center;
      letter-spacing: 3px;
      margin-bottom: 10px;
      color: #fff;
      text-indent: 1em;
    }
    .el-input {
      width: 380px;
      i {
        position: absolute;
        right: 25px;
      }
    }
    .el-form {
      margin-top: 52%;
      transform: translateY(-50%);
    }
    .el-button {
      // text-align: center;
      margin-left: 50%;
      transform: translate(-100%);
    }
  }
}
</style>

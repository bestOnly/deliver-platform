<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="item in breadcrumb"
        :key="item.title"
        >{{ item.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="right-box">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，亲爱的 <span class="name"> {{ admin }} </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus" command="a"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-circle-plus" command="b"
            >账号管理</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-circle-plus-outline" command="c"
            >注销账号</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <img :src="pic" @click="toCenter"/>
    </div>
  </div>
</template>

<script>
import local from '../utils/local'
import { getInfo } from '@/api/account.js'

export default {
  created() {
    this.calRoute()
    this.getMsg()
  },
  data() {
    return {
      breadcrumb: [],
      admin: sessionStorage.getItem('admin'),
      pic: ''
    }
  },
  methods: {
    async getMsg() {
      const { accountInfo } = await getInfo()
      this.pic = accountInfo.imgUrl
    },
    calRoute() {
      const arr = [{ title: '首页', path: '/dashboard' }]
      this.$route.matched.forEach(item => {
        if (item.meta && item.meta.title) {
          arr.push({
            title: item.meta.title,
            path: item.path
          })
        }
      })
      this.breadcrumb = arr
    },
    handleCommand(command) {
      if (command === 'a') {
        this.$router.push('/account/myCenter')
      } else if (command === 'c') {
        local.clear()
        // local.remove('role')
        location.reload()
        // 此时不能直接跳转，如果直接跳转获取的是上一次登录的路由
        // this.$router.push('/login')
      } else if (command === 'b') {
        this.$router.push('/account/index')
      }
    },
    toCenter() {
      this.$router.push('/account/myCenter')
    }
  },
  watch: {
    '$route.path'() {
      this.calRoute()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.right-box {
  img {
    width: 100%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 10px;
  }
  cursor: pointer;
}
.name{
  color:rgb(146, 146, 255);
  font-weight: bold;
  }
</style>

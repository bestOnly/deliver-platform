<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isFlag ? '64px' : '200px'">
      <h3 class="title" @click="isFlag = !isFlag">
         <img src="@/assets/img/logo-icon.png"/>
         <span v-show="!isFlag">外卖管理中心</span>
      </h3>
      <Side :bool= 'isFlag'/>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header/>
      </el-header>
      <!-- 主体 -->
      <el-main>
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Side from '../layout/Side'
import Header from '../layout/header'
export default {
  components: {
    Side,
    Header
  },
  data() {
    return {
      isFlag: false
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  background-color: #e7e7e7;

  .el-aside {
    background-color: #2b3c4d;
    transition: all 0.5s;

    .title{
      display: flex;
      align-items: center;
      padding: 15px;
      cursor: pointer;
      img{
        width: 100%;
        width: 42px;
        border-radius: 50%;
      }
      span{
        color: #fff;
        position: absolute;
        left: 70px;
      }
    }
  }
  .el-header {
    background-color: #fff;
  }
  .Main {
    background-color: rgb(253, 254, 255);
  }
}
</style>

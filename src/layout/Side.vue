<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2b3c4d"
      text-color="#fff"
      active-text-color="skyblue"
      unique-opened
      :collapse-transition="false"
      router
      :collapse="bool"
    >
      <template v-for="menu in menus">
        <el-menu-item
          :key="menu.path"
          :index="menu.path"
          v-if="
            (menu.children &&
              menu.children.length === 1 &&
              menu.path !== '/account') ||
              menu.path === '/dashboard'
          "
        >
          <i class="iconfont" :class="menu.meta.icon"></i>
          <span>{{ menu.meta.title }}</span>
        </el-menu-item>
        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="iconfont" :class="menu.meta.icon"></i>
            <span>{{ menu.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :index="item.path"
            :key="item.path"
            >{{ item.meta.title }}</el-menu-item
          >
        </el-submenu>
      </template>
      <!-- <el-menu-item index="/order">
      <i class="iconfont icon-dingdan"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-submenu index="/product">
      <template slot="title">
        <i class="iconfont icon-shangpin"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="/product/list">商品列表</el-menu-item>
      <el-menu-item index="/product/add">商品添加</el-menu-item>
      <el-menu-item index="/product/cate">商品分类</el-menu-item>
    </el-submenu>
    <el-menu-item index="/store">
      <i class="iconfont icon-shop"></i>
      <span slot="title">店铺管理</span>
    </el-menu-item>
    <el-submenu index="/account">
      <template slot="title">
        <i class="iconfont icon-zhanghao"></i>
        <span>账号管理</span>
      </template>
      <el-menu-item index="/account/index">账号列表</el-menu-item>
      <el-menu-item index="/account/add">添加账号</el-menu-item>
      <el-menu-item index="/account/updatePwd">修改密码</el-menu-item>
    </el-submenu>
    <el-submenu index="/saleAccount">
      <template slot="title">
        <i class="iconfont icon-xiaoshoubaobiao"></i>
        <span>销售统计</span>
      </template>
      <el-menu-item index="/saleAccount/goodsAccount">商品统计</el-menu-item>
      <el-menu-item index="/saleAccount/orderAccount">订单统计</el-menu-item>
    </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import local from '@/utils/local.js'
export default {
  created() {
    this.menus = JSON.parse(local.get('cMenu'))
  },
  props: {
    bool: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border: 0;
}
.el-menu-item,
.el-submenu {
  i {
    margin-right: 10px;
    color: #fff;
  }
}
</style>

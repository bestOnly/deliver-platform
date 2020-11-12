<template>
  <!-- 公共子组件插槽  用于存放父组件的相应页面 -->
  <el-card>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.title {
  padding: 20px;
  font-weight: 700;
  // border-bottom: 1px solid #eee;
  box-shadow: 0px 3px 5px #eee;
}
.content {
  padding: 20px;
}
/deep/ .el-card__body {
  padding: 0;
}
</style>

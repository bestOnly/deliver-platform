<template>
  <panel>
    <template #title>商品添加</template>
    <template #content>
      <div class="innerBox">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.category" placeholder="请选择商品分类">
              <el-option
                v-for="item in cateSelect"
                :key="item.id"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input-number
              v-model="form.price"
              @change="handleChange"
              :min="1"
              :max="20"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.goodsDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加商品</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </panel>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { addGoods, goodsCate } from '@/api/product.js'
export default {
  components: {
    panel
  },
  data() {
    return {
      fits: ['cover'],
      url: '',
      imageUrl: '',
      form: {
        name: '',
        category: '',
        imgUrl: '',
        price: 1,
        goodsDesc: ''
      },
      cateSelect: []
    }
  },
  created() {
    this.getCate()
  },
  methods: {
    /* 分类列表 */
    async getCate() {
      const { categories } = await goodsCate()
      this.cateSelect = categories
    },
    // 增加
    async onSubmit() {
      const { msg } = await addGoods(this.form)
      this.$router.push('/product/list')
      console.log(msg)
    },
    cancel() {
      this.$refs.form.resetFields()
    },
    handleChange(value) {
    },
    // 图片相关
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.imgUrl = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const arr = ['image/jpg', 'image/jpeg', 'image/png']
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.innerBox {
  width: 40%;
  height: 100%;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

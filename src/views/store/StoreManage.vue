<template>
  <div>
    <panel>
      <template #title>店铺管理</template>
      <template #content>
        <div class="innerBox">
          <el-form
            ref="storeForm"
            :model="storeForm"
            label-width="80px"
            size="small"
          >
            <el-form-item label="店铺名称">
              <el-input
                v-model="storeForm.name"
                placeholder="请出入店铺名"
              ></el-input>
            </el-form-item>
            <el-form-item label="店铺公告">
              <el-input
                class="textarea"
                v-model="storeForm.bulletin"
                type="textarea"
                placeholder="请出入公告"
              ></el-input>
            </el-form-item>
            <el-form-item label="店铺头像">
              <el-image
                style="width: 100px; height: 100px"
                :src="baseUrl + storeForm.avatar"
              >
              </el-image>
            </el-form-item>
            <el-form-item label="店铺图片">
              <el-upload
                action="http://127.0.0.1:5000/shop/upload"
                list-type="picture-card"
                :file-list="storeForm.pics"
                :on-success="handleUp"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="配送费">
              <el-input v-model="storeForm.deliveryPrice"></el-input>
            </el-form-item>
            <el-form-item label="配送时间">
              <el-input v-model="storeForm.deliveryTime"></el-input>
            </el-form-item>
            <el-form-item label="配送描述">
              <el-input v-model="storeForm.description"></el-input>
            </el-form-item>
            <el-form-item label="店铺评分">
              <el-input v-model="storeForm.score"></el-input>
            </el-form-item>
            <el-form-item label="销量">
              <el-input v-model="storeForm.sellCount"></el-input>
            </el-form-item>
            <el-form-item label="活动">
              <el-checkbox-group v-model="storeForm.supports">
                <el-checkbox label="在线支付满28减5"></el-checkbox>
                <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
                <el-checkbox label="特价饮品8折抢购"></el-checkbox>
                <el-checkbox label="单人精彩套餐"></el-checkbox>
                <el-checkbox label="单人特色套餐"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="营业时间">
              <div class="block">
                <el-date-picker
                  v-model="storeForm.date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </el-form-item>
            <div class="btns">
              <el-form-item>
                <el-button type="primary" @click="saveUpdate(storeForm.id)"
                  >保 存</el-button
                >
                <el-button type="">重 置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </template>
    </panel>
  </div>
</template>

<script>
import panel from '../../components/panel/Index'
import { storeInfo, updateStore } from '@/api/store.js'
import _ from 'lodash'

export default {
  created() {
    this.getStoreInfo()
  },
  components: {
    panel
  },
  data() {
    return {
      baseUrl: 'http://127.0.0.1:5000/upload/shop/',
      imageUrl: '',
      storeForm: {
        id: '',
        name: '',
        bulletin: '',
        avatar: '',
        deliveryPrice: '',
        deliveryTime: '',
        description: '',
        score: '',
        sellCount: '',
        supports: [],
        pics: [],
        date: [],
        minPrice: 0,
        oldPics: []
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    async getStoreInfo() {
      const { data } = await storeInfo()
      this.storeForm = data
      this.oldPics = data.pics
      const arr = []
      data.pics.forEach((item) => {
        arr.push({
          name: item,
          url: this.baseUrl + item
        })
        // console.log(item)
      })
      this.storeForm.pics = arr
      // console.log(this.oldPics)
    },
    async saveUpdate(id) {
      const obj = _.cloneDeep(this.storeForm)
      obj.supports = JSON.stringify(this.storeForm.supports)
      obj.pics = JSON.stringify(this.oldPics)
      obj.date = JSON.stringify(this.storeForm.date)
      const data = await updateStore(obj)
      console.log(data)
    },
    handleUp(res) {
      console.log(res.imgUrl)
      this.url = res
      this.oldPics.push(res.imgUrl)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      console.log(file.uid)
      this.storeForm.pics.forEach((item, i) => {
        if (item.uid === file.uid) {
          this.storeForm.pics.splice(i, 1)
        }
        console.log(this.storeForm.pics)
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
      // this.saveUrl = res.imgUrl
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
/deep/.el-textarea__inner {
  resize: none;
  height: 120px;
}
.innerBox {
  width: 50%;
  height: 100%;
}
.avatar-uploader .el-upload {
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
/deep/ .el-upload--picture-card {
  margin: 20px;
}
.goodsImg {
  display: flex;
  margin-left: 40px;
  span {
    display: inline-block;
    width: 100px;
  }
}
.btns {
  margin-left: 80px;
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

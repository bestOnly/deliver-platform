<template>
  <panel>
    <template #title>修改订单</template>
    <template #content>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="收货人">
          <el-input v-model="form.consignee"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="配送地址">
          <el-input v-model="form.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="用户备注">
          <el-input v-model="form.remarks"></el-input>
        </el-form-item>
        <el-button type="primary" @click="saveUpdate()">保存</el-button>
      </el-form>
    </template>
  </panel>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { orderDetail, updateOrder } from '@/api/order.js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    panel
  },
  created() {
    this.getDetails(this.id)
  },
  data() {
    return {
      form: {
        consignee: '',
        phone: '',
        deliverAddress: '',
        remarks: ''
      }
    }
  },
  methods: {
    async getDetails(id) {
      const { data } = await orderDetail({ id })
      this.form = data
    },
    async saveUpdate() {
      await updateOrder(this.form)
      this.$router.push('/order/Manage')
    }
  }
}
</script>

<style lang="less" scoped></style>

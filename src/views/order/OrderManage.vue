<template>
  <panel>
    <template #title>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        size="small"
        inline
        label-position="left"
      >
        <el-form-item label="订单号:">
          <el-input
            v-model="form.orderNo"
            placeholder="请输入订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input
            v-model="form.consignee"
            placeholder="请输入收货人"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.orderState" placeholder="请选择订单状态">
            <el-option label="未派送" value="未派送"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <div class="block">
            <!-- <span class="demonstration">默认</span> -->
            <el-date-picker
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchOrder">查 询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #content>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="100">
        </el-table-column>
        <el-table-column label="下单时间" width="200">
          <template v-slot="{ row }">
            <span>{{ row.orderTime | createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="100">
        </el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="260">
        </el-table-column>
        <el-table-column label="送达时间" width="100">
          <template v-slot="{ row }">
            <span>{{ row.deliveryTime | createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="100">
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="100">
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="100">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template v-slot="{ row }">
            <el-button @click="handleClick(row.id)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="$router.push('/order/update/' + row.id)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <el-dialog title="订单详情" :visible.sync="dialogVisible" width="30%">
        <ul>
          <li class="lis" v-for="item in currentItem" :key="item.id">
            {{ item }}
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </template>
  </panel>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import createTime from '@/utils/filter.js'
import { getOrderList, searchOrder } from '@/api/order.js'
import moment from 'moment'
export default {
  filters: {
    createTime
  },
  components: {
    panel
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogVisible: false,
      currentItem: {},
      form: {
        orderNo: '',
        consignee: '',
        phone: '',
        orderState: '',
        date: []
      },
      tableData: [],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    /* 订单列表 */
    async getOrder() {
      const { data, total } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.form.orderNo,
        consignee: this.form.consignee,
        phone: this.form.phone,
        orderState: this.form.orderState,
        date: JSON.stringify(this.form.date)
      })
      console.log(data)
      this.tableData = data
      this.total = total
    },
    /* 查询订单 */
    async searchOrder() {
      const arr = []
      this.form.date.forEach(item => {
        arr.push(moment(item).format('YYYY-MM-DD hh:mm:ss'))
      })
      this.form.date = arr
      const { data } = await searchOrder({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.form.orderNo,
        consignee: this.form.consignee,
        phone: this.form.phone,
        orderState: this.form.orderState,
        date: JSON.stringify(this.form.date)
      })
      this.getOrder()
      console.log(data)
    },
    handleClick(id) {
      this.dialogVisible = true
      this.currentItem = this.tableData.find((item) => item.id === id)
      console.log(this.currentItem)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrder()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrder()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__label {
  text-align: center;
}
.lis {
  margin: 15px 0;
}
</style>

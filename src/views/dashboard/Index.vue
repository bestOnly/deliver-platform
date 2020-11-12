<template>
  <div>
    <Card :getCardNum = "sonData"/>
    <Echarts :getCharts = "getCharts"/>
  </div>
</template>

<script>
import Card from '../dashboard/components/Card'
import Echarts from '../dashboard/components/Echarts'
import { getEcharts } from '@/api/order.js'
export default {
  components: {
    Card,
    Echarts
  },
  created() {
    this.getData()
  },
  data() {
    return {
      sonData: {},
      getCharts: {}
    }
  },
  methods: {
    async getData() {
      const { totalOrder, totalAmount, todayOrder, totayAmount, xData, orderData, amountData } = await getEcharts()
      this.sonData = {
        totalOrder,
        totalAmount,
        todayOrder,
        totayAmount
      }
      this.getCharts = {
        amountData,
        xData,
        orderData
      }
    }
  }
}
</script>

<style lang="less" scoped></style>

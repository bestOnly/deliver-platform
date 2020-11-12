<template>
  <div id="myChart" :style="{ width: '1270px', height: '520px' }"></div>
</template>

<script>
export default {
  props: {
    getCharts: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.render()
  },
  data() {
    return {
      option: {
        title: {
          text: '今日数据统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单', '销售额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '订单',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '销售额',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      }
    }
  },
  methods: {
    render() {
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 将charts数据 放在监听中
      myChart.setOption(this.option)
    }

  },
  watch: {
    getCharts() {
      this.option.xAxis.data = this.getCharts.xData
      this.option.series[0].data = this.getCharts.orderData
      this.option.series[1].data = this.getCharts.amountData
      this.render()
    }
  }
}
</script>

<style lang="less" scoped>
#myChart {
  background-color: #fff;
  margin: 30px 0 0 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>

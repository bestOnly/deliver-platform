<template>
  <!-- 首页卡片 -->
  <ul class="data-box">
    <li v-for="item in detailList" :key="item.id">
      <i :class="'iconfont '+ item.icon +' '+ item.cls"></i>
      <div class="detail">
        <span>{{ item.uname }}</span>
        <p>{{ getCardNum[item.num] }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    getCardNum: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      detailList: [
        {
          id: 1,
          uname: '总订单',
          icon: 'icon-weibiaoti--',
          num: 'totalOrder',
          cls: 'one'
        },
        {
          id: 2,
          uname: '总销售额',
          icon: 'icon-meiyuan7',
          num: 'totalAmount',
          cls: 'two'
        },
        {
          id: 3,
          uname: '今日订单数',
          icon: 'icon-dingdan',
          num: 'todayOrder',
          cls: 'three'
        },
        {
          id: 4,
          uname: '今日销售额',
          icon: 'icon-jinqian',
          num: 'totayAmount',
          cls: 'four'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.data-box {
  display: flex;
  justify-content: space-around;
  li {
    width: 300px;
    height: 100px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    box-sizing: border-box;
    border-radius: 5px;
    i {
      font-size: 70px;
    }
    .one {
      color: rgb(58, 199, 255);
    }
    .two {
      color: hotpink;
    }
    .three {
      color: rgb(62, 162, 255);
    }
    .four {
      color: rgb(96, 255, 104);
    }
    .detail {
      text-align: center;
      span {
        color: #ccc;
      }
      p {
        font-weight: 700;
        margin-top: 10px;
      }
    }
  }
}
</style>

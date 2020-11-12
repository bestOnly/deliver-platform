import request from '@/utils/request'
/* 统一发的请求 */

/*
   店铺详情
*/
export function storeInfo() {
  return request.get('/shop/info')
}
/*
   店铺修改
*/
export function updateStore(obj) {
  return request.post('/shop/edit', obj)
}
/*
   订单报表
*/
export function showEchartData(obj) {
  return request.get('/order/ordertotal', obj)
}

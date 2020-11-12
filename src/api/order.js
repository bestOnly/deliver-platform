import request from '../utils/request.js'

/*
  订单列表
*/
export function getOrderList(param) {
  return request.get('/order/list', param)
}
/*
  订单查询
*/
export function searchOrder(param) {
  return request.get('/order/search', param)
}
/*
  订单详细
*/
export function orderDetail(param) {
  return request.get('/order/detail', param)
}
/*
  订单更新
*/
export function updateOrder(param) {
  return request.post('/order/edit', param)
}
/*
  报表数据
*/
export function getEcharts() {
  return request.get('/order/totaldata')
}

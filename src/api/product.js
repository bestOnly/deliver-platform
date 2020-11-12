import request from '../utils/request.js'

/*
  分类列表
*/
export function getCateList(param) {
  return request.get('/goods/catelist', param)
}
/*
  添加分类
*/
export function addCate(param) {
  return request.post('/goods/addcate', param)
}
/*
  删除分类
*/
export function delCate(param) {
  return request.get('/goods/delcate', param)
}
/*
  修改分类
*/
export function updateCate(param) {
  return request.post('/goods/editcate', param)
}
/*
  商品列表
*/
export function goodsList(param) {
  return request.get('/goods/list', param)
}
/*
  商品分类列表
*/
export function goodsCate() {
  return request.get('/goods/categories')
}
/*
  商品分类列表
*/
export function delGoods(param) {
  return request.get('/goods/del', param)
}
/*
  商品修改
*/
export function updateGoods(param) {
  return request.post('/goods/edit', param)
}
/*
  增加商品
*/
export function addGoods(param) {
  return request.post('/goods/add', param)
}

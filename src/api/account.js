import request from '../utils/request.js'

/*
  登录
*/
export function login(param) {
  return request.post('/users/checkLogin', param)
}
/*
  个人中心
*/
export function getInfo() {
  return request.get('/users/info')
}
/*
   修改用户头像
*/
export function editPic(param) {
  return request.get('/users/avataredit', param)
}
/*
  用户列表
*/
export function userList(param) {
  return request.get('/users/list', param)
}
/*
  删除用户
*/
export function delUser(param) {
  return request.get('/users/del', param)
}
/*
  批量删除
*/
export function delSomeUser(param) {
  return request.get('/users/batchdel', param)
}
/*
  添加用户
*/
export function addUser(param) {
  return request.post('/users/add', param)
}
/*
  修改用户
*/
export function updateUser(param) {
  return request.post('/users/edit', param)
}
/*
   验证旧密码
*/
export function regOldpwd(param) {
  return request.get('/users/checkoldpwd', param)
}
/*
   验证旧密码
*/
export function updatePwd(param) {
  return request.post('/users/editpwd', param)
}


/*
   封装时间规范函数
*/
export default function createTime (value) {
  var date = new Date(value)
  var Y = date.getFullYear()
  var M = (date.getMonth() + 1).toString().padStart(2, 0)
  var D = date.getDate().toString().padStart(2, 0)
  var h = date.getHours().toString().padStart(2, 0)
  var m = date.getMinutes().toString().padStart(2, 0)
  var s = date.getSeconds().toString().padStart(2, 0)
  return `${Y}-${M}-${D}  ${h}:${m}:${s}`
}

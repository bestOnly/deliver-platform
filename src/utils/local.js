export default {
  get(k) {
    return localStorage.getItem(k)
  },
  set(k, v) {
    return localStorage.setItem(k, v)
  },
  remove(k) {
    return localStorage.removeItem(k)
  },
  clear() {
    return localStorage.clear()
  }
}

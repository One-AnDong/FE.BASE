/* --------------------------函数节流-------------------------------- */
const throttle = (fn, wait) => {
  let lastTime = 0
  return function() {
    let nowTime = new Date().getTime()
    if (nowTime - lastTime > wait) {
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}

/* --------------------------函数防抖-------------------------------- */
const debounce = (fn, wait) => {
  let timer
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

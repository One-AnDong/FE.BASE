/**
 * @Author: Joe Yao
 * @Date: 2019-08-16 18:54:22
 * @Last Modified by: Joe Yao
 * @Last Modified time: 2019-08-18 10:02:48
 */
export const focus = {
  bind () {
    console.log('bind')
  },
  inserted (el, binding) {
    console.log('inserted')
    el.focus()
  },
  update () {
    console.log('update')
  },
  componentUpdated () {
    console.log('componentUpate')
  },
  unbind () {
    console.log('unbind')
  }
}

/*----------------------移动端点击封装------------------------- */
/**
 * @description    tap.js简单的封装移动端点击事件
 * @author Joe
 * @date  2019-7-7
 * @param element  String [必选]    传入选择器
 * @param fnc      Function[必选]   回调函数
 * @param span     Number[非必选]   允许偏差的距离 默认50px
 * @param time     Number[非必选]   点击的允许的时间差 默认300毫秒
 */
class Tap {
  constructor(element, fnc, span, time) {
    this.element = document.querySelector(element)
    this.span = span || 50
    this.time = time || 300
    this.fnc = fnc
    this.startTime = 0
    this.endTime = 0
    this.startX = 0
    this.startY = 0
    this.endX = 0
    this.endY = 0
    this.init()
  }
  //初始化方法
  init() {
    this.setStart()
    this.setEnd()
  }
  //设置触摸开始事件
  setStart() {
    this.element.addEventListener('touchstart', e => {
      if (e.touches.length > 1) return
      this.getStartSite(e)
      this.startTime = Date.now()
    })
  }
  //设置鼠标结束事件
  setEnd() {
    this.element.addEventListener('touchend', e => {
      this.endTime = Date.now()
      this.getEndSite(e)
      if (e.changedTouches.length > 1) return
      if (this.endTime - this.startTime > this.time) return
      if (
        Math.abs(this.startX - this.endX) > this.span ||
        Math.abs(this.startY - this.endY) > this.span
      )
        return

      this.fnc && this.fnc()
    })
  }
  //获取触摸开始时的坐标
  getStartSite(e) {
    this.startX = e.touches[0].clientX
    this.startY = e.touches[0].clientY
  }
  //获取触摸结束时的坐标
  getEndSite(e) {
    this.endX = e.changedTouches[0].clientX
    this.endY = e.changedTouches[0].clientY
  }
}

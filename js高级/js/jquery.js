;(function() {
  /**
   * @description 封装的类似jquery的库
   * @author Joe
   * @date 2019-7-14 18:02:00
   * @param {strinf} selector  【必选】    css选择器
   */
  function Jquery(selector) {
    return new Init(selector)
  }
  function Init(selector) {
    let dom = document.querySelectorAll(selector)
    dom.forEach((item, index) => {
      this[index] = item
    })
    this.length = dom.length
  }
  Init.prototype = {
    constructor: Jquery,
    //封装循环方法
    each: function(callback) {
      for (let i = 0; i < this.length; i++) {
        callback && callback(this[i], i)
      }
    },
    //css函数
    css: function(property, value) {
      //获取功能
      if (value === undefined) {
        return document.defaultView.getComputedStyle(this)[property]
      }
      //设置功能
      this.each(function(item) {
        item.style[property] =
          property.toString().indexOf('px') === -1 ? value + 'px' : value
      })
      return this
    },
    //增加class
    addClass: function(className) {
      this.each(function(item) {
        item.classList.add(className)
      })
      return this
    },
    //移出class
    removeClass: function(className) {
      this.each(function(item) {
        item.classList.remove(className)
      })
      return this
    },
    //toggle方法
    toggleClass: function(className) {
      this.each(function(item) {
        item.classList.toggleClass(className)
      })
      return this
    }
  }
  //对外保持引用，运行不被销毁（闭包的使用）
  window.Jquery = window.$ = Jquery
})()

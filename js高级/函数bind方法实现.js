;(function() {
  /*--------------------------------简单版本------------------------------------ */
  /**
   * @description 简单实现bind方法
   * @parame context    Object[必选]      指定调用函数的对象
   */
  Function.prototype.myBind = function(context) {
    //self 调用函数的对象
    var self = this
    //options bind方法除第一个外的参数
    var optios = [].slice.call(arguments, 1)
    //返回一个函数
    return function() {
      //为实现柯里化，返回函数可以继续调用传入参数
      var innerArgs = [].slice.call(arguments)
      var finalArgs = optios.concat(innerArgs)
      //绑定this 执行
      return self.apply(context, finalArgs)
    }
  }
  /*-------------------------------能使用构造函数版本------------------------------------ */
  /**
   * @description 比较严谨一点的bind方法实现(返回的函数可以做为回调函数调用)
   * @parame context    Object[必选]      指定调用函数的对象
   */
  Function.prototype.myBind = function(context) {
    //options bind方法除第一个外的参数
    var optios = [].slice.call(arguments, 1)
    //self 调用函数的对象
    var self = this
    //定义一个函数做中转
    var F = function() {}
    //返回一个函数
    var bound = function() {
      //为实现柯里化，返回函数可以继续调用传入参数
      var innerArgs = [].slice.call(arguments)
      var finalArgs = optios.concat(innerArgs)
      //绑定this 执行
      return self.apply(this instanceof bound ? this : context, finalArgs)
    }
    //
    F.prototype = self.prototype
    bound.prototype = new F()
    return bound
  }
  /*--------------------------------最终版本------------------------------------ */
  if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        //抛出错误
        throw new TypeError(
          'Function.prototype.bind - what is trying to be bound is not callable'
        )
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
          // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(
            this instanceof fBound ? this : oThis,
            // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
            aArgs.concat(Array.prototype.slice.call(arguments))
          )
        }

      // 维护原型关系
      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype
      }
      // 下行的代码使fBound.prototype是fNOP的实例,因此
      // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
      fBound.prototype = new fNOP()

      return fBound
    }
  }
})()

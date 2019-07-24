/**
 * @description 状态模式封装的检查器
 * @date 2019-7-24
 * @author Joe
 * @github one-andong@github.com
 */
//强行面向对象
class Validator {
  /**
   * @param isNoEmpty  [function]  判断字符串是否为空
   */
  constructor() {
    this.validateFuncs = []
    //策略=>状态
    this.strategies = {
      isNoEmpty: function(value, msg) {
        if (value.trim().length < 1) {
          return msg
        }
      },
      miniLength: function(value, length, msg) {
        if (value.length < length) {
          return msg
        }
      }
    }
  }
  //添加策略 => 符合开放封闭原则
  addStrategies(parames) {
    for (let key of parames) {
      this.strategies[key] = parames[key]
    }
  }
  //添加检查器
  add(target, arr) {
    for (let i = 0; i < arr.length; i++) {
      const temp = arr[i]
      //生成验证函数
      const fn = () => {
        //将name属性字符串分割成数组
        const oParame = temp.name.split(':')
        //取出函数名
        const fnName = oParame.shift()
        //oParame 为name属性下带的其它参数的集合 name属性字符格式=>fnName:parame:parame
        oParame.push(temp.msg)
        oParame.unshift(target.value)
        //返回函数运行结果 oParame是包含所有参数的数组
        return this.strategies[fnName].apply(target, oParame)
      }
      //将验证函数加入检查器数组
      this.validateFuncs.push(fn)
    }
  }
  //执行所有检查函数 并返回结果
  start() {
    for (let i = 0; i < this.validateFuncs.length; i++) {
      //执行检查函数
      const msg = this.validateFuncs[i]()
      //判断检查函数返回值，返回值不为undefined的话说明验证不通过，直接返回提示信息
      if (msg) {
        return msg
      }
    }
  }
}
//对外暴露接口
export default Validator

//--------------------------------------------工具API----------------------------------------
/**
    getRandom:获取一个【m,n】的随机数字
    
 
 */
var T = {
  getRandom: function(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m)
  },
  formateDate: function() {
    const date = new Date()
    let y = date.getFullYear()
    let t = this.addZero(date.getMonth() + 1)
    let d = this.addZero(date.getDate())
    let h = this.addZero(date.getHours())
    let m = this.addZero(date.getMinutes())
    let s = this.addZero(date.getSeconds())
    return y + '-' + t + '-' + d + '  ' + h + ':' + m + ':' + s
  },
  addZero: function(val) {
    if (val < 10) {
      val = '0' + val
    }
    return val
  },
  primaryKey: function() {
    return Date.now() + '' + this.getRandom(1000000000, 9999999999)
  }
}

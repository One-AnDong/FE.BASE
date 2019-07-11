class Drag {
  constructor(elem) {
    this.oBox = document.getElementById(elem)
    this.startX = 0
    this.startY = 0
    this.currentX = 0
    this.currentY = 0
    this.distanceX = 0
    this.distanceY = 0
    this.initPosX = 0
    this.initPosY = 0
    this.init()
  }
  init() {
    this.oBox.addEventListener('mousedown', e => {
      this.startX = e.pageX
      this.startY = e.pageY
      this.initPosX = this.getTargetPos(this.oBox)['x']
      this.initPosY = this.getTargetPos(this.oBox)['y']
      var seft = this09
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
      function move(e) {
        console.log(seft)
        var currentX = e.pageX
        var currentY = e.pageY
        var distanceX = currentX - seft.startX
        var distanceY = currentY - seft.startY
        var pos = {
          x: seft.initPosX + distanceX,
          y: seft.initPosY + distanceY
        }
        seft.setTargetPos(seft.oBox, pos)
      }
    })
  }
  getStyle(elem, property) {
    return document.defaultView.getComputedStyle
      ? document.defaultView.getComputedStyle(elem, null)[property]
      : elem.currentStyle[property]
  }
  getTransform() {
    const transformArr = [
      'transform',
      'webkitTransform',
      'MozTransform',
      'msTransform',
      'OTransform'
    ]
    const divStyle = document.createElement('div').style
    let len = transformArr.length
    for (let i = 0; i < len; i++) {
      if (transformArr[i] in divStyle) {
        return transformArr[i]
      }
    }
  }
  getTargetPos(elem) {
    var pos = {
      x: 0,
      y: 0
    }
    var transform = this.getTransform()
    if (transform) {
      var transformValue = this.getStyle(elem, transform)

      if (transformValue === 'none') {
        return pos
      } else {
        var temp = transformValue.match(/-?\d+/g)
        return (pos = {
          x: parseInt(temp[4].trim()),
          y: parseInt(temp[5].trim())
        })
      }
    } else {
      if (getStyle(elem, 'position') === 'static') {
        elem.style.position = 'relative'
        return pos
      } else {
        var tempL = getStyle(elem, 'left') ? getStyle(elem, 'left') : 0
        var tempT = getStyle(elem, 'top') ? getStyle(elem, 'top') : 0

        return (pos = {
          x: parseInt(tempL),
          y: parseInt(tempT)
        })
      }
    }
  }
  setTargetPos(elem, pos) {
    var transform = this.getTransform()
    if (transform) {
      elem.style.transform = `translate(${pos.x}px,${pos.y}px)`
    } else {
      elem.style.left = pos.x + 'px'
      elem.style.top = pos.y + 'px'
    }
  }
}

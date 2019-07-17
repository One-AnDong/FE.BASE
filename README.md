# 前言

一个记录学习代码和总结的仓库

# 正文

这个仓库包括了基础部分的一些知识，我会一直迭代更新一些东西的实现方式，虽然开始的时候比较杂，我会坚持的去更新和迭代掉一些知识点，专注于基础。

## 1 JS 基础

### 1 参数传递

#### 1 浅拷贝

js 中不能直接操作指针，引用类型的定义的时候直接在堆内存中开拓一块空间，返回一个地址保存在栈内存中，并赋值给变量。引用类型传递时传递的是一个地址，所以当你进行储存操作时会互相影响，是一个浅拷贝

#### 2 深拷贝

slice(),concat()并不是完整的深拷贝，拷贝的时候只会拷贝第一层

```javascript
const data = [1, [2, 3], 4, 5]
const newData = data.slice()
newData[0] = 6
newData[1][0] = 7
console.log(data) // [1, [7, 3], 4, 5]
console.log(newData) //[6, [7, 3], 4, 5]
```

## 2 原型链

1. Function.prototype 指向一个 js 的内置函数，Object.prototype 指向根源对象
2. 原型链关系：根源对象==>内置函数==>{Function(),Object(),toString()}
3. 关于 Function.**proto** === Function.prototype 的结果为 true，Function 做为 Function.Prototype 的实例，所以 Function.**proto**自然指向 Function.prototype

```
Function.__proto__ === Function.prototype //true
Object.__proto__=== Function.prototype //true
Function.prototype.__proto__ === Object.prototype //true
```

## 3 new 关键字的实现

```javascript
//new 关键字的做的操作
  function New(fn) {
   //创建一个对象
    var res = {}
    //把新对象的__proto__指向构造函数的Prototype
    if (fn.prototype !== null) {
      res.__proto__ = fn.prototype
    }
    //把this指向创建的新对象执行函数
    var ret = fn.apply(res, Array.prototype.slice.call(arguments)，1)
    //如果构造函数有返回值，对象或者是函数则return出该值
    if (
      typeof ret === 'object' ||
      (typeof ret === 'function' && ret !== null)
    ) {
      return ret
    }
    //默认返回新对象
    return res
  }
 //测试
  function PERSON() {
    this.name = 'Joe'
    this.age = 18
  }
  PERSON.prototype.getName = function() {
    return this.name
  }
  PERSON.prototype.getAge = function() {
    return this.age
  }
  var obj = New(PERSON)
  console.log(obj.getName())
```

### 4 函数默认值的设置方式

```javascript
function getSum(val) {
  /**
   * 使用Object.assign 来设置参数默认值
   * 参数只有1-2个时设置默认值建议使用 get(a=0,b=0,c=0)
   */
  var val = Object.assign(
    {
      a: 0,
      b: 0,
      c: 0
    },
    val
  )
  console.log(val.a)
  //解构赋值
  var { a, b, c } = val
  return a + b + c
}
//调用函数的时候如果超过三个建议使用一个{}传输
console.log(getSum())
```

### 5 数组方法

#### 1 不会改变原数组的数组方法

```javascript
slice() 返回新数组
join() 返回字符串
concat() 返回新数组
map()  返回新数组
filter()返回新数组
```

#### 2 会改变原数组的数组方法

```javascript
push()，unshift()返回数组长度
pop()，shift()返回被删除的值
reverse() 返回倒序后的数组
splice() 返回被删除的值,类型是数组

```

## 2 DOM 基础

- [ ] 放大镜效果
- [ ] 拖拽效果
- [ ] tab 栏效果
- [ ] 移动端点击事件封装
- [ ] 微博发布效果

## 3 JS 高级

### bind 方法的简单实现

```javascript
/*-------------------------------简单版本-------------------------------------*/
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
```

```javascript
/*------------------------------能使用构造函数版本------------------------------- */
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
```

```javascript
/*----------------------------------最终版本------------------------------------ */

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
```

### 1 JS 高级知识点

#### 面向对象&&原型链

### 作用域链&&闭包

#### this 的指向问题

### 2 使用 es6 封装 tab 栏封装

```html
<!-- S tab组件 -->
<div class="container" id="container">
  <div class="nav" id="nav">
    <div class="nav__item nav__item_active" data-tab="0">1</div>
    <div class="nav__item " data-tab="1">2</div>
    <div class="nav__item" data-tab="2">3</div>
  </div>
  <!-- /tab导航栏模块 -->

  <div class="content" id="content">
    <div class="content_item content__item_active">1</div>
    <div class="content_item">2</div>
    <div class="content_item">3</div>
  </div>
  <!-- /tab内容模块 -->
</div>
<!-- E tab组件 -->
```

```less
/* tab栏模块
-------------------------------------------*/
.container {
  width: 100%;
  border: 1px solid skyblue;
  border-radius: 5px;
}

/* tab导航 */
.nav {
  display: flex;

  .nav__item_active {
    background: skyblue;
    color: white;
  }
}

.nav__item {
  flex: 1;
  padding: 5px 0;
  text-align: center;
}

/* tab内容 */
.content {
  position: relative;
  border-top: 1px solid #666;
  padding-top: 30%;

  .content__item_active {
    display: block;
  }
}

.content_item {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
}
```

```javascript
/*-------------------------------tab栏封装---------------------------------------- */
class Tab {
  /**
   * @author Joe
   * @date 2019-7-14
   * @param {string} container  [必选]   tab的目标容器，必选
   * @param {Object} options    [可选]   navId导航栏ID选择器，contentId tab内容Id
   */
  constructor(container, options) {
    options = Object.assign(
      {
        navId: '#nav',
        contentId: '#content',
        navActive: 'nav__item_active',
        contentActive: 'content__item_active',
        event: 'mouseover'
      },
      options
    )
    if (typeof container === 'string') {
      let res = container.startsWith('#') ? container : '#' + container
      this.container = document.querySelector(res)
    } else {
      return
    }
    this.options = options
    //提升代码的健壮性
    this.$nav = options.navId.startsWith('#')
      ? options.navId
      : '#' + options.navId
    this.$content = options.contentId.startsWith('#')
      ? options.contentId
      : '#' + options.contentId
    this.current = 0
    this.init()
  }
  init() {
    //添加事件
    this.addEvent()
  }
  addEvent() {
    //获取tab导航栏对象
    const tabs = document.querySelector(this.$nav)
    //调用map循环添加点击事件
    ;[].map.call(tabs.children, item => {
      item.addEventListener(this.options.event, () => {
        //设置当前tab高亮
        this.setTab(tabs.children, item)
        //设置显示对应内容
        this.setContent(item)
      })
    })
  }
  /**
   * @description 设置tab导航栏样式
   * @param {Object} tabList  tab栏所有子元素对象
   * @param {Object} tabItem  当前点击的元素对象
   */
  setTab(tabList, tabItem) {
    ;[].map.call(tabList, item => {
      item.classList.remove(this.options.navActive)
    })
    tabItem.classList.add(this.options.navActive)
  }
  /**
   * @description 设置tab显示的内容
   * @param {object} currentTab 当前点击的元素对象
   */
  setContent(currentTab) {
    const oCont = document.querySelector(this.$content).children
    let id = currentTab.dataset.tab
    this.current = id
    //移出class
    ;[].map.call(oCont, item => {
      item.classList.remove(this.options.contentActive)
    })
    oCont[id].classList.add(this.options.contentActive)
  }
}
//对外暴露接口
export default Tab
```

### 3 封装属于自己的 Jquery

```javascript
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
      const arr = ['background', 'color', 'backgroundColor']

      this.each(function(item) {
        //判断如果是数组内的的元素则无需添加单位直接赋值
        if (arr.indexOf(property) !== -1) {
          item.style[property] = value
        } else {
          item.style[property] =
            property.toString().indexOf('px') === -1 ? value + 'px' : value
        }
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
```

￼￼

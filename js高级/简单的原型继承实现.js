;(function() {
  /**
   *
   * @param {Object} prototype   [必选]  父类的prototype对象
   * @param {Object} options     [必选]  子类的prototype对象，必须传入constructor属性
   */
  function Create(prototype, options) {
    //创建一个新对象
    const res = {}
    //把对象的proto指向父类的原型对象
    res.__proto__ = prototype
    //把需要添加到子类prototype属性上的对象和方法设置到对象上
    Object.defineProperties(res, options)
    //返回该对象
    return res
  }

  //测试 Person为父类，Student为子类
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  Person.prototype = {
    constructor: 'Person',
    getName() {
      console.log(this.name)
    }
  }
  function Student(name, age, number) {
    Person.call(this, name, age)
    this.number = number
  }
  //把创建的对象挂载到子类的prototype属性上实现继承
  Student.prototype = Create(Person.prototype, {
    constructor: {
      value: Student
    },
    getAge: {
      value: function() {
        console.log(this.age)
      }
    },
    getNumber: {
      value: function() {
        console.log(this.number)
      }
    }
  })

  var s1 = new Student('joe', 18, 23)
  s1.getAge() //18
  s1.getName() // joe
  s1.getNumber() //23
})()

function deepClone(obj) {
  const temp = {}
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      temp[key] = deepClone(obj[key])
    } else {
      temp[key] = obj[key]
    }
  }
  return temp
}
//测试代码
o1 = {
  name: 'joe',
  age: 12,
  code: {
    name: 'es6',
    age: 2015
  }
}
o2 = deepClone(o1)
o2.code.name = 'es2016'
o2.name = 'kt'
// console.log('o1:', o1, 'o2:', o2)
console.log(o1.code, o2.code)

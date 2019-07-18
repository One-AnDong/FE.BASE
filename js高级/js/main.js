import { deepClone } from './deepclone.js'
// //测试代码
const o1 = {
  name: 'joe',
  age: 12,
  code: {
    name: 'es6',
    age: 2015
  }
}
const o2 = deepClone(o1)
o2.code.name = 'es2016'
o2.name = 'kt'
// console.log('o1:', o1, 'o2:', o2)
console.log(o1.code, o2.code)

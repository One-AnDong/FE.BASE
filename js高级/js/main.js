import { deepClone } from './deepclone.js'
import { ajaxGet } from './ajax.js'

// //测试代码
// const o1 = {
//   name: 'joe',
//   age: 12,
//   code: {
//     name: 'es6',
//     age: 2015
//   }
// }
// const o2 = deepClone(o1)
// o2.code.name = 'es2016'
// o2.name = 'kt'
// console.log(o1.code, o2.code)

/*---------------------------------promise封装ajax------------------------------------------- */
const url = 'https://9008cf8b-d239-41e6-b557-4d48404b1de7.mock.pstmn.io/mockget'
// ajaxGet(url)
//   .then(function(res) {
//     console.log(res)
//     return '你的链接gg'
//   })
//   .then(function(res) {
//     console.log(res)
//   })

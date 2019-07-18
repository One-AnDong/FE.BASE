//简单的深拷贝实现
export function deepClone(obj) {
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

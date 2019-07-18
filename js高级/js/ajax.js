//简单封装ajax
export function ajaxGet(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send(null)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.response)
            resolve(data)
          } catch (error) {
            console.error(error)
          }
        } else {
          console.error('请求失败:', xhr.status)
          reject(xhr.status)
        }
      }
    }
  })
}

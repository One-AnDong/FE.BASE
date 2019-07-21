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
export function ajaxPost(url, options) {
  options = Object.assign(
    {
      data: '',
      type: 'application/x-www-form-urlencoded'
    },
    options
  )
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-type', options.type)
    xhr.send(options.data)
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
export function addr(path, host) {
  let h = host || 'http://127.0.0.1:8080'
  return path.replace(/\/api/, h)
}
export function getUrlEncoded(elem) {
  if (elem !== undefined) {
    if ($) {
      elem = elem[0]
    }
    const oInput = elem.elements
    let result = ''
    for (let i = 0; i < oInput.length; i++) {
      if (oInput[i].name) {
        result += `${oInput[i].name}=${oInput[i].value}&`
      }
    }
    return result
  }
}

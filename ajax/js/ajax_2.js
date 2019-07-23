class Ajax {
  /**
   * @date 2019-7-21
   * @author Joe
   * @param {Object} options [必选]
   */
  constructor(options) {
    this.options = Object.assign(
      {
        url: '',
        method: 'GET',
        mime: 'application/x-www-form-urlencoded',
        data: null,
        cache: false,
        file: false
      },
      options
    )
    //返回一个promise对象
    return this.promiseInstance()
  }
  getRandom() {
    return Date.now()
  }
  getUrl() {
    let url = this.options.url
    //判断如果是get请求，直接把参数填写在url中
    let isGet = /get||GET/.test(this.options.method)
    let cache = this.options.cache
    let symbol = this.options.url.indexOf('?') > -1 ? '&' : '?'
    if (isGet) {
      !cache ? (url += symbol + this.getRandom()) : null
    }
    return url
  }

  promiseInstance() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const url = this.getUrl()
      const method = this.options.method
      //填写初始化请求地址和方式
      xhr.open(method, url)
      //判断如果是post请求，填写上请求头和请求体数据
      if (this.options.method === 'POST') {
        !this.options.file
          ? xhr.setRequestHeader('Content-type', this.options.mime)
          : null
        xhr.send(this.options.data)
      } else {
        xhr.send(null)
      }
      //判断ajax状态，4为响应数据解析完成
      xhr.onreadystatechange = () => {
        // 状态码不为4的时候直接return
        if (!xhr || xhr.readyState !== 4) return
        //粗糙返回一个对象
        const response = {
          data: xhr.responseText,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders(),
          request: xhr
        }
        //status 状态为2xx 和 3xx的时候执行
        if (/^[2,3]\d{2}$/.test(xhr.status)) {
          resolve(response)
        } else {
          reject(response)
        }
      }
    })
  }
}
//对外暴露接口
export default Ajax
//对外暴露接口
export default Ajax
const tool = {
  host: 'http://127.0.0.1:8080',
  addr(path) {
    return path.replace(/\/api/, this.host)
  },
  setHost(host) {
    this.host = host
  }
}

export { tool }

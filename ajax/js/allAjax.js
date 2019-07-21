class Ajax {
  /**
   * @author Joe
   * @param {Object} options [必选]
   */
  constructor(options) {
    this.options = Object.assign(
      {
        url: '',
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        data: ''
      },
      options
    )
    //返回一个promise对象
    return this.promiseInstance()
  }
  promiseInstance() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      //判断如果是get请求，直接把参数填写在url中
      if (this.options.type === 'GET') {
        this.options.url += '?' + this.options.data
      }
      //填写初始化请求地址和方式
      xhr.open(this.options.type, this.options.url)
      //判断如果是post请求，填写上请求头和请求体数据
      if (this.options.type === 'POST') {
        xhr.setRequestHeader('Content-type', this.options.contentType)
        xhr.send(this.options.data)
      } else {
        xhr.send(null)
      }
      //判断ajax状态，4为响应数据解析完成
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText)
          } else {
            console.error('请求失败，状态码：', xhr.status)
            reject(xhr.status)
          }
        }
      }
    })
  }
}
//对外暴露接口
export default Ajax

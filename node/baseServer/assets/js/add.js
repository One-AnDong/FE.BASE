;(function() {
  const oSubmit = document.querySelector('#sub')
  const oFile = document.querySelector('#img')
  //添加事件
  oSubmit.addEventListener('click', handleClick)
  oFile.addEventListener('change', handleChange)
  //处理点击事件的函数
  function handleClick(e) {
    e.preventDefault()
    const data = serialize('#myform')
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:8989/addHero')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(data)
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return
      if (/^[2|3]\d{2}$/.test(xhr.status)) {
        const data = JSON.parse(xhr.response)
        console.log(data)
      }
    }
  }
  //处理change事件函数
  function handleChange() {
    // console.log('success')
    const formData = new FormData()
    formData.append('pic', this.files[0])
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:8989/uploadPic')
    xhr.send(formData)
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return
      if (xhr.status == 200) {
        console.log(123)
        const data = xhr.responseText
        console.log(data)
      }
    }
  }
  //获取表单数据的函数
  function serialize(selector) {
    if (!selector) return
    const oForm = document.querySelector(selector)
    const eles = oForm.querySelectorAll('[name]')
    const temp = []
    eles.forEach(item => {
      if (item.type === 'radio' && item.checked === false) return
      if (item.type === 'checkbox' && item.checked === false) return
      let key = item.name
      let val = item.value
      let str = `${key}=${val}`
      temp.push(str)
    })
    return temp.join('&')
  }
})()

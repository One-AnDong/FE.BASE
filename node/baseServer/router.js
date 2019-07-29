const fs = require('fs')
const pathName = require('url')
const querystring = require('querystring')
const heroContorller = require('./controller/heroController')
module.exports = (req, res) => {
  const oUrl = pathName.parse(req.url, true)
  let url = oUrl.pathname
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write('欢迎访问我的主页：localhost:8989')
    res.end()
  } else if (url.startsWith('/assets')) {
    //加载静态资源
    heroContorller.staticResponse(req, res)
  } else if (url == '/views/index.html') {
    //加载index页面
    heroContorller.showIndex(req, res)
  } else if (url == '/views/add.html') {
    fs.readFile(__dirname + url, 'utf-8', (err, data) => {
      res.write(data)
      res.end()
    })
  } else if (url === '/addHero' && req.method === 'POST') {
    // let heroData = ''
    //post请求数据接收事件 数据以数据包的形式发送
    // req.on('data', chunk => {
    //   heroData += chunk
    // })
    // //post请求数据接收完毕
    // req.on('end', () => {
    //   //将接收的post请求数据（字符串等）格式化为对象
    //   const _json = querystring.parse(heroData)
    //   //读取本地数据
    //   fs.readFile(__dirname + '/data/hero.json', 'utf-8', (error, rest) => {
    //     const temp = JSON.parse(rest)
    //     //定义一个变量id
    //     let id = 0
    //     //循环读取出来的本地数据（数组），将数组内最大的id值赋值给变量id
    //     temp.map(item => {
    //       if (item.id > id) {
    //         id = item.id
    //       }
    //     })
    //     //给post上来的数据添加一个比数组内最大id大1的id值
    //     _json.id = id + 1
    //     // 把post的数据添加到读取的数组内
    //     temp.push(_json)
    //     //将数组转化成json字符串
    //     const result = JSON.stringify(temp)
    //     //将json字符串以utf-8的格式写入本地文件
    //     fs.writeFile(__dirname + '/data/hero.json', result, 'utf-8', erro => {
    //       if (erro) throw erro
    //       res.end(
    //         JSON.stringify({
    //           status: 200,
    //           msg: '添加成功'
    //         })
    //       )
    //     })
    //   })
    // })
    //回调地狱版本
    // let addData = ''
    // req.on('data', chunk => {
    //   addData += chunk
    // })
    // req.on('end', () => {
    //   const _json = querystring.parse(addData)
    //   heroContorller.addHero(req, res, (err, re) => {
    //     const result = JSON.parse(re)
    //     const id = result[0].id
    //     result.map(item => {
    //       if (_json.id > id) {
    //         id = item.id
    //       }
    //     })
    //     _json.id = id + 1
    //     result.push(_json)
    //     const newArr = JSON.stringify(result)
    //     heroContorller.setHero(req, res, newArr, (err, rest) => {
    //       if (err) throw err
    //       res.end(
    //         JSON.stringify({
    //           status: 200,
    //           msg: '添加成功'
    //         })
    //       )
    //     })
    //   })
    // })
    heroContorller.addHero(req, res)
  } else if (url === '/uploadPic') {
    if (req.method === 'POST') {
      let result = ''
      req.setEncoding('binary')
      console.log('请求来了')
      req.on('data', chunk => {
        result += chunk
      })
      req.on('end', () => {
        fs.writeFile(
          __dirname + `/assets/image/${Date.now()}.jpg`,
          result,
          'binary',
          err => {
            if (err) throw err
            res.end('响应结束')
          }
        )
      })
    }
  } else {
    res.end('404')
  }
}

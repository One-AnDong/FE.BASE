const Model = require('../model/heroModel')
const path = require('path')
const template = require('art-template')
const querystring = require('querystring')
module.exports = {
  //处理静态资源
  staticResponse(req, res) {
    //静态资源的地址
    // const url = path.join(__dirname, `..${req.url}`)
    //给css文件添加响应头
    if (req.url.endsWith('css')) {
      res.setHeader('Content-Type', 'text/css;charset=utf-8')
    }
    //读取静态资源
    Model.getStatic(req.url, function(err, data) {
      res.end(data)
    })
  },
  showIndex(req, res) {
    //添加cookie
    const expires = new Date(Date.now() + 1000 * 10).toUTCString()
    const url = path.join(__dirname, '../data/hero.json')
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
      'Set-Cookie': ['name=kt', 'password=1234', 'expires=' + expires]
    })

    Model.getIndex(url, function(err, data, path) {
      if (err) throw err
      const list = JSON.parse(data)
      const html = template(path, { list })
      res.end(html)
    })
  },
  addHero(req, res) {
    let addData = ''
    req.on('data', chunk => {
      addData += chunk
    })
    req.on('end', () => {
      const _json = querystring.parse(addData)
      Model.getHero((err, re) => {
        const result = JSON.parse(re)
        const id = result[0].id
        result.map(item => {
          if (_json.id > id) {
            id = item.id
          }
        })
        _json.id = id + 1
        result.push(_json)
        const newArr = JSON.stringify(result)
        //调用写入模块
        Model.writeFile(newArr, err => {
          if (err) throw err
          res.end(
            JSON.stringify({
              status: 200,
              msg: '添加成功'
            })
          )
        })
      })
    })
  }
  // addHero(req, res, callback) {
  //   const url = path.join(__dirname, '../data/hero.json')
  //   Model.getHero(url, function(err, data) {
  //     callback && callback(err, data)
  //   })
  // },
  // setHero(req, res, data, callback) {
  //   const url = path.join(__dirname, '../data/hero.json')
  //   Model.setHero(url, data, function(err) {
  //     callback && callback(err)
  //   })
  // }
}

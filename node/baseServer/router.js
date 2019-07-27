const fs = require('fs')
const template = require('art-template')
module.exports = (req, res) => {
  let url = req.url
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write('欢迎访问我的主页：localhost:8989')
    res.end()
  } else if (url.startsWith('/assets')) {
    if (url.endsWith('css')) {
      res.setHeader('Content-Type', 'text/css;charset=utf-8')
    }
    fs.readFile(__dirname + url, (err, data) => {
      res.write(data)
      res.end()
    })
  } else if (url == '/views/index.html') {
    fs.readFile(__dirname + '/data/hero.json', 'utf-8', (err, data) => {
      if (err) throw err
      const list = JSON.parse(data)
      const html = template(__dirname + url, { list })
      res.end(html)
    })
  } else {
    res.end('404')
  }
}

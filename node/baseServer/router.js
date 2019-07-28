const fs = require('fs')
const template = require('art-template')
const pathName = require('url')
const querystring = require('querystring')
module.exports = (req, res) => {
  const oUrl = pathName.parse(req.url, true)
  let url = oUrl.pathname
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write('欢迎访问我的主页：localhost:8989')
    res.end()
  } else if (url.startsWith('/assets')) {
    if (url.endsWith('css')) {
      res.setHeader('Content-Type', 'text/css;charset=utf-8')
    }
    fs.readFile(__dirname + url, (err, data) => {
      res.end(data)
    })
  } else if (url == '/views/index.html') {
    const expires = new Date(Date.now() + 1000 * 10).toUTCString()
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=utf-8',
      'Set-Cookie': ['name=kt', 'password=1234', 'expires=' + expires]
    })
    fs.readFile(__dirname + '/data/hero.json', 'utf-8', (err, data) => {
      if (err) throw err
      const list = JSON.parse(data)
      const html = template(__dirname + url, { list })
      res.end(html)
    })
  } else if (url == '/views/add.html') {
    fs.readFile(__dirname + url, 'utf-8', (err, data) => {
      res.write(data)
      res.end()
    })
  } else if (url === '/addHero') {
    if (req.method === 'GET') return
    let heroData = ''
    req.on('data', chunk => {
      heroData += chunk
    })
    req.on('end', () => {
      const _json = querystring.parse(heroData)
      fs.readFile(__dirname + '/data/hero.json', 'utf-8', (error, rest) => {
        const temp = JSON.parse(rest)
        _json.id = temp.length + 1
        temp.push(_json)
        const result = JSON.stringify(temp)
        fs.writeFile(__dirname + '/data/hero.json', result, 'utf-8', erro => {
          if (erro) throw erro
          res.end(
            JSON.stringify({
              status: 200,
              msg: '添加成功'
            })
          )
        })
      })
    })
  }else if(){} 
  else {
    res.end('404')
  }
}

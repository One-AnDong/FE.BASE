const http = require('http') //commonJS 规范
const router = require('./router')
const server = http.createServer()
server.listen('8989', () => {
  console.log('服务器启动成功：localhost:8989')
})
server.on('request', (req, res) => {
  router(req, res)
})

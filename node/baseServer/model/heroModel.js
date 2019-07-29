const fs = require('fs')
const path = require('path')
module.exports = {
  //读取静态资源
  getStatic(url, callback) {
    fs.readFile(this.getPath(url), (err, data) => {
      callback && callback(err, data)
    })
  },
  getIndex(url, callback) {
    fs.readFile(url, 'utf-8', (err, data) => {
      const indexPath = path.join(__dirname, '../views/index.html')
      callback && callback(err, data, indexPath)
    })
  },
  getHero(callback) {
    const url = path.join(__dirname, '../data/hero.json')
    fs.readFile(url, 'utf-8', (err, data) => {
      callback && callback(err, data)
    })
  },
  writeFile(data, callback) {
    const url = path.join(__dirname, '../data/hero.json')
    fs.writeFile(url, data, 'utf-8', err => {
      callback && callback(err)
    })
  },
  // getHero(url, callback) {
  //   fs.readFile(url, 'utf-8', (err, data) => {
  //     callback && callback(err, data)
  //   })
  // },
  // setHero(url, data, callback) {
  //   fs.writeFile(url, data, 'utf-8', err => {
  //     callback && callback(err)
  //   })
  // },
  getPath(url) {
    return path.join(__dirname, `..${url}`)
  }
}

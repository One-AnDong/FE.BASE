;(function() {
  const data = [
    {
      id: 1,
      text: '一级菜单',
      parentId: null
    },
    {
      id: 2,
      text: '一级菜单',
      parentId: null
    },
    {
      id: 3,
      text: '一级菜单',
      parentId: null
    },
    ,
    {
      id: 4,
      text: '二级菜单',
      parentId: 1
    },
    {
      id: 5,
      text: '二级级菜单',
      parentId: 2
    },
    {
      id: 6,
      text: '二级菜单',
      parentId: 3
    },
    {
      id: 7,
      text: '三级菜单',
      parentId: 4
    },
    {
      id: 8,
      text: '三级菜单',
      parentId: 5
    },
    {
      id: 9,
      text: '三级菜单',
      parentId: 6
    },
    {
      id: 10,
      text: '四级菜单',
      parentId: 7
    },
    {
      id: 11,
      text: '四级菜单',
      parentId: 8
    },
    {
      id: 12,
      text: '四级菜单',
      parentId: 9
    },
    {
      id: 13,
      text: '五级菜单',
      parentId: 10
    },
    {
      id: 14,
      text: '五级菜单',
      parentId: 11
    },
    {
      id: 15,
      text: '五级菜单',
      parentId: 12
    }
  ]
  //生成树形结构
  /**
   * @param {Array} arr  [必选]   传入原始数据
   * @param {String} parentId  [必选]    parentid属性
   */
  function Create(arr, parentId) {
    var temp = []
    arr.forEach(item => {
      if (item.parentId === parentId) {
        temp.push(item)
        item.child = Create(arr, item.id)
      }
    })
    return temp
  }
  var menuData = Create(data, null)
  //动态生成html结构
  function createHtml(arr, target) {
    const oUl = document.createElement('ul')
    oUl.classList.add('hide')
    target.appendChild(oUl)
    arr.forEach(item => {
      const oLi = document.createElement('li')
      oLi.innerHTML = `<a href="#">${item.text}</a>`
      oUl.appendChild(oLi)
      if (item.child.length !== 0) {
        createHtml(item.child, oLi)
      }
    })
  }
  let oNav = document.querySelector('.nav')
  createHtml(menuData, oNav)
  //显示一级菜单
  oNav.children[0].classList.remove('hide')
  //事件委托
  oNav.addEventListener('click', function(e) {
    if (e.target.nodeName === 'A') {
      var target = e.target.nextElementSibling
      if (target !== null) {
        target.classList.toggle('hide')
      }
    }
  })
})()

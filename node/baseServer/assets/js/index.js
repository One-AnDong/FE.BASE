;(function() {
  const oTbody = document.querySelector('#tbody')
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:8989/getHero')
  xhr.send(null)
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        let html = ''
        data.forEach(item => {
          html += `<tr>
                      <td>${item.id}</td>
                      <td>${item.name}</td>
                      <td>${item.gender}</td>
                      <td><img src="${item.img}"></td>
                      <td><a href="/views/edit.html?id=1">修改</a>
                        <a data-id="1" href="javascript:void(0);">删除</a>
                      </td>
                    </tr>`
        })
        oTbody.innerHTML = html
      }
    }
  }
})()

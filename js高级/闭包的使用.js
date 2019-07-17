;(function() {
  function handleClick() {
    let tickets = 0
    return function() {
      tickets++
      this.value = `喜欢她(${tickets})`
    }
  }
  //闭包的使用
  const oTickets = document.querySelectorAll('.tickets')
  oTickets.forEach(item => {
    item.addEventListener('click', handleClick())
  })
})()

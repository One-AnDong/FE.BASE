import Tab from './tab.js'
class AutoTab extends Tab {
  constructor(container, options) {
    //构造函数继承
    super(container, options)
    this.timer
    this.initAutoTab()
  }
  initAutoTab() {
    this.addMouseEvent()
  }
  addMouseEvent() {
    const tabs = document.querySelector(this.$nav)
    handleMouseout.bind(this)()
    ;[].map.call(tabs.children, item => {
      item.addEventListener('mouseover', handleMouseover.bind(this))
      item.addEventListener('mouseout', handleMouseout.bind(this))
    })
    function handleMouseover() {
      clearInterval(this.timer)
    }
    function handleMouseout() {
      let index = this.current
      this.timer = setInterval(() => {
        //设置当前tab高亮
        let current = ++index % tabs.children.length
        this.setTab(tabs.children, tabs.children[current])
        //设置显示对应内容
        this.setContent(tabs.children[current])
      }, 2000)
    }
  }
}
new AutoTab('container')

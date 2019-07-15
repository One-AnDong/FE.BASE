/*-------------------------------tab栏封装---------------------------------------- */
class Tab {
  /**
   * @author Joe
   * @date 2019-7-14
   * @param {string} container  [必选]   tab的目标容器，必选
   * @param {Object} options    [可选]   navId导航栏ID选择器，contentId tab内容Id
   */
  constructor(container, options) {
    options = Object.assign(
      {
        navId: '#nav',
        contentId: '#content',
        navActive: 'nav__item_active',
        contentActive: 'content__item_active'
      },
      options
    )
    if (typeof container === 'string') {
      let res = container.startsWith('#') ? container : '#' + container
      this.container = document.querySelector(res)
    } else {
      return
    }
    this.options = options
    //提升代码的健壮性
    this.$nav = options.navId.startsWith('#')
      ? options.navId
      : '#' + options.navId
    this.$content = options.contentId.startsWith('#')
      ? options.contentId
      : '#' + options.contentId

    this.init()
  }
  init() {
    //添加事件
    this.addEvent()
  }
  addEvent() {
    //获取tab导航栏对象
    const tabs = document.querySelector(this.$nav)
    //调用map循环添加点击事件
    ;[].map.call(tabs.children, (item, index) => {
      item.addEventListener('click', () => {
        //设置当前tab高亮
        this.setTab(tabs.children, item)
        //设置显示对应内容
        this.setContent(item)
      })
    })
  }
  /**
   * @description 设置tab导航栏样式
   * @param {Object} tabList  tab栏所有子元素对象
   * @param {Object} tabItem  当前点击的元素对象
   */
  setTab(tabList, tabItem) {
    ;[].map.call(tabList, item => {
      item.classList.remove(this.options.navActive)
    })
    tabItem.classList.add(this.options.navActive)
  }
  /**
   * @description 设置tab显示的内容
   * @param {object} currentTab 当前点击的元素对象
   */
  setContent(currentTab) {
    const oCont = document.querySelector(this.$content).children
    let id = currentTab.dataset.tab
    //移出class
    ;[].map.call(oCont, item => {
      item.classList.remove(this.options.contentActive)
    })
    oCont[id].classList.add(this.options.contentActive)
  }
}

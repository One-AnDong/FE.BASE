/*-------------------------------tab栏封装---------------------------------------- */
class Tab {
  /**
   *
   * @param {*} container  [必选]   tab的目标容器，必选
   * @param {*} options    [可选]   navId导航栏ID选择器，contentId tab内容Id
   */
  constructor(container, options) {
    options = Object.assign(
      {
        navId: '#nav',
        contentId: '#content'
      },
      options
    )
    if (typeof container === 'string') {
      let res = container.startsWith('#') ? container : '#' + container
      this.container = document.querySelector(res)
    } else {
      return
    }

    //代码的健壮性 拓展性 可塑性
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
  addEvent() {}
  setTab() {}
  setContetn() {}
}

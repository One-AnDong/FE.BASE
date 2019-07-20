//扩展jq
$.fn.extend({
  setError(msg) {
    this.removeClass('correct')
      .addClass('error')
      .attr('data-error', msg)
    return this
  },
  setCorrect(msg) {
    this.removeClass('error')
      .addClass('correct')
      .attr('data-correct', msg)
    return this
  },
  checkForm() {
    let status = true
    this.children().each((index, item) => {
      if ($(item).hasClass('error')) {
        status = false
      }
    })
    return status
  },
  toast(msg) {
    if ($('#toast').length > 0) {
      $('#toast')
        .html(`<span>${msg}</span>`)
        .fadeIn(200)
        .delay(1200)
        .fadeOut(200)
    } else {
      $('<div>')
        .attr('id', 'toast')
        .html(`<span>${msg}</span>`)
        .appendTo($('form'))
        .fadeIn(200)
        .delay(1200)
        .fadeOut(200)
    }
    return this
  }
})

/*class find*/
function find(el = null) {
  if (this.element === null) return
  this.element = (typeof el === 'object') ? el : document.querySelector(el)

  this.css = function(styles, add = false) {
    this.style = add ? this.element.getAttribute('style') : ''
    if (typeof styles === 'object') {
      for (var style in styles) {
        this.style += style + ':' + styles[style] + ';'
      }
      this.element.setAttribute('style', this.style)
      return this
    } else {
      return
    }
  }
}

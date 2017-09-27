(function(window, document) {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    new find('.container').css({
      'height': '32%',
      'margin-top': '10%'
    })

    new find('.controlls').css({
      'width': '80%',
      'bottom': '10%',
      'height': '33%',
      'margin': 'auto'
    })
    new find('#check').css({
      'width': '30%',
      'height': '30%',
      'line-height': '220px',
      'font-weight': '70px',
      'margin-left': '20px'
    })
    new find('#fold').css({
      'width': '30%',
      'height': '30%',
      'line-height': '220px',
      'font-weight': '70px',
      'margin-left': '20px'
    })
    new find('#bet').css({
      'width': '30%',
      'height': '30%',
      'line-height': '220px',
      'font-weight': '70px',
      'margin-left': '20px'
    })
  }





  /*flush > straights*/









  // new Game().init()
  // new Ganew userInterface().show.cards()

})(window, document)

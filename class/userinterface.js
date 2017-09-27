/*
		this class is for output contents in user side
		obj parameter is object of current class in order to access
		its public variables

*/

function userInterface(obj) {
  this.show = {
    cards: function(pl, pc, dl) {
      var htmlEls = obj.data.htmlComponent.elements
      switch (dl.length) {
        case 3:
          for (var index = 0; _dl = [htmlEls.dl1, htmlEls.dl2, htmlEls.dl3], index < _dl.length; index++) {
            new find(_dl[index]).css({
              'background-position-x': dl[index].pixel.x * (-1) + 'px',
              'background-position-y': dl[index].pixel.y * (-1) + 'px'
            })
          }
          break
        case 4:
          new find(htmlEls.dl4).css({
            'background-position-x': dl[3].pixel.x * (-1) + 'px',
            'background-position-y': dl[3].pixel.y * (-1) + 'px'
          })
          break
        case 5:
          new find(htmlEls.dl5).css({
            'background-position-x': dl[4].pixel.x * (-1) + 'px',
            'background-position-y': dl[4].pixel.y * (-1) + 'px'
          })
          break
        default:
          if (debugMode || obj.data.computer.show) {
            // if debug mode show oponents cards else hide it
            new find(htmlEls.pc1).css({
              'background-position-x': pc[0].pixel.x * (-1) + 'px',
              'background-position-y': pc[0].pixel.y * (-1) + 'px'
            })
            new find(htmlEls.pc2).css({
              'background-position-x': pc[1].pixel.x * (-1) + 'px',
              'background-position-y': pc[1].pixel.y * (-1) + 'px'
            })
          }
          for (var index = 0; _pl = [htmlEls.pl1, htmlEls.pl2], index < _pl.length; index++) {
            new find(_pl[index]).css({
              'background-position-x': pl[index].pixel.x * (-1) + 'px',
              'background-position-y': pl[index].pixel.y * (-1) + 'px'
            })
          }
      }
    },
    alert: function(html) {
      obj.data.game.finished.condition ? obj.data.htmlComponent.box.alert.innerHTML = html : null
    },
    money: function() {
      obj.data.htmlComponent.box.money.player.innerHTML = '$ ' + new userInterface(obj).add.spaceTo(obj.data.player.money)
      obj.data.htmlComponent.box.money.computer.innerHTML = '$ ' + new userInterface(obj).add.spaceTo(obj.data.computer.money)
      obj.data.htmlComponent.box.money.dealer.innerHTML = '$ ' + new userInterface(obj).add.spaceTo(obj.data.dealer.money)
    }
  }

  this.add = {
    spaceTo: function(num) {
      num = num.toString()
      var numSpltd = num.split('').reverse()
      for (var i = numSpltd.length - 1; i > 0; i--) {
        i % 3 == 0 ? numSpltd.splice(i, 0, ' ') : null
      }
      return numSpltd.reverse().join('')
    }
  }

  this.highlight = {
    cards: function(notSortedcards, valueCards) {
      if (obj.data.game.finished.inFavorOf.none) return
      /* this <if>  needs testing maybe its not necessary */
      if (typeof valueCards.rank !== 'undefined') {
        valueCards = [valueCards]
      }
      var inElements = new Array()
      var inDealer = [
        obj.data.htmlComponent.elements.dl1,
        obj.data.htmlComponent.elements.dl2,
        obj.data.htmlComponent.elements.dl3,
        obj.data.htmlComponent.elements.dl4,
        obj.data.htmlComponent.elements.dl5
      ]
      var inPlayer = [obj.data.htmlComponent.elements.pl1, obj.data.htmlComponent.elements.pl2]
      var inComputer = [obj.data.htmlComponent.elements.pc1, obj.data.htmlComponent.elements.pc2]
      if (obj.data.game.finished.inFavorOf.player) {
        inElements = inPlayer.concat(inDealer)
        notSortedcards = notSortedcards.player
      } else {
        inElements = inComputer.concat(inDealer)
        notSortedcards = notSortedcards.computer
      }
      notSortedcards.forEach(function(not, index) {
        valueCards.forEach(function(card) {
          if (not.rank.id == card.rank.id) {
            new find(inElements[index]).css({
              'box-shadow': ' 0px 15px 20px rgba(255,0,0,0.7)'
            }, true)
          }
        })
      })

    }
  }
}

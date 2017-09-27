/*  class for detecting value of cards*/
function Is(cards) {
  /*
  	default: sorted by rank
  */
  cards.sort(SortBy.rank)
  return {
    royalFlush: function() {
      /* highest ranking straight flush*/
      return
    },
    straightFlush: function() {
      /* if straight and flush at the same time*/
      return
    },
    fourOfAKind: function() {
      // print('four of king...')
      var counter = 1,
        _cards_ = [cards[0]]
      for (var index = 0; len = cards.length, index < len - 1; index++) {
        if (cards[index].rank.id == cards[index + 1].rank.id) {
          /*add card into _cards_ Array*/
          _cards_.push(cards[index + 1]) // same here coment is down
          /*Increment counter*/
          counter++
        } else {
          counter = 1
          _cards_ = [cards[index + 1]]
        }
        if (counter == 4) {
          /*Four of a Kind detected*/
          return {
            condition: true,
            cards: _cards_
          }
        }
      }
      return {
        condition: false
      }
    },
    fullHouse: function() {
      // print('fullHouse...')

      var counter = 1,
        _cards_ = [cards[0]],
        _group_cards_ = new Array()
      for (var index = 0; len = cards.length, index < len - 1; index++) {
        if (cards[index].rank.id == cards[index + 1].rank.id) {
          /*add card into _cards_ Array*/
          _cards_.push(cards[index + 1])
          /*Increment counter*/
          counter++
        } else {
          if (counter >= 2) {
            /* if 2 or more pair of ranks detected then add it to _group_cards_ array */
            _group_cards_.push(_cards_)
          }
          counter = 1
          _cards_ = [cards[index + 1]]
        }
      }
      /* check again if last element makes pair*/
      if (counter >= 2) {
        _group_cards_.push(_cards_)
      }
      var _sum_chk = false
      if (_group_cards_.length >= 2) {
        _group_cards_.forEach(function(e) {
          if (e.length == 3) {
            /* if greather then 3 its four of a kind and
             it will be checked by another one before execution of this function*/
            _sum_chk = true
          }
        })
      }
      return {
        condition: _sum_chk,
        cards: (_sum_chk ? _group_cards_ : [])
      }
    },
    flush: function() {
      // print('flush...')
      cards.sort(SortBy.suit)
      var counter = 1,
        _cards_ = [cards[0]]

      for (var index = 0; len = cards.length, index < len - 1; index++) {
        if (cards[index].suit.id == cards[index + 1].suit.id) {
          /*add card into _cards_ Array*/
          _cards_.push(cards[index + 1])
          /*Increment counter*/
          counter++
        } else {
          counter = 1
          _cards_ = [cards[index + 1]]
        }
        if (counter >= 5) {
          /* flush detected */
          return {
            condition: true,
            cards: _cards_
          }
        }
      }
      return {
        condition: false
      }
    },
    straight: function() {
      // print('straight...')
      var counter = 1,
        _cards_ = [cards[0]]
      /*

      	one has value only 1 vhich menas 10 jack queen king and one isnt flush
      	this one should be fixed :((((((()))))))

      */
      for (var index = 0; len = cards.length, index < len - 1; index++) {
        if (cards[index + 1].rank.id == parseInt(cards[index].rank.id + 1)) {
          /*add card into _cards_ Array*/
          _cards_.push(cards[index + 1])
          /*Increment counter*/
          counter++
        } else if (cards[index].rank.id == cards[index + 1].rank.id) {
          continue
        } else if (cards[0].rank.id == 1 && cards[index].rank.id == 13) {
          /* one is added after King*/
          counter++
          _cards_.push(cards[0])
        } else {
          counter = 1
          _cards_ = [cards[index + 1]]
        }
        if (counter == 5) {
          /*Four of a Kind detected*/
          return {
            condition: true,
            cards: _cards_
          }
        }
      }
      return {
        condition: false
      }
    },
    threeofAkind: function() {
      // print('threeofAkind...')
      var counter = 1,
        _cards_ = [cards[0]]
      for (var index = 0; len = cards.length, index < len - 1; index++) {
        if (cards[index].rank.id == cards[index + 1].rank.id) {
          /*add card into _cards_ Array*/
          _cards_.push(cards[index + 1]) // same here coment is down
          /*Increment counter*/
          counter++
        } else {
          counter = 1
          _cards_ = [cards[index + 1]]
        }
        if (counter >= 3) {
          /*Three of a Kind detected*/
          return {
            condition: true,
            cards: _cards_
          }
        }
      }
      return {
        condition: false
      }
    },
    twoPairs: function() {

      var counter = 1,
        _cards_ = [cards[0]],
        _group_cards_ = new Array()
      for (var index = 0; len = cards.length, index < len - 1; index++) {
        if (cards[index].rank.id == cards[index + 1].rank.id) {
          /*add card into _cards_ Array*/
          _cards_.push(cards[index + 1])
          /*Increment counter*/
          counter++
        } else {
          counter = 1
          _cards_ = [cards[index + 1]]
        }
        if (counter >= 2) {
          /* if 2 or more pair of ranks detected then add it to _group_cards_ array */
          _group_cards_.push(_cards_)
          counter = 1
          _cards_ = [cards[index + 1]]
        }
      }
      /* check again if last element makes pair*/
      if (counter >= 2) {
        _group_cards_.push(_cards_)
      }
      var _sum_chk = (_group_cards_.length >= 2 ? true : false)
      return {
        condition: _sum_chk,
        cards: (_sum_chk ? _group_cards_ : [])
      }
    },
    pair: function() {
      // print('pair...')
      var counter = 1,
        _cards_ = [cards[0]]
      for (var index = 0; len = cards.length, index < len - 1; index++) {
        if (cards[index].rank.id == cards[index + 1].rank.id) {
          /*add card into _cards_ Array*/
          _cards_.push(cards[index + 1])
          /*Increment counter*/
          counter++
        } else {
          counter = 1
          _cards_ = [cards[index + 1]]
        }
        if (counter >= 2) {
          return {
            condition: true,
            cards: _cards_
          }
        }
      }

      return {
        condition: false
      }
    },
    highCard: function() {
      // print('highCard...')
      var hcrd = cards[cards.length - 1]
      cards.forEach(function(e) {
        if (e.rank.id == 1) {
          hcrd = e
        }
      })
      return {
        condition: true,
        cards: hcrd
      }
    }
  }
}

	/* Class of Cards*/
	function Deck() {
	  /*returns sorted deck with all cards from 1 to King (four suit)*/
	  var cards = new Array()
	  var genRank = new Array()
	  var list = new Array('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king')
	  var pixW = 79,
	    pixH = 123
	  list.forEach(function(e, i) {
	    genRank.push({
	      id: i + 1,
	      name: e
	    })
	  })
	  var map = {
	    ranks: genRank,
	    suits: [{
	      id: 14,
	      name: 'clubs',
	      symbol: '♣'
	    }, {
	      id: 15,
	      name: 'diamonds',
	      symbol: '♦'
	    }, {
	      id: 16,
	      name: 'hearts',
	      symbol: '♥'
	    }, {
	      id: 17,
	      name: 'spades',
	      symbol: '♠'
	    }]
	  }

	  for (rank in map.ranks) {
	    for (suit in map.suits) {
	      cards.push({
	        rank: {
	          id: map.ranks[rank].id,
	          name: map.ranks[rank].name,
	        },
	        suit: {
	          id: map.suits[suit].id,
	          name: map.suits[suit].name,
	          symbol: map.suits[suit].symbol
	        },
	        pixel: {
	          x: pixW * rank,
	          y: pixH * suit
	        }
	      })
	    }
	  }

	  return cards
	}
	/*END of Class Cards*/

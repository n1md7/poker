/*
		COntroller class for managing all data and main functions
	 */
function Controller() {
  /*
			Here are all cards from 1
		 	to King (all suits)
		 	count = 52 from 0 to 51
	 	*/
  this.data = {
    deck: new Deck(),
    player: {
      cards: new Array(),
      money: 3500
    },
    computer: {
      cards: new Array(),
      money: 4050,
      show: false
    },
    dealer: {
      cards: new Array(),
      money: 0
    },
    distributing: 1,
    game: {
      finished: {
        condition: false,
        inFavorOf: {
          player: false,
          computer: false,
          none: false
        },
        combination: null
      }
    },
    fold: {
      player: false,
      computer: false
    },
    bet: {
      player: false,
      computer: false,
      money: 50
    },
    blind: {
      player: false,
      computer: false
    },
    rise: {
      player: false,
      computer: false,
      money: 0
    },
    htmlComponent: {
      button: {
        check: new find('#check').element,
        fold: new find('#fold').element,
        bet: new find('#bet').element,
        range: new find('#range').element
      },
      box: {
        alert: new find('#alert').element,
        money: {
          player: new find('#plMoney').element,
          computer: new find('#pcMoney').element,
          dealer: new find('#dlMoney').element
        }
      },
      elements: {
        pc1: '#pc1',
        pc2: '#pc2',
        pl1: '#pl1',
        pl2: '#pl2',
        dl1: '#dl1',
        dl2: '#dl2',
        dl3: '#dl3',
        dl4: '#dl4',
        dl5: '#dl5'
      }
    }
  }

  /*
  	pick one card from the deck
  */
  this.pick = function() {
    /* returning one card from deck and removing that card from array*/
    var remove = random.generate(0, this.data.deck.length - 1),
      card = this.data.deck[remove]
    this.data.deck.splice(remove, 1)
    return card
  }



  this.distributeCards = function() {
    var self = this;
    ([1, 2]).forEach(function() {
      self.data.player.cards.push(self.pick())
    });
    ([1, 2]).forEach(function() {
      self.data.computer.cards.push(self.pick())
    });
    ([1, 2, 3, 4, 5]).forEach(function() {
      self.data.dealer.cards.push(self.pick())
    });
  }


  this.resetGame = function() {
    /* reset all data except money*/
    document.querySelectorAll('.cards').forEach(function(e) {
      new find(e).css({
        'background-position-x': 158 * (-1) + 'px',
        'background-position-y': 492 * (-1) + 'px'
      })
    })
    this.data.fold.player = false
    this.data.fold.computer = false
    this.data.game.finished.condition = false
    this.data.game.finished.inFavorOf.player = false
    this.data.game.finished.inFavorOf.computer = false
    this.data.game.finished.inFavorOf.none = false
    this.data.blind.player = false
    this.data.bet.money = 10
    this.data.dealer.money = 0
    this.data.blind.computer = false
    this.data.player.cards = []
    this.data.computer.cards = []
    this.data.dealer.cards = []
    this.data.distributing = 1
    this.data.deck = new Deck()
    this.data.htmlComponent.box.alert.innerHTML = null
    this.data.htmlComponent.button.bet.removeAttribute('disabled')
    this.data.htmlComponent.button.check.innerHTML = 'check'
    this.data.htmlComponent.button.fold.removeAttribute('disabled')
    this.data.htmlComponent.button.bet.removeAttribute('disabled')

    /* start again*/
    this.distributeCards()
    this.loop()
  }

  this.makeProfit = function() {
    if (this.data.game.finished.inFavorOf.none) {
      /* if drawn give half of them to both*/
      this.data.player.money += this.data.dealer.money / 2
      this.data.computer.money += this.data.dealer.money / 2
      new userInterface(this).show.alert("Drawn, " + this.data.game.finished.combination)
      return
    }
    if (this.data.game.finished.inFavorOf.player && this.data.game.finished.condition) {
      new userInterface(this).show.alert("YOU WON! " + this.data.game.finished.combination)
      this.data.player.money += this.data.dealer.money
    } else if (this.data.game.finished.condition) {
      new userInterface(this).show.alert("COMPUTER WON! " + this.data.game.finished.combination)
      this.data.computer.money += this.data.dealer.money
    }
  }

  this.dealerGatheringBets = function() {
    if (this.data.player.money < this.data.bet.money || this.data.computer.money < this.data.bet.money) {
      this.data.htmlComponent.button.bet.setAttribute('disabled', '')
      return
    }

    /* Make firs bet, both pc and player */
    if (!this.data.blind.player) {
      this.data.dealer.money += this.data.bet.money
      this.data.player.money -= this.data.bet.money
      this.data.blind.player = true

    }
    if (!this.data.blind.computer) {
      this.data.dealer.money += this.data.bet.money
      this.data.computer.money -= this.data.bet.money
      this.data.blind.computer = true
    }
    /* if someone rised or doubled a bet */
    if (this.data.bet.player || this.data.bet.computer) {
      this.data.dealer.money += 2 * this.data.bet.money
      this.data.computer.money -= this.data.bet.money
      this.data.player.money -= this.data.bet.money
      this.data.bet.player = false
      this.data.bet.computer = false
    }
  }



  /* check player Cards*/
  this.loop = function() {
    this.dealerGatheringBets()
    new userInterface(this).show.money()


    var cardsPL = new Array(),
      cardsPC = new Array(),
      concatPC = [],
      concatPL = []
    cardsPL = this.data.player.cards
    cardsPC = this.data.computer.cards
    // console.log(cardsPC)
    new userInterface(this).show.cards(cardsPL, cardsPC, concatPL)

    if (this.data.distributing == 2) {
      for (var index = 0; index <= 2; index++) {
        /*distribute 3 cards*/
        concatPL.push(this.data.dealer.cards[index])
        concatPC.push(this.data.dealer.cards[index])

      }
      new userInterface(this).show.cards(cardsPL, cardsPC, concatPL)
    }
    if (this.data.distributing == 3) {
      /*distribute 4 cards*/
      for (var index = 0; index <= 3; index++) {
        concatPL.push(this.data.dealer.cards[index])
        concatPC.push(this.data.dealer.cards[index])
      }
      this.data.computer.show = true

      new userInterface(this).show.cards(cardsPL, cardsPC, concatPL)
    }
    if (this.data.distributing == 4) {
      /*distribute 5 cards*/
      for (var index = 0; index <= 4; index++) {
        concatPL.push(this.data.dealer.cards[index])
        concatPC.push(this.data.dealer.cards[index])
      }
      /* fi last distributing show  pc cards*/
      this.data.computer.show = false

      new userInterface(this).show.cards(cardsPL, cardsPC, concatPL)
    }

    cardsPL = cardsPL.concat(concatPL)
    cardsPC = cardsPC.concat(concatPC)
    var notSortedCards = {
      player: this.data.player.cards.concat(concatPL),
      computer: this.data.computer.cards.concat(concatPL)
    }

    if (this.data.fold.player) {
      // this.data.htmlComponent.box.alert.innerHTML= "PC wins"
      // this.data.player.money -= 10
      this.data.game.finished.inFavorOf.computer = true
      this.data.game.finished.condition = true

      this.makeProfit()
      new userInterface(this).show.money()

      this.resetGame()
      return
    }


    if (this.data.distributing == 4) {
      this.data.game.finished.condition = true
      /*player cards cheking*/
      print("PLAYER cards", 'rgba(255,0,0,0.6)', 20)
      var PL = new Cards(cardsPL).check()
      print('---------------------------------', 'yellow', 24)
      /*computer cards checking*/
      print("COMPUTER cards", 'rgba(0,255,0,0.6)', 20)
      var PC = new Cards(cardsPC).check()
			console.log(PC)
      if (PL.id == PC.id) {
        /*
        	both have same ranking cards
        */
        // if(PL.cards instanceof Array){
        // alert(PL.cards.length)
        new Cards([PC, PL]).compare(this)

      } else if (PL.id < PC.id) {
        print('Computer Wins', 'red', 56)
        this.data.game.finished.combination = PC.name
        this.data.game.finished.inFavorOf.computer = true
      } else /*if(PL.id > PC.id)*/ {
        print('Player Wins', 'green', 56)
        this.data.game.finished.inFavorOf.player = true
        this.data.game.finished.combination = PL.name
      }

      this.data.htmlComponent.button.check.innerHTML = 'START'
      this.data.htmlComponent.button.fold.setAttribute('disabled', '')
      this.data.htmlComponent.button.bet.setAttribute('disabled', '')
      this.makeProfit()
      new userInterface(this).show.money()
      console.log('%c before pass Player cards', 'color:rgba(255,0,0,0.4)')
      console.log(PL.cards)
      console.log('%c before pass Computer cards', 'color:rgba(255,0,0,0.4)')
      console.log(PC.cards)

      var pcArray = new Array()
      var _isArray = false
      if (PC.cards[0] instanceof Array) {
        _isArray = true
        PC.cards.forEach(function(e) {
          console.log(e)
          pcArray = pcArray.concat(e)
        })
      }

      var plArray = new Array()
      var _isArrayPl = false
      if (PL.cards[0] instanceof Array) {
        _isArrayPl = true
        PL.cards.forEach(function(e) {
          console.log(e)
          plArray = plArray.concat(e)
        })
      }
      console.log(plArray)
      /* ყოველთვის ერთIმასივი უნდა დააბურუნოს ვალიდაიაში გაასაწორებეია ს ეს რრაც უკეტეესად უნდა გავაკეთო*/
      /* es funqciad unda vaqcio da roca sachiroa mashin gamovichino
      zogiert ifshia raa sachiro anu dileris kartebs achvenebs rodesac orivestvis asertoa da
      unda gaaferados marto maRali karti an cvladi unda shevqmna romelic tru da flase iqneba
      da tu falsi amashin ar qnas da meore funqcia gmaoyneos */
      new userInterface(this).highlight.cards(notSortedCards, (this.data.game.finished.inFavorOf.none ?
        null :
        (this.data.game.finished.inFavorOf.player ?
          (_isArrayPl) ?
          plArray :
          PL.cards :
          (_isArray) ?
          pcArray :
          PC.cards
        )))



    }
  }
}

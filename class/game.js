function Game() {
  var controller = new Controller()
  var buttons = controller.data.htmlComponent.button
  /* attach click event to buttons*/
  buttons.check.onclick = function() {
    if (controller.data.game.finished.condition) {
      controller.resetGame()
      return false
    }

    controller.data.distributing < 5 ? controller.data.distributing++ : null
    controller.loop()
  }

  buttons.fold.onclick = function() {
    if (controller.data.game.finished.condition) return false
    controller.data.fold.player = true
    controller.loop()
  }

  buttons.bet.onclick = function() {
    if (controller.data.game.finished.condition) return false
    /* doubling bet*/
    controller.data.bet.money *= 2
    controller.data.bet.player = true
    controller.dealerGatheringBets()
    new userInterface(controller).show.money()
  }

  this.start = function() {
    controller.distributeCards()
    controller.loop()
  }
}



new Game().start()

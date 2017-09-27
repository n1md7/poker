 /*
    	 functin for checking
    	 checks passed combination of cards
    	 and returns objects with keys
    	 	id - ranking of cards 9 is strongest one 1 is lowest one
    	 	name - name of combination
    	 	cards - only cards which are making combination
        */

 function Cards(cards) {
   var PL = {},
     PC = {}

   if (cards instanceof Array) {
     PC = cards[0]
     PL = cards[1]
   }
   this.check = function() {
     var is = new Is(cards)
     switch (true) {
       case is.flush().condition && is.straight().condition:
         return {
           id: 9,
           name: 'Straight-flush',
           cards: is.straight().cards
         }
       case is.fourOfAKind().condition:
         return {
           id: 8,
           name: 'Four of a kind',
           cards: is.fourOfAKind().cards
         }
       case is.fullHouse().condition:
         return {
           id: 7,
           name: 'Full house',
           cards: is.fullHouse().cards
         }
       case is.flush().condition:
         return {
           id: 6,
           name: 'Flush',
           cards: is.flush().cards
         }
       case is.straight().condition:
         return {
           id: 5,
           name: 'Straight',
           cards: is.straight().cards
         }
       case is.threeofAkind().condition:
         return {
           id: 4,
           name: 'Three of a kind',
           cards: is.threeofAkind().cards
         }
       case is.twoPairs().condition:
         return {
           id: 3,
           name: 'Two pair',
           cards: is.twoPairs().cards
         }
       case is.pair().condition:
         return {
           id: 2,
           name: 'One pair',
           cards: is.pair().cards
         }
       case is.highCard().condition:
         return {
           id: 1,
           name: 'High card',
           cards: is.highCard().cards
         }

     }
   }

   this.compare = function(obj) {
     switch (PL.id) {
       case 1:
         print('case 1: ', 'blue', 56)
         /* high card*/
         var playerCount = 0
         obj.data.player.cards.forEach(function(__player__) {
           var playerInnerCounter = 0
           obj.data.computer.cards.forEach(function(__computer__) {
             if (__player__.rank.id > __computer__.rank.id ||
               (__player__.rank.id == 1 && __computer__.rank.id != 1)) {
               playerInnerCounter++
             }
           })
           playerInnerCounter == 2 ? playerCount++ : null
           playerInnerCounter = 0
         })
         playerCount >= 1 ?
           /* player has higher cards*/
           obj.data.game.finished.inFavorOf.player = true :
           obj.data.game.finished.inFavorOf.computer = true

         print(obj.data.game.finished.inFavorOf.computer + ' ' +
           obj.data.game.finished.inFavorOf.player + ' ' +
           obj.data.game.finished.inFavorOf.none)
         obj.data.game.finished.combination = 'High CARD'

         break
       case 2:
         print('case 2: ', 'blue', 56)
         /* es kargia mgonia marto unda shevcvalo sworad gamoachinos kartebi ganateba*/
         /* pair card*/
         if (obj.data.computer.cards[0].rank.id == obj.data.computer.cards[1].rank.id &&
           obj.data.player.cards[0].rank.id == obj.data.player.cards[1].rank.id) {
           if (obj.data.computer.cards[0].rank.id < obj.data.player.cards[0].rank.id) {
             obj.data.game.finished.inFavorOf.player = true
           } else if (obj.data.computer.cards[0].rank.id == obj.data.player.cards[0].rank.id) {
             obj.data.game.finished.inFavorOf.computer = true
           } else {
             obj.data.game.finished.inFavorOf.none = true
           }
         } else if (obj.data.computer.cards[0].rank.id == obj.data.computer.cards[1].rank.id &&
           obj.data.player.cards[0].rank.id != obj.data.player.cards[1].rank.id) {
           /*
           	player counts form dealer card so pc is winner
           */
           obj.data.game.finished.inFavorOf.computer = true
         } else if (obj.data.computer.cards[0].rank.id != obj.data.computer.cards[1].rank.id &&
           obj.data.player.cards[0].rank.id == obj.data.player.cards[1].rank.id) {
           /* pc counts from dealers cards so player is winner*/
           obj.data.game.finished.inFavorOf.player = true
         } else {
           /* both counts from dealers cards so nono of them is winner, Drawn game*/
           var playerCount = 0
           obj.data.player.cards.forEach(function(__player__) {
             var playerInnerCounter = 0
             obj.data.computer.cards.forEach(function(__computer__) {
               if (__player__.rank.id > __computer__.rank.id ||
                 (__player__.rank.id == 1 && __computer__.rank.id != 1)) {
                 playerInnerCounter++
               }
             })
             playerInnerCounter == 2 ? playerCount++ : null
             playerInnerCounter = 0
           })
           /* player has higher cards*/
           playerCount >= 1 ?
             (obj.data.game.finished.inFavorOf.player = true) :
             (obj.data.game.finished.inFavorOf.computer = true)
         }
         print(obj.data.game.finished.inFavorOf.computer + ' ' +
           obj.data.game.finished.inFavorOf.player + ' ' +
           obj.data.game.finished.inFavorOf.none)
         obj.data.game.finished.combination = 'TWO Pair'

         break
       case 3:
         /* two or multiple pair*/
         print('case 3: ეს არ მაქ დაწერილი', 'blue', 56)
         /* ეს არ მაქ დაწერილი მაგარი ტვინის ტყვნაა :(*/
         break
       case 4:
         /* three of a kind*/
         print('case 4: ', 'blue', 56)
         break
       case 5:
         /* straight*/
         /*
         		 2 4
         		 3 4 5 6 7
         		 9 10
         		 ამ შემთხვევაში არ იმუშავებს მგონი
         		 პირიქიტ მოაგებინებს  მაგრამე გ ძალიან იშვიათად მოხდება
         		 და ერთი მაგისიც :D
         */
         print('case 5: ', 'blue', 56)
         var playerCount = 0
         obj.data.player.cards.forEach(function(__player__) {
           var playerInnerCounter = 0
           obj.data.computer.cards.forEach(function(__computer__) {
             if (__player__.rank.id > __computer__.rank.id ||
               (__player__.rank.id == 1 && __computer__.rank.id != 1)) {
               playerInnerCounter++
             }
           })
           playerInnerCounter == 2 ? playerCount++ : null
           playerInnerCounter = 0
         })
         playerCount >= 1 ?
           /* player has higher cards*/
           obj.data.game.finished.inFavorOf.player = true :
           obj.data.game.finished.inFavorOf.computer = true

         print(obj.data.game.finished.inFavorOf.computer + ' ' +
           obj.data.game.finished.inFavorOf.player + ' ' +
           obj.data.game.finished.inFavorOf.none)

         // break
         /*
         	აქ ბრეიკი აკლია რადგან ორივეზე ერთანირად წავა დათვლა
         */
       case 6:
         print('case 6: ', 'blue', 56)

         // break
       case 7:
         print('case 7: ', 'blue', 56)
         // break
       case 8:
         print('case 8: ', 'blue', 56)
         // break
       case 9:
         print('case 9: ', 'blue', 56)
         var playerCount = 0
         obj.data.player.cards.forEach(function(__player__) {
           var playerInnerCounter = 0
           obj.data.computer.cards.forEach(function(__computer__) {
             if (__player__.rank.id > __computer__.rank.id ||
               (__player__.rank.id == 1 && __computer__.rank.id != 1)) {
               playerInnerCounter++
             }
           })
           playerInnerCounter == 2 ? playerCount++ : null
           playerInnerCounter = 0
         })
         playerCount >= 1 ?
           /* player has higher cards*/
           obj.data.game.finished.inFavorOf.player = true :
           obj.data.game.finished.inFavorOf.computer = true

         print(obj.data.game.finished.inFavorOf.computer + ' ' +
           obj.data.game.finished.inFavorOf.player + ' ' +
           obj.data.game.finished.inFavorOf.none)
         break
     }
     console.log(PL.cards)
     /*PL.cards.forEach(function(PLcard, PLindex){
     	PC.cards.forEach(function(PCcard, PCindex){

     	})
     })*/
     // }else{

     // }
     obj.data.game.finished.combination = PC.name
   }

 }

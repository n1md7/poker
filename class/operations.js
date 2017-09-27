/* Sorting function*/
var SortBy = {
  rank: function(a, b) {
    if (a.rank.id < b.rank.id) return -1
    if (a.rank.id > b.rank.id) return 1
    return 0
  },
  suit: function(a, b) {
    if (a.suit.id < b.suit.id) return -1
    if (a.suit.id > b.suit.id) return 1
    return 0
  }
}


/* random function from to*/
var random = {
  generate: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

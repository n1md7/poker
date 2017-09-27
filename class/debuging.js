var debugMode = true
var print = function(text, color = 'black', fontSize = 10) {
  debugMode ? console.log('%c' + text, 'color:' + color + ';font-size:' + fontSize + 'px;') : null
}

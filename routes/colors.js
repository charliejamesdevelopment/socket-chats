function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var randomColor = function(color) {
  colors = ['red', 'green', 'yellow', 'purple', 'blue']
  color(colors[getRandomInt(0,colors.length)]);
}

module.exports = {
  randomColor: randomColor
}

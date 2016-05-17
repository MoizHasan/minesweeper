function setGrid(height, width) {

  for (var i=0; i < height*width; i++) {
    $('.container').append('<div class = "tile"></div>');
  }

  $('.tile').css("width", 100/width + "%");
  $('.tile').css("height", 100/width + "%");

}

function setMines(count) {
  //create array of all int values.
  var tileCount = $('.tile').length;
  var range = [];
  for (var i = 0; i < tileCount; i++) {
    range.push(i);
  }
  //get a list of random tiles.
  var rand = [];
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * range.length);
    var value = range[index];
    rand.push(value); 
    range.splice(index, 1);
  }
  console.log(rand.toString());

  //place bombs on chosen tiles
  for (var i = 0; i < rand.length; i++) {
    var tiles = document.querySelectorAll('.tile');
    $(tiles[rand[i]]).css("background-color", 'red');
    $(tiles[rand[i]]).html('&#128163;');
  }
}

 $(document).ready(function() {
  setGrid(9,9);
  setMines(10);
 });
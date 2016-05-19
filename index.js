function setGrid(width, height) {

for (var i=0; i < height*width; i++) {
  $('.container').append('<div class = "tile"></div>');
}

$('.tile').css("width", 100/width + "%");
$('.tile').css("height", 100/width + "%");

for (var i=0; i < height*width; i++) {
  $('.upper').append('<button class = "upper-tile"></button>');
}

$('.upper-tile').css("width", 100/width + "%");
$('.upper-tile').css("height", 100/width + "%");
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

//place bombs on chosen tiles
for (var i = 0; i < rand.length; i++) {
  var tiles = document.querySelectorAll('.tile');
  $(tiles[rand[i]]).addClass("bomb");
  $(tiles[rand[i]]).html('&#128163;');
  }
}

//go through each square and print the respective bomb number.
function setNumbers(width, height) {
  var tileCount = $('.tile').length;
  var tiles = document.querySelectorAll('.tile');

  var iterate = function() { 
    if ( $(tiles[i]).html() !== '') {
      $(tiles[i]).html(parseInt($(tiles[i]).html()) + 1);
    }
    else {
      $(tiles[i]).html('1');
    }
  }

for(var i=0; i < tileCount; i++) {
  if (!$(tiles[i]).hasClass('bomb')) { //Skip all the bombs 

    //left
    if (i % width !== 0) {
      if( $(tiles[i-1]).hasClass('bomb') ) {
        iterate();
      }
        //left-upper
        if (i > width - 1) {
          if ( $(tiles[i-height-1]).hasClass('bomb') ) {
            iterate();
          }
        }
        //left-lower
        if (i < width * (height-1)) {
          if ( $(tiles[i+height-1]).hasClass('bomb') ) {
            iterate();
          }
        }
      }

    //upper
    if (i > width - 1) {
      if ( $(tiles[i-height]).hasClass('bomb') ) {
        iterate();
      }
    }

    //lower
    if (i < width * (height-1)) {
      if ( $(tiles[i+height]).hasClass('bomb') ) {
        iterate();
      }
    }

    //right
    if ((i+1) % width !== 0) {
      if( $(tiles[i+1]).hasClass('bomb') ) {
        iterate();
      }
    //right-upper
    if (i > width - 1) {
      if ( $(tiles[i-height+1]).hasClass('bomb') ) {
        iterate();
      }
    }
          //right-lower
          if (i < width * (height-1)) {
            if ( $(tiles[i+height+1]).hasClass('bomb') ) {
              iterate();
            }
          }
        }
      }
    }
  }

function iterateSquare() {

}



$(document).ready(function() {
  setGrid(9,9);
  setMines(10);
  setNumbers(9,9);


});
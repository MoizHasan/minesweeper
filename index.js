function setGrid(width, height) {

for (var i=0; i < height*width; i++) {
  $('.container').append('<div class = "tile" data-label="' + i + '"></div>');
}

$('.tile').css("width", 100/width + "%");
$('.tile').css("height", 100/height + "%");

$('.container').css("height", height*40 + "px");
$('.container').css("width", width*40 + "px");

for (var i=0; i < height*width; i++) {
  $('#upper').append('<button class = "upper-tile" data-label="' + i + '"></button>');
}

$('#upper').css("height", height*40 + "px");
$('#upper').css("width", width*40 + "px");

$('.upper-tile').css("width", 100/width + "%");
$('.upper-tile').css("height", 100/height + "%");

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
          if ( $(tiles[i+parseInt(height)-1]).hasClass('bomb') ) {
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
      if ( $(tiles[i+parseInt(height)]).hasClass('bomb') ) {
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
            if ( $(tiles[i+parseInt(height)+1]).hasClass('bomb') ) {
              iterate();
            }
          }
        }
      }
    }
  }

function groupClear(data, height, width) { //floodfill
  if (data < 0 || data > height * width) {
    return;
  }
  if ($('.tile[data-label="' + data + '"]').html() != "") { //numbered or bomb square
    if (!$('[data-label="' + data + '"]').hasClass('bomb')) { //clear if number and stop
      $('.upper-tile[data-label="' + data + '"]').css('visibility', 'hidden');
    }

    return;
  }

  if ($('.upper-tile[data-label="' + data + '"]').css('visibility') == 'hidden') { //tile has already been uncovered.
    return;
  }
  $('.upper-tile[data-label="' + data + '"]').css('visibility', 'hidden');
  if ((data + 1) % width !== 0) {
     groupClear(data+1, height, width); //east
  }
  if ((data) % width !== 0) {
    groupClear(data-1, height, width); //west
  }
    groupClear((parseInt(data)+parseInt(height)), height, width); //south; wont work without casting.
    groupClear(data-height, height, width); //north
}



function evaluate() { //Get count of remaining buttons and check if the game has been won.
  var tileCount = $('.tile').length;
  var count = 0;
  var bombCount = 0;
  for (var i = 0; i < tileCount; i++) {
    if ($('.upper-tile[data-label="' + i + '"]').css('visibility') != 'hidden') {
      count++;
      if ($('[data-label="' + i + '"]').hasClass('bomb')) {
        bombCount++;
      }
    }
  }
  return bombCount == count-1;
}

function game() {
  var height = prompt("Enter the game height");
  var width = prompt("Enter the game width");
  //var height = 2;
  //var width = 2;
  setGrid(height,width);
  var mines = Math.ceil((height*width) * (5/32));
  setMines(mines);
  setNumbers(height,width);

$(document).on('click', '.upper-tile', function() {
  
  var data = $(this).data("label");
  if ($('[data-label="' + data + '"]').hasClass('bomb')) { //bomb click
    $('[data-label="' + data + '"]').css('background-color', 'red');
    var tileCount = $('.tile').length;
    
    for (var i = 0; i < tileCount; i++) { //show all the bombs
      if ($('[data-label="' + i + '"]').hasClass('bomb')) {
        $('.upper-tile[data-label="' + i + '"]').css('visibility', 'hidden');
      } else {
        $('.upper-tile[data-label="' + i + '"]').prop("disabled",true); //don't allow any further clicks.
      }
    }
  }

    if (evaluate()) { //Game has been won.
      for (var i =0; i <  $('.tile').length; i++) {
        $('.upper-tile[data-label="' + i + '"]').prop("disabled",true); //don't allow any further clicks.
          $('.upper-tile[data-label="' + i + '"]').html('&#9873;'); //flag image
      }
  }
  groupClear(data, height, width); 
});

$(document).on("contextmenu", ".upper-tile", function(e){ //right click
 if ($(this).html() === "") {
    $(this).html('&#9873;');
  } else {
    $(this).html('');
  }
   return false;
});
}

$(document).ready(function() {
  game();
});
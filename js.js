$('document').ready(function() {

// ####### FUNCTIONS #######
function drawBoard(id, body) {
	var divID;
	$(body).append("<div id='" + id + "' class='board'></div>");

	for (i = 0; i < 11; i++) {
		// create row for each letter
		$('#' + id).append("<div class='board-row' id='row-" + alphabet[i] +
		"-" + id + "'></div>");
		for (j = 0; j < 11; j++) {
			divID = alphabet[i] + j;

			if (i === 0 && j === 0) {
				$('#row-' + alphabet[i] + "-" + id).append(
					"<div class='square corner'></div>");
			} else if (i === 0) {
				$('#row-' + alphabet[i] + "-" + id).append(
					"<div class='square top_numbers'>" + j + "</div>");
			}	else if (divID[1] === '0') {
				$('#row-' + alphabet[i] + "-" + id).append(
					"<div class='square left_letters'>" + alphabet[i].toUpperCase() +
				"</div>");
			} else {
			$('#row-' + alphabet[i] + "-" + id).append(
				"<div id='" + divID + "' class='square'></div>");
			}
		}
	}
}

// select current ship
$('.submarine').click(function() {
		currentShip = 2;
});

$('.destroyer').click(function() {
	currentShip = 3;
});

$('.battleship').click(function() {
	currentShip = 4;
});

$('.aircraftCarrier').click(function() {
	currentShip = 5;
});


// ###### GLOBAL VARIABLES ######
var alphabet = "0abcdefghij";

// current ship is not selected & rotated
var currentShip = 0;
var rotate = 0;
var userShipPositions = [];

// draw user board and ai board
drawBoard('userships', '.container');
drawBoard('AIships', '.container');


// on r change rotation of the ship
$(document).keydown(function(e) {
	if (e.which == 82) {
		if (rotate === 0) {
			rotate = 90;
		} else {
			rotate = 0;
		}
		$('#userships .ship').each(function() {
			$(this).removeClass('ship');
		});
		$('#userships .notAllowed').each(function() {
			$(this).removeClass('notAllowed');
		});
	}
});


// function to return ids
function returnIDs(squareID) {
	var letter = alphabet.indexOf(squareID[0]);
	squareID = squareID.substr(1, squareID.length);
	var ids = '';

if (rotate === 0) {
  // show ship on grid hover
  if (currentShip > 1) {
    for (i = 0; i < currentShip; i++) {
      if (i < currentShip - 1) {
        ids += '#userships ' + '#' + alphabet[letter + i] + squareID + ', ';
      } else {
        ids += '#userships ' + '#' + alphabet[letter + i] + squareID;
      }
    }
  }
} else {
  // write code if rotate is 90deg
  if (currentShip > 1) {
    for (i = 0; i < currentShip; i++) {
      if (i < currentShip - 1) {
        ids += '#userships ' + '#' + alphabet[letter] +
          (parseInt(squareID) + i) + ', ';
      } else {
        ids += '#userships ' + '#' + alphabet[letter] +
          (parseInt(squareID) + i);
      }
			if (ids.indexOf('11') > -1) {
				ids += 'undefined';
			}
    }
  }
}

return ids;
}


// on grid hover show selected ship
$('#userships .square').hover(function() {
	var squareID = $(this).attr('id');
	ids = returnIDs(squareID);

	if (ids.indexOf('undefined') == -1 ) {
		$(ids).addClass('ship');
	} else {
		$(ids).addClass('notAllowed');
	}

	// on mouse leave
}, function() {
	var squareID = $(this).attr('id');
	ids = returnIDs(squareID);

	$(ids).removeClass('ship');
	$(ids).removeClass('notAllowed');
});


$('#userships .square').click(function(){
	var squareID = $(this).attr('id');

	var ids = returnIDs(squareID);

	if (ids.indexOf('undefined') == -1 && ids.length > 1) {
		// colorize grid
		//$(ids).addClass('ship');
		$(ids).addClass('ship-placed');
		ids = ids.replace(/#userships /gi, '').split(', ');
		// add ship coordinates to array
		userShipPositions.push(ids);
		currentShip = 0;

		// disable pick option
		switch (ids.length) {
			case 2:
				$('.submarine').addClass('disabledShip');
				break;
			case 3:
				$('.destroyer').addClass('disabledShip');
				break;
			case 4:
			  $('.battleship').addClass('disabledShip');
				break;
			case 5:
				$('.aircraftCarrier').addClass('disabledShip');
				break;
			default:
				break;
		}

	}
	console.log(userShipPositions);

});

});

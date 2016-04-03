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

// ###### GLOBAL VARIABLES ######
var alphabet = "0abcdefghij";

// current ship is not selected & rotated
var currentShip = 0;
var rotate = 0;
var userShipPositions = [];

// draw user board and ai board
drawBoard('userships', '.container');
drawBoard('AIships', '.container');


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


// on grid hover show selected ship
$('#userships .square').hover(function() {
// on mouse enter
	var squareID = $(this).attr('id');
	var letter = alphabet.indexOf(squareID[0]);
	squareID = squareID.substr(1, squareID.length);
	var ids = '';

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

	if (ids.indexOf('undefined') == -1 ) {
		$(ids).addClass('ship');
	}

	// on mouse leave
}, function() {
	var squareID = $(this).attr('id');
	var letter = alphabet.indexOf(squareID[0]);
	squareID = squareID.substr(1, squareID.length);
	var ids = '';

// remove colored grid on mouseleave
	if (currentShip > 1) {
		for (i = 0; i < currentShip; i++) {
			if (i < currentShip - 1) {
				ids += '#userships ' + '#' + alphabet[letter + i] + squareID + ', ';
			} else {
				ids += '#userships ' + '#' + alphabet[letter + i] + squareID;
			}
		}
	}

	$(ids).removeClass('ship');
});


$('#userships .square').click(function(){
	var squareID = $(this).attr('id');
	var letter = alphabet.indexOf(squareID[0]);
	squareID = squareID.substr(1, squareID.length);
	var ids = '';

	// which grid ids to color
	if (currentShip > 1) {
		for (i = 0; i < currentShip; i++) {
			if (i < currentShip - 1) {
				ids += '#userships ' + '#' + alphabet[letter + i] + squareID + ', ';
			} else {
				ids += '#userships ' + '#' + alphabet[letter + i] + squareID;
			}
		}

	}
	if (ids.indexOf('undefined') == -1 && ids.length > 1) {
		// colorize grid
		$(ids).addClass('ship');
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

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  candyCrushGame();
});

function candyCrushGame() {
  var grid = document.querySelector(".grid");
  var scoreDisplay = document.getElementById("score");
  var width = 8;
  var squares = [];
  var score = 0;
  var candyColors = ["url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/red-candy.png)", "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/blue-candy.png)", "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/green-candy.png)", "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/yellow-candy.png)", "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/orange-candy.png)", "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/purple-candy.png)"]; // Creating Game Board

  function createBoard() {
    for (var _i = 0; _i < width * width; _i++) {
      var square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", _i);
      var randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard(); // Dragging the Candy

  var colorBeingDragged;
  var colorBeingReplaced;
  var squareIdBeingDragged;
  var squareIdBeingReplaced;
  squares.forEach(function (square) {
    return square.addEventListener("dragstart", dragStart);
  });
  squares.forEach(function (square) {
    return square.addEventListener("dragend", dragEnd);
  });
  squares.forEach(function (square) {
    return square.addEventListener("dragover", dragOver);
  });
  squares.forEach(function (square) {
    return square.addEventListener("dragenter", dragEnter);
  });
  squares.forEach(function (square) {
    return square.addEventListener("drageleave", dragLeave);
  });
  squares.forEach(function (square) {
    return square.addEventListener("drop", dragDrop);
  });

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id); // this.style.backgroundImage = ''
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = "";
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    //Defining, What is a valid move?
    var validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width];
    var validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  } //Dropping candies once some have been cleared


  function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        var firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        var isFirstRow = firstRow.includes(i);

        if (isFirstRow && squares[i].style.backgroundImage === "") {
          var randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  } ///-> Checking for Matches <-///
  //For Row of Four


  function checkRowForFour() {
    var _loop = function _loop() {
      var rowOfFour = [i, i + 1, i + 2, i + 3];
      var decidedColor = squares[i].style.backgroundImage;
      var isBlank = squares[i].style.backgroundImage === "";
      var notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
      if (notValid.includes(i)) return "continue";

      if (rowOfFour.every(function (index) {
        return squares[index].style.backgroundImage === decidedColor && !isBlank;
      })) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach(function (index) {
          squares[index].style.backgroundImage = "";
        });
      }
    };

    for (i = 0; i < 60; i++) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  }

  checkRowForFour(); //For Column of Four

  function checkColumnForFour() {
    var _loop2 = function _loop2() {
      var columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      var decidedColor = squares[i].style.backgroundImage;
      var isBlank = squares[i].style.backgroundImage === "";

      if (columnOfFour.every(function (index) {
        return squares[index].style.backgroundImage === decidedColor && !isBlank;
      })) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach(function (index) {
          squares[index].style.backgroundImage = "";
        });
      }
    };

    for (i = 0; i < 39; i++) {
      _loop2();
    }
  }

  checkColumnForFour(); //For Row of Three

  function checkRowForThree() {
    var _loop3 = function _loop3() {
      var rowOfThree = [i, i + 1, i + 2];
      var decidedColor = squares[i].style.backgroundImage;
      var isBlank = squares[i].style.backgroundImage === "";
      var notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) return "continue";

      if (rowOfThree.every(function (index) {
        return squares[index].style.backgroundImage === decidedColor && !isBlank;
      })) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach(function (index) {
          squares[index].style.backgroundImage = "";
        });
      }
    };

    for (i = 0; i < 61; i++) {
      var _ret2 = _loop3();

      if (_ret2 === "continue") continue;
    }
  }

  checkRowForThree(); //For Column of Three

  function checkColumnForThree() {
    var _loop4 = function _loop4() {
      var columnOfThree = [i, i + width, i + width * 2];
      var decidedColor = squares[i].style.backgroundImage;
      var isBlank = squares[i].style.backgroundImage === "";

      if (columnOfThree.every(function (index) {
        return squares[index].style.backgroundImage === decidedColor && !isBlank;
      })) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach(function (index) {
          squares[index].style.backgroundImage = "";
        });
      }
    };

    for (i = 0; i < 47; i++) {
      _loop4();
    }
  }

  checkColumnForThree();
  window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
  }, 100);
}
//# sourceMappingURL=script.dev.js.map

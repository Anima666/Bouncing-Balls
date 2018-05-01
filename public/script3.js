document.oncontextmenu = function() {
  return false;
};
// Вешаем слушатель события нажатие кнопок мыши для всего документа:
$(canvas).mousedown(function(event) {

  // Проверяем нажата ли именно правая кнопка мыши:
  if (event.which === 3) {

    // Получаем элемент на котором был совершен клик:
    var target = $(event.target);

    $('*').removeClass('selected-html-element');
    $('.context-menu').remove();
    if (paused) {

      // Удаляем предыдущие вызванное контекстное меню:


      if (selectedItem) {
        objArray.forEach(item => {
          if (item.id == selectedItem) {
            $('<div/>', {
                class: 'context-menu' // Присваиваем блоку наш css класс контекстного меню:
              })
              .css({
                left: event.pageX + 'px', // Задаем позицию меню на X
                top: event.pageY + 'px' // Задаем позицию меню по Y
              })
              .appendTo('body') // Присоединяем наше меню к body документа:
              .append( // Добавляем пункты меню:
                $('<ul/>').append('<li><img src="image/smallBall.png" onclick="setSize(selectedItem,1)"></li>')
                .append('<li><img src="image/normalBall.png" onclick="setSize(selectedItem,2)"></li>')
                .append('<li><img src="image/bigBall.png" onclick="setSize(selectedItem,3)"></li>')
                .append('<li><img src="image/green.png" onclick="setColor(selectedItem,1)"></li>')
                .append('<li><img src="image/blue.png" onclick="setColor(selectedItem,2)"></li>')
                .append('<li><img src="image/red.png" onclick="setColor(selectedItem,3)"></li>')
                .append('<li><img src="image/remove.png" onclick="removeObj(selectedItem)"></li>')
              )
              .show('fast'); // Показываем меню с небольшим стандартным эффектом jQuery. Как раз очень хорошо подходит для меню
          }

        });
        objArray2.forEach(item => {
          if (item.id == selectedItem) {
            $('<div/>', {
                class: 'context-menu' // Присваиваем блоку наш css класс контекстного меню:
              })
              .css({
                left: event.pageX + 'px', // Задаем позицию меню на X
                top: event.pageY + 'px' // Задаем позицию меню по Y
              })
              .appendTo('body') // Присоединяем наше меню к body документа:
              .append( // Добавляем пункты меню:
                $('<ul/>').append('<li><img src="image/remove.png" onclick="removeObj(selectedItem)"></li>')
              )
              .show('fast'); // Показываем меню с небольшим стандартным эффектом jQuery. Как раз очень хорошо подходит для меню
          }

        });
      }
    }
  }

});

function setSize(id, size) {

  var sizeElement;

  if (size == 1) {
    sizeElement = 20;
  } else if (size == 2) {
    sizeElement = 40;
  } else if (size == 3) {
    sizeElement = 70;
  }
  objArray.forEach(item => {
    if (item.id == id) {
      item.radius = sizeElement;
    }
  });
}

function setColor(id, color) {
  var colorElement;
  if (color == 3) {
    colorElement = "red";
  } else if (color == 2) {
    colorElement = "blue";
  } else if (color == 1) {
    colorElement = "#00ff06";
  }
  objArray.forEach(item => {
    if (item.id == id) {
      item.color = colorElement;

    }
  });
}

function removeObj(id) {

  objArray2.forEach(item => {
    if (item.id == id) {
      objArray2.splice(objArray2.indexOf(item), 1); //delete wall
    }
  });
  objArray.forEach(item => {
    if (item.id == id) {
      objArray.splice(objArray.indexOf(item), 1); //delete wall
    }
  });


  $('*').removeClass('selected-html-element');
  $('.context-menu').remove();
}

function saveData() {
  localStorage.setItem("balls", JSON.stringify(objArray));
  localStorage.setItem("walls", JSON.stringify(objArray2));
}

function loadData() {

  obj = JSON.parse(localStorage.getItem("balls"));
  obj.forEach(function(element) {
    ball = new Ball(element.x, element.y, element.radius);

    ball.dx = element.dx;
    ball.dy = element.dy;
    ball.radius = element.radius;
    ball.guid = element.guid;
    ball.arrowY = element.arrowY;
    ball.mass = element.mass;
    ball.color = element.color;
    objArray.push(ball);
  })


  obj = JSON.parse(localStorage.getItem("walls"));
  obj.forEach(function(element) {
    wall = new Wall(element.x, element.y, element.x1, element.y1);
    wall.guid = element.guid;
    objArray2.push(wall);
  })



}

var catchBall = false

function MoveWallXY() {
  var dx = mouse.x;
  var dy = mouse.y;
  objArray2[indexWallCatch].x = dx + parseInt(CoordinatX);
  objArray2[indexWallCatch].y = dy + parseInt(CoordinatY);
  objArray2[indexWallCatch].x1 = dx - parseInt(CoordinatX2);
  objArray2[indexWallCatch].y1 = dy - parseInt(CoordinatY2);
  isDrawWall = false;
}

function MoveWallX() {
  objArray2[indexWallCatch].x = mouse.x;
  objArray2[indexWallCatch].y = mouse.y;
  isDrawWall = false;

}

function MoveWall() {
  objArray2[indexWallCatch].x1 = mouse.x;
  objArray2[indexWallCatch].y1 = mouse.y;
  isDrawWall = false;

}

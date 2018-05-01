var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//setInterval(saveData, 2000);


canvas.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
canvas.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var objArray = [];
var objArray2 = [];
var mouse = {
  x: undefined,
  y: undefined
}
var paused = true;
var totalKineticEnergy = 0;
var bumped = false;
var leftHeld = false;
var upHeld = false;
var rightHeld = false;
var downHeld = false;
var gravityOn = false;
var dragOn = true;
var clearCanv = true;
var bigBalls = false;
var selectedItem = null;
var draggableItem = null;
var del = true;
var isRenderArrowMode = true;
var isBallMode = true;

document.addEventListener("keydown", keyDownHandler);
canvas.addEventListener("mouseup", letObjectGo);
canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})
window.addEventListener('resize', function(event, ev) {
  canvas.width = event.target.innerWidth;
  canvas.height = event.target.innerHeight;
})

function mouseDown(event) {
  $('*').removeClass('selected-html-element');
  $('.context-menu').remove();
  canvas.removeEventListener("mousemove", renderWall);

  if (event.which !== 3) {
    selectedItem = null;
    if (paused) {
      objArray.forEach(item => {
        if ((mouse.x >= item.x - item.radius) && (mouse.x <= item.x + item.radius) && (mouse.y >= item.y - item.radius) && (mouse.y <= item.y + item.radius)) {
          selectedItem = item.id;
          draggableItem = item.id;
        } else if ($("input[name='option']:checked").val() == "move") {
          // Реакция на столкновение.
          if (selectedItem) canvas.removeEventListener("mousedown", createWall);
          var dx = mouse.x;
          var dy = mouse.y;
          for (var i = 0; i <= objArray2.length - 1; ++i) {
            var x0 = objArray2[i].x;
            var y0 = objArray2[i].y;
            var x = objArray2[i].x1;
            var y = objArray2[i].y1;
            if (((dy - y0) / (y - y0)).toFixed(0) == ((dx - x0) / (x - x0)).toFixed(0)) {
              var a = (Math.sqrt((dx - objArray2[i].x1) ** 2 + (dy - objArray2[i].y1) ** 2)).toFixed(0);
              var b = (Math.sqrt((dx - objArray2[i].x) ** 2 + (dy - objArray2[i].y) ** 2)).toFixed(0);
              var c = (Math.sqrt((objArray2[i].x - objArray2[i].x1) ** 2 + (objArray2[i].y - objArray2[i].y1) ** 2)).toFixed(0);
              var drobb = (c / 3).toFixed(0);
              if (parseInt(a) + parseInt(b) - 40 <= c) {

                indexWallCatch = i;
                CoordinatX = objArray2[indexWallCatch].x - dx;
                CoordinatY = objArray2[indexWallCatch].y - dy;
                CoordinatX2 = dx - objArray2[indexWallCatch].x1;
                CoordinatY2 = dy - objArray2[indexWallCatch].y1;
                isDrawWall = false;
                var drob = parseInt(drobb);
                var LineX = (Math.sqrt((objArray2[i].x - dx) ** 2 + (objArray2[i].y - dy) ** 2)).toFixed(0);
                var LineY = (Math.sqrt((objArray2[i].x1 - dx) ** 2 + (objArray2[i].y1 - dy) ** 2)).toFixed(0);
                selectedItem = objArray2[indexWallCatch].id
                if (LineX > drob && LineY < drob) {
                  canvas.addEventListener("mousemove", MoveWall, false);
                } else if (LineX < drob && LineY > drob) {
                  canvas.addEventListener("mousemove", MoveWallX, false);
                } else if (parseInt(LineX) > parseInt(drob) && parseInt(LineY) > parseInt(drob)) {
                  canvas.addEventListener("mousemove", MoveWallXY, false);
                }
              }
            }
          }
        }
      });
      if (selectedItem == null) {
        if ($("input[name='option']:checked").val() == "wall") canvas.addEventListener("mousedown", createWall);
        else {
          canvas.removeEventListener("mousedown", createWall);
          objArray[objArray.length] = new Ball(mouse.x, mouse.y, 1);
        }
      } else {
        canvas.addEventListener("mousedown", ballAction);
        canvas.addEventListener("dblclick", ballActiondbclick);
      }

    }
  }
}
var flag_dbclick = false;

function createWall() {
  objArray2[objArray2.length] = new Wall(mouse.x, mouse.y, mouse.x, mouse.y)
  draggableItem = objArray2[objArray2.length - 1].id;
  canvas.addEventListener("mousemove", renderWall)
}

function ballActiondbclick(event) {
  //  canvas.removeEventListener("mousemove", renderBall);
  //console.log("dblclick");
  //canvas.addEventListener("mousemove", renderArrow);
  flag_dbclick = true;
}

function ballAction(event) {
  //console.log(event);
  //if ($("input[name='option']:checked").val() == "move") {
  //canvas.addEventListener("mousemove", renderBall);
  //} else if ($("input[name='option']:checked").val() == "vector") {
  //canvas.addEventListener("mousemove", renderArrow);
  //  }

  if (flag_dbclick == false) {
    canvas.addEventListener("mousemove", renderBall);
  } else {
    canvas.addEventListener("mousemove", renderArrow);
  }
}

function renderWall() {
  objArray2.forEach(function(element) {
    if (element.id == draggableItem) {
      element.x1 = mouse.x;
      element.y1 = mouse.y;
    }
  });
}

function renderBall() {
  objArray.forEach(function(element) {
    if (element.id == draggableItem) {
      element.arrowX = mouse.x + element.dx * 50;
      element.arrowY = mouse.y + element.dy * 50;
      element.x = mouse.x;
      element.y = mouse.y;
    }
  });
}

function renderArrow() {
  objArray.forEach(function(element) {
    if (element.id == draggableItem) {
      element.arrowX = mouse.x;
      element.arrowY = mouse.y;
    }
  });
}

function letObjectGo() {
  canvas.removeEventListener("mousemove", renderWall);
  canvas.removeEventListener("mousemove", renderBall);
  canvas.removeEventListener("mousemove", renderArrow);
  canvas.removeEventListener("mousemove", MoveWallXY);
  canvas.removeEventListener("mousemove", MoveWallX);
  canvas.removeEventListener("mousemove", MoveWall);

  draggableItem = null;

}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pauseHandle() {
  if (paused == false) {
    $("#btn").text("play");
    canvas.style.backgroundColor = "#FCA1B8"; //red
  } else {
    $("#btn").text("stop");
    canvas.style.backgroundColor = "#AFE9E2"; //original color
  }

  paused = !paused;

  objArray.forEach(function(element) {
    element.dx = (element.arrowX - element.x) / 50;
    element.dy = (element.arrowY - element.y) / 50;
  });

}

function removeObject() {
  objArray = [];
  objArray2 = [];
}

function keyDownHandler(event) {
  if (paused) {
    if (event.keyCode == 67) { // c
      objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
    } else if (event.keyCode == 82) { // r
      removeObject();
    } else if (event.keyCode == 75) { // k
      //loadData();
      isRenderArrowMode = !isRenderArrowMode;
    } else if (event.keyCode == 32) { //space
      $('*').removeClass('selected-html-element');
      $('.context-menu').remove();
    }
  }
}

function canvasBackground() {
  canvas.style.backgroundColor = "#AFE9E2";
}

var h;

function Test(ball, wall) {
  var a = Math.sqrt((ball.x - wall.x1) ** 2 + (ball.y - wall.y1) ** 2);
  var b = Math.sqrt((ball.x - wall.x) ** 2 + (ball.y - wall.y) ** 2);
  var c = Math.sqrt((wall.x - wall.x1) ** 2 + (wall.y - wall.y1) ** 2);
  var p = (a + b + c) / 2;
  var s = Math.sqrt(p * (p - a) * (p - b) * (p - c))
  var result = (s * 2 / c).toFixed(0);
  return parseInt(result);
}

function isBetween(a, b, c, d) {
  if ((a < c + d && c - d < b) || (b < c - d && c + d < a))
    return true;
  else return false;
}

function CollisionWalls() {
  for (var obj1 in objArray) {
    for (var obj2 in objArray2) {
      if (objArray[obj1].radius >= Test(objArray[obj1], objArray2[obj2])) {
        h = Test(objArray[obj1], objArray2[obj2]);
        var a = (Math.sqrt((objArray[obj1].x - objArray2[obj2].x1) ** 2 + (objArray[obj1].y - objArray2[obj2].y1) ** 2)).toFixed(0);
        var b = (Math.sqrt((objArray[obj1].x - objArray2[obj2].x) ** 2 + (objArray[obj1].y - objArray2[obj2].y) ** 2)).toFixed(0);
        var c = (Math.sqrt((objArray2[obj2].x - objArray2[obj2].x1) ** 2 + (objArray2[obj2].y - objArray2[obj2].y1) ** 2)).toFixed(0);
        var summAB = parseInt(a) + parseInt(b);
        if (summAB - 70 <= c) {

          // if (h < 3 / 2 * objArray[obj1].radius && isBetween(objArray2[obj2].y, objArray2[obj2].y1, objArray[obj1].y, 2 * objArray[obj1].radius)
          //     && isBetween(objArray2[obj2].x, objArray2[obj2].x1, objArray[obj1].x, 2 * objArray[obj1].radius)) {
          //     var k = 2 * (objArray[obj1].dx * (objArray2[obj2].y - objArray2[obj2].y1) + objArray[obj1].dy * (objArray2[obj2].x1 - objArray2[obj2].x)) / Math.pow(c, 2);
          //     objArray[obj1].dx -= k * (objArray2[obj2].y - objArray2[obj2].y1);
          //     objArray[obj1].dy -= k * (objArray2[obj2].x1 - objArray2[obj2].x);
          // }
          if ((Math.pow(objArray[obj1].x - objArray2[obj2].x, 2) + Math.pow(objArray[obj1].y - objArray2[obj2].y, 2) < Math.pow(objArray[obj1].radius, 2))) {

            // Угол отскока мяча = углу движения + 90 градусов.
            var alfa1 = Math.atan2(objArray2[obj2].y - objArray[obj1].y, objArray2[obj2].x - objArray[obj1].x);
            var alfa2 = alfa1 + 90 * Math.PI / 180;
            var cosAlpha = Math.cos(alfa2);
            var sinAlpha = Math.sin(alfa2);
            var vyi = objArray[obj1].dy;
            var vxi = objArray[obj1].dx;
            var vyip = vyi * cosAlpha - vxi * sinAlpha;
            var vxip = vxi * cosAlpha + vyi * sinAlpha;
            var vyfp = -vyip;
            var vxfp = vxip;
            var vyf = vyfp * cosAlpha + vxfp * sinAlpha;
            var vxf = vxfp * cosAlpha - vyfp * sinAlpha;
            // Новая скорость
            objArray[obj1].dx = vxf;
            objArray[obj1].dy = vyf;
            objArray[obj1].y += 2 * objArray[obj1].dy;
            objArray[obj1].x += 2 * objArray[obj1].dx;

          } else if ((Math.pow(objArray[obj1].x - objArray2[obj2].x1, 2) + Math.pow(objArray[obj1].y - objArray2[obj2].y1, 2) < Math.pow(objArray[obj1].radius, 2))) {

            // Реакция на столкновение.
            // Угол отскока мяча = углу движения + 90 градусов.
            var alfa1 = Math.atan2(objArray2[obj2].y1 - objArray[obj1].y, objArray2[obj2].x1 - objArray[obj1].x);
            var alfa2 = alfa1 + 90 * Math.PI / 180;
            var cosAlpha = Math.cos(alfa2);
            var sinAlpha = Math.sin(alfa2);
            var vyi = objArray[obj1].dy;
            var vxi = objArray[obj1].dx;
            var vyip = vyi * cosAlpha - vxi * sinAlpha;
            var vxip = vxi * cosAlpha + vyi * sinAlpha;
            var vyfp = -vyip;
            var vxfp = vxip;
            var vyf = vyfp * cosAlpha + vxfp * sinAlpha;
            var vxf = vxfp * cosAlpha - vyfp * sinAlpha;
            // Новая скорость
            objArray[obj1].dx = vxf;
            objArray[obj1].dy = vyf;

            objArray[obj1].y += 2 * objArray[obj1].dy;
            objArray[obj1].x += 2 * objArray[obj1].dx;
          } else {
            var k = 2 * (objArray[obj1].dx * (objArray2[obj2].y - objArray2[obj2].y1) + objArray[obj1].dy * (objArray2[obj2].x1 - objArray2[obj2].x)) / Math.pow(c, 2);
            objArray[obj1].dx -= k * (objArray2[obj2].y - objArray2[obj2].y1);
            objArray[obj1].dy -= k * (objArray2[obj2].x1 - objArray2[obj2].x);
          }

        }
      }

    }
  }
}

function borderCollision(ball) {
  if (ball.x - ball.radius + ball.dx < 0 ||
    ball.x + ball.radius + ball.dx > canvas.width) {
    ball.dx *= -1;
  }
  if (ball.y - ball.radius + ball.dy < 0 ||
    ball.y + ball.radius + ball.dy > canvas.height) {
    ball.dy *= -1;
  }
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
  }
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
  }
  if (ball.x + ball.radius > canvas.width) {
    ball.x = canvas.width - ball.radius;
  }
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
  }
}

function ballCollision() {
  for (var obj1 in objArray) {
    for (var obj2 in objArray) {
      if (obj1 !== obj2 && distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0) {
        var theta1 = objArray[obj1].angle();
        var theta2 = objArray[obj2].angle();
        var phi = Math.atan2(objArray[obj2].y - objArray[obj1].y, objArray[obj2].x - objArray[obj1].x);
        var m1 = objArray[obj1].mass;
        var m2 = objArray[obj2].mass;
        var v1 = objArray[obj1].speed();
        var v2 = objArray[obj2].speed();

        var dx1F = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
        var dy1F = (v1 * Math.cos(theta1 - phi) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
        var dx2F = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
        var dy2F = (v2 * Math.cos(theta2 - phi) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2) * Math.sin(phi) + v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

        objArray[obj1].dx = dx1F;
        objArray[obj1].dy = dy1F;
        objArray[obj2].dx = dx2F;
        objArray[obj2].dy = dy2F;

      }
    }
    borderCollision(objArray[obj1]);
  }
}

function staticCollision() {
  for (var obj1 in objArray) {
    for (var obj2 in objArray) {
      if (obj1 !== obj2 &&
        distance(objArray[obj1], objArray[obj2]) < objArray[obj1].radius + objArray[obj2].radius) {
        var theta = Math.atan2((objArray[obj1].y - objArray[obj2].y), (objArray[obj1].x - objArray[obj2].x));
        var overlap = objArray[obj1].radius + objArray[obj2].radius - distance(objArray[obj1], objArray[obj2]);
        var smallerObject = objArray[obj1].radius < objArray[obj2].radius ? obj1 : obj2
        objArray[smallerObject].x -= overlap * Math.cos(theta);
        objArray[smallerObject].y -= overlap * Math.sin(theta);
      }
    }
  }
}

function moveObjects() {
  for (var obj in objArray) {
    objArray[obj].x += objArray[obj].dx;
    objArray[obj].y += objArray[obj].dy;
  }
}

function drawObjects() {
  for (var obj in objArray) {
    objArray[obj].draw();
  }
  for (var obj in objArray2) {
    objArray2[obj].drawWall();
  }
}

canvasBackground();

function draw() {

  if (clearCanv) clearCanvas();


  if (!paused) {
    moveObjects();
  }

  drawObjects();
  staticCollision();
  ballCollision();
  CollisionWalls();
  requestAnimationFrame(draw);
}

draw();
//loadData();

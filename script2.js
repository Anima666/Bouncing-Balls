function getColor() {
    var x = "red";
    if (x == "red") {
        return "rgb(213,89,74)";
    } else if (x == "blue") {
        return "rgb(70,130,180)";
    } else return "rgb(173,255,47)"

}
function getSize() {
    var y = $("input[name='option']:checked").val();
    if (y == "sball") {
        return 20;
    } else if (y == "nball") {
        return 40;
    } else if (y == "bball") {
        return 70;
    }
}

function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function randomX() {
    x = Math.floor(Math.random() * canvas.width);
    if (x < 30) {
        x = 30;
    } else if (x + 30 > canvas.width) {
        x = canvas.width - 30;
    }
    return x;
}

function randomY() {
    y = Math.floor(Math.random() * canvas.height);
    if (y < 30) {
        y = 30;
    } else if (y + 30 > canvas.height) {
        y = canvas.height - 30;
    }
    return y;
}

function randomRadius() {
    if (bigBalls) {
        r = Math.ceil(Math.random() * 10 + 13);
        return r;
    } else {
        r = Math.ceil(Math.random() * 2 + 1);
        //r = 2;
        return r;
    }
}

function randomDx() {
    r = Math.floor(Math.random() * 10 - 5);
    return r;
}

function randomDy() {
    r = Math.floor(Math.random() * 10 - 5);
    return r;
}

function distanceNextFrame(a, b) {
    return Math.sqrt((a.x + a.dx - b.x - b.dx) ** 2 + (a.y + a.dy - b.y - b.dy) ** 2) - a.radius - b.radius;
}

function distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
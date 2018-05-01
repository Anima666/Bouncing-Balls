function Wall(x, y, x1, y1) {
    this.x = x;
    this.y = y;
    this.x1 = x1;
    this.y1 = y1;
    this.id = createGuid();
    this.dx = 0;
    this.dy = 0;
    // mass is that of a sphere as opposed to circle.
    // it *does* make a difference.
    this.mass = 999999;
    this.color = getColor();
    this.drawWall = function () {
        ctx.beginPath();
        ctx.lineWidth = "10";
        ctx.strokeStyle = "black";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x1, this.y1)
        ctx.stroke();
    };
    this.speed = function () {
        // magnitude of velocity vector
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function () {
        //angle of ball with the x axis
        return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
        // only for masturbation purposes, not rly used for computation.
        return (0.5 * this.mass * this.speed() * this.speed());
    };
    this.onGround = function () {
        return (this.y + this.radius >= canvas.height)
    }
}
function Ball(x, y, radius) {
    this.id = createGuid();
    this.radius = getSize();
    this.dx = 0;
    this.dy = 0;
    // mass is that of a sphere as opposed to circle.
    // it *does* make a difference.
    this.mass = this.radius * this.radius * this.radius;
    this.x = x;
    this.y = y;
    this.arrowX = this.x;
    this.arrowY = this.y;
    this.color = getColor();
    this.draw = function () {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        //ctx.stroke();
        ctx.closePath();
        if (paused && selectedItem == this.id) {
            this.dx = (this.arrowX - this.x) / 50;
            this.dy = (this.arrowY - this.y) / 50;
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.arrowX, this.arrowY);
            ctx.lineTo(this.arrowX - 15 * Math.cos(this.angle() - Math.PI / 6), this.arrowY - 15 * Math.sin(this.angle() - Math.PI / 6));
            ctx.moveTo(this.arrowX, this.arrowY);
            ctx.lineTo(this.arrowX - 15 * Math.cos(this.angle() + Math.PI / 6), this.arrowY - 15 * Math.sin(this.angle() + Math.PI / 6));
            ctx.stroke();
            ctx.closePath();
        }
        else {
            this.arrowX = this.dx * 50 + this.x;
            this.arrowY = this.dy * 50 + this.y;
        }
    };

    this.speed = function () {
        // magnitude of velocity vector
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function () {
        //angle of ball with the x axis
        return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
        // only for masturbation purposes, not rly used for computation.
        return (0.5 * this.mass * this.speed() * this.speed());
    };
    this.onGround = function () {
        return (this.y + this.radius >= canvas.height)
    }
}

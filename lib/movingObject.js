(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (args) {
    this.pos = args["pos"];
    this.vel = args["vel"];
    this.radius = args["radius"];
    this.color = args["color"];
    this.game = args["game"];
    this.shouldWrap = args["shouldWrap"];
    this.orientation = args["orientation"];
    this.velDenom = args["velDenom"];
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      0,
      0,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.updateVelocity = function () {
    var angleBase = 0;

    if (Math.abs(this.orientation) > Math.PI/2) {
      var angleBase = Math.PI;
    }

    var velFactorX = Math.cos(Math.abs(angleBase - Math.abs(this.orientation)));
    var velFactorY = Math.sin(Math.abs(angleBase - Math.abs(this.orientation)));

    this.vel[0] = velFactorX / this.velDenom;
    this.vel[1] = velFactorY / this.velDenom;

    if (Math.abs(this.orientation) > Math.PI/2) {
      this.vel[0] *= -1;
    }

    if (this.orientation < 0) {
      this.vel[1] *= -1;
    }
  };

  MovingObject.prototype.move = function () {
    var x = this.pos[0] + this.vel[0];
    var y = this.pos[1] + this.vel[1];

    if (this.shouldWrap) {
      this.pos = this.game.wrap([x,y]);
    } else {
      this.pos = [x,y];
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObject.pos[0];
    var y2 = otherObject.pos[1];

    var x_diff = Math.abs(x1 - x2);
    var y_diff = Math.abs(y1 - y2);

    var dist = Math.sqrt(x_diff * x_diff + y_diff * y_diff);

    if (this.radius + otherObject.radius > dist) {
      return true;
    }

    return false;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

})();

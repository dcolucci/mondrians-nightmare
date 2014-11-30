(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Ship === "undefined") {
    Asteroids.Ship = {};
  }

  var Ship = Asteroids.Ship = function (pos, game) {
    var COLOR = "blue";
    var RADIUS = 10;
    var args = {
      pos: pos,
      color: COLOR,
      radius: RADIUS,
      vel: [0,0],
      game: game,
      shouldWrap: true,
      orientation: 0
    };

    this.velDenom = 1;

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse, dir, ctx) {
    if (dir === "right") {

      var floatOrientation = parseFloat(this.orientation.toString());

      if (Math.abs(floatOrientation) < Math.PI) {
        floatOrientation += Math.PI/20;
      } else {
        floatOrientation = floatOrientation * -1 + Math.PI/20;
      }

      this.orientation = floatOrientation;

    } else if (dir === "left") {

      var floatOrientation = parseFloat(this.orientation.toString());

      if (Math.abs(floatOrientation) < Math.PI) {
        floatOrientation -= Math.PI/20;
      } else {
        floatOrientation = Math.abs(floatOrientation) - Math.PI/20;
      }

      this.orientation = floatOrientation;

    } else if (dir === "down") {

      var floatVelDenom = parseFloat(this.velDenom.toString());

      if (floatVelDenom + 0.1 >= 1.2) {
        floatVelDenom = 1.2;
      } else {
        floatVelDenom += 0.1;
      }

      this.velDenom = floatVelDenom.toFixed(2);

    } else if (dir === "up") {

      var floatVelDenom = parseFloat(this.velDenom.toString());

      if (floatVelDenom - 0.1 <= 0) {
        floatVelDenom = 0.1;
      } else {
        floatVelDenom -= 0.1;
      }

      this.velDenom = floatVelDenom.toFixed(2);
    }
  };

  Ship.prototype.fireBullet = function () {
    var ship = this;
    this.game.bullets.push(new Asteroids.Bullet(ship, ship.game));
  };

  Ship.prototype.draw = function (ctx) {
    ctx.rotate(this.orientation);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-25, -25);
    ctx.lineTo(-25, 25);
    ctx.fill();

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

})();

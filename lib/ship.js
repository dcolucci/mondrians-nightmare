(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Ship === "undefined") {
    Asteroids.Ship = {};
  }

  var MAX_SPEED = 7;

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

    // this.velStraightLine = Math.sqrt((this.vel[0] * this.vel[0]) + (this.vel[1] * this.vel[1]));
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse, dir, ctx) {
    if (dir === "right") {

      if (this.orientation < Math.PI) {
        this.orientation = (this.orientation + Math.PI/20) % (2 * Math.PI);
      } else {
        this.orientation = (Math.PI - (Math.abs(this.orientation) - Math.PI)) * -1 + Math.PI/20;
      }

    } else if (dir === "down") {

      if (this.velDenom + 0.2 >= 5) {
        this.velDenom = 5;
      } else {
        this.velDenom += 0.2;
      }

    } else if (dir === "left") {

      if (Math.abs(this.orientation) < Math.PI) {
        this.orientation = (this.orientation - Math.PI/20) % (2*Math.PI);
      } else {
        this.orientation = this.orientation * -1 - Math.PI/20;
      }

    } else if (dir === "up") {

      console.log(this.velDenom);
      console.log(this.vel);

      if (this.velDenom - 0.2 <= 0) {
        this.velDenom = 0.2;
      } else {
        this.velDenom -= 0.2;
      }

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

    this.vel[0] = velFactorX === 0 ? 0 : velFactorX / this.velDenom;
    this.vel[1] = velFactorY === 0 ? 0 : velFactorY / this.velDenom;

    if (Math.abs(this.orientation) > Math.PI/2) {
      this.vel[0] *= -1;
    }

    if (this.orientation < 0) {
      this.vel[1] *= -1;
    }

    // this.velStraightLine = Math.sqrt((this.vel[0] * this.vel[0]) + (this.vel[1] * this.vel[1]));
  };

})();

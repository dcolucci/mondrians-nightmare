(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
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
      orientation: 0,
      velDenom: 1
    };

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (dir) {
    if (dir === "right") {

      if (Math.abs(this.orientation) < Math.PI) {
        this.orientation += Math.PI/20;
      } else {
        this.orientation = Math.abs(this.orientation) * -1 + Math.PI/20;
      }

    } else if (dir === "left") {

      if (Math.abs(this.orientation) < Math.PI) {
        this.orientation -= Math.PI/20;
      } else {
        this.orientation = Math.abs(this.orientation) - Math.PI/20;
      }

    } else if (dir === "down") {

      var floatVelDenom = parseFloat(this.velDenom.toString());

      if (floatVelDenom + 0.1 >= 1.2) {
        floatVelDenom = 1.2;
      } else {
        floatVelDenom += 0.1;
      }

      this.velDenom = floatVelDenom.toFixed(1);

    } else if (dir === "up") {

      var floatVelDenom = parseFloat(this.velDenom.toString());

      if (floatVelDenom - 0.1 <= 0) {
        floatVelDenom = 0.1;
      } else {
        floatVelDenom -= 0.1;
      }

      this.velDenom = floatVelDenom.toFixed(1);
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
  };

})();

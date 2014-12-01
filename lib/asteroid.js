(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    var COLOR = Asteroids.Util.randomColor();
    var RADIUS = Math.random() * 35 + 20;
    var args = {
      pos: pos,
      color: COLOR,
      radius: RADIUS,
      vel: Asteroids.Util.randomVec(5),
      game: game,
      shouldWrap: true,
      orientation: 0
    };

    this.rotationalVel = Math.random() / 25;

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      if (!this.game.ship.isSafe()) {
        this.game.ship.relocate();
        this.game.lives -= 1;
      }
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.rotate(this.orientation);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = "4";

    ctx.beginPath();
    ctx.moveTo(this.radius, -this.radius - 2);
    ctx.lineTo(this.radius, this.radius);
    ctx.lineTo(-this.radius, this.radius);
    ctx.lineTo(-this.radius, -this.radius);
    ctx.lineTo(this.radius + 2, -this.radius);
    ctx.fill();
    ctx.stroke();

    this.orientation += this.rotationalVel;
  };

  Asteroid.prototype.updateVelocity = function () {
    // do nothing
  };

})();

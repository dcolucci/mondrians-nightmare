(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Bullet === "undefined") {
    Asteroids.Bullet = {};
  }

  var Bullet = Asteroids.Bullet = function (ship, game) {
    this.vel = [];
    this.vel[0] = 2 * ship.vel[0];
    this.vel[1] = 2 * ship.vel[1];
    var COLOR = "red";
    var RADIUS = 2;
    var args = {
      pos: ship.pos,
      color: COLOR,
      radius: RADIUS,
      vel: this.vel,
      game: game,
      shouldWrap: false
    };

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
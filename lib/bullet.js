(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (ship, game) {
    this.vel = [];
    this.vel[0] = 0;
    this.vel[1] = 0;
    var COLOR = "#000000";
    var RADIUS = 2;
    var args = {
      pos: ship.pos,
      color: COLOR,
      radius: RADIUS,
      vel: this.vel,
      game: game,
      shouldWrap: false,
      orientation: ship.orientation,
      velDenom: 0.05
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

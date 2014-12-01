(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.gameInterval = window.setInterval(function () {
      this.game.draw(this.ctx);
      this.game.step();
      this.checkGameOver();
    }.bind(this), 20);
  };

  GameView.prototype.checkGameOver = function () {
    if (this.game.gameOver()) {
      clearInterval(this.gameInterval);
      alert("game over!");
    }
  }

  GameView.prototype.bindKeyHandlers = function () {
    var gv = this;
    key('up', function() { gv.game.ship.power("up") });
    key('down', function() { gv.game.ship.power("down") });
    key('left', function() { gv.game.ship.power("left") });
    key('right', function() { gv.game.ship.power("right") });
    key('space', function() { gv.game.ship.fireBullet() });
  };
})();

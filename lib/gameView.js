(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.GameView === "undefined") {
    Asteroids.GameView = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.setInterval(function () {
      this.game.draw(this.ctx);
      this.game.step();
    }.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gv = this;
    key('up', function() { gv.game.ship.power(1, "up") });
    key('down', function() { gv.game.ship.power(1, "down") });
    key('left', function() { gv.game.ship.power(1, "left") });
    key('right', function() { gv.game.ship.power(1, "right", gv.ctx) });
    key('space', function() { gv.game.ship.fireBullet() });
  };
})();

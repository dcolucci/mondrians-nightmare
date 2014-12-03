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
    var gameOver = this.game.gameOver();

    if (gameOver) {
      if (gameOver === 1) {
        $('#game-over-info').text('Sorry, You Lost!');
      } else {
        $('#game-over-info').text('Nice Work! You Won!');
      }

      clearInterval(this.gameInterval);
      $('#game-over-modal').css('display', 'block');
      $('#game-over-modal').css('z-index', '20');
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

(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var NUM_ASTEROIDS = 25;

  var Game = Asteroids.Game = function (dim_x, dim_y) {
    this.dim_x = dim_x;
    this.dim_y = dim_y;
    this.num_asteroids = NUM_ASTEROIDS;
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship(this.randomPosition(), this)
    this.bullets = [];
    this.allObjects = this.getAllObjects();
    this.counter = 0;
    this.lives = 3;
  };

  Game.prototype.getAllObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    var game = this;

    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var ast = new Asteroids.Asteroid(game.randomPosition(), this);
      asteroids.push(ast);
    };
    return asteroids;
  };

  Game.prototype.randomPosition = function (startAtEdge) {
    var x = Math.floor(Math.random() * (this.dim_x));
    var y = Math.floor(Math.random() * (this.dim_y));

    if (startAtEdge) {
      var whichEdge = Math.random();

      if (whichEdge < .25) {
        x = 0;
      } else if (whichEdge >= .25 && whichEdge < .50) {
        y = 0;
      } else if (whichEdge >= .50 && whichEdge < .75) {
        x = this.dim_x;
      } else {
        y = this.dim_y;
      }
    }

    return [x,y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);

    this.allObjects.forEach(function (object) {
      ctx.save();
      ctx.translate(object.pos[0], object.pos[1]);
      object.draw(ctx);
      ctx.restore();
      object.updateVelocity();
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects.forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    var y = pos[1];

    if (x <= 0) {
      var new_x = this.dim_x;
    } else {
      var new_x = x % this.dim_x;
    }

    if (y <= 0) {
      var new_y = this.dim_y;
    } else {
      var new_y = y % this.dim_y;
    }

    return [new_x,new_y];
  };

  Game.prototype.checkCollisions = function () {
    this.allObjects.forEach(function (object) {
      this.allObjects.forEach(function (otherObject) {
        if (object !== otherObject) {
          if (object.isCollidedWith(otherObject)) {
            object.collideWith(otherObject);
          }
        }
      }.bind(this));
    }.bind(this));
  };

  Game.prototype.step = function () {
    this.allObjects = this.getAllObjects();
    this.moveObjects();
    this.checkCollisions();
    this.counter += 1;

    if (this.counter % 200 === 0) {
      var ast = new Asteroids.Asteroid(game.randomPosition(true), this);
      this.asteroids.push(ast);
    }
  };

  Game.prototype.remove = function (movingObject) {
    for (var i = 0; i < this.allObjects.length; i++) {
      if (this.allObjects[i] === movingObject) {
        this.allObjects.splice(i,1);
        if (movingObject instanceof Asteroids.Asteroid) {
          this.asteroids.splice(i,1);
        } else if(movingObject instanceof Asteroids.Bullet) {
          this.bullets.splice(this.asteroids.length - i, 1);
        }
      }
    };
  };

  Game.prototype.gameOver = function () {
    return this.lives < 0 || this.asteroids.length === 0;
  };

})();

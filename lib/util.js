(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Util === "undefined") {
    Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (child, parent) {
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var x = 0;
    var y = 0;

    while (Math.abs(x) < 0.1 || Math.abs(y) < 0.1) {
      x = Math.floor(((Math.random() * 2) - 1) * (length + 1));
      y = Math.floor(((Math.random() * 2) - 1) * (length + 1));
    }

    return [x,y];
  };

  Asteroids.Util.randomColor = function () {
    var random = Math.random();
    var color;

    if (random < .25) {
      color = "#0000FF";
    } else if (random >= .25 && random < .50) {
      color = "#FF0000";
    } else if (random >= .50 && random < .75) {
      color = "#FFFF00";
    } else {
      color = '#FFFFFF';
    }

    return color;
  }

})();

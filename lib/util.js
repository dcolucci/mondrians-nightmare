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
    var x = Math.floor(((Math.random() * 2) - 1) * (length + 1));
    var y = Math.floor(((Math.random() * 2) - 1) * (length + 1));
    return [x,y]
  };

})();
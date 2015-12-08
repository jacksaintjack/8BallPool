Var Game = {}

Game.Preloader = function () {};

//Seeting up the protype for my init, preload, and create
//Should get the information for my game upon starting
Game.Preloader.prototype = {

  init: function () {},

  preload: function() {},

  create: function () {}

};

//My First state upon loading the game
Game.MainMeu = function() {};

Game.MainMenu.prototype = {

  create: function(){},

  start: function (){}
};

//The state that should be loaded when I start playing the game
Game.Play = function(play) {};

Game.Play.prototype = {

  init: function () {},

  create: function(){},

  togglePause: function() {},

  toggleDebug: function() {},

  makeBall: function(x, y, color) {},

  takeShot: function () {},

  hitPocket: function (ball,pocket){},

  resetCueBall: function() {},

  placeCueBall: function() {},

  updateCue: function () {},

  update: function (){},

  updateSpeed: function () {},

  preRender: function () {},

  positionShadow: function () {},

  gameOver: function () {},

  render: function() {}
};

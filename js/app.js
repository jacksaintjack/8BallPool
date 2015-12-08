Var Game = {}

Game.Preloader = function () {};

//Seeting up the protype for my init, preload, and create
//Should get the information for my game upon starting
Game.Preloader.prototype = {

  init: function () {},

  preload: function() {},

  create: function () {

    this.table = this.add.sprite(400)
  }

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

  create: function(){

    //Placing the sprite postion
    this.table = this.add.sprite(400, 300, 'table');

    //Brings in the physics for the sprite
    this.physics.p2.enable(this.table, Game.showDebug);
    
    //Physics from the JSON file is set to static to make sure it,
    //it's self will not be influenced by anything else.
    //Example: Ball hits table. Table flys of screen
    this.table.body.static = true;
    this.table.body.clearShape(); //Makes sure we don't see physics enabled rectangle
    this.table.body.loadPolygon('table', 'pool-table-physics-shape'); // loads physics data from Cache
  },

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

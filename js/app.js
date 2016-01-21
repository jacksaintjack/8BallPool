Var Game = {}

Game.Preloader = function () {};

//Seeting up the protype for my init, preload, and create
//Should get the information for my game upon starting
Game.Preloader.prototype = {

  init: function () {},

  preload: function() {
    //Loading Physics in with the key table
    this.load.physics('table')
  },

  create: function () {

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

    // ** Code for the Table ** //
    this.stage.backgroundColor = 0x001b07;
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
    //loading matierla for table
    this.tableMaterial = this.physics.p2.createMaterial('tableMaterial', this.table.body);

    // ** Code for the Pockets in the Pool //
    //Adding Blank Sprite for pockets
    this.pockets = this.add.sprite();
    this.physics.p2.enable(this.pockets, Game.showDebug);
    //Setting phsyics when hit
    this.pockets.body.static = true
    this.pockets.body.clearShape();
    //Position of the pockets
    this.pockets.body.addCircle(32, 64, 80);
    this.pockets.body.addCircle(16, 400, 80);
    this.pockets.body.addCircle(32, 736, 80);

    this.pockets.body.addCircle(32, 64, 528);
    this.pockets.body.addCircle(16, 400, 528);
    this.pockets.body.addCircle(32, 736, 528);

    //** Code for Balls **//

    //Shadow for the Ball
    this.shadows = this.add.group();

    //cushion placed on top of shadow sprite so that the shadow will not bleed over on other sprites
    this.add.sprite(0, 0, 'cushions');

    this.balls = this.add.physicsGroup(Phaser.Phsyics.P2JS);
    this.balls.enableBodyDebug = Game.showDebug;

    //Defining materials for the balls
    this.ballMaterial = this.physics.p2.createMaterial('ballMaterial');

    //Row one of Balls on Rack (200 is the x cordinate)
    var y = 241;
    this.makeBall(200, Game.RED);
    this.makeBall(200, y + 32, Game.YELLOW);
    this.makeBall(200, y + 64, Game.YELLOW);
    this.makeBall(200, y + 96, Game.RED);
    this.makeBall(200, y + 128, Game.YELLOW)

    //Row two
    y = 257;
    this.makeBall(232, y, Game.YELLOW);
    this.makeBall(232, y + 32, Game.RED);
    this.makeBall(232, y + 64, Game.YELLOW);
    this.makeBall(232, y + 96, Game.RED);

    //Row Three
    y = 273;

    this.makeBall(264, y, Game.RED);
    this.makeBall(264, y + 32, Game.BLACK);
    this.makeBall(264, y + 64, Game.YELLOW);

    //Row Four
    y = 289;
    this.makeBall(296, y, Game.YELLOW);
    this.makeBall(296, y + 32, Game.RED);

    //Row Five
    this.makeBall(328, 305, Game.RED)

    //Cue Ball
    this.cueball = this.makeBall(576, 305, Game.WHITE);

    //VS Physics
    var ballVsTableMaterial = this.physics.p2.createContactMaterial(
      this.ballMaterial, this.tableMaterial);

      ballVsTableMaterial.restitution = 0.6; //bouncinessfor ball on table hits

      var ballVsBallMaterial = this.physics.p2.createContactMaterial(
        this.ballMaterial, this.ballMaterial);

        ballVsBallMaterial.restitution = 0.9; // bouciness for ball on ball hits

        //Cue
        this.cue = this.add.sprite(0, 0, 'cue');
        this.cue.anchor.y = 0.5; // making sure the cue will always perfects be around cue ball

        //The power indicator fill for cue
        this.fill = this.add.sprite(0, 0, 'fill');
        this.fill.anchor.y = 0.5;
        this.fillRect = new Phaser.Rectangle(0, 0, 332, 6);
        this.fill.crop(this.fillRect); // Cropping how much you see of the fill bar

        ///Created a phaser line object to handle pull back of the cue
        this.aimLine = new Phaser.Line(
          this.cueball.x, this.cueball.y,
          this.cueball.x, this.cueball.y);
        )
      },

      togglePause: function() {},

      toggleDebug: function() {},

      // Using this method to generate our balls. x,y stand for the Position
      // The color is the color of the balls
      makeBall: function(x, y, color) {
        var ball = this.balls.create(x, y, 'balls', color);

        ball.body.setCircle(13); //Body is set to a circle with 13px
        ball.body.fixedRotation = true; //Makes sure balls don't rotate
        ball.body.setMaterial(this.ballMaterial);
        //Starts slowing down the ball after an impact.
        ball.body.damping = 0.40;
        ball.body.angularDamping = 0.45;
        // this is called when the ball goes into the pocket
        ball.body.createBodyCallback(this.pockets, this.hitPocket, this)

        // Binds the shadow Sprite to the ball sprite
        var shadow = this.shadows.create(x + 4, y + 4, 'balls', 4);
        shadow.anchor.set(0.5);

        ball.shadow = shadow;

        return ball;
      },

      takeShot: function () {
        // First check to see how fast the cue ball is moving
        if (this.speed > this.allowShotSpeed)
        {
          return;
        }
        // Capping speed to a max of 112
        var speed = (this.aimLine.length / 3);

        if (speed > 112)
        {
          speed = 112;
        }

        this.updateCue();

        //adjusting speed to work out angle to apply a impulse to cue ball.
        var px = (Math.cos(this.aimLine.angle) * speed);
        var py = (Math.sin(this.aimLine.angle) * speed);

        this.cueball.body.applyImpulse([ px, py ]); //Impulse is a force added to a body over a short period of time

        //Hides the cue after the shot
        this.cue.visible = false;
        this.fill.visible = false;
      },

      hitPocket: function (ball, pocket){
        //Checking to see if the cue ball went into the pocket
        if (ball.sprite === this.cueball)
        {
          this.resetCueBall();
        }
      },

      //handling when a cue ball is sunk into a pocket
      resetCueBall: function() {
        this.cueball.body.setZerVelocity(); // Stopping the velocity of the cue ball

        this.cueball.body.x = 16;
        this.cueball.body.y = 16;
      },

      placeCueBall: function() {},

      //Updating the position of the aimline
      updateCue: function () {
        this.aimLine.start.set(this.cueball.x, this.cueball.y);
        this.aimLine.end.set(this.input.activePoint.x, this.input.activePointer.y);

        //Align cue sprite
        this.cue.position.copyFrom(this.aimLine.start);
        this.cue.rotation = this.aimLine.angle;

        //Adjust for how much of the fill strite is visible
        this.fill.position.copyFrom(this.aimLine.start);
        this.fill.rotation = this.aimLine.angle;

        this.fillRect.Width = this.aimLine.length;
        this.fill.updateCrop();
      },

      update: function (){},

      //Determines the speed of the cue ball
      updateSpeed: function () {
        this.speed = Math.sqrt(this.cueball.body.velocity.x * this.cueball.body.velocity.x + this.cueball.body.velocity.y * this.cueball.body.velocity.y);

        if (this.speed < this.allowShotSpeed)
        {
          if (!this.cue.visible)
          {
            this.cue.visible = true;
            this.fill.visible = true;
          }
        }
        else if (this.speed < 3.0)
        {
          this.cueball.body.setZeroVelocity();
        }
      },

      preRender: function () {
        this.balls.forEach(this.positionShadow, this);
      },

      positionShadow: function (ball) {
        ball.shadow.x = ball.x + 4;
        ball.shadow.y = ball.y + 4;
      },

      gameOver: function () {},

      render: function() {}
    };

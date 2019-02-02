var AM = new AssetManager();

let cursor = { /* Arrow keys */
    'rightPressed': false,
    'leftPressed': false,
    'downPressed': false,
    'upPressed': false,
    'cPressed': false
};

class Animation {
  constructor( spriteSheet, startX, startY,  frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
  }

    drawFrame(tick, ctx, x, y, scaleBy) {
        // if scaleBy = 0, change to 1
        var scaleBy = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            }
        }
        let frame = this.currentFrame();

        let index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
        let vindex = 0;
        if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
            index -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }
        let locX = x;
        let locY = y;
        let offset = vindex === 0 ? this.startX : 0;
        ctx.drawImage(this.spriteSheet,
            index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
            this.frameWidth, this.frameHeight,
            locX, locY,
            this.frameWidth * scaleBy,
            this.frameHeight * scaleBy);
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
}

class Frog {
  constructor(game, spriteSheet) {
    this.animation = new Animation(spriteSheet,0, 0, 32, 32, 4, 0.08, 4, true, 1);
    this.leftAnimation = new Animation(AM.getAsset("./img/mikethefrog2.png"), 0, 32, 32, 32, 4, 0.08, 4, true, 1);
    this.x = 0;
    this.y = 400;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.isRight = true;
  }

  draw(ctx) {
    if(this.isRight){
      this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    } else {
      this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }
  }

    update() {
        if (this.x < 50 && !this.isRight) {

            this.isRight = true;
        } else if (this.x < 370 && this.isRight) {
            this.x += this.game.clockTick * this.speed;

        } else {
            this.isRight = false;

            this.x -= this.game.clockTick * this.speed;
        }
    }
}

class BeardGuy {
    constructor(game, spritesheet) {
        ///// Change animation here to a new one
        this.animationLeft = new Animation(spritesheet, 0, 65, 48, 65, 4, 0.10, 4, true, 1);
        this.animation = new Animation(AM.getAsset("./img/beardguy2.png"), 0, 0, 48, 65, 4, 0.10, 4, true, 1);
        this.x = 750;
        this.y = 400;
        this.speed = 100;
        this.game = game;
        this.ctx = game.ctx;
        this.isLeft = true;
    }

    draw(ctx){
      if(this.isLeft){
          this.animationLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
      } else {
          this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
      }
    }

    update() {
        if (this.x < 530) {
            this.isLeft = false;
        } else if (this.x > 700) {
            this.isLeft = true;
        }
        if (this.isLeft) {
            this.x -= this.game.clockTick * this.speed;
        } else {
            this.x += this.game.clockTick * this.speed;
        }
    }
}

class Skeleton{
    constructor(game, spriteSheet){
        this.game = game;
        this.x = 600;
        this.y = 400;
        this.speed = 50;
        this.animation = this.animation = new Animation(spriteSheet, 0, 0, 64, 64, 7, 0.1, 7, true, 1);
        this.game = game;
        this.ctx = game.ctx;
        this.stateMachine = new StateMachine();
        this.stateMachine.addState('secondState', 
        new Animation(AM.getAsset('./img/skeleton.png'), 0, 65, 64, 64, 7, 0.1, 7, true, 1));
        this.stateMachine.addState('walkLeft',
         new Animation(AM.getAsset('./img/skeleton2.png'), 0, 585, 64, 64, 7, 0.1, 7, true, 1));
        this.stateMachine.addState('walkRight',
         new Animation(AM.getAsset('./img/skeleton2.png'), 0, 715, 64, 64, 7, 0.1, 7, true, 1));
        this.stateMachine.addState('walkAway', 
        new Animation(AM.getAsset('./img/skeleton2.png'), 0, 520, 64, 64, 7, 0.1, 7, true, 1));
        this.stateMachine.addState('pushUp',
         new Animation(AM.getAsset('./img/skeleton2.png'), 0, 1300, 64, 64, 11, 0.1, 11 , true, 1));
        this.stateMachine.addState('walkTowards', 
        new Animation(AM.getAsset('./img/skeleton2.png'), 0, 650, 64, 64, 9, 0.1, 9 , true, 1));
        this.stateMachine.addState('notSure', 
        new Animation(AM.getAsset('./img/skeleton2.png'), 0, 390, 64, 64, 9, 0.1, 9 , true, 1));
        this.isLeft = false; 
        this.isRight = false;
        this.isAway = false;
        this.count = 0;
    }

    update(){
        // this.stateMachine.setState('secondState');
       
        if(this.count < 150){
            this.stateMachine.setState('pushUp');
            this.count++;
        } else if(this.x > 500 && this.y < 400){
            this.stateMachine.setState('walkTowards');
            this.y += this.game.clockTick * this.speed;
        } else
        if(this.x > 400 && this.y > 399 ){
            this.x -= this.game.clockTick * this.speed;
            this.stateMachine.setState('walkLeft');
            this.isLeft = true;
        } else 
        if(this.y <= 320){
            this.x += this.game.clockTick * this.speed;
            this.stateMachine.setState('walkRight');

        } else if(this.x <=400){
            this.y -= this.game.clockTick * this.speed;
            this.stateMachine.setState('walkAway');
            this.isLeft = false;
            this.isAway = true;       
        }       
    }
    draw(ctx){
       this.stateMachine.draw(this.game.clockTick, ctx, this.x, this.y, 0.5);
    }
}

class FlyingBird {
  constructor(game, spriteSheet, startX, startY, scale) {
    this.animation = new Animation(
      spriteSheet,0,0, 190, 126, 6, 0.167, 6, true,.5);
    this.x = startX;
    this.y = startY;
    this.speed = 80;
    this.game = game;
    this.ctx = game.ctx;
    this.scale = scale;
  }

  draw(ctx) {
   
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

    
  }

  update() {
    //   let px = this.x * 4 * Math.cos(( -0.5 + Math.PI/360) % Math.PI * 2);
    //   let py = this.y * 4 * Math.sin(( -0.5 + Math.PI/360) % Math.PI * 2);
    if (this.x > 800) {
        this.x = -10;
        this.y = 0;
      }

    if(this.x > 200 & this.x < 480){
        this.x += this.game.clockTick * this.speed;
        this.y += this.game.clockTick * this.speed; 
        // this.x = px;
        // this.y= py;
    } else if (this.x > 400) {
        this.x += this.game.clockTick * this.speed;
        this.y -= this.game.clockTick * this.speed; 
        
    } else 
    this.x += this.game.clockTick * this.speed;  
  }
}

class Background{
    constructor(game, spritesheet) {
        this.x = 0;
        this.y = 0;
        this.spritesheet = spritesheet;
        this.ctx = game.ctx;
    }

    draw() {
        this.ctx.drawImage(this.spritesheet, this.x, this.y);
    }
    update(){}
}

AM.queueDownload("./img/mikethefrog2.png");
AM.queueDownload("./img/background.png");
AM.queueDownload("./img/beardguy2.png");
// AM.queueDownload('./img/main_dude.png');
AM.queueDownload('./img/skeleton2.png');
AM.queueDownload('./img/flyingBird.png');

AM.downloadAll(function() {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  var gameEngine = new GameEngine();
  gameEngine.init(ctx);
  gameEngine.start();

  gameEngine.addEntity(new Background(gameEngine, AM.getAsset('./img/background.png')));
  gameEngine.addEntity(new Frog(gameEngine, AM.getAsset("./img/mikethefrog2.png")));
  gameEngine.addEntity(new BeardGuy(gameEngine, AM.getAsset("./img/beardguy2.png")));
  gameEngine.addEntity(new Skeleton(gameEngine,AM.getAsset('./img/skeleton2.png')));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -10, 0, 0.2));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -25, 0, 0.3));
//   gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -40, 0, 0.1));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -55, 0, 0.3));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -60, 0, 0.333));
//   gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -75, 0, 0.4));
//   gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -80, 0, 0.2));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -95, 0, 0.12));
//   gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -115, 0, 0.25));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -125, 0, 0.23));
//   gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -135, 0, 0.22));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -145, 0, 0.26));
  gameEngine.addEntity(new FlyingBird(gameEngine, AM.getAsset('./img/flyingBird.png'), -160, 0, 0.2));


  console.log("All Done!");
});

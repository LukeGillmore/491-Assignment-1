var AM = new AssetManager();

let cursor = { /* Arrow keys */
    'rightPressed': false,
    'leftPressed': false,
    'downPressed': false,
    'upPressed': false
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
    // this.state = new StateMachine("frog", "running_left");
    this.animation = new Animation(spriteSheet,0, 0, 32, 32, 4, 0.08, 4, true, 1);
    // this.testStateMachine = new Animation(AM.getAsset("./img/mikethefrog2.png"),
    //     this.state.spriteX, this.state.spriteY, 32, 32, this.state, this.state.frames);
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
      // console.log(this.testStateMachine);
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
        this.x = 600;
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
        if (this.x < 430) {
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
    class MainDude{
    constructor(game, spritesheet){
        this.x = 400;
        this.y = 400;
        this.speed = 100;
        this.game = game;
        this.ctx = game.ctx;
        this.stateMachine = new StateMachine('idleDownDJ', new Animation(
          AM.getAsset('./img/main_dude.png'), 0, 0, 32, 64, 2, 0.5, 2, true));
      this.stateMachine.addState('idleDownDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 0, 32, 64, 2, 0.5, 2, true));
      this.stateMachine.addState('idleLeftDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0 ,64, 32, 64, 2, 0.5, 2, true));
      this.stateMachine.addState('idleUpDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 128, 32, 64, 2, 0.5, 2, true));
      this.stateMachine.addState('idleRightDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 192, 32, 64, 2, 0.5, 2, true));
      this.stateMachine.addState('runDownDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 256, 32, 64, 2, 0.167, 2, true));
      this.stateMachine.addState('runLeftDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0 ,320, 32, 64, 6, 0.167, 6, true));
      this.stateMachine.addState('runUpDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0 ,384, 32, 64, 2, 0.167, 2, true));
      this.stateMachine.addState('runRightDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 448, 32, 64, 6, 0.167, 6, true));
      this.stateMachine.addState('attackDownDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 512, 32, 64, 5, 0.2, 5, true));
      this.stateMachine.addState('attackLeftDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 576, 32, 64, 4, 0.25, 4, true));
      this.stateMachine.addState('attackUpDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 640, 32, 64, 6, 0.167, 6, true));
      this.stateMachine.addState('attackRightDJ', new Animation(
        AM.getAsset('./img/main_dude.png'), 0, 704, 32, 64, 4, 0.25, 4, true));

    }

    draw(ctx){
      if(cursor.rightPressed){
        this.stateMachine.setState('runRightDJ');
          this.stateMachine.draw(this.game.clockTick, ctx, this.x, this.y, 1);
      } else if(cursor.leftPressed) {
        this.stateMachine.setState('runLeftDJ');
          this.stateMachine.draw(this.game.clockTick, ctx, this.x, this.y, 1);
      } else if(cursor.upPressed){
        this.stateMachine.setState('runUpDJ');
        this.stateMachine.draw(this.game.clockTick, ctx, this.x, this.y, 1);
      } else if(cursor.downPressed){
        this.stateMachine.setState('runDownDJ');
        this.stateMachine.draw(this.game.clockTick, ctx, this.x, this.y, 1);
      } else {
        this.stateMachine.setState('idleDownDJ');
        this.stateMachine.draw(this.game.clockTick, ctx, this.x, this.y, 1);


            }
    }

    update() {
        /* Here we check to see if any buttons where pressed and if our character is in the world */
        if (cursor.rightPressed) {
            this.x += this.game.clockTick * this.speed;
        } else if (cursor.leftPressed) {
            this.x -= this.game.clockTick * this.speed;
        }
        if (cursor.upPressed) {
            this.y -= this.game.clockTick * this.speed;
        } else if (cursor.downPressed && this.y >= 0) {
            this.y += this.game.clockTick * this.speed;
        }
        if (this.x > 800) {
            this.x = -32;
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
        this.stateMachine.addState('walkLeft', new Animation(AM.getAsset('./img/skeleton2.png'), 0, 585, 64, 64, 7, 0.1, 7, true, 1));
        this.stateMachine.addState('walkRight', new Animation(AM.getAsset('./img/skeleton2.png'), 0, 715, 64, 64, 7, 0.1, 7, true, 1));
        this.stateMachine.addState('walkAway', new Animation(AM.getAsset('./img/skeleton2.png'), 0, 520, 64, 64, 7, 0.1, 7, true, 1));
        this.stateMachine.addState('pushUp', new Animation(AM.getAsset('./img/skeleton2.png'), 0, 1300, 64, 64, 11, 0.1, 11 , true, 1));
        this.stateMachine.addState('walkTowards', new Animation(AM.getAsset('./img/skeleton2.png'), 0, 650, 64, 64, 9, 0.1, 9 , true, 1));
        this.isLeft = false; 
        this.isRight = false;
        this.isAway = false;
        this.count = 0;
        
    }

    update(){

        // this.stateMachine.setState('secondState');
        if(this.count < 50){
            this.stateMachine.setState('pushUp')
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
        //  if(this.y < 300){
        //     this.x += this.game.clockTick * this.speed;

        // }
        
       
        
    }
    draw(ctx){
       this.stateMachine.draw(this.game.clockTick, ctx, this.x, this.y);
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
AM.queueDownload('./img/main_dude.png');
AM.queueDownload('./img/skeleton2.png');



AM.downloadAll(function() {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  var gameEngine = new GameEngine();
  gameEngine.init(ctx);
  gameEngine.start();

  gameEngine.addEntity(new Background(gameEngine, AM.getAsset('./img/background.png')));
  gameEngine.addEntity(new Frog(gameEngine, AM.getAsset("./img/mikethefrog2.png")));
  gameEngine.addEntity(new BeardGuy(gameEngine, AM.getAsset("./img/beardguy2.png")));
  gameEngine.addEntity(new MainDude(gameEngine, AM.getAsset('/img/main_dude.png')));
  gameEngine.addEntity(new Skeleton(gameEngine,AM.getAsset('./img/skeleton2.png')));


  console.log("All Done!");
});

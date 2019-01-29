var AM = new AssetManager();

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
  constructor(game, spritesheet){
    ///// Change animation here to a new one
    this.animationLeft = new Animation(spritesheet,0, 65, 48, 65, 4, 0.10,  4, true, 1);
    this.animation = new Animation(AM.getAsset("./img/beardguy2.png"), 0, 0, 48, 65, 4, 0.10,  4, true, 1);
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



AM.downloadAll(function() {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  var gameEngine = new GameEngine();
  gameEngine.init(ctx);
  gameEngine.start();

  gameEngine.addEntity(new Background(gameEngine, AM.getAsset('./img/background.png')));
  gameEngine.addEntity(new Frog(gameEngine, AM.getAsset("./img/mikethefrog2.png")));
  gameEngine.addEntity(new BeardGuy(gameEngine, AM.getAsset("./img/beardguy2.png")));



  console.log("All Done!");
});

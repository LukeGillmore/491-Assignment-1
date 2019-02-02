window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

class GameEngine {
  constructor() {
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
  }

  init(ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    this.startInput();
    console.log("game initialized");
  }

  start() {
    console.log("starting game");
    let that = this;
    (function gameLoop() {
      that.loop();
      requestAnimationFrame(gameLoop, that.ctx.canvas);
    })();
  }

    startInput() {
        // document.addEventListener("keydown", keyDownHandler, false);
        this.ctx.canvas.addEventListener('keydown', keyDownHandler);
        this.ctx.canvas.addEventListener('keyup', keyUpHandler);
        // this.ctx.canvas.addEventListener('keydown', function (e) {
        //   switch (e.key) {
        //     case 'W':
        //     case 'w':
        //       console.log('up');
        //     break;
        //     case 'S':
        //     case 's': console.log('down'); break;
        //     case 'A':
        //     case 'a': console.log('left'); break;
        //     case 'D':
        //     case 'd': console.log('right'); break;
        //     case 'P':
        //       console.log('P');
        //       // Pause Game
        //       break;
        //     case 'p':
        //       console.log('p');
        //       // Pause Game
        //       break;
        //     default: console.log('Unknown ' + e.key);
        //   }
        // }, false);

        this.ctx.canvas.addEventListener('click', function (e) {
            // Attack on left click
        }, false);
    }

  addEntity(entity) {
    console.log("added entity");
    this.entities.push(entity);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
  }

  update() {
    let entitiesCount = this.entities.length;

    for (let i = 0; i < entitiesCount; i++) {
      let entity = this.entities[i];

      entity.update();
    }
  }

  loop() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
  }


  }

function Timer() {
  this.gameTime = 0;
  this.maxStep = 0.05;
  this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function() {
  var wallCurrent = Date.now();
  var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
  this.wallLastTimestamp = wallCurrent;

  var gameDelta = Math.min(wallDelta, this.maxStep);
  this.gameTime += gameDelta;
  return gameDelta;
};

function Entity(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.removeFromWorld = false;
}

Entity.prototype.update = function() {};

Entity.prototype.draw = function(ctx) {
  if (this.game.showOutlines && this.radius) {
    this.game.ctx.beginPath();
    this.game.ctx.strokeStyle = "green";
    this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.game.ctx.stroke();
    this.game.ctx.closePath();
  }
};

Entity.prototype.rotateAndCache = function(image, angle) {
  var offscreenCanvas = document.createElement("canvas");
  var size = Math.max(image.width, image.height);
  offscreenCanvas.width = size;
  offscreenCanvas.height = size;
  var offscreenCtx = offscreenCanvas.getContext("2d");
  offscreenCtx.save();
  offscreenCtx.translate(size / 2, size / 2);
  offscreenCtx.rotate(angle);
  offscreenCtx.translate(0, 0);
  offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
  offscreenCtx.restore();
  //offscreenCtx.strokeStyle = "red";
  //offscreenCtx.strokeRect(0,0,size,size);
  return offscreenCanvas;
};

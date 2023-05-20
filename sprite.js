import CoinSprite from './coinSprite.js';
import PoopSprite from './poopSprite.js';
import PlayerSprite from './playerSprite.js';

(function () {
  var player,
    playerImage,
    playerImageRun,
    coin,
    coinImage,
    canvas,
    score = 0,
    poop,
    poopImage,
    health = 100,
    x = 0,
    y = 0,
    dx = 0,
    dy = 0,
    dpy = 1,
    dpx = 1,
    difMod = 0.1;

  var rightPressed = false;
  var leftPressed = false;
  var upPressed = false;
  var downPressed = false;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    updateGameElements();
    renderGameElements();
    updateScoreAndHealthDisplay();
  }

  function updateGameElements() {
    poop.update();
    coin.update();
    player.update();
    checkCollisions();
    movePoop();
  }

  function renderGameElements() {
    poop.render(poopX, poopY);
    coin.render(coinX, coinY);
    player.render(x, y);
  }

  // Rest of the code...

  canvas = document.getElementById("coinAnimation");
  canvas.width = 800;
  canvas.height = 600;

  coinImage = new Image();
  poopImage = new Image();
  playerImage = new Image();
  playerImageRun = new Image();
  playerImageIdle = new Image();

  coinImage.addEventListener("load", function () {
    coin = new CoinSprite(canvas.getContext("2d"), coinImage, 1000, 128, 10, 15);
    gameLoop();
  });
  coinImage.src = "images/coin-sprite-animation.png";

  poopImage.addEventListener("load", function () {
    poop = new PoopSprite(canvas.getContext("2d"), poopImage, 1200, 156, 10, 20);
    gameLoop();
  });
  poopImage.src = "images/poop.png";

  playerImage.addEventListener("load", function () {
    playerImageRun.addEventListener("load", function () {
      player = new PlayerSprite(
        canvas.getContext("2d"),
        playerImage,
        playerImageRun,
        playerImageIdle,
        1200,
        156,
        10,
        20
      );
      gameLoop();
    });
    playerImageRun.src = "images/Cuphead_jump_cycle.png";
  });
  playerImage.src = "images/Cuphead_jump_cycle_left.png";

  playerImageIdle.addEventListener("load", function () {
    gameLoop();
  });
  playerImageIdle.src = "images/Cuphead_Idle.png";
})();

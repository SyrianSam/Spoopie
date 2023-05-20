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
        health = 100, // object.health would make more sense for a more complicated game, but here it isn't very needed
        x = 0, y = 0 , dx = 0, dy = 0, dpy = 1, dpx = 1, difMod = 0.1;  


        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;
       // coinX = Math.floor((Math.random() * 700) + 1);;
       // coinY = Math.floor((Math.random() * 500) + 1);;
        //poopX = Math.floor((Math.random() * 700) + 1);
       // poopY = Math.floor((Math.random() * 500) + 1);

       // initialisation of poop and coin
          coinY = 200;
          coinX = 200;
          poopX = 500;
          poopY = 300;
       // coinY = Math.floor((Math.random() * 500) + 1);


    function gameLoop () {

      window.requestAnimationFrame(gameLoop);


      //order indicates z-index here player appears over the coin and coin over the poop
       poop.render(poopX, poopY);
       poop.update();
       
       coin.render(coinX, coinY);
       coin.update();

        player.render(x, y);
        player.update();
      
      // dynamic score and health display
      document.getElementById('score').innerHTML = "Score: " + score + "  " +  "  Health: " + health + " %" + " Level: " + difMod * 10;
    }

    function sprite (options) {

        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.imageR = options.imageR;
        that.imageL = options.imageL;
        that.image = options.image;

        that.update = function () {
            tickCount += 1;
              // key down enables speed (dx = 1) key up resets it to 0
            if(x + dx < canvas.width - 60 && x + dx > 0) {
                x += dx; 
            }

            if(y + dy > 0 && y + dy < canvas.height - 80) {
                y += dy;

            }

            if (tickCount > ticksPerFrame) {

                tickCount = 0;
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {  
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }

    //movement 
    if(rightPressed){
        dx = 1 + difMod;
    }else if(leftPressed){
        dx = -1 - difMod;
    }else{dx = 0;}

    if(upPressed){
        dy = -1 - difMod;
    }else if(downPressed){
        dy = 1 + difMod;
    }else {dy = 0;}

       //coin collision test
       if( x > coinX -30 && x < coinX + 30 && y < coinY + 50 && y > coinY -50) {
            score += 10;
            if(health < 100)
            health += 1;

         coinX = Math.floor((Math.random() * 700) + 1);
         coinY = Math.floor((Math.random() * 500) + 1);
       }
       // poop collision test
       if( x > poopX -30 && x < poopX + 30 && y < poopY + 50 && y > poopY -50) {
         health -= 25;
         poopX = Math.floor((Math.random() * 700) + 1);
         poopY = Math.floor((Math.random() * 500) + 1);
       }

       if (health < 1){
            var r = confirm("You died from Ebola");
        if(r)
            location.reload(); 
        else 
            location.reload();
       }

       poopX += dpx;
       poopY += dpy;

       // speed goes up for every 100 score points
       difMod = Math.floor(score /100)/10;

       // bowel movement
       if(poopX + dpx > canvas.width + 10 || poopX + dpx <  - 10) {
           dpx = -dpx;
       }
       if(poopY + dpy < 0) {
           dpy = -dpy;
       } else if(poopY + dpy > canvas.height) {
               dpy = -dpy;
       }
        };

        that.render = function (x , y) {

          // Clear the canvas
          that.context.clearRect(x-20, y - 10, (that.width/ numberOfFrames) - 20, that.height - 40 );

          // Draw the animation

          if(rightPressed){
          that.context.drawImage(
            that.imageR,
            frameIndex * that.width / numberOfFrames, // sx
            0,      //sy
            that.width / numberOfFrames,
            that.height,
            x, // pos x
            y,// pos y
            (that.width / numberOfFrames) /2,
            that.height/2);}
          else if(leftPressed){
          that.context.drawImage(
            that.imageL,
            frameIndex * that.width / numberOfFrames, // sx
            0,      //sy
            that.width / numberOfFrames,
            that.height,
            x, // pos x
            y,// pos y
            (that.width / numberOfFrames) /2,
            that.height/2);}
          else{   that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            x, // pos x
            y,// pos y
            (that.width / numberOfFrames) /2,
            that.height/2);}
        };

        return that;
    }

    // Get canvas
    canvas = document.getElementById("coinAnimation");
    canvas.width = 800;
    canvas.height = 600;

    // Create sprite sheet
    coinImage = new Image(); 
    poopImage = new Image();   
    playerImage = new Image();    
    playerImageRun = new Image();   
    playerImageIdle = new Image();
    // Create sprite 
    coin = sprite({
        context: canvas.getContext("2d"),
        width: 1000,
        height: 128,
        imageR: coinImage,
        imageL: coinImage,
        image: coinImage,
        numberOfFrames: 10,
        ticksPerFrame: 15
    });

    //magic johnson
    poop = sprite({
        context: canvas.getContext("2d"),
        width: 1200,
        height: 156,
        imageR: poopImage,
        imageL: poopImage,
        image: poopImage,
        numberOfFrames: 10,
        ticksPerFrame: 20
    });

    //useless comment
    player = sprite({
        context: canvas.getContext("2d"),
        width: 1200,
        height: 156,
        imageR: playerImageRun,
        imageL: playerImage,
        image: playerImageIdle,
        numberOfFrames: 10,
        ticksPerFrame: 20
    });



    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

//key handlers

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }else if(e.keyCode == 37) {
        leftPressed = true;
    }else if(e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 38) {
       upPressed = false;
    }else if(e.keyCode == 37) {
        leftPressed = false;
    }else if(e.keyCode == 40) {
        downPressed = false;
    }
}

    // Load sprite sheet
    coinImage.addEventListener("load", gameLoop);
    coinImage.src = "images/coin-sprite-animation.png";


    poopImage.addEventListener("load", gameLoop);
    poopImage.src = "images/poop.png";

    playerImage.addEventListener("load", gameLoop);
    playerImage.src = "images/Cuphead_jump_cycle_left.png";

    playerImageRun.addEventListener("load", gameLoop);
    //playerImageRun.src = "images/Cuphead_run_cycle.png";
    playerImageRun.src = "images/Cuphead_jump_cycle.png";

    playerImageIdle.addEventListener("load", gameLoop);
    playerImageIdle.src = "images/Cuphead_Idle.png";

} ());

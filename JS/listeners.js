$(function(){
    document.addEventListener('keydown', function(e){
        if (playGame){
             var keyCode = e.keyCode;
             if (keyCode == 37)
                    player.moveLeft = true;
             if (keyCode == 38)
                    player.moveUp = true;
             if (keyCode == 39)
                    player.moveRight = true;
             if (keyCode == 40)
                    player.moveDown = true; 
         }
        });   
    document.addEventListener('keyup', function(e){
             var keyCode = e.keyCode;
            if (keyCode == 37)
                    player.moveLeft = false;
            if (keyCode == 38)
                    player.moveUp = false;
            if (keyCode == 39)
                    player.moveRight = false;
            if (keyCode == 40)
                    player.moveDown = false;
            if (keyCode == 32 && !playGame)
                init();
        });

    canvas.addEventListener('touchstart', function(e) {
        if (playGame){
            e.preventDefault();
            var touch = e.touches[0];
            if (touch.pageX < w/2)
                player.moveLeft = true;
            if (touch.pageY < 0)
                player.moveUp = true;
            if (touch.pageX > w/2)
                player.moveRight = true;
            if (touch.pageY > h/1.5)
                player.moveDown = true; 
        }
    }, false);


    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        player.moveLeft = false;
        player.moveUp = false;
        player.moveRight = false;
        player.moveDown = false; 
    }, false);

    window.addEventListener('resize', resizeCanvas, false);
});
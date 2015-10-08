var canvas, ctx,  w, h, score, playGame = false;
var img_CentalBankMeasure, centalBankMeasures, numCentalBankMeasures, img_Rouble, player;
var kDifficulty_Radius,  kDifficulty_Speed, kMinRadius, kDMinSpeed;
var OminMode = false;
var RoubleMode = false;
var RoubleExchangeReq = "http://rate-exchange.appspot.com/currency?from=USD&to=RUB";

function init(){
    settingsInit();
    playerInit();
    centalBankMeasuresInit();
    
    $("#play").hide();
    $("h1").hide();

    score = 52.04;
    playGame = true;
    $("#audioPlayer").trigger('play');
    gameLoop();
    
    if(navigator.onLine){
        $.ajax({
            type: 'GET',
            url: RoubleExchangeReq,
            dataType: 'jsonp',
            success: function (data) {
                score = data["rate"];
                playGame = true;
                $("#audioPlayer").trigger('play');
                gameLoop();
            }
        });
    }

    console.log(navigator.onLine);
};

function settingsInit(){
        resizeCanvas();
        playGame = false;
        numCentalBankMeasures = (ifMobile()) ? 1 : 10
        kDifficulty_Radius = 30;
        kDifficulty_Speed = 10;
        kMinRadius = 30;
        kDMinSpeed = 5;
        $("#audioPlayer").trigger('load');
        $("#play").text("Play again?");            
}
function centalBankMeasuresInit(){

    centalBankMeasures = new Array()
    var img = new Image();
    img.src = "centalBankMeasure.png";
    for (var i = 0; i < numCentalBankMeasures; i++){
        var radius = kMinRadius + (Math.random()*10);
        var x = radius + Math.floor(Math.random()*w);
        var y = h;
        var vY = kDMinSpeed + (Math.random()*5);
        centalBankMeasures.push(new CentalBankMeasure(x,y, radius, vY, img));
    }   
};
function playerInit(){
    player = new Player(w/2, 150);
    img_Rouble = new Image();
    img_Rouble.src = "Rouble.png";
}

function gameLoop(){
    
    if(playGame){
        ctx.clearRect(0,0,w,h);
        var centalBankMeasuresLength = centalBankMeasures.length;
        score += 0.01;
        kDifficulty_Radius += 0.01;
        kDifficulty_Speed += 0.01;
        kDMinSpeed += 0.01;
            
        
        movePlayer();
        moveCentalBankMeasures();
        drawObjects();
        
        setTimeout(gameLoop, 33);
    }
    
    function moveCentalBankMeasures(){
        
        for (var i = 0; i < centalBankMeasuresLength; i++){
        
        centalBankMeasure = centalBankMeasures[i];
        
        if (centalBankMeasure.y + centalBankMeasure.radius < 0){
         centalBankMeasure.radius = kMinRadius + (Math.random()*kDifficulty_Radius);
         centalBankMeasure.x = centalBankMeasure.radius + Math.floor(Math.random()*w);
         centalBankMeasure.y = h;
         centalBankMeasure.vY = kDMinSpeed + (Math.random()*kDifficulty_Speed);
         centalBankMeasure.vX = kDMinSpeed/3 + (Math.random()*kDifficulty_Speed/3);
        }

        centalBankMeasure.y -= centalBankMeasure.vY;
        

        centalBankMeasure.y -= centalBankMeasure.vY;

        var direction = 0;

        if (Math.abs(player.x - centalBankMeasure.x) < 3){
            direction = 0;
        }
        else if (player.x > centalBankMeasure.x){
            direction = centalBankMeasure.vX;
        }
        else if (player.x < centalBankMeasure.x){
            direction = -centalBankMeasure.vX;
        }

        centalBankMeasure.x += direction * ((OminMode) ? -1 : 1);
        

        
        collision();
        
    };
    }
    function drawObjects(){
        
       
        drawCentalBankMeasures();
        drawPlayer();
        drawScore();
        
        function drawScore(){
            var text = "1 US Dollar equals: "+score.toFixed(2)+" rub";
            ctx.font = '20px Calibri';
            ctx.strokeStyle= "white";
            ctx.strokeText(text, w-270, 20);
            ctx.stroke();
            document.title = text;
        }
        function drawCentalBankMeasures(){
            
            for (var i = 0; i < centalBankMeasuresLength; i++){
       
               centalBankMeasure = centalBankMeasures[i];
               ctx.beginPath();
               ctx.drawImage(centalBankMeasure.img, 
                             centalBankMeasure.x-centalBankMeasure.radius/2, centalBankMeasure.y-centalBankMeasure.radius/2,
                             centalBankMeasure.radius, centalBankMeasure.radius);
               ctx.closePath();
               ctx.fill();

               ctx.strokeStyle = "#c00";
               ctx.arc(centalBankMeasure.x, centalBankMeasure.y, centalBankMeasure.radius/2, 0, 2*Math.PI, true );
               ctx.stroke();
               
           };  
        }    
        function drawPlayer(){
            
            if (player.moveDown){
                ctx.save();
                ctx.translate(player.x, player.y);
    
                player.flameLength =  Math.floor(Math.random() * 10) + 10;
                    
                var flameDirection = 0;
                var flameX = 0;
                var flameY = 0;

                player.moveDown
                    
                if (player.moveLeft && player.moveDown){
                    flameDirection = 20;
                    flameX = -1;
                 }
                if (player.moveRight && player.moveDown){
                    flameDirection = -20;
                    flameX = -1;
                }

  


                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.moveTo(-10+flameX,flameY);
                ctx.lineTo(flameDirection, -5*player.flameLength);
                ctx.lineTo(10+flameX,flameY);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
            
            ctx.beginPath();
            ctx.drawImage(img_Rouble, player.x-player.width/2, player.y-player.height/2);
            ctx.closePath();
            ctx.fill();
        }
        
    }
    function movePlayer(){
        
        player.vX = player.vY = 0;
        
        if (player.moveRight)
            player.vX = 15;
        if (player.moveLeft)
            player.vX = -15;


        if (player.moveDown)
            player.vY = 15;
        else if (player.moveUp)
            player.vY = -15;
        else
            player.vY = -5;

        player.x += player.vX;
        player.y += player.vY;
        
        if (player.x - player.width/2 <= 0)
            player.x = player.width/2;
        else if (player.x + player.width/2 >= w )
            player.x = w - player.width/2;
            
        if (player.y - player.height/2 <= 0){
            //gameOver();
            player.y = player.height/2;
        }
        else if (player.y + player.height/2>= h)
            player.y = h - player.height/2;
    }
    function collision(){
        var dX = player.x - centalBankMeasure.x;
        var dY = player.y - centalBankMeasure.y;
        
        var disnance = Math.sqrt ( (dX*dX) + (dY*dY));
        
        if ( disnance < player.width/2 + centalBankMeasure.radius/2 )
            gameOver();
        
    }     
}; 
function gameOver(){
    
    playGame = false;
    $("#play").show();
    $("h1").show();
    $("#audioPlayer").trigger('pause');
    $("#audioPlayer").prop("currentTime",0);
}

$(function(){

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
            
    $("#play").click(init);
});
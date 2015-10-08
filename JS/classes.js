    var CentalBankMeasure = function(x,y, radius, vY, img){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.vY = vY;     
      this.vX = 0;     
      this.img = img;
    };
    var Player = function(x,y){
        this.x = x;
        this.y = y;
      
        this.img;
      
        this.width = 44;
        this.height = 44;
        
        this.vX = 0;
        this.vY = 0;
        
        this.moveRight = false;
        this.moveLeft = false;
        this.moveDown = false;
        this.moveUp = false;
        
        this.flameLength = 20;    
    };
  
/*
	Class Name: Animation
	Author: Amin Benarieb
	Author URI: http://vk.com/aminbenarieb
	Description: Animation Class
	Version: 0.2
*/

function Animation(){

	var self = this,
		stage,
		startTime,
		lastTime,
		timeInterval,
		duration = 0,
	 	frame = 0,
	 	fps,
	 	animated = false;

        window.requestAnimFrame = (function(callback){
               return window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function(callback){
                   window.setTimeout(callback, 1000 / 60);
               };
		})();

		//get  functions
		this.getDuration = function(SI){

			return SI == 'sec' ? Math.round(duration/1000): duration;
		}

		this.getTimeInterval = function(){

			return timeInterval;
		}

		this.getFrame = function(){

			return frame;
		}

		this.getFPS = function(){

			return fps

		}

		this.getStage = function(){

			stage();
		}

		this.isAnimated = function(){

			return animated;
		}

		this.setStage = function(_stage){

			stage = _stage;

		}

		this.setAnimated = function(flag){


			animated = flag == true || flag == false ? flag: animated;
		}

		//star function
		this.start = function(){

		   this.setAnimated(true);
		   var date = new Date();
		   startTime = date.getTime();
		   lastTime = startTime;
           loop();
		}

		//loop function
		var loop = function(){
		 

		   timeInterval = new Date().getTime()-lastTime;
		   duration += timeInterval;
		   lastTime = new Date().getTime();
		   delta = timeInterval/1000;
		   fps = Math.round(1/delta);
	       frame++;

	       self.getStage !== undefined ? self.getStage() : console.log("undefined stage: " );
		
	       animated ? requestAnimFrame(function(){loop();}) : console.log("animation is stopped ");
		}
}

/*
	Class Name: Layer
	Author: Amin Benarieb
	Author URI: http://vk.com/aminbenarieb
	Description: Class for layers
	Version: 0.1

*/

function Layer(parent, id, width, height, x, y){


			this.parent = parent;
			this.canvas;
			this.context;
			this.x = x;
			this.y = y;
	        function init(that){

		        that.canvas = document.createElement('canvas');
				that.canvas.id     =  id;
				that.canvas.width  = width;
				that.canvas.height = height;
				parent.appendChild(that.canvas);

				that.canvas = document.getElementById(that.canvas.id);
				that.context = that.canvas.getContext('2d');}

			init(this);
}

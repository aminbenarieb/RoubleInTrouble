function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    w = canvas.width;
    h = canvas.height;
}

function ifMobile(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
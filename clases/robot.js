
export default class Robot{
	constructor(x,y,speed,jumpSpeed,gravity,level){
		this.x = x;
		this.y = y;
		this.speed= speed;
		this.jumpSpeed = jumpSpeed;
		this.gravity = gravity;
		this.level = level;
		this.rightPressed = false;
		this.leftPressed = false;
		this.isJumping = false;
		this.shoot = false;
		this.down=false;
		this.speedShoot=100;
		this.isShooting=false;
		this.currentFrame=0;
		this.frames = [];
		this.width = 150;
    	this.height = 150;

		var imagenes=[
			'robotfall.png',
			'robotgib1.png',
			'robotgib2.png',
			'robotgib3.png',
			'robotgib4.png',
			'robotgib5.png',
			'robotland.png',
			'robotshoot.png',
			'robothover1.png',
			'robothover2.png',
			'robotturn.png']
		for (let i = 0; i <= imagenes.length -1 ; i++) {
		  const img = new Image();
		  img.src = `robotgunner/${imagenes[i]}`;
		  
		  this.frames.push(img);
		}
	}
	jump() {
		this.isJumping=true;
		this.jumpSpeed=-20;
	}
	stop() {
	    this.isJumping = false;
	    
	  }
	shoot(){
		this.isShooting=true;
	}
	checkCollision(obstacle) {
    // Verificar si el personaje está dentro de los límites del obstáculo
	    if (this.x + this.width > obstacle.x && 
	        this.x < obstacle.x + obstacle.width &&
	        this.y + this.height > obstacle.y && 
	        this.y < obstacle.y + obstacle.height) {
	      return true;
	    } else {
	      return false;
	    }
	  }

	handleKeyDown(event) {
		if (event.key === "ArrowRight") {
      		this.rightPressed = true;
	    }
	    if (event.key === "ArrowLeft") {
	      this.leftPressed = true;

	    }
	    if (event.key === "ArrowDown") {
	      this.down = true;
	    }
	    if (event.key === "ArrowUp" && !this.isJumping) {
	    // Saltar si no se está en el aire
	    this.jump();
	  	}
	  	if (event.key === "a" ) {
	    	this.shoot = true;
	  	}
	  	
	}

	handleKeyUp(event) {
		if (event.key === "ArrowRight") {
      		this.rightPressed = false;
    	}
	     if (event.key === "ArrowLeft") {
	      this.leftPressed = false;
	    }
	    
	  	if (event.key === "ArrowDown" ) {
	    	this.down= false;
	  	}
	  	if (event.key === "a" ) {
	    	this.shoot = true;
	  	}
	  	
	}
	draw(ctx){
		ctx.drawImage(this.frames[this.currentFrame], this.x, this.y, this.width,this.height);
	}

	update() {
		//cuando el jugador se agacha
		
		if (this.down) {
			this.currentFrame=6
    	}else{
    		this.currentFrame=0
    	}

    	if(this.shoot){
			this.isShooting = true;
	        this.shoot = false; //resetear el estado de disparo para la próxima vez
	        this.currentFrame = this.isShooting ? 7 : 0; //alternar entre los frames 0 y 7
	        setTimeout(() => {
	            this.isShooting = false; //restablecer el estado de disparo después de un tiempo determinado
	        }, this.speedShoot); //cambiar aquí el tiempo de duración del disparo
		}

    	if (this.x <= 750) {
	      if (this.rightPressed && !this.down) {
		      this.x += this.speed;
		      this.currentFrame=9
			}
  		}

  		if (this.x>=0) {
	      	if (this.leftPressed && !this.down) {
		      this.x -= this.speed;
		      this.currentFrame=9
		      }
    	}else{
    		this.currentFrame=0
    	}

    	this.frameCount++;

	    if (this.frameCount >= 5) {
	      this.frameCount = 0;
	    }

	    if (this.isJumping) {
	      this.y += this.jumpSpeed;
	      this.jumpSpeed += this.gravity;
	      this.currentFrame=6;
	      this.currentFrame=8
	    }
    // Si se alcanza el suelo, detener el salto
	    if (this.y > this.level) {
	      this.y = this.level;
	      this.isJumping = false;
	   	  this.currentFrame=0
	    }
	}
}
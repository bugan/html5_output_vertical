function CreateWord(canvasId,imageSrc,letrasImgSrc,arrayPecas,arrayPontos,touch){
    //set to true to view debug points
    /*
    *******************
    */
    this.debug = false; 
    /*
    *******************
    */
    this.touchEnabled = touch;
    
    this.audioCorreto = document.getElementById('correto');
    this.audioErro = document.getElementById('errado');
    
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    
    this.refImage = new Image();
    this.refImage.src = imageSrc;
    
    this.letrasImg =  new Image();
    this.letrasImg.src = letrasImgSrc ;
    
    this.arrayPonto = arrayPontos;
    this.arrayPecas = arrayPecas;
    
    this.currentDrag = null;
    this.radius = 15;
    
    this.iniX=0;
    this.iniY=0;
    
    
    if(touchEnabled){
		this.mouseStart = "touchstart";
		this.mouseMove = "touchmove";
		this.mouseEnd  = "touchend";
	}else{
		this.mouseStart = "mousedown";
		this.mouseMove = "mousemove";
		this.mouseEnd  = "mouseup";
	}
    this.loadCanvas();
    this.addListeners();
}

CreateWord.prototype.loadCanvas = function(){
    if(this.debug){
        var childPoint;
        for(var i =0 ; i < this.arrayPonto.length;i++){
            childPoint = this.arrayPonto[i];
            
            this.context.arc(childPoint.x, childPoint.y, this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = 'green';
        }
    }
    childPoint = null;
};

CreateWord.prototype.addListeners = function(){

/**
*onMouseDown
*/
    var _self = this;
    this.canvas.addEventListener(this.mouseStart,function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onMouseStart(event);
    },false);
   
/**
*onMouseMove
*/  
    this.canvas.addEventListener( this.mouseMove, function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onMouseMove(event)
    
    },false);	
    
/**
*onMouseUp
*/
    this.canvas.addEventListener( this.mouseEnd,function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onMouseEnd(event);
            
    },false); 
};

CreateWord.prototype.onMouseStart = function(event){
    event.stopPropagation();
    event.preventDefault();
    
    var offsetX;
    var offsetY;
	var child;
    
    if(this.touchEnabled){
          offsetX = event.targetTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
		  offsetY = event.targetTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;
				
    }else{
         offsetX = event.offsetX;
         offsetY = event.offsetY;
    }
     
    for(var j=0;j < this.arrayPecas.length; j++){
        child = this.arrayPecas[j];
         
        if(offsetX > child.rect.x && offsetX < child.rect.x + child.rect.width){
            if(offsetY > child.rect.y && offsetY < child.rect.y + child.rect.height){
                if(child.isActivated){
                    this.iniX= child.rect.x;
                    this.iniY= child.rect.y;
                    this.currentDrag = child;
                }
            }
        }
    }  
    
    offsetX = null;
    offsetY = null;
	child = null;
};

CreateWord.prototype.onMouseMove = function( event ){
    event.stopPropagation();
    event.preventDefault();
    if(this.currentDrag != null && this.currentDrag != undefined){
        var offsetX
        var offsetY;
        if(this.touchEnabled){
    	    offsetX = event.targetTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
            offsetY = event.targetTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;
        }else{
            offsetX = event.offsetX ;
    	    offsetY = event.offsetY ;
        }
        this.currentDrag.rect.x = offsetX - this.currentDrag.rect.width /2;
        this.currentDrag.rect.y = offsetY- this.currentDrag.rect.height /2;  
    }
};

    
CreateWord.prototype.onMouseEnd =  function( event ){
    event.stopPropagation();
    event.preventDefault();
    if(this.currentDrag != null && this.currentDrag != undefined){
        var offsetX;
   	    var offsetY;
        var child;
        
    	if(this.touchEnabled){
            offsetX = event.changedTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
    	    offsetY = event.changedTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;
        }else{
    	    offsetX = event.offsetX ;
            offsetY = event.offsetY ;
    	}
        for(var i =0 ; i< this.arrayPonto.length;i++){
            
             child = this.arrayPonto[i];
           
            if(offsetX > child.x-this.radius && offsetX < child.x + this.radius){
                if(offsetY > child.y-this.radius && offsetY < child.y + this.radius){
                        
                    if(this.arrayPonto.indexOf(child) == this.arrayPecas.indexOf(this.currentDrag)){
                        this.currentDrag.rect.x = child.x - this.currentDrag.rect.width /2;
                        this.currentDrag.rect.y = child.y - this.currentDrag.rect.height/2;
                        this.currentDrag.isActivated = false;
                        this.audioCorreto.load();
                        this.audioCorreto.play();
                    }else{
                        this.audioErro.load();
                        this.audioErro.play();
                    }
                    
                }
            }
        }
        if(this.currentDrag.isActivated){
            this.currentDrag.rect.y = this.iniY;
            this.currentDrag.rect.x = this.iniX;
        }
        this.currentDrag = null;
        child = null;
        offsetX = null;
        offsetY = null;
        
    }
};

CreateWord.prototype.renderiza = function(){
    var child;
    
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.context.drawImage(this.refImage,0,0);
    
    for(var i =0 ; i < this.arrayPecas.length;i++){
   	    child =  this.arrayPecas[i];
		this.context.drawImage(this.letrasImg,(child.rect.iniX + 0.5) | 0,(child.rect.iniY+ 0.5) | 0,child.rect.width,child.rect.height,child.rect.x,child.rect.y,child.rect.width,child.rect.height);	
    }
    if(this.debug){
        this.context.fill();
    }
    child =null;
}
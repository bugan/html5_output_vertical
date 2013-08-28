function DrawCanvas(canvasId ,imgSource,touchEnabled){
    
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.context.shadowBlur = 0;
	
    if(imgSource != ""){
        this.image = new Image();
        this.image.src = imgSource;
    }
    
    this.colorimage = new Image();
    this.colorimage.src ="assets/images/cores_9.png";

    this.touchEnabled = touchEnabled;

    if(touchEnabled){
		mouseStart = "touchstart";
		mouseMove = "touchmove";
		mouseEnd  = "touchend";
	}else{
		mouseStart = "mousedown";
		mouseMove = "mousemove";
		mouseEnd  = "mouseup";
	}
    
    this.imageData = this.context.createImageData(this.canvas.width,this.canvas.height);
    this.lastPoint = new Point(0,0);
    
    this.arrayCores = new Array();
   
    this.context.strokeStyle = "#df4b26";
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;
    
    this.loadCanvas();
    this.addListeners();
    this.renderiza();
}

DrawCanvas.prototype.loadCanvas = function(){

        var vermelho = new Color("#ff0922",new Point(10,10),0,0,49,49);
        this.arrayCores.push(vermelho);
        
        var amarelo = new Color("#e7e515",new Point(60,10),49,0,49,49);
        this.arrayCores.push(amarelo);
        
        var verde = new Color("#01bf56",new Point(110,10),98,0,49,49);
        this.arrayCores.push(verde);
        
        
        var azul = new Color("#0090db",new Point(10,60),0,49,49,49);
        this.arrayCores.push(azul);
        
        var marrom = new Color("#793f00",new Point(60,60),49,49,49,49);
        this.arrayCores.push(marrom);
        
        var cinza = new Color("#404040",new Point(110,60),98,49,49,49);
        this.arrayCores.push(cinza);
        
        var branco = new Color("#fff",new Point(10,120),150,0,50,50);
        this.arrayCores.push(branco);
        
        var branco = new Color("#cfd",new Point(60,120),150,50,50,50);
        this.arrayCores.push(branco);
        
        vermelho =null;
        amarelo = null;
        verde = null;
        azul = null;
        rosa = null;
        cinza = null;
}

DrawCanvas.prototype.addListeners = function(){

/**
*onMouseDown
*/
    var _self = this;
    this.canvas.addEventListener(mouseStart,function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onMouseStart(event);
        
        
    },false);
   
/**
*onMouseMove
*/  
   
    this.canvas.addEventListener( mouseMove,function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onMouseMove(event);
    
    },false);	
    
/**
*onMouseUp
*/
    this.canvas.addEventListener( mouseEnd,function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onMouseEnd(event);
            
    },false); 
    

};

DrawCanvas.prototype.onMouseStart = function(event){
    event.stopPropagation();
    event.preventDefault();
    var offsetX;
    var offsetY;
    var child;
     
    if(this.touchEnabled){
         offsetX = event.targetTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
         offsetY = event.targetTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;
				
    }else{
         offsetX = event.offsetX ;
         offsetY = event.offsetY ;
    }
    
   
    for(var j=0;j < this.arrayCores.length; j++){
         child = this.arrayCores[j];
         
        if(offsetX > child.rect.x && offsetX < child.rect.x + child.rect.width){
            if(offsetY > child.rect.y && offsetY < child.rect.y + child.rect.height){
  		        
                
                if(child.color == "#fff"){
                    this.context.strokeStyle = 'rgba(0,0,0,1)';
                }else   if(child.color == "#cfd"){
                    
                     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                }else{
                    this.context.strokeStyle  = child.color;
                }
            }
        }
    }  
    this.context.beginPath();
    this.beginDraw = true;
    
    this.lastPoint.x = offsetX;
    this.lastPoint.y = offsetY;
    
    offsetX = null;
    offsetY = null;
    child = null;
};

DrawCanvas.prototype.onMouseMove = function( event){
    event.stopPropagation();
    event.preventDefault();
	var offsetX;
	var offsetY;
    
    if(this.touchEnabled){
	    offsetX = event.targetTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
        offsetY = event.targetTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;
    }else{
        offsetX = event.offsetX ;
	    offsetY = event.offsetY ;
    }    
    
    if(this.beginDraw){
        this.renderiza(offsetX,offsetY);
    }
	offsetX = null;
    offsetY  = null;
};

    
DrawCanvas.prototype.onMouseEnd =  function( event ){
    event.stopPropagation();
    event.preventDefault();
    this.context.closePath();
    
	this.beginDraw = false;
	
	this.imageData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.putImageData(this.imageData,0,0);
    
};

DrawCanvas.prototype.renderiza = function(offsetX,offsetY){	
    var child;
    if(this.context.strokeStyle == "#000000" ){
        this.context.globalCompositeOperation = "destination-out";
    }else{
        this.context.globalCompositeOperation = "source-over";
    }
    if(this.lastPoint != null && this.lastPoint != undefined){
        this.context.moveTo(this.lastPoint.x,this.lastPoint.y);
        this.context.lineTo(offsetX,offsetY);
        this.context.stroke();
        this.lastPoint.x = offsetX;
        this.lastPoint.y = offsetY;
     }
    this.context.globalCompositeOperation = "source-over";
   
    if(this.image != undefined ){
       this.context.drawImage(this.image,5,10);
    }
    
    for(var j=0;j<this.arrayCores.length ;j++){
       child = this.arrayCores[j];
       this.context.drawImage(this.colorimage,child.rect.iniX,child.rect.iniY,child.rect.width,child.rect.height,child.rect.x,child.rect.y,child.rect.width,child.rect.height);
    }
    child = null;
}


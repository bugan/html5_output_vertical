function LiguePontos(canvasId,imgSource,arrayRects,touchEnabled) {
    
    
    this.audioCorreto = document.getElementById('correto');
    this.audioErro = document.getElementById('errado');
    
    this.touchEnabled = touchEnabled;
    
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    
    this.refImage = new Image();
    this.refImage.src = imgSource;

    
    this.firstChild = null;
    this.tempPath = new Path();
    this.beginDraw = false;
    
    this.arrayRects = arrayRects;
    this.arrayPecas = new Array();
    this.arrayPaths = new Array();
    
    this.lineColor = "#333";
    this.lineWidth = 4;
    
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

LiguePontos.prototype.loadCanvas = function(){
    
    this.context.strokeStyle = this.lineColor;
    this.context.lineWidth = this.lineWidth;
    
    for(var i =0 ; i < this.arrayRects.length ; i++){
        
        var peca;
        var rectPeca = this.arrayRects[i];
        
        if(i % 2 == 0 ){
            peca = new Peca("item_"+i,rectPeca.iniX,rectPeca.iniY,rectPeca.width,rectPeca.height);
            peca.rect.x = rectPeca.x;
            peca.rect.y = rectPeca.y;
        }else{
            peca = new Peca("item_"+(i-1)+"_key",rectPeca.iniX,rectPeca.iniY,rectPeca.width,rectPeca.height);
            peca.rect.x = rectPeca.x;
            peca.rect.y = rectPeca.y;
        }
        this.arrayPecas.push(peca);
    }
    
    this.arrayRects = null;

};
    


LiguePontos.prototype.addListeners = function(){

/**
*onMouseDown
*/
    var _self = this;
    this.canvas.addEventListener(this.mouseStart, function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onMouseStart(event);
        
    },false);
   
/**
*onMouseMove
*/  
   
    this.canvas.addEventListener( this.mouseMove,function(){
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



LiguePontos.prototype.onMouseStart = function(event){
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
			
    this.beginDraw = true;	
    
    for(var i =0; i < this.arrayPecas.length; i++){
	  child = this.arrayPecas[i];
				
		  if(offsetX > child.rect.x && offsetX < child.rect.x + child.rect.width){
              if(offsetY > child.rect.y && offsetY < child.rect.y + child.rect.height){
                if(child.isActivated){		
                    this.tempPath = new Path();
                    this.tempPath.beginPoint = new Point(offsetX,offsetY);
                    this.firstChild = child;
                    
                }else{
                    this.firstChild = null;
                }
              }
          }
    }
    
    child = null;
    offsetX =null;
    offsetY = null;
};

LiguePontos.prototype.onMouseMove = function( event ){
    event.stopPropagation();
    event.preventDefault();
    if(this.beginDraw){
        var offsetX;
        var offsetY;
        
        if(this.touchEnabled){
    	    offsetX = event.targetTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
            offsetY = event.targetTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;
        }else{
            offsetX = event.offsetX ;
    	    offsetY = event.offsetY ;
        }
        
        this.tempPath.endPoint = new Point(offsetX,offsetY);
        offsetX = null;
        offsetY = null;
    }	
};

    
LiguePontos.prototype.onMouseEnd =  function( event ){
    event.stopPropagation();
    event.preventDefault();
    
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
        
        this.beginDraw = false;
        
        for(var i =0; i < this.arrayPecas.length; i++){
            child =  this.arrayPecas[i];		
    		if(offsetX > child.rect.x && offsetX < child.rect.x + child.rect.width){
                if(offsetY > child.rect.y && offsetY < child.rect.y + child.rect.height){
    				if(this.firstChild != null){		
        				this.tempPath.endPoint = new Point(offsetX,offsetY);
                        var myRegExp = new RegExp(/key/);
                        
        				if(myRegExp.test(this.firstChild.name)){
        				    if(child.name+"_key" == this.firstChild.name){
                                this.arrayPaths.push(this.tempPath);
                                this.acertou();	
                                child.isActivated = false;
                                return;
        				    }
        				}else{
        				    if(child.name == this.firstChild.name+"_key"){
                                this.arrayPaths.push(this.tempPath);	
                                this.acertou();	
                                child.isActivated = false;
                                return;
        				    }
        				}	
    				}
                }
            }
        }
        
        if(this.firstChild != null){
            this.audioErro.load();
    	    this.audioErro.play();		
        }
        
        child = null;
        offsetX = null;
        offsetY = null;
    
};

LiguePontos.prototype.acertou = function(){
    this.audioCorreto.load();
    this.audioCorreto.play();
    this.firstChild.isActivated = false;
    
    this.tempPath = new Path();
}

LiguePontos.prototype.renderiza = function(){
    var child;
    var currentPath;
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.context.beginPath();
	for(var i =0 ; i < this.arrayPecas.length ; i++){
		child =  this.arrayPecas[i];
		this.context.drawImage(this.refImage,child.rect.iniX,child.rect.iniY,child.rect.width,child.rect.height,child.rect.x,child.rect.y,child.rect.width,child.rect.height);
    }
	if(this.beginDraw){
		this.context.moveTo(this.tempPath.beginPoint.x , this.tempPath.beginPoint.y);
		this.context.lineTo(this.tempPath.endPoint.x , this.tempPath.endPoint.y);
	}
	
	for(var j =0 ; j < this.arrayPaths.length ; j++){
		currentPath = this.arrayPaths[j];
        
		this.context.moveTo(currentPath.beginPoint.x,currentPath.beginPoint.y);
		this.context.lineTo(currentPath.endPoint.x,currentPath.endPoint.y);
		
	}
    
    this.context.closePath();
    this.context.stroke();
    currentPath = null;
    child = null;
    
            
};



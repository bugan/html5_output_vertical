function MemoryGame(canvasId,refImageSrc){
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    
    this.refImage = new Image();
    this.refImage.src = refImageSrc;
    
    this.audioCorreto = document.getElementById('correto');
    
    this.arrayCartas = new Array();
    this.closeArray = new Array();
    var carta;
    var index;
    var aux=0;
    for(var i =0;i<16;i++){
        if(i%2 !=0){
            index = i-1;
        }else{
            index = i;
        }
        carta = new Carta(index,113*(i%4)+12,142*(parseInt(i/4))+9,113,142);
        this.arrayCartas.push(carta);
    }
    
    carta = new Carta(-1,470,10,113,142);
    this.arrayCartas.push(carta);
    
    
    this.arrayTabuleiro = new Array();
    
    
    do{
        do{
            index= parseInt(Math.random()*16);
        }while(this.arrayTabuleiro.indexOf(index) != -1);
        this.arrayTabuleiro.push(index);
        this.arrayCartas[index].rect.x = 113*(aux%4)+12;
        this.arrayCartas[index].rect.y = 142*(parseInt(aux/4))+9; 
        aux++;
    }while(this.arrayTabuleiro.length <16);
    
    aux=null;
    index = null;
    carta= null;
    
    this.addEvents();
}

MemoryGame.prototype.addEvents = function(){
	var _self = this;
	
	this.canvas.addEventListener( 'click',function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onClick(event);
    
    },false);	
}

MemoryGame.prototype.onClick = function(){
    event.stopPropagation();
    event.preventDefault();
    var offsetX;
	var offsetY;
    var child;
    var _self = this;
    if(this.touchEnabled){
        offsetX = event.targetTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
		offsetY = event.targetTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;		
    }else{
        offsetX = event.offsetX ;
        offsetY = event.offsetY ;
    }	
    
    for(var i =0; i < this.arrayTabuleiro.length; i++){
	    child = this.arrayCartas[this.arrayTabuleiro[i]];
		if(child.canClick){
    		if(offsetX > child.rect.x && offsetX < child.rect.x + child.rect.width){
                if(offsetY > child.rect.y && offsetY < child.rect.y + child.rect.height){
                    
                    if(child.aberta){
                        child.aberta = false;
                    }else{
                        child.aberta = true;
                        this.verificaCarta(child);
                    }
                }
            }
        }
    }
    window.setTimeout(function(){
        for(var j=0;j<_self.closeArray.length;j++){
            if(_self.closeArray[j].canClick){
                _self.closeArray[j].aberta=false;
            }
            window.clearTimeout(2000);
        }
        _self.closeArray.length =0;
    },2000);
    child = null;
    offsetX =null;
    offsetY = null;
}

MemoryGame.prototype.verificaCarta = function(child){
     var controlCard;
     var abertas = 0;
     
     for(var i=0;i<this.arrayTabuleiro.length;i++){
        controlCard = this.arrayCartas[this.arrayTabuleiro[i]]; 
        if(controlCard.aberta == true && controlCard.canClick){
            abertas++ 
        }      
        if(controlCard != child){
            if(controlCard.index == child.index){
                if(controlCard.aberta == true){
                    
                    controlCard.canClick =false;
                    child.canClick = false;
                    acertu = true;
                    
                    abertas = null;
                    controlCard = null;
                    
                    this.audioCorreto.load();
                    this.audioCorreto.play();
                    return
                }
            }
        }
     }
     if(abertas >= 2){
         for(var i=0;i<this.arrayTabuleiro.length;i++){
             controlCard = this.arrayCartas[this.arrayTabuleiro[i]];
             if(controlCard.canClick){
                this.closeArray.push(controlCard);
             }
         }
     }
     abertas = null;
     controlCard = null;
}

MemoryGame.prototype.renderiza = function(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    var child ;
    for(var i=0;i<this.arrayTabuleiro.length;i++){
        child= this.arrayCartas[this.arrayTabuleiro[i]];
        if(!child.aberta){
            child = this.arrayCartas[16];
        }
        this.context.drawImage(this.refImage,child.rect.iniX,child.rect.iniY,child.rect.width,child.rect.height,120*(i%4)+12,145*(parseInt(i/4))+9,child.rect.width,child.rect.height);
    }
}
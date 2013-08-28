function CacaPalavras(canvasId) {
	this.canvas = document.getElementById(canvasId);
	this.context = this.canvas.getContext('2d');
    
	this.audioCorreto = document.getElementById('correto');
	
    this.numLinhasColunas = 11;
	this.imageLetras = new Image();
	this.imageLetras.src = 'assets/images/U1_L4_E3_2.png';
    
	var arrayLetras =  new Array();
    var matrizPalavras =  new Array();
	
	this.arrayObj = new Array();
	
	//testes
    matrizPalavras.push(
		513,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
		508,-1,613,608,613,604,-1,-1,-1,-1,-1,
		513,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
		504,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
		-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
		-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
		-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
		-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
		-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1
        
	);
	
	var rect;
	for (var i = 0; i < 23; i++ ) {
		rect = new Rect(50 * i ,0,45,45);
		arrayLetras.push(rect);
	}
	rect = null;
	
	var index;
    var rectLetra;
    var letra;
    
	for(var j = 0; j < matrizPalavras.length; j++){
		if(matrizPalavras[j] == -1){
			matrizPalavras[j] = parseInt(Math.random() * arrayLetras.length);
		}
		
		index = matrizPalavras[j];
		
		if(index >= 500 && index < 600){
			index -= 500;
		}else if(index >= 600 && index< 700){
			index -= 600;
		}
		
		rectLetra = new Rect(arrayLetras[index].iniX,arrayLetras[index].iniY,arrayLetras[index].width,arrayLetras[index].height);
	    rectLetra.x = 55 *(j%this.numLinhasColunas);
		rectLetra.y = 55 * (parseInt(j/this.numLinhasColunas));
        
       
        
        letra = new Letra(matrizPalavras[j],rectLetra);
		this.arrayObj.push(letra);
	}
    
	matrizPalavras = null;
    arrayLetras = null;
    index = null;
    rectLetra = null;
    letra=null;
    
	this.addListeners();
    
}

CacaPalavras.prototype.addListeners = function(){
	var _self = this;
	
	this.canvas.addEventListener( 'click',function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onClick(event);
    
    },false);	
}

CacaPalavras.prototype.onClick = function(){
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
    
    for(var i =0; i < this.arrayObj.length; i++){
	    child = this.arrayObj[i];
		
		if(offsetX > child.rect.x && offsetX < child.rect.x + child.rect.width){
            if(offsetY > child.rect.y && offsetY < child.rect.y + child.rect.height){
                if(child.canClick){
                    if(child.isActivated){
                        child.rect.iniY =0;
                        child.isActivated = false;
                    }else{
                        child.rect.iniY =47;
                        child.isActivated = true;
                        
                        if(this.verificaPalavra(i,true,2)){
                            this.audioCorreto.load();
                            this.audioCorreto.play();
                            this.setChecked(i);                         
                        }
                    }
                }
            }
        }
    }
    
    child = null;
    offsetX =null;
    offsetY = null;
}

CacaPalavras.prototype.verificaPalavra = function(childIndex,firstPass,nextIndex){
    var child = this.arrayObj[childIndex];
    console.log(child);
    var nextIndex = nextIndex;
    
    if(child.index >= 500 && child.index < 600){
        if(!child.isActivated){
            return false;
        }
        nextIndex = this.numLinhasColunas;
        if(firstPass){
            if(childIndex <= (this.arrayObj.length - nextIndex-1)){
                return this.verificaPalavra(childIndex+nextIndex,true,nextIndex);
            }else{
                return this.verificaPalavra(childIndex-nextIndex,false,nextIndex);
            }
        }else{
            if(childIndex >= this.numLinhasColunas){
                return this.verificaPalavra(childIndex-nextIndex,false,nextIndex);
            }else{
                return true 
            }
        }
        
    }else if(child.index >= 600 && child.index< 700){
        if(!child.isActivated){
            return false;
        }
        nextIndex = 1;
        if(firstPass){
            if(childIndex < this.arrayObj.length - 1){
                return this.verificaPalavra(childIndex+nextIndex,true,nextIndex);
            }else{
                return this.verificaPalavra(childIndex-nextIndex,false,nextIndex);
            }
        }else{
            if(childIndex > 0){
                return this.verificaPalavra(childIndex-nextIndex,false,nextIndex);
            }else{
               
                return true;
            }
        }
        
    }else{
        if(firstPass){
            return this.verificaPalavra(childIndex-nextIndex,false,nextIndex);
        }else{
            if(nextIndex == 2){
                return false;
            }else{
                return true;    
            }
            
        }
        
    }
}

CacaPalavras.prototype.setChecked =function(childIndex){
    if(this.arrayObj[childIndex].canClick == true){
        
        if(this.arrayObj[childIndex].index >= 500 && this.arrayObj[childIndex].index < 600){
            if(childIndex > this.numLinhasColunas){
                this.setChecked(childIndex - this.numLinhasColunas);
            }
            if(childIndex <= this.arrayObj.lenght - this.numLinhasColunas){
                this.setChecked(childIndex + this.numLinhasColunas);
            }
        }else if(this.arrayObj[childIndex].index >= 600 && this.arrayObj[childIndex].index< 700){
            if(childIndex >= 0){
                this.setChecked(childIndex - 1);
            }
            if(childIndex < this.arrayObj.lenght){
                this.setChecked(childIndex + 1);
            }
        }
        this.arrayObj[childIndex].canClick = false;
    }
}

CacaPalavras.prototype.renderiza = function() {
	var child;
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	for (var j = 0; j < this.arrayObj.length; j++) {
	
		child = this.arrayObj[j];
		this.context.drawImage(this.imageLetras,child.rect.iniX,child.rect.iniY,child.rect.width,child.rect.height,child.rect.x,child.rect.y,child.rect.width,child.rect.height);
	}
	child = null;
	
}
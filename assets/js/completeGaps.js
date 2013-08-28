function CompleteGaps(canvasId,refImgSrc,answerImgSrc,endPointArray,answerArray){
    
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.debug = true;
    
    this.anwserImage = new Image();
    this.anwserImage.src = answerImgSrc;
    
    this.refImage = new Image();
    this.refImage.src = refImgSrc;
    
    this.arrayAnswerTag =  answerArray;
    this.endPointArray = endPointArray;
    
    
    
    this.loadPoint();
    this.addEvents();
}
CompleteGaps.prototype.loadPoint = function(){
    
}
CompleteGaps.prototype.addEvents = function(){
	var _self = this;
	
	this.canvas.addEventListener('click',function(){
        event.stopPropagation();
        event.preventDefault();
        _self.onClick(event);
    
    },false);

}

CompleteGaps.prototype.onClick = function(){
    event.stopPropagation();
    event.preventDefault();
    var offsetX;
	var offsetY;
    var child;
    var quizPoint;
    if(this.touchEnabled){
        offsetX = event.targetTouches[0].pageX  -  this.canvas.offsetLeft - this.canvas.offsetParent.offsetLeft;
		offsetY = event.targetTouches[0].pageY  -  this.canvas.offsetTop - this.canvas.offsetParent.offsetTop ;		
    }else{
        offsetX = event.offsetX ;
        offsetY = event.offsetY ;
    }
    
    for(var i =0; i < this.arrayAnswerTag.length; i++){
	    child = this.arrayAnswerTag[i];
   		if(offsetX > child.rect.x && offsetX < child.rect.x + child.rect.width){
            if(offsetY > child.rect.y && offsetY < child.rect.y + child.rect.height){
                //verificando resposta certa
                if(child.rightAnswer){
                     
                    for(var j =0; j < this.endPointArray.length; j++){
                        if(this.endPointArray[j].quizNumber == child.quizNumber && !this.endPointArray[j].alreadyAwsered){
                           quizPoint = this.endPointArray[j];
                            child.rect.x = quizPoint.posX;
                            child.rect.y = quizPoint.posY;
                            quizPoint.alreadyAwsered = true;
                            console.log('acerto');
                        }
                    }
                   
                }else{
                    console.log('erro');
                }
            }
        }
    }
    
    child = null;
    offsetX =null;
    offsetY = null;
}

CompleteGaps.prototype.renderiza = function(){
    var child;
    
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.context.drawImage(this.refImage,0,0);
    
    for(var i=0;i<this.arrayAnswerTag.length; i++){
        child = this.arrayAnswerTag[i];
        this.context.drawImage(this.anwserImage,child.rect.iniX,child.rect.iniY,child.rect.width,child.rect.height,child.rect.x,child.rect.y,child.rect.width,child.rect.height);
    }
    child = null;
   
}

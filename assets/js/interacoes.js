var fps = 60; //framerate de 60 fps

//event 


var currentPage;
var lightBox;
var meuLiguePontos9;
var meuCreateWarlds9;
var meuCreateWarlds19;
var meuPaint7;
var meuJogoDaMemoria;

var myCompleteGaps;



function loadCanvas(arrayObjetos){
    var touchEnabled = 'ontouchstart' in document.documentElement;
    
	
   
	meuPaint7 = new DrawCanvas("cannvas7","",touchEnabled);
	meuLiguePontos9 = new LiguePontos("canvas9_1","assets/images/liguePontos9.png",arrayObjetos[0],touchEnabled);
	meuCreateWarlds9 = new CreateWord("canvas9_2","assets/images/drag_9.png","assets/images/numeros_9.png",arrayObjetos[1],arrayObjetos[2],touchEnabled);
	myCompleteGaps = new CompleteGaps("canvas16Gaps","assets/images/CompleteGaps_15.png","assets/images/U1_L4_E3_2.png",arrayObjetos[5],arrayObjetos[6]);
	meuJogoDaMemoria = new MemoryGame("canvas16Memoria","assets/images/U1_L4_E3_1-01.png");
	meuCreateWarlds19 = new CreateWord("canvas19","assets/images/drag_19.png","assets/images/drag_19_pecas.png",arrayObjetos[4],arrayObjetos[3],touchEnabled);
    addEvents();

    touchEnabled = null;
    arrayObjetos = null;
    
	var pages = document.getElementsByTagName('li');
	for(var j=0;j<pages.length;j++){
		if(pages[j].className == "cabecalho page"){
			var child = document.createElement('div');
			child.setAttribute('class','numero');
			child.appendChild(document.createTextNode(j+1));
			pages[j].appendChild(child);
		}
	}
    
}

function addEvents(){
	//função de update
	self.setInterval(update,fps/1000);
    
}

function separaItensImagem(){

	var arrayImagens9 = new Array();
	var arrayPecasDrag9 = new Array(); 
    var arrayPontosDrag9 = new Array();
	var arrayEndPoints = new Array();
    var arrayAnswerTag = new Array();
	var arrayPontos19 = new Array(); 
    var arrayPecas19 = new Array(); 
	
	var arrayObjetos = new Array();
    
    arrayObjetos.push(
                        arrayImagens9
                        ,arrayPecasDrag9
                        ,arrayPontosDrag9
                        ,arrayPontos19
                        ,arrayPecas19
                        ,arrayEndPoints
                        ,arrayAnswerTag
    ); 
    
    //exercicio pag 19
    peca = new Peca('tv',8,0,73,65);
    peca.rect.x= 50;
    peca.rect.y=630;
    arrayPecas19.push(peca);
    peca = new Peca('fogao',81,0,63,65);
    peca.rect.x= 140;
    peca.rect.y= 575;
    arrayPecas19.push(peca);
    peca = new Peca('banheira',143,0,124,60);
    peca.rect.x= 130;
    peca.rect.y=700;
    arrayPecas19.push(peca);
    peca = new Peca('geladeira',275,0,65,87);
    peca.rect.x=225;
    peca.rect.y=560;
    arrayPecas19.push(peca);
    peca = new Peca('porta',7,69,83,136);
    peca.rect.x=350;
    peca.rect.y=550;
    arrayPecas19.push(peca);
    peca = new Peca('sofa',90,65,190,107);
    peca.rect.x=250;
    peca.rect.y=720;
    arrayPecas19.push(peca);
    peca = new Peca('berco',285,97,90,114);
    peca.rect.x=470;
    peca.rect.y=600;
    arrayPecas19.push(peca);
    
    arrayPontos19.push(new Point(224,150));
    arrayPontos19.push(new Point(337,244));
    arrayPontos19.push(new Point(424,455));
    arrayPontos19.push(new Point(392,182));
    arrayPontos19.push(new Point(143,413));
    arrayPontos19.push(new Point(162,243));
    arrayPontos19.push(new Point(234,458));
    
    
    peca = null;
    //imagens Ligue os pontos pag 9
    var peca = new Rect(0,0,170,165);
    peca.x = 10;
    peca.y = 10;
    var peca_key = new Rect(0,180,105,60);
    peca_key.x = 10;
    peca_key.y = 205;
    
    var peca2 = new Rect(170,0,170,165);
    peca2.x = 180;
    peca2.y = 10;
    
    var peca2_key = new Rect(105,180,105,60);
    peca2_key.x = 190;
    peca2_key.y = 205;
    
    var peca3 = new Rect(340,0,170,165);
    peca3.x = 350;
    peca3.y = 10;
    
    var peca3_key = new Rect(210,180,105,60);
    peca3_key.x = 400;
    peca3_key.y = 205;
    
    arrayImagens9.push(peca);
    arrayImagens9.push(peca3_key);
    arrayImagens9.push(peca2);
    arrayImagens9.push(peca2_key);
    arrayImagens9.push(peca3);
    arrayImagens9.push(peca_key);
    
    
    //Imagens DragAndDrop pag 9
    for(var j =0;j<3;j++){
        var pecaDrag = new Peca("",70*j,0,70,66);
        pecaDrag.rect.x = 70 * j + 285;
        pecaDrag.rect.y = 350;
        arrayPecasDrag9.push(pecaDrag);
    }
    arrayPontosDrag9.push(new Point(455,304));
    arrayPontosDrag9.push(new Point(217,304));
    arrayPontosDrag9.push(new Point(690,304));
    
    
    //Completes Garps page 16
    var answerTag =  new AnswerTag(0,0,100,60,35,false);
    answerTag.rect.x = 50;
    answerTag.rect.y = 270;
    arrayAnswerTag.push(answerTag);
    
    answerTag =  new AnswerTag(0,0,140,60,30,true);
    answerTag.rect.x = 170;
    answerTag.rect.y = 270;
    arrayAnswerTag.push(answerTag);
    
    
    answerTag =  new AnswerTag(1,0,100,60,35,true);
    answerTag.rect.x = 450;
    answerTag.rect.y = 270;
    arrayAnswerTag.push(answerTag);
    
    answerTag =  new AnswerTag(1,0,140,60,30,false);
    answerTag.rect.x = 562;
    answerTag.rect.y = 270;
    arrayAnswerTag.push(answerTag);
    
    
    answerTag =  new AnswerTag(2,0,100,60,35,true);
    answerTag.rect.x = 50;
    answerTag.rect.y = 600;
    arrayAnswerTag.push(answerTag);
    
    answerTag =  new AnswerTag(2,0,140,60,30,false);
    answerTag.rect.x = 170;
    answerTag.rect.y = 600;
    arrayAnswerTag.push(answerTag);
    
    
    answerTag =  new AnswerTag(3,0,100,60,35,false);
    answerTag.rect.x = 450;
    answerTag.rect.y = 600;
    arrayAnswerTag.push(answerTag);
    
    answerTag =  new AnswerTag(3,0,140,60,30,true);
    answerTag.rect.x = 562;
    answerTag.rect.y = 600;
    arrayAnswerTag.push(answerTag);
    
    
    
    var endPoint = new EndPoint(80,220,0); 
    arrayEndPoints.push(endPoint);
    
    endPoint = new EndPoint(440,220,1); 
    arrayEndPoints.push(endPoint);
    
    endPoint = new EndPoint(80,555,2);
    arrayEndPoints.push(endPoint);
    
    endPoint = new EndPoint(460,560,3); 
    arrayEndPoints.push(endPoint);
	endPoint= null;
    answerTag = null;
    
    loadCanvas(arrayObjetos);
    
	
    arrayObjetos = null;
    arrayImagens9 = null;
    arrayPecasDrag9  = null;
    arrayPontosDrag9  = null;
    arrayPontos19 = null;
    arrayPecas19 = null;
	arrayAnswerTag = null;
	arrayEndPoints = null;
}


function update(){
	atualiza();
	renderiza();
}

function atualiza(){
	currentPage = (document.body.scrollTop >> 10) + 1;
}

function renderiza(){
	if(currentPage >=3&& currentPage<=5){
		meuLiguePontos9.renderiza();
		meuCreateWarlds9.renderiza();
	}
	if(currentPage >=4 && currentPage<=6){
		myCompleteGaps.renderiza();
	}
	if(currentPage >4 && currentPage<7){
		meuCreateWarlds19.renderiza();
	} 
	if(currentPage >5){	
		meuJogoDaMemoria.renderiza();
		
	}
}

function playSound(id){
   var sound =  document.getElementById(id);
   sound.load();
   sound.play(); 
}

function createVideo(src){
    
     lightBox = document.getElementById('lightBox');
    event.stopPropagation();
    event.preventDefault();
    
    var img;
    var video;
    var listener;
    var listenerBG;
    
    lightBox.style.display = 'block';
    
    lightBox.addEventListener('touchstart',listernerBG = function(){
        event.stopPropagation();
        event.preventDefault();
        
        
        lightBox.removeEventListener('touchstart',listernerBG,false);        
    },true)
    
    video = document.createElement('video');
    video.src = src;
    video.id ='currentVideo';
    video.controls = true;
    
    
    img = document.createElement('img');
    img.src = 'assets/images/close.png';
    img.id='closeBnt';
    
    
    document.body.appendChild(video);
    document.body.appendChild(img);
    
    img.addEventListener('click',listener = function(){
        event.stopPropagation();
        event.preventDefault();

        document.body.removeChild(video);
        document.body.removeChild(img);
        
        img.removeEventListener('click',listener,false);
     
        video =  null;
        img = null;
        listener =  null;
        listernerBG = null;
        
        lightBox.style.display = 'none';
          
    },false);
}
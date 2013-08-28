function Carta(index,iniX,iniY,width,height){
    this.rect = new Rect(iniX,iniY,width,height);
    this.index = index;
    this.aberta=false;
    this.canClick = true;
}
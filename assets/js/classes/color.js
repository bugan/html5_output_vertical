function Color(color,iniPoint,iniX,iniY,width,height){
    this.rect = new Rect(iniX,iniY,width,height);
    this.color = color;
    this.rect.x = iniPoint.x;
    this.rect.y = iniPoint.y;
}
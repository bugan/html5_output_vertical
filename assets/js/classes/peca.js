function Peca(name,iniX,iniY,width,height) {

	this.rect = new Rect(iniX,iniY,width,height);
	this.name = name;
    this.isActivated = true;
}
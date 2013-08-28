function AnswerTag(quizNumber,iniX,iniY,width,height,rightAnswer){
    this.quizNumber = quizNumber;
    this.rect = new Rect(iniX,iniY,width,height);
    this.rightAnswer = rightAnswer;
}
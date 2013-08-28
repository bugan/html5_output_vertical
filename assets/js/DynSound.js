function DynSound(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    this.audioContext = new window.AudioContext();
    
    this.audioUm = this.loadSound('assets/audio/errado.mp3');
    this.audioDois = this.loadSound('assets/audio/correto.mp3');
}

DynSound.prototype.loadSound = function(url) {
    var _self = this;
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
    
  // Decode asynchronously
  request.onload = function() {
    _self.audioContext.decodeAudioData(request.response, function(buffer) {
        console.log('finished');
      _self.audioDois =  buffer;
      _self.play();
    }, this.onError);
  }
  request.send();
}
DynSound.prototype.play = function(){
  var source = this.audioContext.createBufferSource();  // creates a sound source
  source.buffer = this.audioDois;                       // tell the source which sound to play
  source.connect(this.audioContext.destination);        // connect the source to the context's destination (the speakers)
  source.start(0);
  
  source = null;
}

DynSound.prototype.onError = function(event){
   console.log(event)
}



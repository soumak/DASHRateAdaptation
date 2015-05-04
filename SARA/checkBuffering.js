var lastPlayPos    = 0;
var currentPlayPos = 0;
var bufferingDetected = false;
  var bufferingNo = 0;
	//function to check if the client is in buffering state
	function checkBuffering() {
    currentPlayPos = videoElement.currentTime;

    // if no buffering is currently detected,
    // and the position does not seem to increase
    // and the player isn't manually paused...
    if (
            !bufferingDetected 
            && (currentPlayPos ==lastPlayPos)
            && (!videoElement.paused)
        ) {
        bufferStartTime = new Date().getTime();
        console.log("buffering");
        bufferingDetected = true;
        bufferingNo+=1;
        if(prevResponseDone)
        {
          forceFetch=true;  //force fetch the next video chunk if it is buffering and no get request pending
          console.log("Video is force fetched");
        }
    }
    lastPlayPos = currentPlayPos
}
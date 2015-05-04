    // Create mediaSource and initialize video 
    function setupVideo() {
      clearLog(); // Clear console log
      //  Create the media source 
      if (window.MediaSource) {
        mediaSource = new window.MediaSource();
       } else {
        log("mediasource or syntax not supported");
        return;
      }
      var url = URL.createObjectURL(mediaSource);
      videoElement.pause();
      videoElement.src = url;
      videoElement.width = width;
      videoElement.height = height;

      // Wait for event that tells us that our media source object is 
      //   ready for a buffer to be added.

      //canplay   
    videoElement.addEventListener("canplay", function () {
        console.log("canplay");

      }, false);


      mediaSource.addEventListener('sourceopen', function (e) {
        try {
          videoSource = mediaSource.addSourceBuffer('video/mp4');
          initVideo(init_url);           
        } catch (e) {
          log('Exception calling addSourceBuffer for video', e);
          return;
        }
      },false);
		
      // Handler to switch button text to Play
      videoElement.addEventListener("pause", function () {
        playButton.innerText = "Play";
      }, false);
	
      // Handler to switch button text to pause
      videoElement.addEventListener("playing", function () {
        playButton.innerText = "Pause";
      }, false);
	  
	  //handler for buffer waiting event
	  videoElement.addEventListener("waiting", function () {
		  console.log("Player waited for content");
		}, false);
		//handler for rate change
		videoElement.addEventListener("ratechange", function () {
			  console.log("RATE CHANGE");
			}, false);
			//handler for video ended
      videoElement.addEventListener("ended", function () {
        videoElement.removeEventListener("timeupdate", checkTime);
      }, false);
    }
	
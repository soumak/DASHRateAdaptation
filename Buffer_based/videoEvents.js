
    // Click event handler for load button    
    playButton.addEventListener("click", function () {
      if (!videoStarted) 
        {
          videoStartClicked = new Date().getTime();
        }
      play_button_click_no +=1;
      //  If video is paused then check for file change
      if (videoElement.paused == true) {
	 
        // Retrieve mpd file, and set up video
        var curMpd = document.getElementById("filename").value;
        //  If current mpd file is different then last mpd file, load it.
        if (curMpd != lastMpd) {
          //  Cancel display of current video position
          window.cancelAnimationFrame(requestId);
          lastMpd = curMpd;
		 
          getData(curMpd);

        } else {
          //  No change, just play
          videoElement.play();
        }
      } else {
        //  Video was playing, now pause it
		 console.log("pause");
        videoElement.pause();
      }
    }, false);

    // Do a little trickery, start video when you click the video element
    videoElement.addEventListener("click", function () {
      playButton.click();
    }, false);

    // Event handler for the video element errors
    document.getElementById("myVideo").addEventListener("error", function (e) {
      log("video error: " + e.message);
    }, false);
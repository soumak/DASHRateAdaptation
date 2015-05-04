    /*  Load the bit-rates initialization segment */
    function initVideo(url) {

      var xhr = new XMLHttpRequest();

      if (url) { // make sure we've got incoming params

        xhr.open('GET', url);		

		start_time = new Date().getTime();

        xhr.send();
        xhr.responseType = 'arraybuffer';
        try {
          xhr.addEventListener("readystatechange", function () {
             if (xhr.readyState == xhr.DONE) { // wait for video to load

			 request_time = new Date().getTime() - start_time; //time(ms) to fetch the chunk

              // Add response to buffer
              try {

                var arr = new Uint8Array(xhr.response);
                videoSource.appendBuffer(arr);
				      console.log("Init mp4 added:"+url);

                // Wait for the update complete event before continuing
                videoSource.addEventListener("update",updateFunct, false);

              } catch (e) {
				alert(e);
                log('Exception while appending initialization content', e);
              }
            }
          }, false);
        } catch (e) {
		alert(e);
          log(e);
        }
      } else {
        return // No value for range or url
      }
    }

    function updateFunct() {
      //  This is a one shot function, when init segment finishes loading, 
      //    update the buffer flag, call getStarted, and then remove this event.
      bufferUpdated = true;
      getStarted(segment_url); // Get video playback started
      //  Now that video has started, remove the event listener
      videoSource.removeEventListener("update", updateFunct);
    }

    //  Play the video segments
    function getStarted(url) {
      playSegment(index, url);

      // Start showing video time
      requestId = window.requestAnimationFrame(render);

      index++;
    }

//  fetch the next segment that will be appended to the buffer so as to play it    
function playSegment(index, url) {
  var xhr = new XMLHttpRequest();
      if (url) { // Make sure we've got incoming params
       var full_url = url;
     console.log(full_url);
     actualPlayFragLevels.push(bitrates[l_cur]);
     xhr.open('GET', full_url);
     start_time = new Date().getTime();
     

     xhr.send();
     console.log("Request Sent");
     xhr.responseType = 'arraybuffer';
     try {
      xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == xhr.DONE) { //wait for video to load

              done_time=new Date().getTime();
              request_time = done_time - start_time;
              fetched_chunk_info[done_time]=[bitrates[l_cur],request_time];

              diplayNextParameters();
              try {
                var arr = new Uint8Array(xhr.response);
                videoSource.appendBuffer(arr);
                console.log("Index appended: "+index);

        //actualPlayFragLevels.append(l_cur);
        chunk_len = arr.length;
        chunk_time = (chunk_len*8) / bandwidth ;
        
        console.log("chunk_len: "+chunk_len);
        

        if(index == totalFragNo) 
        {
          videoEnded=true;
          console.log("Printing stats.....................");
          printStats();
        }
        

				 totalVideoPlaybackReceived += chunkPlaybackSize;  //chunkPlaybackSize secs of video is added to buffer
        console.log("totalVideoPlaybackReceived: "+totalVideoPlaybackReceived);

        if(bufferingDetected)
        {
          bufferEndTime = done_time;
          rebufferingEvent.push([bufferStartTime,bufferEndTime,(bufferEndTime - bufferStartTime)]);
          console.log("not buffering anymore");
          bufferingDetected = false;
        }
        

        if(aggressiveFetch && !videoStarted)
        {
          console.log("Video not started yet");
          forceFetch = true;
          
        }
        
      } catch (e) {
        
        log('Exception while appending 2', e);
      }
      prevResponseDone = true;
      console.log("prevResponseDone");
    }
  }, false);
} catch (e) {
  log(e);
}
}
}

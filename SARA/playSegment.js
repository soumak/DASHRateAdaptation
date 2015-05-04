//  fetch the next segment that will be appended to the buffer so as to play it    
function playSegment(index, url) {
  var xhr = new XMLHttpRequest();
      if (url) { // Make sure we've got incoming params
       var full_url = url;
     console.log(full_url);
     actualPlayFragLevels.push(bitrates[l_cur]);
     xhr.open('GET', full_url);
     
		start_time = new Date().getTime();  //time when get request is sent
    

    xhr.send();
    console.log("Request Sent");
    xhr.responseType = 'arraybuffer';
    try {
      xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == xhr.DONE) { //wait for video to load

          done_time=new Date().getTime(); //time when get response is received
          bufferEndTime = done_time;      //if buffering detected then the buffer end time is stored for rebuffering event
				request_time = done_time - start_time;  //time(ms) to fetch the fragment
        fetched_chunk_info[done_time]=[bitrates[l_cur],request_time]; //info about the fetched chunk
        console.log("Index fetched:"+index);
        frag_size_time[parseInt(index)-1] = [bitrate_chunksize[l_cur],request_time];

        diplayNextParameters(); //display the fethed chunk parameters

        try {
          var arr = new Uint8Array(xhr.response);
          videoSource.appendBuffer(arr);
          console.log("Index appended: "+index);

          
          chunk_len = arr.length;
          chunk_time = (chunk_len*8) / bandwidth ;
          //console.log("Before nbr");
          console.log("chunk_len: "+chunk_len);
          
          if(index == totalFragNo) 
          {
            videoEnded=true;
            console.log("Printing stats.....................");
            printStats();
          }

        totalVideoPlaybackReceived += chunkPlaybackSize;  //chunkPlaybackSize secs of video is added to buffer
       
         
         l_nxt = next_bit_rate();    //predict next bit rate
         console.log("l_nxt:"+l_nxt);
         
         

				
        console.log("totalVideoPlaybackReceived: "+totalVideoPlaybackReceived);

        if(bufferingDetected)
        {
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

//  fetch the next segment that will be appended to the buffer so as to play it    
function playSegment(index, url) {
  var xhr = new XMLHttpRequest();
      if (url) { // Make sure we've got incoming params
       var full_url = url;
     console.log(full_url);
     actualPlayFragLevels.push(bitrates[l_cur]);

     xhr.open('GET', full_url);
     
     start_time = new Date().getTime();
     


     if(bDelay> delta_b)   //for buffer based algo parameters
     {
      console.log("bMinIncreasing is changed to false ");
      bMinIncreasing = false;
    }

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
                chunk_len = arr.length;
                chunk_time = (chunk_len*8) / bandwidth ;
                
                console.log("chunk_len: "+chunk_len);

                if(index == totalFragNo) 
                {
                  videoEnded=true;
                  console.log("Printing stats.....................");
                  printStats();
                }
                
                
				if(!thetaIsSet)   //called for initial fragment only
       {
         theta = ((arr.length*8)/request_time)*1000;
         thetaIsSet = true;
         console.log("Theta Set: "+theta);
       }
       

				 totalVideoPlaybackReceived += chunkPlaybackSize;  //chunkPlaybackSize secs of video is added to buffer
        console.log("totalVideoPlaybackReceived: "+totalVideoPlaybackReceived);

          b_t = totalVideoPlaybackReceived - videoElement.currentTime; //buffer level at time t
          console.log("Buffer left:"+b_t);
         rho_t = (bitrates[l_cur]*T/request_time)*1000; //in secs
         numerator_rho=0;
         denominator_rho=0;
         var interval = 0;
         T=chunkPlaybackSize;
         delta_t=T*1000;
         for(var key in fetched_chunk_info)
         {
          
          if ((done_time - key) <= (delta_t))
          {
            if(((done_time - key)+fetched_chunk_info[key][1]) > delta_t)
              interval = delta_t - (done_time - key);
            else
              interval = fetched_chunk_info[key][1];

            numerator_rho += (((parseFloat(fetched_chunk_info[key][0])*T*1000)/fetched_chunk_info[key][1]) * interval);
            denominator_rho+=interval;
          }
        }
        if(denominator_rho==0)
        {
          rho =0;
        }
        else
        {
          rho = (parseFloat(numerator_rho))/denominator_rho;
        }        
        console.log("rho: "+rho);
         l_nxt= parseInt(next_bit_rate());   //predict next bit rate
         console.log("l_nxt: "+l_nxt);




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

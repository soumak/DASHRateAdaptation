//  Get video segments 
function polling() {
 if(videoEnded) 	//check if video has ended, then stop the polling
 {
 	clearInterval(setIntervalId);
 }
 if(!videoStarted && !videoElement.paused)
 {
 	videoStarted=true;
  startupDelay = new Date().getTime() - videoStartClicked;	//get the startupDelay QoE
}
checkBuffering();	   
if (prevResponseDone && bufferUpdated == true) {
	if (index <= totalFragNo) {	          
		if ((videoElement.currentTime - lastTime) >= bDelay || forceFetch) {  //wait till bDelay to fetch next chunk
			console.log("b_t:"+b_t);
			timeWeightedBuffer+=(b_t*0.25);
   if (index%5==0)	//print stats after every 5 fragments, it can be changed according to requirements
   {
   	console.log("Printing stats.....................");
   	printStats();
   }
   console.log("l_nxt: "+l_nxt);
   prevResponseDone = false;
   forceFetch=false; 
   lastTime = videoElement.currentTime;
   console.log("Will now fetch next segment at Playback Time: "+ videoElement.currentTime);
   console.log("Index called:"+index);      
   if (l_cur!=l_nxt)
   {
   	switchEvents.push(bitrates[l_nxt]);
   	l_cur = l_nxt;
   	if (ini_chunks[l_nxt] == "False") {
   		videoSource.removeEventListener("timeupdate", updateFunct);
   		ini_chunks[l_nxt]="True";
   		console.log("Inside");
   		init_url = raw_init_url.replace("$Bandwidth$",bitrates[l_nxt]);
   		segment_url = (raw_segment_url.replace("$Bandwidth$",bitrates[l_cur])).replace("$Number$",index);
   		initVideo(init_url); 
   	}
   	else
   	{
   		segment_url = (raw_segment_url.replace("$Bandwidth$",bitrates[l_cur])).replace("$Number$",index);
   		playSegment(index, segment_url);   
   		index++;
   	}
   }
   else
   {
   	segment_url = (raw_segment_url.replace("$Bandwidth$",bitrates[l_cur])).replace("$Number$",index);
   	playSegment(index, segment_url);		   
   	index++;
   }
}
} else {
	videoElement.removeEventListener("timeupdate", polling, false);
}
}
}
setIntervalId = setInterval(polling, 250);
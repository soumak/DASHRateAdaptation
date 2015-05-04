
    // Gets the mpd file and parses it    
    function getData(url) {
      if (url !== "") {
        var xhr = new XMLHttpRequest(); // Set up xhr request
        xhr.open("GET", url, true); // Open the request          
        xhr.responseType = "text"; // Set the type of response expected
		
		start_time = new Date().getTime();    //start_time for the request
        xhr.send();     //send the request
		
        //  Asynchronously wait for the data to return
        xhr.onreadystatechange = function () {
          if (xhr.readyState == xhr.DONE) {
		  
		  request_time = new Date().getTime() - start_time;   //time(ms) required for the request to complete
			
			
		  
		  
		  
            var tempoutput = xhr.response;
            var parser = new DOMParser(); //  Create a parser object 

            // Create an xml document from the .mpd file for searching
            var xmlData = parser.parseFromString(tempoutput, "text/xml", 0);
			
            getFileType(xmlData);

            // Set up video object, buffers, etc  
            setupVideo();

            // Initialize a few variables on reload
            clearVars();
          }
        }

        // Report errors if they happen during xhr
        xhr.addEventListener("error", function (e) {
          log("Error: " + e + " Could not load url.");
        }, false);
      }
    }

    // Retrieve parameters from our stored .mpd file
    function getFileType(data) {
      try {
	 
		representations = data.querySelectorAll("Representation");
		 var  rep_len = representations.length;
		 for (var i =0; i<rep_len;i++)
		 {
			bitrates.push(representations[i].getAttribute("bandwidth"));
			ini_chunks.push("False");    //ini_chunks is used to store if that bit-rate's initial fragment has been fetched 
		 }
			
			
		l_max = parseInt(bitrates.length - 1);    //max level of bitrate
		
		l_cur = parseInt(l_min);                //cur level of bitrate
    console.log("l_cur:" + l_cur);

    /*store the bitrates of the max and min levels*/
    r_min = parseInt(bitrates[0]);
    r_max = parseInt(bitrates[l_max]);

    /*get the init_url and bandwidth specific urls of the segments*/
	raw_init_url = data.querySelectorAll("SegmentTemplate")[0].getAttribute("initialization").toString();   
    init_url = raw_init_url.replace("$Bandwidth$",bitrates[l_cur]);
    raw_segment_url = data.querySelectorAll("SegmentTemplate")[0].getAttribute("media").toString();
    segment_url = (raw_segment_url.replace("$Bandwidth$",bitrates[l_cur])).replace("$Number$",index);

    /*extract the total time of the video and show it in the player*/
    raw_time = data.querySelectorAll("Period")[0].getAttribute("duration").toString();    
    hour = (raw_time.split("H")[0]).split("T")[1];
    minute = (raw_time.split("M")[0]).split("H")[1];
    second = (raw_time.split("S")[0]).split("M")[1];
    videoHour.textContent = hour;
    videoMin.textContent = minute;
    videoSec.textContent = second;

    document.getElementById("videoStats").style.display = "block"; //display the parameters

    /* get the total video time, total chunk number, chunk size(in secs) */
    totalVideoTime = parseInt(hour)*3600 + parseInt(minute)*60 + parseFloat(second);
    chunkPlaybackSize = parseInt(data.querySelectorAll("SegmentTemplate")[0].getAttribute("duration").toString())/parseInt(data.querySelectorAll("SegmentTemplate")[0].getAttribute("timescale").toString());
    totalFragNo = Math.ceil(parseFloat(totalVideoTime)/parseFloat(chunkPlaybackSize));
    numIndexes.textContent = totalFragNo;
    curIndex.textContent = 1;
    segLength.textContent = chunkPlaybackSize;
    
     /* display the information about the chunks */
        type = representations[l_cur].getAttribute("mimeType");
        codecs = representations[l_cur].getAttribute("codecs");
        width = representations[l_cur].getAttribute("width");
        height = representations[l_cur].getAttribute("height");
        bandwidth = representations[l_cur].getAttribute("bandwidth");
		ini_chunks[l_cur] = "True";

      } catch (er) {
	  alert(er);
        log(er);
        return;
      }
      showTypes();  // Display parameters 
    }

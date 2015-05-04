 /* Display parameters from the .mpd file and also the video playback time */
    function showTypes() {
      var display = document.getElementById("myspan");
      var spanData;
      spanData = "<h3>Last Fetched Fragment Stats:</h3><ul><li>Frag Number: " + lastFetchedFragNo + "</li>";
      spanData += "<li>Width: " + width + " -- Height: " + height + "</li>";
      spanData+="<li>Level: <span>"+lastFetchedLevel+"</span> Bitrate: <span>"+bandwidth+"</span></li>";
      spanData += "</ul>";
      display.innerHTML = spanData;
      document.getElementById("curInfo").style.display = "block";
    }


    function render() {
      vTime.innerText = formatTime(videoElement.currentTime); 
      requestId = window.requestAnimationFrame(render);
    }

    //  Logs messages to the console
    function log(s) {
      console.log(s);
    };

    //  Clears the log
    function clearLog() {
      console.clear();
    }

    function clearVars() {
      index = 1;
      lastTime = 0;
    }

    function timeToDownload(range) {
      var vidDur = range.split("-");
      return (((vidDur[1] - vidDur[0]) * 8) / bandwidth)
    }

    // Converts mpd time to human time
    function parseDuration(pt) {
      // Parse time from format "PT#H#M##.##S"
      var ptTemp = pt.split("T")[1];
      ptTemp = ptTemp.split("H")
      var hours = ptTemp[0];
      var minutes = ptTemp[1].split("M")[0];
      var seconds = ptTemp[1].split("M")[1].split("S")[0];
      var hundredths = seconds.split(".");
      //  Display the length of video (taken from .mpd file, since video duration is infinate)
      return "Video length: " + hours + ":" + pZ(minutes, 2) + ":" + pZ(hundredths[0], 2) + "." + hundredths[1];

    }


    //  Converts time in seconds into a string HH:MM:SS.ss
    function formatTime(timeSec) {
      var seconds = timeSec % 60;                                 // Get seconds portion                   
      var minutes = ((timeSec - seconds) / 60) % 60;              // Get minutes portion
      var hours = ((timeSec - seconds - (minutes * 60))) / 3600;  // Get hours portion
      seconds = seconds.toFixed(2);   // Restrict to 2 places (hundredths of seconds)
      var dispSeconds = seconds.toString().split(".");
      return (pZ(hours, 2) + ":" + pZ(minutes, 2) + ":" + pZ(dispSeconds[0], 2) + "." + pZ(dispSeconds[1], 2));
    }

    //  Pad digits with zeros if needed 
    function pZ(value, padCount) {
      var tNum = value + '';
      while (tNum.length < padCount) {
        tNum = "0" + tNum;
      }
      return tNum;
    }
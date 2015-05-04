/* function to display the parameters of the chunk currently playing */
function displayCurrentParameters()
{
	
	var timeInt = parseInt(videoElement.currentTime);
	var totalLevels = bitrates.length;
	if(timeInt%chunkPlaybackSize == 0)
	{
		
		var indexNow = timeInt/chunkPlaybackSize + 1;
		curIndex.textContent = indexNow;
		curBitrate.textContent = actualPlayFragLevels[indexNow-1];

		for (var key in bitrates)
		{
			if(bitrates[key]==actualPlayFragLevels[indexNow-1])
			{
				curLevel.textContent = (parseInt(key)+1)+" of "+totalLevels+",";
				break;
			}
		}
	}
	

}

setInterval(displayCurrentParameters, 50);	//poll the function at every 50 ms interval
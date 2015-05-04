/* function to display the parameters of the chunk currently fetched */
function diplayNextParameters()
{					

	var totalLevels = bitrates.length;
	type = representations[l_cur].getAttribute("mimeType");
	codecs = representations[l_cur].getAttribute("codecs");
	width = representations[l_cur].getAttribute("width");
	height = representations[l_cur].getAttribute("height");
	bandwidth = representations[l_cur].getAttribute("bandwidth");
	lastFetchedLevel = (parseInt(l_cur)+1)+" of "+totalLevels+",";
	lastFetchedFragNo +=1;

	showTypes();  // Display parameters 
}


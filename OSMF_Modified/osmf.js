function osmf (bitrate_last_frag,l_cur,l_min,l_max,theta, bitrates)
{
	console.log("inside osmf");
	var l_nxt = l_cur;
	r_download = bitrate_last_frag/theta;
	//console.log("r: "+r_download);
	//console.log("bitrate_last_frag: "+ bitrate_last_frag);
	if (r_download < 1)
	{
		if (l_cur> l_min)
		{
			if (r_download < bitrates[l_cur - 1]/bitrates[l_cur]) 
				l_nxt = l_min;
			else
				l_nxt = l_cur - 1;
		}
	}
	else
	{
		if (l_cur < l_max)
		{
			if (r_download >= bitrates[l_cur + 1]/bitrates[l_cur]) 
			{

				while((l_nxt < l_max) || (r_download < bitrates[l_nxt + 1]/bitrates[l_cur]))
					l_nxt++;
					
			}
			
		}
	
	}
	//console.log("OSMF: "+l_nxt);
	return l_nxt;

}
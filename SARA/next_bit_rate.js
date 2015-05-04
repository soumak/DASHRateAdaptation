/*func to choose the next bit-tate based on SARA algo*/
function next_bit_rate()
{
	T=chunkPlaybackSize;
	var I = 2*T;
	var B_alpha = 5*T;
	var B_beta = 10*T;
	var B_max = 12*T;
	var bit_arr=[];
	console.log("Inside Next_bit_rate:"+index);
	for(var i=0;i<=parseInt(l_max);i++)
	{
		
		bit_arr.push(bitrate_chunksize[i][parseInt(index)-1]);
		
	}


	b_t = totalVideoPlaybackReceived - videoElement.currentTime;
	console.log("B_t sent to algo:"+b_t);
			
	var h_n;
	var total_frag_size = 0;
	var denominator =0;
	for(var i=0;i<frag_size_time.length;i++)
	{
		total_frag_size += parseInt(frag_size_time[i][0]);
		denominator += parseInt(frag_size_time[i][1]);
	}
	denominator = parseFloat(denominator)/1000;
	h_n = parseFloat(total_frag_size)/denominator;
	console.log("h_n: "+h_n);
	var result = SARA(bitrates, I, B_alpha, B_beta, B_max, b_t, bit_arr, h_n, l_cur);
     console.log("r_t1: "+result.r_tplus1);
    bDelay = result.bDelay;
    console.log("bDelay: "+result.bDelay);
      for (var key in bitrates)
      {
        if(bitrates[key] == result.r_tplus1)
          return key;
      }

}
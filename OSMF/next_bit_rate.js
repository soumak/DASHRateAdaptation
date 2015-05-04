function next_bit_rate()
{
			est_bandwidth = (chunk_len*8)/request_time;						//bit-rate of last fethced fragment in bits per ms
			theta = (alpha * theta) + ((1-alpha)*request_time) ;			//theta stores the EWMA bit rate in bits per ms			
			console.log("Theta: "+theta);			
			return osmf (request_time,l_cur,l_min,l_max,theta, bitrates);
}
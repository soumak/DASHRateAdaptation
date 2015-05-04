function next_bit_rate()
{
			est_bandwidth = (chunk_len*8)/request_time;
			console.log("est_bandwidth: "+est_bandwidth);
			theta = (alpha * theta) + ((1-alpha)*est_bandwidth) ;			//bit rate in bits per ms
			//alert(theta);
			
			//console.log(chunk_time);
			console.log("Theta: "+theta);
			//console.log("Chunk_size: " +chunk_len);
			//console.log("Req_time: "+request_time);
			//l_nxt = osmf (request_time,l_cur,l_min,l_max,theta, bitrates); //osmf for time based only
			
			return osmf (est_bandwidth,l_cur,l_min,l_max,theta, bitrates);

}
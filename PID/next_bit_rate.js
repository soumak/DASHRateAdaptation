function next_bit_rate()
{
			 console.log("Inside 5_1");
        u_t = k_p*(b_t - b_opt) + k_i*timeWeightedBuffer;

        est_bandwidth = ((chunk_len*8)/request_time)*1000;
        theta = (alpha * theta) + ((1-alpha)*est_bandwidth) ;     //bit rate in bits per ms

        console.log("est_bandwidth:"+est_bandwidth);
        console.log("theta: "+theta);
        console.log("u_t now: "+u_t);
       
        var r_t1 = SmoothVideoAdaptation1(u_t, theta, bitrates);
        console.log("r_t1: "+r_t1);
        for (var key in bitrates)
        {
          if(bitrates[key] == r_t1)
            return key;
        }
}
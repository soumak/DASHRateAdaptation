function next_bit_rate()
{
	   console.log("Inside 5_2");
        var v_k_minus_one = bitrates[l_cur];
        est_bandwidth = ((chunk_len*8)/request_time)*1000;
        theta = (alpha * theta) + ((1-alpha)*est_bandwidth) ;     //bit rate in bits per ms

        console.log("est_bandwidth:"+est_bandwidth);
        console.log("theta: "+theta);
        console.log("prev_b_t: "+prev_b_t +" b_t: "+b_t+" v_k_minus_one:"+ v_k_minus_one);
        var result = SmoothVideoAdaptation2(theta, b_t, b_opt, v_k_minus_one, counter, bitrates, prev_b_t, k_p, 10);  //last arg is chunk size
        prev_b_t = b_t;
        console.log("r_t1: "+result.v_k);
        counter = result.counter;
        console.log("counter: "+counter);

        for (var key in bitrates)
        {
          if(bitrates[key] == result.v_k)
            return key;
        }
}
function next_bit_rate()
{
      r_t = bitrates[l_cur];
      
      if (l_cur<l_max)
        r_t_next = parseInt(bitrates[l_cur+1]);
      else
       r_t_next = parseInt(bitrates[l_cur]);
      if (l_cur>l_min)
        r_t_prev = parseInt(bitrates[l_cur-1]);
      else
        r_t_prev = parseInt(bitrates[l_cur]);
      console.log("l_cur: "+l_cur);
      console.log("r_t_next: "+r_t_next);
      console.log("r_t_prev: "+r_t_prev);
      console.log("Buffer value passed: "+b_t);
      result_algo2 = AdaptationAlgo2 (RunningfastStart, r_t, r_max, r_min, r_t_next, r_t_prev, bMinIncreasing, b_t, b_min, b_low, b_high, b_opt, a1, a2, a3, a4, a5, T, rho, rho_t);

       console.log("RunningfastStart: "+result_algo2.RunningfastStart);
      console.log("next_chunk_scheduler: "+result_algo2.bDelay);
      console.log("Next bit rate: "+result_algo2.r_tplus1);

      RunningfastStart = result_algo2.RunningfastStart;
      next_chunk_scheduler = result_algo2.bDelay;
      bDelay = result_algo2.bDelay;

      for (var key in bitrates)
      {
        if(bitrates[key] == result_algo2.r_tplus1)
          return key;
      }
}
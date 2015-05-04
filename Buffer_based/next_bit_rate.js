/* it follows the algo given in the paper */
function next_bit_rate()
{
			r_t = bitrates[l_cur];
      console.log("r_t: "+r_t);
      f_b_t = rateMap(b_t,b_min,b_high,r_max, r_min);
      console.log("f_b_t: "+f_b_t);


      if (l_cur<l_max)
        r_t_next = parseInt(bitrates[l_cur+1]);
      else
       r_t_next = parseInt(bitrates[l_cur]);
      if (l_cur>l_min)
        r_t_prev = parseInt(bitrates[l_cur-1]);
      else
        r_t_prev = parseInt(bitrates[l_cur]);

      if(f_b_t == bitrates[l_min])
      {
        r_f_prev = bitrates[l_min];
        r_f_next = bitrates[parseInt(l_min)+1];   //assuming atleast 2 levels
      }
      else if (f_b_t == bitrates[l_max])
      {
        r_f_prev = bitrates[l_max-1];
        r_f_next = bitrates[l_max];
      }
      else
      {
        for (var key in bitrates)
        {
          if(bitrates[key] > f_b_t)
              {
                r_f_prev = bitrates[key-1];
                r_f_next = bitrates[key];
                break;
              }
        }
      }
       console.log("r_f_prev: "+r_f_prev);
       console.log("r_f_next: "+r_f_next);
       var r_t1 = AdaptationAlgo4(r_t, r_max, r_min, r_t_next, r_t_prev, f_b_t, r_f_prev, r_f_next);
       console.log("r_t1: "+r_t1);
      for (var key in bitrates)
      {
        if(bitrates[key] == r_t1)
          return key;
      }
}
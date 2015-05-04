/* the algo follows the same notations as given in the KM paper */
function AdaptationAlgo2 (RunningfastStart, r_t, r_max, r_min, r_t_next, r_t_prev, bMinIncreasing, b_t, b_min, b_low, b_high, b_opt, a1, a2, a3, a4, a5, T, rho, rho_t){
	console.log("Inside algo 2");
	console.log("r_min: "+r_min+" r_max: "+r_max+" r_t_next:"+r_t_next+" r_t_prev:"+r_t_prev +" r_t:"+r_t);
	var r_tplus1 = r_t;
	var bDelay = 0;
	if(RunningfastStart == true && r_t != r_max && bMinIncreasing == true && r_t <=a1*rho ){
		if(b_t < b_min){
			if(r_t_next <= a2*rho){
				r_tplus1 = r_t_next;
			}
		} else if(b_t < b_low){
			if(r_t_next <= a3*rho){
				r_tplus1 = r_t_next;
			}		
		} else {
			if(r_t_next <= a4*rho){
				r_tplus1 = r_t_next;
			}
			if(b_t > b_high){
				bDelay = b_high - T;
			}
		}	
	} else {
		RunningfastStart = false;
		if(b_t < b_min){
			r_tplus1 = r_min;
		} else if(b_t < b_low){
			if(r_t != r_min && r_t >= rho_t){
				r_tplus1 = r_t_prev;
			}		
		} else if(b_t < b_high){
			if(r_t == r_max || r_t_next >= a5*rho){
				if(b_t - T > b_opt){
					bDelay = b_t - T;
				} else{
					bDelay = b_opt;
				}
			}
		} else {
			if(r_t == r_max || r_t_next >= a5*rho){
				if(b_t - T > b_opt){
					bDelay = b_t - T;
				} else{
					bDelay = b_opt;
				}
			} else{
				r_tplus1 = r_t_next;
			}
		}
	}
	console.log("rtp1: "+r_tplus1);
	return {
        r_tplus1: r_tplus1,
        bDelay: bDelay,
		RunningfastStart: RunningfastStart
    };  

}


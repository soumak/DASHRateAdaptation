/* it follows the algo given in the paper */
/*
Input: 	r_t: The previously used video rate
		r_max: maximum available video rate
		r_min: minimum available video rate
		r_t_next: the video rate next to r_t, (r_t)+1 and not r_(t+1)
		r_t_prev: the video rate prev to r_t, (r_t)-1 and not r_(t-1)
		f_b_t, r_f_prev, r_f_next : depend on rate map
Output: The next video rate
*/

function rateMap(b_t,b_min,b_high,r_max, r_min)
{
	console.log("Inside rateMap");
	console.log("b_high: "+b_high);
	console.log("r_max: "+r_max);
	console.log("r_min: "+r_min);
	if (b_t<=b_min)
	{
		return r_min;
	}
	else if (b_t<=b_high)
	{
		var b,c;
		b = parseFloat(((r_max-r_min) - ((b_high)*(b_high) - (b_min)*(b_min))))/(b_high-b_min);
		c= parseFloat(r_max  - b_high*(b_high + b));
		console.log("EQ b_t: "+b_t);
		console.log("EQ b: "+b);
		console.log("EQ c: "+c);

		return (b_t*(b_t+b) + c);
	}
	else 
	{
		return r_max;
	}

}


function AdaptationAlgo4(r_t, r_max, r_min, r_t_next, r_t_prev, f_b_t, r_f_prev, r_f_next){
	
	var r1 = r_t_next;
	var r2 = r_t_prev;
	console.log("f_b_t: "+f_b_t+" r1:"+r1+" r2:"+r2);

	if(f_b_t >= r1){
		r_t_next = r_f_prev;
	} else if(f_b_t <= r2){
		r_t_next = r_f_next;
	} else {
		r_t_next = r_t;
	}	
	return r_t_next;
}

//parameters: q_ref = 20s, K_p = 0.1, K_i = 0.01, 
//return counter
/*
set counter = 0 intial
v_k_minus_one is same as r_t
T_dash_k is same as est thoughput
value of m from paper
have to store last buffer value when func was called
do not call if b_t > b_max
w = 10;
v_l = r_max

*/

function SmoothVideoAdaptation2(T_dash_k, q_t, q_ref, v_k_minus_one, counter, ratesList, q_t_prev, k_p, delta){
	console.log("Inside 5_2");
	var v_l = ratesList[ratesList.length - 1];
	var w = 10;
	var power = k_p *(q_t - q_ref);
	var F_q_k = 2*Math.exp(power)/(1+ Math.exp(power)) ;
	var F_t_k = delta /(delta - (q_t - q_t_prev));
	var F_v_k = (v_l/(v_k_minus_one+w)) + (w/(v_l + w));
	var F_k =  F_q_k*F_t_k*F_v_k;
	var v_dash_k = F_k*T_dash_k;
	var v_k;
	var i;
	var m;
	var buffer_diff = q_t - q_t_prev;
	if (buffer_diff )
	if (buffer_diff < delta && buffer_diff >= 0.4*delta)
	{
		m=1;
	}
	else if (buffer_diff < 0.4*delta && buffer_diff >= 0.2*delta)
	{
		m=5;
	}
	else if (buffer_diff < 0.2*delta && buffer_diff >=0)
	{
		m = 15;
	}
	else 
		m = 20;

	console.log("m: "+m);

	if(q_t < q_ref/2){
		
		for(i=0; i<ratesList.length && ratesList[i]< v_k_minus_one; i++);	/*set v_k to Q(T_k_minus_one)*/
			if (i!=0)
				v_k = ratesList[i-1];
			else v_k = ratesList[0];
		
		return {
			v_k : v_k,
			counter:counter	
		};
	} else if(v_dash_k>v_k_minus_one){
		counter++;
		if(counter>m){
			for(i=0; i<ratesList.length && ratesList[i]< T_dash_k; i++);	/*set v_k to Q(T_dash_k)*/
				if (i!=0)
					v_k = ratesList[i-1];
				else v_k = ratesList[0];
			
			counter=0;
			return {
				v_k : v_k,
				counter:counter	
			};
		}
	} else if(v_dash_k < v_k_minus_one ){
		counter = 0;
	}
	v_k = v_k_minus_one;
	return {
		v_k : v_k,
		counter:counter	
	};
}

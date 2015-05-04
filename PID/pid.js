//parameters: q_ref = 20s, K_p = 0.1, K_i = 0.01, 
//Compute u_t as PI including sum of particulate errors from q_t and q_ref
//T_k is throughput estimate
function SmoothVideoAdaptation1(u_t, T_k, ratesList){
	console.log("Inside smooth");
	var v_k = (parseFloat(u_t)+1)*T_k;
	console.log("v_k: "+v_k);
	var i;

	for(i=0; i<ratesList.length && ratesList[i]< v_k; i++);	/*choose the largest v smaller than v_k*/
		
		if (i!=0)
			v_k = ratesList[i-1];
		else v_k = ratesList[0];

	
	console.log("v_k: "+v_k);
	return v_k;
}



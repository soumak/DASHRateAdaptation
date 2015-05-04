/* the algo as is given in the paper */

//I = 2*T
//B_alpha = 5*T
//B_beta = 10*T
//B_max = 12*T
//n =  no of fragments downloaded till now. This is for the n+1th segment
//B_curr = current buffer level
//W_nplus1 = array of the size of the next segment in all the bitrates, r_min to r_max
//curr = index in ratesList of the rate of last downloaded segment 
//H_n see in paper

function SARA(ratesList, I, B_alpha, B_beta, B_max, B_curr, W_nplus1, H_n, curr1){
	var curr = parseInt(curr1);
	//console.log("Inside SARA");
	console.log("I: "+I+" B_alpha "+B_alpha+" B_beta "+B_beta+" B_max "+B_max+" B_curr "+B_curr+" curr "+curr);
	for(var j=0;j<W_nplus1.length;j++)
	{
		console.log("potential sizes: "+W_nplus1[j]);
	}
	var delta = 0;
	var l_nplus1 = ratesList[0];
	var r_curr = ratesList[curr];
	var w_nplus1_curr = W_nplus1[curr];
	
	if(B_curr >= I){
		if(parseFloat(w_nplus1_curr/H_n) > B_curr - I){
			var i = 0;
			while(i<=curr){
				if(parseFloat(W_nplus1[i]/H_n) <= B_curr - I)
					l_nplus1 = ratesList[i];
				i++;
			}
		}
		else if(B_curr <= B_alpha){
			if((curr < ratesList.length - 1) && ((parseFloat(W_nplus1[parseInt(curr) + 1])/H_n) < B_curr - I))
				l_nplus1 = ratesList[parseInt(curr) + 1];
			else
				l_nplus1 = r_curr;
		}
		else if(B_curr <= B_beta){
			var i = curr;
			while(i<ratesList.length){
				if(parseFloat(W_nplus1[i]/H_n) <= B_curr - I)
					l_nplus1 = ratesList[i];
				i++;
			}
		}
		else if(B_curr > B_beta){
			var i = curr;
			while(i<ratesList.length){
				if(parseFloat(W_nplus1[i]/H_n) <= B_curr - B_alpha)
					l_nplus1 = ratesList[i];
				i++;

			}
			delta = B_curr - B_beta;
		}
		else
			l_nplus1 = r_curr;
	}

	return {
		r_tplus1: l_nplus1,
        bDelay: delta
	};
}
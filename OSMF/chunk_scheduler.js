/* returns the time required to fetch the next chunk */
function chunk_scheduler(est_bandwidth, l_nxt, chunk_time, bitrates)
{
	var size_to_fetch = chunk_time*bitrates[l_nxt]; //in bits
	var time_to_fetch = (size_to_fetch/est_bandwidth)/1000 ;  //in secs
	return time_to_fetch;

}
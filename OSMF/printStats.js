/*function to print the QoE stats for the video session, currently invoked at the fetching every 5 segments*/
function printStats()
{
	var key, wtBitRate=0;
console.log("Final Stats:................");
console.log("StartUp Delay:,"+startupDelay);
console.log("Bitrates:.............");
for(key in actualPlayFragLevels)
{
	console.log(key+","+actualPlayFragLevels[key]);	
	wtBitRate += parseFloat(actualPlayFragLevels[key]*chunkPlaybackSize);
}
console.log("Avg BitRate:,"+wtBitRate/totalVideoTime);
console.log("Switch Events:...............");
for(key in switchEvents)
{
	console.log(key+","+switchEvents[key]);	
}

console.log("Rebuffers:.............");
for(key in rebufferingEvent)
{
	console.log(key+","+rebufferingEvent[key][0]+","+rebufferingEvent[key][1]+","+rebufferingEvent[key][2]);	
}
console.log("Total Rebuffers:,"+rebufferingEvent.length);
}



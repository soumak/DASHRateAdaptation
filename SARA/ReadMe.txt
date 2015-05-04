Implementation of Rate Adaptation Algorithms for DASH client:

Total 6 rate adaptation algorithms have been implemented, which are as follows:
1) OSMF_TIME: It is the osmf implementation (based on chunk fetch time) taken from this paper.
2) OSMF: It is modified version of 1, which uses bandwidth instead of the fetch time.
3) KM Algo: It follows the KM algo from this paper.
4) Buffer-based: It follows the purely buffer-based approach from this paper.
5) PID-based: It follows the 1st algo in this paper.
6) Smooth-Agile-based: It follows the 2nd algo in this paper.

Each of the implementations are given in seperate folders.

Dataset: DASH dataset from ITEC(eg. BigBuckBunny),along with its manifest file has been used.

To run the codes: Put the DASH datasets (like the folders bunny_$bit-rate$) inside the folder of the particular algorithm and the manifest file inside the folder DashServer in it. (Replace $bit-rate$ with 45373bps, 88482bps, etc).

Description of the code files:
1) main.html : It is the main html framework.
2) manifestParser.js : It read the manifest file and extracts the necessary info from it.
3) setupVideo.js : It creates the video elements and intializes them.
4) videoEvents.js : It loads the different events handlers.
5) initFragment.js : It fetches the intial fragment of different bit-rates.
6) checkBuffering.js : It checks for rebuffering event.
7) displayCurrentParameters.js : It shows the current parameters of the chunk being played.
8) displayNextParameters.js : It shows the parameters of the last fetched chunk.
9) polling.js : It checks if now is the time to fetch the next fragment.
10) playSegment.js : It fetches the next fragment.
11) next_bit_rate.js: It finds out the next bit rate to be fetched.
12) printStats.js : It prints the QoE stats.
13) chunk_scheduler.js: It estimates the time required to fetch the next chunk.
14) displayData.js : It displays the data on the html page.
15) osmf.js, osmf_time.js, km.js, buffer_based.js, pid.js, smooth_agile.js : They implement the 6 different algos.
16) global_variables: It gives the different variables used in the codes.


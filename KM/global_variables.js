    // Global Parameters from .mpd file
var file;  // MP4 file
var type;  // Type of file
var codecs; //  Codecs allowed
var width;  //  Native width and height
var height;
var representations;   //  bit-rates representation
var start_time;
var done_time;
var request_time;
var flag = 0; //dummy check
var chunk_len=0;
var chunk_time=0;
var ini_chunks = [];   //stores if the intial frag of that bit-rate has been fetched or not
var videoStarted = false; //check if video has started

var aggressiveFetch = false; //fecth many intial chunks together, rqd for 1 and 4 sec videos

var t_last_frag = 0,l_cur,l_nxt,l_min = parseInt(0) ,l_max, theta, bitrates, alpha = 0.8 ;	//theta is the weighted time avg of chunk arrival times, alpha is weight
var thetaIsSet = false;

var bitrates = [];

var next_chunk_fetch_time;
var play_button_click_no = 0;


// Elements
var videoElement = document.getElementById('myVideo');
var playButton = document.getElementById("load");
videoElement.poster = "poster.jpg"; //puts the initial picture in the video element

/*variables used for fetching the fragments and displaying the total time, defined in manifestParser.js */
var raw_init_url;
var raw_segment_url;
var init_url;
var segment_url;
var totalVideoTime; //in secs
var totalFragNo;
var raw_time; //for this video 
var hour;
var minute;
var second;


// Description of initialization segment, and approx segment lengths 
var initialization;
var segDuration;
var vidDuration;

// Video parameters
var bandwidth; // bitrate of video

var est_bandwidth; //in bits

// Parameters to drive segment loop
var index = 1; // Segment to get
var segments;
var curIndex = document.getElementById("curIndex"); // Playing segment
var segLength = document.getElementById("segLength");

// Source and buffers
var mediaSource;
var videoSource;

// Parameters to drive fetch loop
var segCheck;
var lastTime = 0;
var bufferUpdated = false;

// Flags to keep things going 
var lastMpd = "";
var vTime = document.getElementById("curTime");
var requestId = 0;

var cut_off=0; //when to fetch the next chunk
var totalVideoPlaybackReceived = 0; //to calculate the buffer value at any time
var minBufferIsSet = false;
var prevResponseDone = false;
var chunkPlaybackSize;// size(in secs) of each chunk
var forceFetch = false;

var b_min = 10, b_low = 20, b_high = 50,  a1 = 0.75, a2 = 0.33, a3 = 0.5, a4 = 0.75, a5 = 0.9;  //for KM algo
var b_max = 30; //buffer based and PID based algo
var b_opt = 10;
var RunningfastStart = true;
var r_max ;
var r_min ;
var r_t_next, r_t_prev, bMinIncreasing=true, b_t;
var r_t;
var T = chunkPlaybackSize;
var rho_t, rho;
//var minBuffer;
var delta_b = 1 ; //1sec
var bDelay = 0; //0sec
var delta_t = 10*1000; //10 secs
var numerator_rho;
var denominator_rho;
var result_algo2;
var fetched_chunk_info = new Array() ;  //chunk_info['done_time'] = [bit_rate,request_time]
var next_chunk_scheduler = 10;

var f_b_t, r_f_prev, r_f_next; //for algo buffer based

var timeWeightedBuffer = 0; //for PID algo
var lastPollTime = new Date().getTime(); //for PID algo
var u_t, k_p =0.1,k_i =0.01 ; //for PID algo

var prev_b_t = 0; //for Smooth and Agile Algo
var counter = 0; //for Smooth and Agile Algo


//data for final stats
  var actualPlayFragLevels = [];    //stores bitrates of consecutive chunks
  //var rebufferingNo=0;
  var rebufferingEvent =[] ;//stores start_time,end_time,duration of a rebuffer 
var switchEvents = []; //stores switches and at which chunk (ie. next chunk no is stored)
var startupDelay = 0;
var avgBitRate = 0;
var videoStartClicked;
var videoEnded=false;
var setIntervalId;

//for display parameters
var lastFetchedFragNo = 0;
var lastFetchedLevel;

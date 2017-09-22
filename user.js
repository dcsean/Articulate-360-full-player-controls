var	toggle = true,
	controlNode = null,
	subtitlesButtonNode = document.createElement("div"),
	progressBarObject = document.createElement("div"),
	emailButtonNode = document.createElement("a"),
	slideNumberNode = document.createElement("div"),
	enlargeButtonNode = document.createElement("div"),
	arrFromList,
	emailsubject = '1 on 1 conversations',
	emailbody = 'What was the slide number of the issue?%0AWhat was the issue?',
	mailto = 'onlinelearning@gadventures.com',
	initInterval = setInterval(init, 1000),
	checkCurrentStatusInterval;

// initializes variables when user.js is called for first time
function init(){
	//giving IDs to email elements
	emailButtonNode.id = 'emailIcon';
	subtitlesButtonNode.id = 'subtitlesIcon';
	slideNumberNode.id = 'slideNumber';
	enlargeButtonNode.id = 'enlargeIcon';
	progressBarObject.id = 'courseProgressBar'
	//adding properties to the href tag
	emailButtonNode.href = 'mailto:'+mailto+'?subject='+emailsubject+'&body='+emailbody;
	//if this element on the player exist initialize controlNode variable
	if (document.getElementsByClassName("controls-group control-bar cs-seekcontrol progress-control")[0]){
		controlNode = document.getElementsByClassName("controls-group control-bar cs-seekcontrol progress-control")[0].childNodes[0];
	} 
	//if controlNode has been filled append these elements to the DOM
	if(controlNode){
		controlNode.appendChild(subtitlesButtonNode);
		controlNode.appendChild(emailButtonNode);
		controlNode.appendChild(slideNumberNode);
		controlNode.appendChild(enlargeButtonNode);
		controlNode.appendChild(progressBarObject);
	}
	//clear init interval
	if(controlNode) clearInterval(initInterval);
	//sets check current status interval
	checkCurrentStatusInterval = setInterval(checkCurrentStatus, 10);
	// add subtitles button a listener
	enlargeButtonNode.addEventListener('click', enlargeScreen);
	subtitlesButtonNode.addEventListener('click', subTitlesSwitch);
}

// callback from an event listener to check on the toggle variable
// fills the subTitle object with the subtitles DOM element
function checkCurrentStatus(){
	if(toggle !== null){
		arrFromList = Array.prototype.slice.call(document.getElementsByClassName("slide-object slide-object-objgroup shown"));
		subTitlesObjectNode = retrieveSubtitles(arrFromList);
	}
	if (!toggle) {
		if (subTitlesObjectNode.style !== undefined) subTitlesObjectNode.style.display = 'block'
	}else{
		if (subTitlesObjectNode.style !== undefined) subTitlesObjectNode.style.display = 'none';
	}
}

// this variable casts the subtitle element in the DOM
function retrieveSubtitles(collection){
	if(collection.length !== 0){
		for(var elem in collection){
			if(collection[elem].style.height === '74'+'px' || collection[elem].style.height === '75'+'px'){
				return collection[elem];
			}
		}
	}
	return false;
toggle = false;
};

// subtitle listener callback function, which works as a toggle
// makes subtitle div to toggle visibility in the DOM
function subTitlesSwitch(e){
	toggle = !toggle;
	if (subTitlesObjectNode.style !== undefined) {
		toggle ? subTitlesObjectNode.style.display = 'block' : subTitlesObjectNode.style.display = 'none';
	}
}

// callback from the enlarge button listener
// this function adds functionality to the enlarge button
function enlargeScreen(){
	//var elem = document.body;
	var elem = document.getElementById("presentation-container");	
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
	  elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
	  elem.webkitRequestFullscreen();
	} 
}

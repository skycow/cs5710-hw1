
let previousTime = performance.now();

let events = [];
let toDisplay = [];

let pressed = false;

function buttonPress() {
	pressed = true;
}

function processInput(elapsedTime) {

	if(pressed){
	let name = document.getElementById("id-name").value;
	let origInt = document.getElementById("id-interval").value;
	let currInt = document.getElementById("id-interval").value;
	let times = document.getElementById("id-times").value;

	if(name != "" && origInt != "" && times != "") {
		events.push({name: name, origInt: origInt, currInt: currInt, times: times});
	}
	
	pressed = false;
		
	}
}

function update(elapsedTime) {
	//console.log('elapsedTime: ', elapsedTime);

	for(var i = events.length-1; i >= 0; i--){
		events[i].currInt -= elapsedTime;
		if(events[i].currInt <= 0)
		{
			events[i].times--;
			toDisplay.push(events[i]);
			events[i].currInt = events[i].origInt;
			if(events[i].times === 0){
				events.splice(i,1);
			}
		}
	}
}

function render(elapsedTime) {

	for(var j = toDisplay.length-1; j >= 0; j--){
		var addition = '<span>Event: ' + toDisplay[j].name + ' (' + toDisplay[j].times + ' remaining)</span><br>';
		var output = document.getElementById("outputBox"); 
		output.innerHTML += addition;
		toDisplay.splice(j,1);
		output.scrollTop = output.scrollHeight;
	}

}

function gameLoop() {
	let currentTime = performance.now();
	let elapsedTime = currentTime - previousTime;
	previousTime = currentTime;

	processInput(elapsedTime);
	update(elapsedTime);
	render(elapsedTime);

	requestAnimationFrame(gameLoop);
}

gameLoop();

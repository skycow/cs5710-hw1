
let previousTime = performance.now();

let events = [];
let toDisplay = [];

function buttonPress() {
	let name = document.getElementById("id-name").value;
	let origInt = document.getElementById("id-interval").value;
	let currInt = document.getElementById("id-interval").value;
	let times = document.getElementById("id-times").value;

	events.push({name: name, origInt: origInt, currInt: currInt, times: times});
}

function processInput(elapsedTime) {

}

function update(elapsedTime) {
	//console.log('elapsedTime: ', elapsedTime);

	for(var i = 0; i < events.length; i++){
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

	for(var j = 0; j < toDisplay.length; j++){
		var addition = '<span>Event: ' + toDisplay[j].name + ' (' + toDisplay[j].times + ' remaining)</span><br>';
		document.getElementById("outputBox").innerHTML += addition;
		toDisplay.splice(j,1);
		document.getElementById("outputBox").scrollTop = document.getElementById("outputBox").scrollHeight;
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

var newData;
var lsData;

var timeThen = localStorage.getItem('time');
var timeNow = new Date().getHours();

var remainingCodes;
var matchNumber;
var todaysWinningFactor;

document.addEventListener("DOMContentLoaded", function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '../admin/data.json');
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.onload = function() {
		if (xhr.status === 200) {
			newData = JSON.parse(xhr.responseText);
			lsData = JSON.parse(localStorage.getItem('data'));
			//check if theres already data in the localStorage
			if (localStorage.getItem("data") !== null) {
				if(newData.date != lsData.date){
					console.log('update localStorage');
					// update the localStorage if the date changed in the json file
					localStorage.clear();
					localStorage.setItem('data', xhr.responseText);
					localStorage.setItem('hoursCounter', 10);
				}
				// if there is already data in the storage and it's the same day, do nothing!
			}else{
				//save localStorage if it's empty
				localStorage.setItem('data', xhr.responseText);
				localStorage.setItem('hoursCounter', 10);
			}
			//Not happy with that, will use a promise instead soon. You'll have to wait until the localStorage is set before you can do anything.
			setTimeout(function(){
				checkForWin(10.4)
				//set and/or update hoursCounter initially, compared to the last known value in the localStorage
				updateHours(timeThen, timeNow);
				//update hoursCounter once per hour;
				setInterval(function(){
					updateHours(timeThen, timeNow);
				},3600000);
			},200);
		}else{
			alert("can't load data", xhr.status);
		}
	};
	xhr.send();
});

function updateHours(then, now){
	timeNow = new Date().getHours();
	if(then != now){
		localStorage.setItem('time', new Date().getHours());
		timeThen = localStorage.getItem('time');
		var updateHoursCounter = localStorage.getItem('hoursCounter');
		//avoid that hoursCounter is smaller than 1.
		if(updateHoursCounter > 0){
			updateHoursCounter-- ;
			localStorage.setItem('hoursCounter', updateHoursCounter);
		}
	}
}

function checkForWin(winningFactor){
	// always round UP if the winningFactor is lower than one! Otherwise if the prices or hours changes, the number might keep the same for a long time if the system decides to round up or down.
	var randomNumberBetweenOneandWinningFactor = Math.round(Math.random() * Math.ceil(winningFactor));
	console.log(winningFactor, randomNumberBetweenOneandWinningFactor);
	var codes = lsData.codes;
	if (randomNumberBetweenOneandWinningFactor == matchNumber && codes.length > 0) {
		//1. display the winner screen, pick the first code in the lsData.codes Array and show it there.
		console.log('you win!');
		//2. delete the last code from the Array.
		codes.pop();
		//3.update lsData variable
		lsData.codes = codes;
		//4. update remainingCodes;
		remainingCodes = lsData.codes.length;
		//5.update localStorage
		localStorage.setItem('data', JSON.stringify(lsData));
	}else{
		//show looser screen
		console.log('nope, nothing.');
	}
}

function calculateWinningFactor(remainingHours, remainingCodes){
	todaysWinningFactor = 0;
}

function generateMatchNumber(){
	var randomNumberBetweenOneandWinningFactor = Math.floor(Math.random());
}

function playTheGame(){

}

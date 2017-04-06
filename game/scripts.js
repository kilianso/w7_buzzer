var newData;
var lsData;

var timeThen = localStorage.getItem('time');
var timeNow = new Date().getHours();

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
			}else{
				//save localStorage if it's empty
				localStorage.setItem('data', xhr.responseText);
				localStorage.setItem('hoursCounter', 10);
			}
			//Not happy with that, will use a promise instead soon. You'll have to wait until the localStorage is set before you can do anything.
			setTimeout(function(){
				//set and/or update hoursCounter initially, compared to the last known value in the localStorage
				updateHours(timeThen, timeNow);
				updatePrices();
				//update hoursCounter once per hour;
				setInterval(function(){
					updateHours(timeThen, timeNow);
				},3600000);
			},200);
		}else{
			alert("can't load data", xhr.status);
		}
	};
	xhr.done = function(){
		console.log('done');
	};
	xhr.send();
});

function updateHours(then, now){
	timeNow = new Date().getHours();
	if(then != now){
		localStorage.setItem('time', new Date().getHours());
		timeThen = localStorage.getItem('time');
		var updateHoursCounter = localStorage.getItem('hoursCounter');
		if(updateHoursCounter > 0){
			updateHoursCounter-- ;
			localStorage.setItem('hoursCounter', updateHoursCounter);
		}
	}
}

function updatePrices(matchingCode){
	console.log(lsData);
}

function calculateWinningFactor(remainingHours, remainingCodes){

}

function playTheGame(){

}

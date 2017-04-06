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
			if(newData.date != lsData.date){
				console.log('update localStorage');
				// update the localStorage if the date changed in the json file
				localStorage.clear();
				localStorage.setItem('data', xhr.responseText);
				localStorage.setItem('hoursCounter', 10);
			}
		}else{
			console.log("can't load data", xhr.status);
		}
	};
	xhr.send();

	//set and/or update hoursCounter initially, compared to the last known value in the localStorage
	updateHours(timeThen, timeNow);

	//update hoursCounter once per hour;
	setInterval(function(){
		updateHours(timeThen, timeNow);
	},3600000);
});

function updateHours(then, now){
	timeNow = new Date().getHours();
	if(then != now){
		localStorage.setItem('time', new Date().getHours());
		timeThen = localStorage.getItem('time');
		var updateHoursCounter = localStorage.getItem('hoursCounter');
		updateHoursCounter-- ;
		localStorage.setItem('hoursCounter', updateHoursCounter);
	}
}

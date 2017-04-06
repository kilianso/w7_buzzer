var newData;
var lsData;

var timeNow;

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
});

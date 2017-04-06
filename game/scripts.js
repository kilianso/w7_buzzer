var newData;
var lsData;

var timeThen = localStorage.getItem('time');
var timeNow = new Date().getHours();

var hoursCounter;
var remainingCodes;
var matchNumber;
var winningFactor;

//all the DOM Elements
var pressHere = document.getElementsByClassName('press-here')[0];

var yellowText1 = document.getElementsByClassName('yellow-text--1')[0]; //initial
var initialYellowText = yellowText1.value;
var yellowText2 = document.getElementsByClassName('yellow-text--2')[0]; //looser
var yellowText3 = document.getElementsByClassName('yellow-text--3')[0]; //winner

var whiteText1 = document.getElementsByClassName('white-text--1')[0]; //initial
var initialWhiteText = whiteText1.value;
var whiteText2 = document.getElementsByClassName('white-text--2')[0]; //looser
var whiteText3 = document.getElementsByClassName('white-text--3')[0]; //winner

var loser = document.getElementsByClassName('white-text--3')[0];

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
					localStorage.setItem('hoursCounter', 11);
				}
				// if there is already data in the storage and it's the same day, do nothing!
			}else{
				//save localStorage if it's empty
				localStorage.setItem('data', xhr.responseText);
				localStorage.setItem('hoursCounter', 11);
			}
			//Not happy with that, will use a promise instead soon. You'll have to wait until the localStorage is set before you can do anything.
			setTimeout(function(){
				whiteText1.innerHTML = lsData.beschreibung;
				hoursCounter = localStorage.getItem("hoursCounter");
				remainingCodes = lsData.codes.length;
				//set and/or update hoursCounter initially, compared to the last known value in the localStorage
				updateHours(timeThen, timeNow);
				//set winningFactor initially
				calculateWinningFactor(hoursCounter, remainingCodes);
				//update hoursCounter and winningFactor once per hour;
				setInterval(function(){
					updateHours(timeThen, timeNow);
					calculateWinningFactor(hoursCounter, remainingCodes);
				},3600000);
				// testing();
			},200);
		}else{
			alert("can't load data", xhr.status);
		}
	};
	xhr.send();
	//play the game
	pressHere.addEventListener('click',function(e){
		pressHere.children[0].innerHTML = 'Bereit?';
		pressHere.className += " wiggle";
		setTimeout(function(){
			checkForWin(winningFactor);
		},2000)
	});
});

function updateHours(then, now){
	timeNow = new Date().getHours();
	if(then != now){
		localStorage.setItem('time', new Date().getHours());
		timeThen = localStorage.getItem('time');
		hoursCounter = localStorage.getItem('hoursCounter');
		//avoid that hoursCounter is smaller than 1.
		if(hoursCounter > 0){
			hoursCounter-- ;
			localStorage.setItem('hoursCounter', hoursCounter);
		}
	}
}

function checkForWin(winningFactor){
	var randomNumberBetweenZeroandWinningFactor = Math.round(Math.random() * winningFactor);
	var codes = lsData.codes;
	console.log("your number:" , randomNumberBetweenZeroandWinningFactor);
	if (randomNumberBetweenZeroandWinningFactor == matchNumber && codes.length > 0) {
		//1. display the winner screen, pick the first code in the lsData.codes Array and show it there.
		console.log('you win!');
		//2. delete the last code from the Array.
		codes.pop();
		//3.update lsData variable
		lsData.codes = codes;
		lsData.anzahl = codes.length;
		//4. update remainingCodes;
		remainingCodes = lsData.codes.length;
		//5.update localStorage
		localStorage.setItem('data', JSON.stringify(lsData));
		//update winningFactor
		calculateWinningFactor(hoursCounter, remainingCodes);

	}else{
		//show looser screen
		console.log('nope, no price for you.');
		pressHere
	}
}

function calculateWinningFactor(hoursLeft, codesLeft){
	//(Verbleibende Stunden x Faktor 10 / verbleibende Anzahl Codes) immer auf ganze Zahlen AUFrunden = Winningfaktor in dieser Stunde.
	winningFactor = Math.ceil((hoursLeft * 10) / codesLeft);
	//set and update matchNumber
	matchNumber = generateMatchNumber(winningFactor);
	console.log("hours left:", hoursLeft, "prices left:", codesLeft, "winning-factor:", winningFactor, "winning-number:", matchNumber);
}

function generateMatchNumber(winningFactor){
	return Math.round(Math.random() * winningFactor);
}

function testing(){
	document.getElementById('testing').innerHTML =
		"date: " + lsData.date + "<br>" +
		"hours left: " + hoursCounter + "<br>" +
		"prices left: " + remainingCodes + "<br>" +
		"winning-factor: " + winningFactor + "<br>" +
		"winning-number: " + matchNumber;
}

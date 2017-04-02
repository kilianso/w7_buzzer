document.addEventListener("DOMContentLoaded", function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '../admin/data.json');
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
		}else{
			console.log("can't load data", xhr.status);
		}
	};
	xhr.send();
});

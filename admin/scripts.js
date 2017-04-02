document.addEventListener("DOMContentLoaded", function() {
    // show todays date;
    var today = new Date();
    var dd = today.getDate();
    //The value returned by getMonth is an integer between 0 and 11, referring 0 to January, 1 to February, and so on.
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '.' + mm + '.' + yyyy;
    document.getElementById('date').innerHTML = today;

    // add coupon fields based on "anzahl"
    document.getElementById('anzahl').addEventListener("focusout", function() {
        // Number of inputs to create
        var anzahl = this.value;
        // Container <div> where dynamic content will be placed
        var codes = document.getElementById("codes");
        // Clear previous contents of the container
				codes.innerHTML = "";
        for (i = 0; i < anzahl; i++) {
            // Create an <input> element, set its type and name attributes
            var input = document.createElement("input");
						input.className = "codes";
            input.type = "tel";
            input.name = "code" + i;
						input.maxLength = "4";
						input.required = true;
						input.placeholder = "code #" +(i+1);
            codes.appendChild(input);
        }
    });
    // save the data
		document.getElementsByClassName('save')[0].addEventListener('click', function(e){
			e.preventDefault();
			var allcodes = document.getElementsByClassName('codes');
			var data = {};
			var values = [];
			data.beschreibung = document.getElementById('beschreibung').value;
			data.anzahl = document.getElementById('anzahl').value;
			for (var i = 0; i < allcodes.length; i++) {
				values.push(allcodes[i].value);
			}
			data.codes = values;
			// $.post("json.php", {json : JSON.stringify(data)});
		});
});

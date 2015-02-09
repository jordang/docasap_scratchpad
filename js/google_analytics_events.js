var GATracking = !function(){

	/*
	
	This will take any element with the elementTag and send a GA event on first click.
	The category and action names are set as the attribute value, comma-separated.

	Category should be something like: form-touched
	Action should be something like: zip-code-field

	Example:
	<input docasap-trackable="form-click,confirmation-date-of-birth">
	

	Will also listen for popup events on document and send to GA.
	Category and action is specified in the array as ["category", "action"]

	Example:
	within the function that opens the pop-up, add:

	opensPopUpFunction(){
		...
		$(document).trigger("docasap.popupMessage", ["form validation message", "Choose a gender"])
		...
	}

	*/


	var elementTag = "docasap-trackable",
		popupEventName = "docasap.popupMessage";



	function setListeners(){

		$(document)
			.on("click, focusin","[" + elementTag + "]", fireClickEvent)
			.on(popupEventName, firePopupEvent);
	}



	function fireClickEvent(e){

		var valueSet = $(e.target).closest("[" + elementTag + "]").attr(elementTag).split(","),
			category = valueSet[0],
			action   = valueSet[1];

		ga('send', 'event', category, action);
	}


	function firePopupEvent(e, category, action){
		ga('send', 'event', category, action);
	}


	$(setListeners);
}();
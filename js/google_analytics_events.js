var GATracking = !function(){

	/*
	
	This will take any element with the elementTag and send a GA event on first click.
	The category and action names are set as the attribute value, comma-separated.

	Category should be something like: form-touched
	Action should be something like: zip-code-field

	Example:
	<input docasap-trackable="form-click,confirmation-date-of-birth">
	
	*/


	var elementTag = "docasap-trackable";



	function setListeners(){

		$(document).on("click, focusin","[" + elementTag + "]", fireEvent);
	}



	function fireEvent(e){

		var valueSet = $(e.target).closest("[" + elementTag + "]").attr(elementTag).split(","),
			category = valueSet[0],
			action   = valueSet[1];

		ga('send', 'event', category, action);
	}



	$(setListeners);
}();
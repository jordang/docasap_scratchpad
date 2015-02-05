var GATracking = !function(){

	// This will take any element available at documentReady with
	// the elementTag and send a GA event on first click.
	// The category and action names are set as the attribute value, comma-separated

	//Example:
	// <input docasap-trackable="form-click,confirmation-date-of-birth">



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

var sliderClass = (function() {

	
	/******************/

	/* Initialize App */ 

	/******************/

	function init(context) {
		startSlider(context);
	}

	/*********************/

	/* General Functions */

	/*********************/

	function startSlider(context) {
		$(context).bxSlider({
			ariaLive: true,
			pager: false
		});
	}


	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

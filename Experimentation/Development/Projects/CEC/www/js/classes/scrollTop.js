
var scrollTop = (function() {

	
	/******************/

	/* Initialize App */ 

	/******************/

	function init() {
		eventCreation();
	}

	/*********************/

	/* General Functions */

	/*********************/

	function eventCreation() {
		var getScrolltop = $('.scroll-top').find('img');

		getScrolltop.click(function() {
			scrollTotop();
		})
	}

	function scrollTotop() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
	}

	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

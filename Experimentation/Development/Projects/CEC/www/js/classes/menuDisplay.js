
var menuDisplay = (function() {

	
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
		menu = $('.menu');
		var	getMenuButton = $('.menu-icon').find('img'),
			getCloseButton = menu.find('.close-menu');

		getMenuButton.click(function() {
			addMenu();
		})
		getCloseButton.click(function() {
			removeMenu();
		})
	}

	function addMenu() {
		menu.removeClass('hide-menu');
		menu.addClass('show-menu');
	}

	function removeMenu() {
		menu.removeClass('show-menu');
		menu.addClass('hide-menu');
	}


	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

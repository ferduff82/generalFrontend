
var modalDisplay = (function() {

	/******************/

	/*   Variables   */ 

	/******************/

	var getModal = $('.modal-display'),
		closeButton = $('.modal-close');

	
	/******************/

	/* Initialize App */ 

	/******************/

	function init(context) {
		showModal(context);
	}

	/*********************/

	/* General Functions */

	/*********************/

	function showModal(context) {

		var getFullImage = context.attr('data-full-picture'),
			getImageContainer = getModal.find('.modal-image');

		getImageContainer.empty();
		getImageContainer.append('<img src=' + getFullImage + '>');

		getModal.removeClass('hide');
		getModal.addClass('show');

		closeButton.click(function() {
			getModal.removeClass('show');
			getModal.addClass('hide');
		})



	}

	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

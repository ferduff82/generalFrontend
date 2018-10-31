
var adjustStylesTranslator = (function() {

	var selectAllBody = $('body');

	
	/******************/

	/* Initialize App */ 

	/******************/

	function init() {
		resetStyles();
		selectAllBody.click(function() {
			isMenuDisplayed();
		}) 

	}

	/*********************/

	/* General Functions */

	/*********************/

	function resetStyles() {

		$(window).on( "load", function() {
			$('.goog-te-menu-frame').contents().find(".goog-te-menu2").css('border','none');
			$('.goog-te-menu-frame').contents().find(".goog-te-menu2").css('min-width','176px');
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item-selected').css('display','none');
			$('.goog-te-menu-frame').contents().find('span').css('color','#000');
			$('.goog-te-menu-frame').contents().find('span').css('padding-left','20px');
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item').find('div').addClass('whiteHover');
			$('.goog-te-menu-frame').contents().find('.whiteHover').css('background','#fff');

			$('.goog-te-menu-frame').click(function() {
				isMenuDisplayed();
			})
		});
	}

	function isMenuDisplayed() {
		var isVisible = $('.goog-te-menu-frame').is(':visible'),
			selectArrow = $('.icon-arrow');

		if (isVisible) {
			selectArrow.removeClass('rotateArrow');
		} else {
			selectArrow.addClass('rotateArrow');
		}
	}

	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

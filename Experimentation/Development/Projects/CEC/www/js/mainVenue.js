
var cecAppVenue = (function() {



	/******************/

	/*   Variables   */ 

	/******************/

	var getBackButton = $('.image-back').find('img'),
		getDocumentWidth = $('body').innerWidth(),
		getFullScreen = $('.venue-pictures').find('.image-venue');

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		var promiseFinished = loadHeaderAndFooter.init();
		adjustStylesTranslator.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});
  		getFullScreen.click(function() {
  			modalDisplay.init($(this));
  		})
  		getBackButton.click(function() {
  			goBack();
  		})
  		appendTranslator();
	}

	/***************/

	/* Bind Events */

	/***************/



	/************************/

	/* Render Content Pages */

	/************************/

	function _render() {


	}

	/*********************/

	/* General Functions */

	/*********************/

	function appendTranslator() {
		if (getDocumentWidth < 992) {
			$.get('../templates/translator.html', function(template) {
	            $('.translate-mobile').append(template);
	        })		
		} else {
			$.get('../templates/translator.html', function(template) {
	            $('.translate-desktop').append(template);
	        })	
		}
	}

	function goBack() {
		window.history.back();
	}

	/********************/

	/* Public Functions */

	/********************/

	return {
        initialize: initialize,
    };
	

})();

cecAppVenue.initialize();

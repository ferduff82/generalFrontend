
var cecAppNewsOpen = (function() {



	/******************/

	/*   Variables   */ 

	/******************/

	var getBackButton = $('.image-back').find('img'),
		getDocumentWidth = $('body').innerWidth();

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		var promiseFinished = loadHeaderAndFooter.init();
		adjustStylesTranslator.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});
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

	function goBack() {
		window.history.back();
	}

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
	

	/********************/

	/* Public Functions */

	/********************/

	return {
        initialize: initialize,
    };
	

})();

cecAppNewsOpen.initialize();

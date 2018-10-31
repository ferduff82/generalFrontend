
var cecAppPlenariaC = (function() {


	/******************/

	/*   Variables   */ 

	/******************/

	var getBackButton = $('.image-back').find('img'),
		pictureSelect = $('.image-plenaria');

	var getDocumentWidth = $('body').innerWidth();

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		var promiseFinished = loadHeaderAndFooter.init();
		adjustStylesTranslator.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});
  		scrollTop.init();
  		getBackButton.click(function() {
  			goBack();
  		})
  		pictureSelect.click(function() {
  			modalDisplay.init($(this));
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

cecAppPlenariaC.initialize();

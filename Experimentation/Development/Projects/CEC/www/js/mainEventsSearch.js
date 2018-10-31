
var cecAppEventsSearch = (function() {



	/******************/

	/*   Variables   */ 

	/******************/

	var getDocumentWidth = $('body').innerWidth();

	var removeButton = $('.clear-filter-container').find('button'),
		eventName = $('.event-container').find('input'),
		dateFrom = $('.date-container').find('#from'),
		dateTo = $('.date-container').find('#to');

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		var promiseFinished = loadHeaderAndFooter.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});
  		datepicker.init();
  		adjustStylesTranslator.init();
  		removeButton.click(function() {
  			clearInputs();
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

	function clearInputs() {
		eventName.val('');
		dateFrom.val('');
		dateTo.val('');
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

cecAppEventsSearch.initialize();

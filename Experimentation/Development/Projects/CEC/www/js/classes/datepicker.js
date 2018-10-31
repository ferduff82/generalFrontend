
var datepicker = (function() {

	
	/******************/

	/* Initialize App */ 

	/******************/

	function init() {
		startDatepicker();
	}

	/*********************/

	/* General Functions */

	/*********************/

	function startDatepicker() {

		var dateFormat = "mm/dd/yy",
			from = $( "#from" ).datepicker({
				defaultDate: "+1w"
			}).on( "change", function() {
				to.datepicker( "option", "minDate", getDate( this ) );
			}),
			to = $( "#to" ).datepicker({
				defaultDate: "+1w"
			}).on( "change", function() {
				from.datepicker( "option", "maxDate", getDate( this ) );
			});

		function getDate( element ) {
			var date;
			try {
				date = $.datepicker.parseDate( dateFormat, element.value );
			} catch( error ) {
				date = null;
			}
			return date;
		}

	}


	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

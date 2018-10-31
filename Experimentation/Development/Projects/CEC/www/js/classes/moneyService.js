
var moneyService = (function() {

	/******************/

	/*   Variables   */ 

	/******************/

	
	/******************/

	/* Initialize App */ 

	/******************/

	function init() {
		callMoney();
	}


	/*********************/

	/* General Functions */

	/*********************/

	function callMoney() {

		$.ajax({
			url: 'http://api.estadisticasbcra.com/usd_of',
			type: 'GET',
			beforeSend: function (xhr) {
			    xhr.setRequestHeader('Authorization', 'BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njg5OTAwMTAsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJmYXJpYXNAcG9ydGlub3MuY29tLmFyIn0.EZcnxbUAM8P3kDNikyvny03u3iJ910YLaKY6ao-qvUOc3pOljX64W915IvQeI5MErkid0oUJneImajIi7wWogw');
			},
			success: function (data) { 
				console.log(data)
			},

		});


	}


	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

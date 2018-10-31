
var cecAppHome = (function() {



	/******************/

	/*   Variables   */ 

	/******************/

	var getDocumentWidth = $('body').innerWidth();

	var	latGlobal = -34.5831805,
		longGlobal = -58.3922434,
		placeLocGlobal = new google.maps.LatLng(latGlobal, longGlobal);

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		adjustStylesTranslator.init();
		menuDisplay.init(); 
		scrollTop.init();
		sliderClass.init('.slider-a');
		initGoogleMaps();
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
			$.get('templates/translator-home.html', function(template) {
	            $('.translate-mobile').append(template);
	        })		
		} else {
			$.get('templates/translator-home.html', function(template) {
	            $('.translate-desktop').append(template);
	        })	
		}
	}

	function initGoogleMaps() {

		var map = new google.maps.Map(document.getElementById('map-container'), {
			center: placeLocGlobal,
			zoom: 14
		});

		createMarker(placeLocGlobal, 'Centro de Convenciones Buenos Aires', map);

		function createMarker(placeLoc, placeName, map) {
			var	infowindow = new google.maps.InfoWindow({
			    content: ''
			});
			var marker = new google.maps.Marker({
				map: map,
				position: placeLoc
			});

			infowindow.setContent(placeName);
			infowindow.open(map, marker);
		}
	}

	/********************/

	/* Public Functions */

	/********************/

	return {
        initialize: initialize,
    };
	

})();

cecAppHome.initialize();

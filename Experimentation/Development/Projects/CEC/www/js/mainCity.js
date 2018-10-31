
var cecAppCity = (function() {



	/******************/

	/*   Variables   */ 

	/******************/

	var getDocumentWidth = $('body').innerWidth();

	var $atractions = $('.touristic-atractions'),
		$gastronomy = $('.gastronomy'),
		$hotels = $('.hotels'),
		$parkings = $('.parkings');

	var	latGlobal = -34.5831805,
		longGlobal = -58.3922434,
		placeLocGlobal = new google.maps.LatLng(latGlobal, longGlobal);

	/* Flags */

	var firstLoad = true;

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		var promiseFinished = loadHeaderAndFooter.init();
		adjustStylesTranslator.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});
  		weatherService.init();
  		appendTranslator();
  		loadCecMarker();
  		getAllPlaces('atractions');


		/***************/

		/* Bind Events */

		/***************/

		$atractions.click(function() {
			getAllAtractions();
			hideRightColumn('atractions');
		})
		$gastronomy.click(function() {
			initGoogleMaps('restaurant');
			hideRightColumn('restaurant');
		})
		$hotels.click(function() {
			initGoogleMaps('hotels');
			hideRightColumn('hotels');
		})
		$parkings.click(function() {
			initGoogleMaps('parking');
			hideRightColumn('parking');
		})

	}

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

	/* Hide column B */

	function hideRightColumn(selection) {

		var getColumnA = $('.column-a'),
			getColumnB = $('.column-b');

		if (selection === 'atractions') {
			getColumnA.css('width','80%');
			getColumnB.removeClass('hide');
		} else if (selection === 'restaurant') {
			hideAtractions();
		} else if (selection === 'hotels') {
			hideAtractions();
		} else {
			hideAtractions();
		}

		function hideAtractions() {
			getColumnA.css('width','100%');
			getColumnB.addClass('hide');
		}
	}

	/* Call Data Atractions Services */

	function loadCecMarker() {
		var city = initBasicMap(),
			placeLocGlobal = new google.maps.LatLng(latGlobal, longGlobal);

		createCustomMarker(placeLocGlobal, 'Centro de Convenciones Buenos Aires', city.map);
	}

	function getSpecificPlace(context) {

		$.get('../services/atractions.json', function(places) {

			var city = initBasicMap(),
				getIndexContext = context.index(),
				lat = parseFloat(places.atractions[getIndexContext].location.lat),
				long = parseFloat(places.atractions[getIndexContext].location.long),
				placeLoc = new google.maps.LatLng(lat, long);

			createCustomMarker(placeLoc, places.atractions[getIndexContext].title, city.map);
			createCustomMarker(placeLocGlobal, 'Centro de Convenciones Buenos Aires', city.map);
		})
	}

	function getAllPlaces(places) {

		var $getColumnB = $('.column-b');

		$.get('../services/' + places + '.json', function(places) {
	        for (var key in places.atractions) {
				$getColumnB.append(
					"<div class='atraction-container'><div><img src=" + places.atractions[key].img + "></div><div class='atraction-text'>" + places.atractions[key].title + "</div><div class='icon-plus'><img src='../img/dist/pictures/plus-blue.png'></div></div>"
				);
			}
			$('.atraction-container').click(function() {
				getSpecificPlace($(this));
			})
        })		
	}

	function getAllAtractions() {
		$.get('../services/atractions.json', function(places) {
			initGoogleMapsAtractions(places);
		})
	}

	/* Initialize Google Maps */

	function initGoogleMaps(data) {

		var city = initBasicMap();

		var request = {
			location: city.cityBuenosAires,
			radius: 15000,
			types: [data]
		};

		service = new google.maps.places.PlacesService(city.map);
		service.nearbySearch(request, callback);

		function callback(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					var place = results[i],
						placeLoc = place.geometry.location;
					createMarker(placeLoc, place.name, city.map);
				}
			}
		}
		createCustomMarker(placeLocGlobal, 'Centro de Convenciones Buenos Aires', city.map);
	}

	function initGoogleMapsAtractions(places) {

		var city = initBasicMap();

		for (var key in places.atractions) { 
			var lat = parseFloat(places.atractions[key].location.lat),
				long = parseFloat(places.atractions[key].location.long);

			var placeLoc = new google.maps.LatLng(lat, long);
			createMarker(placeLoc, places.atractions[key].title, city.map);
		}
		createCustomMarker(placeLocGlobal, 'Centro de Convenciones Buenos Aires', city.map);
	}

	/* Google Maps Functions */

	function initBasicMap() {

		var cityBuenosAires = new google.maps.LatLng(latGlobal, longGlobal);

		$('#map').empty();

		var map = new google.maps.Map(document.getElementById('map'), {
			center: cityBuenosAires,
			zoom: 14
		});

		return {
			cityBuenosAires : cityBuenosAires,
			map : map
		};
	}

	function createMarker(placeLoc, placeName, map) {
		var	infowindow = new google.maps.InfoWindow({
		    content: ''
		});
		var marker = new google.maps.Marker({
			map: map,
			position: placeLoc
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(placeName);
			infowindow.open(map, this);
		});
	}

	function createCustomMarker(placeLoc, placeName, map) {
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


	/********************/

	/* Public Functions */

	/********************/

	return {
        initialize: initialize,
    };
	

})();

cecAppCity.initialize();

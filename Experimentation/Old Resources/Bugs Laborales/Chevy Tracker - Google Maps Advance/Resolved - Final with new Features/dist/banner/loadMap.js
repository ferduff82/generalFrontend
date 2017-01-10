function loadMap(loadData) {
    
    var latitud,
        longitud,
        map,
        zoom = 11,
        d = new Date(),
        h = d.getHours(),
        latFinal=0,
        longFinal=0,
        nombreFinal="";

    function Dist(lat1, lon1, lat2, lon2) {

      rad = function(x) {return x*Math.PI/180;}
      var R     = 6378.137;                         
      var dLat  = rad( lat2 - lat1 );
      var dLong = rad( lon2 - lon1 );
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;

      return d.toFixed(0);                     
    }

    if(loadData == "dondeSea") {
      var dataA = dondeSeaData();
    } else if(loadData == "cualquierLugar") {
      var dataA = cualquierLugarData();
    } else {
      var dataA = dondeQuieranData();
    }

    $(document).ready(function() {
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(coordenadas, errores);
        }else{alert('Oops! Tu navegador no soporta geolocalización. Descarga Chrome, es gratis!');}
    });
    
    function coordenadas(position) {
      latitud = position.coords.latitude; 
      longitud = position.coords.longitude; 

      var menor = false;

      for (var count = 0; count < dataA.length; count++) {            
      
        var latUbicacion = dataA[count].latitud,
            longUbicacion = dataA[count].longitud,
            nombre = dataA[count].name;

        var distanciaKM = parseInt( Dist(latUbicacion,longUbicacion,latitud,longitud) );
          
        if (distanciaKM <= menor || menor === false) { 
                      
          menor = distanciaKM;

          latFinal=latUbicacion;
          longFinal=longUbicacion;
          nombreFinal=nombre;
        }

      } 
      cargarMapa();
    }
    
    function errores(error) {
    	switch(error.code) {
	        case error.PERMISSION_DENIED:
	        	gwd.linkReturn();
	            alert("No has aceptado compartir tu posición");
	            break;
	        case error.POSITION_UNAVAILABLE:
	        	gwd.linkReturn();
	            alert("Oops! Algo ha salido mal");
	            break;
	        case error.TIMEOUT:
	        	gwd.linkReturn();
	            alert("Oops! No se puede obtener la posición actual");
	            break;
	        case error.UNKNOWN_ERROR:
	        	gwd.linkReturn();
	            alert("Oops! Hemos superado el tiempo de espera");
	            break;
	    }
    }

    function cargarMapa() {
		var latlon = new google.maps.LatLng(latitud,longitud),
			directionsDisplay,
			directionsService = new google.maps.DirectionsService();

		directionsDisplay = new google.maps.DirectionsRenderer();
		var coorMarcador = new google.maps.LatLng(latitud,longitud); 

		var myOptions = {
			center:latlon,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map($("#map_canvas").get(0), myOptions); 
		directionsDisplay.setMap(map);
		  
		var marcador = new google.maps.Marker({
			position: coorMarcador, 
			map: map, 
			title: "Donde estoy?",
			icon: 'marker-a.png',
		});

		var bounds = new google.maps.LatLngBounds ();

		var LatLngList = new Array (new google.maps.LatLng (latFinal,longFinal),new google.maps.LatLng (latitud,longitud));

		var name = nombreFinal;

		for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
			bounds.extend (LatLngList[i]);
		}

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latFinal,longFinal),
			animation:google.maps.Animation.BOUNCE,
			map: map,
			title: name,
			icon: 'marker-b.png',
		});

		marker.setVisible(false);
		marcador.setVisible(false);

		map.fitBounds (bounds);

		infoBubble = new InfoBubble({
			map: map,
			content: name,
			position: new google.maps.LatLng(latFinal, longFinal),
			padding: 0,
			backgroundColor: '#ebb01d',
			borderRadius: 4,
			arrowSize: 0,
			borderWidth: 0,
			disableAutoPan: true,
			hideCloseButton: true,
			arrowPosition: 30,
			backgroundClassName: 'phoney',
			arrowStyle: 2,
			shadowStyle:0
		});

		infoBubble.open(map, marker);

		var request = {
			origin: new google.maps.LatLng(latitud,longitud),
			destination: new google.maps.LatLng(latFinal,longFinal),
			travelMode: google.maps.TravelMode.DRIVING,
		};

		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else { console.log("some problem ocurred");}
		});
    }
} 
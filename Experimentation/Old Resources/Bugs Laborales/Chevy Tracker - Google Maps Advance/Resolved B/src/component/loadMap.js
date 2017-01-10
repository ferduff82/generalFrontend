function loadMap(loadData) {
    
    var latitud,
        longitud,
        map,
        zoom = 4,
        d = new Date(),
        h = d.getHours();

    function Dist(lat1, lon1, lat2, lon2) {

      rad = function(x) {return x*Math.PI/180;}
      var R     = 6378.137;                         
      var dLat  = rad( lat2 - lat1 );
      var dLong = rad( lon2 - lon1 );
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;

      return d.toFixed(3);                     
    }

    if(loadData == "dondeSea") {
      var dataA = dondeSeaData();
    } else if(loadData == "cualquierLugar") {
      var dataA =cualquierLugarData();
    } else {
      var dataA =dondeQuieranData();
    }

    $(document).ready(function() {
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(coordenadas);
        }else{alert('Oops! Tu navegador no soporta geolocalización. Descarga Chrome, es gratis!');}
    });
    
    function coordenadas(position) {
        latitud = position.coords.latitude; 
        longitud = position.coords.longitude; 
        menor = 100;

        for (var count = 0; count < dataA.length; count++) {            
        
          var latUbicacion = dataA[count].latitud,
              longUbicacion = dataA[count].longitud;

          if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 25) {
            zoom = 14;                
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 75) {
            zoom = 13;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 125) {
            zoom = 12;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 275) {
            zoom = 11;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 223) {            
            zoom = 10;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 375) {
            zoom = 9;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 325) {
            zoom = 8;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 475) {
            zoom = 7;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 425) {
            zoom = 6;
          } else if (Dist(latUbicacion,longUbicacion,latitud,longitud) < 575) {
            zoom = 5;
          } 
          if (menor > zoom) {              
            menor = zoom;
          }
        } 
        zoom = menor;
        cargarMapa();
    }
    
    function errores(err) {
        if (err.code == 0) {alert("Oops! Algo ha salido mal");}
        if (err.code == 1) {
          alert("No has aceptado compartir tu posición");
          window.open('http://www.w3schools.com', '_blank')
        }
        if (err.code == 2) {alert("Oops! No se puede obtener la posición actual");}
        if (err.code == 3) {alert("Oops! Hemos superado el tiempo de espera");}
    }

    function cargarMapa() {
        var latlon = new google.maps.LatLng(latitud,longitud); 

        var myOptions = {
            zoom: zoom,
            center: latlon,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map($("#map_canvas").get(0), myOptions); 
        
        var coorMarcador = new google.maps.LatLng(latitud,longitud); 
            
        var marcador = new google.maps.Marker({
            position: coorMarcador, 
            map: map, 
            title: "Donde estoy?",
            icon: 'marker-a.png'
        });

          for (var count = 0; count < dataA.length; count++) {
            var name = dataA[count].name;

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(dataA[count].latitud,dataA[count].longitud),
                animation:google.maps.Animation.BOUNCE,
                map: map,
                title: name,
                icon: 'marker-b.png'
            });

            infoBubble = new InfoBubble({
              map: map,
              content: name,
              position: new google.maps.LatLng(dataA[count].latitud, dataA[count].longitud),
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
              shadowStyle:0,
            });

            infoBubble.open();

        }      
    }
} 
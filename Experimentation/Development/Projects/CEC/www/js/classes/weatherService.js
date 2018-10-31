
var weatherService = (function() {

	/******************/

	/*   Variables   */ 

	/******************/

	var $temperature = $('.temperature'),
		$dateTime = $('.dateTime'),
		$weatherDescription = $('.weatherDescription'),
		date = new Date(),
		getHours = date.getHours(),
		getMinutes = date.getMinutes();


	
	/******************/

	/* Initialize App */ 

	/******************/

	function init() {
		callWeather();
	}


	/*********************/

	/* General Functions */

	/*********************/

	function callWeather() {

		var $getWeather = $.get('https://ws.smn.gob.ar/map_items/weather').done(function(weatherObject) {

			for (i = 0; i < weatherObject.length; i++) {
				
				if (weatherObject[i].name === 'Capital Federal' && weatherObject[i].province === 'Capital Federal') {

					var weatherId = weatherObject[i].weather.id;
				
					var weekday = new Array(7);
						weekday[0] =  "Domingo";
						weekday[1] = "Lunes";
						weekday[2] = "Martes";
						weekday[3] = "Miércoles";
						weekday[4] = "Jueves";
						weekday[5] = "Viernes";
						weekday[6] = "Sábado";

					var day = weekday[date.getDay()];

					$temperature.append(weatherObject[i].weather.tempDesc);
					$weatherDescription.append(weatherObject[i].weather.description);
					$dateTime.append(day + ' ' + getHours + ':' + getMinutes + 'hs.');


					if (weatherId === 0 || weatherId === 1) {
						/* Sunny */
						$('.soleado').addClass('show');
					} else if (weatherId === 10 || weatherId === 12 || weatherId === 20 || weatherId === 9 || weatherId === 16) {
						/* Cloudy */
						$('.nublado').addClass('show');
					} else if (weatherId === 19) {
						/* Windy */
						$('.viento').addClass('show');
					} else if (weatherId === 3 || weatherId === 13 || weatherId === 6 || weatherId === 11) {
						/* Rain */
						$('.lluvia').addClass('show');
					} else if (weatherId === 4 || weatherId === 17) {
						/* Thunderstorm */
						$('.tormenta_electrica').addClass('show');
					} else if (weatherId === 5 || weatherId === 7 ) {
						/* Snow */
						$('.nieve').addClass('show');
					} else if (weatherId === 14) {
						/* Storm */
						$('.lluvia').addClass('show');
					} else if (weatherId === 2 || weatherId === 15 || weatherId === 8 || weatherId === 18) {
						/* Cloudy width Sun */
						$('.parcialmente_soleado').addClass('show');
					}



					/*
					-	if(id==0)       { return "wi-day-sunny";}
		            -   if(id==1)       { return "wi-day-sunny-overcast";}
		            -   if(id==2)       { return "wi-day-cloudy-high";}
		            -   if(id==3)       { return "wi-rain";}
		            -   if(id==5)       { return "wi-snowflake-cold";}
		            -   if(id==7)       { return "wi-snow";}
		                if(id==8)       { return "wi-cloud-up";}
		                if(id==9)       { return "wi-cloud-down";}
		            -   if(id==4)       { return "wi-thunderstorm";}
		            -   if(id==10)      { return "wi-cloudy";}
		            -   if(id==11)      { return "wi-day-sleet";}
		            -   if(id==13)      { return "wi-rain-mix";}
		            -   if(id==12)      { return "wi-day-cloudy";}
		            -   if(id==6)       { return "wi-sleet";}
		            -   if(id==14)      { return "wi-day-sleet-storm";}
		            -   if(id==15)      { return "wi-day-cloudy-high";}
		                if(id==16)      { return "wi-cloud-down";}
		            -   if(id==17)      { return "wi-day-snow-thunderstorm";}
		                if(id==18)      { return "wi-cloud-up";}
		            -   if(id==19)      { return "wi-strong-wind";}
		            -   if(id==20)      { return "wi-cloudy-gusts";}
	                */
				}
			}

		});
	}


	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

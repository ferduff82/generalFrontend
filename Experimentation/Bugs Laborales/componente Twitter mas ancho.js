var checkContents = setInterval(function(){
    if ($("#twitter-widget-0").length > 0){ 
    	$("#twitter-widget-0").contents().find(".timeline").css("max-width","100%"); //contents() busca dentro de un iFrame
    	setTimeout(function () {
	    	clearInterval(checkContents); // limpia el intervalo a los 10 segundos
	    }, 10000);
    }
},1000);
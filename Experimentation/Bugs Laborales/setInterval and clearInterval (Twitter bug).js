var checkContents = setInterval(function(){
    if ($("#twitter-widget-0").length > 0){ 
    	$("#twitter-widget-0").contents().find(".timeline").css("max-width","100%");
    	console.log("Twitter feed change");
    	setTimeout(function () {
	    	clearInterval(checkContents);
	    }, 10000);
    }
},1000);

var loadHeaderAndFooter = (function() {

	
	/******************/

	/* Initialize App */ 

	/******************/

	function init() {		
		
		var promise = new Promise(function(resolve, reject) {
		  	resolve($.when( appendHeader(), appendFooter(), appendMenu() ).done(function() {}));
		});
		return promise;
	}

	/*********************/

	/* General Functions */

	/*********************/

	function appendHeader() {
		var $getHeader = $('.headerTemplate');
		var $displayHeader = $.get('../templates/header.html', function(template, textStatus, jqXhr) {
            $getHeader.replaceWith(Mustache.render($(template).html()));
        })
		return $displayHeader;
	}

	function appendFooter() {
		var $getFooter = $('.footerTemplate');
		var $displayFooter = $.get('../templates/footer.html', function(template, textStatus, jqXhr) {
            $getFooter.replaceWith(Mustache.render($(template).html()));
        })
		return $displayFooter;
	}

	function appendMenu() {
		var $getFooter = $('.menu');
		var $displayFooter = $.get('../templates/menu.html', function(template, textStatus, jqXhr) {
            $getFooter.append(Mustache.render($(template).html()));
        })
		return $displayFooter;
	}

	/********************/

	/* Public Functions */

	/********************/

	return {
        init: init,
    };
	

})();

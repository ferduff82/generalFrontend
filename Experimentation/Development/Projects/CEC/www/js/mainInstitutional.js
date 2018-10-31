
var cecAppInstitutional = (function() {



	/******************/

	/*   Variables   */ 

	/******************/

	var getDocumentWidth = $('body').innerWidth(),
		getFullScreen = $('.plane-container').find('.full-screen');
	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {

		var promiseFinished = loadHeaderAndFooter.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});
  		getFullScreen.click(function() {
  			modalDisplay.init($(this));
  		})
  		sliderClass.init('.slider-a');
		scrollTop.init();
		adjustStylesTranslator.init();
		animationsVisible();
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
			$.get('../templates/translator.html', function(template) {
	            $('.translate-mobile').append(template);
	        })		
		} else {
			$.get('../templates/translator.html', function(template) {
	            $('.translate-desktop').append(template);
	        })	
		}
	}

	function animationsVisible() {

		var $el = $('.text-sustain-container'),
			$sun = $('#animation-a'),
			$window = $('#animation-b'),
			$tree = $('#animation-c'),
			$cloud = $('#animation-d'),
			animationDone = false;

		$.fn.isInViewport = function() {
			var elementTop = $(this).offset().top;
			var elementBottom = elementTop + $(this).outerHeight();
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();
			return elementBottom > viewportTop && elementTop < viewportBottom;
		};

		function viewable(context) { 
			if (context.isInViewport(true) && animationDone === false) {
	            animations.init('all');
	            animationDone = true;
	        };
		}	

		$(window).scroll(function() {
		    viewable($el);
		});
		$(window).blur(function() {
		    viewable($el);
		});

		$sun.hover(function() {
			$(this).empty();
			animations.init('sun');
		})
		$window.hover(function() {
			$(this).empty();
			animations.init('window');
		})
		$tree.hover(function() {
			$(this).empty();
			animations.init('tree');
		})
		$cloud.hover(function() {
			$(this).empty();
			animations.init('cloud');
		})
	}



	/********************/

	/* Public Functions */

	/********************/

	return {
        initialize: initialize,
    };
	

})();

cecAppInstitutional.initialize();

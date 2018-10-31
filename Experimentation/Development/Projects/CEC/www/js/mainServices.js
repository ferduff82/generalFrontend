
var cecAppServices = (function() {



	/******************/

	/*   Variables   */ 

	/******************/

	var getDocumentWidth = $('body').innerWidth(),
		getFullScreen = $('.slide-container').find('.full-screen');

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		var promiseFinished = loadHeaderAndFooter.init();
		adjustStylesTranslator.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});
  		getFullScreen.click(function() {
  			modalDisplay.init($(this));
  		})
		sliderClass.init('.slider-a');
		sliderClass.init('.slider-b');
		sliderClass.init('.slider-c');
		scrollTop.init();
		storeProviders();
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

	function storeProviders() {

		var storeProviders = [],
			getPushSuppliers = $('.push-suppliers');

		$('.show-all-services').on('click', function() {
			$('.all-services').toggleClass('show');
			$('.arrow-image').toggleClass('rotateArrow');
		})

		$('.all-services').on( 'click', 'li', function() {

			var getName = $(this).find('.service-provider').attr('data-provider'),
				
				serviceAddedFlag = true;

			if (getName === 'alltypes') {
				storeProviders = [];
				$('.all-services').find('.service-provider').each(function() {
					var getEachService = $(this).attr('data-provider');
					if (getEachService !== 'alltypes') {
						storeProviders.push(getEachService);
					}
				})
			} else {
				for (i = 0; i < storeProviders.length; i++) { 
					if (storeProviders[i] === getName) {
						storeProviders.splice([i], 1);
						serviceAddedFlag = false;
						break;
					} 
				}
				if (serviceAddedFlag) {
					storeProviders.push(getName);
				}
			}
			refreshSuppliers();
		})

		$('.push-suppliers').on( 'click', '.push', function() {

			var getText = $(this).text();

			for (i = 0; i < storeProviders.length; i++) { 
				if (storeProviders[i] === getText) {
					storeProviders.splice([i], 1);
					serviceAddedFlag = false;
					break;
				} 
			}
			refreshSuppliers();
		})

		function refreshSuppliers() {
			getPushSuppliers.empty();
			for (i = 0; i < storeProviders.length; i++) { 
				getPushSuppliers.append('<div class="push">' + storeProviders[i] + '</div>')
			}
		}
	}


	/********************/

	/* Public Functions */

	/********************/

	return {
        initialize: initialize,
    };
	

})();

cecAppServices.initialize();

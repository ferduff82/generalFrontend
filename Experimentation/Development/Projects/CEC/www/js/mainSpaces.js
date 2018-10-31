
var cecAppSpaces = (function() {



	/******************/

	/*   Variables   */ 

	/******************/
	var plenarySelect = $('.plenary'),
		vipSelect = $('.vip'),
		auxiliarSelect = $('.auxiliar'),
		plenaryModule = $('.plenary-data-display'),
		vipModule = $('.vip-data-display'),
		auxiliarModule = $('.auxiliar-data-display'),
		closeButton = $('.close-display');

	var getDocumentWidth = $('body').innerWidth();

	/* Map Logic*/

	var dataMutate = [],
		hallSelect = '',
		globalParent;

	
	/******************/

	/* Initialize App */ 

	/******************/

	function initialize() {
		var promiseFinished = loadHeaderAndFooter.init();
		adjustStylesTranslator.init();

		promiseFinished.then(function() {
  			menuDisplay.init(); 
  		});


  		/***************/

		/* Bind Events */

		/***************/

		plenarySelect.click(function () {
			showPlenaryData($(this));
			hallSelect = 'plenaria';
		})

		vipSelect.click(function () {
			showVipData($(this));
			hallSelect = 'vip';
		})

		auxiliarSelect.click(function () {
			showAuxiliarData($(this));
			hallSelect = 'auxiliar';
		})

		closeButton.click(function () {
			clearAllDisplay();
		})
		appendTranslator();
		getMapData();
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

	/* Lógica del plano */

	function getMapData() {
		$.get('../services/spaces.json', function(data) {
            dataMap = data;
        })	
	}

	function showPlenaryData(context) {
		var getHallType = context.attr('data-hall');
		displayElements(context, plenaryModule, 'highlightBlue');
	}	

	function showVipData(context) {
		var getHallType = context.attr('data-hall');
		displayElements(context, vipModule, 'highlightGreen');
	}

	function showAuxiliarData(context) {
		var getHallType = context.attr('data-hall');
		displayElements(context, auxiliarModule, 'highlightYellow');
	}

	/* Crear lógica de módulo */

	function displayElements(context, module, highlight) {

		context.toggleClass(highlight);

		var getHall = context.attr('data-hall'),
			getContextParent = context.parent(),
			getParentClassName = getContextParent.attr('class'),
			getServiceObject = dataMap[getParentClassName][getHall],
			isActive = context.hasClass(highlight);

		if (globalParent !== getContextParent.attr('class')) {
			dataMutate = [];
		} 

		globalParent = getContextParent.attr('class');

		if (isActive) {
			dataMutate.push(getServiceObject);
		} else {
			for (i = 0; i < dataMutate.length; i++) { 
				if (getHall === dataMutate[i].containerName) {
					dataMutate.splice([i], 1);
				}
			}
		}
		removeModules();
		mapDataModule(getContextParent, module);
		clearOtherHighlights(context);
	}

	function mapDataModule(context, module) {

		var getHallModule = context.find('.general-hall-data'),
			getDataPlus = dataCombined();

		if (dataMutate.length !== 0) {
			getHallModule.find('.data-title').html(getDataPlus.hall);
			getHallModule.find('.display-size').html(getDataPlus.size);
			getHallModule.find('.display-subsuelo').html(getDataPlus.subsuelo);
			getHallModule.find('.display-measures').html(getDataPlus.measures);
			getHallModule.find('.display-auditoro').html(getDataPlus.auditorio);
			getHallModule.find('.display-banquete-con').html(getDataPlus.banqueteCon);
			getHallModule.find('.display-banquete-sin').html(getDataPlus.banqueteSin);
			getHallModule.find('.display-school').html(getDataPlus.escuela);
			getHallModule.find('.display-coctel').html(getDataPlus.coctel);
			module.addClass('show');
		} else {
			getHallModule.removeClass('show');
		}
	}

	function dataCombined() {

		var size = 0,
			measures = [],
			measureValue = [] ,
			sumMeasures = [0,0,0],
			measurePluse = ' x ',
			finalMeasure,
			auditorio = 0,
			banqueteCon = 0,
			banqueteSin = 0,
			escuela = 0,
			coctel = 0,
			floor = 0,
			hallPlus = dataMutate.length > 1 ? ' + ' : '',
			hallArray = [],
			hall;

		for (i = 0; i < dataMutate.length; i++) { 
			size = parseInt(dataMutate[i].size) + size;
			auditorio = parseInt(dataMutate[i].auditorio) + auditorio;
			banqueteCon = parseInt(dataMutate[i].banqueteCon) + banqueteCon;
			banqueteSin = parseInt(dataMutate[i].banqueteSin) + banqueteSin;
			escuela = parseInt(dataMutate[i].escuela) + escuela;
			coctel = parseInt(dataMutate[i].coctel) + coctel;
			hallArray.push(dataMutate[i].hall);
			measures.push(dataMutate[i].measures);
		}

		var hallArraySorted = hallArray.sort(function(a, b) { return a > b });

		for (i = 0; i < hallArraySorted.length; i++) { 
			hallPlus = i + 1 === hallArraySorted.length ? '' : hallPlus;
			hall = hall !== undefined ? hall : '';
			hall = hall + hallArraySorted[i] + hallPlus;
		}

		Array.prototype.SumItem = function (arr) {
			var sum = [],
				that = this;

			if (hallSelect === 'plenaria') {
				sumArray(1);
			} else if (hallSelect === 'auxiliar') {
				sumArray(0);
			} else {
				sumArray(0);
			}
			function sumArray(value) {
				for (var i = 0; i < that.length; i++) {
					if (i === value) {
						sum.push(that[i] + arr[i]);
					} else {
						sum.push(that[i]);
					}					
				}	
			}
		    return sum;
		}

		for (i = 0; i < measures.length; i++) { 
			var eachArray = measures[i];
			sumMeasures = eachArray.SumItem(sumMeasures);
			measureValue = sumMeasures;
		}

		for (i = 0; i < measureValue.length; i++) { 
			measurePluse = i + 1 === measureValue.length ? '' : measurePluse;
			finalMeasure = finalMeasure !== undefined ? finalMeasure : '';
			finalMeasure = finalMeasure + measureValue[i] + measurePluse;
		}

		return {
			floor : dataMutate.floor,
			size : size,
			measures : finalMeasure,
			auditorio : auditorio,
			banqueteCon : banqueteCon,
			banqueteSin : banqueteSin,
			escuela : escuela,
			coctel : coctel,
			hall : hall
		}
	} 

	/* Lógica Visual */

	function removeModules() {
		plenaryModule.removeClass('show');
		vipModule.removeClass('show');
		auxiliarModule.removeClass('show');
	}

	function clearAllDisplay() {
		plenaryModule.removeClass('show');
		vipModule.removeClass('show');
		auxiliarModule.removeClass('show');
		plenarySelect.removeClass('highlightBlue');
		vipSelect.removeClass('highlightGreen');
		auxiliarSelect.removeClass('highlightYellow');
		dataMutate = [];
	}

	function clearOtherHighlights(context) {
		context.parent().siblings().find('div').removeClass('highlightYellow');
		context.parent().siblings().find('div').removeClass('highlightGreen');
		context.parent().siblings().find('div').removeClass('highlightBlue');
	}



	if (getDocumentWidth < 768) {
		alert('Para ver correctamente esta página, le sugerimos rotar su dispositivo.');	
	}

	/********************/

	/* Public Functions */

	/********************/

	return {
        initialize: initialize,
    };
	

})();

cecAppSpaces.initialize();

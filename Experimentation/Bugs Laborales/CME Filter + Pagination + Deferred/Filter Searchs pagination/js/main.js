(function($j){

	'use strict';

	$j(document).ready(function(){

		var filtersData = [],
			storeDomEl = [],
			searchFilterSelected = "#cmeSearchFiltersSelected",
			getRows = $j("#cmeSearchFilterResults tr"),
			firstLoad = ".cmeSearchFilter:first h4",
			setFirstLoad = false,
			pageTotal,
			pageNumber;

		function filterClass(filterName, filter, filterDataName) {
			this.filterName = filterName;
			this.filter = (filter) ? filter.replace(/ /g,'') : filter;
			this.filterDataName = filterDataName;
		}

		execOnLoad();

		$j("#cmeSearchFilters").on("click", ".cmeSearchFilter h4", function() {
			var paramSlide = $j(this);
			showList(paramSlide);
		})

		$j(".cmeSearchFilter li").on("click", function() {

			var	filterName = $j(this).parents(".cmeSearchFilter").find("h4").text(),
				filterText = $j(this).attr("data-filter"),
				filterDataName = $j(this).find("label").text();

			if ($j(this).hasClass("cmeCheckboxSelectAll")) {
				if (!$j(this).hasClass("checked")) {
					$j(this).siblings().each(function() {
						if (!$j(this).hasClass("checked")) {
							var	filterNameAll = $j(this).parents(".cmeSearchFilter").find("h4").text(),
								filterTextAll = $j(this).attr("data-filter"),
								filterDataNameAll = $j(this).find("label").text();
							pushData(filterNameAll,filterTextAll,filterDataNameAll);
						}
					})
					$j(this).siblings().removeClass("checked");
					$j(this).siblings().toggleClass("checked");
				} else {
					$j(this).siblings().each(function() {
						var removeNode = $j(this).find("label").text();
						removeFilter(removeNode);
					})
					$j(this).siblings().removeClass("checked");
					getStatusFunctions();
				}
			} else if ($j(this).parent().hasClass("cmeRadio")) {
				var removePrevious = $j(this).parent().find(".checked").text();
				if (!$j(this).hasClass("checked")) {
					if (removePrevious) {
						removeFilter(removePrevious);	
					}
					$j(this).siblings().removeClass("checked");
					pushData(filterName,filterText,filterDataName);
				}
				$j(this).addClass("checked");
			} else {
				if (!$j(this).hasClass("checked")) {
					pushData(filterName,filterText,filterDataName);
				}
				$j(this).toggleClass("checked");
				if (!$j(this).hasClass("checked")) {
					removeFilter(filterDataName);		
				}
			}
			activateSelectAll();
		})

		$j(".cmeSearchFilterReset").on("click", function() {
			$j("#cmeSearchFilterControls li").removeClass("checked");
			filtersData = [];
			getStatusFunctions();
		})

		function execOnLoad() {
			pagination();
			getTableImage();
			readUrlParams();
			activateSelectAll();
			determineRadio();
		}

		function getStatusFunctions() {
			sendUrlParams();
			showListOfFilters();
			filterTable();
			fixRepeteadRows();
			pagination();
		}

		function showList(parameterSlide) {
			$j(parameterSlide).next().slideToggle("slow", function() {
				$j(this).parent().toggleClass("cmeSearchFilterOpen");
				$j(this).parent().children("h4").toggleClass("cmeIcon-down-dir");
				$j(this).parent().children("h4").toggleClass("cmeIcon-right-dir");
			})
		}

		function getTableImage() {
			getRows.each(function(){

				var that = $j(this).html(),
					dataFilter = $j(this).attr("data-filter");
					dataFilter = (dataFilter) ? dataFilter.replace(/ /g,'') : dataFilter;

				storeDomEl.push("<tr data-filter='" + dataFilter + "'>" + that.toString() + "</tr>");
			}); 
		}

		function determineRadio() {
			$j(".cmeSearchFilter").each(function(){

				var selectUl = $j(this).find("ul"),
					getRadio = selectUl.hasClass("cmeRadio");
				
				if (getRadio) {
					selectUl.find(".cmeCheckboxSelectAll").remove();
				} 
			})
		}

		function activateSelectAll() {

			$j(".cmeSearchFilter").each(function(){

				var selectAll = $j(this).find(".cmeCheckboxSelectAll"),
					setSelectAllValue = [],
					addSelectAll = true;

				$j(this).find("li").not(".cmeCheckboxSelectAll").each(function(){
					var determinClass = $j(this).hasClass("checked");
					if (determinClass == true) {
						setSelectAllValue.push(true);
					} else {
						setSelectAllValue.push(false);
					}
					for (var i = 0; i < setSelectAllValue.length; i++) {
						if (setSelectAllValue[i] == false) {
							addSelectAll = false;
							break;
						}
					}
				})
				if (addSelectAll) {
					selectAll.addClass("checked");
				} else {
					selectAll.removeClass("checked");
				}
			})
		}

		function pushData(filterName, filterText, filterDataName) {

			var newClass = new filterClass(filterName,filterText,filterDataName);

			filtersData.unshift(newClass);
			filtersData.sort(function (a, b) {
				if (a.filter && b.filter) {
					if (a.filter.length > b.filter.length) { return 1; }
					if (a.filter.length < b.filter.length) { return -1; }
					return 0;
				}
			});
			getStatusFunctions();
		}

		function removeFilter(dataValue) {

			var dataValue = dataValue.replace(/ /g,'');

			for (var i = 0; i < filtersData.length; i++) {
				var dataName = filtersData[i].filterDataName;
					dataName = dataName.replace(/ /g,'');
				if (dataName == dataValue) {
					filtersData.splice(i,1);
				}
			}
			getStatusFunctions();
		}

		function sendUrlParams() {		

			var getUrl = window.location.href,
				addAmp = (getUrl.indexOf('?') > -1) ? addAmp = "&" : addAmp = "",
				stringURL = "?";	

			for (var i = 0; i < filtersData.length; i++) {

				var getN = filtersData[i].filterName,
					getF = filtersData[i].filter,
					getD = filtersData[i].filterDataName,
					getFiltername = (getN.indexOf('&') > -1) ? getN.replace('&','@') : getN,
					getFilter = (getF.indexOf('&') > -1) ? getF.replace('&','@') : getF,
					getFilterData = (getD.indexOf('&') > -1) ? getD.replace('&','@') : getD;

				stringURL = stringURL + "fn=" +
							getFiltername + "&ft=" + 
							getFilter + "&fd=" + 
							getFilterData + addAmp;
			}
			if (addAmp != "") {
				stringURL = stringURL.slice(0, -1);
			}
			window.location.hash = stringURL;
		}

		function readUrlParams() {

			var storeUrlData = [],
				slideDown = [],
				searchString = window.location.href.substring(1),
				paramExists = searchString.split('?'),
				cqDisplayActive = "wcmmode=disabled#",
				variableArray = searchString.split('=');

		    for(var i = 1; i < variableArray.length; i++){
		        var KeyValuePair = variableArray[i].split('&');
		        storeUrlData.push(KeyValuePair[0]);
		    }
		    for(var i = 0; i < storeUrlData.length; i++) {
		    	$j(".cmeSearchFilter li label").each(function(){
		    		var getTextLi = $j(this).text();
		    		if (getTextLi == storeUrlData[i]) {
		    			var getCheckboxContainer = storeUrlData[i - 2],
		    				getParentContainer = $j(this).parents(".cmeSearchFilter").find("h4").text();
		    			if (getCheckboxContainer == getParentContainer) {
		    				$j(this).parent().addClass("checked");
		    			}		    			
		    		}
		    	})
		    	$j(".cmeSearchFilter label").each(function(){

		    		var labels = $j(this).text(),
		    			getTitle = $j(this).parents(".cmeSearchFilter").find("h4"),
		    			valueExists = slideDown.indexOf(storeUrlData[i - 2]),
		    			getTilteText = getTitle.text();

		    		if (labels == storeUrlData[i] && getTilteText == storeUrlData[i - 2]) {
		    			if (valueExists == -1) {
		    				showList(getTitle);
		    			}
		    			slideDown.push(storeUrlData[i - 2]);
		    		}
		    	})
		    }
		    $j(".cmeSearchFilter li").each(function(){
				var getAnyChecked = $j(this).hasClass("checked");
				if (getAnyChecked) {
					setFirstLoad = true;
				}
			})
			if (setFirstLoad == false && paramExists.length < 3 || setFirstLoad == false && paramExists[1] == cqDisplayActive) {
				showList(firstLoad);
			};
	    	$j("#cmeSearchFilters li.checked").each(function(){

	    		var filterNameUrl = $j(this).parents(".cmeSearchFilter").find("h4").text(),
	    			filterTextUrl = $j(this).attr("data-filter"),
	    			filterDataNameUrl = $j(this).find("label").text();

	    		pushData(filterNameUrl, filterTextUrl, filterDataNameUrl);
	    	})
		}

		function showListOfFilters() {

			var showAllLi = $j("#cmeSearchFiltersSelected .show");

			if (filtersData.length > 0) {
				$j(searchFilterSelected).css("display","block");
				$j("#cmeSearchFiltersLabel").css("display","block");
				$j(searchFilterSelected + " ul").empty();
				for (var i = 0; i < filtersData.length; i++) {
					$j(searchFilterSelected + " ul").append("<li data-name=" + filtersData[i].filter + ">" + filtersData[i].filterDataName + "</li>");
				}
				$j(searchFilterSelected + " li").on("click", function() {
					var filterText = $j(this).text(),
						dataValue = $j(this).attr("data-name");
					$j(".cmeSearchFilter li").each(function() {
						if ($j(this).text() === filterText){
							$j(this).removeClass("checked");
						}
					})
					removeFilter(filterText);
					activateSelectAll();
				})
				if (filtersData.length > 4){
					$j(searchFilterSelected + " ul li").each(function(index) {
					  	if (index > 3) {
					  		$j(this).css("display","none");
					  	}
					});
					showAllLi.remove();
					$j("#cmeSearchFiltersSelected").append("<div id='showAllFilters' class='show'>Show all "+ filtersData.length +" active filters</div>");
					showAllLi.css({"display": "inline-block", "width": "100%"});
					$j(searchFilterSelected + " #showAllFilters").on("click", function() {
						$j(searchFilterSelected + " ul li").each(function() {
							$j(this).css("display","block");
						})
						$j(this).remove();
					})
				} else {
					showAllLi.remove();
				}
			} else {
				$j(searchFilterSelected + " ul").empty();
				$j(searchFilterSelected).css("display","none");
				$j("#cmeSearchFiltersLabel").css("display","none");
			}
		}

		function pagination() {

			var brokersList = $j("#cmeSearchFilterResults tr"),
				wrapper = $j("#cmeSearchFilterResults"),
				paginationWrapper = $j(".cmePaginationWrapper"),
				brokersLength = brokersList.length,
				maxVisibility = 4,
				definedLength = 12,
				increaseLength = 0,
				calc = Math.ceil(brokersLength / definedLength),
				setLength = definedLength;
			
			if (brokersLength > definedLength) {

				paginationWrapper.each(function(){
					$j(this).find("li").removeClass("disabled");
					$j(this).find("a").removeClass("disabledPageMenu");
				})

				for (var i = 0; i < calc; i++) {
					var setClass = (i === 0) ? "active" : "" ;
					brokersList.each(function() {
						var that = this,
							brokerValue = $j(that).index();
						if ((brokerValue <= definedLength - 1) && (brokerValue >= increaseLength)) {
							$j(that).attr('class', '');
							$j(that).addClass("num" + i + "");
							wrapper.append(that);
							if (i > 0) { $j(that).css("display","none"); }
						}
					})
					definedLength = definedLength + setLength;
					increaseLength = increaseLength + setLength;
				} 		
				$j('.page_top,.page_bottom').bootpag({
				    total: calc,
				    page: 1,
				    maxVisible: maxVisibility,
				    leaps: true,
				    firstLastUse: true,
				    first: '«',
				    last: '»',
				    wrapClass: 'pagination',
				    activeClass: 'active',
				    disabledClass: 'disabled',
				    nextClass: 'next',
				    prevClass: 'prev',
				    lastClass: 'last',
				    firstClass: 'first'
				}).on("page", function(event, num){

					var numReduced = num - 1,
						wrapperBlock = wrapper.find(".num" + numReduced),
						getLiLength = $j(".pagination li").length,
						removeArrowsLength = (getLiLength / 2) - 4,
						getFirstPosition = $j(".pagination li:nth-child(3)").attr("data-lp");

					brokersList.css("display","none");	
					wrapperBlock.css("display","table-row");
					for (var i = 0; i < removeArrowsLength; i++) {
						var iIncreased = i + 3,
							textIncreased = i + 1;
							if (getFirstPosition > 1) {
								var increasedPageValue = getFirstPosition++;
							} else {
								var increasedPageValue = textIncreased
							}
						$j(".pagination li:nth-child(" + iIncreased + ")").find("a").text(increasedPageValue);
					}
					$j(".pagination li.active").find("a").text(num + " of " + calc);
				}); 
				$j(".pagination").css("float","right");
				$j(".pagination li.active").find("a").text("1 of " + calc);
			} else {
				paginationWrapper.each(function(){
					$j(this).find("li").addClass("disabled");
					$j(this).find("a").addClass("disabledPageMenu");
				})
			}
		}

		function filterTable() {

			var tableSelect = $j("#cmeSearchFilterResults tbody");
				tableSelect.empty();
			var rowExists = [];

			if (filtersData.length) {		
				for (var i = 0; i < filtersData.length; i++) {
					var getFilterData = filtersData[i].filter;
					appendFromFilter(getFilterData);
				}
				function appendFromFilter(getFilterData) {

					var filterExists = $j("#cmeSearchFilterResults").find("[data-filter='" + getFilterData + "']").length;

					for (var i = 0; i < storeDomEl.length; i++) {
						var getStoreValue = storeDomEl[i];
						if (!(filterExists > 0)) {
							if (getStoreValue.indexOf(getFilterData) > -1) {
								tableSelect.append(getStoreValue);
							} 
						}
					}
				}
			} else {
				for (var i = 0; i < storeDomEl.length; i++) {
					var getStoreValue = storeDomEl[i];
						tableSelect.append(getStoreValue);
				}
			}				
			$j("#cmeSearchFilterResults tbody:empty").text("No data available to display.");
		}

		function fixRepeteadRows() {

			var obj = {};

			$j('#cmeSearchFilterResults *[data-filter]').each(function(){
			    var text = $j.trim($j(this).text());
			    if(obj[text]){
			        $j(this).remove();
			    } else {
			        obj[text] = true;
			    }
			})
		} 

	})
})($.noConflict())
(function($j){

	$j(document).ready(function(){

		var filtersData = [],
			storeDomEl = [],
			searchFilterSelected = "#cmeSearchFiltersSelected",
			getRows = $j("#cmeSearchFilterResults tr"),
			searchInput = $j(".searchDataComponent"),
			firstLoad = ".cmeSearchFilter:first h4",
			setFirstLoad = false,
			toggleMobileFilter = false,
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
			searchInput.val("");
			activateSelectAll();
		})

		$j("#btnSearchFilterButton, #btnSearchFilterConfirmBottom").on("click", function() {
			if (toggleMobileFilter == false) {
				activateMobileFilter();
			} else {
				removeMobileFilter();
			}
		})

		searchInput.on("keydown", function search(e) {
			var getSearchValue = $j(this).val();
		    if (e.keyCode == 13) {
		        callService(getSearchValue);
		        sendUrlParams(getSearchValue);
		    }
		});

		$j(".cmeSearchFilterReset").on("click", function() {
			clearAll();
		})

		$j("#btnSearchFilterCancelBottom").on("click", function() {
			clearAll();
			removeMobileFilter();
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

		function clearAll() {
			$j("#cmeSearchFilterControls li").removeClass("checked");
			filtersData = [];
			getStatusFunctions();
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

		function showResultsNumber() {
			var getRowsLength = $j("#cmeSearchFilterResults tr").length;
			$j("#cmeSearchFilterResultsMessage, #cmeSearchFilterBottomResults").find("span").html(getRowsLength);
		}

		function emptyResearch() {
			$j("#cmeSearchFilterResults tbody:empty")
				.append("<li class='emptySearch'><strong>No results found.</strong> There are no brokers which meet your selection criteria.</li>");
		}

		function activateMobileFilter() {
			toggleMobileFilter = true;
			$j("#cmeSearchFilterControls").removeClass("hidden").addClass("show");
			$j("#btnSearchFilterButton").addClass("btnSearchFilterButtonClass");
			$j("#cmeSearchFilterResetTop").addClass("cmeSearchFilterResetTopClass");
			$j("#btnSearchFilterCancelBottom").css("display","inline-block");
			$j("#cmeSearchFilterRight").css("display","none");
			$j(".cmeFooter").css("display","none");
		}

		function removeMobileFilter() {
			toggleMobileFilter = false;
			$j("#cmeSearchFilterControls").removeClass("show").addClass("hidden");
			$j("#btnSearchFilterButton").removeClass("btnSearchFilterButtonClass");
			$j("#cmeSearchFilterResetTop").removeClass("cmeSearchFilterResetTopClass");
			$j("#btnSearchFilterCancelBottom").css("display","none");
			$j("#cmeSearchFilterRight").css("display","block");
			$j(".cmeFooter").css("display","block");
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

		function sendUrlParams(isSearch) {

			var getUrl = window.location.href,
				addAmp = (getUrl.indexOf('#') > -1) ? addAmp = "#" : addAmp = "",
				stringURL = "#";	

			if (isSearch) {
				stringURL = stringURL + "search=" + isSearch + addAmp;
			} else {
				for (var i = 0; i < filtersData.length; i++) {
					stringURL = stringURL + 
								filtersData[i].filterName + "#" +
								filtersData[i].filter + "#" +
								filtersData[i].filterDataName + addAmp;
				}	
			}
			if (addAmp != "") {
				stringURL = stringURL.slice(0, -1);
			}
			window.location.hash = stringURL;
		}

		function readUrlParams() {

			var storeUrlData = [],
				slideDown = [],
				cqDisplayActive = "wcmmode=disabled#",
				searchString = window.location.href.substring(1),
				paramExists = searchString.split('#'),
				getFirstSearch = paramExists[1],
				searchUse = (getFirstSearch) ? getFirstSearch.search("search") : -1;

			if (searchUse > -1) {
				var splitDataSearch = getFirstSearch.split('=');
					getDataSearch = splitDataSearch[1];
				searchInput.val(getDataSearch);
				callService(getDataSearch);
			}
		    for(var i = 1; i < paramExists.length; i++){
		        storeUrlData.push(paramExists[i]);
		    }
		    for(var i = 0; i < storeUrlData.length; i++) {
		    	$j(".cmeSearchFilter li label").each(function(){
		    		var getTextLi = $j(this).text();
		    			decodeUri = decodeURI(storeUrlData[i]),
		    			decodedLessTwo = decodeURI(storeUrlData[i - 2]);
		    		if (getTextLi == decodeUri) {
		    			var getCheckboxContainer = decodedLessTwo,
		    				getParentContainer = $j(this).parents(".cmeSearchFilter").find("h4").text();
		    			if (getCheckboxContainer == getParentContainer) {
		    				$j(this).parent().addClass("checked");
		    			}		    			
		    		}
		    	})
		    	$j(".cmeSearchFilter label").each(function(){
		    		var labels = $j(this).text(),
		    			getTitle = $j(this).parents(".cmeSearchFilter").find("h4"),
		    			valueExists = slideDown.indexOf(decodedLessTwo),
		    			getTilteText = getTitle.text();
		    		if (labels == decodeUri && getTilteText == decodedLessTwo) {
		    			if (valueExists == -1) {
		    				showList(getTitle);
		    			}
		    			slideDown.push(decodedLessTwo);
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

			var showAllLi = $j("#cmeSearchFiltersSelected .show"),
				getWidth = window.innerWidth;

			if (filtersData.length > 0) {
				$j(searchFilterSelected).css("display","block");
				$j("#cmeSearchFiltersLabel").css("display","block");
				$j(searchFilterSelected + " ul").empty();
				for (var i = 0; i < filtersData.length; i++) {
					$j(searchFilterSelected + " ul")
						.append("<li data-name=" + filtersData[i].filter + ">" + filtersData[i].filterDataName + "</li>");
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
					$j("#cmeSearchFiltersSelected")
						.append("<div id='showAllFilters' class='show'>Show all "+ filtersData.length +" active filters</div>");
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
				if (getWidth < 980) {
					console.log("entra");
					$j(searchFilterSelected).css("display","none");
					$j("#cmeSearchFiltersLabel").css("display","none");
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
			showResultsNumber();
		}

		function filterTable() {

			var tableSelect = $j("#cmeSearchFilterResults tbody");
				tableSelect.empty();
			var rowExists = [];

			if (filtersData.length) {		
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
				for (var i = 0; i < filtersData.length; i++) {
					var getFilterData = filtersData[i].filter;
					appendFromFilter(getFilterData);
				}
			} else {
				for (var i = 0; i < storeDomEl.length; i++) {
					var getStoreValue = storeDomEl[i];
						tableSelect.append(getStoreValue);
				}
			}				
			emptyResearch();
		}

		function callService(getValue) {

			var tableContent = $j("#cmeSearchFilterResults tbody");
				tableContent
					.append("<div class='cmeProgressPanel'>Processing...</div>");

			clearAll();

			var promise = $j.ajax({ url: tableService.url, data: { search: getValue } });
				promise.done(function(data) {
					var selectRow = 1;
					tableContent.empty();
					function getDataColumns(columns) {
						for (var i = 0; i < columns.length; i++) {
							$j("#cmeSearchFilterResults tbody tr:nth-child(" + selectRow + ")")
								.append("<td class='vcard column'><div class='vcard'>" + columns[i].content + "</div></td>");
						}
						selectRow++
					}
					for (var i = 0; i < data.results.length; i++) {
						var columns = data.results[i].columns;
						tableContent
							.append("<tr data-filter='" + data.results[i].dataFilterValue + "'></tr>");
						getDataColumns(columns);
					}
					emptyResearch();
					pagination();
				});
				promise.fail(function() {
					tableContent
						.html("<li class='emptySearch'><strong>Service failed.</strong> Please try again in a few minutes.</li>");
				});
				promise.always(function() {
					$j(".cmeProgressPanel").remove();
				});
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
(function($j){

	$j(document).ready(function(){

		/**
	     * Local Component Vars
		 */

		var filtersData = [],
			storeDomEl = [],
			isList = $j('*[data-type="ul"]').length,
			resultsTitle = $j("#cmeSearchFilterResultsMessage, #cmeSearchFilterBottomResults"),
			searchFilterSelected = "#cmeSearchFiltersSelected",
			searchInput = $j(".searchDataComponent"),
			sortCell = $j(".cmeTableSortingCell"),
			firstLoad = ".cmeSearchFilter:first h4",
			tableContainer = $j(".cmeTableBlockWrapper"),
			setFirstLoad = false,
			toggleMobileFilter = false,
			keyUrlInput = false,
			urlFlag = false,
			searchUrl,
			pageTotal,
			pageNumber,
			templates;

		/**
	     * Component Filter Class
		 */

		function filterClass(filterName, filter, filterDataName) {
			this.filterName = filterName;
			this.filter = (filter) ? removeBlank(filter) : filter;
			this.filterDataName = filterDataName;
		}

		/**
	     * Execute on Page Load
		 */

		/*
		$j.getJSON("/etc/clientlibs/cmegroup/cmeTable/clientlibs/js/ssf.templates.json", function(tmpls) {
			templates = tmpls;
			execOnLoad();
		});
		*/

		$j.getJSON("js/ssf.templates.json", function(tmpls) {
			templates = tmpls;
			execOnLoad();
		});

		/**
	     * Component Events
		 */

		searchInput.on("keyup", function() {
			var getSearchValue = $j(this).val();
				urlFlag = true;
				searchUrl = getSearchValue;
				keyUrlInput = true;
		        callService();
		});

		sortCell.on("click", function(e) {
			var self = $j(this),
				target = e;
			orderColumns(self, target);
		})

		$j("#cmeSearchFilters").on("click", ".cmeSearchFilter h4", function() {
			var paramSlide = $j(this);
			showList(paramSlide);
		})

		$j(".cmeSearchFilter li").on("click", function() {
			var scope = $j(this);
				urlFlag = true;
			handleCheckboxEvent(scope);
		})

		$j("#btnSearchFilterButton, #btnSearchFilterConfirmBottom").on("click", function() {
			if (toggleMobileFilter == false) {
				activateMobileFilter();
			} else {
				removeMobileFilter();
			}
		})

		$j(".cmeSearchFilterReset").on("click", function() {
			searchInput.val("");
			urlFlag = true;
			clearAll();
		})

		$j("#btnSearchFilterCancelBottom").on("click", function() {
			clearAll();
			removeMobileFilter();
		})

		/**
	     * Component Functions
		 */

		function execOnLoad() {
			pagination();
			getTableImage();
			readUrlParams();
			activateSelectAll();
			determineRadio();
			clearHeader();
		}

		function getStatusFunctions() {
			sendUrlParams();
			showListOfFilters();
			filterTable();
			fixRepeteadRows();
			removeHeaderIfEmpty();
			pagination();
		}

		function clearAll() {
			$j("#cmeSearchFilterControls li").removeClass("checked");
			filtersData = [];
			getStatusFunctions();
		}

		function clearHeader() {
			if (isList > 0) {
				$j(".cmeTableSortingCell").each(function(){
					$j(this).remove();
				})
			}
		}

		function removeHeaderIfEmpty() {
			if (isList === 0) {
				var notFound = $j(".emptySearch").length,
					removeHeader = $j("#cmeSearchFilterResults thead");
				if (notFound > 0) {
					removeHeader.css("display","none");
				} else {
					removeHeader.css("display","table-header-group");
				}
			}
		}

		function showList(parameterSlide) {
			$j(parameterSlide).next().slideToggle("slow", function() {
				$j(this).parent().toggleClass("cmeSearchFilterOpen");
				$j(this).parent().children("h4").toggleClass("cmeIcon-down-dir");
				$j(this).parent().children("h4").toggleClass("cmeIcon-right-dir");
			})
		}

		function getTableImage() {
			var getRows = (isList > 0) ? $j("#cmeSearchFilterResults li") : $j("#cmeSearchFilterResults tbody tr");
			storeDomEl.clear();
			getRows.each(function(){
				var that = $j(this).html(),
					dataFilter = $j(this).attr("data-filter");
					dataFilter = (dataFilter) ? removeBlank(dataFilter) : dataFilter;
				if (isList > 0) {
					storeDomEl.push("<li data-filter='" + dataFilter + "'>" + that.toString() + "</li>");
				} else {
					storeDomEl.push("<tr data-filter='" + dataFilter + "'>" + that.toString() + "</tr>");
				}
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
			var getRowsLengthType = (isList > 0) ? $j("#cmeSearchFilterResults li").not(".emptySearch") : $j("#cmeSearchFilterResults tbody tr"),
				getRowsLength = getRowsLengthType.length;
			resultsTitle.find("span").html(getRowsLength);
			if (getRowsLength === 0) {
				resultsTitle.hide();
			} else {
				resultsTitle.show();
			}
		}

		function emptyResearch() {
			var emptyRString = Mustache.to_html(templates.emptySearch);
			if (isList > 0) {
				$j("#cmeSearchFilterResults:empty")
					.append(emptyRString);
			} else {
				$j("#cmeSearchFilterResults tbody:empty")
					.append(emptyRString);
			}
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

			var dataValue = removeBlank(dataValue);

			for (var i = 0; i < filtersData.length; i++) {
				var dataName = filtersData[i].filterDataName;
					dataName = removeBlank(dataName);
				if (dataName == dataValue) {
					filtersData.splice(i,1);
				}
			}
			getStatusFunctions();
		}

		function orderColumns(self, e) {

			var getIndexTable = self.parent().index(),
				toggleSort = self.hasClass("cmeSortasc"),
				selectTable = (isList > 0) ? $j("#cmeSearchFilterResults") : $j("#cmeSearchFilterResults tbody");

			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
			selectTable.prepend(Mustache.to_html(templates.progressPanel));

			sortCell.each(function(){
				$j(this).removeClass("cmeSortActive");				
			})
			self.addClass("cmeSortActive");
			if (toggleSort) {
				self.removeClass("cmeSortasc").addClass("cmeSortdesc");
				sortTable("sortDesc", getIndexTable);
			} else {
				self.removeClass("cmeSortdesc").addClass("cmeSortasc");
				sortTable("sortAsc", getIndexTable);
			}
			setTimeout(function(){
				$j(".cmeProgressPanel").remove();
			},500);
		}

		function sortTable(typeOfSort, getIndexTable) {

			var sortArray = [],
				emptyElem = [],
				finalGather = [],
				incColNum = getIndexTable + 1,
				selectTable = $j("#cmeSearchFilterResults tbody"),
				getColumn = $j("#cmeSearchFilterResults td:nth-child(" + incColNum + ")");

			getColumn.each(function() { 
				var getRowText = $j(this).text().trim(),
					capFirstString = capitalizeFirst(getRowText);
				sortArray.push(capFirstString);
			})
			if (typeOfSort == "sortAsc") {
				sortArray.sort();
			} else {
				sortArray.sort(stringDes);
			}
			for (var i = 0; i < sortArray.length; i++) {
				var getSortedString = sortArray[i];
				getColumn.each(function() {
					var getColumn = $j(this).text().trim(),
						getColumnCap = capitalizeFirst(getColumn),
						getParentRow = $j(this).parent();
					if (getColumnCap === getSortedString) {
						finalGather.push(getParentRow);
						getParentRow.remove();
					} 
				}) 
			}
			for (var i = 0; i < finalGather.length; i++) {
				selectTable.append(finalGather[i]);
			}
			pagination();
			$j(".cmePaginationWrapper li:nth-child(4)").find("a").trigger("click");
			$j(".cmePaginationWrapper li:nth-child(3)").find("a").trigger("click");
		}

		function handleCheckboxEvent(scope) {

			var	filterName = scope.parents(".cmeSearchFilter").find("h4").text(),
				filterText = scope.attr("data-filter"),
				filterDataName = scope.find("label").text();

			if (scope.hasClass("cmeCheckboxSelectAll")) {
				if (!scope.hasClass("checked")) {
					scope.siblings().each(function() {
						if (!$j(this).hasClass("checked")) {
							var	filterNameAll = $j(this).parents(".cmeSearchFilter").find("h4").text(),
								filterTextAll = $j(this).attr("data-filter"),
								filterDataNameAll = $j(this).find("label").text();
							pushData(filterNameAll,filterTextAll,filterDataNameAll);
						}
					})
					scope.siblings().removeClass("checked");
					scope.siblings().toggleClass("checked");
				} else {
					scope.siblings().each(function() {
						var removeNode = $j(this).find("label").text();
						removeFilter(removeNode);
					})
					scope.siblings().removeClass("checked");
					getStatusFunctions();
				}
			} else if (scope.parent().hasClass("cmeRadio")) {
				var removePrevious = scope.parent().find(".checked").text();
				if (!scope.hasClass("checked")) {
					if (removePrevious) {
						removeFilter(removePrevious);	
					}
					scope.siblings().removeClass("checked");
					pushData(filterName,filterText,filterDataName);
				}
				scope.addClass("checked");
			} else {
				if (!scope.hasClass("checked")) {
					pushData(filterName,filterText,filterDataName);
				}
				scope.toggleClass("checked");
				if (!scope.hasClass("checked")) {
					removeFilter(filterDataName);		
				}
			}
			activateSelectAll();
		}

		function sendUrlParams() {
			if (urlFlag) {
				var getUrl = window.location.href,
					addAmp = (getUrl.indexOf('#') > -1) ? addAmp = "#" : addAmp = "",
					searchExist = (getUrl.indexOf('search=') > -1) ? searchExist = true : searchExist = false,
					inputValue = searchInput.val(),
					urlSplit = getUrl.split('search='),
					stringURL = "#";	

				if (searchExist && keyUrlInput == false && urlSplit[1] != "") {
					searchUrl = urlSplit[1];
					hasAmp = (searchUrl.indexOf('#') > -1) ? hasAmp = true : hasAmp = false;
					if (hasAmp) {
						var splitUrl = searchUrl.split('#');
						searchUrl = splitUrl[0];
					}
				}				
				if (inputValue != "") {
					stringURL = stringURL + "search=" + searchUrl + addAmp;
				} 
				for (var i = 0; i < filtersData.length; i++) {
					stringURL = stringURL + 
								filtersData[i].filterName + "#" +
								filtersData[i].filter + "#" +
								filtersData[i].filterDataName + addAmp;
				}	
				if (addAmp != "") {
					stringURL = stringURL.slice(0, -1);
				}
				window.location.hash = stringURL;
			}
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
				promise.done(function() {
					continueReadUrl();
				});
			} else {
				continueReadUrl();
			}
			function continueReadUrl() {
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
		}

		function showListOfFilters() {

			var showAllLi = $j("#cmeSearchFiltersSelected .show"),
				getWidth = window.innerWidth;

			if (filtersData.length > 0) {
				$j("#cmeSearchFiltersLabel").css("display","block");
				$j(searchFilterSelected)
					.css("display","block")
					.find("ul")
					.empty()
					.append(Mustache.to_html(templates.searchFilterSelector, filtersData));
				$j(searchFilterSelected + " li").on("click", function() {
					var filterText = $j(this).text();
						urlFlag = true;
						dataValue = $j(this).attr("data-name");
					$j(".cmeSearchFilter li").each(function() {
						if ($j(this).text() === filterText){
							$j(this).removeClass("checked");
						}
					});
					removeFilter(filterText);
					activateSelectAll();
				})
				if (filtersData.length > 6) {
					$j(searchFilterSelected + " ul li").each(function(index) {
					  	if (index > 5) {
					  		$j(this).css("display","none");
					  	}
					});
					showAllLi.remove();
					$j("#cmeSearchFiltersSelected")
						.append(Mustache.to_html(templates.showAllFilters, {
							filtersDataLength: filtersData.length
						}));
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

			var brokersList = (isList > 0) ? $j("#cmeSearchFilterResults li") : $j("#cmeSearchFilterResults tbody tr"),
				wrapper = $j("#cmeSearchFilterResults"),
				paginationWrapper = $j(".cmePaginationWrapper"),
				filterContainer = $j(".cmeSearchFiltersWrapper"),
				brokersLength = brokersList.length,
				maxVisibility = 4,
				definedLength = 12,
				increaseLength = 0,
				calc = Math.ceil(brokersLength / definedLength),
				setLength = definedLength;
			
			if (brokersLength > definedLength) {
				wrapper.css("top","0");
				paginationWrapper.each(function(){
					$j(this).show();
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
				$j('.page_top, .page_bottom').bootpag({
				    total: calc,
				    page: 1,
				    maxVisible: maxVisibility,
				    leaps: true,
				    firstLastUse: true,
				    first: '«',
				    last: '»',
				    next: 'Next ›',
				    prev: '‹ Prev',
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
					if (isList === 0) {
						wrapperBlock.css("display","table-row");
					} else {
						wrapperBlock.css("display","block");
					}
					for (var i = 0; i < removeArrowsLength; i++) {
						var iIncreased = i + 3,
							textIncreased = i + 1;
							if (getFirstPosition > 1) {
								var increasedPageValue = getFirstPosition++;
							} else {
								var increasedPageValue = textIncreased;
							}
						$j(".pagination li:nth-child(" + iIncreased + ")").find("a").text(increasedPageValue);
					}
					$j(".pagination li.active").find("a").text(num + " of " + calc);
				}); 
				$j(".pagination").css("float","right");
				$j(".pagination li.active").find("a").text("1 of " + calc);
			} else {
				paginationWrapper.each(function(){
					$j(this).hide();
				})
				filterContainer.css("margin-top","10px");
			}
			showResultsNumber();
		}

		function filterTable() {

			var tableSelect = (isList > 0) ? $j("#cmeSearchFilterResults") : $j("#cmeSearchFilterResults tbody"),
				rowExists = [];
				
			tableSelect.empty();

			if (filtersData.length) {		
				function appendFromFilter(getFilterData) {
					var filterExists = $j("#cmeSearchFilterResults").find("[data-filter='" + getFilterData + "']").length;
					for (var i = 0; i < storeDomEl.length; i++) {
						var getStoreValue = storeDomEl[i];
						if (!(filterExists > 0) && getStoreValue.indexOf(getFilterData) > -1) {
							tableSelect.append(getStoreValue);
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

		function callService(getDataSearch) {

			var tableContent = (isList > 0) ? $j("#cmeSearchFilterResults") : $j("#cmeSearchFilterResults tbody");
				tableContent
					.append(Mustache.to_html(templates.progressPanel));

			clearAll();

			// promise = $j.ajax({ url: tableService.url, data: { search: searchUrl } });

				/* To make a call to the service install http-server in node js and open the project from there */
				promise = $j.ajax({ url: "http://demo1861308.mockable.io/fdfesf" });
				promise.done(function(data) {
					var selectRow = 1;
					tableContent.empty();
					function getDataColumns(columns) {
						var getColumnsTmpl, columnsChildrenSelector;
						if (isList > 0) {
							getColumnsTmpl = templates.getColumnsDiv;
							columnsChildrenSelector = "li:nth-child(" + selectRow + ")";
						} else {
							getColumnsTmpl = templates.getColumnsTd;
							columnsChildrenSelector = "tbody tr:nth-child(" + selectRow + ")";
						}
						$j(columnsChildrenSelector, "#cmeSearchFilterResults").each(function(index, el) {
							$j(el).append(Mustache.to_html(getColumnsTmpl, {
								columns: columns,
								xssSafe: function() {
									return function(text, render) {
										return render(text.xssSafe());
									};
								}
							}));
						});
						selectRow ++
					}
					for (var i = 0; i < data.results.length; i++) {
						var columns = data.results[i].columns,
							resultsFilter = data.results[i].dataFilterValue;
						if (isList > 0) {
							tableContent
								.append("<li data-filter='" + resultsFilter.xssSafe() + "'></li>");
						} else {
							tableContent
								.append("<tr data-filter='" + resultsFilter.xssSafe() + "'></tr>");
						}
						getDataColumns(columns);
					}
					emptyResearch();
					pagination();
					getTableImage();
				});
				promise.fail(function() {
					tableContent
						.html(Mustache.to_html(templates.serviceFailure));
				});
				promise.always(function() {
					$j(".cmeProgressPanel").remove();
					removeHeaderIfEmpty();
				});
		}

		/**
		 * Component Utility Functions
		 */

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

		function capitalizeFirst(getRowText) {
			var caps = getRowText;
		    	caps = caps.charAt(0).toUpperCase() + caps.slice(1);
		    return caps;
		}

		String.prototype.xssSafe = function() {
		    var node = document.createTextNode(this);
		    return node.nodeValue;
		}

		Array.prototype.clear = function() {
	       this.splice(0, this.length);
	    }

		function stringDes(a, b) {
			if (a > b) { return -1 }
		   	else if (a < b) { return 1 }
		   	else { return 0 }
		}

		function removeBlank(getString) {
			return getString.replace(/ /g,'');
		}

	})

})($.noConflict())
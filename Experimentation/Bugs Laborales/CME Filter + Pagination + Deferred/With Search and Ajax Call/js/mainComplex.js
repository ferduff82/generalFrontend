//window['cme.component.broker'] = function () {

(function($j){

	"use strict";

	var filtersData = [],
		searchFilterSelected = "#cmeSearchFiltersSelected",
		pageTotal = undefined,
		pageNumber = undefined,
		service = $j(".serviceCall");

	function filterClass(filterName, filter, serviceFilterName, serviceFilter) {
		this.filterName = filterName;
		this.filter = filter;
		this.serviceFilterName = serviceFilterName;
		this.serviceFilter = serviceFilter;
		this.filterGather = function() {
			return this.filterName + "-" + filter.replace(/ /g, '-');
		}
	}

	$j(document).ready(function(){

		pagination();

		$j("#cmeSearchFilters").on("click", ".cmeSearchFilter h4", function() {
			$j(this).next().slideToggle("slow", function() {
				$j(this).parent().toggleClass("cmeSearchFilterOpen");
				$j(this).parent().children("h4").toggleClass("cmeIcon-down-dir");
				$j(this).parent().children("h4").toggleClass("cmeIcon-right-dir");
			})
		})

		$j(".cmeSearchFilter li").on("click", function() {

			var	filterName = $j(this).parent().parent().find("h4").text(),
				filterText = $j(this).find("label").text(),
				servicefilterName = $j(this).find(":input").attr("name"),
				servicefilterText = $j(this).find(":input").attr("value");

			if ($j(this).hasClass("cmeCheckboxSelectAll")) {
				if (!$j(this).hasClass("checked")) {
					$j(this).siblings().each(function() {
						if (!$j(this).hasClass("checked")) {
							var	filterNameAll = $j(this).parent().parent().find("h4").text(),
								filterTextAll = $j(this).find("label").text(),
								servicefilterNameAll = $j(this).find(":input").attr("name"),
								servicefilterTextAll = $j(this).find(":input").attr("value");
							pushData(filterNameAll,filterTextAll,servicefilterNameAll,servicefilterTextAll);
						}
					})
					$j(this).siblings().removeClass("checked");
					$j(this).siblings().toggleClass("checked");
				} else {
					$j(searchFilterSelected + " ul").empty();
					$j(this).siblings().removeClass("checked");
					filtersData = [];
					showListOfFilters();
				}
				$j(this).toggleClass("checked");
			} else if ($j(this).parent().hasClass("cmeRadio")) {
				if (!$j(this).hasClass("checked")) {
					var radioFilterName = $j(this).siblings().find("label").text(),
						removeRadioFilter = filterName + " - " + radioFilterName;
					removeFilter(removeRadioFilter);	
					$j(this).siblings().removeClass("checked");
					pushData(filterName,filterName + " - " + filterText,servicefilterName,servicefilterText);
				}
				$j(this).addClass("checked");
			} else {
				if (!$j(this).hasClass("checked")) {
					pushData(filterName ,filterText,servicefilterName,servicefilterText);
				}
				$j(this).toggleClass("checked");
				if (!$j(this).hasClass("checked")) {
					removeFilter(filterText);		
				}
			}
		})

		$j(".cmeSearchFilterReset").on("click", function() {
			$j("#cmeSearchFilterControls li").removeClass("checked");
			$j(searchFilterSelected + " ul").empty();
			filtersData = [];
			showListOfFilters();
		})

		function pushData(filterName, filterText, serviceFilterName, serviceFilter) {
			var newClass = new filterClass(filterName,filterText,serviceFilterName,serviceFilter);
			filtersData.unshift(newClass);
			console.log(filtersData);
			$j(".cmeTableBlockWrapper").empty();
			callService();
			showListOfFilters();
		}

		function showListOfFilters() {
			if (filtersData.length > 0) {
				$j(searchFilterSelected).css("display","block");
				$j("#cmeSearchFiltersLabel").css("display","block");
				$j(searchFilterSelected + " ul").empty();
				for (var i = 0; i < filtersData.length; i++) {
					$j(searchFilterSelected + " ul").append("<li data-name=" + filtersData[i].filterName + " data-id=" + filtersData[i].filterGather() + ">" + filtersData[i].filter + "</li>");
				}
				$j(searchFilterSelected + " li").on("click", function() {
					var filterText = $j(this).text();
					$j(".cmeSearchFilter li").each(function() {
						if ($j(this).text() === filterText){
							$j(this).removeClass("checked");
						}
					})
					removeFilter(filterText);
				})
				if (filtersData.length > 4){
					$j(searchFilterSelected + " ul li").each(function(index) {
					  	if (index > 3) {
					  		$j(this).css("display","none");
					  	}
					});
					$j("#cmeSearchFiltersSelected li.show").remove();
					$j("#cmeSearchFiltersSelected").append("<li class='show'><a href='#'>Show all "+ filtersData.length +" active filters</a></li>");
					$j("#cmeSearchFiltersSelected li.show").css({"display": "inline-block", "width": "100%"});
					$j(searchFilterSelected + " a").on("click", function() {
						$j(searchFilterSelected + " ul li").each(function() {
							$j(this).css("display","block");
						})
					})
				} else {
					$j("#cmeSearchFiltersSelected li.show").remove();
				}
			} else {
				$j(searchFilterSelected).css("display","none");
				$j("#cmeSearchFiltersLabel").css("display","none");
			}
		}

		function removeFilter(filterText) {
			for (var i = 0; i < filtersData.length; i++) {
				if (filtersData[i].filter == filterText) {
					filtersData.splice(i,1);
				}
			}
			showListOfFilters();
		}

		function pagination() {
			var brokersList = $j("#cmeSearchFilterResults > li"),
				wrapper = $j("#cmeSearchFilterResults"),
				paginationWrapper = $j(".cmePaginationWrapper"),
				brokersLength = brokersList.length,
				definedLength = 3,
				increaseLength = 0,
				triggerUnbindNext = false,
				triggerUnbindPrev = true,
				triggerHasActive = true,
				setNumIncreased = false,
				calc = Math.ceil(brokersLength / definedLength),
				setLength = definedLength;

			if (brokersLength > definedLength) {
				paginationWrapper.each(function(){
					$j(this).append("<div class='cmePagination'><ul></ul></div>");
				})
				var ulSelection = $j(".cmePagination ul");
					ulSelection.append("<li class='disabled first numClick'><a href='#'>«</a></li>");
					ulSelection.append("<li class='disabled prev numClick'><a href='#'>‹ Prev</a></li>");
				for (var i = 0; i < calc; i++) {
					var setClass = (i === 0) ? "active" : "" ,
						calcReduced = calc - 2,
						setPagValue = (i === 0) ? i + 1 + " of " + calc : i + 1 ;
					if (calc > 8 && i == 7) {
						ulSelection.append("<li class='disabled dots'><a href='#'>...</a></li>");
					} 
					if (i > 5 && i < calcReduced) {
						ulSelection.append("<li class='"+ setClass +"' style='display:none'><a href='#'>" + setPagValue + "</a></li>");
						$j(".cmePaginationWrapper li").not(".active").not(".disabled").addClass("pageLink");
						console.log(calcReduced);
					} else {
						ulSelection.append("<li class='"+ setClass +"'><a href='#'>" + setPagValue + "</a></li>");
						$j(".cmePaginationWrapper li").not(".active").not(".disabled").addClass("pageLink");
					}
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
			} else {
				paginationWrapper.each(function(){
					$j(this).css("display","none");
				})
			}
			ulSelection.append("<li class='next numClick'><a href='#'>Next »</a></li>");
			ulSelection.append("<li class='last numClick'><a href='#'>»</a></li>");

			var wrapperLi = $j(".cmePaginationWrapper li").not(".dots"),
				firstLi = $j(".cmePaginationWrapper li.first"),
				lastLi = $j(".cmePaginationWrapper li.last"),
				prevLi = $j(".cmePaginationWrapper li.prev"),
				nextLi = $j(".cmePaginationWrapper li.next");

			wrapperLi.not(".numClick").click(function(){
				var	getIndex = $j(this).index(),
					selectPage = getIndex - 2,
					getNumber = getIndex - 1,
					wrapperBlock = wrapper.find(".num" + selectPage);
				initClickEvent(wrapperBlock, selectPage, getNumber, calc);
			})
			firstLi.on("click", function(){
				var indexOfFirst = 0,
					firstPage = 1,
					wrappFirstBlock = wrapper.find(".num0");
				initClickEvent(wrappFirstBlock, indexOfFirst, firstPage, calc);
			})
			lastLi.on("click", function(){
				var addBlock = calc - 1,
					wrappLastBlock = wrapper.find(".num" + addBlock);
				initClickEvent(wrappLastBlock, addBlock, calc, calc);
			})
			prevLi.on("click", function(){
				var getActive = $j(".active").index(),
					getActiveInit = getActive - 2,
					reduceActive = getActive - 3,
					wrappNextBlock = wrapper.find(".num" + reduceActive);
				if (triggerUnbindPrev == false) {
					initClickEvent(wrappNextBlock, reduceActive, getActiveInit, calc);
				}			
			})
			nextLi.on("click", function(){
				var getActive = $j(".active").index();	
				//console.log(getActive);				
				if (getActive > 6) {
					var reduceActive = getActive - 2;
					var getActive = getActive - 1;	
				} else {
					var reduceActive = getActive - 1;
					var getActive = getActive;
				}

				console.log(reduceActive);
				var wrappNextBlock = wrapper.find(".num" + reduceActive);
				if (triggerUnbindNext == false) {
					initClickEvent(wrappNextBlock, reduceActive, getActive, calc);
				}			
			})

			function initClickEvent(addWrapper, changeDisplay, firstNum, secondNum) {

				var triggerIncreaseSlideChange = false;					

				function activeFuncionality() {
					var getActive = $j(".cmePaginationWrapper li.active"),
						replaceLast = getActive.index();

					getActive.removeClass("active").addClass("pageLink");
					getActive.find("a").text(replaceLast - 1);
					brokersList.css("display","none");
				} activeFuncionality();

				function largePagination(addWrapper, changeDisplay, firstNum, secondNum) {
					var	getFirstPosition = $j(".cmePaginationWrapper li:nth-child(5)"),
						getLastPosition = $j(".cmePaginationWrapper li:nth-child(10)"),
						dinamicActive = firstNum + 3,
						getDinamicActive = $j(".cmePaginationWrapper li:nth-child(" + dinamicActive + ")"),
						cloneDots = $j(".dots").first().clone();


					if (firstNum >= 6) {
						getFirstPosition.css("display","none");
						getFirstPosition.after(cloneDots);
						getFirstPosition.addClass("dots");
						getDinamicActive.css("display","inline");
						if (triggerHasActive) {
							triggerIncreaseSlideChange = true;
							triggerHasActive = false;
						} else {
							triggerIncreaseSlideChange = false;
						}
					} else {
						
					}
					if (firstNum > 6) {
						setNumIncreased = true;
					}

				} largePagination(addWrapper, changeDisplay, firstNum, secondNum);

				function switchActive(addWrapper, changeDisplay, firstNum, secondNum) {
					addWrapper.css("display","block");
					
					if (triggerIncreaseSlideChange == false){
						var change = changeDisplay + 3;
						console.log(change);
					} else {
						var change = changeDisplay + 4;
						console.log(change);
					}
					/*
					if (setNumIncreased){
						var firstNum = firstNum - 1;
					}
					*/

					var selector = $j(".cmePaginationWrapper li:nth-child(" + change + ") a");
					selector.text(firstNum + " of " + secondNum);
					selector.parent().addClass("active").removeClass("pageLink");

				} switchActive(addWrapper, changeDisplay, firstNum, secondNum);

				function disableFunctionality() {
					var firstDisable = $j(".cmePaginationWrapper li:nth-child(3)").hasClass("active"),
						lastDisabled = $j("li:nth-last-child(3)").hasClass("active");

					if (firstDisable == true) {
						firstLi.addClass("disabled");
						prevLi.addClass("disabled");
						triggerUnbindPrev = true;
					} else {
						firstLi.removeClass("disabled");
						prevLi.removeClass("disabled");
						triggerUnbindPrev = false;
					}
					if (lastDisabled == true) {
						lastLi.addClass("disabled");
						nextLi.addClass("disabled");
						triggerUnbindNext = true;
					} else {
						lastLi.removeClass("disabled");
						nextLi.removeClass("disabled");
						triggerUnbindNext = false;
					}
				} disableFunctionality();
			}
		}

		function callService() {

			$j(".cmeTableBlockWrapper").append("<div class='loading'>Loading...</div>");

			function getValue() {
				for (var i = 0; i < filtersData.length; i++) {
					var filterService = "&" + filtersData[i].serviceFilterName + "=" + filtersData[i].serviceFilter;   
					return filterService
				}
			}
			console.log(getValue());
			
			var promise = $j.ajax({ url: "http://www.cmegroup.com/apps/cmegroup/widgets/services/brokerService.json" + getValue()});
				promise.done(function(data) {
					$j(".cmeTableBlockWrapper").append("<table>" + data + "</table>");
				});
				promise.fail(function() {
					$j(".cmeTableBlockWrapper").append("Service is not ready, please try again...");
				});
				promise.always(function() {
					$j(".cmeTableBlockWrapper .loading").remove();
				});
		}
	})
})($.noConflict())
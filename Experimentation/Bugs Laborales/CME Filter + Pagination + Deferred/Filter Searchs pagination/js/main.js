//window['cme.component.broker'] = function () {

(function($j){

	"use strict";

	var filtersData = [],
		storeDomEl = [],
		searchFilterSelected = "#cmeSearchFiltersSelected",
		getRows = $j("#cmeSearchFilterResults tr"),
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

		getRows.each(function(){
			var that = $j(this).html();
			storeDomEl.push(that.toString());
		}); 

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
					filterTable();
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
			filterTable();
		})

		function pushData(filterName, filterText, serviceFilterName, serviceFilter) {
			var newClass = new filterClass(filterName,filterText,serviceFilterName,serviceFilter);
			filtersData.unshift(newClass);
			showListOfFilters();
			filterTable();
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
			filterTable();
		}

		function pagination() {

			var brokersList = $j("#cmeSearchFilterResults tr"),
				wrapper = $j("#cmeSearchFilterResults"),
				paginationWrapper = $j(".cmePaginationWrapper"),
				brokersLength = brokersList.length,
				maxVisibility = 4,
				definedLength = 3,
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

			if (filtersData.length) {			
				for (var i = 0; i < filtersData.length; i++) {
					var getFilterData = filtersData[i].filter;
					appendFromFilter(getFilterData);
				}
				function appendFromFilter(getFilterData) {
					for (var i = 0; i < storeDomEl.length; i++) {
						var getStoreValue = storeDomEl[i];
						if (getStoreValue.indexOf(getFilterData) > -1) {
							tableSelect.append("<tr>" + getStoreValue + "</tr>");
						} 
					}
				}
			} else {
				for (var i = 0; i < storeDomEl.length; i++) {
					var getStoreValue = storeDomEl[i];
						tableSelect.append("<tr>" + getStoreValue + "</tr>");
				}
			}
			$j("#cmeSearchFilterResults tbody:empty").text("No data available to display.");
			pagination();
		}
	})
})($.noConflict())
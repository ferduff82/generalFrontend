(function($){
    $.fn.extend({
        cmeTables: function(options) {
            var defaults = {
            	addDefaultResponsiveHandling: false,
                addStriping: false,
                addRowHighlight : false,
                addFixedHeader : false,
                addSorting: false
            };

            var cmeTableOptions =  $.extend(defaults, options);
            return this.each(function() {
                var myTable = $j(this);
                if (cmeTableOptions.addDefaultResponsiveHandling === true) {
	                myTable.addDefaultResponsiveHandling();
                 }

                if (cmeTableOptions.addStriping === true) {
	                myTable.addRowStriping();
                 }

                 if (cmeTableOptions.addRowHighlight === true) {
	                 myTable.addRowHighlight();
                 }

				if (cmeTableOptions.addFixedHeader === true) {
					myTable.addFixedHeader(true);
				}

				if (cmeTableOptions.addSorting === true) {
					myTable.addSorting();
				}
            });
        },
        addDefaultResponsiveHandling: function() {
		    return this.each(function(){
		    	$j(this).wrap('<div class="cmeTableWrapper cmeContentTableWrapper" />'); // Add wrapper to all ordinary tables to facilitate responsive handling
		    });
		},
		addRowStriping: function() {
		    return this.each(function(){
	        	if ($j(this).prop("tagName") === "TABLE") {	// table striping
					if (!$j(this).hasClass('cmeSpecTable')) {
						$j('tbody tr:even', $j(this)).addClass('cmeRowBandingOff');
						$j('tbody tr:odd', $j(this)).addClass('cmeRowBandingOn');
		        	} else {
			        	$j(this).children('tbody').children('tr:even').addClass('cmeRowBandingOff');
						$j(this).children('tbody').children('tr:odd').addClass('cmeRowBandingOn');
		        	}
	        	} else if ($j(this).prop("tagName") === "UL" || $j(this).prop("tagName") === "OL") {	// lists striping
					$j(this).children('li:even').addClass('cmeRowBandingOff');
					$j(this).children('li:odd').addClass('cmeRowBandingOn');
	        	}
		    });
		},
		addRowHighlight: function() {
			if ((!$j('html').hasClass('msie-8')) && (!$j('html').hasClass('msie-7')) && (!$j('html').hasClass('cmeResponsive'))) {
				return this.each(function(){
					$j(this).find("tbody tr").hover(function(){
						if (!$j(this).hasClass('cmeNoTableRowHighlight')){
		                $j(this).addClass("cmeTableRowHighlight");}
		             },function(){
			             $j(this).removeClass("cmeTableRowHighlight");
			         });
				});
			} else {
				return this;
			}
		},
		addFixedHeader: function(blnSetFixedHeader) {
			if ((!$j('html').hasClass('msie-7')) && (!$j('html').hasClass('cmeResponsive'))) {
				return this.each(function(){
					// check index of table with class "cmeTableFixedHeaderFirst" if it is -1 the table doesn't have the class, if it is 0 it is the first instance
					// we can check this value to determine wether or not to clone fixed header for this instance of a table
					var tableIndex = $j("table.cmeTableFixedHeaderFirst").index($j(this));
					if (! $j(this).hasClass("cmeTableFixedHeaderFirst") || tableIndex < 1) {
						var clonedHeaderRow, newClonedHeaderRow, myCellWidth = 0, myBorderWidth = 0;
						clonedHeaderRow = $j("thead", this);
						var $jbefore = clonedHeaderRow.clone();
						$jbefore.css("width", clonedHeaderRow.width()).addClass("cmeFloatingHeader");
						$j('th', clonedHeaderRow).each(function(i) {
							var myHeaderCell = $j(this);
							if (myHeaderCell.css("borderCollapse") === "collapse") {
								myBorderWidth = parseInt(myHeaderCell.css("borderLeftWidth"),10);
							} else {
								myBorderWidth = parseInt(myHeaderCell.css("borderLeftWidth"),10) + parseInt(myHeaderCell.css("borderRightWidth"),10);
							}
							myCellWidth = (($j('html').hasClass('chrome')) || ($j('html').hasClass('safari')) || ($j('html').hasClass('opera')) || ($j('html').hasClass('msie')) ? myHeaderCell.width()+myBorderWidth : myHeaderCell.width());
							$jbefore.find('th').eq(i).css({ 'width':myCellWidth, 'min-width':myCellWidth });
						});
						clonedHeaderRow.parent().prepend($jbefore);
						$j(this).addClass('cmeFloatingHead');
					}
				});
			} else if (blnSetFixedHeader === false) {
				$j('.cmeFloatingHeader').remove();
			} else {
				return this;
			}
		},
		addSorting: function() {
			 return this.each(function(){	// check filter variables are available
			 	if (cmePageFilters["sortField"] === undefined && cmePageFilters["sortAsc"] === undefined) {
			 		var myActiveSortCell = $j("thead th div.cmeSortActive a", this);
			 		var mySortColumn = myActiveSortCell.attr('id');
			 		var mySortDirection;
			 		if (myActiveSortCell.parent().hasClass('cmeSortasc')){
				 		mySortDirection = "true";
			 		} else {
				 		mySortDirection = "false";
			 		}
			 		cmePageFiltersAdd({	// add updated filter values for ajax request
				 		"pageNumber": 1,
				 		"sortField": mySortColumn,
				 		"sortAsc": mySortDirection
				 	});
			 	}
	        	if (cmePageFilters["sortField"] !== undefined && cmePageFilters["sortAsc"] !== undefined) {
		        	var sortField = cmePageFilters["sortField"];
		        	var sortDirection = (cmePageFilters["sortAsc"] === "true") ? "asc" : "desc";
			        $j("thead th a", this).parent().removeClass("cmeSortActive");	// remove defaults
			        //$j("thead th", this).removeClass("cmeSortasc");
			        //$j("thead th", this).removeClass("cmeSortdesc");
			        $j("thead th a#" + sortField, this).parent().removeClass("cmeSortdesc").removeClass("cmeSortasc").addClass("cmeSort" + sortDirection).addClass("cmeSortActive");	// set classes
			        //$j("thead th#" + sortField, this).addClass("cmeSort" + sortDirection);
	        	}
		    });
		}
    });
})(jQuery);

function cmeTablesPaginationEventClick(pageNumber) {
	console.log(pageNumber);
	if (window.cmeComponents) {
		$j.each(window.cmeComponents, function(index, value) {	// loop through components
			if (value.type === "list" || value.pagination === true) { // check it is a list component
				cmePageFiltersAdd({	// add updated filter values for ajax request
					"pageNumber": pageNumber
				});
				var component = cmeComponents[index]; // get component
				var handler = component.handlerObj;
				handler.refreshDataTable();
			}
		});
	}
}

function cmeReplacePaginationParam(str, paramName, paramValue) {
	if (str.indexOf(paramName) > -1) {	 // regex to replace param
		switch (paramName) {
			case "pageNumber":
				str = str.replace(/(pageNumber=)[^\&]+/, '$1' + paramValue);
				break;
			case "pageSize":
				str = str.replace(/(pageSize=)[^\&]+/, '$1' + paramValue);
				break;
			case "searchString":
				str = str.replace(/(searchString=)[^\&]+/, '$1' + paramValue);
				break;
		}
	} else {
		if (str.indexOf('?') > -1) {
			str += '&' + paramName + '=' + paramValue;
		} else {
			str += '?' + paramName + '=' + paramValue;
		}
	}
	return str;
}
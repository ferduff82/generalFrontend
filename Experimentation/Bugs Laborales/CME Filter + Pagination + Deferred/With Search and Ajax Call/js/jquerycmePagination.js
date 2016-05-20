// CME Pagination Plugin For jQuery
// Author: Chris Kitson (CME Group)

(function($) {

	// data query variables
	var cmePageContainer;
	var cmePageTotal = 0;
	var cmePageCurrent = 0;
	var cmePageControlWrapper = '';
	var cmePageControlClass = 'cmePaginationControl';
	var cmePageCallbackFunction = '';
	var cmePageMaxLinksDefault = 12;
	var cmePageMaxLinks = cmePageMaxLinksDefault;
	var cmePagePaginationWrapper = '';

	// plugin
	$.fn.addCMEPagination = function(cmePageOptions) {
		return this.each(function(){
			cmePageContainer = $(this);
			cmePageMaxLinks = getPaginationMaxLinks($(window).width());
			$.each(cmePageOptions, function(name, value) {
				switch(name) {	// parameters from service call
					case "pageTotal":
						if(!isNaN(value)) { cmePageTotal = parseInt(value); }
						break;
					case "pageCurrent":
						if(!isNaN(value)) { cmePageCurrent = parseInt(value); }
						break;
					case "controlWrapper":
						cmePageControlWrapper = value;
						break;
					case "controlClass":
						cmePageControlClass = value;
						break;
					case "callbackFunction":
						cmePageCallbackFunction = value;
						break;
					case "paginationWrapper":
						cmePagePaginationWrapper = value;
						break;
				}
			});

			// add pagination html before and after wrapper (if not exists)
			if ($(this).parents(cmePageControlWrapper).prev().hasClass("cmePaginationWrapper") === false) {
				var pageHtml = getPagination(cmePageControlClass, cmePageTotal, cmePageCurrent, cmePageMaxLinks);	// build html

				var pageBeforeHtml = '<div class="cmePaginationWrapper cmePaginationWrapperTop">' + pageHtml + '</div>';
				var pageAfterHtml = '<div class="cmePaginationWrapper cmePaginationWrapperBottom">' + pageHtml + '</div>';
				var pageCtrlWrapper, pageCtrlEvents;
				if (cmePagePaginationWrapper === '' || $(cmePagePaginationWrapper).length === false) {	// put pagination before and after control (default)
					pageCtrlWrapper = $(this).closest(cmePageControlWrapper);
					pageCtrlWrapper.before(pageBeforeHtml);
					pageCtrlWrapper.after(pageAfterHtml);
				} else {	// inject into wrapper
					if ($(cmePagePaginationWrapper).length) {
						pageCtrlWrapper = $(cmePagePaginationWrapper);
						pageCtrlWrapper.html(pageHtml);
					}
				}
				pageCtrlEvents = pageCtrlWrapper.parent();
				// bind events
				if($(pageCtrlEvents).length) {
					$(pageCtrlEvents).off(cmeVal.Event());
					$(pageCtrlEvents).on(cmeVal.Event(), ".cmePaginationWrapper ul li a", function(e) {	// can this selector be made more generic i.e. for non-cmegroup.com pages?
						e.preventDefault();
						getPaginationClick($(this), e, parseInt(cmePageTotal), cmePageCallbackFunction, cmePageMaxLinks);
					});
					$(window).on("resize", function() { // bind to window resize
						cmePageMaxLinks = getPaginationMaxLinks($(window).width());
						var pageHtml = getPagination(cmePageControlClass, cmePageTotal, cmePageCurrent, cmePageMaxLinks);
						drawPagination(pageHtml);

					});
				}
			}
		});
	};


	$.fn.bindCMEPagination = function(cmePageOptions) {
		console.log(cmePageOptions);
		$('html').addClass('cme-pagination');
		return this.each(function(){
			cmePageContainer = $(this);
			cmePageMaxLinks = getPaginationMaxLinks($(window).width());
			$.each(cmePageOptions, function(name, value) {
				switch(name) {	// parameters from service call
					case "pageTotal":
						if(!isNaN(value)) { cmePageTotal = parseInt(value); }
						break;
					case "pageCurrent":
						if(!isNaN(value)) { cmePageCurrent = parseInt(value); }
						break;
					case "controlWrapper":
						cmePageControlWrapper = value;
						break;
					case "controlClass":
						cmePageControlClass = value;
						break;
					case "callbackFunction":
						cmePageCallbackFunction = value;
						break;
				}
			});

			// bind events
			if($(".cmePaginationWrapper").length) {
				$(".cmePaginationWrapper").off(cmeVal.Event());
				$(".cmePaginationWrapper").on(cmeVal.Event(), "ul li a", function(e) {
					e.preventDefault();
					getPaginationClick($(this), e, parseInt(cmePageTotal), cmePageCallbackFunction, cmePageMaxLinks);
				});
				$(window).on("resize", function() { // bind to window resize
					cmePageMaxLinks = getPaginationMaxLinks($(window).width());
					var pageHtml = getPagination(cmePageControlClass, cmePageTotal, cmePageCurrent, cmePageMaxLinks);
					drawPagination(pageHtml);

				});
			}
		});
	};

	function drawPagination(pageHtml) {
		$(".cmePaginationWrapper").html(pageHtml);
	}

	function getPaginationMaxLinks(screenWidth) {
		var linkSize = 40;
		if (screenWidth <= 785) { 	// in responsive mode
			paginationMaxLinks = Math.round((screenWidth / linkSize) - 7);	// calc number
		} else {
			paginationMaxLinks = cmePageMaxLinksDefault; // set as default
		}
		return paginationMaxLinks;
	}

	function getPaginationClick(ctrl, event, pTotal, callback, pMaxLinks) {
		event.preventDefault();
		var link = $(ctrl), pageCurrent = 0, pageGoTo = 0, pageFunction = '', pageHtml = '', isTop = false;
		isTop = link.parents(".cmePaginationWrapper").hasClass("cmePaginationWrapperTop");
		if (!link.parent().hasClass("disabled") && !link.parent().hasClass("active")) {	// link is not disabled or active, so let's go...
			// determine currently selected page
			if(link.parent().siblings(".active") !== undefined) {
				pageCurrent = link.parent().siblings(".active").attr("data-page");
				if(isNaN(pageCurrent) === false) {
					pageCurrent = Number(pageCurrent);
				}
			} else {
				pageCurrent;
			}

			// determine pagination function called
			pageFunction = link.attr("rel").replace("pagination ","");

			switch(pageFunction) {
				case "page-first":
					pageGoTo = 1;
					break;
				case "page-previous":
					if((pageCurrent - 1) > 1) {	// check next page is not less than 1
						pageGoTo = pageCurrent - 1;
					} else {
						pageGoTo = 1;
					}
					break;
				case "page-next":
					if((pageCurrent + 1) < pTotal) {	// check next page is not greater than total
						pageGoTo = pageCurrent + 1;
					} else {
						pageGoTo = pTotal;
					}
					break;
				case "page-last":
					pageGoTo = pTotal;
					break;
				default:
					pageFunction = pageFunction.replace("page-","");
					if (isNaN(pageFunction) === false) {
						pageGoTo = Number(pageFunction);
					}
			}

			// check page is in range
			if (pageGoTo < 1 || pageGoTo > pTotal) {
				pageGoTo = 1;	// invalid page, go to first
			}

			// invoke callback function
			if (callback !== "") {
				window[callback](pageGoTo);
			}

			cmePageCurrent = pageGoTo; // set new current

			// redraw pagination
			var pageHtml = getPagination("cmePaginationTable", pTotal, pageGoTo, pMaxLinks);

			// update pagination html
			drawPagination(pageHtml);

			// scroll to top pagination control for second instance
			if ($(cmePageControlWrapper).length) {
				if (!isTop) {
					$("html, body").scrollTop($(cmePageControlWrapper).offset().top - 40);
				}
			}

		}
	}

	function getPagination(className, pTotal, pNumber, pMaxLinks) {
		var pHtml = '';
		if (pTotal > 1) {
			pHtml = '<div class="cmePagination ' + className + '"><ul data-pagetotal="' + pTotal + '">';
			pHtml += '<li';
			if(pNumber === 1) { pHtml += ' class="disabled"'; }
			pHtml += '><a href="#" rel="pagination page-first">&laquo;</a></li>';
			pHtml += '<li';
			if(pNumber === 1) { pHtml += ' class="disabled"'; }
			pHtml += '><a href="#" rel="pagination page-previous">&lsaquo; Prev</a></li>';
			var pL = 0; var pR = 0; var pX = 0; var pOffset = 0;
			if ((pTotal > pMaxLinks) && pMaxLinks > 0) {	// show limited number of links
				pOffset = Number(Math.round(pMaxLinks / 2));	// calc offset
				pL = Number(pNumber - pOffset);
				if (pL < 0) { pL = 0; }	// calc left
				pR =  Number(pMaxLinks - (pNumber - pL));
				if ((pNumber + pR) > pTotal){
					pR = Number(pTotal - pNumber);
				} // calc right
				pX = Number(pNumber - pL + pR);	// count links
				if (pX < pMaxLinks){
					pL -= (pMaxLinks - pX);
				} // increase to max length if less
				// build left links
				for (var i=pL;i<pNumber;i++){
					pHtml += getPaginationItem(i + 1, pNumber, pTotal);
				}
				// build right links
				for (var i=pNumber;i<pNumber+pR;i++){
					pHtml += getPaginationItem(i + 1, pNumber, pTotal);
				}
			} else if (pMaxLinks === 0 || pMaxLinks < 0) {
				// display current only
				pHtml += getPaginationItem(pNumber, pNumber, pTotal);
			} else {	// show all links
				for (var i=0;i<pTotal;i++){
					pHtml += getPaginationItem(i + 1, pNumber, pTotal);
				}
			}
			pHtml += '<li';
			if(pNumber === pTotal) {
				pHtml += ' class="disabled"';
			}
			pHtml += '><a href="#" rel="pagination page-next">Next &rsaquo;</a></li>';
			pHtml += '<li';
			if(pNumber === pTotal){
				pHtml += ' class="disabled"';
			}
			pHtml += '><a href="#" rel="pagination page-last">&raquo;</a></li>';
			pHtml += '</ul></div>';
		}
		return pHtml;
	}

	function getPaginationItem(currentPage, selectedPage, totalPages) {
		var linkClass = '';var linkHTML = '';
		if (selectedPage === currentPage) { linkClass = 'active'; } else { linkClass = 'pageLink away-' + Math.abs(selectedPage - currentPage); }
		linkHTML += '<li class="' + linkClass + '" data-page="' + currentPage + '"><a href="#" rel="pagination page-' + currentPage + '">' + currentPage;
		if (selectedPage === currentPage) { linkHTML += ' of ' + totalPages; }
		linkHTML += '</a></li>';
		return linkHTML;
	}

})(jQuery);


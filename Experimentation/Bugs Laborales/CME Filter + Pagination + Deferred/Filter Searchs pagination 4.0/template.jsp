<c:if serviceResults="${service != null}">
	<div class="cmeContentColumnLayout cmeFullColumnLayout cmeSearchFilterLayout cmeClearContent">          
	    <div id="cmeSearchFilterWrapper" class="section cmeClearContent">                  
	        <div id="cmeSearchFilterTopResults" class="cmeClearContent">
	            <div id="cmeSearchFilterResultsMessage">
	                There are <strong><span class="cmeSearchFilterResultsCount cmeResults">${results}</span> Results</strong>
	            </div>
	        </div>
	        <div id="cmeSearchFilterContent">
	            <div id="cmeSearchFilterLeft">
	                <div id="cmeSearchFilterLeftContent">
	                    <div id="cmeSearchFilterTitle" class="cmeClearContent">
	                        <h3>Refine Your Search</h3>
	                    </div>
	                    <a id="cmeSearchFilterResetTop" class="cmeButton cmeDynamicShow cmeButtonSecondary cmeSearchFilterReset">Reset</a>
	                    <h4 id="btnSearchFilterButton" class="cmeButton cmeDynamicShow cmeButtonPrimary open">Filter</h4>
	                    <div id="cmeSearchFilterControls">
	                        <div id="cmeSearchFilterTop" class="cmeClearContent">
	                            <input type="button" id="btnSearchFilterCancelTop" class="cmeButton cmeDynamicShow cmeButtonSecondary cmeSearchFilterCancel" value="Cancel" style="display: none;">
	                            <input type="button" id="btnSearchFilterConfirmTop" class="cmeButton cmeDynamicShow cmeButtonPrimary cmeSearchFilterConfirm" value="Filter Results" style="display: none;">
	                        </div>
	                        <div id="cmeSearchFiltersLabel" style="display: none;">Currently filtering by:</div>
	                        <div id="cmeSearchFiltersSelected" class="cmeClearContent" style="display: none;">
	                            <ul></ul>
	                        </div>
	                        
		                    <div id="cmeSearchFilters" class="cmeClearContent">
		                        <div class="cmeSearchFilter cmeSearchFilterOpen">
		                            <c:if tableDisplay="${table == singleColumn}">
		                            	<c:forEach var="filter" items="${filters}">
			                                <h4 class="cmeIcon-right-dir">${filter.type}</h4>
			                                <ul id="${filter.filterId}" class="cmeCheckbox" style="display: none;">
			                                    <li class="cmeCheckboxSelectAll"><input type="checkbox" id="${filter.id}" name="${filter.type}" value="-1"><label for="${filter.all}">Select All</label></li>
			                                	<c:forEach var="filterName" items="${filter.filterNames}">
													<li class="cmeEnglish"><input type="Checkbox" name="${filterName.name}" id="${filterName.id}" value="${filterName.brokerInfo}" style="display: none;"><label for="${filterName.typeFilter}">${filterName.value}</label></li>
			                                  	<c:forEach>
			                                </ul>
			                            <c:forEach>
			                        </c:if>
			                       	<c:if tableDisplay="${table == multipleColumns}">
			                       		<table>
			                       		<c:forEach var="filter" items="${filters}">
			                       			<tr>
			                       				<c:forEach var="filter" items="${filters}">
			                       					<td></td>
			                       				<c:forEach>
			                       			</tr>
			                       		<c:forEach>
			                       		</table>
	                        		</c:if>
	                           	</div>
	                        </div>
                            <div id="cmeSearchFilterBottom" class="cmeClearContent">
                                <div id="cmeSearchFilterBottomResults" style="display: block;"> <span class="cmeSearchFilterResultsCount cmeResults">${results}</span> Results </div>
                                <input type="submit" id="btnSearchFilterConfirmBottom" class="cmeButton cmeButtonPrimary cmeSearchFilterConfirm" value="Filter Results" style="display: none;"> <input type="button" id="btnSearchFilterCancelBottom" class="cmeButton cmeDynamicShow cmeButtonSecondary cmeSearchFilterCancel" value="Cancel" style="display: none;"> <a href="/tools-information/find-a-broker.html" id="btnSearchFilterResetBottom" class="cmeButton cmeDynamicShow cmeButtonSecondary cmeSearchFilterReset">Reset</a> 
                            </div>
                        </div>
                    </div>
                </div>
                <div id="cmeSearchFilterRight">
                    <h3>Search Results</h3>
                    <div class="cmePaginationWrapper">
                        <div class="page_top"></div>
                    </div>
                    <div class="cmeTableBlockWrapper" style="">
                       	<ol id="cmeSearchFilterResults" class="cmeResultListing cmeClearContent cmeFloatingHead">
                       		<c:forEach var="filterResult" items="${filterResults}">
			                    <li>
			                        <div class="vcard">
			                            <ul class="cmeSearchFilterResult">
		                                	<li class="cmeSearchFilterResultName"><span class="fn"><span class="org">${filterResult.name}</span></span></li>
		                                	<li class="cmeSearchFilterResultLink"><a class="cmeButton cmeDynamicShow cmeButtonPrimary" href="${filterResult.url}">View Contacts &amp; Services</a></li>
			                            </ul>
			                        </div>
			                    </li>
		                   	<c:forEach>
		                </ol>
                    </div>
                    <div class="cmePaginationWrapper">
                        <div class="page_bottom"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</c:if>
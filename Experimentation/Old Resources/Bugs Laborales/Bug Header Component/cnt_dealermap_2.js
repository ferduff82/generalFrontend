		(function($) {
				mrm.cmp = mrm.cmp || {};
				$.extend(mrm.cmp, {
					cnt_dealermap_2: {
						/* GMDS */
						$dealerMapCmp: null,
						_externalDomain: '',
						/* private variables */
						_dataUrl: '/bypass/gmna/dealerlocator/services/getdealers?type=PostalCode&format=JSON&x-country=US&x-language=en&x-brand=Chevrolet&postalcode=',
						//_dataUrl:'/_tmp/json.php?zipcode=',
						_mainmap: null,
						_infowindow: null,
						_latlng: null,
						_cityState: '',
						_geo: null,
						_bounds: null,
						_markerArray: [],
						_dealerMapDOMObj: null,
						_conf: {
							defaultRadius: 30, // integer / default to 30
							defaultResults: 5, // integer
							availableMapViews: 'maps', // maps | satellite | both
							showDealerWebsiteLink: true, // true/false
							dealerWebsiteLabel: 'Dealer Website', // string
							showDistanceFromOrigin: true, // true/false
							distanceFromOriginLabel: 'Distance', //string
							allDealersUrl: null,
							showFax: true, // true/false
							setInfoWidth: true, //true = set info_container width based on map size  || false = does not set info_container width
							showPhone: true,
							servicesFilter: 'all', //string
							mapWidth: '100%', //string 100px or 100%
							mapHeight: '210px'
						},
						_advancedLink: '',
						_charArr: 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(','),
						_protocol: (location.protocol === "https:") ? 'https://' : 'http://',
						/* -----------------------------------
						 // -- Function: Init
						 // ----------------------------------- */
						init: function() {
							alert("Tirando fiddler");
							var loading = true;
							function loadScript() {
							  var script = document.createElement('script');
							  script.type = 'text/javascript';
							  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
							      'callback=initialize';
							  document.body.appendChild(script);
							}
							if(loading == true){
								loadScript();
							}
							if (!$('html').hasClass('cq-wcm-edit')) {
								this.$dealerMapCmp = $('div.cnt_dealermap_2');
								this._dealerMapDOMObj = this.$dealerMapCmp.find('#gmv_dealermap')[0];
								this._externalDomain = (typeof (MRM_EXTERNAL_DOMAIN) != 'undefined') ? MRM_EXTERNAL_DOMAIN : '';
								// stop if nav_dealermap_2 is not present
								if (!this.$dealerMapCmp.length) {
									return;
								}
								var self = this;
								// set the globar var for link to the full dealer locator page
								self._conf.allDealersUrl = this.$dealerMapCmp.data('allDealerLink');
								// set conf overrides
								$.extend(this._conf, mrm.conf.cmp.cnt_dealermap_2 || {});
								// set the width/height properties
								if ((self._conf.mapWidth !== '') && (self._conf.mapWidth !== '0')) {
									if (!isNaN(self._conf.mapWidth))
										self._conf.mapWidth += 'px';
									this._dealerMapDOMObj.style.width = self._conf.mapWidth;
								}
								if ((self._conf.mapHeight !== '') && (self._conf.mapWidth !== '0')) {
									if (!isNaN(self._conf.mapHeight))
										self._conf.mapHeight += 'px';
									this._dealerMapDOMObj.style.height = self._conf.mapHeight;
								}
								// Set advanced link for NGDOE use or not.
								self._advancedLink = ($('div').hasClass('gmdsWidget')) ? self.$dealerMapCmp.find('.form_elements a:last-child').attr('href').split('/', 3).join('/') : '';
								//Set the 'View All Dealers' button
								self.$dealerMapCmp.find('div.dealer_all_results_container a.btn_sec:first').attr('href', self._conf.allDealersUrl);
								//check for zipcode
								var zipCode = null;
								if (mrm.util.cookie.get("cookie_customer_location") !== null) {
									try {
										var info = $.parseJSON(mrm.util.cookie.get("cookie_customer_location"));
										zipCode = info.zipcode;
									} catch (e) {
									}
								} else if (mrm.util.cookie.get("GMWP_location") !== null) {
									try {
										var info = mrm.util.cookie.get("GMWP_location");
										var arrInfo = info.split(',');
										for (i = 0; i < arrInfo.length; i++) {
											var keyval = arrInfo[i].split('=');
											if (keyval[0] === 'zip') {
												// pull out the first zipcode
												if (keyval[0] !== '') {
													zipCode = keyval[1].substr(0, 5);
												}
												break;
											}
										}
									} catch (e) {
									}
								}
								if (zipCode !== null) {
									// prepopulate the zip code if the cookie exists through various means
									$('div.cnt_dealermap_2 div.form_elements input.gmv_zipcode').val(zipCode);
								}
								this.createBinds();
								if(self._conf.geoLocation === true){
									self.initGeoLocation();
								}
							}
						},
						initMap: function() {
							var self = this;
							// load up loading div
							self.$dealerMapCmp.find('div.service_loading').css('visibility', 'visible');
							// load up google maps
							if (typeof (google) === 'undefined') {
								$.getScript('//maps.google.com/maps/api/js?sensor=false', function(data, textStatus, jqxhr) {
									if (textStatus === 'success') {
										self.initMapContinue(_zipcode);
									}
								});
							} else {
								self.initMapContinue();
							}
						},
						initMapContinue: function() {
							// set map options
							var self = this;
							var _zipcode = self.$dealerMapCmp.find('input.gmv_zipcode').val();
							var mapType = google.maps.MapTypeId.HYBRID;
							var mapControls = true;
							self.$dealerMapCmp.find('div.results_container').slideDown('slow');
							switch (self._conf.availableMapViews) {
								case 'satellite':
									mapType = google.maps.MapTypeId.HYBRID;
									mapControls = false;
									break;
								case 'maps':
									mapType = google.maps.MapTypeId.ROADMAP;
									mapControls = false;
									break;
							}
							// Creating a map
							self._mainmap = new google.maps.Map(
								this._dealerMapDOMObj, {
									zoom: 3,
									streetViewControl: false,
									scaleControl: true,
									mapTypeControl: mapControls,
									mapTypeId: mapType,
									zoomControlOptions: {
										style: google.maps.ZoomControlStyle.SMALL
									}

								});
							self._geo = new google.maps.Geocoder();
							self._infowindow = new google.maps.InfoWindow({
								content: "loading..."
							});
							self._mainmap.setCenter(new google.maps.LatLng(37.055177, -95.668945));
							self._mainmap.setZoom(5);
							// process map functionality
							$('div.gmv_maploading').css('height', '0').show();
							self.executeAJAX();
							// move the info container now that Google Maps has been loaded
							//edited to have results display below the map.
							if (!self.$dealerMapCmp.find('.info_container').length) {
								self.$dealerMapCmp.find('.dealer_all_results_container').prepend('<div class="info_container"><div class="dealer_info"></div><div class="dealer_shopping_links"></div></div>');
							}
							if (self._conf.setInfoWidth)
								self.$dealerMapCmp.find('.info_container').width(self.$dealerMapCmp.find('#gmv_dealermap').width() - 20);
							// self.$dealerMapCmp.find('.info_container')
							//     .append('<div class="dealer_background"></div>');
							//    // .appendTo('.dealer_all_results_container');


							if (typeof (Omniture_s) != 'undefined') {
			                    mrm.util.tagging.omniture_tl(this, window.location.pathname, 'o', undefined, {
			                        'events': 'event7',
			                        'prop16': 'locate a dealer',
			                        'prop27': 'global_nav:locate a dealer',
			                        'prop32': 'global_nav: locate a dealer: go',
			                        'eVar35': _zipcode

			                    });
			                }
						},
						initGeoLocation: function() {
							// Add the geoLocation button
							var locate = mrm.util.geoLocation,
								$mod = this.$dealerMapCmp,
								error_message = '';
							if (locate && locate.available()) {
								var $input = $mod.find('input');
								var error_message = 'Your location could not be determined. Please enter a valid Zip Code';
								$input.after($('<div id="error_msg">').text(error_message));
								$input.attr('rel', '#error_msg');
								$input.before($('<button class="btn_prim geolocate"><span title="Use my current location">geo</span></button>').on('click', function(e) {
									e.preventDefault();
									e.stopPropagation();
									locate.getLocationZip(function(results) {
										if (results.status === 'success') {
											$input.val(results.postal_code);
											$mod.find('.gmv_infolink').click();
										} else {
											$input.addClass('gl_error');
										}
									});
								}));
								var cluetipCfg = {
									positionBy: 'auto',
									width: 'auto',
									local:true,
									hideLocal:true,
									cluetipClass: 'location_err',
									showTitle: false,
									splitTitle: '',
									cluezIndex: 9999999,
									onActivate: function(e){
										if(!$input.hasClass('gl_error')){
											return false;
										}
										return true;
									}
								}
								$input.cluetip(cluetipCfg);
							}
						},
						// -----------------------------------
						// -- Function: Execute AJAX call and return JSON
						// -----------------------------------
						executeAJAX: function() {
							var self = this;
							var _returnjson = '',
								_zipcode = self.$dealerMapCmp.find('input.gmv_zipcode').val(),
								_externalDomain = "http://www.gmfleet.com";
							$.ajax({
								dataType: (self._externalDomain !== '') ? 'jsonp' : 'json',
								async: true,
								url: _externalDomain + self._dataUrl + _zipcode,
								cache: true,
								success: function(_data, _response) {
									var _trueCount = 0;
									for (var _count = 0; _count < _data.length; _count++) {

										$('.cnt_dealermap_2 :checkbox').on( "click", function() {
											if($( "input:checked" ).val() == false){
												//is checked!
												self._conf.servicesFilter.toLowerCase() == 'bussinesEliteDealers';
											} else {
												//is unchecked!
												self._conf.servicesFilter.toLowerCase() == 'all';
											};
										});

										// filter if exists
										if ((self._conf.servicesFilter.toLowerCase() == 'all') || (self._conf.servicesFilter.toLowerCase() == '')) {
											if (_trueCount < self._conf.defaultResults)
												self.addMarker(_data[_count], _trueCount);
											_trueCount++;
										} else if (self._conf.servicesFilter.toLowerCase() == 'bussinesEliteDealers') {

											addData(_data[_count]);

											function addData(_dealer) {
												var services = _dealer.services;
												for (var count = 0; count < services.length; count++){
													if(services[count] !== undefined) {
														var nameService = services[count].serviceName;
														if (nameService == "Business Elite") {
															if (_trueCount < self._conf.defaultResults)
															self.addMarker(_dealer, _trueCount);
															_trueCount++;
														}	
													}
												}
											}
										}
									}

									self.$dealerMapCmp.find('p.dealer_results').html((_data.length) + ' dealers found near ' + _zipcode);
									$('div.gmv_maploading').animate({height: self._conf.mapHeight});
									self.$dealerMapCmp.find('div.service_loading').css('visibility', 'hidden');
								},
								error: function() {
									self.$dealerMapCmp.prepend('<div class="error">We apologize, but there was an error accessing the dealer locator service.  Please try again later.</div>');
									self.$dealerMapCmp.find('div.error').fadeTo(0, 0).delay(1000).fadeTo(1000, 100).delay(5000).fadeTo(1000, 0);
								}
							});
							return _returnjson;
						},
						//* -----------------------------------
						// -- Function: Clear Map Markers
						// ----------------------------------- */
						clearMap: function() {
							var _count = 0;
							if (this._markerArray.length) {
								for (_count = 0; _count < this._markerArray.length; _count++) {
									this._markerArray[_count].setMap(null);
								}
								this._markerArray = [];
							}
						},
						/* -----------------------------------
						 // -- Function: Add Marker
						 // ----------------------------------- */
						addMarker: function(_dealer, _trueCount) {
							var self = this;
							var dealerTitle = (self._conf.showDealerWebsiteLink && (_dealer.url != '')) ? '<a href="' + _dealer.url + '" target="_blank">' + _dealer.brandSiteName + '</a>' : _dealer.brandSiteName;
							var dealerUrl = (self._conf.showDealerWebsiteLink && (_dealer.url != '')) ? '<br /><a href="' + _dealer.url + '" target="_blank">' + self._conf.dealerWebsiteLabel + '</a>' : '';
							var dealerPhone = (self._conf.showPhone && (_dealer.contact.phone != '')) ? _dealer.contact.phone : '';
							var dealerFax = (self._conf.showFax && (_dealer.contact.fax != '')) ? 'FAX: ' + _dealer.contact.fax + '<br />' : '';
							var dealerDistance = (self._conf.showDistanceFromOrigin && (!isNaN(parseFloat(_dealer.distance.distance)))) ? '<br />Distance: ' + parseFloat(_dealer.distance.distance).toFixed(1) + ' ' + _dealer.distance.unitOfLength : '';
							var shoppingLinks = '';

							// driving directions - add once functionality is complete on Dealer Locator
							// shoppingLinks += '<a href="#" class="btn_prim">Driving Directions</a>';
							if (self._conf.shoppingLinks) {
								for (iShoppingLink = 0; iShoppingLink < self._conf.shoppingLinks.length; iShoppingLink++) {						
									// add dealerId
									var dealerId = (self._conf.shoppingLinks[iShoppingLink].url.indexOf('?') == -1) ? '?x-caller=lad&bacId=' + _dealer.dealerId : '&x-caller=lad&bacId=' + _dealer.dealerId;
									if ( _dealer.enableCID === '' && self._conf.shoppingLinks[iShoppingLink].label !== 'Search Inventory' ) {
										// exclude empty CID and non 'Search Inventory' links
									} else {
										shoppingLinks += '<a href="' + self._advancedLink + self._conf.shoppingLinks[iShoppingLink].url + dealerId + '">' + self._conf.shoppingLinks[iShoppingLink].label + '</a>';
									}
								}
								if (shoppingLinks !== '')
									shoppingLinks = '<div class="shoppingLinks">' + shoppingLinks + '</div>';
							}
							var latLng = new google.maps.LatLng(parseFloat(_dealer.address.latitude), parseFloat(_dealer.address.longitud));
							var _marker = new google.maps.Marker({
								position: latLng,
								map: self._mainmap,
								title: _dealer.dealerName,
								html: '<div>' + '<p>' + _dealer.brandSiteName + '<br />' + _dealer.address.street + '<br />' + _dealer.address.city + ', ' + _dealer.address.province + ' ' + _dealer.address.postCode + '</p>' + '</div>',
								icon: self._protocol + 'www.google.com/mapfiles/marker' + self._charArr[_trueCount] + '.png'
							});

							var dealerObject = {'dealerTitle':dealerTitle,'dealerUrl':dealerUrl,'dealerPhone':dealerPhone,'dealerFax':dealerFax,'dealerDistance':dealerDistance};
							$.extend( true, dealerObject, _dealer);
							var dealerInfo = self.getDealerInfoHTML(_marker, dealerObject);

							google.maps.event.addListener(_marker, "click", function() {
								// fill dealer info
								self.showDealerInfo(dealerInfo, shoppingLinks);
								// analytics call
								if (typeof (Omniture_s) != 'undefined') {
									mrm.util.tagging.omniture_tl(true, window.location.pathname, 'o', undefined, {'prop16': 'Nav Dealer Locator Component', 'prop32': 'Dealer Map Marker - ' + _dealer.brandSiteName})
								}
							});
							self._markerArray.push(_marker);
							if (_trueCount === 0) {
								self._mainmap.setZoom(10);
								self._mainmap.panTo(latLng);
								self.showDealerInfo(dealerInfo, shoppingLinks);
							}
						},
						getDealerInfoHTML:function(markerObject, dealerObject)
						{
							var html = '';
							html += '<div style="background:url(' + markerObject.icon + ') no-repeat;">';
							html += 	'<h3>' + dealerObject.dealerTitle + '</h3>'
							html += 	'<p>';
							html += 		dealerObject.address.street;
							html += 		'<br />';
							html += 		dealerObject.address.city + ', ' + dealerObject.address.province + ' ' + dealerObject.address.postCode;
							html += 		'<br />';
							html += 		dealerObject.dealerPhone + dealerObject.dealerDistance /*+ dealerFax +  +*/ + dealerObject.dealerUrl;
							html += 	'</p>';
							html += '</div>';

							return html;
						},
						showDealerInfo: function(_dealerInfo, _shoppingLinks) {
							var self = this;
							self.$dealerMapCmp.find('div.info_container').slideUp('slow', function() {
								self.$dealerMapCmp.find('div.dealer_info').html(_dealerInfo);
								self.$dealerMapCmp.find('div.dealer_shopping_links').html(_shoppingLinks);
								$(this).slideDown('slow');
							});
						},
						checkZipCode: function(_event) {
							if (_event)
								_event.preventDefault();
							var self = this;
							var _check = self.$dealerMapCmp.find('input.gmv_zipcode').val();
							var _valid = "0123456789";
							var _count = 0;
							var _proceed = 1;
							var _temp = '';
							if (_check.length != 5) {
								alert("Please enter your 5 digit zip code.");
								_proceed = 0;
								self.$dealerMapCmp.find('input.gmv_zipcode').addClass('err');
							} else {
								for (_count = 0; _count < 5; _count++) {
									_temp = '' + _check.substring(_count, (_count + 1));
									if (_valid.indexOf(_temp) == "-1") {
										_proceed = 0;
										alert("Invalid characters in your zip code. Please try again.");
										self.$dealerMapCmp.find('input.gmv_zipcode').addClass('err');
										return false;
									}
								}
							}
							if (_proceed) {

								self.$dealerMapCmp.find('input.gmv_zipcode').removeClass('err gl_error');
								self.initMap();
								var info = (mrm.util.cookie.get("cookie_customer_location") !== null) ? $.parseJSON(mrm.util.cookie.get("cookie_customer_location")) : {
									zipcode: _check
								};
								info.zipcode = _check;
								mrm.util.cookie.set("cookie_customer_location", JSON.stringify(info), {path: '/'});
							}
						},
						/* -----------------------------------
						 // -- Function: Create Binds
						 // ----------------------------------- */
						createBinds: function() {
							var self = this;
							// Arrow - for map update
							self.$dealerMapCmp.find('div.form_elements a.arrow').on('click', function(e) {
								self.checkZipCode(e)
							});
							self.$dealerMapCmp.find('input.gmv_zipcode').keypress(function(e) {
								if (e.which == 13) {
									e.preventDefault();
									self.checkZipCode(e);
								}
							});
						}
					}
				});
		}(mrm.$));
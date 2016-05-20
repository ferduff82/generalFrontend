var $j = jQuery.noConflict();
if (typeof(window.$) === 'undefined') { window.$ = jQuery; }

var cmeWebsite = cmeWebsite || {};
cmeWebsite.globalValues = (function() {

	var cmeInteractiveTablePageLength = 50;
	var cmeInteractiveTablePageLengthMobile = 25;
	//var cmeUA = navigator.userAgent.toLowerCase();
	var cmeEvent = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? "touchstart" : "click";
	var cmeUseFixedTableHeaders = true;
	var cmeGlobalRequest;
	var cmeUserDevice;
	var cmeWindowResizeTimer;
	var cmeWindowResizeEqHTimer;
	var cmeBrowserString = navigator.appName;
	var cmeUA = navigator.userAgent;
	var cmeBrowserStringRX = cmeUA.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	var cmeMqDisplayDescriptions  = [];
	cmeMqDisplayDescriptions[0] = ["cme-display-xxLarge", "(min-width: 1921px)"];
	cmeMqDisplayDescriptions[1] = ["cme-display-xLarge", "(min-width: 1441px) and (max-width: 1920px)"];
	cmeMqDisplayDescriptions[2] = ["cme-display-large", "(min-width: 1025px) and (max-width: 1440px)"];
	cmeMqDisplayDescriptions[3] = ["cme-display-medium", "(min-width: 641px) and (max-width: 1024px)"];
	cmeMqDisplayDescriptions[4] = ["cme-display-small", "(min-width: 481px) and (max-width: 640px)"];
	cmeMqDisplayDescriptions[5] = ["cme-display-xSmall", "(max-width: 480px)"];

	// get functions
    var getInteractiveTablePageLength = function() {
        return cmeInteractiveTablePageLength;
    };
    var getInteractiveTablePageLengthMobile = function() {
        return cmeInteractiveTablePageLengthMobile;
    };
	var getUA = function() {
		return cmeUA;
	};
	var getEvent = function() {
		return cmeEvent;
	};
	var getUseFixedTableHeaders = function() {
		return cmeUseFixedTableHeaders;
	};
	var getGlobalRequest = function() {
		return cmeGlobalRequest;
	};
	var getUserDevice = function() {
		return cmeUserDevice;
	};
	var getWindowResizeTimer = function() {
		return cmeWindowResizeTimer;
	};
	var getWindowResizeEqHTimer = function() {
		return cmeWindowResizeEqHTimer;
	};
	var getBrowserString = function() {
		return cmeBrowserString;
	};
	var getBrowserStringRX = function() {
		return cmeBrowserStringRX;
	};
	var getMqDisplayDescriptions = function() {
		return cmeMqDisplayDescriptions;
	};

	// set functions
	var setUserDevice = function(val) {
		cmeUserDevice = val;
	};
	var setBrowserStringRXValue = function(val, i) {
		cmeBrowserStringRX[i] = val;
	};
	var setBrowserStringRX = function(val) {
		cmeBrowserStringRX = val;
	};
	var setWindowResizeTimer = function(val) {
		cmeWindowResizeTimer = val;
	};
	var setWindowResizeEqHTimer = function(val) {
		cmeWindowResizeEqHTimer = val;
	};
	var setGlobalRequest = function(val) {
		cmeGlobalRequest = val;
	};
    return {	// access variables
        InteractiveTablePageLength: getInteractiveTablePageLength,
        InteractiveTablePageLengthMobile : getInteractiveTablePageLengthMobile,
		UA : getUA,
		Event : getEvent,
		UseFixedTableHeaders : getUseFixedTableHeaders,
		GlobalRequest : getGlobalRequest,
		UserDevice : getUserDevice,
		WindowResizeTimer : getWindowResizeTimer,
		WindowResizeEqHTimer : getWindowResizeEqHTimer,
		BrowserString : getBrowserString,
		BrowserStringRX : getBrowserStringRX,
		MqDisplayDescriptions : getMqDisplayDescriptions,
		setUserDevice : setUserDevice,
		setBrowserStringRXValue : setBrowserStringRXValue,
		setBrowserStringRX : setBrowserStringRX,
		setWindowResizeTimer : setWindowResizeTimer,
		setWindowResizeEqHTimer : setWindowResizeEqHTimer,
		setGlobalRequest : setGlobalRequest
    };

})();

var cmeVal = cmeWebsite.globalValues;	// shortcut to global vals namespace
var cmePageFilters = {}; // used for storing JavaScript interactions for bookmarking - see jquery.cmePageFilters.js

/*********************************************/
/* SETTING ENVIRONMENT VARIABLES IN HTML TAG */
/*********************************************/
$j(function(){
	if ($j('#cmePageWrapper').css('position') === 'static') {
		$j('html').addClass('cmeResponsive');
	}
	if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch){
		$j('html').addClass('cme-touch-device');
	}
	// detect SVG support
	function supportsSVG(){
		return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;
	}
	if (supportsSVG()){
		$j('html').addClass('cme-svg');
	}
	// detect canvas support
	function supportsCanvas(){
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	}
	if(supportsCanvas()){
		$j('html').addClass('cme-canvas');
	}
	// detect canvas text support
	function supportsCanvasText() {
		if (!$j('html').hasClass('cme-canvas')) { return false; }
		var dummy_canvas = document.createElement('canvas');
		var context = dummy_canvas.getContext('2d');
		return typeof context.fillText === 'function';
	}
	if(supportsCanvasText()){
		$j('html').addClass('cme-canvas-text');
	}
	// detect local storage support
	function supportsLocalStorage(){
	    var test = 'test';
	    try {
	      localStorage.setItem(test, test);
	      localStorage.removeItem(test);
	      return true;
	   } catch(e) {
	   		return false;
	   }
	}
	if(supportsLocalStorage()){
		$j('html').addClass('cme-localstorage');
	}
	// detect audio and video support
	var supportsMedia = function(mediaType) {
		'use strict';
		try {
			return !!(document.createElement(mediaType).canPlayType);
	   } catch(e) {
	   		return false;
	   }
	};
	if (supportsMedia('audio')) {
		$j('html').addClass('cme-media-audio');
	}
	if (supportsMedia('video')) {
		$j('html').addClass('cme-media-video');
	}
	// detect CSS property support
	var supportsCSS = (function() {
		var div = document.createElement('div'), vendors = 'Khtml Ms O Moz Webkit'.split(' '), len = vendors.length;
		return function(prop) {
	      if ( prop in div.style ) return true;
	      prop = prop.replace(/^[a-z]/, function(val) {
	         return val.toUpperCase();
	      });
	      while(len--) {
	         if ( vendors[len] + prop in div.style ) {
	            return true;
	         }
	      }
	      return false;
	   };
	})();
	if (supportsCSS('columns')) {
		$j('html').addClass('cme-css-columns');
	}
	// detect pseudo element/selector support
	var selectorSupported = function (selector) {
		'use strict';
		var support, sheet, doc = document, root = doc.documentElement, head = root.getElementsByTagName('head')[0], impl = doc.implementation || {hasFeature: function() {return false;}};
		var dynamicStylesheet = doc.createElement("style");
		dynamicStylesheet.type = 'text/css';
		(head || root).insertBefore(dynamicStylesheet, (head || root).firstChild);
		sheet = dynamicStylesheet.sheet || dynamicStylesheet.styleSheet;	 
		if (!(sheet && selector)) return false;	 
		support = impl.hasFeature('CSS2', '') ? function(selector) {
			try {
				sheet.insertRule(selector + '{ }', 0);
				sheet.deleteRule(sheet.cssRules.length - 1);
			} catch (e) {
				return false;
			}
			return true;
		} : function(selector) {
			sheet.cssText = selector + ' { }';
			return sheet.cssText.length !== 0 && !(/unknown/i).test(sheet.cssText) && sheet.cssText.indexOf(selector) !== -1;
		};
		var isSupported = support(selector);
		(head || root).removeChild(dynamicStylesheet);
		return isSupported;
	};
	if (selectorSupported(':before')) {
		$j('html').addClass('cme-pseudo-elements');
	} else {
		$j('html').addClass('no-pseudo-elements');
	}
	if (selectorSupported(':nth-child(1)')) {
		$j('html').addClass('cme-nth-selector');
	} else {
		$j('html').addClass('no-nth-selector');
	}
	// detect font-face support
	var isFontFaceSupported = (function(win, undefined) {
		'use strict';
		var doc = document,
			head = doc.head || doc.getElementsByTagName( "head" )[0] || doc.documentElement, rule = "@font-face { font-family: 'webfont'; src: 'https://'; }", supportFontFace = false, blacklist = (function() {
				var wkvers = cmeVal.UA().match(/applewebkit\/([0-9]+)/gi) && parseFloat( RegExp.$1 ), webos = cmeVal.UA().match(/w(eb)?osbrowser/gi), wppre8 = cmeVal.UA().indexOf("windows phone") > -1 && navigator.userAgent.match(/IEMobile\/([0-9])+/) && parseFloat(RegExp.$1) >= 9, oldandroid = wkvers < 533 && cmeVal.UA().indexOf("Android 2.1") > -1;
				return webos || oldandroid || wppre8;
			}()), sheet;
			
		var style = doc.createElement("style");
		style.type = "text/css";
		head.insertBefore(style, head.firstChild);
		sheet = style.sheet || style.styleSheet;
		if (!!sheet && !blacklist) {
			try {
				 if (sheet.insertRule) {
						sheet.insertRule(rule, 0);
						supportFontFace = sheet.cssRules[0].cssText && (/webfont/i).test(sheet.cssRules[0].cssText);
						sheet.deleteRule(sheet.cssRules.length - 1);
				 }
	            else if (sheet.addRule) { //IE
	            	sheet.cssText = rule;
					supportFontFace = sheet.cssText && (/webfont/i).test(sheet.cssText);
	            }
			} catch(e) { }
		}
		head.removeChild(style);
		return supportFontFace;
	}(this));
	if (isFontFaceSupported) {
		$j('html').addClass('cme-font-face');
	} else {
		$j('html').addClass('no-font-face');
	}
	// detect matchmedia support
	if (window.matchMedia) {
		$j('html').addClass('cme-match-media');
	}
	// detect flash support and version
	function getFlashVersion() {
		try { // ie
			try {
				var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
				try { axo.AllowScriptAccess = 'always'; }
				catch(e) { return '6,0,0'; }
			} catch(e) {}
				return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
		} catch(e) {
			try { // other browsers
				if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
					return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
				}
			} catch(e) {}
		}
		return '0,0,0';
	}
	var flashVersion = getFlashVersion().split(',').shift();
	if (flashVersion === "0"){
		$j('html').addClass('no-flash');
	} else {
		$j('html').addClass('cme-flash').addClass('cme-flash-'+flashVersion);
	}
	// detect XML Transform support
	function isXMLProcessorSupported(){
		if (document.implementation && document.implementation.createDocument && typeof XSLTProcessor !== 'undefined') {
			return true;
		} else try {
		    return false;
		}
		catch (e) {
			return false;
		}
	}
	if(isXMLProcessorSupported){
		$j('html').addClass('cme-xml-transform');
	}
	// detect cookie support
	function isCookieSupported(){
		try {
			return ("cookie" in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
		} catch(e) {
			return false;
		}
	}
	if(isCookieSupported){
		$j('html').addClass('cme-cookies');
	}

	// detect browser and device
	var tem;
	if (cmeVal.BrowserStringRX() && (tem= cmeVal.UA().match(/version\/([\.\d]+)/i))!= null) cmeVal.setBrowserStringRXValue(tem[1], 2);
	cmeVal.setBrowserStringRX(cmeVal.BrowserStringRX() ? [cmeVal.BrowserStringRX()[1], cmeVal.BrowserStringRX()[2]] : [cmeVal.BrowserString(), navigator.appVersion, '-?']);

	$j('html').addClass(cmeVal.BrowserStringRX()[0].toLowerCase()+ '-' + parseInt(cmeVal.BrowserStringRX()[1]));
	$j('html').addClass(cmeVal.BrowserStringRX()[0].toLowerCase());

	if (cmeVal.UA().match(/iPhone/i)){
		cmeVal.setUserDevice("cme-iphone");
	} else if (cmeVal.UA().match(/iPad/i)){
		cmeVal.setUserDevice("cme-ipad");
	} else if (cmeVal.UA().match(/Android/i)){
		cmeVal.setUserDevice("cme-android");
	}
	if (cmeVal.UserDevice() !== "" && cmeVal.UserDevice !== undefined){
		$j('html').addClass(cmeVal.UserDevice());
	}
});

function evaluateMQMatches(mqArray, clearExistingRelatedClasses){
	clearExistingRelatedClasses = ((typeof clearExistingRelatedClasses !== 'undefined') ? clearExistingRelatedClasses : false);
	if ($j('html').hasClass('cme-match-media')){
		var element = $j('html');
		for(var i=0, len = mqArray.length;i<len;i++){
			if(window.matchMedia(mqArray[i][1]).matches){
				if (clearExistingRelatedClasses === true){
					for(var x=0, len = mqArray.length;x<len;x++){
						element.removeClass(mqArray[x][0]);
					}
				}
				element.addClass(mqArray[i][0]);
				break;
			}
		}
	}
}
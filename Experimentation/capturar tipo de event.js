
//Solución para bug de captura de eventos en Firefox.

$('li').click(function (e) {
    var e = window.event || e;
    	e.stopPropagation();
    	e.cancelBubble = true;
});

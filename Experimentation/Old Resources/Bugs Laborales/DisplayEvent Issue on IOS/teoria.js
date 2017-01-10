
/* NO FUNCIONA EN IOS */

//window.open(download_link,"_blank");

/* NO FUNCIONA EN FIREFOX NI EN EXPLORER */

/*
var a = document.createElement('a');
    a.setAttribute("href", download_link);
    a.setAttribute("target", "_self");

var dispatch = document.createEvent("HTMLEvents");
    dispatch.initEvent("click", true, true);
    a.dispatchEvent(dispatch);
*/

/* FUNCIONA EN TODOS LADOS */

var a = document.createElement('a');
    a.setAttribute("href", download_link);
    a.setAttribute("target", "_self");

var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});

a.dispatchEvent(event);

/* EJEMPLO DE DOCUMENTACION https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#Triggering_built-in_events */

/*
var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
var cb = document.getElementById('a'); 
var canceled = !cb.dispatchEvent(event);
if (canceled) {
    // A handler called preventDefault.
    alert("canceled");
} else {
    // None of the handlers called preventDefault.
    alert("not canceled");
}
*/
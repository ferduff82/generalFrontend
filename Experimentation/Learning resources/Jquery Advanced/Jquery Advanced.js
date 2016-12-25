/****************************************************/
/* Always wrapp Jquery like this (protecting Alias) */
/****************************************************/

(function($){

console.log("Code");

})(jQuery);


/*****************************************/
/* Always delegate events using Bubbling */
/*****************************************/

/* This aproach delegates an event to all possible tr on the DOM, not recomendable */

$( "#dataTable tbody tr" ).on( "click", function() {
  console.log( $( this ).text() );
});

/* This aproach delegates an event to the tbody and uses bubbling to access all tr so you just delegated one event */

$( "#dataTable tbody" ).on( "click", "tr", function() {
  console.log( $( this ).text() );
});

/* Also you can add a namespace for the event so that you can "off" the event anytime */

$("#element").on("click.someNamespace", function() { console.log("anonymous!"); });

$("#element").off("click.someNamespace");


/******************************/
/* find() vs Context Selector */
/******************************/

/* They are both identical except that find is a little faster */

$(".something").find("p").css("border", "1px solid red");

$("p", ".something").css("border", "1px solid red");


/********/
/* Wrap */
/********/

/* Wraps a tag with another tag */

$("button").click(function(){
    $("p").wrap("<div></div>");
});


/***************************************************/
/* Adding plugins, modifiying the Jquery prototype */
/***************************************************/

(function ( $ ) {
 
    $.fn.greenify = function( options ) {
 
        /* This is the easiest way to have default options */
        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white"
        }, options );

        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
    };
}( jQuery ));

/* Instance the new plugin */

$( "div" ).greenify({
    color: "orange"
});
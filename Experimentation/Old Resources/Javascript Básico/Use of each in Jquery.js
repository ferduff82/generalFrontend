//More examples here http://www.sitepoint.com/jquery-each-examples/

//DOM ELEMENTS
$("div").each(function(index, value) { 
    console.log('div' + index + ':' + $(this).attr('id')); 
});
//outputs the ids of every div on the web page
//ie - div1:header, div2:body, div3:footer

//ARRAYS
var arr = [ "one", "two", "three", "four", "five" ];
jQuery.each(arr, function(index, value) {
       console.log(this);
       return (this != "three"); // will stop running after "three"
   });
//outputs: one two three

//OBJECTS
var obj = { one:1, two:2, three:3, four:4, five:5 };
    jQuery.each(obj, function(i, val) {
       console.log(val);
    });
//outputs: 1 2 3 4 5
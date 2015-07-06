var number = 0;

function test() {
    if(number === 0) {
        alert("es 0");
        number++
    }else{
        alert("es 1");
        number--
    }
}

$(".click").click(function(){
    test();
})
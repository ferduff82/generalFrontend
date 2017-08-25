
/* 
Deferred se utiliza para evitar el callback hell, 
está basado en functional programming al igual que 
las promises, es composable.
Se busca resolver un proceso asincrono y se retorna una 
promise con el objetive de que lo que se retorna no pueda 
ser resuelto por fuera del proceso async.
https://www.sitepoint.com/introduction-jquery-deferred-objects/
*/

function getCustomer(customerId){
    var d = $.Deferred();
    
    $.post( "/echo/json/", {
        json: JSON.stringify({firstName: "Jose", lastName: "Romaniello", ssn: "123456789"}),
        delay: 4
    }).done(function(p){
        d.resolve(p);
    }).fail(d.reject); 
    return d.promise();
}

function getPersonAddressBySSN(ssn){
    return $.post("/echo/json/", {
         json: JSON.stringify({
              ssn: "123456789",
              address: "Siempre Viva 12345, Springfield" }),
         delay: 2
    }).pipe(function(p){
        return p.address;
    });
}

function load(){
    $.blockUI({message: "Loading..."});

    var loadingCustomer = getCustomer(123).done(function(c){
        $("span#firstName").html(c.firstName)
    });
    var loadingAddress = getPersonAddressBySSN("123456789").done(function(address){
        $("span#address").html(address)
    });
    
    $.when(loadingCustomer, loadingAddress).done($.unblockUI);
}

load();

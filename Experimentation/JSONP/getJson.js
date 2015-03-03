function jsonp(url){  
    var head = document.getElementsByTagName("head")[0];  
    var script = document.createElement("script");  
    script.type = "text/javascript";  
    script.src = url;  
    head.appendChild(script);  
}  
function json_process(data){  
    alert(data);  
    console.info(data);  
}  
function test(){  
    var url = "http://www.flickr.com/services/rest/?method=flickr.test.echo&format=json&api_key=fb3db427da4bcda80f74ea31c64cd64d&jsoncallback=json_process";  
    jsonp(url);  
}  
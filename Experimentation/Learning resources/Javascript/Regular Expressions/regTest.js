var re = /\d+/g,
	str = "sddda 445",
	myArray = str.search(re);

console.log(myArray);


var re = /^\d{5}(\-\d{4})?$/,
	str = "43543-2342",
	myArray = re.exec(str);

console.log(myArray);


var re = /^(http:|https:)\/\/([w]{3}\.)?\D+\./,
	str = "https://www.facebook.com",
	myArray = str.match(re);

console.log(myArray);


var re = /\bdog\b/,
	str = "habia un dog muy boludo",
	myArray = re.test(str);

console.log(myArray);


var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	str = "ferduff82@hotmail.com",
	myArray = str.match(re);

console.log(myArray);


var re = /.m/,
	str = "samuel",
	myArray = str.match(re);

console.log(myArray);
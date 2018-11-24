
let definitions = ["asdsdsa", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda"];



function display() {
	console.log(0);
	var x = document.getElementById("info");
	console.log(1);
	
	for (let i = 0; i < definitions.length; i ++) {
		var par = document.createElement("par");
		var text = document.createTextNode(definitions[i]);
		par.appendChild(text);
		x.appendChild(par);
	}

}
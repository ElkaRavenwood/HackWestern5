const words = new Set(); // List of words
let acrArray = []; // List of acronyms

// Collects all words in a web page
function userToArray (node) {
	
	// Collects child nodes of (root) node
	let children = node.childNodes;

	// If node is leaf 
	if (children[0] === undefined || children.length == 0) {

		// Checks if text node - If it isn't a text node, will ignore
		if (node.nodeType === Node.TEXT_NODE) {
			
			// Makes array of words in text (ie if splits it)
			let inNode = node.textContent.split(' ');

			// Runs through loop
			for (let i = 0; i < inNode.length; i ++) {
				
				// Gets rid of whitespace
				inNode[i].trim();
				
				// Removes of new line character
				inNode[i] = inNode[i].replace(/^\s+|\s+$/g, '');
				
				// Makes array of acceptable characters in word
				let found = inNode[i].match(/[a-zA-Z]/g);
				
				// Makes temporary variable
				let tempWord = "";
				
				// If there is 1+ acceptable character
				if (found != undefined){
				
					// Adds it to the temp variable
					for (let j = 0; j < found.length;  j++) {
						tempWord += found[j];
					}
				}
				
				// If the temp variable exists
				if (tempWord != "") {
				
					// Adds to word set
					words.add(tempWord);
				}
				
			}

		}

	// If not a leaf
	} else {

		// Calls again
		for (let i = 0; i < children.length; i ++) {
			userToArray(children[i]);
		}
	}
}

function checkAcr(webpage){
   var acrArray = []
   for(var i = 0; i < webpage.length; i++){
       var acrWord = false;
       word = webpage[i];
       if(word == word.toUpperCase() && word.length > 1){
           acrWord = true;
       }

       for(w = 0; w < word.length-1; w++){
           if(word[w+1] == word[w+1].toUpperCase()){
               acrWord = true;
           }
       }

       if(acrWord){
           for(z = 0; z < word.length; z++){
               word = word.replace('.', '');
           }
           acrArray.push(word);
       }


   }
   for(var i = 0; i < acrArray.length; i++){
		getAcronyms(acrArray[i]);
	}
}

// Converts user details into array
userToArray(document.body);

// Gets acronyms
checkAcr(Array.from(words));

// Creates div element, sets style
let div = document.createElement("div");
div.id = "defList";
div.style.paddingLeft = "20px";
div.style.width = "20%";
div.style.height = screen.height;
div.style.overflowX = "scroll";
div.style.overflowY = "scroll";
div.style.paddingRight = "20px";
div.style.backgroundColor = "#f5fffa";
div.style.fontFamily = document.body.style.fontFamily;
div.style.fontSize = document.body.style.fontSize;
div.style.fontColor = "black";
div.style.position = "-webkit-sticky";
div.style.position = "sticky";
div.style.top = "20px";
div.style.opacity = "1";
document.body.style.display = "flex";
document.body.style.float = "top";

// Creates new body element, sets style
let newBod = document.createElement("div");
newBod.id = "newBod";
newBod.style.maxWidth = "80%";
newBod.style.paddingLeft = "20px";
newBod.innerHTML  = document.body.innerHTML;
document.body.innerHTML = "";
// Inserts into document
document.body.insertAdjacentElement('afterBegin', div);
document.body.insertAdjacentElement('beforeEnd', newBod);


console.log('end');

function getAcronyms(acr) {
	console.log("Test - " + acr);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	//console.log(JSON.parse(this.responseText));
    	updateAcronyms(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "http://localhost:3000/?acr="+acr, true);
  xhttp.send();
}

function updateAcronyms(acrDict){
	var key = acrDict[0];

	for(var i = 1; i < acrDict.length; i++){
		if(acrDict[i] != ""){
			let par = document.createElement("p");
			let text = document.createTextNode(key + " - " + acrDict[i] + "\n");
			par.appendChild(text);
			div.appendChild(par);
		}
	}
	
}

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
				let found = inNode[i].match(/[a-zA-Z.]/g);
				
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
   console.log(acrArray);
}

// Converts user details into array
userToArray(document.body);

// Gets acronyms
checkAcr(Array.from(words));

// Creates div element, sets style
let div = document.createElement("div");
div.id = "defList";
div.style.paddingLeft = "20px";
div.style.maxWidth = "20%";
div.style.height = screen.height;
div.style.overflow = "scroll";
div.style.backgroundColor = "#f5fffa";
div.style.fontFamily = document.body.style.fontFamily;
div.style.fontSize = document.body.style.fontSize;
div.style.fontColor = "black";
div.style.position = "-webkit-sticky";
div.style.position = "sticky";
div.style.top = "0px";
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

document.body.insertAdjacentElement('afterBegin', div);
document.body.insertAdjacentElement('beforeEnd', newBod);

let definitions = ["asdsdsasdghubfjosvdkegbhiuvdjosclkahuisvodjiackmhgeiufosjiapkehofijsp", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda", "asdasda"];

// Creates text for button, appends to button, then page
for (let i = 0; i < definitions.length; i ++) {
	let par = document.createElement("p");
	let text = document.createTextNode(definitions[i] + "\n");
	par.appendChild(text);
	div.appendChild(par);
}

console.log('end');

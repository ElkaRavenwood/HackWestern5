const words = new Set(); // List of words

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

userToArray(document.body);
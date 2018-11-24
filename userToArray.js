const words = new Set();

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

			// Gets rid of whitespace, adds to set
			for (let i = 0; i < inNode.length; i ++) {
				inNode[i].trim();
				words.add(inNode[i]);
				console.log(inNode[i]);
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

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('start').addEventListener('click', redirectMessage);
});
function redirectMessage(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  	chrome.tabs.sendMessage(tabs[0].id, {action: "start"}, function(response) {
	    	console.log(response.farewell);
		});
	});
}
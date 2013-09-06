/* XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

	this.addEventListener("readystatechange", function() {
		console.log(this, this.readyState);
	}, false);
	
	console.log('open', this);

	open.call(this, method, url, async, user, pass);
};

console.log('hook done'); */

chrome.webRequest.onCompleted.addListener(function(details) { //onResponseStarted
	
	console.log('details', details);
	
	/* chrome.runtime.onConnect.addListener(function(port) {
		port.postMessage({action: "xhr"});
	}); */

	// chrome.tabs.getSelected(null, function(tab) {
	/* chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "feedlyRequest"}, function(response) {});  
	}); */

},{urls: ["*://cloud.feedly.com/*"], types: ["xmlhttprequest"]});
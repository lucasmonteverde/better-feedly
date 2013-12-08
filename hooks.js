chrome.webRequest.onCompleted.addListener(function(details) { //onResponseStarted
	
	//console.log('details', details);
	
	chrome.tabs.sendMessage(details.tabId, {action: "feedlyRequest"}, function(response) {});  

},{urls: ["*://cloud.feedly.com/*"], types: ["xmlhttprequest"]});
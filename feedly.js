/**
 * Better Feedly
 *
 * Copyright (c) 2013 Lucas Monteverde <lucasmonteverde.com>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
**/
//console.log = function() {}

NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;

/* var port = chrome.runtime.connect({name: "feedly"});
port.onMessage.addListener(function(request) {
	if (request.action == "xhr"){
		console.log('lets do this!');
	}
}); */
  
/* chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "feedlyRequest"){
		console.log('lets do this!');
	}
}); */

(function(d){
	"use strict";
	
	var categories, feeds, all, SERVER = 'http://ab-feed.herokuapp.com/file/'; //http://localhost:3000/file/
	
	function parseFeeds(){

		categories = document.querySelectorAll('.categoryUnreadCount');
		feeds = document.querySelectorAll('.feedIndexTitleHolder.emptyAware');
		all = document.querySelector('#latesttab_header > div:first-child');
		
		var totalCount = getCounter( all );
		
		if( totalCount === 0 ) {
			
			categories.forEach(function(item){
				totalCount += getCounter( item );
			});
		
		}
		
		feeds.forEach(function(item){
			if(item && item.parentNode)
				item.parentNode.style.display = (item.classList.contains('empty') ? 'none' : 'block');
			else{
				feeds = undefined; //force reset selector
			}
		});
		
		var title = d.title.replace(/^(\([0-9]+\)\s)/gi, '');
		d.title = '(' + totalCount + ') ' + title;
		
		var images = document.querySelectorAll('img[src*="stooorage.com/thumbs"]');
		images.forEach(function(item){
			item.onerror = function () { 
				this.style.display = 'none';
			}
			
			var title = closest(item, '.entryholder').querySelector('.title');
			after(title, 'http://thepiratebay.se/search/' + title.innerText.replace('-',''), title.innerText );
			
			item.src = SERVER + item.src.replace('//t', '//img').replace('thumbs/', 'images/');
			item.className = 'fullimage';
		});
		
		setTimeout(parseFeeds, 2000);
	}
	setTimeout(parseFeeds, 2000);
	
	/* setTimeout(function(){
		var tabs = d.getElementById('feedlyTabs');
		
		if(tabs){
			tabs.addEventListener('DOMSubtreeModified', function(e, d) {
				console.log('tree changed', e, d);
			});
		}else{
			setTimeout(this, 1000);
		}
		
	}, 1000); */
	
	function getCounter( elem ){
		var count = 0;
		if(elem){
			var result = elem.innerText.trim().match(/[0-9]+/gi);
			if(result && result.length > 0){
				count = parseInt(result[0], 10);
			}
		}
		return count;
	}
	
	function closest(elem, selector) {
		while (elem) {
			if (elem.matches(selector)) {
				return elem;
			} else {
				elem = elem.parentNode;
			}
		}
		return false;
	}
	
	function after(elem, url, text){
		var link = document.createElement('a');
		link.href = encodeURI(url);
		link.className = "torrent";
		link.innerText = text;
		link.target = "_blank";
	
		elem.parentNode.insertBefore(link, elem.nextSibling)
	}

}(document));
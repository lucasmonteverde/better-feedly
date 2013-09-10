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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "feedlyRequest"){
		
		feedlyRequest();
	}
});

(function(d){
	"use strict";
	
	var categories, feeds, all, firstRun = true;
	
	setInterval(function(){

		firstRun && feedlyLoad();
		
		categories = categories || document.querySelectorAll('.categoryUnreadCount');
		feeds = feeds || document.querySelectorAll('.feedIndexTitleHolder.emptyAware');
		all = all || document.querySelector('#latesttab_header > div:first-child');
		
		var totalCount = getCounter( all );
		
		if( totalCount === 0){
			
			categories.forEach(function(item){
				totalCount += getCounter( item );
			});
		
		}
		
		feeds.forEach(function(item){
			item.parentNode.style.display = (item.classList.contains('empty') ? 'none' : 'block');
		});
		
		var title = d.title.replace(/^(\([0-9]+\)\s)/gi, '');
		d.title = '(' + totalCount + ') ' + title;
		
	}, 2000);
	
	function feedlyLoad(){
		var logo = d.getElementById('navSelector_my');
		
		if(logo) {
			logo.dataset.uri = 'latest';
			firstRun = false;
		}
	}
	
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

}(document));
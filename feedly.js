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

(function(d){
	setInterval(function(){

		var counters = document.querySelectorAll('.simpleUnreadCount'),
			totalCount = 0;

		counters.forEach(function(item){
			//console.log( item.innerText.trim() );
			
			var result = item.innerText.trim().match(/[0-9]+/gi);
			
			if(result && result.length > 0){
				if( item.classList.contains('categoryUnreadCount') ){
					totalCount += parseInt(result[0], 10);
				}
			}
			
			item.parentNode.style.display = (result ? 'block' : 'none');
		});
		
		var cleanedTitle = d.title.replace(/^(\([0-9]+\)\s)/gi, '');
		d.title = '(' + totalCount + ') ' + cleanedTitle.replace('f | ','');
		
	}, 2000);
	
	setTimeout(function(){
		var logo = d.getElementById('navSelector_my');
		
		if(logo){
			logo.dataset.uri = 'latest';
		}
	
	}, 3000);

}(document));
/*eslint-disable no-undef, no-unused-vars*/
function toggle(id) {
    var state=document.getElementById(id).style.display;
    document.getElementById(id).style.display=state === 'block' ? 'none' : 'block';
}

function toggleClass(tgclass) {
	var els = document.getElementsByClassName(tgclass);
	var currentDisplay = $('#usertoggle').val() || 'none';
	
	if ('undefined' !== typeof els) {
		//semi toggle, set ALL to display=none xor set ALL to display=block
		//currentDisplay = els[0].style.display; //get the value from usertoggle instead
	
		if (currentDisplay === 'none') {
			$('#usertoggle').val('block');
	    	for(var i=0; i<els.length; ++i){
				var s = els[i].style;
    	  		//s.display = s.display==='none' ? 'block' : 'none';
	      		s.display = 'block';
	   		}
   		} else {
   			$('#usertoggle').val('none');
   			for(var j=0; j<els.length; ++j){
				var ss = els[j].style;
      			//s.display = s.display==='none' ? 'block' : 'none';
      			ss.display = 'none';		
   			}
		}
	}
}
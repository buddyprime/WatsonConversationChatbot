/*eslint-disable no-undef, no-unused-vars*/
function toggle(id) {
    var state=document.getElementById(id).style.display;
    document.getElementById(id).style.display=state === 'block' ? 'none' : 'block';
}

function toggleClass(tgclass) {
	var els = document.getElementsByClassName(tgclass);
	var currentDisplay = 'none';
	
	//semi toggle, set ALL to display=none xor set ALL to display=block
	currentDisplay = els[0].style.display;
	
	if (currentDisplay === 'none') {
	    for(var i=0; i<els.length; ++i){
			var s = els[i].style;
      		//s.display = s.display==='none' ? 'block' : 'none';
      		s.display = 'block';
   		}
   	} else {
   		for(var j=0; j<els.length; ++j){
			var ss = els[j].style;
      		//s.display = s.display==='none' ? 'block' : 'none';
      		ss.display = 'none';		
   		}
	}
}
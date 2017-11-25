/*eslint-disable no-undef, no-unused-vars*/
function toggle(id) {
    var state=document.getElementById(id).style.display;
    document.getElementById(id).style.display=state === 'block' ? 'none' : 'block';
}

function toggleClass(tgclass) {
	var els = document.getElementsByClassName(tgclass);
    for(var i=0; i<els.length; ++i){
		var s = els[i].style;
      	s.display = s.display==='none' ? 'block' : 'none';
   }
}
/*eslint-disable no-undef, no-unused-vars*/
function toggle(id) {
    var state=document.getElementById(id).style.display;
    document.getElementById(id).style.display=state === 'block' ? 'none' : 'block';
}

function toggleClass(tgclass) {
	//var state=jQuery(tgclass).style.display;
    //jQuery(tgclass).style.display=state === 'block' ? 'none' : 'block';
    $(tgclass).hide();
}
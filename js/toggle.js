function toggle(id) {
    var state=document.getElementById(id).style.display;
    document.getElementById(id).style.display=(state == 'block' ? 'none' : 'block');
}
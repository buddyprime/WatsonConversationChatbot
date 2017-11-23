/*eslint-disable no-unused-vars */
function formatJSON(json,textarea) {
    var nl;
    if(textarea) {
        nl = "&#13;&#10;";
    } else {
        nl = "<br>";
    }
    var tab = "&#160;&#160;&#160;&#160;";
    var indent = "";
    var ret = "";
    var numquotes = 0;
    var betweenquotes = false;
    var firstquote = false;
    for (var i = 0; i < json.length; i++) {
        var c = json[i];
        if(c == '"') {
            numquotes ++;
            if((numquotes + 2) % 2 == 1) {
                betweenquotes = true;
            } else {
                betweenquotes = false;
            }
            if((numquotes + 3) % 4 == 0) {
                firstquote = true;
            } else {
                firstquote = false;
            }
        }

        if(c == '[' && !betweenquotes) {
            ret += c;
            ret += nl;
            continue;
        }
        if(c == '{' && !betweenquotes) {      	
            ret += tab;
            ret += c;
            ret += nl;
            continue;
        }
        if(c == '"' && firstquote) {
            ret += tab + tab;
            ret += c;
            continue;
        } else if (c == '"' && !firstquote) {
            ret += c;
            continue;
        }
        if(c == ',' && !betweenquotes) {
            ret += c;
            ret += nl;
            continue;
        }
        if(c == '}' && !betweenquotes) {
            ret += nl;
            ret += tab;
            ret += c;
            continue;
        }
        if(c == ']' && !betweenquotes) {
            ret += nl;
            ret += c;
            continue;
        }
        ret += c;
    } // i loop
    return ret;
}
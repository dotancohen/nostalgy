function gEBI(s) { return document.getElementById(s); }

var nostalgy_old_awRecipientKeyPress = 0;

function nostalgy_awRecipientKeyPress(event, element) {
  if (event.charCode == 32 && element.selectionStart == 2) {
    var id = element.id;
    if (id.match(/addressCol2#/)) {
    var select = gEBI(id.replace(/addressCol2#/,"addressCol1#"));
    var v = element.value;
    var u = v.replace(/ >> .*/, "");
    var f = v.substr(0,2);
    if (f == "to" || f == "cc") {
	select.value = "addr_" + f;
	element.value = "";
	setTimeout(function(){
	  element.value = u.substr(2,u.length - 2);
 	  element.selectionStart = 0; element.selectionEnd = 0;
        }, 0);
	event.stopPropagation();
	return;
    }
    }
  }
  nostalgy_old_awRecipientKeyPress(event, element);
}

var NostalgyEscapePressed = 0;

function NostalgyEscape() {
  NostalgyEscapePressed++;
  var i = NostalgyEscapePressed;
  setTimeout(
    function(){ if (NostalgyEscapePressed==i) NostalgyEscapePressed = 0; },
    300);
  if (NostalgyEscapePressed == 2) setTimeout(SetMsgBodyFrameFocus,0);
}

function NostalgyKeyPress(ev) {
  if (ev.keyCode == KeyEvent.DOM_VK_ESCAPE) { NostalgyEscape(); }
  else if (NostalgyEscapePressed >= 1) {
    if (ev.charCode == 97) { // A
      goDoCommand('cmd_attachFile');
      ev.preventDefault();
    }
  }
}


function onNostalgyLoad(){
  nostalgy_old_awRecipientKeyPress = window.awRecipientKeyPress;
  window.awRecipientKeyPress = nostalgy_awRecipientKeyPress;
  window.addEventListener("keypress", NostalgyKeyPress, false);
}

window.addEventListener("load", onNostalgyLoad, false);
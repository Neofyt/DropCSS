var output = [],
    css = [];

// Thanks to Lea Verou (leaverou.me) for the following snippets
function $(expr) { return document.querySelector(expr); }
function $$(expr) { return document.querySelectorAll(expr); }

function dragOver(e) {
	this.className = 'h';
	e.stopPropagation();
	e.preventDefault();
}

function drop(e) {
	e.stopPropagation();
	e.preventDefault();

	var files = e.dataTransfer.files,
	reader = new FileReader();

	for (var i = 0, f; f = files[i]; i++) {

		if (f.type.match('css.*')) {
			reader.onload = function (e) {
				var content = e.target.result;
				output.push(content, '</textarea></li>');
				$('ul').innerHTML = output.join('') + '<button onclick="sendIt();">&rarr;[Compress]&larr;</button>';
			}
			reader.readAsText(f,"UTF-8");
			output.push('<li><input type="checkbox" name="compress" id="', f.name, '" /><label for="', f.name, '">', f.name, ' <span>', ' -  ', f.size, ' bytes - click to edit</span></label><textarea>');
			$('header').style.display = 'none';
		} else {
			
		}
	}
}

function sendIt(){
	for (var i = 0; i < $$('textarea').length; i++){
		css.push($$('textarea')[i].value);
	}
	compressIt();
}

function compressIt(a) {
	a = css.join('');
	a = a.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,'');
	a = a.replace(/ {2,}/g,' ');
	a = a.replace(/\s{1,}\{\s{1,}/g,'{');
	a = a.replace(/\s*\:\s*/g,':');
	a = a.replace(/\s*\;\s*/g,';');
	a = a.replace(/\s*\,\s*/g,',');
	a = a.replace(/;\s*\}\s*/g,'}');
	a = a.replace(/\s*\[\s*/g,'[');
	a = a.replace(/\s*\]\s*/g,']');
	a = a.replace(/\s*\+\s*/g,'+');
	deliverIt(a);
}

function deliverIt(a){
	$('ul').innerHTML = '<li><input type="checkbox" name="deliver" id="deliver" checked="checked"/><label for="deliver">Your compressed css:<span> ' + a.length + ' bytes</span></label><textarea onclick="this.select();">' + a + '</textarea></li>';
}

// Setup the dnd listeners.
$('body').addEventListener('dragover', dragOver, false);
$('body').addEventListener('drop', drop, false);
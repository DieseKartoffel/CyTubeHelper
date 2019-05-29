//document.body.style.border = "5px solid red";


/*
*
*				BUILD DIALOG
*
*/

$('#wrap').append('<div id="windowContent">' +
	'<div id="chatEmotes">' +
	'</div> </br>' +
	'<div id="effects" style="position: absolute; overflow: hidden; bottom: 0px;">' +
	'<select id="effectSelect">' +
	'<option value="flip">Flip Emote</option>' +
	'<option value="flop">Mirror Emote</option>' +
	'<option value="spin">Spin Emote</option>' +
	'<option value="3dspin">3D Spin Emote</option>' +
	'<option value="rotate">Rotate Emote</option>' +
	'<option value="mrotate">Mirror Rotate Emote</option>' +
	'<option value="walk">Slow Scroll</option>' +
	'<option value="fast">Fast Scroll Emote</option>' +
	'<option value="fastfv">Free Fast Scroll Emote</option>' +
	'<option value="fastr">Reversed Fast Scroll Emote</option>' +
	'<option value="fastrv">Free Reversed Fast Scroll Emote</option>' +
	'<option value="brody">Adrien Brody Effect</option>' +
	'<option value="bean">Bean/Real Hero Effect</option>' +
	'<option value="o-o">o-o Effect</option>' +
	'</select>' +
	'<button id="helpButton">help</button>' +
	'</div>' +
	'</div>');

var minimized = true;
var dialog = $("#windowContent").dialog({
	title: 'v4c Helper',
	minWidth: 315,
	minHeight: 170,

	beforeClose: function (event, ui) {
		if (minimized == true) {
			unminimize();
		}
		if (minimized == false) {
			minimize();
		}

		minimized = !minimized;
		return false;
	},
	resizable: false,
	draggable: true,
});


//Fix JQuery Bug #8506, #9832 and #10069 (jQuery UI Dialog on resizing shrinks the content of the Dialog) Only needed when resizable=true
$('.ui-dialog').css({ 'box-sizing': 'content-box' });
$('.ui-dialog-content').css({ 'box-sizing': 'content-box' });


//hide window
function minimize() {
	dialog.parents('.ui-dialog').animate({
		height: '40px',
		top: $(window).height() - 50
	}, 500);
}

//show window
function unminimize() {
	dialog.parents('.ui-dialog').animate({
		//set the positioning to center the dialog - 200 is equal to height of dialog
		top: ($(window).height() - 200) / 2,
		//set the height again
		height: 170
	}, 200);
}

minimize();

/*
*
*				Make Chat emotes clickable and add them to Dialog:
*
*/

// select target chat window
var target = document.querySelector('#messagebuffer');

// new message event handling
var observer = new MutationObserver(function (mutations) {
	var last = $('#messagebuffer').children().last();
	//for each emote: onClick: append emote title attribute to chat input field
	var emote = last.find(".channel-emote").on("click", function () {
		$('#chatline').val($('#chatline').val() + " " + ($(this).attr("title")));
	});

	emote.each(function () {
		console.log($(this).attr("title"), $(this).attr("src"));
		emoteToDialog($(this).attr("title"), $(this).attr("src"));
	});

	console.log(emote.length + " emotes handled by v4cHelper")
});
// Observe addition of new messages that are div children of target window
var config = { childList: true };
// start observing
observer.observe(target, config);



// Add Emote to Dialog
var items = 0; //amount of listes emotes
function emoteToDialog(title, src) {
	if (typeof title == 'undefined' || typeof src == 'undefined') {
		return;
	}

	var emoteID = title.replace("/", "")

	//if emote is already listed in the UI: remove it
	var del = $('#' + emoteID).remove();

	if(!del.length > 0){
		items++;
	}

	if(items >= 30){
		$('#chatEmotes').children().last().remove();;
	}

	//prepate html to prepend
	var btn = $('<img src="' + src + '" id="' + emoteID + '" width="28" height="28" /></img>');
	btn.on("click", function () {
		emoteButtonClick(title);
	});

	//add new emote button at top of list in UI
	btn.prependTo("#chatEmotes");
}

function emoteButtonClick(title) {
	$('#chatline').val($('#chatline').val() + " " + title);
}



/*
*
* 				Add listener to Help button. (TODO: Full Effect List: https://pastebin.com/raw/3Ha0QynJ)
*
*/
$("#helpButton").click(function () {
	var e = document.getElementById("effectSelect");
	var effect = e.options[e.selectedIndex].value;

	switch (effect) {
		case "flip":
			$('#chatline').val("[flip]" + $('#chatline').val() + "[/flip]");
			break;
		case "flop":
			$('#chatline').val("[flop]" + $('#chatline').val() + "[/flop]");
			break;
		case "spin":
			$('#chatline').val("[spin]" + $('#chatline').val() + "[/spin]");
			break;
		case "3dspin":
			$('#chatline').val("[3dspin]" + $('#chatline').val() + "[/3dspin]");
			break;
		case "rotate":
			$('#chatline').val("[rotate90]" + $('#chatline').val() + "[/rotate]");
			break;
		case "mrotate":
			$('#chatline').val("[mrotate90]" + $('#chatline').val() + "[/mrotate]");
			break;
		case "walk":
			$('#chatline').val("[walk]" + $('#chatline').val() + "[/walk]");
			break;
		case "fast":
			$('#chatline').val("[fast]" + $('#chatline').val() + "[/fast]");
			break;
		case "fastfv":
			$('#chatline').val("[fastfvvv]" + $('#chatline').val() + "[/fastfvvv]");
			break;
		case "fastr":
			$('#chatline').val("[fastr]" + $('#chatline').val() + "[/fastr]");
			break;
		case "fastrv":
			$('#chatline').val("[fastrvvv]" + $('#chatline').val() + "[/fastrvvv]");
			break;
		case "brody":
			$('#chatline').val("[brody]" + $('#chatline').val() + "[/brody]");
			break;
		case "bean":
			$('#chatline').val("[bean]" + $('#chatline').val() + "[/bean]");
			break;
		case "o-o":
			$('#chatline').val("[o-o]" + $('#chatline').val() + "[/o-o]");
			break;
		default:
			console.log("Unkown Effect: " + effect);
	}
});

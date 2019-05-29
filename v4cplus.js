//document.body.style.border = "5px solid red";


/*
*
*				BUILD DIALOG
*
*/

$('#wrap').append(	'<div id="windowContent">'+
						
							'<div id="chatEmotes">'+
							'</div>'+

					'</div>'	);

var minimized = true;
var dialog = $("#windowContent").dialog({

	title: 'v4c Helper',
	
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
	resizable: true,
	draggable: true,
});


//Fix JQuery Bug #8506, #9832 and #10069 (jQuery UI Dialog on resizing shrinks the content of the Dialog)
$('.ui-dialog').css({'box-sizing': 'content-box'});
$('.ui-dialog-content').css({'box-sizing': 'content-box'});

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
		height: 100
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
		$('#chatline').val( $('#chatline').val() + " " + ($(this).attr("title")) );		
	});	

	emote.each(function() {
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
function emoteToDialog(title, src) {
	if(typeof title == 'undefined' || typeof src == 'undefined'){
		return;
	}

	var emoteID = title.replace("/","")
	
	//if emote is already listed in the UI: remove it
	$('#'+ emoteID ).remove();
	
	//prepate html to prepend
    var btn = $('<img src="'+src+'" id="'+ emoteID+'" width="28" height="28" /></img>');
    btn.on("click", function () {
        emoteButtonClick(title);
    });

	//add new emote button at top of list in UI
	btn.prependTo("#chatEmotes");
}

function emoteButtonClick(title){
	$('#chatline').val( $('#chatline').val() + " " + title );	
}

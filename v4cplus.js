//document.body.style.border = "5px solid red";


/*
*
*				BUILD DIALOG
*
*/

$('#wrap').append('<div id="helper">Help</div>');

var minimized = true;
var dialog = $("#helper").dialog({
	width : 400,
	height : 100,
	title: 'v4c Helper',
	beforeClose: function( event, ui ) {
		if(minimized == true){
			unminimize();
		}
		if(minimized == false){
			minimize();
		}
		
		minimized = !minimized;
		return false;
	},
	resizable : true,
	draggable : true,
});

function minimize(){
	dialog.parents('.ui-dialog').animate({
		height: '40px',
		top: $(window).height() - 50
	}, 500); 
}

//show window
function unminimize(){
    dialog.parents('.ui-dialog').animate({
	   //set the positioning to center the dialog - 200 is equal to height of dialog
	   top: ($(window).height()-200)/2,
	   //set the height again
	   height: 100
	}, 200); 
}

minimize();

/*
*
*				TRACK EMOTES
*
*/

//select target
var target = document.querySelector('#messagebuffer');

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
	var last = $('#messagebuffer').children().last();
	var emote = last.find(".channel-emote");
	if(emote.length == 0){
		//no emote sent
		return;
	}
	//new click listener for every emote
	emote.each(element => {
	  	emote.on("click", function() {
			console.log(emote.attr("title")+" "+emote.attr("src"));
			var txt = $('#chatline').val;
			 $('#chatline').val($('#chatline').val() + " " + (emote.attr("title")));
		});
	});  
  });
});

 
// Observe addition of new messages as div children
var config = { childList: true };
 
// start observing
observer.observe(target, config);


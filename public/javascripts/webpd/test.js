var patch;

$.get('../patches/test.pd', function(patchStr) {
	patch = Pd.loadPatch(patchStr);
	Pd.start();
});

$("#mute").click( function() {
	if($("#music").text() == "On") {
		$("#music").text("Off");
		Pd.send('sound', [parseFloat(0)]);
	}
	else {
		$("#music").text("On");
		Pd.send('sound', [parseFloat(1)]);
	}
});

var patch;

$.get('../patches/test.pd', function(patchStr) {
	patch = Pd.loadPatch(patchStr);
	Pd.start();
	Pd.send('sound', [parseFloat(0)]);
});

$("#image").attr('src', '../images/mute.jpg');
$("#image").attr('width', '32');
$("#image").attr('height', '32');

$("#image").click( function () {
	if( $(this).attr('src') == '../images/sound.jpg') {
		$(this).attr('src', '../images/mute.jpg');
		$("#music").text("Off");
		Pd.send('sound', [parseFloat(0)]);
	}
	else {
		$(this).attr('src', '../images/sound.jpg');
		$("#music").text("On");
		Pd.send('sound', [parseFloat(1)]);
	}
});

var patch;

Pd.start();

$.get('../patches/space4.pd', function(patchStr) {
	$.get('../patches/oscsp2.pd', function(abs) {
		Pd.registerAbstraction('oscsp2', abs)
		patch = Pd.loadPatch(patchStr);
		Pd.send('sound', [parseFloat(0)]);
	});
});

$("#image").attr('src', '../images/buttons/mute.jpg');
$("#image").attr('width', '32');
$("#image").attr('height', '32');

$("#image").click( function () {
	if( $(this).attr('src') == '../images/buttons/sound.jpg') {
		$(this).attr('src', '../images/buttons/mute.jpg');
		$("#music").text("Off");
		Pd.send('sound', [parseFloat(0)]);
	}
	else {
		$(this).attr('src', '../images/buttons/sound.jpg');
		$("#music").text("On");
		Pd.send('sound', [parseFloat(1)]);
	}
});

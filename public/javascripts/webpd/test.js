var patch;

Pd.start();

$.get('../patches/space4.pd', function(patchStr) {
	$.get('../patches/oscsp2.pd', function(abs) {
		Pd.registerAbstraction('oscsp2', abs)
		patch = Pd.loadPatch(patchStr);
		Pd.send('sound', [parseFloat(1)]);
	});
});

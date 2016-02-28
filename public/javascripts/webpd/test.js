var patch;

$.get('../patches/test.pd', function(patchStr) {
	patch = Pd.loadPatch(patchStr);
	Pd.start();
});

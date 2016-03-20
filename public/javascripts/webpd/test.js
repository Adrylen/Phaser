var patch;

Pd.start();

$.get('../patches/test.pd', function(patchStr) {
	patch = Pd.loadPatch(patchStr);
});

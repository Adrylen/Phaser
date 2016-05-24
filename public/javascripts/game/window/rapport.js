function createNotif(title, text, type) {
	var myStack = {"dir1":"down", "dir2":"right", "push":"top"};

	var accept = {
		title: "You've accepted the trading.", text: 'Resume',
		type: 'info', icon: false, hide: true,
		confirm: { confirm: false },
		buttons: { closer: true, sticker: true }
	};
	var decline = {
		title: "You've declined the trading.", text: '',
		type: 'info', icon: false, hide: true,
		confirm: { confirm: false },
		buttons: { closer: true, sticker: true }
	};
	if(type == 'alert')
		var opts = {
			title: title, text: text,
			addClass: "stack-custom", stack: myStack,
			icon: false, hide: false,
			confirm: {
				confirm: true,
				buttons: [{
					text: 'Ok',
					click: function(notice) { notice.remove(); }
				}, null]
			},
			buttons: {
				closer: false,
				sticker: false
			},
			history: { history: false }
		};

	if(type == 'confirm')
		var opts = {
			title: title, text: text,
			addClass: "stack-custom", stack: myStack,
			icon: false, hide: false,
			confirm: {
				confirm: true,
				buttons: [{
					text: 'Accept',
					click: function(notice) { notice.update(accept); }
				}, {
					text: 'Decline',
					click: function(notice) { notice.update(decline); }
				}]
			},
			buttons: {
				closer: false,
				sticker: false
			},
			history: { history: false }
		};

	new PNotify(opts);
};

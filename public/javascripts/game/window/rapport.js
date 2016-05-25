function createNotif(title, text, type, sendData = null) {
	if(sendData != null)
		var data = {
			res: 1,
			from_user_id: sendData.from_user_id,
			ask_for: sendData.ask_for,
			to_user_id: sendData.to_user_id,
			against: sendData.against
		};

	var myStack = {"dir1":"down", "dir2":"right", "push":"top"};

	var accept = {
		title: "You've accepted the trading.", text: 'Resume',
		type: 'info', icon: false, hide: true,
		//addClass: "stack-custom", stack: myStack,
		confirm: { confirm: false },
		buttons: { closer: true, sticker: true }
	};
	var decline = {
		title: "You've declined the trading.",
		text: '',
		type: 'info',
		icon: false,
		hide: true,
		//addClass: "stack-custom",
		//stack: myStack,
		confirm: {
			confirm: false
		},
		buttons: {
			closer: true,
			sticker: true
		}
	};
	if(type == 'alert')
		var opts = {
			title: title, text: text,
			//addClass: "stack-custom", stack: myStack,
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
			title: title, text: text, type: "notice",
			//addClass: "stack-custom", stack: myStack,
			icon: false, hide: false,
			confirm: {
				confirm: true,
				buttons: [{
					text: 'Accept',
					click: function(notice) {
						data.res = 1;
						socket.emit("ResCommerce", data);
						notice.update(accept);
					}
				}, {
					text: 'Decline',
					click: function(notice) {
						data.res = 0;
						socket.emit("ResCommerce", data);
						notice.update(decline);
					}
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

var Commerce = function(game) {};

/* Attention ask_for et against sont des objets de la forme:
*  var o = { ressource : nom_de_la_ressource, quantity: quantite };
*/
Commerce.prototype.update = function(from_user_id_args, ask_for_args, to_user_id_args, against_args) {
	/* ARTHUR */
	var data = [
		from_user_id = from_user_id_args,
		ask_for = ask_for_args,
		to_user_id = to_user_id_args,
		against = against_args
	];
	socket.emit('AskCommerce', data);
};

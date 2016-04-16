var Commerce = function(game) {};

Commerce.prototype = function () {


	/* Attention "ask_for" et "against" sont des objets de la forme:
	*  var o = { ressource : nom_de_la_ressource, amount: quantite };
	*/
	update: function(from_user_id, ask_for, to_user_id, against) {
			/* ARTHUR */
			var data = {
				from_user_id = from_user_id,
				ask_for = ask_for,
				to_user_id = to_user_id,
				against = against
			}
			socket.emit('AskCommerce', data);
	}
};

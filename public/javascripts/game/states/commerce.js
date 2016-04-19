var Commerce = function(game) {};

<<<<<<< HEAD
/* Attention ask_for et against sont des objets de la forme:
*  var o = { ressource : nom_de_la_ressource, quantity: quantite };
*/
Commerce.prototype.update = function(from_user_id_args, ask_for_args, to_user_id_args, against_args) {
	/* ARTHUR */
	var data = {
		from_user_id = from_user_id_args,
		ask_for = ask_for_args,
		to_user_id = to_user_id_args,
		against = against_args
=======
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
>>>>>>> cdee240941c264cb5481df144a6c56a5a1158cf6
	}
	socket.emit('AskCommerce', data);
};

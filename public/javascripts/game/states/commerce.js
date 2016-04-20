var Commerce = function(game) {};

var from_user_id;
var ask_for = {ressource : "", amount : 0};
var to_user_id;
var against = {ressource : "", amount : 0};


Commerce.prototype.create = function() {
	game.stage.backgroundColor = '#182d3b';

	bouh = game.add.text(32, 0, player.ressources.kaga, {font: "bold 26px Century Schoolbook L", fill: "#f19010"});
	bouh.height = 33;
	//confirmer = game.add.button(game.world.centerX - 95, 400, confirmed, this);
	//button = game.add.button(game.world.centerX - 95, 400, 'button', confirmed, this, 2, 1, 0);

};


function confirmed() {
	/* ARTHUR */
	/*
	Attention "ask_for" et "against" sont des objets de la forme:
	var o = { ressource : nom_de_la_ressource, amount: quantite };
	*/
	console.log("yolo!");
	var data = {
		from_user_id : from_user_id,
		ask_for : ask_for,
		to_user_id : to_user_id,
		against : against
	};
	//socket.emit('AskCommerce', data);
}

Planets.prototype.update = function () {
	bouh.text = player.ressources.kaga;
	bouh.visible = false;
};

var Commerce = function(game) {};

var from_user_id_args;
var ask_for_args = {ressource : "", amount : 0};
var to_user_id_args;
var against_args = {ressource : "", amount : 0};

Commerce.prototype.preload = function() {
	game.load.spritesheet('start', '../../images/buttons/startButton.png', 204, 160);

};

var button;
var background;
Commerce.prototype.create = function() {

	game.stage.backgroundColor = '#182d3b';

	start = game.add.button(game.world.centerX - 102, 250, 'start', this.actionOnClick, this, 1, 0, 2);
	start.height *= 0.2;
	start.width *= 0.5;

	// -----

	bouh = game.add.text(32, 0, player.ressources.kaga, {font: "bold 26px Century Schoolbook L", fill: "#005c70"});
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

Commerce.prototype.update = function () {
	/* ARTHUR */
	var data = [
		from_user_id = from_user_id_args,
		ask_for = ask_for_args,
		to_user_id = to_user_id_args,
		against = against_args
	];
	socket.emit('AskCommerce', data);
};

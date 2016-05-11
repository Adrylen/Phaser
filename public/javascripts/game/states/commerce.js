var Commerce = function(game) {};

/* ARTHUR */
/*
Attention "ask_for" et "against" sont des objets de la forme:
var o = { ressource : nom_de_la_ressource, amount: quantite };
*/
var data = {
	from_user_id : null,
	ask_for : {
		ressources : null,
		amount : 0
	},
	to_user_id : null,
	against : {
		ressources : null,
		amount : 0
	}
};


Commerce.prototype.preload = function() {
	game.load.spritesheet('start', '../images/buttons/startButton.png', 204, 160);

};

var confirm_button;
var title;
var quantity_for;
var quantity_against;
var player_1;
var player_2;
var p1plus_button = [];
var p1moins_button = [];
var p2plus_button = [];
var p2moins_button = [];
var p1ressource_select_button = [];
var p2ressource_select_button = [];
Commerce.prototype.create = function() {


	confirm_button = game.add.button(game.world.centerX-50, 450, 'start', confirm, this, 1, 0, 2);
	confirm_button.height = 100;
	confirm_button.width = 100;

	// -----

	title = game.add.text(game.world.centerX, 0, "Commerce", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});
	title.height = 50;

	quantity_for = game.add.text(game.world.centerX-200, 500, "0", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});
	quantity_against = game.add.text(game.world.centerX+200, 500, "0", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});

};


function confirm() {

	console.log("yolo!");
	if(data.from_user_id !== null && data.ask_for.ressources !== null && data.to_user_id !== null && data.against.ressources !== null){
		/* ARTHUR */
		socket.emit('AskCommerce', data);
	}
	data.from_user_id = null;
	data.ask_for.ressources = null;
	data.to_user_id = null;
	data.against.ressources = null;
}



/*
Commerce.prototype.update = function () {

};
*/

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

var title;
var p1_quantity;
var p2_quantity;
var player_1;//get the name from the planet sent by planets.js
var player_2;
var ressources_text = [];

var confirm_button;
var p1plus_button = [];
var p1moins_button = [];
var p2plus_button = [];
var p2moins_button = [];
var p1ressource_select_button = [];
var p2ressource_select_button = [];
Commerce.prototype.create = function() {
	title = game.add.text(game.world.centerX, 0, "Commerce", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});
	title.height = 50;

	p1_quantity = game.add.text(game.world.centerX-200, 450, "0", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});

	p2_quantity = game.add.text(game.world.centerX+200, 450, "0", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});

	player_1 = game.add.text(game.world.centerX-200, 0, "player1", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});

	player_2 = game.add.text(game.world.centerX+200, 0, "player2", {font: "bold 26px Century Schoolbook L", fill: "#00a802"});

	for (var a = 0; a < 7; a++) {
		ressources_text[a]=game.add.text(game.world.centerX-20, 50*(a+1), 'ressource'.concat((a+1).toString()), {font: "bold 26px Century Schoolbook L", fill: "#00a802"});
	}
	// -----

	confirm_button = game.add.button(game.world.centerX, 450, 'start', confirm, this, 1, 0, 2);
	confirm_button.height = 100;
	confirm_button.width = 100;

	for (var i = 0; i < 3; i++) {

		p1plus_button[i] = game.add.button(game.world.centerX-200+(20*i + 10*(i+1)*i/2 ), 400, 'start', p1plus, {'i': i}, 1, 0, 2);
		p1plus_button[i].height = 20;
		p1plus_button[i].width = 10 + 10*(i+1);

		p1moins_button[i] = game.add.button(game.world.centerX-200+(20*i + 10*(i+1)*i/2), 500, 'start', p1moins, {'i': i}, 1, 0, 2);
		p1moins_button[i].height = 20;
		p1moins_button[i].width = 10 + 10*(i+1);

		p2plus_button[i] = game.add.button(game.world.centerX+200+(20*i + 10*(i+1)*i/2), 400, 'start', p2plus, {'i': i}, 1, 0, 2);
		p2plus_button[i].height = 20;
		p2plus_button[i].width = 10 + 10*(i+1);

		p2moins_button[i] = game.add.button(game.world.centerX+200+(20*i + 10*(i+1)*i/2), 500, 'start', p2moins, {'i': i}, 1, 0, 2);
		p2moins_button[i].height = 20;
		p2moins_button[i].width = 10 + 10*(i+1);

	}

	for (var j = 0; j < 7; j++) {

		p1ressource_select_button[j] = game.add.button(game.world.centerX-200, 50*(j+1), 'start', p1ressource_select, {'j': j}, 1, 0, 2);
		p1ressource_select_button[j].height = 20;
		p1ressource_select_button[j].width = 50;

		p2ressource_select_button[j] = game.add.button(game.world.centerX+200, 50*(j+1), 'start', p2ressource_select, {'j': j}, 1, 0, 2);
		p2ressource_select_button[j].height = 20;
		p2ressource_select_button[j].width = 50;

	}
};

function p1plus() {

}

function p1moins() {

}

function p2plus() {

}

function p2moins() {

}

function p1ressource_select() {

}

function p2ressource_select() {

}

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

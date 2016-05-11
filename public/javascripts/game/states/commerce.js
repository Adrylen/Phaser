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
	game.load.spritesheet('confirm', '../images/buttons/confirm.png', 200, 150);
	for (var i = 0; i < 3; i++) {
		var a = 1;
		for (var q = 0; q < i; q++) {
			a*=10;
		}
		var text1 = '+'.concat((a).toString());
		var text2 = '-'.concat((a).toString());
		game.load.spritesheet( text1, '../images/buttons/' + text1 +'.png', 120,72);
		game.load.spritesheet( text2,'../images/buttons/'+ text2 +'.png',120,72);
	}
	game.load.spritesheet('select', '../images/buttons/CHOIX1.png', 150, 100);

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

	confirm_button = game.add.button(game.world.centerX, 450, 'confirm', confirm, this, 1, 0, 2);
	confirm_button.height = 100;
	confirm_button.width = 100;

	for (var i = 0; i < 3; i++) {
		a = 1;
		for (var q = 0; q < i; q++) {
			a*=10;
		}
		p1plus_button[i] = game.add.button(game.world.centerX-200+(50*i), 400, '+'.concat((a).toString()), p1plus, {'a': a}, 0, 0, 0);
		p1plus_button[i].height = 20;
		p1plus_button[i].width = 40;

		p1moins_button[i] = game.add.button(game.world.centerX-200+(50*i), 500, '-'.concat((a).toString()), p1moins, {'a': a}, 0, 0, 0);
		p1moins_button[i].height = 20;
		p1moins_button[i].width = 40;

		p2plus_button[i] = game.add.button(game.world.centerX+200+(50*i), 400, '+'.concat((a).toString()), p2plus, {'a': a}, 0, 0, 0);
		p2plus_button[i].height = 20;
		p2plus_button[i].width = 40;

		p2moins_button[i] = game.add.button(game.world.centerX+200+(50*i), 500, '-'.concat((a).toString()), p2moins, {'a': a}, 0, 0, 0);
		p2moins_button[i].height = 20;
		p2moins_button[i].width = 40;

	}

	for (var j = 0; j < 7; j++) {

		p1ressource_select_button[j] = game.add.button(game.world.centerX-200, 50*(j+1), 'select', p1ressource_select, {'j': j}, 1, 0, 2);
		p1ressource_select_button[j].height = 40;
		p1ressource_select_button[j].width = 100;

		p2ressource_select_button[j] = game.add.button(game.world.centerX+200, 50*(j+1), 'select', p2ressource_select, {'j': j}, 1, 0, 2);
		p2ressource_select_button[j].height = 40;
		p2ressource_select_button[j].width = 100;

	}
};

function p1plus() {
	data.ask_for.amount += this.a;
	p1_quantity.text = data.ask_for.amount;
}

function p1moins() {
	if(data.ask_for.amount>this.a){
		data.ask_for.amount -= this.a;
	}else {
		data.ask_for.amount = 0;
	}
	p1_quantity.text = data.ask_for.amount;
}

function p2plus() {
	data.against.amount += this.a;
	p2_quantity.text = data.against.amount;
}

function p2moins() {
	if(data.against.amount>this.a){
		data.against.amount -= this.a;
	}else {
		data.against.amount = 0;
	}
	p2_quantity.text = data.against.amount;
}
/*
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
*/
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

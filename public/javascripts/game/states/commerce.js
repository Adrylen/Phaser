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

//


Commerce.prototype.preload = function() {
	game.load.image('commerce_bg', '../images/backgrounds/commerce.png');
	game.load.spritesheet('confirm', '../images/buttons/confirm.png', 200, 150);



	for (var i = 0; i < 4; i++) {
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
	game.load.spritesheet('selected', '../images/buttons/CHOIX2.png', 150, 100);
};

var title;
var p1_quantity;
var p2_quantity;

//get the names from the planet sent by planets.js
var player_1;
var player_2;

var ressources_text = [];

var confirm_button;
var p1plus_button = [];
var p1moins_button = [];
var p2plus_button = [];
var p2moins_button = [];

var p1ressource_select_button = [];
var p1ressource_selected_sprite;
var p2ressource_select_button = [];
var p2ressource_selected_sprite;

var ressource = ["kaga", "iron", "energy", "food", "water", "tools", "lumber"];


Commerce.prototype.create = function() {
	var bg = game.add.image(0, 0, 'commerce_bg');
	bg.width = 1087;
	bg.height = 650;

	cadre = game.add.graphics(45, 25);

	cadre.beginFill(0x000000, 0.7);
	cadre.moveTo(0,0);
	cadre.lineTo(1087,0);
	cadre.lineTo(1087,650);
	cadre.lineTo(0,650);
	cadre.lineTo(0,0);
	cadre.endFill();


	player_1 = player.username;
	player_2 = player_the_second.username;

	data.from_user_id = player._id;
	data.to_user_id = player_the_second._id;


	title = game.add.text(0, 0, "Commerce", {font: "bold 30px Century Schoolbook L", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
	title.setTextBounds(game.world.centerX-75, 0, 150, 50);

	p1_quantity = game.add.text(0, 0, "0", {font: "bold 26px Century Schoolbook L", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
	p1_quantity.setTextBounds(game.world.centerX-250, 420, 190, 60);


	p2_quantity = game.add.text(0, 0, "0", {font: "bold 26px Century Schoolbook L", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
	p2_quantity.setTextBounds(game.world.centerX+60, 420, 190, 60);


	player_1 = game.add.text(0, 0, player_1, {font: "bold 26px Century Schoolbook L", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
	player_1.setTextBounds(game.world.centerX-250, 0, 100, 40);


	player_2 = game.add.text(0, 0, player_2, {font: "bold 26px Century Schoolbook L", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});
	player_2.setTextBounds(game.world.centerX+150, 0, 100, 40);

	// -----

	confirm_button = game.add.button(game.world.centerX-50, 400, 'confirm', confirm, this, 1, 0, 2);
	confirm_button.height = 100;
	confirm_button.width = 100;

	var a = 1;
	for (var i = 0; i < 4; i++) {

		p1plus_button[i] = game.add.button(game.world.centerX-250+(50*i), 400, '+'.concat((a).toString()), p1plus, {'a': a}, 0, 0, 0);
		p1plus_button[i].height = 20;
		p1plus_button[i].width = 40;

		p1moins_button[i] = game.add.button(game.world.centerX-250+(50*i), 480, '-'.concat((a).toString()), p1moins, {'a': a}, 0, 0, 0);
		p1moins_button[i].height = 20;
		p1moins_button[i].width = 40;

		p2plus_button[i] = game.add.button(game.world.centerX+60+(50*i), 400, '+'.concat((a).toString()), p2plus, {'a': a}, 0, 0, 0);
		p2plus_button[i].height = 20;
		p2plus_button[i].width = 40;

		p2moins_button[i] = game.add.button(game.world.centerX+60+(50*i), 480, '-'.concat((a).toString()), p2moins, {'a': a}, 0, 0, 0);
		p2moins_button[i].height = 20;
		p2moins_button[i].width = 40;

		a*=10;
	}

	for (var j = 0; j < 7; j++) {

		p1ressource_select_button[j] = game.add.button(game.world.centerX-250, 50*(j+1), 'select', p1ressource_select, {'j': j}, 0, 0, 0);
		p1ressource_select_button[j].height = 40;
		p1ressource_select_button[j].width = 100;

		ressources_text[j] = game.add.text(0, 0, ressource[j], {font: "bold 26px Century Schoolbook L", fill: "#FFFFFF", boundsAlignH: "center", boundsAlignV: "middle"});

		ressources_text[j].setTextBounds(game.world.centerX-75, 50*(j+1), 150, 50);

		p2ressource_select_button[j] = game.add.button(game.world.centerX+150, 50*(j+1), 'select', p2ressource_select, {'j': j}, 0, 0, 0);
		p2ressource_select_button[j].height = 40;
		p2ressource_select_button[j].width = 100;

	}

	p1ressource_selected_sprite = game.add.button(game.world.centerX-250, 50, 'selected');
	p1ressource_selected_sprite.height = 40;
	p1ressource_selected_sprite.width = 100;
	p1ressource_selected_sprite.visible = false;

	p2ressource_selected_sprite = game.add.button(game.world.centerX+150, 50, 'selected');
	p2ressource_selected_sprite.height = 40;
	p2ressource_selected_sprite.width = 100;
	p2ressource_selected_sprite.visible = false;

};

function p1ressource_select() {
	p1ressource_selected_sprite.y =  50*(this.j+1);
	p1ressource_selected_sprite.visible = true;
	game.world.bringToTop(p1ressource_selected_sprite);
	data.against.ressources = ressource[this.j];
}

function p2ressource_select() {
	p2ressource_selected_sprite.y =  50*(this.j+1);
	p2ressource_selected_sprite.visible = true;
	game.world.bringToTop(p2ressource_selected_sprite);
	data.ask_for.ressources = ressource[this.j];
	}

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


function confirm() {

	if(data.from_user_id !== null && data.ask_for.ressources !== null && data.to_user_id !== null && data.against.ressources !== null){
		/* ARTHUR */
		socket.emit('AskCommerce', data);
	}
	data.ask_for.ressources = null;
	data.against.amount = 0;
	data.against.ressources = null;
	data.ask_for.amount = 0;

	p1_quantity.text = "0";
	p2_quantity.text = "0";
	p2ressource_selected_sprite.visible = false;
	p1ressource_selected_sprite.visible = false;
}



/*
Commerce.prototype.update = function () {

};
*/

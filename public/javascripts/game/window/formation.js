var Formation = function(game) {
	var background = null;
	var backgroundCadre = null;
    var cross = null;

	var displayManager =  null;

    var popUp = null;
	var vaisseauImg = null;
	var vaisseauText = null;

	var blinderImg = null;
	var blinderText = null;

	var fantassinImg = null;
	var fantassinText = null;

	var plus = null;
	var plus1 = null;
	var plus2 = null;
	var plus3 = null;
};

Formation.prototype = {
	preload: function() {
		game.load.image('quit', '../images/buttons/quit.png');
		game.load.image('backgroundCadre', '../images/backgrounds/backgroundCadre.png');
		game.load.image('vaisseauImg', '../images/Attaque/fusee.png');
		game.load.image('blinderImg','../images/Attaque/Tank.png');
		game.load.image('fantassinImg','../images/Attaque/Fantassin.png');

		game.load.spritesheet('plus','../images/Attaque/+.png',300,300);
	},

	create: function() {
		/* Quit Cross */
		cross = game.add.sprite(1000, 45, 'quit');
		cross.inputEnabled=true;
		cross.events.onInputDown.add(function () {
			this.displayManager.visible = false;
			popUp = false;
		}, this);

		/* Pop Up */
		backgroundCadre = game.add.sprite(45, 50, 'backgroundCadre');
		backgroundCadre.width = 1000;
		backgroundCadre.height = 575;

		background = game.add.graphics(120, 113);
		background.beginFill(0x000000, 0.7);
		background.lineTo(852,0);
		background.lineTo(852,451);
		background.lineTo(0,451);
		background.lineTo(0,0);
		background.endFill();

		//formations :
		fantassinText = game.add.text(140,125,'100 water & 100 food',{font: " 15px Purisa", fill: "#FFFFFF"});
		fantassinImg = game.add.image(160,250,'fantassinImg');
		fantassinImg.width = 200;
		fantassinImg.height = 200;

		plus1 = game.add.button(100,200, 'plus',this.add , this, 1, 0, 2);
		plus1.width = 300;
		plus1.height = 300;
		plus1.alpha = 0.7;

		blinderText = game.add.text(460,125,'100 iron & 100 watt',{font: " 15px Purisa", fill: "#FFFFFF"});
		blinderImg = game.add.image(370,150,'blinderImg');
		blinderImg.width = 400;
		blinderImg.height = 400;


		plus2 = game.add.button(400, 200, 'plus',this.add1 , this, 1, 0, 2);
		plus2.width = 300;
		plus2.height = 300;
		plus2.alpha = 0.7;

		vaisseauText = game.add.text(750,125,'100 tool & 100 lumber',{font: " 15px Purisa", fill: "#FFFFFF"});
		vaisseauImg = game.add.image(760,150,'vaisseauImg');
		vaisseauImg.width = 200;
		vaisseauImg.height = 400;

		plus3 = game.add.button(700, 200, 'plus',this.add2 , this, 1, 0, 2);
		plus3.width = 300;
		plus3.height = 300;
		plus3.alpha = 0.7;


		this.displayManager = game.add.group();
		this.displayManager.add(background);
		this.displayManager.add(backgroundCadre);
		this.displayManager.add(cross);
		this.displayManager.add(fantassinImg);
		this.displayManager.add(fantassinText);
		this.displayManager.add(blinderText);
		this.displayManager.add(blinderImg);
		this.displayManager.add(vaisseauImg);
		this.displayManager.add(vaisseauText);
		this.displayManager.add(plus1);
		this.displayManager.add(plus2);
		this.displayManager.add(plus3);
		this.displayManager.visible = false;

		popUp = false;
	},

	display: function() {
		this.displayManager.visible = true;
		popUp = true;
	},

	popUp: function() { return popUp; },

	buy: function(data){
		/*
        	var data = {
        		user_id: varuser_id,
        		nb_soldier: vara,
        		nb_tank: varb,
        		nb_ship: varc
		}
		*/
		socket.emit('buy', data);
	},

	add: function (){
		var data = {
			user_id: player._id,
			nb_soldier: 1,
			nb_tank: 0,
			nb_ship: 0
		};
		this.buy(data);
	},

	add1: function (){
		var data = {
			user_id: player._id,
			nb_soldier: 0,
			nb_tank: 1,
			nb_ship: 0
		};
		this.buy(data);
	},

	add2: function (){
		var data = {
			user_id: player._id,
			nb_soldier: 0,
			nb_tank: 0,
			nb_ship: 1
		};
		this.buy(data);
	}
};

var formation = new Formation(game);

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
		game.load.image('vaisseauImg', '../images/attaque/fusee.png');
		game.load.image('blinderImg','../images/attaque/Tank.png');
		game.load.image('fantassinImg','../images/attaque/Fantassin.png');

		game.load.spritesheet('plus','../images/attaque/+.png');
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
		fantassinText = game.add.text(100,100,'100 water & 100 food',{font: " 25px Purisa", fill: "#FFFFFF"});
		fantassinImg = game.add.image(100,150,'fantassinImg');
		plus1 = game.add.button(100,150, 'plus',this.add , this, 1, 0, 2);

		blinderText = game.add.text(200,100,'100 water & 100 food',{font: " 25px Purisa", fill: "#FFFFFF"});
		blinderImg = game.add.image(200,150,'blinderImg');
		plus2 = game.add.button(200, 150, 'plus',this.add1 , this, 1, 0, 2);

		vaisseauText = game.add.text(200,100,'100 water & 100 food',{font: " 25px Purisa", fill: "#FFFFFF"});
		vaisseauImg = game.add.image(200,150,'vaisseauImg');
		plus3 = game.add.button(200, 150, 'plus',this.add2 , this, 1, 0, 2);

		this.displayManager = game.add.group();
		this.displayManager.add(background);
		this.displayManager.add(backgroundCadre);
		this.displayManager.add(cross);
		this.displayManager.add(fantassinImg);
		this.displayManager.add(fantassinText);
		this.displayManager.add(blinderTexte);
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

  }
	add: function (){
		if (player!=null) {
			player.forces.soldier+=1
		}
	}

	add1: function (){
		if (player!=null) {
			player.forces.tank+=1
		}
	}
	add2: function (){
		if (player!=null) {
			player.forces.ship+=1
		}
	}
};

var formation = new Formation(game);

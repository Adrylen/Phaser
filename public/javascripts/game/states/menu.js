var menu = function(game) {};

menu.prototype.init = function()
{
	background = null;
	start = null;
	options = null;
	help = null;
};

menu.prototype.preload = function()
{
	game.load.spritesheet('start', 'images/startButton.png', 204, 160);
	game.load.spritesheet('options', 'images/optionsButton.png', 204, 160);
	game.load.spritesheet('help', 'images/helpButton.png', 204, 160);
	game.load.image('background','images/planets.jpg');
};

menu.prototype.create = function()
{
	game.stage.backgroundColor = '#182d3b';

	background = game.add.sprite(0, 0, 'background');
	background.width = 1350;
	background.height = 650;

	start = game.add.button(game.world.centerX - 102, 250, 'start', this.actionOnClick, this, 1, 0, 2);
	start.height = 100;
	start.onInputUp.add(this.start, this);

	options = game.add.button(game.world.centerX - 102, 370, 'options', this.actionOnClick, this, 1, 0, 2);
	options.height = 100;
	options.onInputUp.add(this.options, this);

	help = game.add.button(game.world.centerX - 102, 490, 'help', this.actionOnClick, this, 1, 0, 2);
	help.height = 100;
	help.onInputUp.add(this.help, this);
};

menu.prototype.start = function()
{
	game.state.start('start');
};


menu.prototype.options = function()
{
	game.state.start('options');
};


menu.prototype.help = function()
{
	game.state.start('help');
};


menu.prototype.actionOnClick = function()
{
	console.log("Click on");
};

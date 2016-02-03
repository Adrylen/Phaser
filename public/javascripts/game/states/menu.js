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
};

menu.prototype.create = function()
{
	start = game.add.button(game.world.centerX - 102, 250, 'start', this.actionOnClick, this, 1, 0, 2);
	start.height = 100;
	start.onInputUp.add(this.start, this);

	options = game.add.button(game.world.centerX - 102, 360, 'options', this.actionOnClick, this, 1, 0, 2);
	options.height = 100;
	options.onInputUp.add(this.options, this);

	help = game.add.button(game.world.centerX - 102, 470, 'help', this.actionOnClick, this, 1, 0, 2);
	help.height = 100;
	help.onInputUp.add(this.help, this);
};

menu.prototype.start = function()
{
	document.location.href="/game";
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

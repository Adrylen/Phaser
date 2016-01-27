var help = function(game) {};

help.prototype.init = function()
{

};

help.prototype.preload = function()
{
	game.load.spritesheet('back', 'images/backButton.png', 204, 160);
};

help.prototype.create = function()
{
	game.stage.backgroundColor = '#182d3b';

	back = game.add.button(game.world.width - 250, game.world.height - 100, 'back', null, this, 1, 0, 2);
	back.width = 200;
	back.height = 50;
	back.onInputUp.add(this.back, this);
};

help.prototype.back = function()
{
	game.state.start('menu');
};

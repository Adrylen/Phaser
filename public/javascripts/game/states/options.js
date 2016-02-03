var options = function(game) {};

options.prototype.init = function()
{

};

options.prototype.preload = function()
{
	game.load.spritesheet('back', 'images/backButton.png', 204, 160);
};

options.prototype.create = function()
{
	back = game.add.button(game.world.width - 250, game.world.height - 100, 'back', null, this, 1, 0, 2);
	back.width = 120;
	back.height = 50;
	back.onInputUp.add(this.back, this);
};

options.prototype.back = function()
{
	game.state.start('menu');
};

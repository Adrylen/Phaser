var start = function(game) {};

start.prototype.init = function()
{

};

start.prototype.preload = function()
{
	game.load.spritesheet('back', 'images/buttons/backButton.png', 204, 160);
};

start.prototype.create = function()
{
	back = game.add.button(game.world.width - 250, game.world.height - 100, 'back', null, this, 1, 0, 2);
	back.width = 120;
	back.height = 50;
	back.onInputUp.add(this.back, this);
};

start.prototype.back = function()
{
	game.state.start('menu');
};

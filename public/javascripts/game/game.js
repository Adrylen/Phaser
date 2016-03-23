// Create a new game
var game = new Phaser.Game(1087, 650, Phaser.AUTO, 'parent', null, true, false);

// Start a statement
function start(state)
{
	game.state.start(state);
}

game.state.add('city', City);
game.state.add('planets', Planets);
$(function () { start('planets'); });

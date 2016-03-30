// Start a statement
function start(state)
{
	game.state.start(state);
}

game.state.add('city', City);
game.state.add('planets', Planets);
game.state.add('attaque', Attaque);
game.state.add('commerce', Commerce);
start('city');

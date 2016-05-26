// Start a statement
function start(state)
{
	game.state.start(state);
}

//console.log(solar_system);
//console.log(player);

game.state.add('city', City);
game.state.add('planets', Planets);
game.state.add('attaque', Attaque);
game.state.add('commerce', Commerce);
start('planets');

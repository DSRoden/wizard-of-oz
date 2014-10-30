(function(){
  game.state.add('goToWin', {create:create});

  function create(){
  game.add.sprite('0', '0', 'win');
  victoryEmerald.play();

  //var playToWin = game.add.button(300, 540, 'goBackBtn', replayGame);

  //var text = game.add.text('340', '50', 'Game Over');
  //var text = game.add.text('340', '80', 'Score: ' + score);
}

//function replayGame (){
  //victoryEmerald.destroy();
  //game.state.start('level1');
//}


 })();

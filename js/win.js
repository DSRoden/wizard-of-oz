(function(){
  game.state.add('goToWin', {create:create});

  function create(){
  game.add.sprite('0', '0', 'win');
  victoryEmerald.play();
  game.add.text(690, 350, '' + score, { font: '50px Arial', fill: '#f0d649'});
  console.log(score);

  //var playToWin = game.add.button(300, 540, 'goBackBtn', replayGame);

  //var text = game.add.text('340', '50', 'Game Over');
  }

//function replayGame (){
  //victoryEmerald.destroy();
  //game.state.start('level1');
//}


 })();

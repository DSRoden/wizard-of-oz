(function(){
  game.state.add('goBackToKansas', {create:create});
  function create(){
    game.add.sprite('0', '0', 'goBack');
    world2BGM.destroy();
    witchLaughter.play();
    var playLevel1 = game.add.button(500, 400, 'goBackBtn', restartGame);

  //var text = game.add.text('340', '50', 'Game Over');
  //var text = game.add.text('340', '80', 'Score: ' + score);
}

function restartGame (){
  game.state.start('level1');

}


 })();

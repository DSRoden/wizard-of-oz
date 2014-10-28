(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    game.load.tilemap('map', '../assets/catastrophi_level2.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('mapBw', '', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', '../assets/catastrophi_tiles_16.png');
    game.load.image('tilesBw', '');
    game.load.spritesheet('player', '../assets/spaceman.png', 16, 16);
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var text = game.add.text(game.world.centerX, game.world.centerY, 'Press SPACE to Begin', {fill: '#ffffff'});
    text.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }
   function start(){
    game.state.start('level1');
  }

})();

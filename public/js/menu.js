(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    game.load.tilemap('map', '../assets/catastrophi_level2.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('mapBw', '../assets/world1/kansas.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '../assets/catastrophi_tiles_16.png');
    game.load.image('twister', '../assets/cloud.png');
    game.load.image('moneyBag', '../assets/xy');//moneyBag image
    game.load.image('kansas', '../assets/world1/tmw_desert_spacing_bw.png');
    game.load.spritesheet('player', '../assets/spaceman.png', 16, 16);
    game.load.audio('collectMoney', '../assets/audio/collectMoney.mp3');
    game.load.audio('twister', '../assets/audio/twister.wav');
    game.load.audio('fallOff', '../assets/audio/fallOff.wav');
    game.load.audio('victoryBalloon', '../assets/audio/victoryBalloon.mp3');
    game.load.audio('victoryEmerald', '../assets/audio/victoryEmerald.mp3');
    game.load.audio('world1BG', '../assets/audio/world1BG.mp3');
    game.load.audio('world2BG', '../assets/audio/world2BG.mp3');
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

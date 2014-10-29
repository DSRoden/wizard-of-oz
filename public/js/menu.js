(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    game.load.image('startscreen', '../assets/menu/startscreen.png');
    game.load.image('start', '../assets/menu/start-button.png');

    game.load.tilemap('mapGold', '../assets/world2/oz_world.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('mapBw', '../assets/world1/kansas.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '../assets/catastrophi_tiles_16.png');
    game.load.image('twister', '../assets/world1/tornado.png');
    game.load.image('moneyBag', '../assets/world1/package.png');
    game.load.image('kansas', '../assets/world1/tmw_desert_spacing_bw.png');
    game.load.image('Oz', '../assets/world2/tmw_desert_spacing_gold.png');
    game.load.spritesheet('player', '../assets/wizard.png', 23, 30);
    game.load.audio('collectMoney', '../assets/audio/collectMoney.mp3');
    game.load.audio('twisterSound', '../assets/audio/twister.wav');
    game.load.audio('fallOffSound', '../assets/audio/fallOff.wav');
    game.load.audio('victoryBalloon', '../assets/audio/victoryBalloon.mp3');
    game.load.audio('victoryEmerald', '../assets/audio/victoryEmerald.mp3');
    game.load.audio('world1BG', '../assets/audio/world1BG.mp3');
    game.load.audio('world2BG', '../assets/audio/world2BG.mp3');
  }

  function create(){
    game.add.sprite(0,0,'startscreen');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //var text = game.add.text(game.world.centerX+25, game.world.centerY+250, 'Press SPACE to Begin', {fill: '#2E3192'});
    //text.anchor.setTo(0.5);

    var button = game.add.button(game.world.centerX, game.world.centerY+250, 'start', start);
    button.anchor.setTo(0.5);
    //var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('level1');
  }

})();

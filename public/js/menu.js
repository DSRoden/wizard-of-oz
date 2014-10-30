(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    game.load.image('startscreen', '../assets/menu/startscreen.png');
    game.load.image('start', '../assets/menu/start-button.png');

    game.load.tilemap('mapGold', '../assets/world2/oz_world.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('mapBw', '../assets/world1/kansas.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('twister', '../assets/world1/tornado.png');
    game.load.image('moneyBag', '../assets/world1/package.png');
    game.load.image('witch', '../assets/world2/witch.png');
    game.load.image('kansas', '../assets/world1/tmw_desert_spacing_bw.png');
    game.load.image('Oz', '../assets/world2/tmw_desert_spacing_gold.png');
    game.load.image('balloon', '../assets/world1/balloon.png');
    game.load.image('greyballoon', '../assets/world1/greyballoon.png');
    game.load.spritesheet('player', '../assets/wizard.png', 23, 27);
    game.load.image('goBack', '../assets/world2/goback.png');
    game.load.image('goBackBtn', '../assets/world2/goback-btn.png');
    game.load.image('win', '../assets/win/win.png');
    game.load.audio('collectMoney', '../assets/audio/collectMoney.mp3');
    game.load.audio('twisterSound', '../assets/audio/twister.wav');
    game.load.audio('fallOffSound', '../assets/audio/fallOff.wav');
    game.load.audio('victoryBalloon', '../assets/audio/victoryBalloon.mp3');
    game.load.audio('victoryEmerald', '../assets/audio/victoryEmerald.mp3');
    game.load.audio('world1BG', '../assets/audio/world1BG.mp3');
    game.load.audio('world2BG', '../assets/audio/world2BG.mp3');
    game.load.audio('witchLaughter', '../assets/audio/witch_laughter.mp3');
  }

  function create(){
    game.add.sprite(0,0,'startscreen');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    var button = game.add.button(game.world.centerX, game.world.centerY+250, 'start', start);
    button.anchor.setTo(0.5);
  }

  function start(){
    game.state.start('level1');
  }

})();

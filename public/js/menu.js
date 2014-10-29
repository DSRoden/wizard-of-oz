(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    game.load.image('startscreen', '../assets/menu/startscreen.png');
    game.load.image('start', '../assets/menu/start-button.png');

    game.load.tilemap('map', '../assets/catastrophi_level2.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('mapBw', '', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', '../assets/catastrophi_tiles_16.png');
    game.load.image('moneyBag', '../assets/xy');//moneyBag image
    game.load.image('tilesBw', '');
    game.load.spritesheet('player', '../assets/spaceman.png', 16, 16);
    game.load.audio('collectMoney', '../assets/collectMoney.mp3');
    game.load.audio('twister', '../assets/twister.wav');
    game.load.audio('fallOff', '../assets/fallOff.wav');
    game.load.audio('victoryBalloon', '../assets/victoryBalloon.mp3');
    game.load.audio('victoryEmerald', '../assets/victoryEmerald.mp3');
    game.load.audio('world1BG', '../assets/world1BG.mp3');
    game.load.audio('world2BG', '../assets/world2BG.mp3');
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

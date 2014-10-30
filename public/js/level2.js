var world2BGM, witchLaugh, victoryEmerald, witch;


(function(){
  game.state.add('level2', {create:create, update:update});

  var map, layer, cursors, player, time, timer, txtScore, txtTime, twisters, world1BGM, fallOffSound;
  var witchAlive = false;
  function create(){
    score = 0;
    time = 90;

    map = game.add.tilemap('mapGold', 16, 16);
    map.addTilesetImage('Oz');
    layer = map.createLayer(0);
    layer.resizeWorld();

    dieTiles = [6,7,8,14,15,16,22,23,24,30,31,32,38,39,40,41,43,44,46,47,48];
    winTiles = [1,2,3,4,5,9,10,11,12,13,17,18,19,20,21,25,26,27,28,29,33,34,35,36,37];
    map.setTileIndexCallback(dieTiles, offPath.killPlayer, this);
    /*map.setTileIndexCallback([14,15,16], offPath.killPlayer, this);
    map.setTileIndexCallback([22,24], offPath.killPlayer, this);
    map.setTileIndexCallback([30,32], offPath.killPlayer, this);
    map.setTileIndexCallback([38,40], offPath.killPlayer, this);
    map.setTileIndexCallback([41, 41], offPath.killPlayer, this);
    map.setTileIndexCallback([43,44], offPath.killPlayer, this);
    map.setTileIndexCallback([46,48], offPath.killPlayer, this);*/

    map.setTileIndexCallback(winTiles, offPath.playerWins, this);
    /*map.setTileIndexCallback([9,13], offPath.playerWins, this);
    map.setTileIndexCallback([17,21], offPath.playerWins, this);
    map.setTileIndexCallback([25,29], offPath.playerWins, this);
    map.setTileIndexCallback([33,37], offPath.playerWins, this);*/

    victoryEmerald = game.add.audio('victoryEmerald');
    witchLaughter = game.add.audio('witchLaughter');
    world2BGM = game.add.audio('world2BG');
    world2BGM.play();
    fallOffSound = game.add.audio('fallOffSound');
    //map.setCollisionBetween(54, 83);
    //layer.debug = true;

    // Score and timer
    txtScore = game.add.text(10, 10, "score: " + score,   { font: "20px Arial", fill: "#ffffff" });
    txtTime  = game.add.text(10, 35, 'time: ' + time, { font: "20px Arial", fill: "#ffffff" });
    timer = game.time.events.loop(1000, subtractTime);
    txtScore.fixedToCamera = true;
    txtTime.fixedToCamera = true;

    // Player
    player = game.add.sprite(48, 48, 'player', 1);
    player.animations.add('left', [0,1], 10, true);
    player.animations.add('right', [3,4], 10, true);
    player.animations.add('up', [5], 10, true);
    player.animations.add('down', [2], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    game.camera.follow(player);

    player.body.setSize(10, 10, 6, player.body.height - 10);

    // Twisters
    twisters = game.add.group();
    twisters.enableBody = true;
    twisters.physicsBodyType = Phaser.Physics.ARCADE;
    twisters.createMultiple(5, 'twister');
    //twisters.setAll('body.gravity.x', -200);
    twisters.setAll('checkWorldBounds', true);
    twisters.setAll('outOfBoundsKill', true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    var winKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    winKey.onDown.add(winState);

    //game.time.events.add(5000, addWitch);
    addWitch();


  }

  function update(){
    game.physics.arcade.collide(player, layer);
    player.body.velocity.set(0);

    if(cursors.left.isDown){
      player.body.velocity.x = -100;
      player.play('left');
    }else if (cursors.right.isDown){
      player.body.velocity.x = 100;
      player.play('right');
    }else if (cursors.up.isDown){
      player.body.velocity.y = -100;
      player.play('up');
    }else if (cursors.down.isDown){
      player.body.velocity.y = 100;
      player.play('down');
    } else {
      player.animations.stop();
    }

    if(witch){
      moveWitch();
    }
    game.physics.arcade.overlap(player, witch, witchBanish);

  }

  /*function render(){
    game.debug.body(player);
  }*/

  var elapsed = 0;
  function sendTwister(){
    if (time - elapsed < 0 || elapsed === 0){
      var t = twisters.getFirstDead();
      t.reset(840, game.world.randomY);
      elapsed = time - 3;
    }
  }

  function levelUp(){
    game.state.start('menu');
  }

  function subtractTime(){
    time--;
    txtTime.text = 'time: '+ time;
    if(!time)
      //world2BGM.destroy();

      //player.kill();
      game.state.start('goBackToKansas');
  }

  var offPath = {
    killPlayer: function () {
      fallOffSound.play();
      player.kill();
      player.reset(48,48);
    },
    playerWins: function() {
      world2BGM.destroy();
      //victoryEmerald.play();
      witch.kill();
      player.kill();
      game.state.start('goToWin');
    }
  };

  function addWitch(){
    witch = game.add.sprite(200, 40, 'witch', 1);
    witch.alive = true;
    witch.enableBody = true;
    witch.physicsBodyType = Phaser.Physics.ARCADE;
    console.log('adding witch')
    console.log(witch.alive);
    witchAlive = true;
    game.physics.enable(witch, Phaser.Physics.ARCADE);
    witch.body.collideWorldBounds = true;
    witch.scale.x = 0.70;
    witch.scale.y = 0.70;
  }

  function moveWitch(){
    console.log(witch)
    game.physics.arcade.accelerateToObject(witch, player, 25);
  }

  function witchBanish(){
      witchLaughter.play();
      player.reset(48, 48);
  }

  function winState(){
    game.world.removeAll();
    world2BGM.destroy();
    game.state.start('goToWin');
  }


})();

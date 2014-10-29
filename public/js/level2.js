(function(){
  game.state.add('level2', {create:create, update:update});

  var map, layer, cursors, player, time, timer, txtScore, txtTime, twisters;

  function create(){
    score = 0;
    time = 90;

    map = game.add.tilemap('map', 16, 16);
    map.addTilesetImage('tiles');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(54, 83);
    layer.debug = true;

    // Score and timer
    txtScore = game.add.text(10, 10, "score: " + score,   { font: "20px Arial", fill: "#ffffff" });
    txtTime  = game.add.text(10, 35, 'time: ' + time, { font: "20px Arial", fill: "#ffffff" });
    timer = game.time.events.loop(1000, subtractTime);
    txtScore.fixedToCamera = true;
    txtTime.fixedToCamera = true;

    // Player
    player = game.add.sprite(48, 48, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.setSize(10, 14, 2, 1);

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

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(levelUp);
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
    }else{
      player.animations.stop();
    }
  }

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
      game.state.restart();
  }

})();

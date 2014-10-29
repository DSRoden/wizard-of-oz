(function(){
  game.state.add('level1', {create:create, update:update});

  var map, layer, cursors, player, mask, txtScore, txtTime, timer, time, world1BGM, collectMoneyM, twisterM, victoryBalloonM, moneyBag, moneyBags,
      elapsed = 0;

  function create(){
    score = 0;
    time = 3000000;

    //Setting up the tilemap and layer
    map = game.add.tilemap('mapBw', 16, 16);
    map.addTilesetImage('kansas');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(1, 3);
    map.setCollision(9);
    map.setCollision(11);
    map.setCollisionBetween(17, 21);
    map.setCollisionBetween(25, 29);
    map.setCollision(32);
    map.setCollision(33);
    map.setCollisionBetween(35, 37);
    map.setCollisionBetween(41, 45);

    //play background music
    world1BGM = game.add.audio('world1BG');
    world1BGM.loop = true;
    world1BGM.play();
    //collectMoneyM = game.add.audio('collectMoney');
    //twisterM = game.add.audio('twister');
    //victoryBalloonM = game.add.audio('victoryBalloon');


    // Score and timer
    txtScore = game.add.text(10, 10, "score: " + score,   { font: "20px Arial", fill: "#ffffff" });
    txtTime  = game.add.text(10, 35, 'time: ' + time, { font: "20px Arial", fill: "#ffffff" });
    timer = game.time.events.loop(1000, subtractTime);
    txtScore.fixedToCamera = true;
    txtTime.fixedToCamera = true;

    //Player sprite code
    player = game.add.sprite(650, 650, 'player', 1);
    player.animations.add('left', [0,1], 10, true);
    player.animations.add('right', [3,4], 10, true);
    player.animations.add('up', [5], 10, true);
    player.animations.add('down', [2], 10, true);
    player.assets = null;
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;

    //Mask
    mask = game.add.graphics(player.x -100, player.y -100);
    mask.beginFill(0xffffff);
    mask.drawCircle(100, 100, 250);
    layer.mask = mask;

    game.camera.follow(player);

    // Twisters
    twisters = game.add.group();
    twisters.enableBody = true;
    twisters.physicsBodyType = Phaser.Physics.ARCADE;
    twisters.createMultiple(5, 'twister');
    twisters.setAll('checkWorldBounds', true);
    twisters.setAll('outOfBoundsKill', true);

    //moneyBag code
    moneyBags = game.add.group();
    moneyBags.enableBody = true;
    moneyBags.physicsBodyType = Phaser.Physics.ARCADE;
    moneyBags._mask = mask;
    moneyBags.setAll('checkWorldBounds', true);
    moneyBags.setAll('mask', mask);

    for(var i = 0; i < 6; i++)
      //moneyBag.mask = mask;
      moneyBags.add(game.add.sprite(game.world.randomX, game.world.randomY, 'moneyBag'));

    // Cursors move player
    cursors = game.input.keyboard.createCursorKeys();

    //Spacebar takes you to next level
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(levelUp);
  }

  function update(){
    if(player.assets > 0)
      displayWorld();

    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(moneyBags, layer);
    game.physics.arcade.overlap(player, twisters, twisterThrow);
    game.physics.arcade.overlap(player, moneyBags, collectMoney);
    player.body.velocity.set(0);

    if(twisters.getFirstAlive()){
      game.physics.arcade.accelerateToObject(twisters.getFirstAlive(), player, 200);
    }else{
      sendTwister();
    }

    //Player movement using cursors
    if(cursors.left.isDown){
      player.body.velocity.x = -300;
      move();
      player.play('left');
    }else if (cursors.right.isDown){
      player.body.velocity.x = 300;
      move();
      player.play('right');
    }else if (cursors.up.isDown){
      player.body.velocity.y = -300;
      move();
      player.play('up');
    }else if (cursors.down.isDown){
      player.body.velocity.y = 300;
      move();
      player.play('down');
    }else{
      player.animations.stop();
    }
}
  function levelUp(){
    game.world.removeAll();
    game.state.start('level2');
  }

  function subtractTime(){
    time--;
    txtTime.text = 'time: '+ time;
    if(!time)
      restartGame();
  }

  function sendTwister(){
    if (time - elapsed < 0 || elapsed === 0){
      var t = twisters.getFirstDead();
      t.mask = mask;
      t.reset(840, game.world.randomY);
      elapsed = time - 3;
    }
  }

  function twisterThrow(){
    player.reset(game.world.randomX, game.world.randomY);
  }

  function move(){
    mask.x = player.x - 100;
    mask.y = player.y - 100;
  }

  function restartGame(){
    elapsed = 0;
    game.world.removeAll();
    game.state.restart();
  }

  function collectMoney(player, moneyBag){
    moneyBag.kill();
    //collectMoney.play();
    player.assets++;
  }

  var i = 1;
  function displayWorld(){
    i++;

    if(i * 3 < 800);
      mask.destroy();
      mask = game.add.graphics(player.x -100, player.y -100);
      mask.beginFill(0xffffff);
      mask.drawCircle(100, 100, 250 + i * 3);
      layer.mask = mask;

  }

})();

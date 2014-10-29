(function(){
  game.state.add('level1', {create:create, update:update});

  var map, layer, cursors, player, mask, txtScore, txtTime, timer, time;

  function create(){
    score = 0;
    time = 3000000000;

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
    map.setCollision(33);
    map.setCollisionBetween(35, 37);
    map.setCollisionBetween(41, 45);

    // Score and timer
    txtScore = game.add.text(10, 10, "score: " + score,   { font: "20px Arial", fill: "#ffffff" });
    txtTime  = game.add.text(10, 35, 'time: ' + time, { font: "20px Arial", fill: "#ffffff" });
    timer = game.time.events.loop(1000, subtractTime);
    txtScore.fixedToCamera = true;
    txtTime.fixedToCamera = true;

    //Player sprite code
    player = game.add.sprite(650, 650, 'player', 1);
    player.animations.add('left', [8,9], 10, true);
    player.animations.add('right', [1,2], 10, true);
    player.animations.add('up', [11,12,13], 10, true);
    player.animations.add('down', [4,5,6], 10, true);
    player.assets = null;

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.setSize(10, 14, 2, 1);

    console.log(player.x, player.y);
    mask = game.add.graphics(player.x -100, player.y -100);
    mask.beginFill(0xffffff);
    mask.drawCircle(100, 100, 100);
    layer.mask = mask;

    game.camera.follow(player);

    //moneyBag code
    moneyBags = game.add.group();
    moneyBags.enableBody = true;
    moneyBags.physicsBodyType = Phaser.Physics.ARCADE;
    moneyBags.setAll('body.collideWorldBounds', true);
    //moneyBags.setAll('mask', mask);

    for(var i = 0; i < 6; i++)
      var moneyBag = game.add.sprite(game.world.randomX, game.world.randomY, 'moneyBag');
      moneyBags.add(moneyBag);
      moneyBag.mask = mask;

    // Cursors move player
    cursors = game.input.keyboard.createCursorKeys();

    //Spacebar takes you to next level
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(levelUp);
  }



  function update(){
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(moneyBags, layer);
    player.body.velocity.set(0);

    //Player movement using cursors
    if(cursors.left.isDown){
      move();
      player.body.velocity.x = -100;
      player.play('left');
    }else if (cursors.right.isDown){
      move();
      player.body.velocity.x = 100;
      player.play('right');
    }else if (cursors.up.isDown){
      move();
      player.body.velocity.y = -100;
      player.play('up');
    }else if (cursors.down.isDown){
      move();
      player.body.velocity.y = 100;
      player.play('down');
    }else{
      player.animations.stop();
    }
}
  function levelUp(){
    game.state.start('level2');
  }

  function subtractTime(){
    time--;
    txtTime.text = 'time: '+ time;
    if(!time)
      game.state.restart();
  }

  function move(){
    mask.x = player.x - 100;
    mask.y = player.y - 100;
  }

  function collectMoney(player, moneyBag){
        moneyBag.kill();
        o.l.collectMoney.play();
        player.assets++;
      }


})();

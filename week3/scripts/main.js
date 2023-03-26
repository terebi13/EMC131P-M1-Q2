var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player, pochicat, platform, cursors, score = 0, scoreText;

function preload() {
    this.load.image("ground", "../assets/images/platform.png");
    this.load.image("cat", "../assets/images/cat.png");
    this.load.image("background", "../assets/images/land.jpg");
    this.load.image("catcher", "../assets/images/catcher.png",
    { frameWidth: 300, frameHeight: 300} 
    );
}

function create () {

    platform = this.physics.add.staticGroup(); 
    platform.create(400, 550, 'ground').setScale(.29).refreshBody();
    this.add.image(400, 280, 'background').setScale(.27);

    player = this.physics.add.sprite(100, 300, 'catcher').setScale(.2);
    player.setBounce(.3);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platform);
    
    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '40px', fill: '#703DEF' });
    
    pochicat = this.physics.add.group();
    pochicat.create(600, 250, 'cat').setScale(0.1);

    this.physics.add.collider(pochicat, platform);
    this.physics.add.overlap(player, pochicat, collectPochicat, null, this);
    
    function collectPochicat (player, pochicat) {
        pochicat.disableBody(true, true);
        score += 100;
        scoreText.setText('Score: ' + score);
    
        if (score == 100) {
            return alert("WELL DONE!")
    
        }
    }
    
}

function update () {
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}


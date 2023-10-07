// Referencing: week 7 source code in the lecture notes
// Referencing: https://phaser.io/examples/v2/games/tanks
// Assets: https://phaser.io/examples/v2/games/tanks && week 7 source codes
// Referencing: https://samme.github.io/phaser-examples-mirror/games/tanks.html

let game;
let tank;

const gameOptions = {
    tankSpeed: 150
}

window.onload = function () {
    const gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: "#112211",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600,
        },
        pixelArt: true,
        physics: {
            default: "arcade"
        },
        scene: TankGame
    }

    game = new Phaser.Game(gameConfig)
    window.focus();
}

class TankGame extends Phaser.Scene {
    constructor() {
        super("TankGame");
        this.score = 0;
        this.topScore = localStorage.getItem("topScore") || 0;

    }

    preload() {
        this.load.image("grass", "assets/dark_grass.png");
        this.load.image("tank", "assets/tank1.png");
        this.load.image("enemyTank", "assets/tank2.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("enemyBullet", "assets/bullet.png");
        this.load.spritesheet("explosion", "assets/explosion.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image("star", "assets/star.png");
    }

    create() {
        this.add.tileSprite(0, 0, 1600, 1200, 'grass').setOrigin(0, 0);

        tank = this.physics.add.sprite(100, game.config.height / 2, "tank");
        tank.health = 5;
        tank.healthText = this.add.text(tank.x, tank.y - 40, `${tank.health}/5`, { fontSize: '20px', fill: '#0000ff' }).setOrigin(0.5);
        tank.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.enemyTanks = this.physics.add.group();
        this.spawnTimer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemyTank,
            callbackScope: this,
            loop: true
        });

        this.bullets = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();
        this.stars = this.physics.add.group();

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.input.on('pointerdown', this.shootBullet, this);

        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
        this.topScoreText = this.add.text(10, 45, 'Top Score: ' + this.topScore, { fontSize: '32px', fill: '#ffffff' });

        this.instructionText = this.add.text(game.config.width - 10, 10,
            'Arrow Keys: Move\nClick: Shoot',
            { fontSize: '20px', fill: '#ffffff', align: 'right' }
        );
        this.instructionText.setOrigin(1, 0);
        this.subtitleText = this.add.text(game.config.width, game.config.height - 50, "Destroy enemy tanks and don't let them pass!", { fontSize: '24px', fill: '#ffffff' });
        this.tweens.add({
            targets: this.subtitleText,
            x: -this.subtitleText.width,
            duration: 10000,
            ease: 'Linear',
            onComplete: function (tween, targets, subtitle) {
                subtitle.destroy();
            },
            onCompleteParams: [this.subtitleText]
        });

        this.physics.add.collider(this.bullets, this.enemyTanks, this.bulletHitEnemy, null, this);
        this.physics.add.collider(this.enemyBullets, tank, this.bulletHitPlayer, null, this);
        this.physics.add.collider(tank, this.stars, this.collectStar, null, this);
    }

    shootBullet(pointer) {
        const bullet = this.bullets.create(tank.x, tank.y, 'bullet');
        this.physics.moveTo(bullet, pointer.x, pointer.y, 300);
        this.time.addEvent({
            delay: 2000,
            callback: () => bullet.destroy(),
            callbackScope: this
        });
    }

    spawnEnemyTank() {
        if (this.enemyTanks.getChildren().filter(tank => tank.active).length < 12) {
            const enemy = this.enemyTanks.create(game.config.width - 50, Phaser.Math.Between(50, game.config.height - 50), 'enemyTank');
            enemy.setImmovable(true);
            enemy.health = 2;
            enemy.healthText = this.add.text(enemy.x, enemy.y - 40, `${enemy.health}/2`, { fontSize: '20px', fill: '#ff0000' }).setOrigin(0.5);
            enemy.setVelocityX(-Phaser.Math.Between(50, 100));
            enemy.setCollideWorldBounds(true);
            const shootDelay = Phaser.Math.Between(1000, 5000);
            this.time.addEvent({
                delay: shootDelay,
                callback: this.enemyShoot,
                args: [enemy],
                callbackScope: this
            });
        }
    }

    enemyShoot(enemy) {
        if (enemy.active) {
            const bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemyBullet');
            this.physics.moveTo(bullet, tank.x, tank.y, 250);
            this.time.addEvent({
                delay: 2000,
                callback: () => bullet.destroy(),
                callbackScope: this
            });
        }
    }

    deductPointForEnemyReach(enemy) {
        if (enemy.x <= enemy.width / 2 && enemy.active) {
            this.score -= 1;
            this.updateScoreDisplay();

            if (enemy.healthText) {
                enemy.healthText.destroy();
            }
            enemy.destroy();
        }
    }

    updateScoreDisplay() {
        this.scoreText.setText('Score: ' + this.score);

        if(this.score > this.topScore) {
            this.topScore = this.score;
            localStorage.setItem("topScore", this.topScore);
            this.topScoreText.setText('Top Score: ' + this.topScore);
        }
    }

    bulletHitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.health -= 1;

        if (enemy.health >= 0) {
            enemy.healthText.setText(`${enemy.health}/2`);
        }

        if (enemy.health == 0) {
            const explosion = this.add.sprite(enemy.x, enemy.y, 'explosion');
            explosion.play('explode');
            explosion.on('animationcomplete', () => {
                explosion.destroy();
            });

            this.score += 1;
            this.updateScoreDisplay();

            enemy.setVelocity(0);
            const star = this.stars.create(enemy.x, enemy.y, 'star');
            this.time.addEvent({
                delay: 5000,
                callback: () => star.destroy(),
                callbackScope: this
            });

            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    enemy.healthText.destroy();
                    enemy.destroy();
                },
                callbackScope: this
            });
        }
    }

    bulletHitPlayer(tank, bullet) {
        bullet.destroy();
        tank.health -= 1;

        if (tank.health >= 0) {
            tank.healthText.setText(`${tank.health}/5`);
        }

        if (tank.health == 0) {
            const explosion = this.add.sprite(tank.x, tank.y, 'explosion');
            explosion.play('explode');
            explosion.on('animationcomplete', () => {
                explosion.destroy();
            });

            this.gameOver();
        }
    }

    collectStar(player, star) {
        star.destroy();
        this.score += 2;
        this.updateScoreDisplay();
    }

    update() {
        if (this.cursors.left.isDown) {
            tank.setVelocityX(-gameOptions.tankSpeed);
        }
        else if (this.cursors.right.isDown) {
            tank.setVelocityX(gameOptions.tankSpeed);
        }
        else {
            tank.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            tank.setVelocityY(-gameOptions.tankSpeed);
        }
        else if (this.cursors.down.isDown) {
            tank.setVelocityY(gameOptions.tankSpeed);
        }
        else {
            tank.setVelocityY(0);
        }

        tank.healthText.x = tank.x;
        tank.healthText.y = tank.y - 40;

        this.enemyTanks.getChildren().forEach(enemy => {
            this.deductPointForEnemyReach(enemy);
            if (enemy.healthText) {
                enemy.healthText.x = enemy.x;
                enemy.healthText.y = enemy.y - 40;
            }
        });
    }

    gameOver() {
        const gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', { fontSize: '64px', fill: '#ff0000' }).setOrigin(0.5);
        this.physics.pause();

        this.input.off('pointerdown', this.shootBullet, this);
        if (this.spawnTimer) {
            this.spawnTimer.destroy();
        }

        if(this.score > this.topScore) {
            this.topScore = this.score;
            localStorage.setItem("topScore", this.topScore);
            this.topScoreText.setText('Top Score: ' + this.topScore);
        }

        const restartButton = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'START AGAIN', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        restartButton.on('pointerdown', () => {
            this.score = 0;
            this.scene.restart();
        });
    }
}

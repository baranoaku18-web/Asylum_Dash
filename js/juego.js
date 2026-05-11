class Juego extends Phaser.Scene {

    constructor() {
        super("Juego");
    }

    preload() {

        this.load.audio("musica", "assets/musica.mp3");
        this.load.audio("muerte", "assets/muerte.mp3");
        this.load.audio("moneda", "assets/moneda.mp3");

        let cassette = this.add.image(this.scale.width /2, this.scale.height /2, "cassette");
        
        cassette.setScale(2.5);
    }

    create() {

        const ancho = this.scale.width;
        const alto = this.scale.height;

        this.fondoInfinito = this.add.tileSprite(
            ancho / 2,
            alto / 2,
            ancho,
            alto,
            "fondo"
        );

        // ==================================
        // SUELO
        // ==================================

        this.suelo = this.physics.add.staticGroup();

        this.suelo.create(ancho / 2, alto - 20, "suelo")
            .setDisplaySize(ancho, 40)
            .refreshBody();

        // ==================================
        // VARIABLES
        // ==================================

        this.velocidad = -300;

        this.muerto = false;
        this.gano = false;

        this.contadorMonedas = 0;

        // ==================================
        // AUDIO
        // ==================================

        this.musica = this.sound.add("musica", {
            loop: true,
            volume: 0.5
        });

        this.musica.play();

        this.sfxMuerte = this.sound.add("muerte", {
            volume: 1
        });

        this.sfxMoneda = this.sound.add("moneda", {
    volume: 3
});

        // ==================================
        // JUGADOR
        // ==================================

        this.jugador = this.physics.add.sprite(
            100,
            alto - 100,
            "cubo"
        );

        this.jugador.setDisplaySize(40, 40);

        this.jugador.setGravityY(1800);

        this.jugador.setCollideWorldBounds(true);

        // ==================================
        // GRUPOS
        // ==================================

        this.spikes = this.physics.add.group();

        this.plataformas = this.physics.add.group();

        this.monedas = [];

        // ==================================
        // COLISIONES
        // ==================================

        this.physics.add.collider(
            this.jugador,
            this.suelo
        );

        this.physics.add.collider(
            this.jugador,
            this.plataformas,
            null,
            this.procesarPlataforma,
            this
        );

        this.physics.add.overlap(
            this.jugador,
            this.spikes,
            this.gameOver,
            null,
            this
        );

        const sueloY = this.suelo.children.entries[0].y;

        let x = 600;

        // ==================================
        // HELPERS
        // ==================================

        const spike = () => {

            this.crearSpike(x, sueloY);

            x += 280;
        };

        const dobleSpike = () => {

            this.crearSpike(x, sueloY);

            this.crearSpike(x + 80, sueloY);

            x += 360;
        };

        const escalera = (pasos, ancho = 80) => {

            let altura = 35;

            for (let i = 0; i < pasos; i++) {

                this.crearPlataforma(
                    x,
                    sueloY - altura,
                    ancho
                );

                altura += 18;

                x += 240;
            }

            x += 300;
        };

        // ==================================
        // NIVEL
        // ==================================

        spike();
        spike();

        this.crearMoneda(670, sueloY - 90);

        this.crearPlataforma(
            x,
            sueloY - 30,
            140
        );

        this.crearMoneda(x - 40, sueloY - 90);
        this.crearMoneda(x + 40, sueloY - 90);
        this.crearMoneda(x + 170, sueloY - 150);

        x += 380;

        dobleSpike();
        spike();
        dobleSpike();

        this.crearMoneda(x - 260, sueloY - 120);
        this.crearMoneda(x - 40, sueloY - 150);

        this.crearPlataforma(
            x,
            sueloY - 40,
            160
        );

        this.crearMoneda(x, sueloY - 100);

        x += 400;

        escalera(3);

        this.crearMoneda(x - 520, sueloY - 130);
        this.crearMoneda(x - 280, sueloY - 130);
        this.crearMoneda(x - 40, sueloY - 130);

        spike();
        dobleSpike();
        spike();

        for (let i = 0; i < 6; i++) {
            spike();
        }

        this.crearMoneda(x - 300, sueloY - 100);
        this.crearMoneda(x - 80, sueloY - 140);

        this.crearPlataforma(
            x,
            sueloY - 45,
            150
        );

        this.crearMoneda(x - 50, sueloY - 110);
        this.crearMoneda(x + 50, sueloY - 110);

        x += 400;

        escalera(4, 90);

        this.crearMoneda(x - 600, sueloY - 180);
        this.crearMoneda(x - 520, sueloY - 180);
        this.crearMoneda(x - 280, sueloY - 180);
        this.crearMoneda(x + 30, sueloY - 150);

        dobleSpike();
        spike();
        dobleSpike();

        this.crearPlataforma(
            x,
            sueloY - 40,
            200
        );

        this.crearMoneda(x - 70, sueloY - 120);
        this.crearMoneda(x, sueloY - 140);
        this.crearMoneda(x + 70, sueloY - 120);

        x += 450;

        for (let i = 0; i < 7; i++) {
            spike();
        }

        this.crearMoneda(x - 250, sueloY - 100);
        this.crearMoneda(x - 30, sueloY - 150);

        escalera(3, 70);

        this.crearMoneda(x - 520, sueloY - 170);
        this.crearMoneda(x - 280, sueloY - 190);

        dobleSpike();
        dobleSpike();

        for (let i = 0; i < 8; i++) {
            spike();
        }

        this.crearMoneda(x - 500, sueloY - 130);
        this.crearMoneda(x - 250, sueloY - 130);
        this.crearMoneda(x - 100, sueloY - 130);

        this.crearPlataforma(
            x,
            sueloY - 55,
            160
        );

        this.crearMoneda(x - 20, sueloY - 130);
        this.crearMoneda(x + 40, sueloY - 110);

        x += 350;

        dobleSpike();

        this.crearPlataforma(
            x,
            sueloY - 70,
            180
        );

        this.crearMoneda(x - 60, sueloY - 130);
        this.crearMoneda(x, sueloY - 100);
        this.crearMoneda(x + 60, sueloY - 130);

        x += 450;

        // ==================================
        // META
        // ==================================

        this.meta = this.add.rectangle(
            x + 200,
            sueloY - 40,
            40,
            80,
            0x00ff00
        );

        this.physics.add.existing(this.meta);

        this.meta.body.allowGravity = false;

        this.meta.body.setVelocityX(this.velocidad);

        this.physics.add.overlap(
            this.jugador,
            this.meta,
            this.ganar,
            null,
            this
        );

        // ==================================
        // VELOCIDAD OBJETOS
        // ==================================

        this.spikes.children.each(s => {
            s.setVelocityX(this.velocidad);
        });

        this.plataformas.children.each(p => {
            p.setVelocityX(this.velocidad);
        });

        // ==================================
        // INPUT
        // ==================================

        this.input.keyboard.on(
            "keydown-SPACE",
            this.saltar,
            this
        );

        this.input.on(
            "pointerdown",
            this.saltar,
            this
        );

        // ==================================
        // UI VHS
        // ==================================

        this.add.text(20, 20, "REC", {
            fontSize: "64px",
            fill: "#ff0000",
            fontFamily: "monospace"
        });

        let punto = this.add.circle(
            150,
            52,
            15,
            0xff0000
        );

        this.textoMonedas = this.add.text(
            20,
            95,
            "💊 0",
            {
                fontSize: "32px",
                fill: "#ffffff",
                fontFamily: "monospace"
            }
        );

        this.tweens.add({
            targets: punto,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        let tiempoTexto = this.add.text(
            this.scale.width/2,
            50,
            "",
            {
                fontSize: "32px",
                fill: "#ffffff",
                fontFamily: "monospace"
            }
        );

        this.time.addEvent({
            delay: 50,
            loop: true,
            callback: () => {

                let now = new Date();

                let hora = now.toLocaleTimeString();

                let fecha = now.toLocaleDateString();

                tiempoTexto.setText(
                    fecha + "  " + hora
                );
            }
        });

        // SHAKE VHS
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {

                this.cameras.main.setScroll(
                    Phaser.Math.Between(-2, 2),
                    Phaser.Math.Between(-2, 2)
                );
            }
        });

        // LINEAS VHS
        for (let i = 0; i < this.scale.height; i += 4) {

            this.add.rectangle(
                this.scale.width / 2,
                i,
                this.scale.width,
                1,
                0xffffff,
                0.20
            );
        }
    }

    // ==================================
    // SPIKES
    // ==================================

    crearSpike(x, sueloY) {

        let spike = this.spikes.create(
            x,
            0,
            "spike"
        );

        spike.setDisplaySize(40, 40);

        spike.setSize(20, 500);

        spike.setOffset(250, 15);

        spike.y = sueloY - spike.displayHeight;
    }

    // ==================================
    // PLATAFORMAS
    // ==================================

    crearPlataforma(x, y, w) {

        let plataforma = this.plataformas.create(
            x,
            y,
            "suelo"
        );

        plataforma.setDisplaySize(w, 20);

        plataforma.setImmovable(true);

        plataforma.body.allowGravity = false;
    }

    // ==================================
    // MONEDAS
    // ==================================

    crearMoneda(x, y) {

        let moneda = this.add.text(
            x,
            y,
            "💊",
            {
                fontSize: "32px"
            }
        ).setOrigin(0.5);

        moneda.velX = -110;

        moneda.recogida = false;

        this.monedas.push(moneda);
    }

    recogerMoneda(moneda) {

        if (moneda.recogida) return;

        moneda.recogida = true;

        this.contadorMonedas++;

        this.sfxMoneda.play();

        this.textoMonedas.setText(
            "💊 " + this.contadorMonedas
        );

        this.tweens.add({
            targets: moneda,
            y: moneda.y - 40,
            alpha: 0,
            scale: 2,
            duration: 300,
            onComplete: () => {
                moneda.destroy();
            }
        });

        let texto = this.add.text(
            moneda.x,
            moneda.y,
            "+1",
            {
                fontSize: "20px",
                fill: "#00ff00"
            }
        );

        this.tweens.add({
            targets: texto,
            y: texto.y - 50,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                texto.destroy();
            }
        });
    }

    // ==================================
    // PLATAFORMAS
    // ==================================

    procesarPlataforma(jugador, plataforma) {

        let body = jugador.body;

        if (
            body.prev.y + body.height <= plataforma.body.y + 10 &&
            body.velocity.y >= 0
        ) {
            return true;
        }

        this.gameOver();

        return false;
    }

    // ==================================
    // SALTO
    // ==================================

    saltar() {

        if (this.muerto || this.gano) return;

        if (this.jugador.body.blocked.down) {

            this.jugador.setVelocityY(-600);

            this.tweens.add({
                targets: this.jugador,
                angle: this.jugador.angle + 180,
                duration: 400
            });

            let particula = this.add.circle(
                this.jugador.x,
                this.jugador.y + 20,
                5,
                0xff0000
            );

            this.tweens.add({
                targets: particula,
                y: particula.y + 20,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                    particula.destroy();
                }
            });
        }
    }

    // ==================================
    // UPDATE
    // ==================================

    update() {

        if (this.muerto || this.gano) return;

        this.jugador.setVelocityX(0);

        this.spikes.children.each(s => {

            if (s.x < -50) {
                s.destroy();
            }
        });

        this.plataformas.children.each(p => {

            if (p.x < -100) {
                p.destroy();
            }
        });

        // ==================================
        // MONEDAS
        // ==================================

        this.monedas.forEach(moneda => {

            if (!moneda.active) return;

            moneda.x += moneda.velX * (1 / 60);

            // colision simple
            let distancia = Phaser.Math.Distance.Between(
                this.jugador.x,
                this.jugador.y,
                moneda.x,
                moneda.y
            );

            if (distancia < 40) {
                this.recogerMoneda(moneda);
            }

            if (moneda.x < -50) {
                moneda.destroy();
            }
        });

        if (this.meta.x < -50) {
            this.meta.destroy();
        }

        this.fondoInfinito.tilePositionX += 3;
    }

    // ==================================
    // GAME OVER
    // ==================================

    gameOver() {

        if (this.muerto) return;

        this.physics.pause();

        this.muerto = true;

        this.musica.stop();

        this.sfxMuerte.play();

        let x = this.jugador.x;
        let y = this.jugador.y;

        this.jugador.setVisible(false);

        // SHAKE
        this.cameras.main.shake(300, 0.02);

        // FLASH
        let flash = this.add.rectangle(
            0,
            0,
            this.scale.width,
            this.scale.height,
            0xff0000
        )
        .setOrigin(0)
        .setAlpha(0);

        this.tweens.add({
            targets: flash,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            onComplete: () => flash.destroy()
        });

        // SALPICADURA
        for (let i = 0; i < 20; i++) {

            let p = this.add.circle(
                x,
                y,
                Phaser.Math.Between(3, 6),
                0xff0000
            );

            this.tweens.add({
                targets: p,
                x: x + Phaser.Math.Between(-120, 120),
                y: y + Phaser.Math.Between(-120, 120),
                alpha: 0,
                duration: Phaser.Math.Between(300, 600),
                onComplete: () => p.destroy()
            });
        }

        // MANCHAS
        for (let i = 0; i < 20; i++) {

            let mancha = this.add.circle(
                Phaser.Math.Between(0, this.scale.width),
                Phaser.Math.Between(0, this.scale.height),
                Phaser.Math.Between(15, 40),
                0x8b0000
            );

            mancha.setAlpha(0.45);

            mancha.setDepth(10);

            this.tweens.add({
                targets: mancha,
                alpha: 0.15,
                duration: 800,
                yoyo: true,
                repeat: -1
            });
        }

        // BOOM
        let boom = this.add.circle(
            x,
            y,
            10,
            0xff0000
        );

        this.tweens.add({
            targets: boom,
            scale: 4,
            alpha: 0,
            duration: 300,
            onComplete: () => boom.destroy()
        });

        let cassette = this.add.image(this.scale.width /2, this.scale.height /2, "cassette");
        
        cassette.setScale(2);

        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 - 165,
            "GAME OVER",
            {
                fontSize: "64px",
                fill: "#ff0000b9"
            }
        ).setOrigin(0.5);

        let boton = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 200,
            "REINICIAR",
            {
                fontSize: "24px",
                fill: "#ffffff"
            }
        )
        .setOrigin(0.5)
        .setInteractive();

        boton.on("pointerdown", () => {

    this.noiseEvent.remove();
    this.glitchEvent.remove();

    this.scene.restart();
});

        // RUIDO VHS
this.noiseEvent = this.time.addEvent({
    delay: 50,
    loop: true,
    callback: () => {

        for(let i = 0; i < 120; i++){

            let ruido = this.add.rectangle(
                Phaser.Math.Between(0, this.scale.width),
                Phaser.Math.Between(0, this.scale.height),
                Phaser.Math.Between(2, 10),
                2,
                0xffffff,
                Phaser.Math.FloatBetween(0.08, 0.25)
            );

            this.tweens.add({
                targets: ruido,
                alpha: 0,
                duration: 80,
                onComplete: () => ruido.destroy()
            });
        }
    }
});

// DISTORSIÓN VHS
this.glitchEvent = this.time.addEvent({
    delay: 700,
    loop: true,
    callback: () => {

        let linea = this.add.rectangle(
            this.scale.width / 2,
            Phaser.Math.Between(0, this.scale.height),
            this.scale.width,
            Phaser.Math.Between(10, 30),
            0xffffff,
            0.12
        );

        this.cameras.main.shake(120, 0.004);

        this.tweens.add({
            targets: linea,
            x: this.scale.width / 2 + Phaser.Math.Between(-60, 60),
            alpha: 0,
            duration: 120,
            onComplete: () => linea.destroy()
        });
    }
});
    }

    // ==================================
    // GANAR
    // ==================================

    ganar() {

        if (this.gano) return;

        this.physics.pause();

        this.gano = true;

        this.musica.stop();

        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 - 40,
            "GANASTE",
            {
                fontSize: "40px",
                fill: "#00ff00"
            }
        ).setOrigin(0.5);

        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            "💊 " + this.contadorMonedas,
            {
                fontSize: "32px",
                fill: "#ffffff"
            }
        ).setOrigin(0.5);

        let boton = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 40,
            "REINICIAR",
            {
                fontSize: "24px",
                fill: "#ffff00"
            }
        )
        .setOrigin(0.5)
        .setInteractive();

        boton.on("pointerdown", () => {
            this.scene.restart();
        });
    }

    
}
class Inicio extends Phaser.Scene {

    constructor(){
        super("Inicio");
    }

    create(){

        let ancho = this.scale.width;
        let alto = this.scale.height;

        // Fondo
        let fondo = this.add.image(ancho/2, alto/2, "fondo_inicio");
        fondo.setDisplaySize(ancho, alto);
        fondo.setAlpha(0.8);

        // ===== TITULO SANGRIENTO =====
        let titulo = this.add.text(ancho/2, alto/2 + 20, "SURVIVE", {
            fontSize: "64px",
            fontFamily: "Arial Black",
            color: "#ff0000",
            stroke: "#3b0000",
            strokeThickness: 12,
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: "#ff0000",
                blur: 25,
                fill: true
            }
        }).setOrigin(0.5);

        // Animación tipo sangre latiendo
        this.tweens.add({
            targets: titulo,
            scaleX: 1.08,
            scaleY: 1.08,
            alpha: 0.85,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // Goteos de sangre
        for(let i = 0; i < 15; i++){

            let gota = this.add.circle(
                Phaser.Math.Between(ancho/2 - 180, ancho/2 + 180),
                alto/2 + 60,
                Phaser.Math.Between(3, 8),
                0xaa0000
            );

            gota.alpha = 0.8;

            this.tweens.add({
                targets: gota,
                y: gota.y + Phaser.Math.Between(80, 180),
                alpha: 0,
                duration: Phaser.Math.Between(1000, 2500),
                repeat: -1,
                delay: Phaser.Math.Between(0, 2000),
                ease: "Sine.easeIn"
            });
        }

        // ===== BOTON PLAY SANGRIENTO =====
        let boton = this.add.text(ancho/2, alto/2 + 200, "PLAY", {
            fontSize: "46px",
            fontFamily: "Arial Black",
            color: "#ffffff",
            backgroundColor: "#7a0000",
            stroke: "#2b0000",
            strokeThickness: 8,
            padding: { x: 25, y: 12 }
        })
        .setOrigin(0.5)
        .setInteractive();

        // Hover agresivo
        boton.on("pointerover", () => {
                
            this.tweens.killTweensOf(boton);

            boton.setScale(1.15);

            this.tweens.add({
                targets: boton,
                angle: 2,
                duration: 100,
                yoyo: true,
                repeat: 4
            });
        });

        boton.on("pointerout", () => {
            boton.setScale(1);
            boton.setAngle(0);
        });

        // Click
        boton.on("pointerdown", () => {

              // SONIDO
    this.sound.play("click_play", {
        volume: 3
    });

            this.cameras.main.shake(600, 0.01);

            this.tweens.add({
                targets: boton,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 100,
                yoyo: true
            });

            this.time.delayedCall(600, () => {
                this.scene.start("Juego");
            });
        });

        // ===== INSTRUCCIONES =====
        let instrucciones = this.add.text(
            ancho/2,
            alto/2 + 300,
            "TOCA LA PANTALLA O PRESIONA ESPACIO",
            {
                fontSize: "24px",
                fontFamily: "Arial Black",
                color: "#ff4444",
                stroke: "#000000",
                strokeThickness: 5
            }
        ).setOrigin(0.5);

        // Parpadeo creepy
        this.tweens.add({
            targets: instrucciones,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

    }
}
class Carga extends Phaser.Scene {

    constructor(){
        super("Carga");
    }

    preload(){

        const W = this.scale.width;
        const H = this.scale.height;

        // ===== AUDIO =====
        this.load.audio("musica_carga", "assets/carga.mp3");
        this.load.audio("click_play", "assets/click.mp3");

        // ===== EFECTO CAMARA =====
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

        // ===== FONDO =====
        this.cameras.main.setBackgroundColor("#000000");

        // ===== LOGO =====
        let logo = this.add.image(W / 2, H * 0.28, "logo");

        logo.setScale(W * 0.00025);
        logo.setAlpha(0.8);

        this.tweens.add({
            targets: logo,
            alpha: 0.3,
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        // ===== TEXTO =====
        let texto = this.add.text(

            W / 2,
            H * 0.63,

            "Cargando...",

            {
                fontSize: `${W * 0.022}px`,
                fill: "#88ff88",
                fontFamily: "monospace"
            }

        ).setOrigin(0.5);

        let mensajes = [

            "Cargando...",
            "No estás solo...",
            "Escuchaste eso?",
            "No mires atrás..."

        ];

        this.time.addEvent({

            delay: 1000,
            loop: true,

            callback: () => {

                let r = Phaser.Math.Between(0, mensajes.length - 1);
                texto.setText(mensajes[r]);

            }
        });

        // ===== BARRA =====

        const barraAncho = W * 0.4;
        const barraAlto = H * 0.02;

        let barraFondo = this.add.rectangle(

            W / 2,
            H * 0.70,

            barraAncho,
            barraAlto,

            0x1a1a1a

        );

        let barra = this.add.rectangle(

            W / 2 - barraAncho / 2,
            H * 0.70,

            0,
            barraAlto,

            0x88ff88

        ).setOrigin(0, 0.5);

        let progresoReal = 0;
        let progresoVisual = 0;

        this.load.on("progress", (value) => {
            progresoReal = value;
        });

        // ===== SUAVIZADO =====

        this.time.addEvent({

            delay: 16,
            loop: true,

            callback: () => {

                if(progresoVisual < progresoReal){

                    progresoVisual += 0.003;

                    if(progresoVisual > progresoReal){
                        progresoVisual = progresoReal;
                    }

                    barra.width = barraAncho * progresoVisual;
                }
            }
        });

        // ===== MUSICA Y CAMBIO =====

        this.load.on("complete", () => {

            let musica = this.sound.add("musica_carga", {

                loop: true,
                volume: 2

            });

            musica.play();

            let esperarBarra = this.time.addEvent({

                delay: 16,
                loop: true,

                callback: () => {

                    if(progresoReal === 1 && progresoVisual >= progresoReal){

                        esperarBarra.remove();

                        this.time.delayedCall(500, () => {

                            musica.stop();
                            this.scene.start("Inicio");

                        });
                    }
                }
            });
        });

        // ===== REC =====

        let rec = this.add.text(

            W * 0.02,
            H * 0.02,

            "REC",

            {
                fontSize: `${W * 0.03}px`,
                fill: "#ff0000",
                fontFamily: "monospace"
            }

        );

        let punto = this.add.circle(

            W * 0.12,
            H * 0.05,

            W * 0.008,

            0xff0000

        );

        this.tweens.add({

            targets: punto,
            alpha: 0,

            duration: 500,
            yoyo: true,
            repeat: -1

        });

        // ===== FECHA Y HORA =====

        let tiempoTexto = this.add.text(

            W * 0.75,
            H * 0.93,

            "",

            {
                fontSize: `${W * 0.018}px`,
                fill: "#ffffff",
                fontFamily: "monospace"
            }

        );

        this.time.addEvent({

            delay: 800,
            loop: true,

            callback: () => {

                let now = new Date();

                let hora = now.toLocaleTimeString();
                let fecha = now.toLocaleDateString();

                tiempoTexto.setText(fecha + "  " + hora);

            }
        });

        // ===== LINEAS CRT =====

        for(let i = 0; i < H; i += 4){

            this.add.rectangle(

                W / 2,
                i,

                W,
                1,

                0xffffff,
                0.08

            );
        }

        // ===== CARGA REAL =====

        this.load.image("fondo", "assets/fondo.PNG");
        this.load.image("cubo", "assets/cubo.PNG");
        this.load.image("spike", "assets/spike.PNG");
        this.load.image("suelo", "assets/suelo.PNG");
        this.load.image("fondo_inicio", "assets/fondete.PNG");
        this.load.image("cassette", "assets/cassette.png");

        for(let i = 0; i < 30; i++){

            this.load.image(
                "fake" + i,
                "assets/cubo.PNG"
            );
        }
    }

    create(){

    }
}
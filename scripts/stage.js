const genRandomFloat = (min, max) => (Math.random() * (max - min) + min);

class Stage {
    constructor() {
        // init PIXI app
        this.app = new PIXI.Application({
            width: 580,
            height: 400,
            backgroundColor: 0x1099bb,
            resolution: 1
        });
        const container = document.querySelector('.canvas-container');
        container.appendChild(this.app.view);

        // loading textures
        this.app.loader.add("doggy", "./assets/sprites/doggy.png");
        this.doneLoading = this.doneLoading.bind(this);
        this.app.loader.load(this.doneLoading);
    }

    doneLoading() {
        this.createSpriteSheet();
        //this.createSprite();
        this.gameLoop = this.gameLoop.bind(this);
        this.app.ticker.add(this.gameLoop);
    }

    createSpriteSheet() {
        this.spriteSheet = {};
        const ssheet = new PIXI.BaseTexture.from(this.app.loader.resources["doggy"].url,
            PIXI.SCALE_MODES.NEAREST);
        ssheet.scaleMode = PIXI.SCALE_MODES.NEAREST;
        const W = 25;
        const H = 19;
        const OFFSET = W * 5;
        for (let i = 0, offset = 0; i < 4; i++, offset += OFFSET) {
            this.spriteSheet[`sit-${i}`] = [
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset, 1, W, H))
            ];
            this.spriteSheet[`idle-${i}`] = [
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 1, 0, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 2, 0, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 3, 0, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 4, 0, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + 0, H, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W, H, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 2, H, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 3, H, W, H))
            ];
            this.spriteSheet[`run-${i}`] = [
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 4, H, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + 0, H * 2, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W, H * 2, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 2, H * 2, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 3, H * 2, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 4, H * 2, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + 0, H * 3, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W, H * 3, W, H))
            ];
            this.spriteSheet[`pee-${i}`] = [
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 2, H * 3, W, H))
            ];
            this.spriteSheet[`lay-${i}`] = [
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 3, H * 3, W, H))
            ];
            this.spriteSheet[`walk${i}`] = [
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 4, H * 3, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + 0, H * 4, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W, H * 4, W, H)),
                new PIXI.Texture(ssheet, new PIXI.Rectangle(offset + W * 2, H * 4, W, H)),
            ];
        }
    }

    createSprite(id) {
        const doggy = new PIXI.AnimatedSprite(this.spriteSheet[`idle-${id}`]);
        doggy.state = 'idle';
        // basic setting
        doggy.anchor.set(0.5);
        doggy.scale.set(4);
        doggy.animationSpeed = .2;
        doggy.x = genRandomFloat(50, this.app.view.width - 50);
        doggy.y = genRandomFloat(50, this.app.view.height - 50);
        // drag drop
        doggy.interactive = true;
        doggy.buttonMode = true;

        function onDragStart(event) {
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = event.data;
            this.dragging = true;
        }
        function onDragEnd() {
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        }

        function onDragMove() {
            if (this.dragging) {
                const newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
            }
        }
        doggy
            // events for drag start
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            // events for drag end
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            // events for drag move
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);
        this.app.stage.addChild(doggy);
        console.log(this.app.stage);
        doggy.play();
        return doggy;
    }

    removeSprite(sprite) {
        this.app.stage.removeChild(sprite);
    }

    gameLoop() { }

}
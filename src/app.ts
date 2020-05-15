import { init, Sprite, GameLoop } from 'kontra';
import ecs, { Entity, Selector } from 'js13k-ecs';
import { Note, Sequence } from 'tinymusic';

class PositionComponent {
    position: [number, number];
    constructor(startPosition: [number, number]) {
        this.position = startPosition;
    }
}

class MoveableComponent {
    speed: [number, number];
    constructor(initialSpeed: [number, number]) {
        this.speed = initialSpeed;
    }
}

class SpriteComponent {
    sprite: any;
    constructor() {
        this.sprite = Sprite({
            color: 'red',  // fill color of the sprite rectangle
            width: 20,     // width and height of the sprite rectangle
            height: 40,
        });
    }
}

class MoveSpritesSystem {
    selector: any;
    constructor(canvasWidth: number) {
        this.selector = ecs.select(PositionComponent, MoveableComponent, SpriteComponent);
        // Create sound when wrapping sprite
        let note = new Note('C4 s');
        this.seq_ = new Sequence(new AudioContext(), 240);
        this.seq_.push(note);
        this.seq_.loop = false;
        this.seq_.gain.gain.value = 0.1;

        this.canvasWidth_ = canvasWidth;

        this.updateEntity = this.updateEntity.bind(this);
    }

    public update(delta: number) {
        this.selector.iterate(this.updateEntity);
    }

    private updateEntity(entity: Entity) {
        let sprite = entity.get(SpriteComponent);
        let position = entity.get(PositionComponent);
        let moveable = entity.get(MoveableComponent);

        if (sprite === undefined || position === undefined || moveable === undefined)
            return;

        position.position[0] += moveable.speed[0];
        position.position[1] += moveable.speed[1];

        // wrap the sprites position when it reaches
        // the edge of the screen
        if (position.position[0] > this.canvasWidth_) {
            position.position[0] = -sprite.sprite.width;
            this.seq_.play();
        }

        sprite.sprite.x = position.position[0];
        sprite.sprite.y = position.position[1];
    }

    private seq_: Sequence;
    private canvasWidth_: number;
}

class Game
{
    constructor()
    {
        let { canvas } = init("content");

        ecs.register(PositionComponent, MoveableComponent, SpriteComponent);
        ecs.create().add(new PositionComponent([100, 80]), new MoveableComponent([2, 0]), new SpriteComponent());
        ecs.process(new MoveSpritesSystem(canvas.width));
        this.renderables_ = ecs.select(SpriteComponent);

        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this.gameLoop_ = GameLoop({
            update: this.update,
            render: this.render
        });

        this.lastUpdate_ = performance.now();
    }

    run()
    {
        this.lastUpdate_ = performance.now();
        this.gameLoop_.start();
    }

    private update()
    {
        const now = performance.now();
        ecs.update(now - this.lastUpdate_);
        this.lastUpdate_ = now;
    }

    private render() {
        this.renderables_.iterate(this.renderEntity);
    }

    private renderEntity(entity: Entity)
    {
        entity.get(SpriteComponent)!.sprite.render();
    }

    private lastUpdate_: number;
    private renderables_: Selector;
    private gameLoop_: any;
}

new Game().run();

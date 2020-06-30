function getClickPos(e) {
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    return { x, y };
}

function hex2Hex0x(hex) {
    return "0x" + hex.slice(1, hex.length);
}

function rgba2hex(orig) {
    let a,
        rgb = orig.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = ((rgb && rgb[4]) || "").trim(),
        hex = rgb
            ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
              (rgb[2] | (1 << 8)).toString(16).slice(1) +
              (rgb[3] | (1 << 8)).toString(16).slice(1)
            : orig;

    if (alpha !== "") {
        a = alpha;
    } else {
        a = 01;
    }
    // multiply before convert to HEX
    a = ((a * 255) | (1 << 8)).toString(16).slice(1);
    hex = hex + a;

    return hex.substring(0, 1) + "x" + hex.substring(index + 2);
}

const renderer = document.createElement("canvas");
renderer.width = 800;
renderer.height = 600;
const gl = renderer.getContext("webgl");
renderer.style.border = "1px solid red";
document.body.appendChild(renderer);

//Create a Pixi Application
let app = new PIXI.Application({
    width: renderer.width,
    height: renderer.height,
    antialias: true,
    transparent: true,
    resolution: 1,
    view: renderer,
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
const buffer = document.createElement("canvas");
buffer.width = 50;
buffer.height = 50;
const ctx = buffer.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 50, 50);

const base = new PIXI.BaseTexture.from(buffer);

//This `setup` function will run when the image has loaded

const frame = new PIXI.Rectangle(10, 10, 30, 40);
const trim = new PIXI.Rectangle(10, 10, 30, 40);
const texture = new PIXI.Texture(base, null, null, trim);
console.log(base);

const catImage = new Image();
catImage.src = "/images/cat.png";

const container1 = new PIXI.Container();

function drawImage(
    container,
    baseTex,
    srcX = undefined,
    srcY = undefined,
    srcWidth = undefined,
    srcHeight = undefined,
    dstX = undefined,
    dstY = undefined,
    dstWidth = undefined,
    dstHeight = undefined,
    rotDeg = undefined,
    rotPivotX = undefined,
    rotPivotY = undefined
) {
    if (srcX === undefined) {
        srcX = 0;
    }
    if (srcY === undefined) {
        srcY = 0;
    }
    if (dstX === undefined) {
        dstX = srcX;
        srcX = 0;
    }
    if (dstY === undefined) {
        dstY = srcY;
        srcY = 0;
    }
    if (srcWidth === undefined) {
        srcWidth = baseTex.width;
    }
    if (srcHeight === undefined) {
        srcHeight = baseTex.height;
    }
    if (dstWidth === undefined) {
        dstWidth = srcWidth;
        srcWidth = baseTex.width;
    }
    if (dstHeight === undefined) {
        dstHeight = srcHeight;
        srcHeight = baseTex.height;
    }
    if (rotDeg === undefined) {
        rotDeg = 0;
    }
    if (rotPivotX === undefined) {
        rotPivotX = 0;
    }
    if (rotPivotY === undefined) {
        rotPivotY = 0;
    }

    const trim = new PIXI.Rectangle(srcX, srcY, srcWidth, srcHeight);
    const texture = new PIXI.Texture(baseTex, trim);
    const sprite = new PIXI.Sprite(texture);

    sprite.x = dstX;
    sprite.y = dstY;
    sprite.width = dstWidth;
    sprite.height = dstHeight;

    if (rotPivotX === "center") {
        sprite.pivot.x = sprite.width / 2;
        sprite.pivot.y = sprite.height / 2;
        sprite.x += sprite.width / 2;
        sprite.y += sprite.height / 2;
    } else {
        sprite.pivot.x = rotPivotX;
        sprite.pivot.y = rotPivotY;
    }

    sprite.rotation = (rotDeg * Math.PI) / 180;

    container.addChild(sprite);
    console.log(app.stage);
}

renderer.addEventListener("mousemove", (evt) => {
    const { x, y } = getClickPos(evt);
    //drawImage(base, x, y, 50, 50);
});

class PixiDrawing {
    constructor() {
        this.container = null;
        this.baseTex = null;
        this.texture = null;
        this.sprite = null;
        this.spriteCoord = null;
    }

    on(container) {
        this.container = container;
        return this;
    }

    drawImage(
        baseTex,
        srcX = undefined,
        srcY = undefined,
        srcWidth = undefined,
        srcHeight = undefined,
        dstX = undefined,
        dstY = undefined,
        dstWidth = undefined,
        dstHeight = undefined,
        rotDeg = undefined,
        rotPivotX = undefined,
        rotPivotY = undefined
    ) {
        if (!this.container) {
            throw new Error("No container specified.");
        }
        if (srcX === undefined) {
            srcX = 0;
        }
        if (srcY === undefined) {
            srcY = 0;
        }
        if (dstX === undefined) {
            dstX = srcX;
            srcX = 0;
        }
        if (dstY === undefined) {
            dstY = srcY;
            srcY = 0;
        }
        if (srcWidth === undefined) {
            srcWidth = baseTex.width;
        }
        if (srcHeight === undefined) {
            srcHeight = baseTex.height;
        }
        if (dstWidth === undefined) {
            dstWidth = srcWidth;
            srcWidth = baseTex.width;
        }
        if (dstHeight === undefined) {
            dstHeight = srcHeight;
            srcHeight = baseTex.height;
        }
        if (rotDeg === undefined) {
            rotDeg = 0;
        }
        if (rotPivotX === undefined) {
            rotPivotX = 0;
        }
        if (rotPivotY === undefined) {
            rotPivotY = 0;
        }

        const trim = new PIXI.Rectangle(srcX, srcY, srcWidth, srcHeight);
        const texture = new PIXI.Texture(baseTex, trim);
        const sprite = new PIXI.Sprite(texture);

        sprite.x = dstX;
        sprite.y = dstY;
        sprite.width = dstWidth;
        sprite.height = dstHeight;

        if (rotDeg !== 0) {
            this.rotate(rotDeg, rotPivotX, rotPivotY);
        }

        this.baseTex = baseTex;
        this.texture = texture;
        this.sprite = sprite;
        this.spriteCoord = { x: dstX, y: dstY };

        return this;
    }

    drawRect(
        x,
        y,
        width = 50,
        height = 50,
        color = "#ff0000",
        empty = false,
        stroke = false,
        strokeColor = "#00ff00",
        strokeWidth = 4
    ) {
        if (typeof color === "string") {
            if (color[0] === "#") {
                color = hex2Hex0x(color);
            }
            if (color.includes("rgb")) {
                color = rgba2hex(color);
            }
        }
        if (typeof strokeColor === "string") {
            if (strokeColor[0] === "#") {
                strokeColor = hex2Hex0x(strokeColor);
            }
            if (strokeColor.includes("rgb")) {
                strokeColor = rgba2hex(strokeColor);
            }
        }
        const rectangle = new PIXI.Graphics();
        stroke && rectangle.lineStyle(8, strokeWidth, 1);
        !empty && rectangle.beginFill(color);
        rectangle.drawRect(0, 0, width, height);
        !empty && rectangle.endFill();
        const texture = app.renderer.generateTexture(rectangle);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = x;
        this.sprite.y = y;
        return this;
    }

    rotate(deg, pivotX = undefined, pivotY = undefined) {
        if (!this.sprite) {
            throw new Error("No sprites specified.");
        }

        if (deg === undefined) {
            deg = 0;
        }
        if (pivotX === undefined) {
            pivotX = 0;
        }
        if (pivotY === undefined) {
            pivotY = 0;
        }

        if (pivotX === "center") {
            this.sprite.anchor.x = 0.5; // doesnt work with pivot and this.sprite.width / 2 ...
            this.sprite.anchor.y = 0.5;
            this.sprite.x += this.sprite.width / 2;
            this.sprite.y += this.sprite.height / 2;
        } else {
            this.sprite.anchor.x = pivotX / this.sprite.width;
            this.sprite.anchor.y = pivotY / this.sprite.height;
        }
        this.sprite.rotation = (deg * Math.PI) / 180;

        return this;
    }

    move(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
        return this;
    }

    clip(x, y, width, height) {
        const trim = new PIXI.Rectangle(x, y, width, height);
        const texture = new PIXI.Texture(this.baseTex, trim);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.spriteCoord.x;
        this.sprite.y = this.spriteCoord.y;
        return this;
    }

    resize(width, height) {
        this.sprite.width = width;
        this.sprite.height = height;
        return this;
    }

    done() {
        this.container.addChild(this.sprite);
    }

    getSprite() {
        return this.sprite;
    }
}

const pixiDrawing = new PixiDrawing();

catImage.addEventListener("load", () => {
    const catBase = new PIXI.BaseTexture.from(catImage);
    /*drawImage(container1, catBase, 0, 0, catBase.width, catBase.height, 10, 10, catBase.width, catBase.height, 60, "center");
    app.stage.addChild(container1);*/
    pixiDrawing
        .on(container1)
        .drawImage(catBase)
        .clip(10, 0, 30, 50)
        .resize(100, 90)
        .move(100, 100)
        .rotate(55, "center")
        .done();
    pixiDrawing.on(container1).drawRect(300, 250, 500).done();
    app.stage.addChild(container1);
});

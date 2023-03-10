"use strict";
class Item {
    constructor(x, y, width, heigth) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigth = heigth;
        this.speed = 16;
    }
    draw() {
        if (ctx) {
            const drawimage = new Image();
            drawimage.src = "https://store-images.s-microsoft.com/image/apps.64975.13564424126320075.f39b613e-67f4-4c85-8d4f-ad9a47ecfa42.8390d401-ed7c-4be6-879c-4b27f89a7d44?mode=scale&q=90&h=200&w=200&background=%230078D7";
            ctx.drawImage(drawimage, this.x, this.y, this.width, this.heigth);
        }
    }
    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.reset();
        }
    }
    CheckCollison(bird) {
        return (bird.x < this.x + this.width &&
            bird.x + 50 > this.x &&
            bird.y < this.y + this.heigth &&
            bird.y + 50 > this.y);
    }
    reset() {
        this.x = width + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (height - this.heigth));
    }
}

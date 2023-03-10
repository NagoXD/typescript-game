
const canvas = document.querySelector("#game") as HTMLCanvasElement;
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext("2d");


class Bird {
    x:number;
    y:number;
    velocity:number;
    gravity:number;

    laserX: number;
    laserY:number;
    laserSpeed:number;
    shootingLaser: boolean;


    constructor(x:number,y:number) {
        this.x = x;
        this.y = y;
        this.velocity = 0;
        this.gravity = 0.5;

        this.laserX = this.x + 50;
        this.laserY = this.y + 20;
        this.laserSpeed = 20;
        this.shootingLaser = false
    }

    draw(){
        if(ctx){
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, 50, 50)
        }
    }

    fly(){
        this.velocity = -10;
    }
     
    update(){
        this.velocity += this.gravity;
        this.y += this.velocity;
    
       if(this.y < 0){
        this.y = 0; 
        this.velocity = 0;
       } else if(this.y > height - 50){
        this.y = height - 50;
        this.velocity = 0;
       }
    }
    

    shootLaser(){
        this.shootingLaser = true
        this.laserX = this.x + 50;
        this.laserY = this.y + 20;
    }
    
    drawLaser(){
        if(this.shootingLaser && ctx){
            ctx.fillStyle = "green";
            ctx.fillRect(this.laserX, this.laserY, 50, 5);
        }
    } 

    updateLaser(){
        if(this.shootingLaser){
            this.laserX += this.laserSpeed;
        }
        
        [item1, item2, item3 ].forEach((item) => {
            if(item.checklaser(this.laserX, this.laserY)) {
                item.reset()
                this.shootingLaser = false;
                score += 100;
            }
        })
    }


 }

class Item {
   x:number;
   y:number;
   width:number;
   height:number;
   speed:number;

   constructor(x:number, y:number, width:number, height:number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = 15
   }

    draw(){
        if(ctx){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    
    update(){
        this.x -= this.speed;
        if(this.x + this.width < 0){
            this.reset();
        }
    }

    reset(){
        this.x =  width + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (height - this.height))
    }


    checkitem(bird: Bird){
     return(

        bird.x < this.x + this.width &&
        bird.x + 50 > this.x &&
        bird.y < this.y + this.height &&
        bird.y + 50 > this.y
         
        )};

    checklaser(laserX:number, laserY:number){
        return(

            laserX < this.x + this.width &&
            laserX + 50 > this.x &&
            laserY < this.y + this.height &&
            laserY + 50 > this.y
 )}
     
}


let randomX = Math.floor(Math.random() * (width - 100));
let randomY = Math.floor(Math.random() * (height - 100))

let bird = new Bird(50, height /2)
let item1 = new Item(randomX, randomY /5, 100, 100)
let item2 = new Item(randomX, randomY /5, 100, 100)
let item3 = new Item(randomX, randomY /5, 100, 100)


let score = 0;
let bestscore = localStorage.getItem("Bestscore") || 0
function draw(){
  
    if(ctx){
        ctx.clearRect(0, 0, width ,height)
    }


    bird.draw();
    bird.update();
    bird.drawLaser();
    bird.updateLaser();

    item1.draw();
    item1.update(); 

    item2.draw();
    item2.update(); 
   
    item3.draw();
    item3.update();
    
    
    score += 1;
      if(score > bestscore){
        bestscore = score;
        localStorage.setItem("Bestscore", bestscore.toString());
      }
     if(ctx){
        ctx.font = "30px Arial";
        ctx.fillText("Score : "+ score + " || Best score : " + bestscore , 1000, 50)
     }

     if(ctx){
        ctx.font = "24px Arial";
        ctx.fillText(`Press "C" to Attack || Space for jump`, 40, 60)
     }
    
    document.addEventListener("keydown", (e)=> {
        if(e.code === "Space"){
            bird.fly();
        } else if(e.code === "KeyC"){
            bird.shootLaser();
        }
    })
    
    if(item1.checkitem(bird)){
        gameOver();
        return;
    } else if(item2.checkitem(bird)){
        gameOver();
        return;
    } else if (item3.checkitem(bird)){
        gameOver();
        return;
    }
    
    
    function gameOver(){
        alert("Game over")
        location.reload()
    }
    
    requestAnimationFrame(draw);
}

draw()


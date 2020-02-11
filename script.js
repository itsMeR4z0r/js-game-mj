var canvas, ctx, SIZE, frames = 0,

floor = {
    y: 0,
    height: 0,
    color: "#000",
    draw: function (){
        ctx.fillStyle = this.color;
        ctx.fillRect(0,this.y,SIZE,this.height);
    }
},

player = {
    
    x:0,
    y:0,
    width:0,
    height:0,
    color: "#ff4e4e",
    
    gravity: 1.5,
    speed: 0,
    jumpForce: 15,
    maxJumps: 2,
    countJumps:0,

    update: function (){
        this.speed += this.gravity;
        this.y += this.speed;  
        if(this.y  > floor.y - this.height){
            this.y = floor.y - this.height;
            this.countJumps = 0;
        }
    },
    jump: function(){
        if(this.countJumps < this.maxJumps){
            this.speed = -this.jumpForce;        
            this.countJumps++;
        }
    },
    draw: function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
};

function click(){
    player.jump();
}

function scaleSize(porcent){
    return parseInt((SIZE*porcent)/100);
}

function calcVars(){
    floor.height = scaleSize(8);
    floor.y = scaleSize(92);
    player.width = scaleSize(8);
    player.height = scaleSize(8);
    player.x = scaleSize(8);
}

function main(){
    SIZE = window.innerWidth;
    if (SIZE >= 500){
        SIZE = 600;
    }

    calcVars();
    
    canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown",click);

    run();
}

function run(){
    update();
    draw();
    window.requestAnimationFrame(run);
}

function update(){
    frames++;
    player.update();

}

function draw(){
    ctx.fillStyle = "#50BEFF";
    ctx.fillRect(0,0,SIZE,SIZE);
    floor.draw();
    player.draw();
}

main();
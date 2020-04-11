let canvas, ctx, SIZE, frames = 0,speed = 6,

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
    jumpForce: 20,
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
},

obstacles = {
    _obs:[],
    colors:["#ffbc1c","#ff1c1c","#ff85e1","#52a7ff","#78ff5d"],
    insertTime: 0,

    insert: function(){
        this._obs.push({
            x:canvas.width,
            width: 30 + Math.floor(20 * Math.random()),
            height: 30 + Math.floor(120 * Math.random()),
            color: this.colors[Math.floor(this.colors.length * Math.random())]
        });
        this.insertTime = 30;
    },
    update: function(){
        if (this.insertTime === 0){
            this.insert();
        }else{
            this.insertTime --;
        }
        for(let i = 0, size = this._obs.length; i < size; i++){
            let obs = this._obs[i];

            obs.x -= speed;

            if (obs.x <= -obs.width){
                this._obs.splice(i,1);
                size --;
                i --;
            }
        }
    },
    draw: function(){
        for(let i = 0, size = this._obs.length; i < size; i++){
            let obs = this._obs[i];
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x,floor.y - obs.height,obs.width,obs.height);
        }
    }
};

function click(){
    player.jump();
}

function scaleSize(porcent){
    return parseInt((SIZE * porcent) / 100);
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
    obstacles.update();
    player.update();

}

function draw(){
    ctx.fillStyle = "#50BEFF";
    ctx.fillRect(0,0,SIZE,SIZE);
    floor.draw();
    obstacles.draw();
    player.draw();
}

main();
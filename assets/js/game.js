var myGamePiece;
var myObstacles;
var myScore;
var myBackground;
var mySound;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(40, 40, "assets/images/game_bird.gif", 10, 120, "image");
    myObstacles = [];
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myBackground = new component(656, 270, "assets/images/canvas_bg.png", 0, 0, "background");
    mySound = new sound("https://www.w3schools.com/graphics/bounce.mp3");
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.getElementById("gameArea").insertBefore(this.canvas, document.getElementById("gameArea").childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e){
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e){
            myGameArea.key = false;
        })
    },

    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop : function(){
        clearInterval(this.interval);
    }
}

function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function everyinterval(n){
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function component(width, height, color, x, y, type){
    this.type = type;
    if (type == "image" || type == "background"){
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.bounce = 0.4;
    this.update = function(){
        ctx = myGameArea.context;
        if (type == "image" || type == "background"){
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
                if (type == "background"){
                    ctx.drawImage(this.image, 
                        this.x + this.width, 
                        this.y, 
                        this.width, 
                        this.height);
                }
        } else if (this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background"){
            if (this.x == -(this.width)){
                this.x = 0;
            }
        } else if (this.type == "image"){
            this.gravitySpeed += this.gravity;
            this.y += this.speedY + this.gravitySpeed;
            this.hitBottom();
        }
    }

    this.hitBottom = function(){
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom){
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
    
    this.crashWith = function(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)){
            crash = false;
        }
        return crash;
    }
}

function updateGameArea(){
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1){
        if (myGamePiece.crashWith(myObstacles[i])){
            mySound.play();
            myGameArea.stop();
            showRestart();
            hideHint();
            return;
        }
    }
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(200)){
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 80;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(20, height, "green", x, 0));
        myObstacles.push(new component(20, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    accelerate(0.05)
    if (myGameArea.key && myGameArea.key == 32){accelerate(-0.1)}
    myGamePiece.newPos();
    myGamePiece.update();
}

function accelerate(n){
    myGamePiece.gravity = n;
}

function restartGame(){
    myGameArea.stop();
    myGameArea.clear();
    startGame();
}

function hideStart(){
    document.getElementById("startbtn").style.display = "none";
}

function showRestart(){
    document.getElementById("restartbtn").style.display = "block";
}

function hideRestart(){
    document.getElementById("restartbtn").style.display = "none";
}

function showHint(){
    document.getElementById("hint").style.display = "block";
}

function hideHint(){
    if (document.getElementById("restartbtn").style.display == "block"){
        document.getElementById("hint").style.display = "none";
    }
}
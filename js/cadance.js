var _c, _x, _b, resizeTimer;
var hearts = [];
var heart = {img:null, size:100, chance:0.05, speed:4};
var timer = 0;

function init(){
    _c = document.getElementById("cadance");
    _b = document.querySelector("body");
    _x = _c.getContext('2d');

    heart.img = new Image();
    heart.img.src = "res/heart-sharp.svg";

    resetSize(); resetHearts();
    window.addEventListener("resize",function(e){
        resetHearts();
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resetSize,250);
    });

    draw();
}

function resetHearts(){
    hearts = [];
}

function resetSize(){
    _c.width = window.innerWidth;
    _c.height = window.innerHeight;
    _b.width = window.innerWidth;
    _b.height = window.innerHeight;
}

function draw(){
    _x.clearRect(0,0,_c.width,_c.height);

    if(Math.random() < heart.chance){
        hearts.push({
            x:Math.floor(_c.width * Math.random()),
            y:_c.height+heart.size,
            dY:1+Math.floor(heart.speed * Math.random() * 10)/10,
            size:20+Math.floor((heart.size-20) * Math.random()),
            timeOffset:2 * Math.PI * Math.random()
        });
    }

    for(var j = 0; j < hearts.length; j++){
        var _h = hearts[j];

        var alpha = 0.5 + 0.4 * Math.sin((timer + _h.timeOffset*30)/30);
        var size = _h.size + _h.size*0.2 * Math.sin((timer + _h.timeOffset*30)/30);

        _x.globalAlpha = alpha;
        
        _x.drawImage(heart.img,_h.x - size/2,_h.y - size/2,size,size);

        _h.y -= _h.dY;

        if(_h.y < -heart.size){
            hearts.splice(j,1);
        }
    }

    timer++;

    window.requestAnimationFrame(draw);
}

window.onload = init;
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

// RGBA8888
var pixelSize = 4;
var height = 800;
var width = 800;

var assetNames = ['turtle', 'background'];
var assets = {};

var globalState = {};
var globalTick = 0;

function rand(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// var pendingLoads = assetNames.length;

// function showLoadProgress() {
//     ctx.fillStyle = "yellow";
//     ctx.font = "14px Helvetica";
//     ctx.fillText("Loading "+pendingLoads+" of "+assetNames.length+" ...", 200, height/2);
// }

// function checkLoadComplete() {
//     // console.log("pending:", pendingLoads);
//     if (pendingLoads == 0) {
//         setupEvents();
//         canvas.focus();
//         ctx.drawImage(assets.background, 0, 0);
//         globalState.clean = ctx.getImageData(0, 0, width, height);
//         ctx.fillStyle = "yellow";
//         ctx.font = "48px Helvetica";
//         ctx.fillText("Press ENTER ...", 200, height/2);
//     } else {
//         showLoadProgress();
//     }
// }

// showLoadProgress();
// assetNames.forEach(function(assetName) {
//     var i = new Image();
//     console.log("loading asset", assetName);
//     i.onload = function() { pendingLoads--; checkLoadComplete(); }
//     i.src = assetName + ".png";
//     assets[assetName] = i;
// }, this);

// function setupEvents() {
//     canvas.onkeydown = function(event) {
//         console.log("keydown", event);
//         //drawImage(assets.background, 0, 0);
//         ctx.putImageData(globalState.clean, 0, 0);
//     };
// }

var x = 150;
var y = 150;
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.arcTo(x, y, x-20, y+20, 20);
// ctx.stroke();

var gradientR = ctx.createLinearGradient(0,0,0,y);
gradientR.addColorStop(0, "hsla(0, 100%, 50%, 0.0)");
gradientR.addColorStop(1, 'hsla(0, 100%, 50%, 0.4)');

var gradientY = ctx.createLinearGradient(0,0,0,y);
gradientY.addColorStop(0, "hsla(0, 100%, 50%, 1)");
gradientY.addColorStop(1, 'hsla(51, 100%, 50%, 0.5)');


function draw(){
    globalTick++;
    var w = 14;
    if (globalTick % 16 == 0) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'hsla(0, 0%, 0%, .3)';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.arc(x, y, 22, 0, Math.PI, false);
        ctx.lineTo(x + rand(-w, w), y-44);
        ctx.lineTo(x+22, y);
        ctx.fillStyle = gradientR;
        ctx.fill();
        ctx.stroke();


        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.arc(x, y, 20, 0, Math.PI, false);
        ctx.lineTo(x + rand(-w, w), y-40);
        ctx.lineTo(x+20, y);
        ctx.fillStyle = gradientY;
        ctx.fill();
        ctx.stroke();
    }
    window.requestAnimationFrame(draw);
}

draw();
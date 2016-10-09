var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

// RGBA8888
var pixelSize = 4;
var height = 800;
var width = 800;

var assetNames = ['turtle', 'background'];
var assets = {};

var globalState = {};

var pendingLoads = assetNames.length;

function showLoadProgress() {
    ctx.fillStyle = "yellow";
    ctx.font = "14px Helvetica";
    ctx.fillText("Loading "+pendingLoads+" of "+assetNames.length+" ...", 200, height/2);
}

function checkLoadComplete() {
    // console.log("pending:", pendingLoads);
    if (pendingLoads == 0) {
        setupEvents();
        canvas.focus();
        ctx.drawImage(assets.background, 0, 0);
        globalState.clean = ctx.getImageData(0, 0, width, height);
        ctx.fillStyle = "yellow";
        ctx.font = "48px Helvetica";
        ctx.fillText("Press ENTER ...", 200, height/2);
    } else {
        showLoadProgress();
    }
}

showLoadProgress();
assetNames.forEach(function(assetName) {
    var i = new Image();
    console.log("loading asset", assetName);
    i.onload = function() { pendingLoads--; checkLoadComplete(); }
    i.src = assetName + ".png";
    assets[assetName] = i;
}, this);

function setupEvents() {
    canvas.onkeydown = function(event) {
        console.log("keydown", event);
        //drawImage(assets.background, 0, 0);
        ctx.putImageData(globalState.clean, 0, 0);
    };
}

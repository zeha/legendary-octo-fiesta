'use strict';

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
        globalState.level = "splash";
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

function doKeydown(event) {
    console.log("keydown", event);
    // block other input while doing a move.
    if (globalState.move) {
        return;
    }
    if (globalState.level == "splash") {
        if (event.keyCode == 13) {
            setupLevel0();
        }
    }
    if (globalState.level == "level0") {
        switch (event.key) {
            case 'a':
                globalState.playerX -= globalState.movementSpeed;
                if (globalState.playerX < 0) {
                    globalState.playerX = width;
                }
                globalState.playerDirectionForward = false;
                break;
            case 'd':
                globalState.playerX += globalState.movementSpeed;
                if (globalState.playerX > width) {
                    globalState.playerX = 0;
                }
                globalState.playerDirectionForward = true;
                break;
            case ' ':
            case 'w':
                globalState.moveTick = 0;
                globalState.move = 'jump';
                break;
        }
    }
}

function setupEvents() {
    canvas.onkeydown = doKeydown;
}

function setupLevel0() {
    globalState.movementSpeed = 8;
    globalState.level = "level0";
    globalState.playerX = 10;
    globalState.playerDirectionForward = true;
}

function draw(){
    globalTick++;
    var dbg = "l:"+globalState.level + " t:"+globalTick + " m:"+globalState.move;

    var playerOffsetY = 0;

    if (globalState.move == 'jump') {
        ++globalState.moveTick;
        var moveDuration = 10;
        var perTickMove = 4;
        playerOffsetY = perTickMove * globalState.moveTick;
        if (globalState.moveTick > moveDuration) {
            // second half of anim is to go back down
            playerOffsetY = perTickMove * (2*moveDuration - globalState.moveTick);
        }
        if (playerOffsetY == 0) {
            // done!
            globalState.move = null;
        }
    }

    switch (globalState.level) {
        case "splash":
            var alpha = (globalTick % 200)/100;
            if (alpha > 1) { alpha = 2 - alpha; }
            alpha = Math.exp(alpha-1);

            ctx.putImageData(globalState.clean, 0, 0);

            ctx.fillStyle = "rgba(255, 255, 0, "+alpha+")";
            ctx.font = "48px Helvetica";
            ctx.fillText("Press ENTER ...", 200, height/2);

            dbg += " alpha:"+alpha;
            break;
        case "level0":
            ctx.putImageData(globalState.clean, 0, 0);
            ctx.save();
            ctx.translate(globalState.playerX, 670 - playerOffsetY);
            if (!globalState.playerDirectionForward) {
                ctx.translate(assets.turtle.width, 0);
                ctx.scale(-1, 1);
            }
            ctx.drawImage(assets.turtle, 0, 0);
            ctx.restore();
            dbg += " playerOffsetY: " + playerOffsetY;
            break;
    }

    ctx.font = "14px Helvetica";
    ctx.fillStyle = "red";
    ctx.fillText(dbg, 10, 10);

    window.requestAnimationFrame(draw);
}

draw();
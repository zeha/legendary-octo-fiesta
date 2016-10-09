var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

// RGBA8888
var size = 4;
var height = 200;
var width = 200;
var imageData = ctx.getImageData(0, 0, width, height);

var x;
var y;
for(x=0; x<200; x++) {
    //for (y=0; y<30; y++) {
        imageData.data[(y*width*size) + (x*size) + 0] = 0xff;
        imageData.data[(y*width*size) + (x*size) + 1] = 0x8f;
        imageData.data[(y*width*size) + (x*size) + 2] = 0x00;
        imageData.data[(y*width*size) + (x*size) + 3] = 0xff;
    //}
    y=x;
}
ctx.putImageData(imageData, 0, 0);

console.log(imageData);


ctx.strokeStyle = 'rgb(170,170,0)';
ctx.beginPath();
ctx.arc(200, 200, 40, 0, 360, false);
ctx.stroke();

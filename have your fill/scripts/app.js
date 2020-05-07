
var context = function(handler) {
  return canvas.getContext("2d")

  canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
  }, false);
  canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
  }, false);
}
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousedown = false;
var tooltype = 'draw';



$(canvas).on('mousedown', function(e) {
  last_mousex = mousex = parseInt(e.clientX-canvasx);
  last_mousey = mousey = parseInt(e.clientY-canvasy);
  console.log(last_mousex, last_mousey)
  mousedown = true;
});

//Mouseup
$(canvas).on('mouseup', function(e) {
  mousedown = false;
});

$(canvas).on('mousemove', function(e) {
  mousex = parseInt(e.clientX-canvasx);
  mousey = parseInt(e.clientY-canvasy);
  if(mousedown) {
      ctx.beginPath();
      if(tooltype=='draw') {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 3;
      } else {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineWidth = 10;
      }
      ctx.moveTo(last_mousex,last_mousey);
      ctx.lineTo(mousex,mousey);
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.stroke();
  }
  last_mousex = mousex;
  last_mousey = mousey;
});

var toolkit = function(tool) {
  tooltype = tool; //update
}

$(document).ready(function() {

})
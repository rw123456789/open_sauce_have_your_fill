
var setupCanvas = function (canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  return ctx;
}

var canvas = document.getElementById('canvas')
var ctx = setupCanvas(canvas)
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousedown = false;
var tooltype = 'draw';

$(canvas).on('mousedown', function(e) {
  last_mousex = mousex = parseInt(e.clientX-canvasx);
  last_mousey = mousey = parseInt(e.clientY-canvasy);
  mousedown = true;
});

$('#bt-save').on('click', function () {
  toolkit({ tool: 'save' })
})

$('#bt-clear').on('click', function () {
  toolkit({ tool: 'erase' })
})

$('#bt-clear-all').on('click', function () {
  var message = confirm("Are you sure?");
  if (message) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    toolkit({
      tool: 'draw',
      color: 'black',
      lineWidth: 2
    })
  }
})

$('#link-download').on('click', function () {
  $(this).attr('href', canvas.toDataURL())
  $(this).attr('download', 'mypainting.png')
})

$(".bt-color").on('click', function (e) {
  var rel = $(this).attr('rel')
  toolkit({
    tool: 'draw',
    color: rel
  })
})

$(".bt-lineWidth").on('click', function (e) {
  var rel = $(this).attr('rel')
  toolkit({
    tool: 'draw',
    lineWidth: rel
  })
})

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

var toolkit = function({ tool, color, lineWidth } = { tool: 'draw', color: 'black', lineHeight: 2}) {
  tooltype = tool; //update
  console.log('picking: ', color)
  if (color) {
    ctx.strokeStyle = color;
  }
  if (lineWidth) {
    ctx.lineWidth = lineWidth;
  }
}

$(document).ready(function() {

})
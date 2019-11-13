//Constants to represent the color picker, canvas, and draw mode indicator
const COLOR_PICKER = document.getElementById("colorPicker");
const PIXEL_CANVAS = document.getElementById("pixelCanvas");
const DRAW_INDICATOR = document.getElementById("drawIndicator");

//Variables used to represent the current color and if the user is in draw mode
let currentColor = COLOR_PICKER.value;
let drawMode = false;

// Called when sumbit is pressed, gets size of grid and creates the cells with listeners
function makeGrid(){
  let gridHeight = document.getElementById("inputHeight").value;
  let gridWidth = document.getElementById("inputWidth").value;
  console.log(gridHeight);
  console.log(gridWidth);

  let container = document.createElement('div');
  container.id = "grid";
  for(let row = 0; row < gridHeight; row++){
    let pixelRow = document.createElement('tr');

    //Listener to handle mouseovers and color cell only if the user is in 'draw mode'(Doesn't handle one-time single cell coloring)
    pixelRow.addEventListener('mouseover', function(event){
      if(event.target.nodeName === 'TD'){
        if(drawMode === true){
            event.target.setAttribute('style', 'background-color: ' + currentColor + ';');
        }
      }
    });

    //Create and add each cell to the row and add each row to the div
    for(let col = 0; col < gridWidth; col++){
      let pixelCol = document.createElement('td');
      pixelRow.appendChild(pixelCol);
    }
    container.appendChild(pixelRow);
  }

  //If table already exist, remove and add new table
  if(PIXEL_CANVAS.contains(document.getElementById("grid"))){
    PIXEL_CANVAS.removeChild(document.getElementById("grid"));
  }
  PIXEL_CANVAS.appendChild(container);
}

//Listener to handle only clicks on the canvas and updates, box color, and drawing indicator
PIXEL_CANVAS.addEventListener('click', function(event){
  drawMode = !drawMode;
  if(event.target.nodeName === 'TD'){
    if(drawMode === true){
        event.target.setAttribute('style', 'background-color: ' + currentColor + ';');
    }
  }
  drawMode ? DRAW_INDICATOR.textContent = 'ON' : DRAW_INDICATOR.textContent = 'OFF';

});

//Listener to handle submit event and call makeGrid()
document.addEventListener("submit", function(event){
  makeGrid();
  event.preventDefault();
});

//Listener to handle color input and update the currentColor
COLOR_PICKER.addEventListener("input", function(event){
  currentColor = COLOR_PICKER.value;
});

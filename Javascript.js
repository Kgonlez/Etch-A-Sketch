const grid = document.getElementById("grid");
const sizeSlider = document.getElementById("sizeSlider");
const hiddenColorPicker = document.getElementById("hiddenColorPicker");
const colorwheelDiv = document.getElementById("colorwheelDiv");
const colorPickerOverlay = document.getElementById("colorPickerOverlay");
const colorModeButton = document.getElementById("colorMode");
const rainbowModeButton = document.getElementById("rainbowMode");
const eraserButton = document.getElementById("eraser");
const resetButton = document.getElementById("reset");

let isDrawing = false;
let isErasing = false;
let gridSize = sizeSlider.value;

//Creating grid size based upon user input(slider)
function createGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    grid.appendChild(cell);
  }
}

createGrid(gridSize);

// Add event listeners for drawing
grid.addEventListener("mousedown", () => {
  isDrawing = true;
  isErasing = eraserButton.classList.contains("active");
  document.body.classList.add("drawing-mode");
});

grid.addEventListener("mouseup", () => {
  isDrawing = false;
  isErasing = false;
  document.body.classList.remove("drawing-mode");
});

grid.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("grid-cell")) {
    if (isErasing) {
      handleCellErasing(e);
    } else {
      handleCellDrawing(e);
    }
  }
});

grid.addEventListener("mouseleave", () => {
  isDrawing = false;
});

document.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    e.preventDefault();
  }
});

//Event listeners to buttons and grid cells
colorModeButton.addEventListener("click", () => {
  switchToColorMode();
  currentColor = hiddenColorPicker.value;
});

rainbowModeButton.addEventListener("click", () => {
  grid.classList.add("rainbow-mode");
  isErasing = false;
  eraserButton.classList.remove("active");
  currentColor = null;
});

eraserButton.addEventListener("click", () => {
  isErasing = !isErasing;
  eraserButton.classList.toggle("active", isErasing);
});

resetButton.addEventListener("click", () => {
  createGrid(gridSize);
});

sizeSlider.addEventListener("input", () => {
  gridSize = sizeSlider.value;
  document.getElementById(
    "sizeValue"
  ).textContent = `${gridSize} x ${gridSize}`;
  createGrid(gridSize);
});

colorPickerOverlay.addEventListener("click", () => {
  hiddenColorPicker.click();
});

hiddenColorPicker.addEventListener("input", () => {
  const selectedColor = hiddenColorPicker.value;
  colorPickerOverlay.style.backgroundColor = selectedColor;
  if (!rainbowModeButton.classList.contains("active")) {
    currentColor = selectedColor;
  }
});

function handleCellDrawing(e) {
  if (isDrawing) {
    const color = grid.classList.contains("rainbow-mode")
      ? `hsl(${Math.random() * 360}, 100%, 50%)`
      : currentColor;

    e.target.style.backgroundColor = color;
    e.target.classList.add("colored");
  }
}

function handleCellErasing(e) {
  if (isDrawing && isErasing) {
    const cell = e.target;
    cell.style.backgroundColor = "";
    cell.classList.remove("colored");
  }
}

function switchToColorMode() {
  grid.classList.remove("rainbow-mode");
  isErasing = false;
  eraserButton.classList.remove("active");
}

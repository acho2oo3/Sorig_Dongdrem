function dragStart(event) {
  event.dataTransfer.setData("text", event.target.classList[1]); // Store the color of the dragged circle
}
const branches = document.querySelectorAll(".branch");
function dragOver(event) {
  event.preventDefault(); // Allow drop
}
function drop(event, Limit) {
  event.preventDefault();
  const color = event.dataTransfer.getData("text"); // Get the color of the dragged circle
  const branch = event.target;

  const newCircle = document.createElement("div");
  newCircle.classList.add("circle", color);

  // Insert the new circle before the first child of the branch (i.e., at the very end)
  branch.insertBefore(newCircle, branch.firstChild);
}
// Function to add circles to a given branch
function addCircles(branch) {
  const newCircle = document.createElement("div");
  newCircle.classList.add("circle");
  branch.appendChild(newCircle);

  // Adjust the CSS position of the circles to stack on top of each other
  const circles = branch.querySelectorAll(".circle");
  let totalCircles = circles.length;
  circles.forEach((circle, index) => {
    circle.style.position = "absolute";
    //   circle.style.bottom = `${index * 25}px`; // Adjust the spacing as needed
  });

  // Add event listener to the branch to handle clicks on circles
  branch.addEventListener("click", (event) => {
    if (event.target.classList.contains("circle")) {
      console.log("Circle clicked!"); // For debugging
      event.target.parentNode.removeChild(event.target); // Remove the clicked circle
    }
  });
}

const circles = document.querySelectorAll(".circle");
const three = document.querySelectorAll(".three");

circles.forEach((circle) => {
  circle.addEventListener("dragstart", dragStart);
});

branches.forEach((branch) => {
  branch.addEventListener("dragover", dragOver);
  branch.addEventListener("drop", (event) => drop(event, Infinity));

  addCircles(branch);
});

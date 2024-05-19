// Add an event listener to the submit button
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleSubmit);
// Function to handle the submit button click

// Function to handle the submit button click
function handleSubmit() {
  const trees = document.querySelectorAll(".tree");

  trees.forEach((tree, treeIndex) => {
    const branches = tree.querySelectorAll(".branch");

    branches.forEach((branch, branchIndex) => {
      const circles = branch.querySelectorAll(".circle");
      const branchColors = [];

      circles.forEach((circle) => {
        if (circle.classList.length > 1) {
          // Check if the circle has a color class
          branchColors.push(circle.classList[1]); // Push the color to the array
        }
      });

      if (branchColors.length > 0) {
        // Check if there are any colors to log
        console.log(
          `Tree ${treeIndex + 1}, Branch ${branchIndex + 1} Colors:`,
          branchColors
        );
      }

      // Check the order of colors for the current branch
      const orderCheckResult = checkOrder(branchColors, treeIndex, branchIndex);
      if (orderCheckResult.correct) {
        console.log(
          `Order for Tree ${treeIndex + 1}, Branch ${
            branchIndex + 1
          } is correct.`
        );
        showSweetAlert();
      } else {
        console.log(
          `Order for Tree ${orderCheckResult.treeIndex}, Branch ${orderCheckResult.branchIndex} is incorrect. The color "${orderCheckResult.wrongColor}" was expected instead of "${orderCheckResult.expectedColor}".`
        );
        wrongColor();
      }
    });
  });
}

// Function to check the order of colors for a given branch
function checkOrder(branchColors, treeIndex, branchIndex) {
  // Define the expected order of colors for each branch
  const expectedOrders = [
    ["grey", "orange", "black"], // For the first branch
    ["grey", "orange", "black"],
    ["grey"],
    ["orange"],
    ["black"],
    [
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ],
    ["orange", "orange", "orange", "orange", "orange", "orange", "orange"],
    [
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
    ], // For the second branch
    // Add more expected orders for additional branches if needed
  ];

  // Iterate over the expected orders and compare with the actual colors
  for (let i = 0; i < expectedOrders.length; i++) {
    const expectedOrder = expectedOrders[i];
    if (branchColors.length === expectedOrder.length) {
      let orderMatch = true;
      for (let j = 0; j < expectedOrder.length; j++) {
        if (branchColors[j] !== expectedOrder[j]) {
          orderMatch = false;
          break;
        }
      }
      if (orderMatch) {
        return { correct: true }; // Return true if the order matches
      }
    }
  }

  // If the order is incorrect, find the first color that doesn't match
  for (let i = 0; i < branchColors.length; i++) {
    if (branchColors[i] !== expectedOrders[branchIndex][i]) {
      return {
        correct: false,
        wrongColor: branchColors[i],
        expectedColor: expectedOrders[branchIndex][i],
        treeIndex: treeIndex + 1,
        branchIndex: branchIndex + 1,
      };
    }
  }

  // If no incorrect order is found, return false
  return { correct: false };
}
function showSweetAlert() {
  // Hide the default alert
  window.alert = function () {};

  // Use SweetAlert to display an alert
  Swal.fire({
    title: "CORRECT",
    text: "WOW",
    icon: "success",
    confirmButtonText: "OK",
  });
}
function wrongColor() {
  // Hide the default alert
  window.alert = function () {};

  // Use SweetAlert to display an alert
  Swal.fire({
    title: "INCORRECT!",
    text: "RETRY",
    icon: "error",
    confirmButtonText: "OK",
  });
}

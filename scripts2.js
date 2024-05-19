// Add an event listener to the submit button
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleSubmit);

// Function to handle the submit button click
function handleSubmit() {
  const trees = document.querySelectorAll(".tree");
  let incorrectBranches = [];
  let correctBranches = [];

  trees.forEach((tree, treeIndex) => {
    const branches = tree.querySelectorAll(".branch");

    branches.forEach((branch, branchIndex) => {
      const circles = branch.querySelectorAll(".circle");
      const branchColors = [];

      circles.forEach((circle) => {
        if (circle.classList.length > 1) {
          branchColors.push(circle.classList[1]);
        }
      });

      const orderCheckResult = checkOrder(branchColors, treeIndex, branchIndex);
      if (orderCheckResult.correct) {
        correctBranches.push(
          `Tree ${treeIndex + 1}, Branch ${branchIndex + 1}`
        );
      } else {
        incorrectBranches.push(
          `Tree ${treeIndex + 1}, Branch ${branchIndex + 1}`
        );
      }
    });
  });

  if (incorrectBranches.length === 0) {
    showSweetAlert("success", "All branches are correct!");
  } else {
    const errorMessage = `Incorrect branches:\n${incorrectBranches.join(
      "\n"
    )}\n\nCorrect branches:\n${correctBranches.join("\n")}`;
    showSweetAlert("error", errorMessage);
  }
}

// Function to check the order of colors for a given branch
function checkOrder(branchColors, treeIndex, branchIndex) {
  // Define the expected order of colors for each branch
  function checkOrder(branchColors, treeIndex, branchIndex) {
    // Define the expected order of colors for each branch
    const expectedOrders = [
      ["grey", "grey", "grey"], // For the first branch
      ["orange", "orange", "orange"],
      ["grey", "grey", "grey", "grey", "grey", "grey"],
      ["black", "black", "black", "black"],
      [
        "orange",
        "orange",
        "orange",
        "orange",
        "orange",
        "orange",
        "orange",
        "orange",
        "orange",
      ],
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
      ],
      ["grey", "grey"],
      ["orange", "orange"],
      ["black", "black"],
      ["grey", "grey"],
      ["orange", "orange", "orange", "orange"],
      ["black", "black", "black"],
      ["grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey"],
      ["orange", "orange", "orange", "orange"],
      ["orange", "orange", "orange", "orange"],
      ["black", "black", "black", "black", "black"],
      ["black", "black", "black"],
      ["grey", "grey", "grey"],
      ["grey", "grey", "grey"],
      ["orange", "orange", "orange"],
      ["orange", "orange", "orange"],
      ["black", "black", "black"],
      ["black", "black", "black"],
      ["grey", "grey"],
      ["orange", "orange"],
      ["black", "black"],

      // For the second branch
      // Add more expected orders for additional branches if needed
    ];
    const expectedOrder = expectedOrders[branchIndex]; // Get the expected order for this branch

    // Check if the length of branchColors matches the length of expectedOrder
    if (branchColors.length !== expectedOrder.length) {
      return {
        correct: false,
        wrongColor: null,
        expectedColor: null,
        treeIndex: treeIndex + 1,
        branchIndex: branchIndex + 1,
      };
    }

    // Check each color in the branchColors array against the expected order
    for (let i = 0; i < branchColors.length; i++) {
      if (branchColors[i] !== expectedOrder[i]) {
        return {
          correct: false,
          wrongColor: branchColors[i],
          expectedColor: expectedOrder[i],
          treeIndex: treeIndex + 1,
          branchIndex: branchIndex + 1,
        };
      }
    }

    // If all colors match the expected order, return true
    return { correct: true };
  }

  const expectedOrder = expectedOrders[branchIndex]; // Get the expected order for this branch

  // Check if the length of branchColors matches the length of expectedOrder
  if (branchColors.length !== expectedOrder.length) {
    return {
      correct: false,
      wrongColor: null,
      expectedColor: null,
      treeIndex: treeIndex + 1,
      branchIndex: branchIndex + 1,
    };
  }

  // Check each color in the branchColors array against the expected order
  for (let i = 0; i < branchColors.length; i++) {
    if (branchColors[i] !== expectedOrder[i]) {
      return {
        correct: false,
        wrongColor: branchColors[i],
        expectedColor: expectedOrder[i],
        treeIndex: treeIndex + 1,
        branchIndex: branchIndex + 1,
      };
    }
  }

  // If all colors match the expected order, return true
  return { correct: true };
}

function showSweetAlert(icon, message) {
  // Hide the default alert
  window.alert = function () {};

  // Use SweetAlert to display an alert
  Swal.fire({
    title: icon === "success" ? "CORRECT" : "INCORRECT!",
    text: message,
    icon: icon,
    confirmButtonText: "OK",
  });
}

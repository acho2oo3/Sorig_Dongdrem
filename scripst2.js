function dragStart(event) {
  event.dataTransfer.setData("text", event.target.classList[1]); // Store the color of the dragged circle
}

const branches = document.querySelectorAll(".branch");

function dragOver(event) {
  event.preventDefault(); // Allow drop
}

function drop(event) {
  event.preventDefault();
  const color = event.dataTransfer.getData("text"); // Get the color of the dragged circle
  const branch = event.target;

  // Remove all existing circles from the branch
  branch.querySelectorAll(".circle").forEach((circle) => circle.remove());

  // Create and insert the new circle
  const newCircle = document.createElement("div");
  newCircle.classList.add("circle", color);
  branch.insertBefore(newCircle, branch.firstChild);
}

const circles = document.querySelectorAll(".circle");

circles.forEach((circle) => {
  circle.addEventListener("dragstart", dragStart);
});

branches.forEach((branch) => {
  branch.addEventListener("dragover", dragOver);
  branch.addEventListener("drop", drop);
});

// Add an event listener to the submit button
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
  const trees = document.querySelectorAll(".tree");
  const results = [];

  trees.forEach((tree, treeIndex) => {
    const branches = tree.querySelectorAll(".branch");
    let treeCorrect = true;

    branches.forEach((branch, branchIndex) => {
      const circles = branch.querySelectorAll(".circle");
      const branchColors = [];

      circles.forEach((circle) => {
        const colorClass = circle.classList[1]; // Access the second class for color
        if (colorClass) {
          branchColors.push(colorClass); // Push the color to the array
        }
      });

      const orderCheckResult = checkOrder(branchColors, treeIndex, branchIndex);
      if (!orderCheckResult.correct) {
        treeCorrect = false;
        results.push({
          treeIndex: treeIndex + 1,
          branchIndex: branchIndex + 1,
          correct: false,
        });
      } else {
        results.push({
          treeIndex: treeIndex + 1,
          branchIndex: branchIndex + 1,
          correct: true,
        });
      }
    });

    if (treeCorrect) {
      results.push({
        treeIndex: treeIndex + 1,
        correct: true,
      });
    } else {
      results.push({
        treeIndex: treeIndex + 1,
        correct: false,
      });
    }
  });

  displaySummary(results);
}
function displaySummary(results) {
  let correctTrees = {};
  let incorrectTrees = {};

  results.forEach((result) => {
    if (result.correct) {
      if (!correctTrees[result.treeIndex]) {
        correctTrees[result.treeIndex] = [];
      }
      correctTrees[result.treeIndex].push(result.branchIndex);
    } else {
      if (!incorrectTrees[result.treeIndex]) {
        incorrectTrees[result.treeIndex] = [];
      }
      incorrectTrees[result.treeIndex].push(result.branchIndex);
    }
  });

  let summaryMessage = "Summary:\n";
  if (Object.keys(correctTrees).length > 0) {
    summaryMessage += "Correct:\n";
    for (const [treeIndex, branches] of Object.entries(correctTrees)) {
      summaryMessage += `Tree ${treeIndex} Branches: ${branches.join(", ")}\n`;
    }
  }
  if (Object.keys(incorrectTrees).length > 0) {
    summaryMessage += "Incorrect:\n";
    for (const [treeIndex, branches] of Object.entries(incorrectTrees)) {
      summaryMessage += `Tree ${treeIndex} Branches: ${branches.join(", ")}\n`;
    }
  }
  if (
    Object.keys(correctTrees).length === 0 &&
    Object.keys(incorrectTrees).length === 0
  ) {
    summaryMessage += "No predictions made yet.";
  }

  Swal.fire({
    title: "Total",
    text: summaryMessage,
    icon: "info",
    confirmButtonText: "OK",
  });
}

function checkOrder(branchColors, treeIndex, branchIndex) {
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

  const expectedOrder = expectedOrders[treeIndex][branchIndex]; // Get the expected order for this branch

  if (branchColors.length !== expectedOrder.length) {
    return {
      correct: false,
      wrongColor: null,
      expectedColor: null,
      treeIndex: treeIndex + 1,
      branchIndex: branchIndex + 1,
    };
  }

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

  return { correct: true };
}

function displayResults(results) {
  let correctCount = 0;
  let incorrectCount = 0;

  results.forEach((result) => {
    if (result.correct) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  if (correctCount === results.length) {
    showSweetAlert();
  } else {
    let errorMessage = "";
    results.forEach((result) => {
      if (!result.correct) {
        errorMessage += `Tree ${result.treeIndex}, Branch ${result.branchIndex} is incorrect. Expected "${result.expectedColor}" but got "${result.wrongColor}".\n`;
      }
    });
    wrongColor(errorMessage);
  }
}

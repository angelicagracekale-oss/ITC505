let tasks = [];

document.getElementById("taskForm").addEventListener("submit", e => {
  e.preventDefault();
  const taskName = document.getElementById("task").value.trim();
  const duration = parseInt(document.getElementById("time").value);

  if (!taskName || isNaN(duration) || duration <= 0) {
    alert("Please enter a valid task and duration (positive number).");
    return;
  }

  tasks.push({ name: taskName, time: duration });
  displayTasks();
  e.target.reset();
});

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    document.getElementById("result").textContent = "";
    return;
  }

  // Determine the maximum duration
  const maxTime = Math.max(...tasks.map(t => t.time));

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-item";
    if (task.time === maxTime) div.classList.add("highlight");
    div.innerHTML = `<span>${task.name}</span><span>${task.time} min</span>`;
    list.appendChild(div);
  });

  const total = tasks.reduce((sum, t) => sum + t.time, 0);
  const avg = total / tasks.length;
  document.getElementById("result").innerHTML =
    `Total time: ${total} min | Average time: ${avg.toFixed(1)} min`;
}

function clearTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    displayTasks();
  }
}

// Footer last modified
document.getElementById("lastModified").textContent = document.lastModified;

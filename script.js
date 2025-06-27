const container = document.getElementById("bars-container");
let array = [];

function generateBars(num = 50) {
  container.innerHTML = "";
  array = [];
  for (let i = 0; i < num; i++) {
    const value = Math.floor(Math.random() * 300) + 20;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  const algorithm = document.getElementById("algorithm").value;
  if (algorithm === "bubble") await bubbleSort();
  else if (algorithm === "selection") await selectionSort();
  else if (algorithm === "insertion") await insertionSort();
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      await sleep(50);

      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
    }
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let min = i;
    bars[min].style.backgroundColor = "green";
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "red";
      await sleep(50);
      if (array[j] < array[min]) {
        bars[min].style.backgroundColor = "#3498db";
        min = j;
        bars[min].style.backgroundColor = "green";
      } else {
        bars[j].style.backgroundColor = "#3498db";
      }
    }
    if (min !== i) {
      [array[i], array[min]] = [array[min], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[min].style.height = `${array[min]}px`;
    }
    bars[min].style.backgroundColor = "#3498db";
  }
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.height = `${array[j]}px`;
      array[j + 1] = array[j];
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      await sleep(50);
      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
}

// Generate initial bars
generateBars();

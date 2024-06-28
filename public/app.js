document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".inp");
  const audio = document.getElementById("checkbox-sound");
  const listItems = document.querySelectorAll("#list");

  checkboxes.forEach(function (checkbox, index) {
    const listItem = listItems[index];
    if (checkbox.checked) {
      listItem.style.textDecoration = "line-through";
    } else {
      listItem.style.textDecoration = "";
    }

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        listItem.style.textDecoration = "line-through";
        audio.play();
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0; // Reset audio to start
        }, 1000); // 1000 milliseconds = 1 second
      } else {
        listItem.style.textDecoration = "";
      }
    });
  });
});

function openTab(event, tabId) {
  // Get all elements with class="tab-content" and hide them
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  // Get all elements with class="tab-button" and remove the class "active"
  var tabButtons = document.getElementsByClassName("tab-button");
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // Show the current tab and add an "active" class to the button that opened the tab
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.classList.add("active");
}

// Automatically open the first tab and make it active
document.addEventListener("DOMContentLoaded", function () {
  const firstTabButton = document.querySelector(".tab-button");
  if (firstTabButton) {
    firstTabButton.click();
  }
});

let content = document.querySelector(".sec-2");

const colorClasses = [
  "bg-blue-500",
  "bg-yellow-500",
  "bg-zinc-200",
  "bg-slate-800",
  "bg-orange-600",
  "bg-indigo-700",
  "bg-indigo-300",
  "bg-red-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-blue-700",
  "bg-yellow-700",
  "bg-zinc-300",
  "bg-slate-900",
  "bg-orange-700",
  "bg-red-700",
  "bg-green-300",
  "bg-yellow-700",
  "bg-blue-300",
];

function removeColorClasses() {
  colorClasses.forEach((colorClass) => content.classList.remove(colorClass));
}

function applyColor(colorClass) {
  removeColorClasses();
  content.classList.add(colorClass);
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn1")
    .addEventListener("click", () => applyColor("bg-blue-500"));
  document
    .getElementById("btn2")
    .addEventListener("click", () => applyColor("bg-yellow-500"));
  document
    .getElementById("btn3")
    .addEventListener("click", () => applyColor("bg-zinc-200"));
  document
    .getElementById("btn4")
    .addEventListener("click", () => applyColor("bg-slate-800"));
  document
    .getElementById("btn5")
    .addEventListener("click", () => applyColor("bg-orange-600"));
  document
    .getElementById("btn6")
    .addEventListener("click", () => applyColor("bg-indigo-700"));
  document
    .getElementById("btn7")
    .addEventListener("click", () => applyColor("bg-indigo-300"));
  document
    .getElementById("btn8")
    .addEventListener("click", () => applyColor("bg-red-500"));
  document
    .getElementById("btn9")
    .addEventListener("click", () => applyColor("bg-green-500"));
  document
    .getElementById("btn10")
    .addEventListener("click", () => applyColor("bg-purple-500"));
  document
    .getElementById("btn11")
    .addEventListener("click", () => applyColor("bg-pink-500"));
  document
    .getElementById("btn12")
    .addEventListener("click", () => applyColor("bg-teal-500"));
  document
    .getElementById("btn13")
    .addEventListener("click", () => applyColor("bg-indigo-500"));
  document
    .getElementById("btn14")
    .addEventListener("click", () => applyColor("bg-cyan-500"));
  document
    .getElementById("btn15")
    .addEventListener("click", () => applyColor("bg-lime-500"));
  document
    .getElementById("btn16")
    .addEventListener("click", () => applyColor("bg-amber-500"));
  document
    .getElementById("btn17")
    .addEventListener("click", () => applyColor("bg-emerald-500"));
  document
    .getElementById("btn18")
    .addEventListener("click", () => applyColor("bg-violet-500"));
  document
    .getElementById("btn19")
    .addEventListener("click", () => applyColor("bg-fuchsia-500"));
  document
    .getElementById("btn20")
    .addEventListener("click", () => applyColor("bg-rose-500"));
  document
    .getElementById("btn21")
    .addEventListener("click", () => applyColor("bg-sky-500"));
  document
    .getElementById("btn22")
    .addEventListener("click", () => applyColor("bg-blue-700"));
  document
    .getElementById("btn23")
    .addEventListener("click", () => applyColor("bg-yellow-700"));
  document
    .getElementById("btn24")
    .addEventListener("click", () => applyColor("bg-zinc-300"));
  document
    .getElementById("btn25")
    .addEventListener("click", () => applyColor("bg-slate-900"));
  document
    .getElementById("btn26")
    .addEventListener("click", () => applyColor("bg-orange-700"));
  document
    .getElementById("btn27")
    .addEventListener("click", () => applyColor("bg-red-700"));
  document
    .getElementById("btn28")
    .addEventListener("click", () => applyColor("bg-green-300"));
  document
    .getElementById("btn29")
    .addEventListener("click", () => applyColor("bg-yellow-700"));
  document
    .getElementById("btn30")
    .addEventListener("click", () => applyColor("bg-blue-300"));
});

let colorplate = document.querySelectorAll(".colorPlate");

colorplate.forEach((cp) => {
  cp.addEventListener("click", function () {
    // Remove 'colorPlateActive' from all elements
    colorplate.forEach((el) => el.classList.remove("colorPlateActive"));
    // Add 'colorPlateActive' to the clicked element
    cp.classList.add("colorPlateActive");
  });
});

let popUp = document.getElementById("popup");
function openPopup() {
  popUp.classList.toggle("popupActive");
}

function clickOutsideHandler(event) {
  if (!popUp.contains(event.target)) {
    popUp.classList.remove("popupActive");
    // Remove the event listener once popup is closed
    window.removeEventListener("click", clickOutsideHandler);
  }
}

// Add the event listener to the window
window.addEventListener("click", clickOutsideHandler);

let openContext = document.getElementById("openContext");

function showContextMenu(e, tasks) {
  e.preventDefault();
  let context = document.getElementById("context");
  context.style.top = `${e.pageY}px`;
  context.style.left = `${e.pageX - 300}px`;
  context.style.display = "flex";
  let deletetask = document.getElementById("deleteTask");
  deletetask.addEventListener("click", function () {
    return deleteTask(tasks);
  });
}

document.addEventListener("click", () => {
  let context = document.getElementById("context");
  context.style.display = "none";
});

function deleteTask(tasks) {
  window.location.href = `/deleteTasks/${tasks}`;
}

function check(check) {
  window.location.href = `/checkTasks/${check}`;
  
}

window.addEventListener("load", () => {
  let profilebg = document.getElementById("profile");
  profilebg.style.backgroundColor = `rgba(${Math.ceil(
    Math.random() * 200
  )},${Math.ceil(Math.random() * 35)},${Math.ceil(Math.random() * 56)},0.5)`;
  console.log(
    `rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(
      Math.random() * 255
    )},${Math.ceil(Math.random() * 255)},1)`
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector("body");
  const fullscreenButton = document.getElementById("fullscreen");

  fullscreenButton.addEventListener("click", function () {
    if (!document.fullscreenElement) {
      if (content.requestFullscreen) {
        fullscreenButton.className = 'bi-fullscreen-exit'
        content.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenButton.className = 'bi-fullscreen'
      }
    }
  });
});

function navbar() {
  let body1 = document.getElementById('pop');
  let body2 = document.querySelector('.sec-2');
  body1.classList.toggle('popActive')
  body2.classList.toggle('secActive1')
  // body1.style.position = "fixed"
  // body1.style.left = "0"
  // body1.style.top = "0"
}

// document.addEventListener("DOMContentLoaded", function() {
//   const apiKey = 'cRwlvgIap03saODuAWRo3ZeDpxz74LTQKhZBvwfGnpgeLXCOeWpcOA1b';
//   const endpoint = 'https://api.pexels.com/v1/search?query=person&per_page=10';

//   fetch(endpoint, {
//       method: 'GET',
//       headers: {
//           'Authorization': apiKey
//       }
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//   })
//   .then(data => {
//       const gallery = document.getElementById('gallery');
//       data.photos.forEach(photo => {
//           const img = document.createElement('img');
//           img.src = photo.src.medium;
//           img.alt = photo.alt;
//           gallery.appendChild(img);
//       });
//   })
//   .catch(error => {
//       console.error('Error fetching data from Pexels API:', error);
//   });
// });
//! Open And Close + Spin The Icon
let icon = document.querySelector(".icon");
let box = document.querySelector(".setting-box");

icon.addEventListener("click", function () {
  box.classList.toggle("active");
  icon.classList.toggle("fa-spin");
});

//! Toggle the color

let first = document.querySelector(".first");
let second = document.querySelector(".second");
let third = document.querySelector(".third");
let fourth = document.querySelector(".fourth");
let fifth = document.querySelector(".fifth");

let colors = [first, second, third, fourth, fifth];

saved_color = window.localStorage.getItem("main-color");
document.documentElement.style.setProperty("--main-color", saved_color);

//? set active class to specified color
for (let k = 0; k < colors.length; k++) {
  let computed = window.getComputedStyle(colors[k]);
  if (computed.getPropertyValue("background-color") === saved_color) {
    colors[k].classList.add("active");
  }
}

for (let i = 0; i < colors.length; i++) {
  //? Add Active Class on color , set main color to specified color , and set main-color in local storage to specified color
  colors[i].addEventListener("click", function (e) {
    for (let j = 0; j < colors.length; j++) {
      colors[j].classList.remove("active");
    }
    colors[i].classList.add("active");
    let element = window.getComputedStyle(colors[i]);
    let color = element.getPropertyValue("background-color");
    document.documentElement.style.setProperty("--main-color", color);
    window.localStorage.setItem("main-color", color);
  });
}

//! Random Background image
// let landing = document.querySelector(".landing-page");
// let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// if (window.localStorage.getItem("random") !== null) {
//   landing.style.backgroundImage = localStorage.getItem("saved_bg");
// } else {
//   landing.style.backgroundImage = 'url("img/' + imgs[0] + '")';
// }

// let yes = document.querySelector(".random .options .yes");
// let no = document.querySelector(".random .options .no");
// let interval;
// document.addEventListener("click", (e) => {
//   if (e.target === yes) {
//     no.classList.remove("active");
//     yes.classList.add("active");
//     interval = setInterval(() => {
//       let landing = document.querySelector(".landing-page");
//       let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
//       let random = Math.floor(Math.random() * imgs.length);
//       landing.style.backgroundImage = 'url("img/' + imgs[random] + '")';
//       window.localStorage.setItem(
//         "saved_bg",
//         'url("img/' + imgs[random] + '")'
//       );
//     }, 500);
//     window.localStorage.setItem("random", "yes");
//   } else if (e.target === no) {
//     yes.classList.remove("active");
//     no.classList.add("active");
//     clearInterval(interval);
//     window.localStorage.setItem("random", "no");
//   }
// });
// let random_saved = window.localStorage.getItem("random");
// switch (random_saved) {
//   case "yes":
//     yes.classList.add("active");
//     setInterval(() => {
//       let landing = document.querySelector(".landing-page");
//       let imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
//       let random = Math.floor(Math.random() * imgs.length);
//       landing.style.backgroundImage = 'url("img/' + imgs[random] + '")';
//     }, 500);
//     break;
//   case "no":
//     no.classList.add("active");
// }

let yes_btn = document.querySelector(".random .options .yes");
let no_btn = document.querySelector(".random .options .no");
let interval;

//! sets the previous saved background
if (localStorage.getItem("Background URL") !== null) {
  document.querySelector(".landing-page").style.backgroundImage =
    localStorage.getItem("Background URL");
} else {
  document.querySelector(".landing-page").style.backgroundImage =
    'url("img/1.jpg")';
}

//! sets the change background option from local
let saved_random_value = localStorage.getItem("random");
if (saved_random_value === "true") {
  yes_btn.classList.add("active");
  changeBg();
} else if (saved_random_value === "false") {
  no_btn.classList.add("active");
  clearInterval(interval);
}

//! function to change background img every 3000 milliseconds
function changeBg() {
  interval = setInterval(() => {
    let landing = document.querySelector(".landing-page");
    let imgs = [
      "1.jpg",
      "2.jpg",
      "3.jpg",
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "7.jpg",
      "8.jpg",
    ];
    let random = Math.floor(Math.random() * imgs.length);
    landing.style.backgroundImage = 'url("img/' + imgs[random] + '")';
    window.localStorage.setItem(
      "Background URL",
      'url("img/' + imgs[random] + '")'
    );
  }, 5000);
}
//! when click (yes,no) --> (add,remove) active class , set value to local storage(true,false) , (randomize or clear Interval)
document.addEventListener("click", function (element) {
  if (element.target === yes_btn) {
    yes_btn.classList.add("active");
    no_btn.classList.remove("active");
    window.localStorage.setItem("random", true);
    changeBg();
  } else if (element.target === no_btn) {
    yes_btn.classList.remove("active");
    no_btn.classList.add("active");
    window.localStorage.setItem("random", false);
    clearInterval(interval);
  }
});

//! set width to each skill

window.onscroll = function () {
  if (window.scrollY >= 800) {
    setTimeout(() => {
      let spans = document.querySelectorAll(
        ".skills .container .skill .progress span"
      );
      spans.forEach((element) => {
        width = element.getAttribute("data-progress");
        element.style.width = width;
      });
    }, 100);
  }
};

//! pop up window when click on image
let overlay = document.querySelector(".gallery .overlay");
let images = document.querySelectorAll(".gallery .container .img");
images.forEach((element) => {
  element.addEventListener("click", function (e) {
    let title = e.target.getAttribute("name");
    let source = e.target.getAttribute("src");
    let preview_img = document.querySelector(".gallery .overlay .pop-up img");
    let preview_title = document.querySelector(".gallery .overlay .pop-up h1");
    preview_img.setAttribute("src", source);
    preview_title.innerHTML = title;
    let overlay = document.querySelector(".gallery .overlay");
    overlay.classList.add("active");
  });
});
let close_icon = document.querySelector(".gallery .overlay .pop-up span");
document.addEventListener("click", (e) => {
  if (
    e.target === close_icon ||
    (e.target === document.querySelector(".gallery .overlay") &&
      e.target !== document.querySelector(".gallery .overlay .pop-up"))
  ) {
    overlay.classList.remove("active");
  }
});

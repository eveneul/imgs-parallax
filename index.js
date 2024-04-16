import Observer from "./observer.js";

const images = document.querySelectorAll(".img-box");

const observer = new Observer();
images.forEach((image) => {
  observer.add(image);
});

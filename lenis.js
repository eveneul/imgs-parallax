const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function updateTransformToScroll(prev, next, scroll, start, end) {
  const value = prev - ((next - prev) * scroll) / (end - start);
  return value;
}

const images = document.querySelectorAll("#parallax .img-box");
const valueText = document.querySelector("#parallax .value");
// console.log(valueText);

// const checkPoint = document.createElement("div");
// checkPoint.innerHTML = "_______END";
// checkPoint.style.position = "fixed";
// checkPoint.style.top = "10%";
// checkPoint.style.color = "red";
// checkPoint.style.fontSize = "32px";
// checkPoint.style.zIndex = 1000;
// document.body.appendChild(checkPoint);

function scaleToScroll(top, prev, next, endPoint) {
  let height = window.innerHeight;
  let value;
  if (top < height) {
    if (endPoint) {
      value = Math.max(0, top) / (height - (1 - endPoint)) - (1 - endPoint);
      // valueText.innerHTML = `${value}`;
      if (value < 0) return next;
      return next + (prev - next) * value;
    }
    value = Math.max(0, top) / height;

    return next + (prev - next) * value;
  }
  return prev;
}

lenis.on("scroll", (scroll) => {
  images.forEach((image) => {
    const img = image.querySelector("img");
    const { top } = image.getBoundingClientRect();
    const scale = scaleToScroll(top, 1.6, 1, 0.8);
    const opacity = scaleToScroll(top, 0, 1, 0.8);
    img.style.transform = `scale(${scale})`;
    img.style.opacity = opacity;
  });
});

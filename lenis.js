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

const images = document.querySelectorAll("#parallax img");

function scaleToScroll(top, initValue, targetValue) {
  const threshold = window.innerHeight;
  if (top < threshold) {
    const value = Math.max(0, top) / threshold;
    return initValue + (targetValue - initValue) * value;
  }

  return initValue;
}

lenis.on("scroll", (scroll) => {
  images.forEach((image) => {
    const { top } = image.getBoundingClientRect();
    const scale = scaleToScroll(top, 1, 1.6);
    const opacity = scaleToScroll(top, 1, 0);
    image.style.transform = `scale(${scale})`;
    image.style.opacity = opacity;
  });
});

// Fallback for browsers without animation-timeline:view() support
// If CSS scroll-timeline is not supported, use IntersectionObserver.
const blocks = document.querySelectorAll(".block");

if (!CSS.supports("animation-timeline: view()")) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  blocks.forEach((block) => observer.observe(block));
}

// Click handler: open main page section
document.querySelectorAll(".block").forEach((block) => {
  block.addEventListener("click", (e) => {
    // button pe click bhi block click hi rahe
    const targetId = block.getAttribute("data-target");
    if (!targetId) return;

    // main store page with hash (assumes index.html same folder me hai)
    window.location.href = `index.html#${targetId}`;
  });
});


document.querySelectorAll(".block.split").forEach(block => {
  const video = block.querySelector("video");

  if (!video) return;

  // Attempt to play video immediately
  video.play().catch(err => console.log('Video autoplay prevented:', err));

  block.addEventListener("mouseenter", () => {
    video.play();
  });

  block.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

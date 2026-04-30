const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeIcon.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = navLinks.querySelectorAll("a");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
);
revealElements.forEach((el) => revealObserver.observe(el));

const progressBars = document.querySelectorAll(".progress span");
const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const value = entry.target.style.getPropertyValue("--value");
        entry.target.style.width = value;
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);
progressBars.forEach((bar) => skillObserver.observe(bar));

const headlineEl = document.getElementById("typingHeadline");
const fullHeadline = "Creative Flutter Developer | Turning Ideas into Mobile Apps";
let typedIndex = 0;
function typeHeadline() {
  if (!headlineEl) return;
  headlineEl.textContent = fullHeadline.slice(0, typedIndex);
  typedIndex += 1;
  if (typedIndex <= fullHeadline.length) {
    window.setTimeout(typeHeadline, 42);
  }
}
headlineEl.textContent = "";
typeHeadline();

const sections = document.querySelectorAll("main section, footer");
const navMap = Array.from(navItems).map((item) => ({
  link: item,
  id: item.getAttribute("href")?.replace("#", "")
}));

function setActiveNavLink() {
  const scrollPosition = window.scrollY + 140;
  let activeId = "";
  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      activeId = section.id;
    }
  });
  navMap.forEach(({ link, id }) => {
    link.classList.toggle("active", id === activeId);
  });
}

const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
  setActiveNavLink();
});
setActiveNavLink();

const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialWrapper = document.getElementById("testimonialWrapper");
const testimonials = Array.from(document.querySelectorAll(".testimonial-card"));
const dotsContainer = document.getElementById("testimonialDots");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");
let currentSlide = 0;
let autoPlayTimer = null;
let startX = 0;
let endX = 0;

function setActiveSlide(index) {
  const safeIndex = (index + testimonials.length) % testimonials.length;
  currentSlide = safeIndex;
  testimonialTrack.style.transform = `translateX(-${safeIndex * 100}%)`;

  testimonials.forEach((card, i) => {
    card.classList.toggle("active", i === safeIndex);
  });
  dotsContainer.querySelectorAll("button").forEach((dot, i) => {
    dot.classList.toggle("active", i === safeIndex);
  });
}

function startAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => setActiveSlide(currentSlide + 1), 4200);
}

testimonials.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
  dot.addEventListener("click", () => {
    setActiveSlide(index);
    startAutoPlay();
  });
  dotsContainer.appendChild(dot);
});

prevBtn.addEventListener("click", () => {
  setActiveSlide(currentSlide - 1);
  startAutoPlay();
});
nextBtn.addEventListener("click", () => {
  setActiveSlide(currentSlide + 1);
  startAutoPlay();
});

testimonialWrapper.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
});
testimonialWrapper.addEventListener("touchmove", (event) => {
  endX = event.touches[0].clientX;
});
testimonialWrapper.addEventListener("touchend", () => {
  const swipeDistance = endX - startX;
  if (Math.abs(swipeDistance) > 40) {
    setActiveSlide(currentSlide + (swipeDistance < 0 ? 1 : -1));
    startAutoPlay();
  }
  startX = 0;
  endX = 0;
});

setActiveSlide(0);
startAutoPlay();

// Handle theme persistence and toggle behavior
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

// Mobile menu toggle
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

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Animate skill bars on scroll
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

// Testimonial slider with dots and autoplay
const testimonials = Array.from(document.querySelectorAll(".testimonial-card"));
const dotsContainer = document.getElementById("testimonialDots");
let currentSlide = 0;

function setActiveSlide(index) {
  testimonials.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });

  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

testimonials.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
  dot.addEventListener("click", () => {
    currentSlide = index;
    setActiveSlide(currentSlide);
  });
  dotsContainer.appendChild(dot);
});

setActiveSlide(currentSlide);

setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonials.length;
  setActiveSlide(currentSlide);
}, 4200);

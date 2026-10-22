
// 1. Automatic hero image slider
const slides = document.querySelectorAll(".image-slide");
const slideNumber = document.getElementById("slideNumber");

let currentSlide = 0;
let sliderTimer;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  slideNumber.textContent = String(index + 1).padStart(2, "0");
}

function startSlider() {
  clearInterval(sliderTimer);

  if (slides.length < 2) return;

  sliderTimer = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

showSlide(currentSlide);
startSlider();

// Pause the slider when the visitor switches browser tabs
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(sliderTimer);
  } else {
    startSlider();
  }
});

// 2. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// 3. Reveal sections while scrolling
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// 4. Automatically display the current year
document.getElementById("year").textContent =
  new Date().getFullYear();

// 5. Demo enquiry form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  formMessage.textContent =
    "Thank you! Your form is ready. Connect a backend or form service to receive enquiries.";

  contactForm.reset();
});




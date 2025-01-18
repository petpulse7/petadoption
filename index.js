// Navbar
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () =>
  navbar.classList.toggle("sticky", window.scrollY > 0)
);
function redirectToWhatsApp() {
  const phone = "8484057836";
  const url = `https://wa.me/${phone}`;
  window.location.href = url;
}


// Menu Toggle
const menu = document.querySelector(".menu");
const toggleMenu = () => menu.classList.toggle("active");

document.querySelector(".menu-btn").addEventListener("click", toggleMenu);
document.querySelector(".close-btn").addEventListener("click", toggleMenu);

document
  .querySelectorAll(".menu a")
  .forEach((link) => link.addEventListener("click", toggleMenu));

// Lenis for smooth scrolling
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.ticker.add((time) => {
  lenis.raf(time); // Only call lenis.raf once here
});
gsap.ticker.lagSmoothing(0);

lenis.on("scroll", ScrollTrigger.update);

// Scroll Reveal
const sr = ScrollReveal({
  origin: "bottom",
  distance: "40px",
  duration: 800,
  delay: 200,
  easing: "ease-in-out",
});

// GSAP animation for navbar opacity
gsap.to("nav", {
  opacity: 1,
  duration: 2,
});

// Reveal animations
sr.reveal(".hero-headlines h1");
sr.reveal(".hero-headlines p", { delay: 500 }); // Corrected delay to a number
sr.reveal(".hero-headlines-buttons", { delay: 1000 });

gsap.from(".hero-images img", {
  opacity: 0,
  duration: 1,
  stagger: 0.5,
});

sr.reveal(".requirements-headlines h1");
sr.reveal(".requirements-headlines p", { delay: 500 }); // Corrected delay
sr.reveal(".requirements img", { delay: 500 });
sr.reveal(".r-item-container", { delay: 1000 });
sr.reveal(".pets-container");
sr.reveal(".pet-item h3");
sr.reveal(".about-headlines");
sr.reveal(".about-img");
sr.reveal(".testimonials h1", { delay: 500 });
sr.reveal(".testimonials h6");
sr.reveal(".testimony-item", { delay: 1000 });
sr.reveal(".footer-brand");
sr.reveal(".footer-links", { delay: 500, origin: "left" });
sr.reveal(".footer-contact-info", { delay: 500, origin: "right" });
sr.reveal(".copyright", { delay: 600 });

// gsap sCroll Trigger
// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.create({
//   trigger: ".heropage",
//   start: "top center",
//   end: "center center",
//   scrub: 1,
//   onToggle: (self) => {
//     if (self.isActive) {
//       gsap.to(".hero-images img", { scale: 1, gap: "64px", duration: 0.5 });
//     } else {
//       gsap.to(".hero-images img", {
//         scale: "1.2",
//         gap: "35px",
//         duration: 0.5,
//       });
//     }
//   },
// });

gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger for hero images
ScrollTrigger.create({
  trigger: ".heropage",
  start: "top center",
  end: "center center",
  scrub: 1,
  onToggle: (self) => {
    if (self.isActive) {
      gsap.to(".hero-images img", { scale: 1, gap: "64px", duration: 0.5 });
    } else {
      gsap.to(".hero-images img", {
        scale: "1.2",
        gap: "35px",
        duration: 0.5,
      });
    }
  },
});

// Hover effect for images
const images = document.querySelectorAll(".hero-images img");

images.forEach((image) => {
  image.addEventListener("mouseenter", () => {
    gsap.to(image, { scale: 1.3, duration: 0.3 });
  });

  image.addEventListener("mouseleave", () => {
    gsap.to(image, { scale: 1, duration: 0.3 });
  });
});


// About split Types
const splitTypes = document.querySelectorAll(".reveal-type");

splitTypes.forEach((char) => {
  const bg = char.dataset.bgColor || "#000000"; // Default black background
  const fg = char.dataset.fgColor || "#FFFFFF"; // Default white foreground

  const text = new SplitType(char, { types: "chars" });

  gsap.fromTo(
    text.chars,
    {
      color: bg,  // Initial color (background color)
      opacity: 0, // Initially invisible
    },
    {
      color: "#000000",  // Target black color on scroll
      opacity: 1,        // Fully visible
      duration: 0.6,
      stagger: 0.02,
      ScrollTrigger: {
        trigger: char,
        start: "top 80%", // Scroll start position
        end: "top 20%",   // Scroll end position
        scrub: true,      // Smoothly animate as you scroll
        markers: false,   // Disable markers (optional)
        toggleActions: "play none none reverse", // Play animation when in viewport
      },
    }
  );
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Prepare the message for WhatsApp
  const whatsappMessage = `Hello, my name is ${name}. My email is ${email}. I would like to say: ${message}`;
  const whatsappNumber = "8484057836"; // Replace with your WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Open WhatsApp with the message
  window.open(whatsappUrl, "_blank");

  // Show thank you popup
  document.getElementById("thankYouPopup").style.display = "flex";

  // Close the popup when the button is clicked
  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("thankYouPopup").style.display = "none";
  });

  // Clear the form
  document.getElementById("contactForm").reset();
});

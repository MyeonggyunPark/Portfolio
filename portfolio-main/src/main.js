/**
 * Main JavaScript File for Portfolio Website
 * Handles: Dark Mode, Mobile Menu, Modals, and EmailJS (Contact Form)
 */

// --- 1. Theme Logic (Dark/Light Mode) ---
const toggleBtn = document.getElementById("darkModeToggle");
const toggleBtnMobile = document.getElementById("darkModeToggleMobile");
const html = document.documentElement;

// Function to update icons and indicator position based on theme
function updateIcons(isDark) {
  const translateClass = "translate-x-6";
  const sunIcon = "fa-sun";
  const moonIcon = "fa-moon";

  // Desktop Elements
  const indDesktop = document.getElementById("toggleIndicator");
  const iconDesktop = document.getElementById("toggleIcon");

  // Mobile Elements
  const indMobile = document.getElementById("toggleIndicatorMobile");
  const iconMobile = document.getElementById("toggleIconMobile");

  if (isDark) {
    // Apply Dark Mode
    html.classList.add("dark");

    // Update Desktop Button
    indDesktop?.classList.add(translateClass);
    iconDesktop?.classList.replace(moonIcon, sunIcon);

    // Update Mobile Button
    indMobile?.classList.add(translateClass);
    iconMobile?.classList.replace(moonIcon, sunIcon);
  } else {
    // Apply Light Mode
    html.classList.remove("dark");

    // Update Desktop Button
    indDesktop?.classList.remove(translateClass);
    iconDesktop?.classList.replace(sunIcon, moonIcon);

    // Update Mobile Button
    indMobile?.classList.remove(translateClass);
    iconMobile?.classList.replace(sunIcon, moonIcon);
  }
}

// Function to toggle theme and save preference
function toggleTheme() {
  const isDark = !html.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateIcons(isDark);
}

// Initialize theme on page load
const savedTheme = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply saved theme or fallback to system preference
updateIcons(savedTheme === "dark" || (!savedTheme && systemDark));

// Add event listeners to toggle buttons
toggleBtn?.addEventListener("click", toggleTheme);
toggleBtnMobile?.addEventListener("click", toggleTheme);

// --- 2. Mobile Menu Logic ---
const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

// Function to open the mobile menu
function openMenu() {
  mobileMenu.classList.remove("translate-x-full");
  menuOverlay.classList.remove("hidden");
}

// Function to close the mobile menu
function closeMenuFunc() {
  mobileMenu.classList.add("translate-x-full");
  menuOverlay.classList.add("hidden");
}

// Event listeners for menu toggling
menuToggle?.addEventListener("click", openMenu);
closeMenu?.addEventListener("click", closeMenuFunc);
menuOverlay?.addEventListener("click", closeMenuFunc);

// Close menu automatically when a link is clicked
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", closeMenuFunc);
});

// --- 3. Modal Logic (Project Details) ---
const openButtons = document.querySelectorAll(".openModalBtn");
const modals = document.querySelectorAll(".projectModal");

// Add click event to all "Details" buttons
openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Get the unique ID from the button
    const id = btn.getAttribute("data-id");
    // Find the matching modal
    const modal = document.querySelector(`.projectModal[data-id="${id}"]`);

    if (modal) {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  });
});

// Function to hide a modal
function closeModal(modal) {
  modal.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
}

// Add event listeners to close modals
modals.forEach((modal) => {
  // 1. Close when clicking the "X" button
  modal
    .querySelector(".closeModalBtn")
    ?.addEventListener("click", () => closeModal(modal));

  // 2. Close when clicking outside the modal content (overlay)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// 3. Close when pressing the "Escape" key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => {
      if (!modal.classList.contains("hidden")) closeModal(modal);
    });
  }
});

// --- 4. EmailJS Logic (Contact Form) ---
emailjs.init("B1u9i2VsNzBg_HP00");

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // UX: Disable button and show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

    // --- Language Detection Logic ---
    // Detects the language from the <html lang="..."> attribute
    const currentLang = document.documentElement.lang || "en";

    // Define messages for each language
    const messages = {
      de: {
        success: "✅ Nachricht erfolgreich gesendet! Ich melde mich bald.",
        error:
          "❌ Fehler beim Senden. Bitte versuchen Sie es später noch einmal.",
      },
      en: {
        success: "✅ Your message has been sent successfully!",
        error: "❌ Failed to send the message. Please try again later.",
      },
    };

    // Select message based on current language (default to English if undefined)
    const msg = messages[currentLang] || messages["en"];

    // Send email using EmailJS
    emailjs
      .sendForm("service_qerzzjn", "template_coa02zt", this)
      .then(() => {
        // Success Notification
        Toastify({
          text: msg.success,
          duration: 5000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "#10B981", // Green color
            borderRadius: "8px",
            fontWeight: "bold",
            color: "#fff",
          },
        }).showToast();
        this.reset(); // Clear the form
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        // Error Notification
        Toastify({
          text: msg.error,
          duration: 5000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "#EF4444", // Red color
            borderRadius: "8px",
            fontWeight: "bold",
            color: "#fff",
          },
        }).showToast();
      })
      .finally(() => {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
}

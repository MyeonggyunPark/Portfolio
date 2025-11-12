// Dark mode toggle button (desktop version)
const toggleBtn = document.getElementById("darkModeToggle");
const toggleIcon = document.getElementById("toggleIcon");
const toggleIndicator = document.getElementById("toggleIndicator");

// Save theme preference in localStorage
function storeTheme(isDark) {
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme from localStorage or system preference
function loadTheme() {
  const theme = localStorage.getItem("theme");

  if (
    theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    toggleIndicator.classList.add("translate-x-12");
  } else {
    document.documentElement.classList.remove("dark");
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    toggleIndicator.classList.remove("translate-x-12");
  }
}

// Toggle theme on button click
toggleBtn.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");

  if (isDark) {
    toggleIcon.classList.replace("fa-moon", "fa-sun");
    toggleIndicator.classList.add("translate-x-12");
  } else {
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    toggleIndicator.classList.remove("translate-x-12");
  }

  storeTheme(isDark);
});

// Initialize theme on page load
loadTheme();



// 📱 Mobile sidebar toggle
const mobileMenu = document.getElementById("mobileMenu");

// Open mobile menu
document.getElementById("menuToggle").addEventListener("click", () => {
  mobileMenu.classList.toggle("translate-x-full");
});

// Close mobile menu
document.getElementById("closeMenu").addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});

// Dark mode toggle button (mobile version)
const toggleBtnMobile = document.getElementById("darkModeToggleMobile");
const toggleIconMobile = document.getElementById("toggleIconMobile");
const toggleIndicatorMobile = document.getElementById("toggleIndicatorMobile");

// Save theme preference in localStorage (mobile)
function storeThemeMobile(isDark) {
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme from localStorage or system preference (mobile)
function loadThemeMobile() {
  const theme = localStorage.getItem("theme");

  if (
    theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    toggleIconMobile.classList.replace("fa-moon", "fa-sun");
    toggleIndicatorMobile.classList.add("translate-x-12");
  } else {
    document.documentElement.classList.remove("dark");
    toggleIconMobile.classList.replace("fa-sun", "fa-moon");
    toggleIndicatorMobile.classList.remove("translate-x-12");
  }
}

// Toggle theme on mobile button click
toggleBtnMobile.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");

  if (isDark) {
    toggleIconMobile.classList.replace("fa-moon", "fa-sun");
    toggleIndicatorMobile.classList.add("translate-x-12");
  } else {
    toggleIconMobile.classList.replace("fa-sun", "fa-moon");
    toggleIndicatorMobile.classList.remove("translate-x-12");
  }

  storeThemeMobile(isDark);
});

// Initialize theme on page load (mobile)
loadThemeMobile();

// Initialize EmailJS
emailjs.init("B1u9i2VsNzBg_HP00");

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // // Prevent default form submission

  emailjs.sendForm("service_qerzzjn", "template_coa02zt", this).then(
    function () {
      Toastify({
        text: "✅ Your message has been sent successfully!",
        duration: 4000,
        gravity: "bottom",
        position: "right",
        backgroundColor: getComputedStyle(document.documentElement)
          .getPropertyValue("--color-pyBlue")
          .trim(),
        style: {
          borderRadius: "8px",
          color: "#fff",
          fontWeight: "500",
        },
      }).showToast();
      e.target.reset(); // Reset the form
    },
    function (error) {
      console.error("❌ Failed to send the message:", error);
      Toastify({
        text: "❌ Failed to send the message. Please try again later.",
        duration: 4000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#DC2626",
        style: {
          borderRadius: "8px",
          color: "#fff",
          fontWeight: "500",
        },
      }).showToast();
    }
  );
});


// Select all modal open buttons and modal elements
const openButtons = document.querySelectorAll(".openModalBtn");
const modals = document.querySelectorAll(".projectModal");

// Loop through each open button
openButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Get the unique data-id of the clicked button
    const id = btn.getAttribute("data-id");

    // Find the corresponding modal with the same data-id
    const modal = document.querySelector(`.projectModal[data-id="${id}"]`);

    // Display the modal
    modal.classList.remove("hidden");

    // Handle ESC key to close the modal
    const escHandler = (e) => {
      if (e.key === "Escape") {
        modal.classList.add("hidden");

        // Prevent memory leaks
        window.removeEventListener("keydown", escHandler);
      }
    };
    window.addEventListener("keydown", escHandler);

    // Bind close button inside the modal
    const closeBtn = modal.querySelector(".closeModalBtn");
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      window.removeEventListener("keydown", escHandler);
    });
  });
})
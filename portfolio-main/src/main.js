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

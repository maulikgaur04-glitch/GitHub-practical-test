// ===== header / navbar code =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");

// hamburger menu (small screens)
menuBtn.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

// close the menu after a link is clicked
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = "&#9776;";
  });
});

// highlight the link of the section on screen
const sectionLinks = [];
navLinks.querySelectorAll('a[href^="#"]').forEach(function (link) {
  const target = document.querySelector(link.getAttribute("href"));
  if (target) {
    sectionLinks.push({ link: link, target: target });
  }
});

function highlightActiveLink() {
  const position = window.scrollY + 120;
  sectionLinks.forEach(function (item) {
    const top = item.target.offsetTop;
    const bottom = top + item.target.offsetHeight;
    item.link.classList.toggle("active", position >= top && position < bottom);
  });
}

window.addEventListener("scroll", highlightActiveLink);
highlightActiveLink();

// dark mode button (remembers the choice)
function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  try {
    localStorage.setItem("darkMode", isDark);
  } catch (e) {
    // storage not available, ignore
  }
}

try {
  setTheme(localStorage.getItem("darkMode") === "true");
} catch (e) {
  setTheme(false);
}

themeBtn.addEventListener("click", function () {
  setTheme(!document.body.classList.contains("dark"));
});

// ===== footer code =====
// show the current year in the footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== original code (unchanged) =====
document.getElementById("toggleBtn").addEventListener("click", function () {
  const box = document.getElementById("details");
  box.style.display = box.style.display === "none" ? "block" : "none";
});

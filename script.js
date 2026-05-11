
//  ================ THEME TOGGLE ===================
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = "🌙";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
    } else {
        themeToggle.innerHTML = "☀";
        localStorage.setItem("theme", "dark");
    }
});


// =========================  NAME TYPING  =========================

var nameTyped = new Typed("#nameTyping", {
    strings: [
        "Hello, I'm <span class='typed-name'>Manoj Kunwar</span>"
    ],
    typeSpeed: 80,
    showCursor: false
});


// =========================   ROLE TYPING  =========================

var typed = new Typed("#typing", {
    strings: [
        "MERN Stack Developer",
        "Frontend Developer",
        "Backend Developer",
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1200,
    loop: true
});


// =========================   RESUME MODAL  =========================

const openResume  = document.getElementById("openResume");
const resumeModal = document.getElementById("resumeModal");
const closeResume = document.getElementById("closeResume");

// OPEN
openResume.addEventListener("click", (e) => {
    e.preventDefault();
    resumeModal.classList.add("show");
    document.body.style.overflow = "hidden"; 
});

// CLOSE via button
closeResume.addEventListener("click", () => {
    resumeModal.classList.remove("show");
    document.body.style.overflow = "";
});

// CLOSE by clicking outside the modal box
window.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove("show");
        document.body.style.overflow = "";
    }
});

// CLOSE with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal.classList.contains("show")) {
        resumeModal.classList.remove("show");
        document.body.style.overflow = "";
    }
});


// =========================  CONTACT FORM  =========================

const form = document.querySelector(".contact-form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Message sent successfully!");
        form.reset();
    });
}
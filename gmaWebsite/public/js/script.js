

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".custom-navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


document.getElementById("year").textContent = new Date().getFullYear();

// Redirect contact form in 5secs upon invalid inputs
    // setTimeout(() => {
    //     window.location.href = "/contact";
    // }, 5000);

//whatsapp button scroll logic
const whatsappBtn = document.querySelector(".whatsapp_float");

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    if (!whatsappBtn) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // scrolling down → hide
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        whatsappBtn.style.opacity = "0.3";
        whatsappBtn.style.transform = "scale(0.85)";
    } else {
        whatsappBtn.style.opacity = "1";
        whatsappBtn.style.transform = "scale(1)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
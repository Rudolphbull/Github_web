// // Set footer year
// document.getElementById('year').innerHTML = new Date().getFullYear();

// // Toggle navbar menu and icon on mobile
// const menu = document.querySelector('#menu-icon');
// const navbar = document.querySelector('.navbar');

// menu.addEventListener('click', () => {
//   navbar.classList.toggle('open');
//   menu.classList.toggle('bx-x');
//   menu.classList.toggle('bx-menu'); // ensures the hamburger returns when toggled again
// });


// // force close the navbar when a menu is clicked
// document.querySelectorAll('.navbar a').forEach(link => {
//   link.addEventListener('click', () => {
//     navbar.classList.remove('open');
//     menu.classList.remove('bx-x');
//     menu.classList.add('bx-menu');
//   });
// });


// // Protecting my phone number from scrapping Bots

// const encoded = ['&#43;', '234', '906', '377', '4018'];
// const number = encoded.join('');
// const text = ['+234', '906', '377', '4018'].join(' ');
// document.getElementById('phone-number').innerHTML = `<a href="tel:${number}">${text}</a>`;

// //Protecting my Email address

//   const user = 'gmatechnologiesltd';
//   const domain = 'gmail.com';
//   const email = `${user}@${domain}`;
//   const emailLink = `<a href="mailto:${email}">${email}</a>`;
//   document.getElementById('email-address').innerHTML = emailLink;
  
// // Cookies Scripts

// document.addEventListener("DOMContentLoaded", function () {
//   const cookieBanner = document.getElementById("cookieConsent");
//   const acceptBtn = document.getElementById("acceptCookies");
//   const declineBtn = document.getElementById("declineCookies");

//   if (!localStorage.getItem("cookieConsent")) {
//     cookieBanner.classList.remove("hidden");
//   }

//   acceptBtn.addEventListener("click", function () {
//     localStorage.setItem("cookieConsent", "accepted");
//     cookieBanner.classList.add("hidden");
//   });

//   declineBtn.addEventListener("click", function () {
//     localStorage.setItem("cookieConsent", "declined");
//     cookieBanner.classList.add("hidden");
//   });
// });

// // Highlight active navbar link
// document.addEventListener("DOMContentLoaded", () => {
//   const currentPath = window.location.pathname;
//   const navLinks = document.querySelectorAll(".navbar a");

//   navLinks.forEach(link => {
//     const linkPath = new URL(link.href).pathname;

//     if (
//       linkPath === currentPath ||
//       (currentPath === "/" && (linkPath === "/home" || linkPath === "/"))
//     ) {
//       link.classList.add("active");
//     } else {
//       link.classList.remove("active");
//     }
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.innerHTML = new Date().getFullYear();
  }

  // Protect Email Address
  const emailSpan = document.getElementById('email-address');
  if (emailSpan) {
    const user = 'gmatechnologiesltd';
    const domain = 'gmail.com';
    const email = `${user}@${domain}`;
    const emailLink = `<a href="mailto:${email}">${email}</a>`;
    emailSpan.innerHTML = emailLink;
  }

  // Protect Phone Number
  const phoneSpan = document.getElementById('phone-number');
  if (phoneSpan) {
    const encoded = ['&#43;', '234', '906', '377', '4018'];
    const number = encoded.join('');
    const text = ['+234', '906', '377', '4018'].join(' ');
    phoneSpan.innerHTML = `<a href="tel:${number}">${text}</a>`;
  }

  // Cookie Consent Banner
  const cookieBanner = document.getElementById("cookieConsent");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  if (cookieBanner && acceptBtn && declineBtn) {
    if (!localStorage.getItem("cookieConsent")) {
      cookieBanner.classList.remove("hidden");
    }

    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "accepted");
      cookieBanner.classList.add("hidden");
    });

    declineBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "declined");
      cookieBanner.classList.add("hidden");
    });
  }

  // Highlight Active Navbar Link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar a");

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (
      linkPath === currentPath ||
      (currentPath === "/" && (linkPath === "/home" || linkPath === "/"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Navbar Toggle (Mobile)
  const menu = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  if (menu && navbar) {
    menu.addEventListener('click', () => {
      navbar.classList.toggle('open');
      menu.classList.toggle('bx-x');
      menu.classList.toggle('bx-menu');
    });

    // Close navbar when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menu.classList.remove('bx-x');
        menu.classList.add('bx-menu');
      });
    });
  }
});

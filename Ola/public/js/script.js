// Set footer year
document.getElementById('year').innerHTML = new Date().getFullYear();

// Toggle navbar menu and icon on mobile
const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menu.addEventListener('click', () => {
  navbar.classList.toggle('open');
  menu.classList.toggle('bx-x');
  menu.classList.toggle('bx-menu'); // ensures the hamburger returns when toggled again
});


// force close the navbar when a menu is clicked
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('open');
    menu.classList.remove('bx-x');
    menu.classList.add('bx-menu');
  });
});


// Protecting my phone number from scrapping Bots

const encoded = ['&#43;', '234', '906', '377', '4018'];
const number = encoded.join('');
const text = ['+234', '906', '377', '4018'].join(' ');
document.getElementById('phone-number').innerHTML = `<a href="tel:${number}">${text}</a>`;

//Protecting my Email address

  const user = 'gmatechnologiesltd';
  const domain = 'gmail.com';
  const email = `${user}@${domain}`;
  const emailLink = `<a href="mailto:${email}">${email}</a>`;
  document.getElementById('email-address').innerHTML = emailLink;
  

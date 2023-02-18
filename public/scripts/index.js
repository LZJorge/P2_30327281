// Navbar button
const navbar = document.getElementById('side-menu');
const navbarButton = document.getElementById('side-menu-button');

navbarButton.addEventListener('click', ()=> {
    navbar.classList.toggle('side-menu-show');
});
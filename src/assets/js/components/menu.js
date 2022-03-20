const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');
const menu = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.nav-item');

const toggleMenu = () => {
    let showMenu = menuBtn.classList.contains('close');
    if (!showMenu) {
        menuBtn.classList.add('close');
        mainNav.classList.add('show');
        menu.classList.add('show');
        menuItems.forEach(item => item.classList.add('show'));
    } else {
        menuBtn.classList.remove('close');
        mainNav.classList.remove('show');
        menu.classList.remove('show');
        menuItems.forEach(item => item.classList.remove('show'));
    }
}

export const initToggleMenu = () => {
    menuBtn.addEventListener("click", toggleMenu);
}
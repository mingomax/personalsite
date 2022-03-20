const mainHeader = document.querySelector('.main-header'); 
const menuBtn = document.querySelector('.menu-btn');
const toggleMenu = () => {

    const mainNav = document.querySelector('[class^=main-nav]');
    const menu = mainNav.querySelector('[class^="menu"]');
    const menuItems = menu.querySelectorAll('[class*="menu-item"]');
    console.table("menuItems: ", [mainNav, menu, menuItems])

    let showMenu = menuBtn.classList.contains('close');
    if (!showMenu) {
        menuBtn.classList.add('close');
        mainHeader.classList.add('main-header--mobile');
        mainNav.classList.add('main-nav--show');
        menu.classList.add('show');
        menuItems.forEach(item => item.classList.add('show'));
    } else {
        menuBtn.classList.remove('close');
        mainHeader.classList.remove('main-header--mobile');
        mainNav.classList.remove('main-nav--show');
        menu.classList.remove('show');
        menuItems.forEach(item => item.classList.remove('show'));
    }
}

export const initToggleMenu = () => {
    menuBtn.addEventListener("click", toggleMenu);
}
const mainHeader = document.querySelector('.main-header');
const btnToggle = document.querySelector('.btn_toggle');
const toggleMenu = () => {

    const mainNav = document.querySelector('[class^=main-nav]');
    const menu = mainNav.querySelector('[class^="menu"]');
    const menuItems = menu.querySelectorAll('[class*="menu-item"]');
    console.table("menuItems: ", [mainNav, menu, menuItems])

    let showMenu = btnToggle.classList.contains('close');
    if (!showMenu) {
        btnToggle.classList.add('close');
        mainHeader.classList.add('main-header--mobile');
        mainNav.classList.add('main-nav--show');
        menu.classList.add('show');
        menuItems.forEach(item => item.classList.add('show'));
    } else {
        btnToggle.classList.remove('close');
        mainHeader.classList.remove('main-header--mobile');
        mainNav.classList.remove('main-nav--show');
        menu.classList.remove('show');
        menuItems.forEach(item => item.classList.remove('show'));
    }
}

export const initToggleMenu = () => {
    btnToggle.addEventListener("click", toggleMenu);
}

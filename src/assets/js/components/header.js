const mainHeader = document.querySelector('.main-header');
const headerLogo = document.querySelector('.header-logo');
// get the offset position of the header
const sticky = mainHeader.offsetTop;
//add class to create an effect of condesed header when user reach uts scroll position, Remove class when user leave the scroll position
const condensedHeader = () => {
    const hasScrolled = window.pageYOffset > sticky;
    if (hasScrolled) {
      mainHeader.classList.add('main-header-sticky');
      headerLogo.classList.add('header-logo-sticky');
    } else {
      mainHeader.classList.remove('main-header-sticky');
      headerLogo.classList.remove('header-logo-sticky');
    }
}

export const initMainHeader =() => {
    document.addEventListener("scroll", condensedHeader);
}

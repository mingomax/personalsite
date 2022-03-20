const mainHeader = document.querySelector('.main-header');
// get the offset position of the header
const sticky = mainHeader.offsetTop;
//add class to create an effect of condesed header when user reach uts scroll position, Remove class when user leave the scroll position
const condensedHeader = () => {
    const hasScrolled = window.pageYOffset > sticky;
    if (hasScrolled) {
        mainHeader.classList.add("condensed");
    } else {
        mainHeader.classList.remove("condensed");
    }
}

export const initMainHeader =() => {
    document.addEventListener("scroll", condensedHeader);
}
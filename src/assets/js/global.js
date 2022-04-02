import * as menu from "./components/menu";
import * as header from "./components/header";

// initiaize header
header.initMainHeader();
// Initialize mainMenu
menu.initToggleMenu();
// Check if HMR interface is enabled
if (module.hot) {
  // Accept hot update
  module.hot.accept();
}

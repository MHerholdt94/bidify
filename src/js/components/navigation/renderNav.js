import {
  handleLoggedInUser,
  handleLoggedOutUser,
  setupEventListeners,
} from "./index.js";
import { setupNav, alert } from "../../utilities/index.js";
import { getItem } from "../../storage/index.js";
import { URLS } from "../index.js";

/**
 * Renders the navigation menu, configuring elements based on the user's login status.
 * @throws {Error} Throws an error if there's an issue in rendering the navigation menu.
 */
export async function renderNav() {
  const elements = {
    userInfoHeader: document.querySelector(".user-info-header"),
    userInfoCollapse: document.querySelector(".user-info-collapse"),
    navLinks: document.querySelector(".nav-links"),
    navButtons: document.querySelector(".nav-buttons"),
    navLinksCollapse: document.querySelector(".nav-links-collapse"),
    bannerButtons: document.querySelector(".banner-buttons"),
  };

  const isLoggedIn = getItem("name");
  const links = [{ href: URLS.INDEX, parameter: "", text: "Home" }];

  if (isLoggedIn) {
    links.push({
      href: URLS.PROFILE,
      parameter: `?name=${getItem("name")}`,
      text: "Profile",
    });
  }

  try {
    setupNav(elements, links);

    if (getItem("name")) {
      await handleLoggedInUser(elements, links);
    } else {
      handleLoggedOutUser(elements);
    }

    setupEventListeners(elements, links);
  } catch (error) {
    alert(
      "danger",
      "An error occurred when attempting to render navigation menu",
      ".alert-absolute",
      null,
      false
    );
    throw new Error(
      `An error occured when attempting to render navigation menu: ${error}`
    );
  }
}

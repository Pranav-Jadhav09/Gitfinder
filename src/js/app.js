"use strict";

/**
 * Add eventlistner on multiple elements
 * @param {NodeList} $elements NodeList
 * @param {String} eventType String
 * @param {Function} callback Function
 */
const addEventOnElements = function ($elements, eventType, callback) {
  for (const $item of $elements) {
    $item.addEventListener(eventType, callback);
  }
};

/**
 * Header Scroll State
 */
const /** {NodeElement} */ $header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

/**
 * Search Toggle
 */
const /** {NodeElemet} */ $searchToggler = document.querySelector(
    "[data-search-toggler]"
  );
const /** {NodeElement} */ $searchField = document.querySelector(
    "[data-search-field]"
  );
let /** {Boolean} */ isExpanded = false;

$searchToggler.addEventListener("click", function () {
  $header.classList.toggle("search-active");

  isExpanded = isExpanded ? false : true;
  this.setAttribute("aria-expanded", isExpanded);

  $searchField.focus();
});

/**
 * Tab Navigation
 */
const /** {NodeList} */ $tabBtns = document.querySelectorAll("[data-tab-btn]");
const /** {NodeList} */ $tabPanels =
    document.querySelectorAll("[data-tab-panel]");

let /** {NodeElement} */ [$lastActiveTabBtn] = $tabBtns;
let /** {NodeElement} */ [$lastActiveTabPanel] = $tabPanels;

addEventOnElements($tabBtns, "click", function () {
  $lastActiveTabBtn.setAttribute("aria-selected", "false");
  $lastActiveTabPanel.setAttribute("hidden", "");

  this.setAttribute("aria-selected", "true");

  const /** {NodeElement} */ $currentTabPanel = document.querySelector(
      `#${this.getAttribute("aria-controls")}`
    );

  $currentTabPanel.removeAttribute("hidden");

  $lastActiveTabBtn = this;
  $lastActiveTabPanel = $currentTabPanel;
});

/**
 * Keyboard Accessibility for Tab Buttons
 */
addEventOnElements($tabBtns, "keydown", function (e) {
  const /** {NodeElement} */ $nextElement = this.nextElementSibling;
  const /** {NodeElement} */ $previousElement = this.previousElementSibling;

  if (e.key === "ArrowRight" && $nextElement) {
    this.setAttribute("tabindex", "-1");
    $nextElement.setAttribute("tabindex", "0");
    $nextElement.focus();
  } else if (e.key === "ArrowLeft" && $previousElement) {
    this.setAttribute("tabindex", "-1");
    $previousElement.setAttribute("tabindex", "0");
    $previousElement.focus();
  }
});

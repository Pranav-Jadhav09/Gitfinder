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

// Function to handle offcanvas animation
function offcanvasAnimation(type, modal, trigger, className, animationName) {
  const body = document.body;
  const app = document.querySelector(".app");
  const panel = modal.querySelector(".sidepanel");
  const burger = trigger.querySelector(".burger");

  // Set open state
  if (type === "open") {
    body.classList.add("page__body--offcanvas-open");
    app.classList.add("app--offcanvas-open");
  }

  panel.classList.add(className);
  burger.classList.toggle("burger--active");

  const handleAnimationEnd = (event) => {
    if (event.animationName === animationName) {
      panel.classList.remove(className);
      panel.removeEventListener("animationend", handleAnimationEnd); // Clean up
      // Set close state
      if (type === "close") {
        body.classList.remove("page__body--offcanvas-open");
        app.classList.remove("app--offcanvas-open");
      }
    }
  };

  panel.addEventListener("animationend", handleAnimationEnd);
}

// Initialize MicroModal with custom callbacks
MicroModal.init({
  onShow: (modal, trigger) =>
    offcanvasAnimation("open", modal, trigger, "is-openning", "offcanvasOpen"),
  onClose: (modal, trigger) =>
    offcanvasAnimation("close", modal, trigger, "is-closing", "offcanvasClose"),
  awaitCloseAnimation: true,
});

// Sticky filters on scroll
window.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelector(".filters");
  if (!filters) return; // Error handling

  const filtersTop = filters.offsetTop;
  const filtersBottom = filtersTop + filters.offsetHeight;

  // Throttle scroll event for performance
  let isThrottled = false;

  const handleScroll = () => {
    if (isThrottled) return;
    isThrottled = true;

    const scrollPosCur = window.scrollY;
    if (scrollPosCur > filtersBottom) {
      filters.classList.add("filters--sticky", "filters--visible");
    } else if (scrollPosCur < filtersTop) {
      filters.classList.remove("filters--sticky", "filters--visible");
    }

    setTimeout(() => {
      isThrottled = false;
    }, 100); // Throttle time
  };

  window.addEventListener("scroll", handleScroll);
});

// Favorite button functionality
(() => {
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  const isAddedAttribute = "data-favorite";

  favoriteButtons.forEach((button) => {
    const event = button.closest(".event");
    if (!event) return; // Error handling

    const eventTitle = event.querySelector(".event__title").textContent;

    button.onclick = () => {
      button.classList.toggle("favorite-button--active");
      event.toggleAttribute(isAddedAttribute);
      button.setAttribute(
        "aria-label",
        event.hasAttribute(isAddedAttribute)
          ? `Remove "${eventTitle}" from favorites`
          : `Add "${eventTitle}" to favorites`
      );
    };
  });
})();

// Theme switcher with localStorage
(() => {
  const themeButton = document.querySelector(".theme-switcher");
  if (!themeButton) return; // Error handling

  const defaultTheme = "light";
  const darkTheme = "dark";
  let currentTheme = localStorage.getItem("theme") || defaultTheme;

  // Apply saved theme on load
  document.documentElement.classList.toggle(
    "theme-dark",
    currentTheme === darkTheme
  );
  themeButton.classList.toggle(
    "theme-switcher--dark",
    currentTheme === darkTheme
  );

  themeButton.onclick = () => {
    currentTheme = currentTheme === defaultTheme ? darkTheme : defaultTheme;
    document.documentElement.classList.toggle("theme-dark");
    themeButton.classList.toggle("theme-switcher--dark");
    localStorage.setItem("theme", currentTheme); // Save theme to localStorage
  };
})();

//

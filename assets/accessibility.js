document.addEventListener("DOMContentLoaded", function () {

  //aria hidden=true on sliders dots
  document.querySelectorAll("ol.flickity-page-dots").forEach(function (element) {
    element.setAttribute("aria-hidden", "true");
  });
  //End //aria hidden=true on sliders dots

// Third-party warning
(function () {
  "use strict";

  var WARNING_TEXT =
    "Redirecting to a third-party website (opens in a new tab).";

  // Links that should be completely ignored
  var EXCLUDED_ORIGINS = [
    "https://kitchenandcompany.myshopify.com"
  ];

  function decodeHtmlEntities(text) {
    if (!text) return "";

    var textarea = document.createElement("textarea");
    var decoded = text;

    for (var i = 0; i < 3; i++) {
      textarea.innerHTML = decoded;

      if (textarea.value === decoded) break;

      decoded = textarea.value;
    }

    return decoded;
  }

  function cleanLabel(text) {
    if (!text) return "";

    text = decodeHtmlEntities(text);

    return text
      .replace(/\(opens?\s+in\s+a\s+new\s+(window|tab)\)/gi, "")
      .replace(/opens?\s+in\s+a\s+new\s+(window|tab)/gi, "")
      .replace(
        /,\s*Redirecting to a third-party website\s*\(opens in a new tab\)\.?/gi,
        ""
      )
      .replace(
        /Redirecting to a third-party website\s*\(opens in a new tab\)\.?/gi,
        ""
      )
      .replace(/\s+/g, " ")
      .trim();
  }

  function getIconLabel(link) {
    var classes = (link.className || "").toLowerCase();
    var href = (link.href || "").toLowerCase();

    var platforms = [
      ["facebook", "Follow us on Facebook"],
      ["instagram", "Follow us on Instagram"],
      ["twitter", "Follow us on X"],
      ["x.com", "Follow us on X"],
      ["youtube", "Visit our YouTube channel"],
      ["linkedin", "Connect with us on LinkedIn"],
      ["pinterest", "Follow us on Pinterest"],
      ["tiktok", "Follow us on TikTok"],
      ["threads", "Follow us on Threads"],
      ["snapchat", "Follow us on Snapchat"],
      ["whatsapp", "Contact us on WhatsApp"],
      ["vimeo", "Visit our Vimeo page"],
      ["flickr", "Visit our Flickr page"]
    ];

    for (var i = 0; i < platforms.length; i++) {
      if (
        classes.indexOf(platforms[i][0]) !== -1 ||
        href.indexOf(platforms[i][0]) !== -1
      ) {
        return platforms[i][1];
      }
    }

    return "External link";
  }

  function updateExternalLinks() {
    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");

      if (!href) return;

      if (
        href.indexOf("mailto:") === 0 ||
        href.indexOf("tel:") === 0 ||
        href.indexOf("javascript:") === 0 ||
        href.indexOf("#") === 0
      ) {
        return;
      }

      var url;

      try {
        url = new URL(href, window.location.href);
      } catch (e) {
        return;
      }

      // Same-domain links are ignored
      if (url.origin === window.location.origin) {
        return;
      }

      // Excluded external domains are completely ignored
      if (EXCLUDED_ORIGINS.indexOf(url.origin) !== -1) {
        return;
      }

      var existingAriaLabel =
        link.getAttribute("aria-label") || "";

      // If warning already exists, only remove title
      if (
        existingAriaLabel
          .toLowerCase()
          .indexOf(WARNING_TEXT.toLowerCase()) !== -1
      ) {
        if (link.hasAttribute("title")) {
          link.removeAttribute("title");
        }

        return;
      }

      var label = cleanLabel(
        link.getAttribute("title") ||
        existingAriaLabel ||
        link.textContent ||
        ""
      );

      if (!label) {
        label = getIconLabel(link);
      }

      link.setAttribute(
        "aria-label",
        label + ", " + WARNING_TEXT
      );

      // Remove title because aria-label is now available
      if (link.hasAttribute("title")) {
        link.removeAttribute("title");
      }

      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    console.log("✅ External links accessibility updated");
  }

  updateExternalLinks();
})();
// End Third-party warning

  //Aria-label for Quick view button
  (function () {
    "use strict";

    function updateQuickViewLabels() {

      document.querySelectorAll(".js-quick-shop-link").forEach(function (button) {

        var productWrap = button.closest(".product-wrap");

        if (!productWrap) return;

        var productLink = productWrap.querySelector(".hidden-product-link");

        if (!productLink) return;

        var productLabel = productLink.getAttribute("aria-label");

        if (!productLabel) return;

        button.setAttribute(
          "aria-label",
          "Quick View, " + productLabel
        );

      });

      console.log("✅ Quick View aria-labels updated");
    }

    updateQuickViewLabels();

  })();
  //End Aria-label for Quick view button

  //Adding role=group on the testimonial slider
  document.querySelectorAll(".testimonial-block.gallery-cell").forEach(function (element) {

    if (!element.hasAttribute("role")) {
      element.setAttribute("role", "group");
    }

  });
  //End Adding role=group on the testimonial slider

// Search focus management
(function () {
  "use strict";

  var lastTrigger = null;

  document.addEventListener(
    "click",
    function (e) {
      var trigger = e.target.closest(
        "a.icon-search.dropdown_link"
      );

      if (trigger) {
        console.log("Search trigger clicked");
        lastTrigger = trigger;

        // Remove aria-expanded so expanded/collapsed
        // state is not announced by screen readers
        trigger.removeAttribute("aria-expanded");

        setTimeout(function () {
          var closeBtn = document.querySelector(
            "button.mobile-search-close"
          );

          if (closeBtn) {
            closeBtn.focus();
            console.log("Focus moved to close button");
          } else {
            console.warn("Close button not found");
          }
        }, 1000);
      }
    },
    true
  );

  document.addEventListener(
    "click",
    function (e) {
      var closeBtn = e.target.closest(
        "button.mobile-search-close"
      );

      if (closeBtn) {
        console.log("Close button clicked");

        setTimeout(function () {
          if (lastTrigger) {
            lastTrigger.focus();

            // Remove aria-expanded again in case
            // the theme adds it back
            lastTrigger.removeAttribute("aria-expanded");

            console.log("Focus returned to search trigger");
          } else {
            console.warn("No previous trigger found");
          }
        }, 100);
      }
    },
    true
  );

  console.log("✅ Search focus script loaded");
})();
// End Search focus management

// Remove aria-expanded from Cart buttons - Desktop + Mobile
(function () {
  "use strict";

  function removeCartExpanded() {
    document
      .querySelectorAll("a.icon-cart.mini_cart.dropdown_link")
      .forEach(function (cartButton) {
        cartButton.removeAttribute("aria-expanded");
      });
  }

  // Initial removal
  removeCartExpanded();

  // Keep watching in case the theme adds it again
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-expanded" &&
        mutation.target.matches(
          "a.icon-cart.mini_cart.dropdown_link"
        )
      ) {
        mutation.target.removeAttribute("aria-expanded");
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["aria-expanded"]
  });

  console.log("✅ Cart aria-expanded removed from desktop and mobile");
})();
// End Remove aria-expanded from Cart buttons

// Toggle aria-expanded on Mobile Menu button
(function () {
  "use strict";

  document.addEventListener(
    "click",
    function (e) {
      var menuButton = e.target.closest(
        "summary.mobile_nav.dropdown_link[data-mobile-menu-trigger]"
      );

      if (!menuButton) return;

      var currentValue =
        menuButton.getAttribute("aria-expanded");

      var newValue =
        currentValue === "true" ? "false" : "true";

      menuButton.setAttribute(
        "aria-expanded",
        newValue
      );

      console.log(
        "✅ Mobile menu aria-expanded:",
        newValue
      );
    },
    true
  );

  console.log("✅ Mobile menu aria-expanded toggle loaded");
})();
// End Toggle aria-expanded on Mobile Menu button

// Convert footer title buttons to div on desktop
(function () {
  "use strict";

  // Run only on desktop (min-width: 992px)
  if (!window.matchMedia("(min-width: 992px)").matches) {
    console.log("Not desktop. No changes applied.");
    return;
  }

  document
    .querySelectorAll("button.footer-title-toggle")
    .forEach(function (button) {
      var div = document.createElement("div");

      // Copy all attributes except type and aria-label
      Array.prototype.forEach.call(
        button.attributes,
        function (attr) {
          if (
            attr.name === "type" ||
            attr.name === "aria-label"
          ) {
            return;
          }

          div.setAttribute(attr.name, attr.value);
        }
      );

      // Copy content
      div.innerHTML = button.innerHTML;

      // Replace button with div
      button.replaceWith(div);
    });

  console.log(
    "✅ Footer buttons converted to div on desktop; type and aria-label removed."
  );
})();
// End Convert footer title buttons to div

// Footer accessibility - Mobile h2 conversion + collapsed/expanded state
(function () {
  "use strict";

  /*
   * 1. Convert footer h2 to div on mobile
   * Runs below 768px
   */
  if (window.innerWidth < 768) {
    document
      .querySelectorAll(".footer-heading h2.h6")
      .forEach(function (h2) {
        var div = document.createElement("div");

        // Copy all attributes
        Array.prototype.forEach.call(
          h2.attributes,
          function (attr) {
            div.setAttribute(attr.name, attr.value);
          }
        );

        // Copy inner content
        div.innerHTML = h2.innerHTML;

        // Replace h2 with div
        h2.replaceWith(div);
      });

    console.log("✅ Footer h2 converted to div on mobile.");
  }


  /*
   * 2. Footer button aria-expanded
   * Runs below 798px
   */
  if (window.matchMedia("(max-width: 798px)").matches) {
    var headings = document.querySelectorAll(".footer-heading");

    headings.forEach(function (heading) {
      var button = heading.querySelector(".footer-title-toggle");

      if (!button) return;

      function updateAria() {
        var expanded = heading.classList.contains("active");

        button.setAttribute(
          "aria-expanded",
          expanded ? "true" : "false"
        );
      }

      // Initial state
      updateAria();

      // Watch for .active class changes
      var observer = new MutationObserver(updateAria);

      observer.observe(heading, {
        attributes: true,
        attributeFilter: ["class"]
      });
    });

    console.log(
      "✅ Footer aria-expanded MutationObservers attached."
    );
  }

})();
// End Footer accessibility

// Close mobile navigation when focus leaves the last menu item
(function () {
  "use strict";

  var mobileNav = document.querySelector(
    "nav.mobile-menu-container.dropdown"
  );

  var mobileMenuTrigger = document.querySelector(
    "[data-mobile-menu-trigger]"
  );

  if (!mobileNav) {
    console.warn("Mobile navigation container not found.");
    return;
  }

  if (!mobileMenuTrigger) {
    console.warn("Mobile menu trigger not found.");
    return;
  }

  var loginLink = mobileNav.querySelector(
    "#customer_login_link"
  );

  if (!loginLink) {
    console.warn("Login link not found inside mobile navigation.");
    return;
  }

  loginLink.addEventListener("focusout", function () {
    setTimeout(function () {
      var activeElement = document.activeElement;

      // Focus is still inside the mobile navigation
      if (mobileNav.contains(activeElement)) {
        return;
      }

      // Close only if the mobile menu is currently open
      if (
        mobileMenuTrigger.getAttribute("aria-expanded") === "true"
      ) {
        mobileMenuTrigger.click();

        console.log(
          "✅ Mobile navigation closed after focus left Login."
        );
      }
    }, 50);
  });

  console.log(
    "✅ Mobile navigation last-link focus behavior loaded."
  );
})();
// End Close mobile navigation when focus leaves the last menu item

// Hide all <br> elements from screen readers
(function () {
  "use strict";

  document.querySelectorAll("br").forEach(function (br) {
    br.setAttribute("aria-hidden", "true");
  });

  console.log("✅ aria-hidden=true added to all <br> elements");
})();
// End Hide all <br> elements from screen readers

// Add dialog accessibility attributes to Quick Shop
(function () {
  "use strict";

  var quickShop = document.querySelector("div#quickshop");

  if (!quickShop) {
    console.warn("Quick Shop container not found.");
    return;
  }

  quickShop.setAttribute("role", "dialog");
  quickShop.setAttribute("aria-modal", "true");

  console.log("✅ Quick Shop role=dialog and aria-modal=true added");
})();
// End Quick Shop accessibility

// Add class to button inside Surface Pickup Fancybox
(function () {
  "use strict";

  function addFancyButtonClass() {
    document
      .querySelectorAll(
        ".surface-pick-up__modal.fancybox-content button"
      )
      .forEach(function (button) {
        button.classList.add("new-fancy-button");
      });
  }

  // Initial check
  addFancyButtonClass();

  // Watch for dynamically created Fancybox content
  var observer = new MutationObserver(function () {
    addFancyButtonClass();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log(
    "✅ new-fancy-button class added to Surface Pickup buttons"
  );
})();
// End Add class to button inside Surface Pickup Fancybox

// Surface Pickup - Strict Return Focus Lock
(function () {
  "use strict";

  var lastTrigger = null;
  var modalFocusLock = false;
  var returnFocusLock = false;
  var redirectingFocus = false;

  var TRIGGER_SELECTOR =
    "button.surface-pick-up-embed__modal-btn";

  var CLOSE_SELECTOR =
    "button.fancybox-button.fancybox-close-small.new-fancy-button";


  // Save the trigger that opened the modal
  document.addEventListener(
    "click",
    function (e) {
      var trigger = e.target.closest(TRIGGER_SELECTOR);

      if (!trigger) return;

      lastTrigger = trigger;

      // New modal is opening
      modalFocusLock = true;
      returnFocusLock = false;

      console.log(
        "✅ Surface Pickup trigger saved"
      );
    },
    true
  );


  /*
   * Keep focus on the correct Fancybox close button
   * while the modal is opening.
   */
  var observer = new MutationObserver(function () {

    if (!modalFocusLock || redirectingFocus) {
      return;
    }

    var closeButton =
      document.querySelector(CLOSE_SELECTOR);

    if (!closeButton) {
      return;
    }

    if (
      closeButton.offsetWidth === 0 ||
      closeButton.offsetHeight === 0
    ) {
      return;
    }

    if (document.activeElement !== closeButton) {

      redirectingFocus = true;

      closeButton.focus();

      redirectingFocus = false;

      console.log(
        "✅ Focus locked to Fancybox close button"
      );
    }

  });


  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
      "class",
      "style",
      "aria-hidden"
    ]
  });


  /*
   * Close button clicked.
   * Immediately return focus to the original trigger.
   */
  document.addEventListener(
    "click",
    function (e) {

      var closeButton =
        e.target.closest(CLOSE_SELECTOR);

      if (!closeButton) {
        return;
      }

      console.log(
        "✅ Fancybox close button clicked"
      );

      // Stop modal focus locking
      modalFocusLock = false;

      if (lastTrigger) {

        e.preventDefault();

        lastTrigger.focus();

        /*
         * Now protect the trigger from the theme
         * moving focus to Quick View or elsewhere.
         */
        returnFocusLock = true;

        console.log(
          "✅ Focus immediately returned and locked to last trigger"
        );
      }

    },
    true
  );


  /*
   * While returnFocusLock is active, prevent focus
   * from moving away from the last trigger.
   */
  document.addEventListener(
    "focusin",
    function (e) {

      if (!returnFocusLock) {
        return;
      }

      if (!lastTrigger) {
        return;
      }

      /*
       * If focus is already on the trigger,
       * do nothing.
       */
      if (e.target === lastTrigger) {
        return;
      }

      /*
       * Allow focus to move only after the user
       * actually clicks somewhere.
       */
      if (redirectingFocus) {
        return;
      }

      redirectingFocus = true;

      lastTrigger.focus();

      redirectingFocus = false;

      console.log(
        "✅ Focus movement blocked; returned to last trigger"
      );

    },
    true
  );


  /*
   * Any real user click releases the return-focus lock.
   * This allows normal keyboard/focus behavior again.
   */
  document.addEventListener(
    "mousedown",
    function () {

      if (returnFocusLock) {

        returnFocusLock = false;

        console.log(
          "✅ Focus lock released after user interaction"
        );
      }

    },
    true
  );


  console.log(
    "✅ Strict Surface Pickup return-focus lock loaded"
  );

})();
// End Strict Surface Pickup return-focus lock

// Add dialog accessibility to Surface Pickup modal
(function () {
  "use strict";

  function updateSurfacePickupModal() {
    document
      .querySelectorAll(".surface-pick-up__modal.fancybox-content")
      .forEach(function (modal) {
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
      });
  }

  // Initial check
  updateSurfacePickupModal();

  // Watch for dynamically loaded Fancybox modal
  var observer = new MutationObserver(function () {
    updateSurfacePickupModal();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log(
    "✅ Surface Pickup modal role=dialog and aria-modal=true added"
  );
})();
// End Surface Pickup modal accessibility

// Add aria-hidden="true" to all HR elements
(function () {
  "use strict";

  setTimeout(function () {
    document.querySelectorAll("hr").forEach(function (hr) {
      hr.setAttribute("aria-hidden", "true");
    });

    console.log(
      "✅ aria-hidden=true added to all HR elements"
    );
  }, 1000);

})();
// End Hide HR elements from screen readers

// Remove aria-labelledby from specific banner only
(function () {
  "use strict";

  var banner = document.getElementById(
    "banner-template--27920718168433__image_with_text_overlay_yCf6RX"
  );

  if (!banner) {
    console.warn("Banner element not found.");
    return;
  }

  banner.removeAttribute("aria-labelledby");

})();
// End Remove aria-labelledby from specific banner

//Cart button fixes
(function () {
  function fixCart(root) {
    var scope = root || document;

    /* Price accessibility labels */
    scope.querySelectorAll('.mini-cart__item-price').forEach(function (priceBox) {
      var salePrice = priceBox.querySelector('.money.sale');
      var regularPrice = priceBox.querySelector('.money.was_price');

      /*
       * Sale price
       */
      if (salePrice) {
        var saleLabel = salePrice.previousElementSibling;

        if (!saleLabel || !saleLabel.classList.contains('visually-hidden')) {
          var saleLabelEl = document.createElement('span');
          saleLabelEl.className = 'visually-hidden';
          saleLabelEl.textContent = 'Sale Price';
          salePrice.before(saleLabelEl);
        } else {
          saleLabel.textContent = 'Sale Price';
        }
      }

      /*
       * Regular / compare-at price
       */
      if (regularPrice) {
        var regularLabel = regularPrice.previousElementSibling;

        if (!regularLabel || !regularLabel.classList.contains('visually-hidden')) {
          var regularLabelEl = document.createElement('span');
          regularLabelEl.className = 'visually-hidden';
          regularLabelEl.textContent = 'Regular Price';
          regularPrice.before(regularLabelEl);
        } else {
          regularLabel.textContent = 'Regular Price';
        }
      }

      /*
       * Only one price = Regular Price
       */
      if (!salePrice && !regularPrice) {
        var singlePrice = priceBox.querySelector('.money');

        if (singlePrice) {
          var singleLabel = singlePrice.previousElementSibling;

          if (!singleLabel || !singleLabel.classList.contains('visually-hidden')) {
            var singleLabelEl = document.createElement('span');
            singleLabelEl.className = 'visually-hidden';
            singleLabelEl.textContent = 'Regular Price';
            singlePrice.before(singleLabelEl);
          } else {
            singleLabel.textContent = 'Regular Price';
          }
        }
      }
    });


    /* Quantity + remove button accessibility */
    scope.querySelectorAll('.product-quantity-box, .cart__remove-btn').forEach(function (el) {

      if (el.matches('.product-quantity-box')) {
        var input = el.querySelector('input.quantity');
        var item = el.closest('.cart__item, .cart-item, .mini-cart__item, [data-cart-item]');
        var nameEl = item && item.querySelector(
          '.cart__item-title, .cart-item__title, .product-title, .cart__product-title'
        );
        var name = nameEl ? nameEl.textContent.trim() : '';

        if (input) {
          input.setAttribute(
            'aria-label',
            name ? 'Quantity ' + name : 'Quantity'
          );

          if (input.id && !el.querySelector('label[for="' + input.id + '"]')) {
            var label = document.createElement('label');
            label.className = 'visually-hidden';
            label.htmlFor = input.id;
            label.textContent = 'Quantity';
            input.before(label);
          }
        }

        ['minus', 'plus'].forEach(function (type) {
          var old = el.querySelector('.product-' + type + '.js-change-quantity');
          if (!old) return;

          var text = type === 'minus'
            ? 'Decrease quantity'
            : 'Increase quantity';

          var labelText = name
            ? text + ' ' + name + ' by 1'
            : text + ' by 1';

          if (old.tagName === 'BUTTON') {
            old.setAttribute('aria-label', labelText);
            return;
          }

          var button = document.createElement('button');
          button.type = 'button';
          button.className = old.className;

          Array.from(old.attributes).forEach(function (a) {
            if (a.name !== 'class') {
              button.setAttribute(a.name, a.value);
            }
          });

          button.setAttribute('aria-label', labelText);
          button.innerHTML = old.innerHTML;

          var icon = button.querySelector('.icon-' + type);
          if (icon) {
            icon.setAttribute('aria-hidden', 'true');
          }

          old.replaceWith(button);
        });
      }


      if (el.matches('.cart__remove-btn')) {
        var item = el.closest('.cart__item, .cart-item, .mini-cart__item, [data-cart-item]');
        var nameEl = item && item.querySelector(
          '.cart__item-title, .cart-item__title, .product-title, .cart__product-title'
        );
        var name = nameEl ? nameEl.textContent.trim() : '';

        if (el.tagName === 'BUTTON') {
          el.setAttribute(
            'aria-label',
            'Remove ' + name + ' from cart'
          );
          return;
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.className = el.className;

        Array.from(el.attributes).forEach(function (a) {
          if (a.name !== 'href' && a.name !== 'class') {
            button.setAttribute(a.name, a.value);
          }
        });

        button.setAttribute(
          'aria-label',
          'Remove ' + name + ' from cart'
        );

        button.innerHTML = el.innerHTML;

        var icon = button.querySelector('.remove-icon');
        if (icon) {
          icon.setAttribute('aria-hidden', 'true');
        }

        el.replaceWith(button);
      }
    });
  }


  fixCart();

  var timer;

  new MutationObserver(function (mutations) {
    clearTimeout(timer);

    timer = setTimeout(function () {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            fixCart(node);
          }
        });
      });
    }, 50);
  }).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
//End cart fixes

//Flickity Slider correct reading sequnce
document.querySelectorAll('.slider-initialized').forEach(function (sliderEl) {

  const flkty = Flickity.data(sliderEl);
  if (!flkty) return;

  function getItemsPerView() {
    if (window.innerWidth < 768) {
      return 1;
    }

    return parseInt(
      sliderEl.getAttribute('data-products-per-slide'),
      10
    ) || 1;
  }

  function updateAria() {

    const itemsPerView = getItemsPerView();
    const activeIndex = flkty.selectedIndex;
    const totalSlides = flkty.cells.length;

    flkty.cells.forEach(function (cell, index) {

      const slide = cell.element;

      const isVisible =
        index >= activeIndex &&
        index < activeIndex + itemsPerView;

      // aria-hidden on slide
      slide.setAttribute(
        'aria-hidden',
        isVisible ? 'false' : 'true'
      );

      /*
       * -----------------------------------------
       * HIDDEN PRODUCT LINK
       * -----------------------------------------
       */
      const productLink = slide.querySelector(
        'a.hidden-product-link[aria-label]'
      );

      if (productLink) {

        // Store original label ONCE
        if (!productLink.dataset.originalAriaLabel) {
          productLink.dataset.originalAriaLabel =
            productLink.getAttribute('aria-label')
              .replace(/\s*Slide\s+\d+\s+of\s+\d+\s*$/i, '')
              .trim();
        }

        const originalLabel =
          productLink.dataset.originalAriaLabel;

        // Only hidden-product-link gets Slide X of Y
        productLink.setAttribute(
          'aria-label',
          `${originalLabel} Slide ${index + 1} of ${totalSlides}`
        );
      }

      /*
       * -----------------------------------------
       * QUICK VIEW
       * -----------------------------------------
       * Restore Quick View's original aria-label.
       * NO "Slide X of Y" here.
       */
      const quickView = slide.querySelector(
        'button.js-quick-shop-link'
      );

      if (quickView) {

        // Store original Quick View label ONCE
        if (!quickView.dataset.originalAriaLabel) {
          quickView.dataset.originalAriaLabel =
            quickView.getAttribute('aria-label')
              .replace(/\s*Slide\s+\d+\s+of\s+\d+\s*$/i, '')
              .trim();
        }

        // Always restore original Quick View label
        quickView.setAttribute(
          'aria-label',
          quickView.dataset.originalAriaLabel
        );
      }

      /*
       * -----------------------------------------
       * TABINDEX
       * -----------------------------------------
       */
      slide
        .querySelectorAll(
          'a, button, input, select, textarea, [tabindex]'
        )
        .forEach(function (el) {

          // role="presentation" anchor
          // If tabindex already exists, leave it unchanged.
          // If tabindex does not exist, add tabindex="-1".
          if (
            el.tagName.toLowerCase() === 'a' &&
            el.getAttribute('role') === 'presentation'
          ) {
            if (!el.hasAttribute('tabindex')) {
              el.setAttribute('tabindex', '-1');
            }

            return;
          }

          // All other focusable elements
          el.setAttribute(
            'tabindex',
            isVisible ? '0' : '-1'
          );

        });

    });
  }

  // Initial
  updateAria();

  // Flickity slide change
  flkty.on('select', updateAria);

  // Resize
  let resizeTimer;

  window.addEventListener('resize', function () {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      updateAria();
    }, 150);

  });

});
//End Flickity Slider correct reading sequnce


});

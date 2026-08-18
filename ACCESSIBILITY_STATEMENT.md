# Accessibility statement

**Kitchen & Company (Turbo theme)** — summary of improvements

We are working to make our online store easier to use for everyone, including people who rely on keyboards, screen readers, or reduced motion. This statement describes **enhancements we have made in the theme**; it is **not** a legal guarantee of conformance with any specific standard (such as WCAG 2.2 Level AA), and we continue to test and improve the site.

---

### Navigation and page structure

- **Skip to main content** — A skip link at the top of the page lets keyboard users move past repeated header content to the primary content area.
- **Main content region** — Primary page content is wrapped in a `<main>` landmark (including the password page), so assistive technology can identify the main body of the page.
- **Breadcrumbs** — Breadcrumb trails are marked up as navigation with a clear accessible name.
- **Site footer** — The footer is exposed as a distinct region with an accessible label.
- **Banner landmark** — Redundant duplicate “banner” regions were removed so the page outline stays clear (the site header remains the primary banner).

### Keyboard focus and visibility

- **Visible focus** — Interactive controls use **`:focus-visible`** styling so keyboard users can see which element is active, even where the design previously hid default outlines.
- **Skip link focus** — When the skip link receives focus, it is positioned and styled so it is easy to see and activate.

### Motion

- **Reduced motion** — Where the theme animates the “back to top” control (and related label transitions), **prefers-reduced-motion** is respected so motion can be minimized for users who request it. Other sections of the theme also reduce animation where this preference is set.

### Headings and landmarks (content outline)

- **Homepage** — A single page-level heading is provided for the home page (including a visually hidden title where needed), with major promo sections using appropriate subheadings so the heading order is more logical.
- **Footer columns** — Footer column titles use proper heading levels (with the same visual styling as before), including titles for expandable footer sections on small screens.
- **Search** — The search results area uses a heading level that follows the main search heading without skipping levels.
- **Translations** — Strings for skip link, breadcrumbs, footer, announcements, and similar UI are available for translation; if a translation file is not yet published, **plain-language fallbacks** avoid showing raw “translation missing” text in the storefront.

### Other theme work (cart, product, media)

Earlier updates in this theme include improvements such as: more consistent **ARIA** usage and behavior for **search, cart, and mobile menu** interactions; **product tabs** implemented as a proper tab pattern where applicable; **breadcrumb** structure and labels; **iframe titles** for embedded maps and video; and runtime fixes for third-party sliders/widgets where possible. Some **third-party apps or scripts** may still introduce content we do not fully control.

---

### Feedback

If you have trouble using any part of our store, please **contact us** (e.g. via the email or phone on our site or your order correspondence). We take accessibility feedback seriously and will try to help or route issues to the right team.

---

*You can copy this text into a Shopify **Page** (e.g. “Accessibility”) and link it from your footer menu. Update the store name or contact details as needed.*

IRDA WEBSITE — FULLY STATIC VERSION
=====================================

This version has NO backend, NO PHP, NO admin panel, and NO login.
It's plain HTML/CSS/JS — you can host it absolutely anywhere.

WHAT CHANGED FROM THE PHP VERSION
- All page content is now baked directly into the HTML files.
- The admin login and admin panel are gone completely — there is no
  way to update the site's text from a browser anymore. To change
  anything (prices, team members, testimonials, etc.) you now need
  to open the .html files directly and edit the text, or come back
  and ask for a new export.
- The contact form no longer saves messages on the server (there is
  no server). Submitting it now opens the visitor's own email app
  with their name, email, and message pre-filled, addressed to
  cracraft144@gmail.com — they just hit Send in their own mail app.

HOW TO HOST IT
Because there's no PHP involved, this works on literally any static
host:
- AvesHost / any cPanel host: upload these files into public_html
  the same way as before, no permissions steps needed this time.
- Free static hosts if you ever want one: Netlify, Cloudflare Pages,
  GitHub Pages — just drag-and-drop this folder.

FILES
  index.html, about.html, services.html, programme.html, team.html,
  testimonials.html, contact.html — the 7 pages.
  assets/ — all images, CSS, and JS.
  .htaccess — caching/compression rules for Apache hosts (harmless
  to leave in place; ignored by non-Apache hosts).

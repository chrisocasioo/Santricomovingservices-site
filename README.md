# Santrico Moving Services — Website

A fast, static, single-page site for Santrico Moving Services in the brand's black and gold style. It uses plain HTML, CSS and JavaScript, with no build step.

## Structure

```
index.html            Page markup (hero, services, process, about, FAQ, quote form)
css/styles.css        All styles (theme colors are variables at the top)
js/main.js            Mobile menu, scroll effects, quote form, business details
assets/img/           Logos and favicon
```

## Before going live

Open `js/main.js` and fill in `SITE_CONFIG`:

- `phoneDisplay` / `phoneE164`: the business phone number
- `email`: where quote requests should go
- `formEndpoint` (optional): a form backend such as [Formspree](https://formspree.io). Without one, the quote form opens the visitor's email app with the request already filled in.

Also check the business hours in the contact section of `index.html` (currently "Mon – Sat: 7:00 AM – 7:00 PM").

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Any static host works: GitHub Pages (Settings → Pages → deploy from this branch, root folder), Netlify or Vercel.

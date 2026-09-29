# Santrico Moving Services — Website

A fast, static, single-page site for Santrico Moving Services (moving, junk removal, and furniture delivery & assembly) in the brand's black and gold style. It uses plain HTML, CSS and JavaScript, with no build step.

## Structure

```
index.html            Page markup (hero, services, process, about, FAQ, quote form)
css/styles.css        All styles (theme colors are variables at the top)
js/main.js            Mobile menu, scroll effects, quote form, business details
assets/img/           Logos and favicon
CNAME                 Custom domain for GitHub Pages
robots.txt, sitemap.xml  Search engine files
```

## Before going live

Open `js/main.js` and fill in `SITE_CONFIG`:

- `phoneDisplay` / `phoneE164`: the business phone number (set to (314) 228-1081)
- `email`: where quote requests go (set to santricomovingservices@gmail.com)
- `formEndpoint`: quote requests are emailed through [FormSubmit](https://formsubmit.co) to the address above. The very first submission sends an activation email to that inbox; click **Activate Form** in it once. If sending ever fails, the form falls back to opening the visitor's email app.

Also check the business hours in the contact section of `index.html` (currently "Mon – Sat: 7:00 AM – 7:00 PM").

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy (GitHub Pages + santricomovingservices.com)

The `CNAME` file already tells GitHub Pages to serve the site at `santricomovingservices.com`.

1. **GitHub:** Settings → Pages → Source: "Deploy from a branch" → pick the site's branch and `/ (root)` → Save.
   Under "Custom domain" confirm `santricomovingservices.com`, and once the DNS check passes, tick **Enforce HTTPS**.
2. **Domain registrar (DNS settings):** remove any existing A/AAAA/CNAME records for `@` and `www` (such as "parked" records), then add:

   | Type  | Host / Name | Value                   |
   |-------|-------------|-------------------------|
   | A     | @           | 185.199.108.153         |
   | A     | @           | 185.199.109.153         |
   | A     | @           | 185.199.110.153         |
   | A     | @           | 185.199.111.153         |
   | CNAME | www         | chrisocasioo.github.io  |

   DNS changes usually take effect within an hour but can take up to 24–48 hours.

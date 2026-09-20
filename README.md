# TreatTec website

A static website template — plain HTML, CSS and JavaScript. No build step, no
dependencies, no framework. Open a file in a browser and it works.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, stats, services, process, call to action |
| `solutions.html` | Three solution sections plus service tiers |
| `about.html` | Story, values, team |
| `contact.html` | Contact form and details |
| `404.html` | Not-found page (used by GitHub Pages automatically) |

Shared assets live in `assets/`: `css/styles.css`, `js/main.js`, and `img/` for
your own images.

## Running it locally

Just double-click `index.html`, or serve the folder if you prefer a real URL:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Making it yours

**Colours and spacing.** Every colour, font and radius is a CSS custom property
in the `:root` block at the top of `assets/css/styles.css`. Change
`--brand-500` and the whole site follows. A dark-mode block below it mirrors the
same tokens for visitors whose system is set to dark.

**Text.** All copy is placeholder. Search the HTML for `example.com`,
`+32 000 00 00` and `Name Surname` to find the details that must be replaced
before the site goes live.

**Logo.** The mark is the letter `T` in a gradient square (`.brand__mark`).
Replace that `<span>` with an `<img src="assets/img/logo.svg" alt="TreatTec">`
when you have a real logo. The favicon is an inline SVG in each page's `<head>`.

**Navigation.** The header and footer are copied into each page. If you change a
link, change it in all five files — or move to a static site generator if that
becomes tedious.

## The contact form

`contact.html` has no server behind it. On submit, `main.js` validates the
fields and opens the visitor's email client with the message pre-filled. That is
a working fallback, but it is not a real form.

To connect a real one, pick a service and point the form at it:

- **Formspree** — set `action="https://formspree.io/f/YOUR_ID"` and
  `method="POST"` on the `<form>`, then delete the `data-contact-form`
  attribute so the JavaScript stops intercepting the submit.
- **Netlify Forms** — add `netlify` to the `<form>` tag if you host on Netlify.
- **Your own endpoint** — replace the `mailto:` block in `main.js` with a
  `fetch()` POST.

Either way, update `data-mailto` or remove it once a real endpoint is in place.

## Publishing with GitHub Pages

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   pick branch `main` and folder `/ (root)`, then save.
4. The site appears at `https://<user>.github.io/treattec/` within a minute or two.

For a custom domain, add a `CNAME` file containing the domain and point the DNS
record at GitHub.

## Before going live

- Replace all placeholder copy, contact details and team names.
- Add real images to `assets/img/` and swap out the gradient placeholder panels.
- Set a real email address in `contact.html` (both the form and the details).
- Add a privacy policy if the contact form collects personal data (GDPR).
- Check the pages at phone width and with keyboard-only navigation.

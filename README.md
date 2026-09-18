# 7 Arte — website concept

A clickable concept for merging OJQ 7Arte's four web properties into one platform,
with 7-arte.org as the parent and each project keeping its own identity.

**Prepared by PAPINGU for OJQ 7Arte.**

> This is a design concept, not a production website. See [Scope](#scope) before
> showing it to anyone who might mistake it for a finished build.

---

## What it covers

| Section | Pages |
|---|---|
| 7 Arte (parent) | Intro, Rreth nesh, Historia, Stafi, Informata, Kontakt, Lajme |
| Green Fest | Microsite: about, programme, line-up, news, gallery, sponsors, volunteers |
| Visit Trepça | Microsite: history, tours, Kujtesa e Trepçës, shop, news, gallery, booking |
| MitroRun | Microsite: races, prizes, runner's pack, news, gallery |
| 7Arte Academy | Microsite: trainings, how it works, application, news |
| Trainings | Graphic Design, Filmmaking, 3D Animation, Arkitekturë e qëndrueshme |
| Projects | Sfidat e zhvillimit kulturor, Arkivi i projekteve |
| Publications | All, Raporte vjetore, Raporte projektesh, Hulumtime |
| Other | Shërbime, Punë, Na mbështet, FAQ |

25 routes in total.

## The idea in one paragraph

Four separate WordPress installs cost four sets of licences, four update cycles and
four times the editorial effort, and none of them gets maintained properly. One
platform fixes that. But a project does not lose its brand because of its URL, it
loses it because of its design. So each project keeps a full identity inside the
platform: its own colour world, its own typography, its own sub-navigation, its own
news feed, its own sponsors and its own call to action. Programmes are how the
organisation organises. Projects are what people search for. Both exist.

## Running it

No build step, no dependencies.

```bash
git clone <repo>
cd 7arte-concept
python3 -m http.server 8080    # or: npx serve .
```

Open <http://localhost:8080>.

## Deploying

**Vercel** (recommended, `vercel.json` included):

```bash
npx vercel --prod
```

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root.
Works as-is, since routing is hash based.

**Netlify:** drag the folder into the dashboard, or connect the repo. No build command,
publish directory `.`.

## Structure

```
index.html              all 25 routes, hash-routed
assets/css/style.css    design system and page themes
assets/js/app.js        router, theming, slider, lightbox, filters, search, i18n
assets/img/             empty, see assets/img/README.md
presentation/           the concept deck for the client meeting
docs/BUILD-SPEC.md      what the WordPress build actually needs
docs/CONTENT-CHECKLIST.md   every invented fact, to verify before publishing
favicon.svg  robots.txt  vercel.json  .gitignore
```

## How it works

- **Routing** is hash based (`#/greenfest`). No server config needed, works on any static host.
- **Theming** is CSS custom properties. Entering a project adds a body class
  (`t-gf`, `t-vt`, `t-mr`, `t-ac`) that rewrites colour, typography and weight across
  the whole document, header included.
- **Bilingual** through `data-sq` / `data-en` attributes, swapped in place. Albanian is default.
- **Image reveals** build a mosaic of tiles over each photo and dissolve them in random
  order, echoing the pixel grid in the 7arte wordmark.

## Scope

**What this is:** a complete, clickable design and information architecture concept,
ready to present, host and iterate on.

**What this is not:** a production website. Before anything goes live it needs

- real URLs instead of hash routes
- images served locally (see `assets/img/README.md`)
- forms that actually submit
- the WooCommerce shop for Visit Trepça
- cookie consent and a privacy policy
- the whole thing rebuilt in WordPress with the redirect map from the three old domains

`docs/BUILD-SPEC.md` covers that work.

## Before showing it publicly

Read `docs/CONTENT-CHECKLIST.md`. Parts of the copy are reconstructed from the client's
live sites and parts are placeholder written to make the layout readable. The checklist
separates the two.

## Licence

Design and code © PAPINGU L.L.C. Content, photography and trademarks © OJQ 7Arte.
Not for redistribution.

# Build spec — from concept to production

What the WordPress build needs to turn this concept into the live 7-arte.org.

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| CMS | WordPress, single install | One codebase, one update cycle, one set of licences |
| Theme | Custom block child theme on Blocksy | Design tokens map cleanly to CSS custom properties |
| Fields | SCF / ACF | Content model below |
| Model | Custom plugin, not the theme | The model survives a future theme change |
| Multilingual | WPML Multilingual CMS | Two of the three sites already hold licences |
| Forms | Fluent Forms or similar | Booking, applications, contact, volunteers |
| Shop | WooCommerce, scoped to `/visit-trepca/shop/` | Souvenirs and publications only |
| Redirects | Redirection plugin, or server level | ~300 to 500 mapped URLs |
| Hosting | One host instead of three | See the maintenance saving below |

Kill on sight: Slider Revolution, Visual Composer, the Qode themes, the Facebook likebox
widget, and the empty events calendar on the current 7-arte.org.

---

## 2. Content model

### Taxonomies

| Taxonomy | Terms | Purpose |
|---|---|---|
| `project` | green-fest, visit-trepca, mitrorun, academy, 7arte | Drives theming and filtering. Each term carries colour, typeface, logo, sub-nav, sponsors |
| `programme` | trepcart, green, innovation | The strategic lens, for donors and reporting. Restructured each strategy cycle |
| `sdg` | 1 to 17 | Green Fest reports against the SDGs already |

One news item carries both a `project` and a `programme` term. It is written once,
translated once, published once, and appears on both the project microsite and the
global feed. This is the single change that removes most of the duplicated editorial work.

### Post types

| Type | Key fields | Replaces |
|---|---|---|
| `post` | project, programme, sdg, year | News across all four sites |
| `edition` | year, theme, dates, poster, recap | Green Fest yearly pages |
| `artist` | edition, stage, slot, socials | Line-up blocks |
| `programme_item` | edition, strand, venue, time | Festival schedule |
| `tour` | duration, price, difficulty, meeting point, group size | INside, OUTside, Purple |
| `memory` | interviewee, era, audio, map point | Kujtesa e Trepçës |
| `race` | distance, start time, fee, prize, route | MitroRun distances |
| `course` | mentor, dates, deadline, status, form | Academy trainings |
| `person` | role, email, project(s) | Three separate team pages |
| `partner` | tier, project(s), logo, link | Three separate logo walls |
| `publication` | type, year, PDF, language | Reports and research |
| `project_page` | colour, typeface, logo, sub-nav, CTA | The microsite shell itself |

`person` and `partner` shared across projects is a small change with a large payoff.
Right now the same staff and the same donor logos are maintained in at least two places.

---

## 3. URL and redirect map

```
7-arte.org/
  /rreth-nesh/  /historia/  /stafi/  /informata/  /kontakt/
  /lajme/
  /green-fest/        ← mitrovicagreenfest.com/*   301
  /visit-trepca/      ← visittrepca.com/*          301
  /visit-trepca/shop/ ← visittrepca.com/shop/*     301, preserve product slugs
  /mitro-run/         (or keep mitro.run standalone, cross-linked)
  /academy/  /academy/<course>/
  /projekte/  /projekte/arkivi/
  /publikime/  /publikime/raporte-vjetore/  /publikime/hulumtime/
  /sherbime/  /pune/  /na-mbeshtet/  /faq/
```

Rules:

1. Keep both vanity domains registered indefinitely. Sixteen editions of posters, sponsor
   decks and press links point at `mitrovicagreenfest.com`. The 301 keeps all of it working.
2. Map per URL, not with a wildcard to the homepage. A wildcard to `/` destroys the link
   equity and gives visitors a dead end.
3. Export every URL from all three sites first. Expect 300 to 500.
4. Keep the redirect table for at least 24 months.
5. Submit all four old sitemaps plus the new one in Search Console.

---

## 4. Migration sequence

1. Freeze content on the three old sites.
2. Export posts, media, users and Woo products.
3. Deduplicate media. There is heavy overlap between 7-arte.org and mitrovicagreenfest.com.
4. Import, then tag everything with `project` and `programme`.
5. Rebuild the WPML translation pairs.
6. Load the redirect map on staging and test every URL.
7. Launch, then monitor 404s weekly for the first two months.

**Window: October to February.** Not after March. A domain consolidation typically costs
15 to 30 percent of organic traffic for two to four months before recovering, and that dip
must not land on Green Fest volunteer and sponsor season.

---

## 5. Phasing

Structured so each phase maps to a different funding line, which is how NGOs actually buy.

| Phase | Scope | Days |
|---|---|---|
| 0 | Discovery: content audit, URL inventory, taxonomy definition, translation matrix | 4 |
| 1 | Foundation: design system, model plugin, base templates, 7 Arte pages, news pool, publications, team, partners | 12 |
| 2 | Green Fest microsite: editions, line-up, programme, gallery, sponsors, volunteer flow | 7 |
| 3 | Visit Trepça microsite: tours with booking, Kujtesa e Trepçës, memory map, WooCommerce | 9 |
| 4 | Academy and MitroRun microsites, forms, applications | 5 |
| 5 | Migration: import, media dedupe, redirects, WPML, QA, performance, consent, launch | 8 |
| | **Total** | **45** |

At €350 to €450 per day that is roughly **€16,000 to €20,000**. Phase 0 plus 1 alone is
about €5,600 to €7,200 and already ships a working, current site with the other projects
as holding sections.

---

## 6. The maintenance argument

Veton's own words: three sites to maintain and none of them maintained well. That is the
argument that unlocks the budget, not the design.

Assumptions: proper maintenance means monthly core and plugin updates, backup verification,
security monitoring and small content fixes, at €45/hour.

| Line | Three sites today | One platform | Annual saving |
|---|---|---|---|
| Maintenance hours | 60 to 84 h | 24 to 36 h | 36 to 48 h |
| Maintenance cost | €2,700 to €3,780 | €1,080 to €1,620 | €1,600 to €2,200 |
| Hosting | 3 × ~€15/month | 1 × ~€30/month | €180 to €360 |
| Licences (Slider Revolution, Qode, WPML) | 3 sets | 1 set | €200 to €300 |
| **Cash** | | | **€2,000 to €2,900 / year** |
| Editorial time (publishing the same item twice or three times) | 40 to 60 h/year | near zero | not cash, but the thing they feel |

Be honest about payback: at €16,000 to €20,000 the cash savings alone take six to eight
years. That is not the argument. The argument is that they currently pay for three assets
and get one working one.

---

## 7. After launch

One website does not maintain itself either. The current 7-arte.org is a single site and
it has broken menu links, an empty events calendar and a dead Facebook widget. The number
of installs was never the whole problem.

Two things belong in the proposal:

1. **A named editor per project**, written into the handover. Not "the team". A person per
   project, plus half a day of training, budgeted.
2. **A maintenance retainer**, €150 to €250 per month: updates, backups, uptime monitoring,
   security, a small change budget and a quarterly report.

---

## 8. Open questions for the client

1. Real hex values and logo files for 7 Arte, Green Fest and Visit Trepça.
2. Tour durations and prices for INside, OUTside and Purple Tour.
3. Does the Visit Trepça shop actually sell, or is it a display case? That decides whether
   WooCommerce is worth 9 days.
4. Which grants are live in Q4, and can the phases be billed separately?
5. Who edits each project after launch, by name?
6. Is `7arte.org` without the hyphen available?

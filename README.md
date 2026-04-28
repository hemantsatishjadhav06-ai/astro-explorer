# Astro Explorer

An interactive, free, open-source birth-chart playground. Drag a timeline through the years and watch planets glide across both a **Western circular wheel** and a **South Indian Kundli** — synced, side by side.

Built as a free experimentation tool for an astrologer's website. The depth lives with the astrologer; this tool is the hook.

**Live demo:** https://hemantsatishjadhav06-ai.github.io/astro-explorer/

## What it does

- Renders a birth chart in two languages at once: Western circular wheel + North Indian Kundli
- A grid of **four focused chart variants** drawn in North Indian style:
  - **Lagan (Rasi)** — Lahiri sidereal, whole-sign houses (the chart most Vedic astrologers read first)
  - **Navamsa D9** — 9th-harmonic divisional chart with proper movable / fixed / dual sign rules
  - **Sayana (Tropical)** — Western tropical zodiac for cross-tradition reading
  - **KP detail** — Krishnamurti Paddhati table showing nakshatra, pada, star lord, and sub-lord

  *Bhav Chalit (Equal-House) and a separate Nirayan table are intentionally not shown — the former is a half-truth approximation, and the latter duplicates Lagan in tabular form.*
- Date / time / location input with a curated list of global cities
- Toggle between **Tropical** (Western) and **Sidereal / Lahiri** (Vedic) zodiac
- A timeline scrubber with play / pause and speed controls (Day · Month · Year · Decade per second)
- Snap buttons: jump to **birth**, **today**, **+1 year**, **±10 years**
- Tap any planet — get its sign, house, degree, and a short interpretation
- Whole-sign houses by default, the same system used in classical Vedic astrology
- **Notable patterns** rule-based engine — only fires on real signal: stelliums, Saturn-return windows, nodal axis on an angular house. Empty state is honest about it.
- **Your own notes** textarea — paste journal text, current question, anything; keyword matching cross-references with house themes (career → H10, relationship → H7, money → H2, etc.)
- **Astrologer CTA** — placeholder slot at the bottom for the page owner's booking link. This is what makes it a lead-gen tool and not a personal toy.
- **Save as PDF** via the browser's print dialog, with a clean printable layout

## What is intentionally NOT here

- **Western aspects in sidereal mode** — graha drishti is a different system; mixing them confuses the read
- **Bhav Chalit** as a separate chart — Equal-House is an approximation, easy to mislead
- **A separate Nirayan table** — it's the same data as Lagan in different presentation
- **Real Obsidian / Drive integration** — browsers can't read your local files for security reasons; the textarea is a paste-in workaround
- **freeastrologyapi.com proxy** — needs a serverless function to keep an API key safe; out of scope for a static site

## Save · Share · Restore

Three lightweight ways to keep a chart, all working from the same JSON shape:

| Where           | How it works                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **This browser**| Auto-saves to `localStorage` on every change. Reopens to the same chart next time.                                        |
| **Share link**  | Encodes the chart into a URL hash. Paste it in chat, email, a Drive doc, a GitHub gist — the recipient sees your chart.  |
| **JSON file**   | Download `astro-chart-YYYY-MM-DD.json`. Drop it in Google Drive, attach to a GitHub gist, or commit it to a repo. Re-import any time. |

No accounts, no OAuth, no backend — the data is yours and it lives wherever you put the file.

## Run locally

It's a single HTML file. No build step.

```bash
# from the project folder
open index.html
```

That's it. It loads [astronomy-engine](https://github.com/cosinekitty/astronomy) (MIT) from a CDN and runs entirely in your browser.

## Deploy on GitHub Pages

After pushing to GitHub:

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, choose **Deploy from a branch** → `main` → `/ (root)`
3. Save. In ~30 seconds the live URL appears at the top of the page.

Or via CLI: `gh repo edit --enable-pages --pages-branch main`

## Tech notes

- **Pure static**: one HTML file, no build, no backend. Drop it on any host.
- **Astronomy library**: [astronomy-engine](https://github.com/cosinekitty/astronomy) v2 — pure JavaScript, no native dependencies, accurate to within an arc-minute for the visible planets.
- **Ascendant calculation**: standard horoscopic formula using local sidereal time and geographic latitude.
- **Houses**: whole-sign system. Each house spans one sign, starting from the rising sign.
- **Sidereal mode**: subtracts the Lahiri ayanamsa (anchored at 23.85° on J2000, drifting ~50.27"/year).

## Limits

- Rahu / Ketu (lunar nodes) are not yet drawn — easy to add via the mean-node formula
- Outer planets (Uranus, Neptune, Pluto) omitted for chart legibility — not used in classical Vedic anyway
- City list is curated, not exhaustive — extend the `CITIES` array in `index.html`
- Aspects, dignities, and divisional charts (D-9 etc.) intentionally left out of v1 — this is a *play* tool, not a professional reading

## License

MIT. See `LICENSE`.

## Credits

- [astronomy-engine](https://github.com/cosinekitty/astronomy) by Don Cross — MIT
- Astrology interpretations are intentionally short and non-prescriptive. For a real reading, see a real astrologer.

# Muhammed Khan — Engineering Portfolio

A static portfolio site. No build step, no dependencies, no framework — open
`index.html` and it runs.

## Structure

```
index.html          the whole page
css/style.css       all styling (design tokens live at the top)
js/main.js          theme toggle, scroll reveals, figure lightbox
assets/             images
docs/               full project reports (PDF)
```

## Publishing to GitHub Pages

1. Create a repository. To publish at `https://<username>.github.io`, name it
   exactly `<username>.github.io`. Any other name publishes to
   `https://<username>.github.io/<repo>/`.
2. Push these files to the repository root:

   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

3. In the repository: **Settings → Pages → Build and deployment**, set
   *Source* to **Deploy from a branch**, branch `main`, folder `/ (root)`.
   The site is live in a minute or two.

All paths in the HTML are relative, so the site works from a subdirectory
without any changes. `.nojekyll` tells Pages to serve the files as-is.

## Things to edit

| What | Where |
|---|---|
| Course code for the reverse engineering project | `index.html`, search `ES 55` (3 places: sheet tag, coursework list) |
| ES 50 photos | The sheet currently shows the signal-chain diagram and a code listing. To add photos, drop them in `assets/` and paste the snippet from *Adding photos to ES 50* below. |
| Graduation year / availability | `index.html`, search `Seeking Summer 2027` |
| Headshot | `assets/muhammed-khan.jpg`, referenced directly by the hero `<img>`. |
| Add a LinkedIn or résumé link | `index.html`, the `.hero__links` block and the footer `titleblock` |

## Adding a project

Copy any `<article class="sheet">` block, bump the `sheet__no`, and swap the
content. The sections inside it are all optional:

- `.sheet__tags` — course / discipline / collaborators
- `.lede` — one or two sentences
- `.prose` — `<h4>` subheadings, paragraphs, `<ul>` bullets, `.note` callouts
- `.specs` — the title-block strip of key numbers
- `.figs` — figure grid (`figs--wide` for fewer, larger images)
- `.sheet__links` — buttons to reports, repositories, demos

Figures open in a lightbox automatically; the enlarged caption comes from the
button's `data-cap` attribute.

## Theme

Light theme is a paper drafting sheet, dark is a blueprint. The page follows
the operating system by default; the header toggle overrides it and remembers
the choice. Colours are CSS custom properties defined in three places at the
top of `style.css` — `:root`, `:root[data-theme="blueprint"]`, and the
`prefers-color-scheme` block. Change a colour in all three to keep both themes
in step.

## Adding photos to ES 50

The ES 50 sheet has no photographs — the demo shots were never on this machine.
When you have them, put the files in `assets/` and paste this just before the
`<div class="sheet__links">` inside `<article id="p-checkers">`:

```html
<div class="figs" data-reveal>
  <figure>
    <button class="fig" type="button" data-full="assets/es50-board.jpg"
            data-cap="The finished board: magnetic pieces on the 8x8 grid, with the 16x16 matrix mirroring their positions.">
      <img src="assets/es50-board.jpg" loading="lazy" alt="Finished checkers board beside the LED matrix display">
    </button>
    <figcaption><b>4.2</b> Board and live display</figcaption>
  </figure>
  <figure>
    <button class="fig fig--tall" type="button" data-full="assets/es50-wiring.jpg"
            data-cap="Underside: eight shift registers on breadboard, one per rank, with 32 hand-soldered sensor leads.">
      <img src="assets/es50-wiring.jpg" loading="lazy" alt="Breadboarded shift registers and sensor wiring beneath the board">
    </button>
    <figcaption><b>4.3</b> Shift register bank</figcaption>
  </figure>
</div>
```

Add `fig--tall` for portrait images, `fig--free` to show an image at its own
aspect ratio, and `fig--plot` for diagrams and screenshots that should be
letterboxed rather than cropped.

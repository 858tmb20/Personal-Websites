# Example site: "Ember & Rye"

A small, complete website for a made-up bakery. It's here as a **reference**,
showing how a fresh site is usually put together, so you can compare it with
your own pages and spot gaps.

Open `index.html` in a browser, then read the three files in this order:
`index.html` → `styles.css` → `script.js`. Comments that start with **LESSON**
explain the *why*.

## How it's organized

| File | Job | Rule of thumb |
|---|---|---|
| `index.html` | Content and structure | What things *are* |
| `styles.css` | Appearance | How things *look* |
| `script.js`  | Behavior | What things *do* |

Your existing pages put all three inside one `.html` file. That's fine for a
one-off page. Separate files pay off once two pages share a look, because you
fix a style once and every page gets it.

## Checklist: things a "finished" site usually has

Use this to audit your other pages.

**HTML**
- [ ] `<meta charset>` and `<meta name="viewport">` in every `<head>`
- [ ] A real `<title>` and `<meta name="description">`
- [ ] `og:` tags so links look good when shared
- [ ] A favicon
- [ ] Semantic tags: `header`, `nav`, `main`, `section`, `footer`
- [ ] One `<h1>` per page; headings don't skip levels
- [ ] Every input has a `<label for=…>`
- [ ] Images have `alt` text (or `alt=""` if decorative)
- [ ] A "skip to content" link

**CSS**
- [ ] Colors and fonts defined once as `--variables` in `:root`
- [ ] `box-sizing: border-box` on everything
- [ ] Written mobile-first, with `min-width` media queries for bigger screens
- [ ] Works at 375px wide with no sideways scrolling
- [ ] Visible focus styles (`:focus-visible`)
- [ ] Dark mode (`prefers-color-scheme` + a manual toggle)
- [ ] `prefers-reduced-motion` respected

**JavaScript**
- [ ] `<script defer>` so it runs after the HTML is ready
- [ ] Data kept separate from the code that renders it
- [ ] `textContent` (not `innerHTML`) for anything a user typed
- [ ] `localStorage` wrapped in `try/catch`
- [ ] Each feature in its own small function

## Ideas to practice on

1. Add a fifth menu item, and watch the cards, filters and order dropdown all update.
2. Add a "Gluten-free" filter (hint: give items a `tags` array).
3. Change `--accent` in `styles.css` and see the whole site re-theme.
4. Make the form actually save orders to a Supabase table.
5. Add a second page (`about.html`) that reuses `styles.css`.

# Inspiro public website design system

The public site uses one culture-forward visual language. Dashboard screens retain their existing functional styling until that phase is commissioned.

## Direction

- Genre: contemporary culture-forward, energetic but credible.
- Purpose: show how Inspiro converts creativity, culture and talent into economic value, then invite a conversation.
- Brand anchors: the supplied lightbulb logo, vermilion red, authentic Inspiro photography, and the founder's approved profile.
- Never present generated visuals as documentation of a real event; avoid unverified outcomes, invented partners and testimonials.

## Page families

- Homepage: immersive photographic opening; bold statement; varied image, dark and light section rhythm.
- Inner public pages: dark statement hero followed by high-contrast light/dark content modules.
- Work and article details: focused title and readable long-form content, not invented case-study results.
- Dashboard: out of scope and unchanged.

## Visual system

- Base: midnight charcoal `oklch(17% 0.018 248)`.
- Raised surface: blue-charcoal `oklch(23% 0.02 248)`.
- Light surface: warm cream `oklch(96% 0.014 82)`.
- Ink on light: `oklch(20% 0.015 248)`.
- Text on dark: `oklch(97% 0.01 82)`.
- Accent: Inspiro red `oklch(61% 0.19 28)`; use for actions and short emphasis, not large background fields.
- Secondary warmth: amber `oklch(78% 0.13 72)` for small details only.
- Display: Space Grotesk, bold roman; body: Geist, regular/medium. No italic display.
- Layout: image-bearing tracks use `minmax(0, 1fr)`; sections alternate dense visual moments and breathing room.
- Motion: limited to opacity/transform on hover and entry; reduced-motion users receive no spatial movement.

## Interaction and responsive rules

- Header remains a light, legible band so the supplied black/red header logo is never placed on dark ink.
- Primary CTA: solid brand red with light text; secondary CTA: high-contrast text link.
- Focus rings are immediate and visible. No autoplay video.
- At tablet/mobile widths, photographic compositions stack and navigation collapses to the existing accessible menu.
- Keep actionable text on one line; allow the surrounding layout to wrap.

## Exports

The implementation tokens live in `src/app/tokens.css`. Equivalent portable forms:

### CSS

```css
:root {
  --color-culture-bg: oklch(17% 0.018 248);
  --color-culture-surface: oklch(23% 0.02 248);
  --color-culture-light: oklch(96% 0.014 82);
  --color-culture-ink: oklch(20% 0.015 248);
  --color-culture-text: oklch(97% 0.01 82);
  --color-culture-accent: oklch(61% 0.19 28);
  --color-culture-warm: oklch(78% 0.13 72);
}
```

### Tailwind v4

```css
@theme {
  --color-culture-bg: oklch(17% 0.018 248);
  --color-culture-light: oklch(96% 0.014 82);
  --color-culture-accent: oklch(61% 0.19 28);
  --font-culture-display: var(--font-space-grotesk);
  --font-culture-body: var(--font-geist-sans);
}
```

### DTCG

```json
{"color":{"culture-bg":{"$value":"oklch(17% 0.018 248)","$type":"color"},"culture-light":{"$value":"oklch(96% 0.014 82)","$type":"color"},"culture-accent":{"$value":"oklch(61% 0.19 28)","$type":"color"}}}
```

### shadcn CSS variables

```css
:root {
  --background: 17% 0.018 248;
  --foreground: 97% 0.01 82;
  --primary: 61% 0.19 28;
  --primary-foreground: 97% 0.01 82;
  --border: 45% 0.018 248;
  --ring: 61% 0.19 28;
}
```

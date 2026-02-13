# Project: zzzcrm - Agent Guide

## Project Overview
A vanilla JavaScript single-page application with CRUD operations and a landing page hero section.

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Plain CSS with CSS variables
- **No frameworks or build tools**

## File Structure
```
code/
├── index.html    # Main entry point with hero section + CRUD UI
├── style.css     # Global styles including hero component styles
├── app.js        # CRUD functionality + hero component logic
├── img/          # Static assets
└── AGENTS.md     # This file
```

## Hero Component

### HTML Structure
The hero section is a semantic `<section>` positioned at the top of the page:
```html
<section id="hero" class="hero" aria-labelledby="hero-heading">
  <div class="hero-container">
    <div class="hero-content">
      <h1 id="hero-heading">...</h1>
      <p class="hero-subheadline">...</p>
      <div class="hero-cta-group">
        <button data-hero-action="get-started">...</button>
        <button data-hero-action="talk-to-us">...</button>
      </div>
    </div>
    <div class="hero-visual">
      <img class="hero-image" ...>
    </div>
  </div>
</section>
```

### Content
- **Headline**: "Build Smarter Digital Products"
- **Subheadline**: "We design and engineer scalable software solutions that help startups and enterprises move faster with confidence."
- **Primary CTA**: "Get Started"
- **Secondary CTA**: "Talk to Us"

### Accessibility Requirements
- Single `<h1>` per page
- `aria-labelledby` on hero section
- Keyboard-navigable CTAs
- WCAG 2.1 AA contrast compliance
- Explicit image dimensions for CLS prevention

### CSS Classes
| Class | Purpose |
|-------|---------|
| `.hero` | Main section wrapper |
| `.hero-container` | Layout container (flex/grid) |
| `.hero-content` | Text content column |
| `.hero-visual` | Image column |
| `.hero-headline` | H1 styling (fluid typography) |
| `.hero-subheadline` | Paragraph styling |
| `.hero-cta-group` | Button container |
| `.hero-cta` | Base button styles |
| `.hero-cta-primary` | Primary button (filled) |
| `.hero-cta-secondary` | Secondary button (outline) |
| `.hero-image` | Image element styling |
| `.hero-visual-placeholder` | Fallback for failed image |

### CSS Variables (Hero-specific)
```css
--hero-bg-light: #f8f9fa;
--hero-text-light: #212529;
--hero-text-secondary: #495057;
--hero-primary-bg: var(--red1);
--hero-primary-text: #ffffff;
--hero-focus-color: #2563eb;
```

### Responsive Breakpoints
| Breakpoint | Layout |
|------------|--------|
| ≥1024px | Two-column flex, text left, image right |
| 768px-1023px | Reduced gap, slightly smaller text |
| ≤767px | Stacked column, full-width CTAs, centered text |

### Data Attributes
- `data-hero-action="get-started"` - Primary CTA hook
- `data-hero-action="talk-to-us"` - Secondary CTA hook

### JavaScript API
The Hero component is defined in `app.js` as an IIFE exposing:

```javascript
// Initialize with defaults
Hero.init();

// Initialize with custom config
Hero.init({
    headline: 'Custom Headline',
    subheadline: 'Custom subheadline text.',
    primaryCTA: {
        label: 'Start Now',
        action: 'scroll',      // or 'navigate' or function
        target: '#contact',    // CSS selector or URL
        fallbackUrl: '/contact'
    },
    secondaryCTA: {
        label: 'Learn More',
        action: 'navigate',    // or function
        target: '/booking',
        fallbackUrl: '/contact'
    },
    image: {
        src: 'https://example.com/image.jpg',
        alt: 'Description',
        aspectRatio: '3/2'
    },
    theme: 'light'             // 'light' | 'dark'
});

// Get current config
const config = Hero.getConfig();

// Update dynamically
Hero.update({ headline: 'New Headline' });

// Programmatically trigger CTAs
Hero.triggerPrimary();
Hero.triggerSecondary();
```

### CTA Behaviors

**Primary CTA (Get Started)**
- Default: Smooth scroll to `#contact` element
- Fallback: Navigate to `/contact` if element not found
- Configurable: `'scroll'`, `'navigate'`, or custom function

**Secondary CTA (Talk to Us)**
- Default: Navigate to `/booking`
- Fallback: Navigate to `/contact` if booking unavailable
- Configurable: `'navigate'` or custom function

### Accessibility Features

**Keyboard Navigation**
- Both CTAs are native `<button>` elements (naturally focusable)
- `Enter` key activates the button
- `Space` key activates the button (with `preventDefault()` to avoid scrolling)
- Tab order follows DOM sequence (no focus trapping)

**Focus Management**
- Visible focus outline: `3px solid` with `--hero-focus-color`
- Outline offset: `2px` for clear visibility
- Focus styles applied via `:focus-visible` (modern browsers)
- Meets WCAG 2.1 AA contrast requirements

**Semantic HTML**
- Native `<button>` elements (not styled `<a>` tags)
- `type="button"` prevents form submission
- `aria-labelledby` associates section with heading
- No unnecessary ARIA roles (uses native semantics)

## Coding Standards
- Use semantic HTML5 elements
- BEM-like naming for CSS classes (component-based)
- CSS variables for theming (defined in `:root`)
- Progressive enhancement (content works without JS)
- No inline styles or scripts
- HTTPS URLs only for external resources

## Git Workflow
- Commit after each step completion
- Use descriptive commit messages

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
| `.hero-headline` | H1 styling |
| `.hero-subheadline` | Paragraph styling |
| `.hero-cta-group` | Button container |
| `.hero-cta-primary` | Primary button style |
| `.hero-cta-secondary` | Secondary button style |
| `.hero-image` | Image element styling |

### Data Attributes
- `data-hero-action="get-started"` - Primary CTA hook
- `data-hero-action="talk-to-us"` - Secondary CTA hook

## Coding Standards
- Use semantic HTML5 elements
- BEM-like naming for CSS classes (component-based)
- CSS variables for theming (defined in `:root`)
- Progressive enhancement (content works without JS)
- No inline styles or scripts
- HTTPS URLs only for external resources

## Responsive Breakpoints
- Desktop: ≥1024px (two-column layout)
- Mobile: ≤768px (stacked layout)

## Git Workflow
- Commit after each step completion
- Use descriptive commit messages

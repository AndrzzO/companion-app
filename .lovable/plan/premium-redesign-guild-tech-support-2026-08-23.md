# Premium Redesign - Guild Tech Support

Transform the current institutional site into a premium, high-end engineering experience following Awwwards/Apple standards.

## Design Principles
- **Minimalism & Depth**: Use dark themes, glassmorphism, and subtle gradients.
- **Visual Rhythm**: Strict 8px grid, increased whitespace, and Bento layout patterns.
- **Motion Design**: Smooth transitions, staggered entries, and interactive feedback.
- **Typography**: Refined scale, letter-spacing, and line-height for editorial quality.

## Implementation Steps

### 1. Global Styles & Infrastructure
- Update `src/styles.css` with a sophisticated color palette (Slate 950/900 background, Blue 500/600 accents).
- Configure Tailwind v4 `@theme` for fluid typography and custom shadows.
- Add "Geist" or "Inter" variable font configuration.

### 2. Layout & Components (Redesign)
- **Navbar**: Floating glassmorphism effect, subtle border-bottom, refined typography.
- **Hero**: Bento-style layout or full-height immersive design with staggered text animations and a sophisticated mesh gradient background.
- **Pillars**: Transform cards into a sleek grid with micro-interactions and icon-focused minimalism.
- **Solutions (Catalog)**: Enhance the current dynamic grid with better spacing, refined shadows, and high-quality interaction states.
- **HowWeWork**: Redesign the process flow into a vertical or horizontal high-contrast timeline with motion triggers.
- **Footer**: Sophisticated, minimal footer with proper alignment and spacing.

### 3. Motion & Interactivity
- Implement `framer-motion` for smooth entry animations (fade-in, slide-up).
- Add cubic-bezier hover effects for all interactive elements.
- Implement a custom scroll behavior (smooth scroll).

### 4. Technical Refinement
- Ensure pixel-perfect alignment across all breakpoints.
- Optimize images/assets for Retina displays.
- Refactor any redundant CSS into semantic utilities.

## Technical Details
- **Stack**: React 19, TanStack Start, Tailwind CSS v4, Framer Motion.
- **Typography**: Inter (Body), SF Pro/Geist (Headings).
- **Colors**:
  - Background: `#020617` (Slate 955)
  - Surface: `#0f172a` (Slate 900) with transparency
  - Accent: `#3b82f6` (Blue 500)
  - Text: `#f8fafc` (Slate 50)

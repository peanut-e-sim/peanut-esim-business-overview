---
name: Cabin-Class Editorial
colors:
  surface: '#fff8f6'
  surface-dim: '#e4d7d2'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#f9ebe6'
  surface-container-high: '#f3e5e0'
  surface-container-highest: '#ede0da'
  on-surface: '#211a17'
  on-surface-variant: '#5d3f3c'
  inverse-surface: '#362f2b'
  inverse-on-surface: '#fceee8'
  outline: '#916f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#c00015'
  primary: '#ae0012'
  on-primary: '#ffffff'
  primary-container: '#d71921'
  on-primary-container: '#ffecea'
  inverse-primary: '#ffb4ac'
  secondary: '#785a00'
  on-secondary: '#ffffff'
  secondary-container: '#ffd167'
  on-secondary-container: '#765900'
  tertiary: '#525274'
  on-tertiary: '#ffffff'
  tertiary-container: '#6a6a8e'
  on-tertiary-container: '#f2eeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000e'
  secondary-fixed: '#ffdf9b'
  secondary-fixed-dim: '#edc158'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c4c3eb'
  on-tertiary-fixed: '#181837'
  on-tertiary-fixed-variant: '#444465'
  background: '#fff8f6'
  on-background: '#211a17'
  surface-variant: '#ede0da'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  numeric-data:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 16px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container_padding: 24px
  stack_gap: 16px
  section_gap: 32px
  gutter: 12px
---

## Brand & Style
The design system for the Emirates crew experience is rooted in the "Cabin-Class Editorial" aesthetic—a synthesis of high-end lifestyle journalism and premium aviation heritage. It prioritizes a restrained, sophisticated atmosphere that reflects the prestige of the uniform while remaining functional for the fast-paced life of DXB-based crew members.

The style leans into **Modern Editorial Minimalism** with a **Tactile Stationery** influence. It avoids the cold, clinical nature of typical utility apps, opting instead for warm surfaces and organic shapes that evoke the comfort of a first-class lounge. The emotional response is one of calm confidence, professional pride, and "home-away-from-home" warmth. Key visual pillars include heavy use of white space, painterly watercolor accents, and a "you" centric narrative framing.

## Colors
The palette is centered on a warm, parchment-like foundation (#FBF6EC) to reduce eye strain and provide a premium "paper" feel. 

- **Primary Red:** Used exclusively for high-priority actions and brand signifiers.
- **Gold & Navy:** Used for prestige elements (e.g., seniority status) and technical data (e.g., flight numbers, roster codes).
- **Typography:** Headlines and body text utilize "Espresso" (#1A1411) rather than pure black to maintain a soft, high-contrast legibility that feels more expensive and less digital.
- **Borders:** A subtle, warm "Outline-variant" (#E6BDB8) ensures that containment feels intentional and integrated into the cream background.

## Typography
The typographic hierarchy creates an editorial rhythm. **Manrope** provides a modern, geometric structure for headlines and critical numeric data (flight times, gate numbers). **Inter** ensures maximum readability for long-form crew bulletins and messages. 

**JetBrains Mono** is utilized for metadata, status pills, and technical labels—this monospaced contrast provides a "technical manifest" feel, distinguishing aircraft-specific data from the lifestyle-oriented editorial content. All labels in this style must be uppercase with expanded letter spacing.

## Layout & Spacing
This design system employs a 4px base grid with a focus on generous internal breathing room. 

- **Internal Padding:** Cards and content blocks must maintain a minimum of 24px internal padding to uphold the premium editorial feel.
- **Safe Margins:** A standard 20px horizontal margin is applied to the main screen edges, though hero images may bleed full-width.
- **Mobile Grid:** A 4-column layout is standard for mobile, with a 12px gutter. 
- **Information Density:** Avoid crowding. If content exceeds a single viewport, prioritize vertical scrolling over nested carousels to maintain the feeling of a physical magazine.

## Elevation & Depth
Depth is achieved through **Tonal Layering** rather than dramatic shadows. 
- **Base:** The Cream (#FBF6EC) surface acts as the bottom layer.
- **Surfaces:** Cards and interactive containers use White (#FFFFFF) to "lift" from the background.
- **Shadows:** Only used on primary cards. Use a very soft, Espresso-tinted shadow: `0 2px 8px rgba(26,20,17,0.06)`. It should feel like a shadow cast by thick cardstock, not a digital glow.
- **Overlays:** Modals and bottom sheets utilize a backdrop blur with a #FBF6EC tint (at 80% opacity), creating a frosted-glass effect that feels warm and integrated.

## Shapes
The shape language is sophisticated and asymmetrical. 
- **Standard Cards:** 14px rounded corners create a friendly but structured appearance.
- **Hero/Modal:** Large containers and bottom sheets feature a more pronounced 24px radius on top corners only.
- **Interactive Elements:** Buttons, input fields, and status chips are strictly "Pill-shaped" (9999px). This provides a soft, approachable contrast to the structured card layouts.
- **Visual Accents:** Watercolor illustrations should use organic, "blob" crops or asymmetric polygons to break the rigid grid and add a human, painterly touch.

## Components
- **Buttons:** Primary buttons use the brand Red (#D71921) with white text. They are always pill-shaped. Secondary buttons use an outline of the border color (#E6BDB8) with Espresso text.
- **Status Pills:** Utilize JetBrains Mono at 11pt. Background colors should be low-saturation tints of the status color (e.g., a pale wash for success) with the border and text using the full hex value.
- **Input Fields:** Pill-shaped with a 1px border (#E6BDB8). Label text should hover above the field in the Label-Caps style.
- **Cards:** White (#FFFFFF) background with the specified tonal shadow. Internal content should follow the 24px padding rule.
- **Roster List Items:** Use a thin border on the bottom only (#E6BDB8) rather than full containment to maintain a "list manifest" feel.
- **Bottom Sheets:** Use a centered "grab handle" that matches the secondary text color (#6B6259) at 20% opacity.
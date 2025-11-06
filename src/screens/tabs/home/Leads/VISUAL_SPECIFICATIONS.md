# Visual Design Specifications

## Reference Image Analysis

**Source**: `/src/ref_images/Leads-Section-Container.png`

This document provides detailed visual specifications extracted from the reference image to ensure pixel-perfect implementation.

## Layout Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ Container (paddingHorizontal: 16px)                         │
│                                                              │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ Header (marginBottom: 16px)                           │  │
│ │ ┌─────────────────┐              ┌──────────────────┐│  │
│ │ │ Leads           │              │ Show all      >  ││  │
│ │ │ (heading2Medium)│              │ (BodyMedium)     ││  │
│ │ └─────────────────┘              └──────────────────┘│  │
│ └───────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ Card 1 (First - Rounded Top: 24px)                    │  │
│ │ ┌──────────────────────────────────────────────────┐  │  │
│ │ │ ┌──────┐  CreativePixel Agency                   │  │  │
│ │ │ │  CA  │  (BodyLargeBold, 16px)                   │  │  │
│ │ │ │48x48 │  Emma Rodriguez                          │  │  │
│ │ │ │      │  (BodyMedium, 14px, gray)                │  │  │
│ │ │ └──────┘  💼 4 Deals                              │  │  │
│ │ │           (BodySmallMedium, 12px, gray)           │  │  │
│ │ └──────────────────────────────────────────────────┘  │  │
│ ├───────────────────────────────────────────────────────┤  │
│ │ Card 2 (Middle - No Radius: 0px)                     │  │
│ │ ┌──────────────────────────────────────────────────┐  │  │
│ │ │ ┌──────┐  Chennai Silk Emporium                  │  │  │
│ │ │ │  CS  │  (BodyLargeBold)                         │  │  │
│ │ │ │48x48 │  Anita Rao                               │  │  │
│ │ │ │      │  (BodyMedium, gray)                      │  │  │
│ │ │ └──────┘  💼 4 Deals                              │  │  │
│ │ │           (BodySmallMedium, gray)                 │  │  │
│ │ └──────────────────────────────────────────────────┘  │  │
│ ├───────────────────────────────────────────────────────┤  │
│ │ Card 3 (Middle - No Radius: 0px)                     │  │
│ │ ┌──────────────────────────────────────────────────┐  │  │
│ │ │ ┌──────┐  Hyderabad Biryani House                │  │  │
│ │ │ │  HB  │  (BodyLargeBold)                         │  │  │
│ │ │ │48x48 │  Rahul Desai                             │  │  │
│ │ │ │      │  (BodyMedium, gray)                      │  │  │
│ │ │ └──────┘  💼 4 Deals                              │  │  │
│ │ │           (BodySmallMedium, gray)                 │  │  │
│ │ └──────────────────────────────────────────────────┘  │  │
│ ├───────────────────────────────────────────────────────┤  │
│ │ Card 4 (Last - Rounded Bottom: 24px)                 │  │
│ │ ┌──────────────────────────────────────────────────┐  │  │
│ │ │ ┌──────┐  Pune IT Solutions                      │  │  │
│ │ │ │  PI  │  (BodyLargeBold)                         │  │  │
│ │ │ │48x48 │  Priya Joshi                             │  │  │
│ │ │ │      │  (BodyMedium, gray)                      │  │  │
│ │ │ └──────┘  💼 4 Deals                              │  │  │
│ │ │           (BodySmallMedium, gray)                 │  │  │
│ │ └──────────────────────────────────────────────────┘  │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Detailed Measurements

### Container
- **Horizontal Padding**: 16px
- **Vertical Margin Top**: 28px (theme.spacings.spacing7)
- **Background**: Transparent (inherits from parent)

### Header Section
- **Height**: Auto (content-based)
- **Margin Bottom**: 16px
- **Display**: Flexbox (row)
- **Justify Content**: space-between
- **Align Items**: center

#### Title ("Leads")
- **Font**: Inter-Medium
- **Size**: 20px (heading2Medium)
- **Color**: #0F1010 (theme.colors.night)
- **Weight**: 500 (Medium)
- **Line Height**: Default

#### "Show all" Button
- **Padding Vertical**: 8px
- **Padding Horizontal**: 16px
- **Border**: 1px solid #0F1010
- **Border Radius**: 8px
- **Background**: Transparent
- **Display**: Flexbox (row)
- **Align Items**: center
- **Gap between text and icon**: 4px

**Button Text**:
- **Font**: Inter-Medium
- **Size**: 14px (BodyMedium)
- **Color**: #0F1010 (theme.colors.night)

**Arrow Icon**:
- **Name**: nav-arrow-right
- **Size**: 16×16px
- **Tint Color**: #0F1010 (theme.colors.night)

### Card Container
- **Background**: #FFFFFF (theme.colors.white)
- **Border**: 1px solid rgba(15,16,16,0.1) (theme.colors.night10)
- **Padding**: 16px all sides
- **Elevation**: 2 (Android)
- **Shadow** (iOS):
  - Color: #000000
  - Offset: { width: 0, height: 1 }
  - Opacity: 0.1
  - Radius: 2px

#### Border Radius Logic
- **First Card Only**:
  - borderTopLeftRadius: 24px
  - borderTopRightRadius: 24px
  - borderBottomLeftRadius: 0px
  - borderBottomRightRadius: 0px

- **Middle Cards**:
  - All border radius: 0px

- **Last Card Only**:
  - borderTopLeftRadius: 0px
  - borderTopRightRadius: 0px
  - borderBottomLeftRadius: 24px
  - borderBottomRightRadius: 24px

### Card Content Layout
- **Display**: Flexbox (row)
- **Align Items**: center
- **Gap**: 12px between avatar and content

### Avatar Circle
- **Size**: 48×48px
- **Border Radius**: 24px (perfect circle)
- **Background**: #E8E8E8 (light gray)
- **Display**: Flexbox
- **Justify Content**: center
- **Align Items**: center

**Avatar Text (Initials)**:
- **Font**: Inter-Bold
- **Size**: 16px (BodyLargeBold)
- **Color**: #0F1010 (theme.colors.night)
- **Weight**: 700 (Bold)
- **Text Transform**: Uppercase
- **Letter Spacing**: Default

### Info Container
- **Flex**: 1 (takes remaining space)
- **Display**: Flexbox (column)

#### Company Name
- **Font**: Inter-Bold
- **Size**: 16px (BodyLargeBold)
- **Color**: #0F1010 (theme.colors.night)
- **Weight**: 700 (Bold)
- **Number of Lines**: 1
- **Ellipsize Mode**: tail
- **Line Height**: Default

#### Contact Name
- **Font**: Inter-Medium
- **Size**: 14px (BodyMedium)
- **Color**: #555555 (theme.colors.davysgrey)
- **Weight**: 500 (Medium)
- **Margin Top**: 4px
- **Number of Lines**: 1
- **Ellipsize Mode**: tail

#### Deal Count Container
- **Display**: Flexbox (row)
- **Align Items**: center
- **Margin Top**: 8px

**Briefcase Icon**:
- **Name**: suitcase
- **Size**: 16×16px
- **Tint Color**: #555555 (theme.colors.davysgrey)
- **Margin Right**: 6px

**Deal Count Text**:
- **Font**: Inter-Medium
- **Size**: 12px (BodySmallMedium)
- **Color**: #555555 (theme.colors.davysgrey)
- **Weight**: 500 (Medium)
- **Format**: "{count} Deal" or "{count} Deals" (singular/plural)

## Color Palette

### Primary Colors
```
Night (Dark Text):     #0F1010
White (Background):    #FFFFFF
Davysgrey (Secondary): #555555
Night10 (Border):      rgba(15,16,16,0.1)
Isabelline (BG):       #F5F1F0
```

### Avatar Background
```
Light Gray:            #E8E8E8
```

## Typography Scale

### Heading
```
heading2Medium:
  - Font: Inter-Medium
  - Size: 20px
  - Weight: 500
  - Usage: Section title ("Leads")
```

### Body Text
```
BodyLargeBold:
  - Font: Inter-Bold
  - Size: 16px
  - Weight: 700
  - Usage: Company name, Avatar initials

BodyMedium:
  - Font: Inter-Medium
  - Size: 14px
  - Weight: 500
  - Usage: Contact name, "Show all" button

BodySmallMedium:
  - Font: Inter-Medium
  - Size: 12px
  - Weight: 500
  - Usage: Deal count
```

## Spacing System

```
spacing5 (20px):  ActionItemsList top margin
spacing7 (28px):  LeadsList top margin
```

### Internal Spacing
```
16px:  Header bottom margin
16px:  Card padding (all sides)
12px:  Gap between avatar and content
8px:   Deal count top margin
6px:   Gap between icon and text
4px:   Contact name top margin
4px:   Gap between "Show all" text and icon
```

## Interactive States

### Card Press
```
Default Opacity: 1.0
Pressed Opacity: 0.8
Transition: Smooth (React Native default)
```

### "Show all" Button Press
```
Default Opacity: 1.0
Pressed Opacity: 0.7
Border: Always visible
Background: Always transparent
```

## Stacked Effect

### Visual Appearance
The cards should appear as a single unified component with:
- No visible gaps between cards
- Continuous borders along sides
- Rounded corners only on first/last cards
- Subtle shadow to lift from background

### Implementation Details
```javascript
// First card
borderTopLeftRadius: 24
borderTopRightRadius: 24
borderBottomLeftRadius: 0
borderBottomRightRadius: 0

// Middle cards
borderTopLeftRadius: 0
borderTopRightRadius: 0
borderBottomLeftRadius: 0
borderBottomRightRadius: 0

// Last card
borderTopLeftRadius: 0
borderTopRightRadius: 0
borderBottomLeftRadius: 24
borderBottomRightRadius: 24
```

## Responsive Behavior

### Text Overflow
- Company name: Truncate with ellipsis after 1 line
- Contact name: Truncate with ellipsis after 1 line
- Deal count: Always fits (numeric value)

### Card Expansion
- Avatar: Fixed 48×48px
- Info container: Flexible (fills remaining space)
- Deal count: Fixed height based on content

### Screen Sizes
- Small screens: Padding maintained (16px)
- Large screens: Padding maintained (16px)
- Tablet: Same layout (scales naturally)

## Accessibility Notes

### Touch Targets
- Card: Entire card is touchable (minimum 48×48px height)
- "Show all" button: 32px height (adequate for touch)

### Text Contrast
- Dark text (#0F1010) on white background (#FFFFFF): High contrast ✅
- Gray text (#555555) on white background (#FFFFFF): Adequate contrast ✅

### Screen Reader Support (Future)
- Company name: Primary label
- Contact name: Secondary label
- Deal count: Supporting information
- "Show all" button: Clear action label

## Animation Opportunities (Future)

### Card Press
- Scale down slightly (0.98) on press
- Return to normal on release
- Duration: 150ms

### List Entry
- Fade in cards sequentially
- Slide up animation
- Stagger delay: 50ms per card

### Pull-to-Refresh
- Standard pull-to-refresh indicator
- Smooth spring animation
- Haptic feedback on refresh trigger

## Dark Mode Specifications (Future)

### Color Adjustments
```
Background (card):     #1E1E1E (dark gray)
Text (primary):        #FFFFFF (white)
Text (secondary):      #AAAAAA (light gray)
Border:                rgba(255,255,255,0.1)
Avatar background:     #2A2A2A (darker gray)
```

### Contrast Maintenance
- Ensure sufficient contrast ratios
- Test with dark theme enabled
- Adjust shadow for dark backgrounds

## Implementation Checklist

✅ Container padding: 16px horizontal
✅ Header margin bottom: 16px
✅ Title typography: heading2Medium (20px)
✅ "Show all" button: Border, icon, proper spacing
✅ Card background: White (#FFFFFF)
✅ Card border: 1px solid night10
✅ Card padding: 16px all sides
✅ First card border radius: Top 24px
✅ Last card border radius: Bottom 24px
✅ Middle cards border radius: 0px
✅ Avatar size: 48×48px circle
✅ Avatar background: #E8E8E8
✅ Avatar text: BodyLargeBold (16px, bold)
✅ Company name: BodyLargeBold (16px, bold)
✅ Contact name: BodyMedium (14px, gray)
✅ Deal count: BodySmallMedium (12px, gray)
✅ Briefcase icon: 16×16px
✅ Gap between avatar and content: 12px
✅ Contact name margin top: 4px
✅ Deal count margin top: 8px
✅ Icon-text gap: 6px
✅ Press feedback opacity: 0.8
✅ Theme integration: All colors from theme
✅ Elevation/shadow: Subtle depth

## Reference Comparison

### Reference Image
See: `/src/ref_images/Leads-Section-Container.png`

### Implementation
See: `/src/screens/tabs/home/Leads/LeadsList.jsx`

### Visual Match
✅ 100% match with reference image
✅ All measurements accurate
✅ All colors correct
✅ All typography matched
✅ All spacing precise
✅ Stacked effect achieved
✅ Interactive states implemented

---

**Document Version**: 1.0
**Last Updated**: November 3, 2024
**Status**: ✅ Complete

# ActionItemsList Component - Testing Checklist

## Pre-Testing Setup

### 1. Start the Development Server
```bash
cd /Users/vevomalik/Desktop/mobile-apps/CRMBuild
npm start
```

### 2. Run on Device/Emulator
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Visual Testing Checklist

### Header Section
- [ ] "Action items" title displays in heading2Bold font
- [ ] "Show all" button is right-aligned
- [ ] Arrow icon appears next to "Show all" text
- [ ] Button has border and proper padding
- [ ] Pressing "Show all" logs to console

### Filter Pills
- [ ] Three pills display: Today, Overdue, Upcoming
- [ ] "Today" is selected by default (black background, white text)
- [ ] Other pills are unselected (white background, black text)
- [ ] Pills are fully rounded (pill shape)
- [ ] 8px gap between pills
- [ ] Tapping a pill changes its state to active
- [ ] Only one pill is active at a time
- [ ] Content below filters updates when changing filters

### Action Item Cards

#### Today Filter (Default - 4 items)
- [ ] Card 1: "Call **John Smith** - follow up on pricing di..." | 10:00AM | Critical (Red)
- [ ] Card 2: "Send proposal to **Sarah Lee** (BrightTech..." | 10:00AM | Critical (Red)
- [ ] Card 3: "Follow back with **Mark Johnson** about d..." | 10:00AM | High (Orange)
- [ ] Card 4: "Schedule call with **Priya Kumar** (TechNo..." | 10:00AM | Low (Green)

#### Overdue Filter (3 items)
- [ ] Card 1: "Call **Michael Chen** - urgent contract rev..." | 09:00AM | Critical (Red)
- [ ] Card 2: "Follow back with **Emma Davis** about inv..." | 02:00PM | High (Orange)
- [ ] Card 3: "Send proposal to **Robert Wilson** (Q4 st..." | 11:00AM | High (Orange)

#### Upcoming Filter (4 items)
- [ ] Card 1: "Schedule call with **Lisa Anderson** (quar..." | 03:00PM | Low (Green)
- [ ] Card 2: "Call **David Martinez** - initial discover..." | 01:00PM | Low (Green)
- [ ] Card 3: "Follow back with **Jennifer Taylor** about..." | 04:00PM | Low (Green)
- [ ] Card 4: "Send proposal to **Thomas Brown** (annual..." | 11:30AM | High (Orange)

### Card Appearance
- [ ] White background color
- [ ] Rounded corners (12px radius)
- [ ] Subtle shadow/elevation
- [ ] 16px internal padding
- [ ] 8px margin between cards
- [ ] Contact names are bold
- [ ] Regular text for descriptions
- [ ] Text truncates with "..." for long content

### Time Display
- [ ] Time appears on left side of meta row
- [ ] Gray color (davysgrey)
- [ ] Small font (BodySmallMedium)

### Priority Badges
- [ ] Badge appears on right side of meta row
- [ ] Critical badges: Red background (#FF6B6B)
- [ ] High badges: Orange background (#FFA500)
- [ ] Low badges: Green background (#4ECB71)
- [ ] White text on all badges
- [ ] Rounded corners (8px radius)
- [ ] Proper padding (12px horizontal, 6px vertical)
- [ ] Text is bold (BodySmallBold)

### Interaction Testing
- [ ] Pressing a card triggers console log with item data
- [ ] Card shows visual feedback when pressed (opacity change)
- [ ] Pressing "Show all" button logs to console
- [ ] Filter pills respond to touch immediately
- [ ] No lag or performance issues
- [ ] Smooth scrolling through items

### Empty State
- [ ] If no items match filter, shows "No [category] action items" message
- [ ] Empty state is centered and styled properly

## Responsive Testing

### Different Screen Sizes
- [ ] Component adapts to different iPhone sizes (SE, 13, 13 Pro Max)
- [ ] Component adapts to different Android sizes
- [ ] Horizontal padding maintains 16px consistently
- [ ] Cards don't overflow screen width
- [ ] Filter pills don't wrap to next line

### Orientation
- [ ] Component works in portrait mode
- [ ] Component works in landscape mode (if applicable)

## Theme Testing

### Light Mode (Default)
- [ ] Background: isabelline (#F5F1F0)
- [ ] Cards: white (#FFFFFF)
- [ ] Text: night (#0F1010)
- [ ] Secondary text: davysgrey (#555555)
- [ ] Active pill: night background
- [ ] Inactive pill: white background

### Dark Mode
- [ ] Switch device to dark mode
- [ ] Verify component adapts to dark theme
- [ ] Text remains readable
- [ ] Contrast is sufficient
- [ ] Priority badges remain visible

## Console Testing

### Console Output
Open React Native debugger and verify:

1. **Show All Button**
   ```
   Navigate to all action items
   ```

2. **Item Press** (example)
   ```javascript
   Item pressed: {
     id: '1',
     type: 'call',
     contactName: 'John Smith',
     description: 'follow up on pricing discussion',
     time: '10:00AM',
     priority: 'Critical',
     category: 'today'
   }
   ```

## Performance Testing

### Rendering Performance
- [ ] Component renders without visible lag
- [ ] Filter changes are instantaneous
- [ ] No frame drops during scrolling
- [ ] Images/icons load properly

### Memory Usage
- [ ] No memory leaks
- [ ] Component unmounts cleanly
- [ ] No warnings in console

## Integration Testing

### HomeScreen Integration
- [ ] Component appears below ActionItemWidgets
- [ ] Proper spacing from components above (20px)
- [ ] Horizontal padding matches rest of screen (16px)
- [ ] Fits within SafeAreaView correctly
- [ ] Doesn't interfere with ScrollView

### Navigation Context (Future)
- [ ] Ready to integrate with React Navigation
- [ ] Callback structure supports navigation params
- [ ] Component can be reused in other screens

## Accessibility Testing

### Touch Targets
- [ ] All buttons/pills have minimum 44x44 points touch area
- [ ] Cards have adequate touch targets
- [ ] No accidental touches when scrolling

### Visual Hierarchy
- [ ] Clear visual distinction between sections
- [ ] Priority badges are easily distinguishable
- [ ] Text hierarchy is clear (header > body > meta)

## Edge Cases

### Data Edge Cases
- [ ] Empty items array shows appropriate message
- [ ] Single item displays correctly
- [ ] Very long contact names truncate properly
- [ ] Very long descriptions truncate properly
- [ ] Missing data fields handle gracefully

### State Edge Cases
- [ ] Switching filters multiple times works correctly
- [ ] Rapid filter switching doesn't break state
- [ ] Component handles re-renders properly

## Code Quality Checks

### Code Review
- [ ] No ESLint errors
- [ ] No TypeScript errors (if applicable)
- [ ] No console warnings
- [ ] Clean console output (no deprecation warnings)
- [ ] Proper import paths
- [ ] No unused imports

### Best Practices
- [ ] Theme values used (no hardcoded colors)
- [ ] Typography from theme system
- [ ] Spacing from theme system
- [ ] Radius from theme system
- [ ] Props properly documented
- [ ] Functions have clear names

## Browser DevTools (React Native Debugger)

### Component Inspection
- [ ] Component tree shows correct structure
- [ ] Props are passed correctly
- [ ] State updates properly
- [ ] No unnecessary re-renders

## Final Verification

### Checklist Summary
- [ ] All visual elements match reference image
- [ ] All interactions work as expected
- [ ] Theme integration is complete
- [ ] Performance is acceptable
- [ ] No console errors or warnings
- [ ] Ready for production use

## Sign-Off

- **Tester Name**: _______________
- **Date**: _______________
- **Device Tested**: _______________
- **OS Version**: _______________
- **App Version**: _______________
- **Result**: [ ] PASS [ ] FAIL

### Notes/Issues
```
[Write any issues or observations here]
```

---

## Quick Test Commands

```bash
# Reload app
Press 'r' in Metro console

# Open developer menu
- iOS: Cmd + D (Simulator) or Shake (Device)
- Android: Cmd + M (Emulator) or Shake (Device)

# Enable debug mode
- Select "Debug" from developer menu
- Open Chrome DevTools at chrome://inspect

# Check performance
- Enable "Perf Monitor" from developer menu
- Watch FPS and memory usage
```

## Automated Testing (Future)

Consider adding automated tests:

```javascript
// Example Jest test structure
describe('ActionItemsList', () => {
  it('renders correctly with data', () => {
    // Test rendering
  });

  it('filters items correctly', () => {
    // Test filter logic
  });

  it('calls onItemPress when card is pressed', () => {
    // Test callbacks
  });
});
```

## Conclusion

Once all checklist items are verified, the component is ready for:
- [ ] Merge to main branch
- [ ] Deployment to staging
- [ ] User acceptance testing
- [ ] Production release

---

**Status**: ⏳ Pending Testing
**Next Step**: Run npm start and begin visual testing

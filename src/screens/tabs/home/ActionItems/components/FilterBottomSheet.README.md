# Filter BottomSheet Component System

## Overview

The Filter BottomSheet component system provides a complete filtering interface for the AllActionItemsScreen. It includes a modal bottom sheet with sort options, lead filter, and deal filter capabilities.

## Components

### 1. FilterBottomSheet.jsx (Main Component)

The primary bottom sheet modal component that coordinates all filtering functionality.

**Features:**
- Slide-up animation from bottom
- Semi-transparent backdrop overlay
- Close on backdrop press, X button, or Apply button
- Swipe down to close
- Responsive layout (max 85% screen height)
- Filter count display on Apply button
- State management for sort, lead, and deal filters

**Props:**
```javascript
{
  visible: boolean,              // Controls modal visibility
  onClose: function,            // Callback when modal should close
  onApply: function,            // Callback with filter object when Apply pressed
  currentFilters: {             // Current filter state from parent
    sortBy: string,             // Current sort option
    lead: string | null,        // Current lead filter
    deal: string | null,        // Current deal filter
  }
}
```

**Filter Object Structure:**
```javascript
{
  sortBy: 'newly_added' | 'oldest' | 'priority_high_low' | 'priority_low_high',
  lead: string | null,          // Lead name or ID
  deal: string | null,          // Deal name or ID
}
```

**Sort Options:**
- `newly_added` - Newest items first (default)
- `oldest` - Oldest items first
- `priority_high_low` - High priority → Low priority
- `priority_low_high` - Low priority → High priority

### 2. RadioButton.jsx

Reusable radio button component for single-selection options.

**Features:**
- Selected state: Green checkmark icon (24×24px)
- Unselected state: Empty gray circle (20×20px)
- Pressable with visual feedback
- Accessibility support (radio role)
- Theme integration

**Props:**
```javascript
{
  label: string,                // Radio button label text
  selected: boolean,            // Whether this option is selected
  onPress: function,            // Callback when pressed
}
```

**Design Specifications:**
- Height: 48px
- Layout: Row with space-between alignment
- Label: BodyMedium typography (14px)
- Selected color: theme.colors.midnightgreen (#0B6C6B)
- Unselected border: 2px, theme.colors.davysgrey

### 3. FilterDropdown.jsx

Dropdown input component for lead and deal selection.

**Features:**
- Pressable input field with chevron icon
- Section label with BodyBold typography
- Placeholder text support
- Ready for future picker integration
- Theme-aware styling

**Props:**
```javascript
{
  label: string,                // Section label (e.g., "Lead", "Deal")
  placeholder: string,          // Placeholder text
  value: string | null,         // Current selected value
  onPress: function,            // Callback when pressed
}
```

**Design Specifications:**
- Height: 48px
- Border: 1px solid theme.colors.night10
- Border radius: 12px (theme.radius.radius3)
- Padding: 12px horizontal
- Chevron icon: 20×20px

## Installation

### 1. Install Dependencies

```bash
npm install react-native-modal
```

### 2. Component Files

All components are located in:
```
src/screens/tabs/home/ActionItems/components/
├── FilterBottomSheet.jsx
├── RadioButton.jsx
├── FilterDropdown.jsx
└── FilterBottomSheet.README.md
```

## Usage

### Basic Integration

```javascript
import React, { useState } from 'react';
import FilterBottomSheet from './components/FilterBottomSheet';
import FilterButton from './components/FilterButton';

const AllActionItemsScreen = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    sortBy: 'newly_added',
    lead: null,
    deal: null,
  });

  const handleApplyFilter = (filters) => {
    setAppliedFilters(filters);
    setFilterModalVisible(false);
    console.log('Applied filters:', filters);
    // Implement filtering/sorting logic here
  };

  return (
    <>
      {/* Filter Button */}
      <FilterButton onPress={() => setFilterModalVisible(true)} />

      {/* Filter Modal */}
      <FilterBottomSheet
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilter}
        currentFilters={appliedFilters}
      />
    </>
  );
};
```

### Implementing Filter Logic

```javascript
// Example: Sort and filter items based on applied filters
const sortAndFilterItems = (items, filters) => {
  let result = [...items];

  // Apply lead filter
  if (filters.lead) {
    result = result.filter(item => item.leadName === filters.lead);
  }

  // Apply deal filter
  if (filters.deal) {
    result = result.filter(item => item.dealName === filters.deal);
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'newly_added':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'priority_high_low':
      result.sort((a, b) => b.priority - a.priority);
      break;
    case 'priority_low_high':
      result.sort((a, b) => a.priority - b.priority);
      break;
  }

  return result;
};
```

### Using in useMemo for Performance

```javascript
const filteredItems = useMemo(() => {
  let items = sampleActionItems.filter(item => item.category === activeFilter);

  // Apply search filter
  if (searchQuery.trim()) {
    items = items.filter(item =>
      item.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply filters and sorting
  items = sortAndFilterItems(items, appliedFilters);

  return items;
}, [activeFilter, searchQuery, appliedFilters]);
```

## Design Specifications

### Bottom Sheet Layout

```
┌─────────────────────────────────────┐
│ Filter action items              X  │ ← Header (56px)
├─────────────────────────────────────┤
│ [Scrollable Content]                │
│                                     │
│ Sort by                             │
│ ○ Newly added                    ✓  │ ← Radio buttons (48px each)
│ ○ Oldest                         ○  │
│ ○ Priority: High to low          ○  │
│ ○ Priority: Low to high          ○  │
│                                     │
│ Lead                                │
│ ┌─────────────────────────────────┐ │ ← Dropdown (48px)
│ │ Filter by lead name          ˅  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Deal                                │
│ ┌─────────────────────────────────┐ │ ← Dropdown (48px)
│ │ Filter by deal               ˅  │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ ┌───────────┐ ┌─────────────────┐  │ ← Action buttons (52px)
│ │ Clear all │ │   Apply (4)     │  │
│ └───────────┘ └─────────────────┘  │
└─────────────────────────────────────┘
```

### Measurements

**Container:**
- Background: white
- Border top radius: 24px
- Max height: 85% of screen
- Padding: 24px (top, horizontal), 34px (bottom for safe area)

**Header:**
- Height: 56px
- Title: heading2Medium (20px), centered
- Close button: 40×40px pressable, 24×24px icon, absolute right

**Content Sections:**
- Section label: BodyBold (14px, bold)
- Margin top: 20px (between sections)
- Margin bottom: 12px (label to content)

**Radio Buttons:**
- Height: 48px each
- Padding: 12px vertical
- Icon: 24×24px (selected checkmark)
- Empty circle: 20×20px with 2px border (unselected)

**Dropdowns:**
- Height: 48px
- Border: 1px solid night10
- Border radius: 12px
- Padding: 12px horizontal
- Chevron: 20×20px

**Action Buttons:**
- Height: 52px
- Border radius: 12px
- Gap: 12px between buttons
- Margin top: 32px from content
- Clear all: Border 1px, transparent background
- Apply: Solid midnightgreen background, white text

### Colors

```javascript
// Primary action color
theme.colors.midnightgreen  // #0B6C6B (teal/green)

// Text colors
theme.colors.night          // #0F1010 (black)
theme.colors.davysgrey      // #555555 (gray)
theme.colors.white          // #FFFFFF

// Borders
theme.colors.night10        // rgba(15,16,16,0.1) (light gray)

// Background
theme.colors.isabelline     // #F5F1F0 (off-white)
```

## Accessibility

All components include proper accessibility features:

**FilterBottomSheet:**
- Modal role for screen readers
- Keyboard dismissible (Android back button)

**RadioButton:**
- `accessibilityRole="radio"`
- `accessibilityState={{ checked: selected }}`
- `accessibilityLabel` with option text

**FilterDropdown:**
- `accessibilityRole="button"`
- `accessibilityLabel` describing filter type
- `accessibilityHint` explaining interaction

**Action Buttons:**
- `accessibilityRole="button"`
- `accessibilityLabel` with clear action description
- Filter count included in Apply button label

## Future Enhancements

### Lead/Deal Picker Implementation

The dropdown components are ready for picker integration. Here's how to implement:

```javascript
// 1. Install a picker library (optional)
npm install @react-native-picker/picker

// 2. Create picker modal components
<LeadPickerModal
  visible={leadPickerVisible}
  onSelect={(lead) => setLead(lead)}
  onClose={() => setLeadPickerVisible(false)}
/>

// 3. Update dropdown onPress handlers
const handleLeadPress = () => {
  setLeadPickerVisible(true);
};
```

### Active Filter Indicator

Show visual indicator on FilterButton when filters are active:

```javascript
const hasActiveFilters = () => {
  const { sortBy, lead, deal } = appliedFilters;
  return sortBy !== 'newly_added' || lead !== null || deal !== null;
};

// Update FilterButton to show badge
<FilterButton
  onPress={handleFilterPress}
  hasActiveFilters={hasActiveFilters()}
/>
```

### Persist Filters to AsyncStorage

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save filters
const handleApplyFilter = async (filters) => {
  setAppliedFilters(filters);
  setFilterModalVisible(false);
  await AsyncStorage.setItem('actionItemFilters', JSON.stringify(filters));
};

// Load filters on mount
useEffect(() => {
  const loadFilters = async () => {
    const saved = await AsyncStorage.getItem('actionItemFilters');
    if (saved) {
      setAppliedFilters(JSON.parse(saved));
    }
  };
  loadFilters();
}, []);
```

### Animated Filter Count

```javascript
import Animated, {
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

// Animate count change on Apply button
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scale: withSpring(filterCount > 0 ? 1.1 : 1) }],
  };
});
```

### Haptic Feedback

```javascript
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Add to radio button selection
const handleRadioPress = (value) => {
  ReactNativeHapticFeedback.trigger('impactLight');
  setSortBy(value);
};
```

## Testing

### Manual Testing Checklist

✅ Bottom sheet opens when Filter button pressed
✅ Slide-up animation smooth
✅ Backdrop overlay visible and semi-transparent
✅ Close on backdrop tap
✅ Close on X button
✅ Swipe down to close works
✅ Radio buttons work (single selection only)
✅ Selected radio shows green checkmark
✅ Unselected radios show empty circle
✅ Dropdowns are pressable (console logs for now)
✅ Clear all resets to defaults
✅ Apply closes modal and logs filters
✅ Apply button shows correct count "Apply (N)"
✅ Theme colors applied throughout
✅ Responsive on different screen sizes
✅ Works on both iOS and Android
✅ Android back button closes modal

### Unit Testing Example

```javascript
import { render, fireEvent } from '@testing-library/react-native';
import FilterBottomSheet from './FilterBottomSheet';

describe('FilterBottomSheet', () => {
  it('calls onApply with correct filters', () => {
    const mockApply = jest.fn();
    const { getByText } = render(
      <FilterBottomSheet
        visible={true}
        onClose={() => {}}
        onApply={mockApply}
        currentFilters={{ sortBy: 'newly_added', lead: null, deal: null }}
      />
    );

    fireEvent.press(getByText('Oldest'));
    fireEvent.press(getByText(/Apply/));

    expect(mockApply).toHaveBeenCalledWith({
      sortBy: 'oldest',
      lead: null,
      deal: null,
    });
  });
});
```

## Troubleshooting

### Modal doesn't open
- Verify `react-native-modal` is installed
- Check `visible` prop is being set to `true`
- Ensure no other modals are blocking it

### Icons not showing
- Check CustomIcon component is imported correctly
- Verify icon names exist in icons object
- Check tintColour prop is valid

### Theme colors not applied
- Ensure ThemeContext is wrapping the app
- Verify useAppTheme() hook is imported
- Check theme object structure

### Android back button doesn't close modal
- react-native-modal handles this automatically
- Ensure you're not preventing default behavior

### Filters not persisting
- Implement AsyncStorage pattern (see Future Enhancements)
- Ensure filter state is in parent component
- Check state updates in handleApplyFilter

## Performance Considerations

### Optimization Tips

1. **Use useMemo for filtered items:**
```javascript
const filteredItems = useMemo(() => {
  return sortAndFilterItems(items, appliedFilters);
}, [items, appliedFilters]);
```

2. **Debounce search input:**
```javascript
const debouncedSearch = useMemo(
  () => debounce(setSearchQuery, 300),
  []
);
```

3. **FlatList for long lists:**
```javascript
<FlatList
  data={filteredItems}
  renderItem={({ item }) => <ActionItemCard item={item} />}
  keyExtractor={(item) => item.id}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

4. **Memoize RadioButton components:**
```javascript
const RadioButton = React.memo(({ label, selected, onPress }) => {
  // Component implementation
});
```

## Support

For issues or questions:
1. Check this README documentation
2. Review component source code comments
3. Test on both iOS and Android platforms
4. Check React Native Modal documentation: https://github.com/react-native-modal/react-native-modal

## Version History

- **v1.0.0** (2025-01-04)
  - Initial implementation
  - FilterBottomSheet with sort, lead, deal filters
  - RadioButton component
  - FilterDropdown component
  - Full theme integration
  - Accessibility support
  - Android back button support
  - Swipe to close functionality

---

**Created:** 2025-01-04
**Author:** CRMBuild Team
**Component System:** Filter BottomSheet for Action Items

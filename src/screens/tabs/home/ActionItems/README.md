# Action Items Module

This module provides comprehensive action items management functionality for the CRMBuild mobile application.

## Overview

The Action Items module consists of two main components:
1. **ActionItemsList** - Widget component for displaying action items on the HomeScreen
2. **AllActionItemsScreen** - Full-page view with search and filter capabilities

## Component Architecture

### Directory Structure

```
ActionItems/
├── ActionItemsList.jsx          # Widget component (stacked cards)
├── AllActionItemsScreen.jsx     # Full page component (individual cards)
├── components/
│   ├── ActionItemCard.jsx       # Reusable action item card
│   ├── SearchBar.jsx            # Search input component
│   └── FilterButton.jsx         # Filter button component
├── sampleData.js                # Sample action items data
└── README.md                    # This file
```

## Components

### 1. AllActionItemsScreen

**Purpose**: Full-page view for displaying all action items with filtering and search.

**Features**:
- Navigation header with back button
- Filter pills (Today, Overdue, Upcoming)
- Search functionality (contact name, description, keywords)
- Filter button (ready for modal/bottom sheet)
- Scrollable list of individual action item cards
- Empty state when no results

**Usage**:
```javascript
// Navigation from HomeScreen
navigation.navigate('AllActionItems');

// Component is auto-registered in HomeStack.js
```

**Props**: None (uses React Navigation hooks internally)

**State Management**:
- `activeFilter` - Currently selected filter category ('today', 'overdue', 'upcoming')
- `searchQuery` - Current search query string

---

### 2. ActionItemCard

**Purpose**: Reusable card component for displaying individual action items.

**Usage**:
```javascript
import ActionItemCard from './components/ActionItemCard';

<ActionItemCard
  item={actionItem}
  onPress={handleItemPress}
/>
```

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `item` | Object | Yes | Action item data object |
| `item.id` | string | Yes | Unique identifier |
| `item.type` | string | Yes | Action type ('call', 'proposal', 'follow-up', 'schedule') |
| `item.contactName` | string | Yes | Contact name (displayed in bold) |
| `item.description` | string | Yes | Task description |
| `item.time` | string | Yes | Time in format "HH:MMAM/PM" |
| `item.priority` | string | Yes | Priority level ('Critical', 'High', 'Low') |
| `item.category` | string | Yes | Category ('today', 'overdue', 'upcoming') |
| `onPress` | Function | No | Callback when card is pressed |

**Styling**:
- Individual card (NOT stacked)
- White background with border
- Border radius: 12px (theme.radius.radius3)
- Shadow/elevation for depth
- Margin: 16px horizontal, 12px bottom (gap between cards)

**Priority Colors**:
- Critical: `#FF6B6B` (Coral/Red)
- High: `#FFA500` (Orange)
- Low: `#4ECB71` (Green)

---

### 3. SearchBar

**Purpose**: Search input component with search icon for filtering action items.

**Usage**:
```javascript
import SearchBar from './components/SearchBar';

<SearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
  placeholder="Search by keywords, names"
/>
```

**Props**:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | string | Yes | - | Current search query value |
| `onChangeText` | Function | Yes | - | Callback when text changes |
| `placeholder` | string | No | "Search by keywords, names" | Placeholder text |

**Features**:
- Search icon (magnifying glass) on left
- Themed styling
- Auto-capitalization disabled
- Search return key type
- Height: 48px

---

### 4. FilterButton

**Purpose**: Square filter/sort button for opening filter modal/bottom sheet.

**Usage**:
```javascript
import FilterButton from './components/FilterButton';

<FilterButton onPress={handleFilterPress} />
```

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onPress` | Function | Yes | Callback when button is pressed |

**Features**:
- Square button (48×48px)
- Filter icon (horizontal lines)
- Themed border and background
- Ready for modal/bottom sheet integration

---

### 5. ActionItemsList (Widget)

**Purpose**: Widget component for displaying action items on HomeScreen with stacked card styling.

**Usage**:
```javascript
import ActionItemsList from './ActionItems/ActionItemsList';
import { sampleActionItems } from './ActionItems/sampleData';

<ActionItemsList
  items={sampleActionItems}
  onShowAll={handleShowAll}
  onItemPress={handleItemPress}
/>
```

**Props**:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | Array | Yes | Array of action item objects |
| `onShowAll` | Function | No | Callback for "Show all" button |
| `onItemPress` | Function | No | Callback when item is pressed |

**Styling Difference**:
- **Widget (ActionItemsList)**: Stacked cards with rounded first/last only
- **Full Page (AllActionItemsScreen)**: Individual cards with 12px gaps and all corners rounded

## Data Structure

### Action Item Object

```javascript
{
  id: '1',                          // Unique identifier
  type: 'call',                     // Action type: 'call' | 'proposal' | 'follow-up' | 'schedule'
  contactName: 'John Smith',        // Contact name (displayed in bold)
  description: 'follow up on...',   // Task description
  time: '10:00AM',                  // Time in format "HH:MMAM/PM"
  priority: 'Critical',             // Priority: 'Critical' | 'High' | 'Low'
  category: 'today'                 // Category: 'today' | 'overdue' | 'upcoming'
}
```

### Sample Data

Sample action items are provided in `sampleData.js`:

```javascript
import { sampleActionItems } from './sampleData';

// Helper functions
import { getItemsByCategory, getItemsByPriority } from './sampleData';

const todayItems = getItemsByCategory('today');
const criticalItems = getItemsByPriority('Critical');
```

## Navigation Integration

### HomeStack Registration

The AllActionItemsScreen is registered in `src/navigation/stacks/HomeStack.js`:

```javascript
import AllActionItemsScreen from '../../screens/tabs/home/ActionItems/AllActionItemsScreen';

<Stack.Screen
  name="AllActionItems"
  component={AllActionItemsScreen}
  options={{ headerShown: false }}
/>
```

### Navigation from HomeScreen

```javascript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const handleShowAll = () => {
  navigation.navigate('AllActionItems');
};
```

## Filtering & Search Logic

### Filter Logic

Items are filtered by category (today, overdue, upcoming):

```javascript
const filteredItems = items.filter(item => item.category === activeFilter);
```

### Search Logic

Search filters by contact name, description, and type:

```javascript
const query = searchQuery.toLowerCase();
items = items.filter(item => {
  const contactName = item.contactName.toLowerCase();
  const description = item.description.toLowerCase();
  const typePrefix = item.type.toLowerCase();
  return (
    contactName.includes(query) ||
    description.includes(query) ||
    typePrefix.includes(query)
  );
});
```

### Combined Filtering

Filtering and search are combined using `useMemo` for performance:

```javascript
const filteredItems = useMemo(() => {
  let items = sampleActionItems.filter(item => item.category === activeFilter);

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    items = items.filter(item => {
      // Search logic here
    });
  }

  return items;
}, [activeFilter, searchQuery]);
```

## Theme Integration

All components use the app's theme system:

```javascript
import { useAppTheme } from '../../../../context/ThemeContext';

const { theme } = useAppTheme();

// Access theme properties
theme.colors.night
theme.colors.white
theme.typography.BodyMedium
theme.radius.radius3
```

## Future Enhancements

### Recommended Features:

1. **Filter Modal/Bottom Sheet**
   - Sort options (by time, priority, contact)
   - Advanced filtering (date range, multiple priorities)
   - Custom views

2. **Performance Optimizations**
   - Replace ScrollView with FlatList for large datasets
   - Implement virtual scrolling
   - Debounce search input

3. **User Interactions**
   - Pull-to-refresh functionality
   - Swipe actions (complete, delete, snooze)
   - Batch selection and actions

4. **Data Integration**
   - API integration for real data
   - Loading states with skeleton screens
   - Error handling and retry logic
   - Offline support with local storage

5. **Enhanced Search**
   - Search history
   - Search suggestions
   - Advanced search filters

6. **Animations**
   - Smooth transitions between screens
   - Card animations on filter/search
   - Loading animations

7. **Accessibility**
   - Screen reader support
   - High contrast mode
   - Font scaling support

## Testing

### Component Testing

```javascript
// Example test structure
describe('AllActionItemsScreen', () => {
  it('renders correctly', () => {});
  it('filters items by category', () => {});
  it('searches items by query', () => {});
  it('shows empty state when no results', () => {});
  it('navigates back on back button press', () => {});
});
```

### Manual Testing Checklist

- [ ] Navigation from HomeScreen works
- [ ] Back button returns to HomeScreen
- [ ] Filter pills switch categories correctly
- [ ] Search filters items in real-time
- [ ] Empty state displays when no results
- [ ] Cards are pressable with visual feedback
- [ ] Filter button is pressable
- [ ] Scrolling works smoothly
- [ ] Theme integration works correctly
- [ ] Priority badges show correct colors

## Maintenance Notes

### When to Update Components:

1. **ActionItemCard**: When action item data structure changes
2. **SearchBar**: When search functionality requirements change
3. **FilterButton**: When filter modal/bottom sheet is implemented
4. **AllActionItemsScreen**: When new features are added (sorting, batch actions, etc.)

### Code Quality Standards:

- All components use functional components with hooks
- PropTypes or TypeScript for type checking
- Consistent naming conventions
- Comprehensive JSDoc comments
- Theme integration throughout
- Responsive design principles

## Troubleshooting

### Common Issues:

**Issue**: Navigation not working
- **Solution**: Ensure HomeStack.js has AllActionItemsScreen registered
- **Solution**: Check navigation prop is available in HomeScreen

**Issue**: Search not filtering
- **Solution**: Check searchQuery state is updating
- **Solution**: Verify filter logic matches data structure

**Issue**: Cards not displaying
- **Solution**: Verify sampleData.js is imported correctly
- **Solution**: Check activeFilter matches data categories

**Issue**: Theme not applying
- **Solution**: Ensure useAppTheme hook is called
- **Solution**: Verify ThemeContext provider wraps app

## Support

For questions or issues related to the Action Items module, please refer to:
- Project documentation in `/docs`
- React Native documentation
- React Navigation documentation
- Theme system documentation in `/src/theme`

---

**Last Updated**: 2025-11-04
**Version**: 1.0.0
**Maintained by**: CRMBuild Development Team

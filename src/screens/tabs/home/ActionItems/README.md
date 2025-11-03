# ActionItemsList Component

A production-ready React Native component for displaying filterable action items with priority badges, designed for the CRMBuild mobile application.

## Overview

The ActionItemsList component displays a list of action items (calls, proposals, follow-ups, meetings) with filtering capabilities and priority indicators. It matches the design specifications from the reference image `src/ref_images/action-items.png`.

## Features

- **Dynamic Data Support**: Accepts array of action items via props
- **Filter Pills**: Today/Overdue/Upcoming categories with active state management
- **Priority Badges**: Color-coded badges (Critical=red, High=orange, Low=green)
- **"Show all" Button**: Navigation-ready callback
- **Theme Integration**: Full theme system support (light/dark mode)
- **Text Truncation**: Long descriptions automatically truncate with ellipsis
- **Responsive Design**: Proper padding, margins, and touch targets
- **Pressable Cards**: Interactive feedback on card press
- **Empty States**: Graceful handling of no items

## Installation

The component is already integrated into the HomeScreen. Files included:

```
src/screens/tabs/home/ActionItems/
├── ActionItemsList.jsx    # Main component
├── sampleData.js          # Sample data and helper functions
└── README.md              # This file
```

## Usage

### Basic Implementation

```javascript
import ActionItemsList from './ActionItems/ActionItemsList';
import { sampleActionItems } from './ActionItems/sampleData';

const HomeScreen = () => {
  const handleShowAll = () => {
    // Navigate to full action items screen
    navigation.navigate('AllActionItems');
  };

  const handleItemPress = (item) => {
    // Navigate to item details
    navigation.navigate('ActionItemDetails', { itemId: item.id });
  };

  return (
    <View>
      <ActionItemsList
        items={sampleActionItems}
        onShowAll={handleShowAll}
        onItemPress={handleItemPress}
      />
    </View>
  );
};
```

## Data Structure

### Action Item Object

```javascript
{
  id: string,              // Unique identifier
  type: string,            // 'call' | 'proposal' | 'follow-up' | 'schedule'
  contactName: string,     // Contact person name (appears bold)
  description: string,     // Task description
  time: string,            // Display time (e.g., "10:00AM")
  priority: string,        // 'Critical' | 'High' | 'Low'
  category: string         // 'today' | 'overdue' | 'upcoming'
}
```

### Example

```javascript
const actionItem = {
  id: '1',
  type: 'call',
  contactName: 'John Smith',
  description: 'follow up on pricing discussion',
  time: '10:00AM',
  priority: 'Critical',
  category: 'today'
};
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | Array | No | Array of action item objects (defaults to empty array) |
| `onShowAll` | Function | No | Callback when "Show all" button is pressed |
| `onItemPress` | Function | No | Callback when an action item card is pressed |

## Component Features

### Filter System

Three filter categories are available:
- **Today**: Current day tasks
- **Overdue**: Past due items
- **Upcoming**: Future scheduled items

Filter state is managed internally with `useState`. Active filter is indicated by:
- Black background with white text
- Inactive filters have white background with black text

### Priority Badges

Priority badges are color-coded based on urgency:

| Priority | Color | Hex Code |
|----------|-------|----------|
| Critical | Red | `#FF6B6B` |
| High | Orange | `#FFA500` |
| Low | Green | `#4ECB71` |

### Task Description Formatting

The component automatically formats task descriptions based on type:

| Type | Prefix |
|------|--------|
| call | "Call " |
| proposal | "Send proposal to " |
| follow-up | "Follow back with " |
| schedule | "Schedule call with " |

Contact names are rendered in bold, followed by the description.

Example output: "Call **John Smith** - follow up on pricing di..."

## Styling

### Theme Integration

The component uses the app's centralized theme system:

```javascript
const { theme } = useAppTheme();

// Colors
theme.colors.white      // Card background
theme.colors.night      // Text color
theme.colors.davysgrey  // Secondary text
theme.colors.isabelline // Background

// Typography
theme.typography.heading2Bold    // Header title
theme.typography.BodyMedium      // Body text
theme.typography.BodyBold        // Bold text
theme.typography.BodySmallMedium // Time text

// Spacing
theme.spacings.spacing4  // 16px
theme.spacings.spacing5  // 20px

// Border Radius
theme.radius.radius2     // 8px (badges)
theme.radius.radius3     // 12px (cards)
theme.radius.radius10    // 40px (pills)
```

### Responsive Design

- **Horizontal padding**: 16px on container
- **Card margin**: 8px vertical spacing between cards
- **Card padding**: 16px internal padding
- **Filter gap**: 8px between filter pills
- **Shadow**: Subtle elevation (iOS/Android compatible)

## Sample Data

Sample data is provided in `sampleData.js`:

```javascript
import { sampleActionItems } from './ActionItems/sampleData';

// Use all sample data
<ActionItemsList items={sampleActionItems} />

// Or use helper functions
import { getItemsByCategory, getItemsByPriority } from './ActionItems/sampleData';

const todayItems = getItemsByCategory('today');
const criticalItems = getItemsByPriority('Critical');
```

## Customization

### Changing Priority Colors

Modify the `getPriorityColor` function in `ActionItemsList.jsx`:

```javascript
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Critical':
      return '#FF6B6B'; // Change to your color
    case 'High':
      return '#FFA500'; // Change to your color
    case 'Low':
      return '#4ECB71'; // Change to your color
    default:
      return theme.colors.davysgrey;
  }
};
```

### Adding More Filter Categories

1. Add new category to filter data
2. Update `renderFilterPill` calls
3. Ensure items have matching category values

### Customizing Description Format

Modify the `formatDescription` function to add new types or change formatting:

```javascript
const formatDescription = (item) => {
  const { type, contactName, description } = item;

  let prefix = '';
  switch (type) {
    case 'meeting':
      prefix = 'Meeting with ';
      break;
    // Add more types...
  }

  return { prefix, contactName, description };
};
```

## Integration with Navigation

To connect the component with React Navigation:

```javascript
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleShowAll = () => {
    navigation.navigate('AllActionItems');
  };

  const handleItemPress = (item) => {
    navigation.navigate('ActionItemDetails', {
      itemId: item.id,
      item: item
    });
  };

  return (
    <ActionItemsList
      items={actionItems}
      onShowAll={handleShowAll}
      onItemPress={handleItemPress}
    />
  );
};
```

## Accessibility

The component includes basic accessibility features:

- Pressable components with active opacity feedback
- Clear visual hierarchy with proper contrast
- Touch target sizes meet minimum requirements (44x44 points)
- Semantic HTML-like structure with proper text hierarchy

### Future Accessibility Enhancements

Consider adding:
- `accessibilityLabel` props for screen readers
- `accessibilityRole` for better semantic understanding
- `accessibilityHint` for action descriptions

## Performance Considerations

- **Efficient Filtering**: Items are filtered on demand, not pre-computed
- **Memoization**: Consider using `useMemo` for large item lists
- **FlatList**: For very large lists (100+ items), consider replacing ScrollView with FlatList

Example with FlatList:

```javascript
import { FlatList } from 'react-native';

<FlatList
  data={filteredItems}
  renderItem={({ item }) => renderActionItem(item)}
  keyExtractor={item => item.id}
  contentContainerStyle={styles.listContainer}
/>
```

## Testing

### Manual Testing Checklist

- [ ] Component renders with sample data
- [ ] Filter pills change active state on press
- [ ] Each category shows correct filtered items
- [ ] Priority badges display correct colors
- [ ] Text truncation works for long descriptions
- [ ] "Show all" button triggers callback
- [ ] Card press triggers callback with item data
- [ ] Empty state displays when no items match filter
- [ ] Theme changes apply correctly (light/dark mode)
- [ ] Component is responsive on different screen sizes

### Unit Testing (Future)

Consider adding tests for:
- Filter state management
- Priority color mapping
- Description formatting logic
- Empty state handling
- Callback prop invocation

## Troubleshooting

### Icons Not Displaying

Ensure CustomIcon component has the required icon:
```javascript
// Check src/assets/icons/CustomIcon.jsx
icons['nav-arrow-right'] // Should exist
```

### Theme Not Applied

Verify ThemeContext is properly provided:
```javascript
import { AppThemeProvider } from './context/ThemeContext';

<AppThemeProvider>
  <App />
</AppThemeProvider>
```

### Cards Not Pressable

Check that `onItemPress` callback is provided:
```javascript
<ActionItemsList
  items={items}
  onItemPress={(item) => console.log(item)} // Must be provided
/>
```

## Future Enhancements

Potential improvements:

1. **Search Functionality**: Add search bar to filter items by keyword
2. **Sort Options**: Sort by time, priority, or contact name
3. **Batch Actions**: Select multiple items for bulk operations
4. **Swipe Actions**: Swipe to complete, delete, or snooze items
5. **Time Formatting**: Dynamic time display (e.g., "2 hours ago")
6. **Real-time Updates**: WebSocket integration for live updates
7. **Pull to Refresh**: Refresh data on pull down gesture
8. **Animations**: Smooth transitions between filters and states

## Contributing

When modifying this component:

1. Maintain theme system integration
2. Follow existing code style and patterns
3. Update this README with any changes
4. Test on both iOS and Android
5. Verify light and dark mode compatibility
6. Ensure accessibility standards are maintained

## License

Part of the CRMBuild mobile application.

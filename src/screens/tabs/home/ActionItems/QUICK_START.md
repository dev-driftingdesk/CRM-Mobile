# ActionItemsList - Quick Start Guide

## Component at a Glance

**Production-ready filterable action items list with priority badges**

```javascript
import ActionItemsList from './ActionItems/ActionItemsList';
import { sampleActionItems } from './ActionItems/sampleData';

<ActionItemsList
  items={sampleActionItems}
  onShowAll={() => navigation.navigate('AllItems')}
  onItemPress={(item) => navigation.navigate('Details', { item })}
/>
```

## 30-Second Setup

1. **Already integrated** in HomeScreen.js ✅
2. **Sample data** included for testing ✅
3. **Ready to use** - just run the app ✅

```bash
npm start
npm run ios  # or npm run android
```

## Data Format

```javascript
{
  id: '1',
  type: 'call',              // call | proposal | follow-up | schedule
  contactName: 'John Smith',  // Bold in display
  description: 'follow up',   // Regular text
  time: '10:00AM',
  priority: 'Critical',       // Critical | High | Low
  category: 'today'           // today | overdue | upcoming
}
```

## Key Features

| Feature | Status |
|---------|--------|
| Dynamic data via props | ✅ |
| Filter pills (Today/Overdue/Upcoming) | ✅ |
| Priority badges (Red/Orange/Green) | ✅ |
| "Show all" navigation | ✅ |
| Card press callbacks | ✅ |
| Theme integration | ✅ |
| Text truncation | ✅ |
| Empty states | ✅ |

## Visual Reference

```
┌─────────────────────────────────────┐
│ Action items          Show all >    │
├─────────────────────────────────────┤
│ ○ Today   ○ Overdue   ○ Upcoming   │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Call John Smith - follow up... │ │
│ │ 10:00AM             [Critical] │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Send proposal to Sarah Lee...  │ │
│ │ 10:00AM             [Critical] │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Colors

| Priority | Color | Hex |
|----------|-------|-----|
| Critical | 🔴 Red | #FF6B6B |
| High | 🟠 Orange | #FFA500 |
| Low | 🟢 Green | #4ECB71 |

## Files

```
ActionItems/
├── ActionItemsList.jsx       # Main component
├── sampleData.js             # Test data
├── README.md                 # Full documentation
├── IMPLEMENTATION_SUMMARY.md # Technical details
├── TESTING_CHECKLIST.md      # QA checklist
└── QUICK_START.md            # This file
```

## Common Tasks

### Replace Sample Data with API
```javascript
const [items, setItems] = useState([]);

useEffect(() => {
  fetchActionItems()
    .then(data => setItems(data))
    .catch(console.error);
}, []);

<ActionItemsList items={items} />
```

### Add Navigation
```javascript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

<ActionItemsList
  items={items}
  onShowAll={() => navigation.navigate('AllActionItems')}
  onItemPress={(item) => navigation.navigate('ItemDetails', { itemId: item.id })}
/>
```

### Change Priority Colors
Edit `getPriorityColor()` in `ActionItemsList.jsx`:
```javascript
case 'Critical': return '#YOUR_COLOR';
```

## Customization

**Quick customization points:**
- Priority colors: `getPriorityColor()` function
- Description format: `formatDescription()` function
- Filter categories: Add more pills in render
- Empty state message: `styles.emptyState` section

## Testing

**Visual check:**
1. Run app: `npm run ios`
2. Navigate to Home tab
3. Scroll to Action Items section
4. Test filter pills
5. Tap cards and "Show all" button

**Console check:**
- Item press: Shows item object
- Show all: Shows navigation message

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Icons missing | Check CustomIcon.jsx has nav-arrow-right |
| Theme not applied | Verify AppThemeProvider wraps app |
| Cards not clickable | Ensure onItemPress callback provided |
| No data showing | Check items array has data |

## Performance Tips

**For large lists (100+ items):**
```javascript
// Replace ScrollView with FlatList
<FlatList
  data={filteredItems}
  renderItem={({ item }) => renderActionItem(item)}
  keyExtractor={item => item.id}
/>
```

## Next Steps

1. ✅ Component created and integrated
2. ⏳ Test on device/emulator
3. ⏳ Connect to real API
4. ⏳ Add navigation handlers
5. ⏳ Deploy to production

## Support

- Full docs: [README.md](./README.md)
- Technical details: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- Testing guide: [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)

---

**Status**: ✅ Ready for Testing
**Version**: 1.0.0
**Last Updated**: November 3, 2025

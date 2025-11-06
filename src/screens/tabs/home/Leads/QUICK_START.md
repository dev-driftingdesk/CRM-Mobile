# Leads Component - Quick Start Guide

## Installation

The component is already installed and integrated! Just use it. 🎉

## Basic Usage

### 1. Import the Component

```javascript
import LeadsList from './Leads/LeadsList';
import { sampleLeads } from './Leads/sampleData';
```

### 2. Add to Your Screen

```javascript
<LeadsList
  leads={sampleLeads}
  onShowAll={() => console.log('Show all pressed')}
  onLeadPress={(lead) => console.log('Lead pressed:', lead)}
/>
```

### 3. That's It!

The component will display a beautiful list of leads with:
- Avatar circles with initials
- Company and contact names
- Deal counts with briefcase icons
- Stacked card design

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leads` | Array | `[]` | Array of lead objects |
| `onShowAll` | Function | `undefined` | Called when "Show all" button is pressed |
| `onLeadPress` | Function | `undefined` | Called when a lead card is pressed |

## Data Format

```javascript
const leads = [
  {
    id: '1',                              // Required: Unique identifier
    companyName: 'CreativePixel Agency',  // Required: Company name
    contactName: 'Emma Rodriguez',        // Required: Contact person
    dealCount: 4,                         // Required: Number of deals
  },
  // ... more leads
];
```

## Navigation Setup (Optional)

### Add Navigation to "Show All"

```javascript
const handleShowAllLeads = () => {
  navigation.navigate('AllLeads');
};

<LeadsList
  leads={leads}
  onShowAll={handleShowAllLeads}
  onLeadPress={handleLeadPress}
/>
```

### Add Navigation to Lead Details

```javascript
const handleLeadPress = (lead) => {
  navigation.navigate('LeadDetails', { leadId: lead.id });
};

<LeadsList
  leads={leads}
  onShowAll={handleShowAllLeads}
  onLeadPress={handleLeadPress}
/>
```

## API Integration (Replace Sample Data)

### Step 1: Create API Call

```javascript
import api from '../../../axios/api';

const [leads, setLeads] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get('/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchLeads();
}, []);
```

### Step 2: Use Real Data

```javascript
<LeadsList
  leads={leads}  // Use fetched data instead of sampleLeads
  onShowAll={handleShowAllLeads}
  onLeadPress={handleLeadPress}
/>
```

### Step 3: Add Loading State (Optional)

```javascript
{loading ? (
  <ActivityIndicator size="large" color={theme.colors.night} />
) : (
  <LeadsList
    leads={leads}
    onShowAll={handleShowAllLeads}
    onLeadPress={handleLeadPress}
  />
)}
```

## Avatar Initials

Initials are automatically generated from company names:

| Company Name | Initials |
|--------------|----------|
| CreativePixel Agency | CA |
| Microsoft | MI |
| IBM | IB |
| X | XX |
| (empty) | LD |

### Custom Initials (Future)

If you want to provide custom initials, you can modify the data structure:

```javascript
{
  id: '1',
  companyName: 'CreativePixel Agency',
  contactName: 'Emma Rodriguez',
  dealCount: 4,
  customInitials: 'CP',  // Optional: Override auto-generated initials
}
```

Then update `getInitials()` in LeadsList.jsx to check for `customInitials` first.

## Styling

### Using Theme Colors

The component uses theme colors automatically. To customize:

```javascript
// In src/theme/theme.js
export const lightTheme = {
  colors: {
    night: '#0F1010',        // Dark text and borders
    white: '#FFFFFF',        // Card backgrounds
    davysgrey: '#555555',    // Secondary text
    night10: 'rgba(15,16,16,0.1)',  // Light borders
  },
  // ... rest of theme
};
```

### Custom Spacing

To change spacing, modify the parent container:

```javascript
<View style={[{
  paddingHorizontal: 20,  // Change from 16 to 20
  marginTop: 32,          // Change from 28 to 32
}]}>
  <LeadsList {...props} />
</View>
```

## Empty State

When there are no leads, the component shows:

```
┌─────────────────────────────┐
│                              │
│    No leads available       │
│                              │
└─────────────────────────────┘
```

To customize the empty state message, edit `LeadsList.jsx`:

```javascript
<Text style={[theme.typography.BodyMedium, { color: theme.colors.davysgrey }]}>
  No leads available  // Change this text
</Text>
```

## Common Customizations

### Change Card Border Radius

```javascript
// In LeadsList.jsx, find the card rendering:
borderTopLeftRadius: isFirst ? 24 : 0,   // Change 24 to your value
borderTopRightRadius: isFirst ? 24 : 0,
```

### Change Avatar Size

```javascript
// In LeadsList.jsx styles:
avatar: {
  width: 56,        // Change from 48
  height: 56,       // Change from 48
  borderRadius: 28, // Change from 24 (should be width/2)
  // ...
},
```

### Change Icon

```javascript
// In LeadsList.jsx, find the icon:
<CustomIcon
  name="suitcase"  // Change to different icon name
  width={16}
  height={16}
  tintColour={theme.colors.davysgrey}
/>
```

Available icons: Check `/src/assets/icons/CustomIcon.jsx`

## Troubleshooting

### Cards not displaying?
- Check that `leads` prop is an array
- Verify data structure matches required format
- Check console for errors

### Initials showing "LD"?
- Check that `companyName` field exists in data
- Verify company name is not null/empty
- Check console.log in `getInitials()` function

### Theme colors not working?
- Verify `ThemeContext` provider wraps the app
- Check `useAppTheme()` hook is imported correctly
- Ensure theme.js has all required color keys

### Icons not displaying?
- Verify icon name exists in CustomIcon.jsx
- Check that PNG file exists in assets/icons/
- Verify icon path is correct

### Cards not stacking?
- Check that there's no margin/gap in styles
- Verify border radius logic is correct
- Ensure cards are in a single container

## Performance Tips

### Large Lists (100+ items)

For large lists, use `FlatList` instead of mapping:

```javascript
// In LeadsList.jsx, replace the mapping with:
<FlatList
  data={leads}
  renderItem={({ item, index }) => renderLeadCard(item, index, leads.length)}
  keyExtractor={(item) => item.id}
  scrollEnabled={false}  // If inside ScrollView
/>
```

### Image Caching (Future)

When adding logos, implement caching:

```javascript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: lead.logoUrl, priority: FastImage.priority.normal }}
  style={styles.avatar}
/>
```

## Testing

### Manual Testing

```javascript
// Test with empty array
<LeadsList leads={[]} />

// Test with single item
<LeadsList leads={[sampleLeads[0]]} />

// Test with many items
<LeadsList leads={sampleLeads} />

// Test with long names
<LeadsList leads={[{
  id: '1',
  companyName: 'Very Long Company Name That Should Truncate Properly',
  contactName: 'Very Long Contact Name That Should Also Truncate',
  dealCount: 99,
}]} />
```

### Console Logging

```javascript
<LeadsList
  leads={leads}
  onShowAll={() => console.log('Show all pressed')}
  onLeadPress={(lead) => {
    console.log('Lead pressed:', lead);
    console.log('Company:', lead.companyName);
    console.log('Contact:', lead.contactName);
    console.log('Deals:', lead.dealCount);
  }}
/>
```

## Examples

### Full Example with Navigation

```javascript
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAppTheme } from '../../../context/ThemeContext';
import LeadsList from './Leads/LeadsList';
import api from '../../../axios/api';

const HomeScreen = ({ navigation }) => {
  const { theme } = useAppTheme();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get('/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowAllLeads = () => {
    navigation.navigate('AllLeads');
  };

  const handleLeadPress = (lead) => {
    navigation.navigate('LeadDetails', { leadId: lead.id });
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: theme.spacings.spacing7 }}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.night} />
      ) : (
        <LeadsList
          leads={leads}
          onShowAll={handleShowAllLeads}
          onLeadPress={handleLeadPress}
        />
      )}
    </View>
  );
};

export default HomeScreen;
```

### Pull-to-Refresh Example

```javascript
import { RefreshControl } from 'react-native';

const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await fetchLeads();
  setRefreshing(false);
};

<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
>
  <LeadsList leads={leads} {...props} />
</ScrollView>
```

## Documentation

For more details, see:
- **README.md** - Complete component documentation
- **VISUAL_SPECIFICATIONS.md** - Design specifications
- **INITIALS_LOGIC.md** - Initials generation algorithm
- **LEADS_IMPLEMENTATION_SUMMARY.md** - Project-level summary

## Need Help?

Check the comprehensive documentation:
- Component code: `/src/screens/tabs/home/Leads/LeadsList.jsx`
- Sample data: `/src/screens/tabs/home/Leads/sampleData.js`
- Full README: `/src/screens/tabs/home/Leads/README.md`

---

**Quick Start Version**: 1.0
**Last Updated**: November 3, 2024
**Status**: Ready to use! 🚀

# Leads Section Component

This directory contains the Leads section component for the HomeScreen, displaying lead cards with company information, contact details, and deal counts.

## Files

- **LeadsList.jsx** - Main component displaying leads in stacked card layout
- **sampleData.js** - Mock data for testing (8 sample leads)
- **README.md** - This documentation file

## Component API

### LeadsList

```jsx
<LeadsList
  leads={leadsData}
  onShowAll={() => navigation.navigate('AllLeads')}
  onLeadPress={(lead) => console.log('Lead pressed:', lead)}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `leads` | Array | No | Array of lead objects (defaults to []) |
| `onShowAll` | Function | No | Callback when "Show all" button is pressed |
| `onLeadPress` | Function | No | Callback when a lead card is pressed, receives lead object |

#### Lead Data Structure

```javascript
{
  id: string,           // Unique identifier
  companyName: string,  // Company/organization name (used for avatar initials)
  contactName: string,  // Primary contact person name
  dealCount: number,    // Number of active deals with this lead
}
```

## Features

### ✅ Avatar Initials Generation
- Automatically generates 2-letter initials from company name
- Logic:
  - Multi-word names: First letter of first two words (e.g., "CreativePixel Agency" → "CA")
  - Single-word names: First two letters (e.g., "Microsoft" → "MI")
  - Fallback: "LD" (Lead Default) for edge cases

### ✅ Stacked Card Design
- First card: Rounded top corners (24px radius)
- Last card: Rounded bottom corners (24px radius)
- Middle cards: No border radius (flush stacked appearance)
- 1px border between cards
- Subtle elevation shadow (elevation: 2)

### ✅ Theme Integration
- Uses `useAppTheme()` hook for all colors and typography
- Supports light/dark mode switching
- Colors: `night`, `white`, `davysgrey`, `night10`
- Typography: `heading2Medium`, `BodyLargeBold`, `BodyMedium`, `BodySmallMedium`
- Spacings: Uses theme spacing scale

### ✅ Touch Feedback
- Pressable cards with opacity feedback (0.8 when pressed)
- "Show all" button with press feedback
- Card press callbacks for navigation

### ✅ Icon Integration
- Uses `CustomIcon` component from project
- Briefcase/suitcase icon for deal count display
- Navigation arrow icon in "Show all" button

### ✅ Empty State
- Displays "No leads available" message when leads array is empty
- Styled with theme colors for consistency

## Design Specifications

### Header
- Title: "Leads" (heading2Medium, 20px)
- "Show all" button: Border, right-aligned, with arrow icon
- Horizontal padding: 16px
- Bottom margin: 16px

### Lead Cards
- Background: White
- Border: 1px solid night10 (rgba(15,16,16,0.1))
- Padding: 16px
- Elevation: 2 with subtle shadow
- No gap between cards (stacked effect)

### Avatar Circle
- Size: 48×48px
- Background: #E8E8E8 (light gray)
- Border radius: 24px (perfect circle)
- Text: BodyLargeBold (16px), centered
- Color: night (dark text)
- Margin right: 12px

### Company Name
- Font: BodyLargeBold (16px, bold)
- Color: night (dark)
- Position: Top of info section
- Single line with ellipsis

### Contact Name
- Font: BodyMedium (14px)
- Color: davysgrey (gray)
- Margin top: 4px
- Single line with ellipsis

### Deal Count
- Briefcase icon: 16×16px, davysgrey tint
- Text: BodySmallMedium (12px), davysgrey
- Margin top: 8px
- Gap between icon and text: 6px

## Usage in HomeScreen

```javascript
import LeadsList from './Leads/LeadsList';
import { sampleLeads } from './Leads/sampleData';

const HomeScreen = () => {
  const handleShowAllLeads = () => {
    // Navigate to full leads screen
    navigation.navigate('AllLeads');
  };

  const handleLeadPress = (lead) => {
    // Navigate to lead details
    navigation.navigate('LeadDetails', { leadId: lead.id });
  };

  return (
    <View style={[{ paddingHorizontal: 16, marginTop: theme.spacings.spacing7 }]}>
      <LeadsList
        leads={sampleLeads}
        onShowAll={handleShowAllLeads}
        onLeadPress={handleLeadPress}
      />
    </View>
  );
};
```

## Future Enhancements

### API Integration (Ready for Implementation)

```javascript
// In HomeScreen or custom hook
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

### Potential Features

1. **Loading State**
   - Add skeleton loading for cards
   - Show spinner while fetching data

2. **Company Logo Support**
   - Add `logoUrl` field to data structure
   - Display logo image with fallback to initials
   - Cache logos for performance

3. **Status Badges**
   - Add "New" badge for recent leads
   - Add "Hot" badge for high-priority leads
   - Color-coded status indicators

4. **Pull-to-Refresh**
   - Implement refresh control in ScrollView
   - Fetch latest leads on pull down

5. **Pagination**
   - Load more leads on scroll
   - Implement infinite scroll pattern

6. **Search & Filter**
   - Filter by deal count range
   - Search by company or contact name
   - Sort by various criteria

7. **Swipe Actions**
   - Swipe to call contact
   - Swipe to send email
   - Swipe to archive lead

8. **Analytics**
   - Track card press events
   - Monitor "Show all" button usage
   - Measure engagement metrics

## Testing

### Manual Testing Checklist

- [ ] Component renders with sample data
- [ ] Cards display correct initials from company names
- [ ] Company names and contact names display correctly
- [ ] Deal count shows correct icon and number
- [ ] First card has rounded top corners
- [ ] Last card has rounded bottom corners
- [ ] Middle cards have no border radius
- [ ] Cards have proper spacing and padding
- [ ] "Show all" button is pressable
- [ ] Lead cards are pressable
- [ ] Theme colors apply correctly
- [ ] Empty state shows when no leads
- [ ] Dark mode compatibility (if enabled)

### Test Data

Current sample data includes 8 leads with varied:
- Company names (single and multi-word)
- Contact names
- Deal counts (2-6 deals)

Add more edge cases to sampleData.js for thorough testing:
```javascript
// Edge cases to test
{
  id: '9',
  companyName: 'X', // Single character
  contactName: 'Test User',
  dealCount: 1, // Singular "Deal"
},
{
  id: '10',
  companyName: 'Very Long Company Name That Should Truncate',
  contactName: 'Very Long Contact Name That Should Also Truncate',
  dealCount: 99,
}
```

## Troubleshooting

### Issue: Initials not showing correctly
- **Solution**: Check `getInitials()` function logic
- Verify company name is not null/undefined
- Add console.log to debug initials generation

### Issue: Cards not stacking properly
- **Solution**: Verify border radius logic in `renderLeadCard()`
- Ensure `isFirst` and `isLast` conditions are correct
- Check that no margin/gap is applied to cards

### Issue: Theme colors not applying
- **Solution**: Verify `useAppTheme()` hook is working
- Check that theme context provider wraps the app
- Ensure color keys match theme.js definitions

### Issue: Icons not displaying
- **Solution**: Verify icon name "suitcase" exists in CustomIcon
- Check icon path in CustomIcon.jsx
- Ensure PNG file exists in assets/icons/

## Design Reference

Original design source: `/src/ref_images/Leads-Section-Container.png`

The component matches the reference image exactly:
- Header layout and typography
- Avatar circle design and positioning
- Card stacking with proper border radius
- Deal count with briefcase icon
- Overall spacing and alignment

## Contributing

When updating this component:
1. Maintain theme integration patterns
2. Keep component API stable
3. Update documentation for new features
4. Add new sample data for testing
5. Test with light and dark themes
6. Verify accessibility (if applicable)

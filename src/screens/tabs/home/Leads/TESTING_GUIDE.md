# AllLeadsScreen Testing Guide

## Quick Start Testing

### 1. Run the Application

```bash
# Terminal 1: Start Metro bundler
npm start

# Terminal 2: Run on iOS
npm run ios

# OR Terminal 2: Run on Android
npm run android
```

### 2. Navigate to AllLeadsScreen

**From HomeScreen:**
1. App opens to HomeScreen by default
2. Scroll down to "Leads" section
3. Click **"Show all"** button (top right of Leads section)
4. AllLeadsScreen opens

**Expected Result:** ✅
- Page transition animation (slide from right)
- Header shows "Leads" with back button
- Search bar appears below header
- 10 lead cards displayed in stacked layout

### 3. Test Back Navigation

**Steps:**
1. Click the **back button** (← chevron) in header
2. Should return to HomeScreen

**Expected Result:** ✅
- Navigation back to HomeScreen
- No errors in console

### 4. Test Search Functionality

#### Test Case 1: Search by Company Name

**Steps:**
1. Click in search bar
2. Type: `creative`

**Expected Result:** ✅
- Only "CreativePixel Agency" appears
- Avatar shows "CP"
- Contact: "Emma Rodriguez"
- Deal count: "4 Deals"

#### Test Case 2: Search by Contact Name

**Steps:**
1. Clear search bar
2. Type: `emma`

**Expected Result:** ✅
- Same result as Test Case 1
- Filters by contact name correctly

#### Test Case 3: Partial Search

**Steps:**
1. Clear search bar
2. Type: `kolkata`

**Expected Result:** ✅
- Shows 2 results:
  - "Kolkata Tea Estates" (KT)
  - "Kolkata Trading Company" (KT)

#### Test Case 4: Case Insensitive

**Steps:**
1. Clear search bar
2. Type: `PUNE`

**Expected Result:** ✅
- Shows "Pune IT Solutions" (PI)
- Case doesn't matter

#### Test Case 5: No Results

**Steps:**
1. Clear search bar
2. Type: `xyz123`

**Expected Result:** ✅
- Shows empty state:
  - Search icon (grayed out)
  - "No results found for 'xyz123'"
  - "Try adjusting your search terms"

#### Test Case 6: Clear Search

**Steps:**
1. Clear search bar completely

**Expected Result:** ✅
- All 10 leads appear again
- List returns to full state

### 5. Test Card Interactions

#### Test Case 7: Click Lead Card

**Steps:**
1. Clear search bar
2. Click on any lead card

**Expected Result:** ✅
- Card shows press feedback (opacity: 0.8)
- Console logs: `Lead pressed: {lead object}`
- Example: `Lead pressed: { id: '1', companyName: 'CreativePixel Agency', ... }`

#### Test Case 8: Click Filter Button

**Steps:**
1. Click the filter button (square button next to search)

**Expected Result:** ✅
- Button shows press feedback
- Console logs: `Filter button pressed`
- (Modal not implemented yet - ready for future work)

### 6. Test Visual Design

#### Test Case 9: Stacked Cards

**Visual Checklist:**
- [ ] First card has rounded top corners (24px radius)
- [ ] Last card has rounded bottom corners (24px radius)
- [ ] Middle cards have NO border radius (straight edges)
- [ ] NO gaps between cards (flush stacked)
- [ ] All cards have 1px border (rgba(15,16,16,0.1))
- [ ] White background on all cards

#### Test Case 10: Avatar Initials

**Expected Initials:**

| Company | Expected | Visible |
|---------|----------|---------|
| CreativePixel Agency | CP | ✅ |
| Chennai Silk Emporium | CS | ✅ |
| Delhi Electronics Hub | DE | ✅ |
| Kolkata Tea Estates | KT | ✅ |
| Hyderabad Biryani House | HB | ✅ |
| Pune IT Solutions | PI | ✅ |
| Mumbai Real Estate Corp | MR | ✅ |
| Bangalore Tech Hub | BT | ✅ |
| Delhi Fashion House | DF | ✅ |
| Kolkata Trading Company | KT | ✅ |

**Check:**
- [ ] All avatars show correct 2-letter initials
- [ ] Avatars are perfect circles (48×48px)
- [ ] Light gray background (#E8E8E8)
- [ ] Dark text color (theme.colors.night)

#### Test Case 11: Typography

**Visual Checklist:**
- [ ] Company names are bold (BodyLargeBold, 16px)
- [ ] Contact names are medium weight (BodyMedium, 14px)
- [ ] Contact names are gray color (davysgrey)
- [ ] Deal counts are medium weight (BodySmallMedium, 12px)
- [ ] Deal counts are gray color (davysgrey)
- [ ] Header title is medium weight (heading2Medium, 20px)

#### Test Case 12: Icons

**Visual Checklist:**
- [ ] Search icon visible in search bar (20×20px)
- [ ] Filter icon visible in filter button (20×20px)
- [ ] Back button chevron visible in header (24×24px)
- [ ] Briefcase icon next to each deal count (16×16px)
- [ ] All icons properly tinted (gray for content, dark for header)

### 7. Test Scrolling Behavior

#### Test Case 13: Fixed Header

**Steps:**
1. Navigate to AllLeadsScreen
2. Scroll down through the lead list

**Expected Result:** ✅
- Header stays fixed at top (doesn't scroll)
- Search bar stays fixed at top (doesn't scroll)
- Only the leads list scrolls
- Back button always visible
- Search bar always accessible

#### Test Case 14: Scroll Performance

**Steps:**
1. Quickly scroll through all 10 leads
2. Scroll to bottom
3. Scroll back to top

**Expected Result:** ✅
- Smooth scrolling (no lag)
- No visual glitches
- Cards remain properly stacked
- Border radius stays correct

### 8. Test Edge Cases

#### Test Case 15: Single Result

**Steps:**
1. Search for: `munich` or any term with 1 result
2. Or create sample data with unique term

**Expected Result:** ✅
- Single card displays
- Still has rounded corners (both top and bottom)
- No visual issues with single card

#### Test Case 16: Empty Data

**Steps:**
1. Temporarily modify sampleData.js to empty array: `export const sampleLeads = [];`
2. Navigate to AllLeadsScreen

**Expected Result:** ✅
- Shows empty state:
  - Search icon
  - "No leads available"
  - "Add your first lead to get started"

**Cleanup:**
- Restore sampleData.js to original 10 leads

### 9. Test Theme Integration

#### Test Case 17: Theme Colors

**Visual Checklist:**
- [ ] Background: theme.colors.isabelline (light beige/gray)
- [ ] Cards: theme.colors.white
- [ ] Text: theme.colors.night (dark)
- [ ] Secondary text: theme.colors.davysgrey (gray)
- [ ] Borders: theme.colors.night10 (light gray)

**Note:** If dark mode is enabled in project:
- [ ] Test with light theme
- [ ] Test with dark theme
- [ ] All colors adapt properly

### 10. Test Error Handling

#### Test Case 18: Navigation Errors

**Steps:**
1. Navigate to AllLeadsScreen
2. Press back button multiple times quickly

**Expected Result:** ✅
- No crashes
- Returns to HomeScreen
- No navigation stack errors

#### Test Case 19: Search Input Edge Cases

**Test inputs:**
- Empty string: ``
- Spaces only: `   `
- Special characters: `@#$%`
- Very long string: 100+ characters
- Numbers: `123`

**Expected Result:** ✅
- No crashes
- Handles all input gracefully
- Shows "No results" for non-matches
- No console errors

### 11. Performance Testing

#### Test Case 20: Search Performance

**Steps:**
1. Type in search bar continuously
2. Type: `c` → `cr` → `cre` → `crea` → `creat`
3. Watch filtering update

**Expected Result:** ✅
- Real-time filtering (updates on every keystroke)
- No lag or delay
- Smooth transitions
- useMemo optimization working

#### Test Case 21: Memory Leaks

**Steps:**
1. Navigate to AllLeadsScreen
2. Go back to HomeScreen
3. Navigate to AllLeadsScreen again
4. Repeat 5-10 times

**Expected Result:** ✅
- No memory warnings
- App remains responsive
- No performance degradation
- Component properly unmounts/remounts

### 12. Accessibility Testing (Optional)

#### Test Case 22: Touch Targets

**Visual Checklist:**
- [ ] Back button: 40×40px (good touch target)
- [ ] Filter button: 48×48px (excellent touch target)
- [ ] Lead cards: Full width, 80+ height (excellent touch target)
- [ ] Search bar: 48px height (excellent touch target)

#### Test Case 23: Text Readability

**Visual Checklist:**
- [ ] All text clearly readable
- [ ] Sufficient contrast for gray text
- [ ] Bold text clearly distinguishable
- [ ] No text truncation issues

## Console Output Examples

### Expected Console Logs

**Lead Card Pressed:**
```
Lead pressed: {
  id: '1',
  companyName: 'CreativePixel Agency',
  contactName: 'Emma Rodriguez',
  dealCount: 4
}
```

**Filter Button Pressed:**
```
Filter button pressed
```

### No Errors Expected

✅ No red error messages
✅ No yellow warnings (except dev-mode warnings)
✅ No navigation warnings
✅ No component warnings

## Test Summary Checklist

### Core Functionality
- [ ] Navigation to/from AllLeadsScreen works
- [ ] Back button returns to HomeScreen
- [ ] Search filters by company name
- [ ] Search filters by contact name
- [ ] Search is case-insensitive
- [ ] Filter button is pressable
- [ ] Lead cards are pressable

### Visual Design
- [ ] Stacked card design (no gaps)
- [ ] First card rounded top
- [ ] Last card rounded bottom
- [ ] Correct avatar initials
- [ ] Proper typography styles
- [ ] All icons visible and correct size

### User Experience
- [ ] Header and search bar fixed
- [ ] Only leads list scrolls
- [ ] Empty states show helpful messages
- [ ] Touch targets are adequate
- [ ] Smooth scrolling performance

### Technical Quality
- [ ] No console errors
- [ ] No navigation issues
- [ ] No memory leaks
- [ ] Theme integration working
- [ ] Component properly imports/exports

## Troubleshooting Common Issues

### Issue: "Module not found" Error

**Problem:** Import path incorrect

**Solution:**
```javascript
// Verify imports in AllLeadsScreen.jsx
import LeadCard from './components/LeadCard';
import SearchBar from '../ActionItems/components/SearchBar';
import FilterButton from '../ActionItems/components/FilterButton';
import { sampleLeads } from './sampleData';
```

### Issue: Cards Have Gaps

**Problem:** Unexpected margins or padding

**Solution:**
- Check cardsContainer has no gap/margin
- Verify LeadCard has no marginBottom
- Ensure borderWidth: 1 on all sides

### Issue: Search Not Working

**Problem:** State not updating

**Solution:**
- Check useState for searchQuery
- Verify useMemo dependencies include searchQuery
- Ensure onChangeText prop connected to setSearchQuery

### Issue: Navigation Error

**Problem:** AllLeads route not registered

**Solution:**
```javascript
// In HomeStack.js
import AllLeadsScreen from '../../screens/tabs/home/Leads/AllLeadsScreen';

<Stack.Screen name="AllLeads" component={AllLeadsScreen} />
```

### Issue: Back Button Not Working

**Problem:** navigation.goBack() not called

**Solution:**
```javascript
const handleBack = () => {
  navigation.goBack();
};
```

## Success Criteria

✅ **All tests pass**
✅ **No console errors**
✅ **Design matches reference image**
✅ **Smooth user experience**
✅ **Ready for production use**

## Testing Completion Report

### Test Date: _____________

### Tester: _____________

### Results:

- Total Tests: 23
- Passed: ___ / 23
- Failed: ___ / 23
- Issues Found: ___________

### Notes:
_______________________
_______________________
_______________________

### Sign-off: ___________

---

**Testing Guide Version:** 1.0
**Last Updated:** November 4, 2025
**Component Version:** AllLeadsScreen v1.0

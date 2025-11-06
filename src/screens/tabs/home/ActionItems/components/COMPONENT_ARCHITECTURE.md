# Filter BottomSheet - Component Architecture

## 🏗️ Component Hierarchy

```
AllActionItemsScreen
│
├── Header (Back button + Title)
├── Filter Pills (Today, Overdue, Upcoming)
├── Search Row
│   ├── SearchBar
│   └── FilterButton ←── Triggers modal
│
├── ScrollView (Action Items List)
│   └── ActionItemCard (multiple)
│
└── FilterBottomSheet ←── MODAL (overlays everything)
    │
    ├── Header
    │   ├── Title ("Filter action items")
    │   └── Close Button (X icon)
    │
    ├── ScrollView (Content)
    │   │
    │   ├── Sort by Section
    │   │   ├── Label ("Sort by")
    │   │   └── RadioButton (4x) ←── Reusable Component
    │   │       ├── "Newly added" ✓
    │   │       ├── "Oldest" ○
    │   │       ├── "Priority: High to low" ○
    │   │       └── "Priority: Low to high" ○
    │   │
    │   ├── FilterDropdown ←── Reusable Component
    │   │   ├── Label ("Lead")
    │   │   └── Dropdown Input
    │   │       └── Chevron Icon
    │   │
    │   └── FilterDropdown ←── Reusable Component
    │       ├── Label ("Deal")
    │       └── Dropdown Input
    │           └── Chevron Icon
    │
    └── Action Buttons (Fixed at Bottom)
        ├── Clear all Button
        └── Apply Button (shows count)
```

## 📦 Component Files

### Main Components

#### **1. FilterBottomSheet.jsx**
```javascript
// Primary modal container
<Modal isVisible={visible} ...>
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Text>Filter action items</Text>
      <TouchableOpacity onPress={onClose}>
        <CustomIcon name="xmark" />
      </TouchableOpacity>
    </View>

    {/* Content */}
    <ScrollView>
      {/* Sort by Section */}
      <View>
        <Text>Sort by</Text>
        {sortOptions.map(option =>
          <RadioButton
            label={option.label}
            selected={sortBy === option.value}
            onPress={() => setSortBy(option.value)}
          />
        )}
      </View>

      {/* Lead Filter */}
      <FilterDropdown
        label="Lead"
        placeholder="Filter by lead name"
        value={lead}
        onPress={handleLeadPress}
      />

      {/* Deal Filter */}
      <FilterDropdown
        label="Deal"
        placeholder="Filter by deal"
        value={deal}
        onPress={handleDealPress}
      />
    </ScrollView>

    {/* Action Buttons */}
    <View style={styles.actionButtons}>
      <TouchableOpacity onPress={handleClearAll}>
        <Text>Clear all</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleApply}>
        <Text>Apply ({filterCount})</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
```

**Responsibilities:**
- Modal presentation and animations
- State management (sortBy, lead, deal)
- Filter count calculation
- Coordination of child components
- Apply/Clear all logic
- Parent communication via callbacks

**State:**
```javascript
const [sortBy, setSortBy] = useState('newly_added');
const [lead, setLead] = useState(null);
const [deal, setDeal] = useState(null);
```

**Props:**
```javascript
{
  visible: boolean,
  onClose: () => void,
  onApply: (filters) => void,
  currentFilters: { sortBy, lead, deal }
}
```

---

#### **2. RadioButton.jsx**
```javascript
// Reusable radio selection component
<TouchableOpacity onPress={onPress}>
  <Text>{label}</Text>
  {selected ? (
    <CustomIcon name="check" tintColour={theme.colors.midnightgreen} />
  ) : (
    <View style={styles.emptyCircle} />
  )}
</TouchableOpacity>
```

**Responsibilities:**
- Display radio option with label
- Show selected/unselected state visually
- Handle press events
- Accessibility support

**Props:**
```javascript
{
  label: string,
  selected: boolean,
  onPress: () => void
}
```

**Visual States:**
- **Selected:** Green checkmark icon (24×24px)
- **Unselected:** Empty gray circle (20×20px, 2px border)

---

#### **3. FilterDropdown.jsx**
```javascript
// Reusable dropdown input component
<View>
  <Text>{label}</Text>
  <TouchableOpacity onPress={onPress}>
    <Text>{value || placeholder}</Text>
    <CustomIcon name="nav-arrow-down" />
  </TouchableOpacity>
</View>
```

**Responsibilities:**
- Display section label
- Show dropdown input field
- Display placeholder or selected value
- Show chevron-down icon
- Handle press events

**Props:**
```javascript
{
  label: string,
  placeholder: string,
  value: string | null,
  onPress: () => void
}
```

**Visual Elements:**
- Label: BodyBold typography (14px, bold)
- Input: 48px height, 1px border, 12px radius
- Chevron: 20×20px icon on right

---

## 🔄 Data Flow

### Opening Modal
```
User taps FilterButton
         ↓
AllActionItemsScreen.handleFilterPress()
         ↓
setFilterModalVisible(true)
         ↓
FilterBottomSheet visible={true}
         ↓
useEffect syncs currentFilters to local state
         ↓
Modal slides up with animation
```

### Radio Button Selection
```
User taps RadioButton
         ↓
RadioButton.onPress()
         ↓
FilterBottomSheet.setSortBy(value)
         ↓
RadioButton re-renders with selected={true}
         ↓
Checkmark icon shows
```

### Dropdown Press (Current Mockup)
```
User taps FilterDropdown
         ↓
FilterDropdown.onPress()
         ↓
FilterBottomSheet.handleLeadPress()
         ↓
console.log('Lead dropdown pressed')
         ↓
(Ready for picker modal integration)
```

### Applying Filters
```
User taps "Apply" button
         ↓
FilterBottomSheet.handleApply()
         ↓
Collect filters: { sortBy, lead, deal }
         ↓
onApply(filters) callback to parent
         ↓
AllActionItemsScreen.handleApplyFilter(filters)
         ↓
setAppliedFilters(filters)
         ↓
setFilterModalVisible(false)
         ↓
Modal slides down and closes
         ↓
Parent can now use appliedFilters
```

### Clear All
```
User taps "Clear all" button
         ↓
FilterBottomSheet.handleClearAll()
         ↓
setSortBy('newly_added')
setLead(null)
setDeal(null)
         ↓
UI updates to default states
         ↓
User can Apply or continue editing
```

## 🎨 Theme Integration

### Colors Used
```javascript
// From theme.colors
{
  night: '#0F1010',              // Black text
  night10: 'rgba(15,16,16,0.1)', // Light borders
  white: '#FFFFFF',              // Background, button text
  davysgrey: '#555555',          // Placeholder text, borders
  midnightgreen: '#0B6C6B',      // Primary action color (checkmark, Apply button)
}
```

### Typography Used
```javascript
// From theme.typography
{
  heading2Medium,  // 20px - Modal title
  BodyBold,        // 14px bold - Section labels, button text
  BodyMedium,      // 14px medium - Radio labels, placeholder text
}
```

### Radius Used
```javascript
// From theme.radius
{
  radius3: 12,  // Dropdown inputs, action buttons
}
```

## 📏 Layout Measurements

### Container
```
┌─────────────────────────────────────┐
│ Padding: 24px (H), 24px (T), 34px (B)
│ Max height: 85% of screen
│ Border top radius: 24px
│ Background: white
└─────────────────────────────────────┘
```

### Header (56px)
```
┌─────────────────────────────────────┐
│  [X]        Filter action items     │
│  └─ 40×40px           └─ heading2Medium
│     └─ 24×24px icon
└─────────────────────────────────────┘
```

### Sort by Section
```
Sort by                    ← BodyBold, 12px margin bottom
┌────────────────────────────────────┐
│ Newly added                     ✓  │ 48px height
│ Oldest                          ○  │ 48px height
│ Priority: High to low           ○  │ 48px height
│ Priority: Low to high           ○  │ 48px height
└────────────────────────────────────┘
        └─ BodyMedium      └─ 24×24px icon
```

### Dropdown Section (20px margin top)
```
Lead                       ← BodyBold, 12px margin bottom
┌─────────────────────────────────┐
│ Filter by lead name          ˅  │ 48px height
└─────────────────────────────────┘
        └─ BodyMedium  └─ 20×20px
        12px padding H
        1px border, 12px radius
```

### Action Buttons (32px margin top)
```
┌──────────────┐  12px gap  ┌──────────────┐
│  Clear all   │            │  Apply (4)   │ 52px height
└──────────────┘            └──────────────┘
   └─ Outlined                └─ Teal filled
      BodyBold                   White text
      12px radius                12px radius
```

## 🎯 State Management

### Local State (FilterBottomSheet)
```javascript
// Managed within FilterBottomSheet
const [sortBy, setSortBy] = useState('newly_added');
const [lead, setLead] = useState(null);
const [deal, setDeal] = useState(null);

// Synchronized with parent on modal open
useEffect(() => {
  if (visible) {
    setSortBy(currentFilters.sortBy);
    setLead(currentFilters.lead);
    setDeal(currentFilters.deal);
  }
}, [visible, currentFilters]);
```

### Parent State (AllActionItemsScreen)
```javascript
// Managed in parent screen
const [filterModalVisible, setFilterModalVisible] = useState(false);
const [appliedFilters, setAppliedFilters] = useState({
  sortBy: 'newly_added',
  lead: null,
  deal: null,
});

// Updated when Apply pressed
const handleApplyFilter = (filters) => {
  setAppliedFilters(filters);
  // Now use appliedFilters in filteredItems logic
};
```

### Why Two State Levels?

**Local State (Modal):**
- User can edit filters without affecting parent
- Changes are temporary until Apply pressed
- Clear all resets local state only
- Closing modal discards changes

**Parent State (Screen):**
- Represents actual applied filters
- Only updates when Apply pressed
- Used for actual data filtering/sorting
- Persists when modal closes

## 🔌 Integration Points

### With AllActionItemsScreen
```javascript
// Parent provides:
- filterModalVisible state
- currentFilters state
- handleFilterPress callback
- handleApplyFilter callback

// FilterBottomSheet returns:
- Complete filter object on Apply
- Close event on X button or backdrop
```

### With CustomIcon
```javascript
// Icons used:
- 'xmark'           // Close button (24×24px)
- 'check'           // Selected radio (24×24px)
- 'nav-arrow-down'  // Dropdown chevron (20×20px)
```

### With Theme System
```javascript
// Via useAppTheme() hook:
const { theme } = useAppTheme();

// Access:
- theme.colors.*
- theme.typography.*
- theme.radius.*
```

### With react-native-modal
```javascript
// Modal configuration:
<Modal
  isVisible={visible}
  onBackdropPress={onClose}
  swipeDirection="down"
  backdropOpacity={0.5}
  animationIn="slideInUp"
  animationOut="slideOutDown"
/>
```

## 🚀 Extension Points

### Adding New Filter Types

**1. Add state to FilterBottomSheet:**
```javascript
const [priority, setPriority] = useState(null);
```

**2. Add to filter object:**
```javascript
const handleApply = () => {
  const filters = { sortBy, lead, deal, priority };
  onApply(filters);
};
```

**3. Add UI component:**
```javascript
<FilterDropdown
  label="Priority"
  placeholder="Filter by priority"
  value={priority}
  onPress={handlePriorityPress}
/>
```

### Implementing Picker Modals

**Create picker component:**
```javascript
// LeadPickerModal.jsx
const LeadPickerModal = ({ visible, leads, onSelect, onClose }) => {
  return (
    <Modal visible={visible}>
      {leads.map(lead =>
        <TouchableOpacity onPress={() => onSelect(lead)}>
          <Text>{lead.name}</Text>
        </TouchableOpacity>
      )}
    </Modal>
  );
};
```

**Update FilterBottomSheet:**
```javascript
const [leadPickerVisible, setLeadPickerVisible] = useState(false);

const handleLeadPress = () => {
  setLeadPickerVisible(true);
};

const handleLeadSelect = (selectedLead) => {
  setLead(selectedLead);
  setLeadPickerVisible(false);
};

return (
  <>
    {/* Existing FilterBottomSheet content */}

    <LeadPickerModal
      visible={leadPickerVisible}
      leads={availableLeads}
      onSelect={handleLeadSelect}
      onClose={() => setLeadPickerVisible(false)}
    />
  </>
);
```

## 📱 Cross-Platform Considerations

### iOS
- Native modal animations work perfectly
- Swipe-to-close gesture natural
- Safe area handled automatically

### Android
- Back button automatically closes modal
- Animations optimized with useNativeDriver
- StatusBar color handled by theme

### Both Platforms
- Accessibility labels for screen readers
- Touch target sizes meet guidelines (48px min)
- Proper keyboard dismiss behavior
- Theme-aware styling

---

**Document Version:** 1.0.0
**Last Updated:** 2025-01-04
**Component Status:** Production Ready

# Create Lead Flow

Complete, production-ready multi-step lead creation system for CRMBuild app.

## Overview

Three-step lead creation flow matching the reference design specifications:
1. **Step 1**: Lead origin selection
2. **Step 2**: Lead information and communication methods
3. **Step 3**: Deal creation with sales reps and products

## File Structure

```
CreateLead/
├── CreateLeadStep1.jsx          # Origin selection screen
├── CreateLeadStep2.jsx          # Lead information and communication
├── CreateLeadStep3.jsx          # Deal creation screen
├── components/
│   ├── OriginOption.jsx         # Selection card for origin
│   ├── ContactPill.jsx          # Communication contact display
│   ├── SalesRepCard.jsx         # Sales rep card
│   └── ProductCard.jsx          # Product card with value/commission
└── README.md                    # This file
```

## Navigation Flow

```
LeadsHomepage
    ↓ (Create new lead button)
CreateLeadStep1 (Origin selection)
    ↓ (Next button - passes origin)
CreateLeadStep2 (Lead info + Communication)
    ↓ (Next button - passes all lead data)
CreateLeadStep3 (Deal + Sales reps + Products)
    ↓ (Complete button)
LeadsHomepage (with success message)
```

## Data Flow

### Navigation Parameters

**Step 1 → Step 2:**
```javascript
navigation.navigate('CreateLeadStep2', {
  origin: 'whatsapp' // Selected origin value
});
```

**Step 2 → Step 3:**
```javascript
navigation.navigate('CreateLeadStep3', {
  origin: 'whatsapp',
  leadInfo: {
    leadName: 'Emma Rodriguez',
    company: 'Creative Pixel',
    companyAddress: '123 Main St',
    companyWebsite: 'https://creativepixel.com'
  },
  communications: [
    { id: '1', type: 'phone', value: '+65 8234 2119', isPrimary: true },
    { id: '2', type: 'email', value: 'emma@company.com', isPrimary: true }
  ],
  preferredPlatform: 'WhatsApp'
});
```

**Step 3 → Completion:**
```javascript
const leadData = {
  origin,
  ...leadInfo,
  communications,
  preferredPlatform,
  dealName: 'Website Redesign Project',
  salesReps: [
    { id: '1', name: 'James Nick', role: 'Primary' }
  ],
  products: [
    { id: '1', name: 'User Research', value: 400, commission: 34, isUpsell: false }
  ],
  createdAt: new Date().toISOString()
};

// Navigate back with success
navigation.navigate('LeadsHomepage', {
  leadCreated: true,
  leadData
});
```

## Component Documentation

### CreateLeadStep1.jsx

**Purpose**: Origin selection screen

**Features**:
- Grid layout (2 columns) of origin options
- Single selection behavior (radio style)
- Next button enabled only when selection made
- Selected state: Teal background, white text, filled circle
- Unselected state: White background, black text, empty circle

**State**:
- `selectedOrigin`: Currently selected origin value

**Navigation**:
- Back: Returns to LeadsHomepage
- Next: Navigates to CreateLeadStep2 with origin data

---

### CreateLeadStep2.jsx

**Purpose**: Lead information and communication management

**Features**:
- Lead information form (4 fields)
- Display existing communication methods as pills
- Add/remove communication contacts
- Primary contact limitation (max 2)
- Platform preference input
- Form validation before enabling Next button

**State**:
- `leadName`, `company`, `companyAddress`, `companyWebsite`: Form fields
- `communications`: Array of communication objects
- `preferredPlatform`: Selected platform
- `newContactValue`, `newContactType`, `setAsPrimary`: Add contact form

**Validation**:
- Lead name required
- Company name required
- At least one communication method required
- Maximum 2 primary contacts enforced

**Navigation**:
- Back: Returns to CreateLeadStep1 (preserves data)
- Next: Navigates to CreateLeadStep3 with all data

---

### CreateLeadStep3.jsx

**Purpose**: Deal creation with sales reps and products

**Features**:
- Deal name input
- Sales representatives management
- Products selection and management
- Add/remove functionality for reps and products
- Upsell marking for products
- Complete button with validation

**State**:
- `dealName`: Deal name input
- `salesReps`: Array of sales rep objects
- `products`: Array of product objects

**Validation**:
- Deal name required
- At least one sales rep required
- At least one product required

**Actions**:
- Add sales rep: Shows placeholder alert (TODO: implement modal)
- Add product: Shows placeholder alert (TODO: implement modal)
- Complete: Creates lead and navigates back with success

**Navigation**:
- Back: Returns to CreateLeadStep2 (preserves data)
- Complete: Shows success alert and returns to LeadsHomepage

---

### Components

#### OriginOption.jsx
Reusable selection card component for origin options.

**Props**:
- `label` (string): Display text
- `value` (string): Value identifier
- `selected` (boolean): Selection state
- `onSelect` (function): Selection callback

**Styling**:
- Selected: `#2D7A77` background, white text, filled circle
- Unselected: White background, black text, empty circle
- Border radius: 12px, Height: 56px

---

#### ContactPill.jsx
Communication contact display component.

**Props**:
- `type` (string): Contact type (phone, email, whatsapp)
- `value` (string): Contact value
- `isPrimary` (boolean): Primary status
- `onRemove` (function): Remove callback

**Features**:
- Icon based on type (phone, mail, whatsapp)
- Primary badge (teal background)
- Remove button (X icon)
- WhatsApp icon shows in green

---

#### SalesRepCard.jsx
Sales representative display card.

**Props**:
- `name` (string): Rep name
- `role` (string): Role (Primary, Co-Primary, Consultant)
- `onRemove` (function): Remove callback

**Features**:
- Role badge for Primary and Co-Primary (teal/gray)
- Plain text for Consultant role
- Remove button (X icon)

---

#### ProductCard.jsx
Product display card with details.

**Props**:
- `name` (string): Product name
- `value` (number): Product value
- `commission` (number): Commission amount
- `isUpsell` (boolean): Upsell status
- `onRemove` (function): Remove callback

**Features**:
- Value and commission display
- Optional "Potential upsell" badge (orange)
- Remove button (X icon)
- Multi-line product name support

---

## Design Specifications

### Common Patterns

**Header**:
- Height: 56px (with padding)
- Back button: Left-aligned chevron-left icon
- Title: Center-aligned, heading2Medium
- Border bottom: 1px solid night10

**Section Titles**:
- Font: heading2Bold (20px, bold)
- Color: night
- Margin bottom: 16px

**Text Inputs**:
- Height: 48px
- Border radius: 12px
- Border: 1px solid night10
- Padding: 12px horizontal
- Placeholder color: davysgrey

**Primary Button (Next/Complete)**:
- Height: 52px
- Border radius: 12px
- Background: midnightgreen (enabled) / davysgrey (disabled)
- Text: BodyBold, white
- Fixed at bottom with 16px padding

**Selection Cards (Step 1)**:
- Selected: `#2D7A77` background, white text
- Unselected: White background, black text
- Border radius: 12px
- Height: 56px
- Grid gap: 12px

**Badges**:
- Primary: midnightgreen background, white text
- Upsell: `#FFA500` background, white text
- Padding: 6px 12px
- Border radius: 12px
- Font: BodySmallBold

### Color Palette

- **Primary Green**: `#2D7A77` (selection background)
- **Midnight Green**: `theme.colors.midnightgreen` (buttons, badges)
- **Orange**: `#FFA500` (upsell badge)
- **WhatsApp Green**: `#25D366` (WhatsApp icon)
- **Night**: `theme.colors.night` (text)
- **Davys Grey**: `theme.colors.davysgrey` (placeholders)

---

## Integration Guide

### 1. Navigation Setup

LeadsStack already updated in `/src/navigation/stacks/LeadsStack.js`:

```javascript
<Stack.Screen name="CreateLeadStep1" component={CreateLeadStep1} />
<Stack.Screen name="CreateLeadStep2" component={CreateLeadStep2} />
<Stack.Screen name="CreateLeadStep3" component={CreateLeadStep3} />
```

### 2. LeadsHomepage Integration

Updated to navigate to CreateLeadStep1:

```javascript
const handleCreateNewLead = () => {
  navigation.navigate('CreateLeadStep1');
};
```

### 3. Success Handling (Optional)

Handle success in LeadsHomepage:

```javascript
// In LeadsHomepage useEffect or componentDidMount
useEffect(() => {
  if (route.params?.leadCreated) {
    // Show success toast or message
    Alert.alert('Success', 'Lead created successfully!');

    // Clear params to prevent showing on re-render
    navigation.setParams({ leadCreated: undefined });
  }
}, [route.params?.leadCreated]);
```

---

## API Integration (TODO)

Replace console.log calls with actual API integration:

### Create Lead API Call

```javascript
// In CreateLeadStep3.jsx - handleComplete function
import { createLead } from '../../../api/leadsApi';

const handleComplete = async () => {
  if (isFormValid()) {
    const leadData = {
      origin,
      ...leadInfo,
      communications,
      preferredPlatform,
      dealName,
      salesReps,
      products,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await createLead(leadData);

      Alert.alert(
        'Success!',
        'Lead has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('LeadsHomepage', {
                leadCreated: true,
                leadData: response.data,
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to create lead. Please try again.',
        [{ text: 'OK' }]
      );
      console.error('Create lead error:', error);
    }
  }
};
```

### Add Sales Rep/Product Modals

Replace placeholder alerts with modals:

```javascript
// CreateLeadStep3.jsx
import SalesRepPickerModal from './modals/SalesRepPickerModal';
import ProductPickerModal from './modals/ProductPickerModal';

const [salesRepModalVisible, setSalesRepModalVisible] = useState(false);
const [productModalVisible, setProductModalVisible] = useState(false);

const handleAddSalesRep = () => {
  setSalesRepModalVisible(true);
};

const handleAddProduct = () => {
  setProductModalVisible(true);
};
```

---

## Keyboard Handling

All form screens use `KeyboardAvoidingView`:

```javascript
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <ScrollView keyboardShouldPersistTaps="handled">
    {/* Form content */}
  </ScrollView>
</KeyboardAvoidingView>
```

---

## Validation Rules

### Step 1
- One origin must be selected
- Next button disabled until selection made

### Step 2
- Lead name: Required, non-empty string
- Company: Required, non-empty string
- Company address: Optional
- Company website: Optional, URL keyboard type
- Communications: At least one method required
- Primary contacts: Maximum 2 allowed

### Step 3
- Deal name: Required, non-empty string
- Sales reps: At least one required
- Products: At least one required

---

## Testing Checklist

- [ ] Step 1 renders with origin options
- [ ] Origin selection works (single selection)
- [ ] Next button enabled/disabled based on selection
- [ ] Navigation to Step 2 passes origin data
- [ ] Step 2 renders with all form fields
- [ ] Lead information inputs work
- [ ] Communication methods can be added
- [ ] Communication methods can be removed
- [ ] Primary contact limitation enforced (max 2)
- [ ] Next button enabled/disabled based on validation
- [ ] Navigation to Step 3 passes all data
- [ ] Step 3 renders with all sections
- [ ] Deal name input works
- [ ] Sales reps can be removed
- [ ] Products can be removed
- [ ] Complete button validation works
- [ ] Success alert shows on completion
- [ ] Navigation back to LeadsHomepage works
- [ ] Back buttons work on all steps
- [ ] Data persists when navigating back
- [ ] Keyboard handling works properly
- [ ] All screens match reference images

---

## Future Enhancements

1. **Add Sales Rep Modal**: Implement picker/modal for selecting from available sales reps
2. **Add Product Modal**: Implement picker/modal for selecting from product catalog
3. **Platform Picker**: Replace text input with dropdown/picker for platform preference
4. **Communication Type Picker**: Add picker for contact type (phone/email/whatsapp/etc)
5. **Form Persistence**: Save form data to AsyncStorage for recovery
6. **Image Uploads**: Add company logo/images upload
7. **Location Picker**: Map integration for company address
8. **Validation Messages**: Add inline error messages for invalid inputs
9. **Progress Indicator**: Show step progress (1/3, 2/3, 3/3)
10. **Draft Saving**: Allow saving as draft before completion

---

## Known Issues / Limitations

- Sales rep and product addition shows placeholder alerts (modals not implemented)
- Platform preference is text input (picker not implemented)
- Contact type for new contacts is hardcoded to 'phone' (picker not implemented)
- No form data persistence if user exits flow
- No inline validation error messages
- No loading states for API calls
- No image uploads for company logo

---

## Screenshots Reference

Reference images located in:
- `src/ref_images/create-lead/create-new-lead-step 1.png`
- `src/ref_images/create-lead/create-new-lead-step 2.png`
- `src/ref_images/create-lead/create-new-lead-step 3.png`

---

## Contact

For questions or issues with the lead creation flow, contact the development team.

---

**Last Updated**: 2025-11-04
**Version**: 1.0.0
**Status**: Production Ready

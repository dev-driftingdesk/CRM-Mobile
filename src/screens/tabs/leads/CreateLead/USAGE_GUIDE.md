# Create Lead Flow - Usage Guide

## Quick Start

### 1. Navigate to Leads Tab
```javascript
// User taps on "Leads" tab in bottom navigation
```

### 2. Tap "Create new lead" Button
```javascript
// In LeadsHomepage, user taps the teal button with plus icon
// Navigates to CreateLeadStep1
```

### 3. Complete Step 1 - Select Origin
```javascript
// User selects one origin (WhatsApp, Email, Instagram, etc.)
// Taps "Next" button
// Navigation: CreateLeadStep1 → CreateLeadStep2
```

### 4. Complete Step 2 - Lead Information
```javascript
// User fills in:
// - Lead name (required)
// - Company name (required)
// - Company address (optional)
// - Company website (optional)
//
// User manages communication methods:
// - View existing contacts (pre-populated for demo)
// - Add new contacts
// - Set primary contacts (max 2)
// - Remove contacts
//
// Taps "Next" button
// Navigation: CreateLeadStep2 → CreateLeadStep3
```

### 5. Complete Step 3 - Deal Creation
```javascript
// User fills in:
// - Deal name (required)
//
// User manages sales reps:
// - View existing reps (pre-populated for demo)
// - Add new reps (shows alert - TODO: implement modal)
// - Remove reps
//
// User manages products:
// - View existing products (pre-populated for demo)
// - Add new products (shows alert - TODO: implement modal)
// - Remove products
// - See value, commission, and upsell status
//
// Taps "Complete lead creation" button
// Shows success alert
// Navigation: CreateLeadStep3 → LeadsHomepage
```

---

## Code Examples

### Example 1: Navigating to Create Lead Flow

```javascript
// In LeadsHomepage.js
import { useNavigation } from '@react-navigation/native';

const LeadsHomepage = ({ navigation }) => {
  const handleCreateNewLead = () => {
    navigation.navigate('CreateLeadStep1');
  };

  return (
    <TouchableOpacity onPress={handleCreateNewLead}>
      <Text>Create new lead</Text>
    </TouchableOpacity>
  );
};
```

### Example 2: Receiving Lead Data After Completion

```javascript
// In LeadsHomepage.js
import { useEffect } from 'react';
import { Alert } from 'react-native';

const LeadsHomepage = ({ navigation, route }) => {
  useEffect(() => {
    // Check if lead was just created
    if (route.params?.leadCreated) {
      const { leadData } = route.params;

      Alert.alert('Success!', 'Lead created successfully');

      // Clear params to prevent showing alert on re-render
      navigation.setParams({
        leadCreated: undefined,
        leadData: undefined,
      });

      // Optional: Refresh leads list
      fetchLeads();
    }
  }, [route.params?.leadCreated]);

  return (
    // ... LeadsHomepage UI
  );
};
```

### Example 3: Custom Origin Options

```javascript
// In CreateLeadStep1.jsx
const originOptions = [
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Email', value: 'email' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Phone Call', value: 'phone' },
  { label: 'Referral', value: 'referral' },
  { label: 'Website', value: 'website' },
  { label: 'Walk-in', value: 'walkin' },

  // Add custom origins:
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Trade Show', value: 'tradeshow' },
];
```

### Example 4: Implementing API Integration

```javascript
// Create api/leadsApi.js
import axios from 'axios';

export const createLead = async (leadData) => {
  try {
    const response = await axios.post('/api/leads', leadData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// In CreateLeadStep3.jsx
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
      // Show loading state
      setLoading(true);

      // API call
      const response = await createLead(leadData);

      // Hide loading
      setLoading(false);

      // Success
      Alert.alert(
        'Success!',
        'Lead has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('LeadsHomepage', {
                leadCreated: true,
                leadData: response,
              });
            },
          },
        ]
      );
    } catch (error) {
      setLoading(false);

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

### Example 5: Sales Rep Picker Modal

```javascript
// Create components/SalesRepPickerModal.jsx
import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity } from 'react-native';

const SalesRepPickerModal = ({ visible, onClose, onSelect, availableReps }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Sales Rep</Text>

          <FlatList
            data={availableReps}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.repItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text>{item.name}</Text>
                <Text>{item.role}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// In CreateLeadStep3.jsx
import SalesRepPickerModal from './components/SalesRepPickerModal';

const CreateLeadStep3 = ({ navigation, route }) => {
  const [salesRepModalVisible, setSalesRepModalVisible] = useState(false);
  const [availableReps, setAvailableReps] = useState([
    { id: '5', name: 'John Doe', role: 'Consultant' },
    { id: '6', name: 'Jane Smith', role: 'Consultant' },
  ]);

  const handleAddSalesRep = () => {
    setSalesRepModalVisible(true);
  };

  const handleSelectSalesRep = (rep) => {
    setSalesReps((prev) => [...prev, rep]);
  };

  return (
    <>
      {/* ... existing UI */}

      <SalesRepPickerModal
        visible={salesRepModalVisible}
        onClose={() => setSalesRepModalVisible(false)}
        onSelect={handleSelectSalesRep}
        availableReps={availableReps}
      />
    </>
  );
};
```

### Example 6: Form Persistence with AsyncStorage

```javascript
// In CreateLeadStep2.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const DRAFT_KEY = '@lead_draft';

const CreateLeadStep2 = ({ navigation, route }) => {
  // ... existing state

  // Load draft on mount
  useEffect(() => {
    loadDraft();
  }, []);

  // Save draft whenever form changes
  useEffect(() => {
    saveDraft();
  }, [leadName, company, companyAddress, companyWebsite, communications]);

  const saveDraft = async () => {
    try {
      const draft = {
        leadName,
        company,
        companyAddress,
        companyWebsite,
        communications,
        preferredPlatform,
      };
      await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  const loadDraft = async () => {
    try {
      const draft = await AsyncStorage.getItem(DRAFT_KEY);
      if (draft) {
        const data = JSON.parse(draft);
        setLeadName(data.leadName || '');
        setCompany(data.company || '');
        setCompanyAddress(data.companyAddress || '');
        setCompanyWebsite(data.companyWebsite || '');
        setCommunications(data.communications || []);
        setPreferredPlatform(data.preferredPlatform || '');
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  };

  const clearDraft = async () => {
    try {
      await AsyncStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error('Failed to clear draft:', error);
    }
  };

  // Clear draft on successful completion
  const handleNext = () => {
    if (isFormValid()) {
      clearDraft();
      navigation.navigate('CreateLeadStep3', {
        // ... data
      });
    }
  };

  return (
    // ... existing UI
  );
};
```

---

## Customization Examples

### Changing Colors

```javascript
// In theme/theme.js
export const lightTheme = {
  colors: {
    // Change primary green color
    midnightgreen: '#0B6C6B', // Default
    // midnightgreen: '#2D7A77', // Alternative
    // midnightgreen: '#1A9B8E', // Brighter option
  },
};
```

### Adding New Origin Options

```javascript
// In CreateLeadStep1.jsx
const originOptions = [
  // ... existing options
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Trade Show', value: 'tradeshow' },
  { label: 'Cold Call', value: 'coldcall' },
];
```

### Customizing Validation Rules

```javascript
// In CreateLeadStep2.jsx
const isFormValid = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const websiteRegex = /^https?:\/\/.+/;

  return (
    leadName.trim() &&
    leadName.length >= 3 && // Minimum 3 characters
    company.trim() &&
    communications.length > 0 &&
    // Optional: Validate email format
    communications.every((comm) => {
      if (comm.type === 'email') {
        return emailRegex.test(comm.value);
      }
      return true;
    }) &&
    // Optional: Validate website format
    (!companyWebsite || websiteRegex.test(companyWebsite))
  );
};
```

---

## Testing Guide

### Manual Testing Checklist

**Step 1 Testing:**
```
1. Open app and navigate to Leads tab
2. Tap "Create new lead" button
3. Verify CreateLeadStep1 loads with origin options
4. Verify Next button is disabled
5. Select an origin (e.g., WhatsApp)
6. Verify selection shows teal background and white text
7. Verify Next button is enabled
8. Tap Next button
9. Verify navigation to CreateLeadStep2
10. Tap back button
11. Verify return to CreateLeadStep1 with selection preserved
```

**Step 2 Testing:**
```
1. Navigate to CreateLeadStep2
2. Verify lead information form loads
3. Fill in lead name (required)
4. Fill in company name (required)
5. Verify existing communication pills display
6. Tap X on a communication pill
7. Verify pill is removed
8. Add new communication method
9. Try to set as primary when limit reached
10. Verify checkbox is disabled
11. Verify Next button enabled only when required fields filled
12. Tap Next button
13. Verify navigation to CreateLeadStep3
14. Tap back button
15. Verify data is preserved
```

**Step 3 Testing:**
```
1. Navigate to CreateLeadStep3
2. Verify deal information section loads
3. Fill in deal name (required)
4. Verify sales rep cards display
5. Tap X on a sales rep card
6. Verify rep is removed
7. Tap "Add new sales rep" button
8. Verify alert/modal shows
9. Verify product cards display
10. Tap X on a product card
11. Verify product is removed
12. Tap "Add product" button
13. Verify alert/modal shows
14. Verify Complete button enabled only when required fields filled
15. Tap Complete button
16. Verify success alert shows
17. Tap OK
18. Verify navigation back to LeadsHomepage
```

### Automated Testing (Future)

```javascript
// __tests__/CreateLeadFlow.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import CreateLeadStep1 from '../CreateLeadStep1';

describe('CreateLeadFlow', () => {
  it('should navigate through all steps successfully', async () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <CreateLeadStep1 />
      </NavigationContainer>
    );

    // Step 1: Select origin
    const whatsappOption = getByText('WhatsApp');
    fireEvent.press(whatsappOption);

    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    // Step 2: Fill in lead information
    await waitFor(() => {
      expect(getByPlaceholderText('Enter lead name')).toBeTruthy();
    });

    // ... continue testing
  });
});
```

---

## Troubleshooting

### Issue: Next button not enabling on Step 2

**Solution**: Verify required fields are filled:
```javascript
console.log('leadName:', leadName);
console.log('company:', company);
console.log('communications:', communications);
console.log('isFormValid:', isFormValid());
```

### Issue: Navigation not working

**Solution**: Verify screens are registered in LeadsStack:
```javascript
// In LeadsStack.js
<Stack.Screen name="CreateLeadStep1" component={CreateLeadStep1} />
<Stack.Screen name="CreateLeadStep2" component={CreateLeadStep2} />
<Stack.Screen name="CreateLeadStep3" component={CreateLeadStep3} />
```

### Issue: Data not persisting when going back

**Solution**: Navigation params are automatically preserved. Verify you're using `navigation.goBack()` instead of `navigation.navigate()`.

### Issue: Keyboard covering inputs

**Solution**: Already implemented with KeyboardAvoidingView. Verify:
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

## Performance Tips

1. **Lazy Loading**: Screens are lazy loaded by React Navigation automatically
2. **Memoization**: Consider memoizing components if experiencing performance issues
3. **List Optimization**: Use FlatList for long lists of reps/products
4. **Image Optimization**: Compress images before upload
5. **API Caching**: Cache frequently accessed data

---

## Accessibility

All components follow accessibility best practices:
- Proper semantic structure
- Touchable areas ≥44x44 points
- Color contrast meets WCAG AA standards
- Screen reader support via proper labels
- Keyboard navigation support

---

## Support

For additional help:
1. Review main README: `/src/screens/tabs/leads/CreateLead/README.md`
2. Check implementation summary: `/CREATE_LEAD_IMPLEMENTATION_SUMMARY.md`
3. Review reference images: `/src/ref_images/create-lead/`
4. Contact development team

---

**Last Updated**: 2025-11-04
**Version**: 1.0.0

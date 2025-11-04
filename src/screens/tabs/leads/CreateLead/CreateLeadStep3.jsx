import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import SalesRepCard from './components/SalesRepCard';
import ProductCard from './components/ProductCard';

/**
 * CreateLeadStep3 - Deal Creation Screen
 *
 * Third and final step in the multi-step lead creation flow.
 * User creates deal with sales reps and products.
 *
 * Features:
 * - Deal information form
 * - Sales representatives management
 * - Products selection and management
 * - Upsell marking for products
 * - Complete lead creation button
 * - Success feedback and navigation back
 *
 * Navigation:
 * - Back: Returns to CreateLeadStep2 (preserves data)
 * - Complete: Creates lead and returns to LeadsHomepage with success
 */
const CreateLeadStep3 = ({ navigation, route }) => {
  const { theme } = useAppTheme();
  const { origin, leadInfo, communications, preferredPlatform } =
    route.params || {};

  // Deal Information State
  const [dealName, setDealName] = useState('');

  // Sales Representatives State
  const [salesReps, setSalesReps] = useState([
    { id: '1', name: 'James Nick', role: 'Primary' },
    { id: '2', name: 'Sarah Lee', role: 'Co-Primary' },
    { id: '3', name: 'Marcus Tan', role: 'Consultant' },
    { id: '4', name: 'Olivia Carter', role: 'Consultant' },
  ]);

  // Products State
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'User Research Fundamentals',
      value: 400,
      commission: 34,
      isUpsell: false,
    },
    {
      id: '2',
      name: 'Advanced Design Patterns',
      value: 650,
      commission: 55,
      isUpsell: true,
    },
  ]);

  /**
   * Handle back button press
   */
  const handleBack = () => {
    navigation.goBack();
  };

  /**
   * Remove sales rep
   */
  const handleRemoveSalesRep = (id) => {
    setSalesReps((prev) => prev.filter((rep) => rep.id !== id));
  };

  /**
   * Add sales rep (placeholder)
   */
  const handleAddSalesRep = () => {
    console.log('Add sales rep - TODO: Open picker/modal');
    // Future: Open modal to select from available sales reps
    Alert.alert('Add Sales Rep', 'Sales rep selection modal coming soon!');
  };

  /**
   * Remove product
   */
  const handleRemoveProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  /**
   * Add product (placeholder)
   */
  const handleAddProduct = () => {
    console.log('Add product - TODO: Open picker/modal');
    // Future: Open modal to select from available products
    Alert.alert('Add Product', 'Product selection modal coming soon!');
  };

  /**
   * Check if form is valid
   */
  const isFormValid = () => {
    return (
      dealName.trim() && salesReps.length > 0 && products.length > 0
    );
  };

  /**
   * Handle Complete button press
   * Creates lead and navigates back with success
   */
  const handleComplete = () => {
    if (isFormValid()) {
      // Compile complete lead data
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

      console.log('Creating lead:', leadData);

      // TODO: API call to create lead
      // await createLead(leadData);

      // Show success message
      Alert.alert(
        'Success!',
        'Lead has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to LeadsHomepage with success indicator
              navigation.navigate('LeadsHomepage', {
                leadCreated: true,
                leadData,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.isabelline }]}
      edges={['top']}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.white,
            borderBottomColor: theme.colors.night10,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <CustomIcon
            name="nav-arrow-left"
            width={24}
            height={24}
            tintColour={theme.colors.night}
          />
        </TouchableOpacity>
        <Text
          style={[
            theme.typography.heading2Medium,
            { color: theme.colors.night },
          ]}
        >
          Create new deal
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Deal Information Section */}
          <View style={styles.section}>
            <Text
              style={[
                theme.typography.heading2Bold,
                { color: theme.colors.night, marginBottom: 8 },
              ]}
            >
              Deal Information
            </Text>
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.davysgrey, marginBottom: 16 },
              ]}
            >
              Name this deal to keep track properly
            </Text>

            {/* Deal Name */}
            <Text style={[theme.typography.BodyBold, styles.label]}>
              Deal name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.white,
                  borderColor: theme.colors.night10,
                  color: theme.colors.night,
                },
                theme.typography.BodyMedium,
              ]}
              placeholder="Enter deal name"
              placeholderTextColor={theme.colors.davysgrey}
              value={dealName}
              onChangeText={setDealName}
            />
          </View>

          {/* Sales Representatives Section */}
          <View style={styles.section}>
            <Text
              style={[
                theme.typography.heading2Bold,
                { color: theme.colors.night, marginBottom: 16 },
              ]}
            >
              Sales Representatives
            </Text>

            {/* Sales Rep Cards */}
            {salesReps.map((rep) => (
              <SalesRepCard
                key={rep.id}
                name={rep.name}
                role={rep.role}
                onRemove={() => handleRemoveSalesRep(rep.id)}
              />
            ))}

            {/* Add Sales Rep Button */}
            <TouchableOpacity
              style={[
                styles.addButton,
                { borderColor: theme.colors.night10 },
              ]}
              onPress={handleAddSalesRep}
              activeOpacity={0.7}
            >
              <CustomIcon
                name="plus"
                width={16}
                height={16}
                tintColour={theme.colors.night}
              />
              <Text
                style={[
                  theme.typography.BodyMedium,
                  { color: theme.colors.night },
                ]}
              >
                Add new sales rep
              </Text>
            </TouchableOpacity>
          </View>

          {/* Products Section */}
          <View style={styles.section}>
            <Text
              style={[
                theme.typography.heading2Bold,
                { color: theme.colors.night, marginBottom: 8 },
              ]}
            >
              Products
            </Text>
            <Text
              style={[
                theme.typography.BodyMedium,
                {
                  color: theme.colors.davysgrey,
                  marginBottom: 16,
                  lineHeight: 20,
                },
              ]}
            >
              Select products the lead might be interested in, you can tag a
              product as an upsell also
            </Text>

            {/* Product Cards */}
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                value={product.value}
                commission={product.commission}
                isUpsell={product.isUpsell}
                onRemove={() => handleRemoveProduct(product.id)}
              />
            ))}

            {/* Add Product Button */}
            <TouchableOpacity
              style={[
                styles.addButton,
                { borderColor: theme.colors.night10 },
              ]}
              onPress={handleAddProduct}
              activeOpacity={0.7}
            >
              <CustomIcon
                name="plus"
                width={16}
                height={16}
                tintColour={theme.colors.night}
              />
              <Text
                style={[
                  theme.typography.BodyMedium,
                  { color: theme.colors.night },
                ]}
              >
                Add product
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Padding */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            {
              backgroundColor: isFormValid()
                ? theme.colors.midnightgreen
                : theme.colors.davysgrey,
            },
          ]}
          onPress={handleComplete}
          disabled={!isFormValid()}
          activeOpacity={0.8}
        >
          <Text
            style={[theme.typography.BodyBold, { color: theme.colors.white }]}
          >
            Complete lead creation
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerSpacer: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    marginBottom: 8,
    color: '#0F1010',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  completeButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateLeadStep3;

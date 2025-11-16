import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import SalesRepCard from './components/SalesRepCard';
import ProductCard from './components/ProductCard';
import FormInput from './components/FormInput';
import SalesRepSelectorBottomSheet from './components/SalesRepSelectorBottomSheet';
import ProductSelectorBottomSheet from './components/ProductSelectorBottomSheet';
import SuccessModal from '../../../../components/modals/SuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLead,
  fetchLeads,
} from '../../../../store/slices/leads/leadsThunks';
import leadsService from '../../../../services/lead-service/leadsService';

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
  const { creating } = useSelector(state => state.leads);
  // Destructure using backend field names
  const {
    originatedFrom,
    leadName,
    company,
    companyAddress,
    companyWebsite,
    contactNumber,
    communication,
    platform,
  } = route.params || {};

  // Deal Information State
  const [dealName, setDealName] = useState('');
  const dispatch = useDispatch();
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
      name: 'Wireframing & Prototyping in Figma',
      value: 400,
      commission: 34,
      isUpsell: false,
    },
    {
      id: '3',
      name: 'Usability Testing Bootcamp',
      value: 400,
      commission: 34,
      isUpsell: true,
    },
  ]);

  // Modal visibility state
  const [showSalesRepModal, setShowSalesRepModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /**
   * Handle back button press
   */
  const handleBack = () => {
    navigation.goBack();
  };

  /**
   * Remove sales rep
   */
  const handleRemoveSalesRep = id => {
    setSalesReps(prev => prev.filter(rep => rep.id !== id));
  };

  /**
   * Add sales rep - Open selection modal
   */
  const handleAddSalesRep = () => {
    setShowSalesRepModal(true);
  };

  /**
   * Handle sales rep selection confirmation
   */
  const handleConfirmSalesReps = newReps => {
    setSalesReps(newReps);
    setShowSalesRepModal(false);
  };

  /**
   * Remove product
   */
  const handleRemoveProduct = id => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  /**
   * Add product - Open selection modal
   */
  const handleAddProduct = () => {
    setShowProductModal(true);
  };

  /**
   * Handle product selection confirmation
   */
  const handleConfirmProducts = newProducts => {
    setProducts(newProducts);
    setShowProductModal(false);
  };

  /**
   * Check if form is valid
   */
  const isFormValid = () => {
    return dealName.trim() && salesReps.length > 0 && products.length > 0;
  };

  /**
   * Handle Complete button press
   * Creates lead and navigates back with success
   * Data is already in backend format (no mapping needed)
   */
  const handleComplete = async () => {
    if (isFormValid()) {
      const leadData = {
        originatedFrom,
        leadName,
        company,
        companyAddress,
        companyWebsite,
        communication,
        platform,
        contactNumber,
        // dealId: '4c144ac6-9eb1-410d-9b3c-f5853930bbd2',
      };
      console.log('Creating lead with backend format:', leadData);
      // API call to create lead
      const response = await dispatch(createLead(leadData));
      if (
        response?.payload?.status === 201 &&
        response?.payload?.data?.success
      ) {
        setShowSuccessModal(true);
        dispatch(fetchLeads());
        //  Back to LeadsHomepage handled in success modal close
      } else {
        // Show error alert
        const errorMessage =
          response?.payload?.data?.message ||
          response?.error?.message ||
          'Failed to create lead. Please try again.';

        Alert.alert('Error', errorMessage, [
          {
            text: 'OK',
            style: 'default',
          },
        ]);
      }
      console.log(response);
    }
  };

  /**
   * Handle success modal close
   */
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // Navigate back to LeadsHomepage
    navigation.navigate('LeadsHomepage', {
      leadCreated: true,
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.white }]}
      edges={['top']}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: theme.colors.night10,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton, { borderColor: theme.colors.night10 }]}
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
            theme.typography.BodyLargeMedium,
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
          <View style={[styles.section, { borderColor: theme.colors.night10 }]}>
            <Text
              style={[
                theme.typography.heading2Medium,
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

            <FormInput
              label="Deal name"
              placeholder="e.g. UX Team Skill Upgrade Program"
              value={dealName}
              onChangeText={setDealName}
              required
            />
          </View>

          {/* Sales Representatives Section */}
          <View style={[styles.section, { borderColor: theme.colors.night10 }]}>
            <Text
              style={[
                theme.typography.heading2Medium,
                {
                  color: theme.colors.night,
                  marginBottom: 16,
                },
              ]}
            >
              Sales Representatives
            </Text>

            {/* Sales Rep Cards - Stacked Container */}
            <View>
              {salesReps.map((rep, index) => (
                <SalesRepCard
                  key={rep.id}
                  name={rep.name}
                  role={rep.role}
                  onRemove={() => handleRemoveSalesRep(rep.id)}
                  isFirst={index === 0}
                  isLast={index === salesReps.length - 1}
                />
              ))}
            </View>

            {/* Add Sales Rep Button */}
            <TouchableOpacity
              style={[
                styles.addButton,
                { borderColor: theme.colors.night, marginTop: 12 },
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
          <View style={[styles.section, { borderColor: theme.colors.night10 }]}>
            <Text
              style={[
                theme.typography.heading2Medium,
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

            {/* Product Cards - Stacked Container */}
            <View>
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  value={product.value}
                  commission={product.commission}
                  isUpsell={product.isUpsell}
                  onRemove={() => handleRemoveProduct(product.id)}
                  isFirst={index === 0}
                  isLast={index === products.length - 1}
                />
              ))}
            </View>

            {/* Add Product Button */}
            <TouchableOpacity
              style={[
                styles.addButton,
                { borderColor: theme.colors.night, marginTop: 12 },
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
              backgroundColor:
                isFormValid() && !creating
                  ? theme.colors.midnightgreen
                  : theme.colors.davysgrey,
            },
          ]}
          onPress={handleComplete}
          disabled={!isFormValid() || creating}
          activeOpacity={0.8}
        >
          {creating ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={theme.colors.white} size="small" />
              <Text
                style={[
                  theme.typography.BodyMedium,
                  { color: theme.colors.white, marginLeft: 8 },
                ]}
              >
                Creating lead...
              </Text>
            </View>
          ) : (
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.white },
              ]}
            >
              Complete lead creation
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Sales Rep Selector Modal */}
      <SalesRepSelectorBottomSheet
        visible={showSalesRepModal}
        onClose={() => setShowSalesRepModal(false)}
        onConfirm={handleConfirmSalesReps}
        currentSalesReps={salesReps}
      />

      {/* Product Selector Modal */}
      <ProductSelectorBottomSheet
        visible={showProductModal}
        onClose={() => setShowProductModal(false)}
        onConfirm={handleConfirmProducts}
        currentProducts={products}
      />

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        title="Lead Created!"
        message="Your lead has been created successfully and added to your leads list."
        buttonText="View Leads"
        onClose={handleSuccessClose}
      />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 100,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
    marginBottom: 28,
    borderBottomWidth: 1,
    paddingBottom: 22,
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateLeadStep3;

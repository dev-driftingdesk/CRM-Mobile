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
  updateLead,
} from '../../../../store/slices/leads/leadsThunks';
import { createDeal } from '../../../../store/slices/deals/dealsThunks';
import leadsService from '../../../../services/lead-service/leadsService';

/**
 * CreateLeadStep3 - Deal Creation Screen
 *
 * Third and final step in the multi-step lead creation flow.
 * User creates deal with sales reps and products.
 *
 * Features:
 * - Deal information form
 * - Dynamic sales representatives selection (fetched from API)
 * - Dynamic products selection (fetched from Redux)
 * - Upsell marking for products
 * - Complete lead + deal creation button
 * - Automatic deal creation after lead is created
 * - Automatic lead update with deal ID
 * - Success feedback and navigation back
 *
 * Flow:
 * 1. User fills deal name
 * 2. User selects sales reps from API
 * 3. User selects products from Redux store
 * 4. On Complete:
 *    a) Creates lead (POST /leads)
 *    b) Creates deal with lead ID (POST /deals)
 *    c) Updates lead with deal ID (PUT /leads/:id)
 *
 * Navigation:
 * - Back: Returns to CreateLeadStep2 (preserves data)
 * - Complete: Creates lead + deal, links them, returns to LeadsHomepage with success
 *
 * Data Flow:
 * - No hardcoded data
 * - Sales reps fetched from users API
 * - Products fetched from Redux products state
 * - Deal payload includes: dealName, productIds[], salesReps[], leadId
 * - Lead update payload includes: dealId
 */
const CreateLeadStep3 = ({ navigation, route }) => {
  const { theme } = useAppTheme();
  const { creating, updating } = useSelector(state => state.leads);
  const { creating: isDealCreating } = useSelector(state => state.deals);
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

  // Sales Representatives State - Start with empty array
  const [salesReps, setSalesReps] = useState([]);

  // Products State - Start with empty array
  const [products, setProducts] = useState([]);

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
   *
   * Complete flow:
   * 1. Create lead (POST /leads)
   * 2. Create deal with lead ID (POST /deals)
   * 3. Update lead with deal ID (PUT /leads/:id)
   *
   * Data is already in backend format (no mapping needed)
   */
  const handleComplete = async () => {
    if (isFormValid()) {
      try {
        // Step 1: Create the lead
        const leadData = {
          originatedFrom,
          leadName,
          company,
          companyAddress,
          companyWebsite,
          communication,
          platform,
          contactNumber,
        };
        console.log('📝 Creating lead with backend format:', leadData);

        const leadResponse = await dispatch(createLead(leadData));

        if (
          leadResponse?.payload?.status === 201 &&
          leadResponse?.payload?.data?.success
        ) {
          // Extract the newly created lead ID from response
          const newLeadId = leadResponse?.payload?.data?.data?.id;
          console.log('✅ Lead created successfully with ID:', newLeadId);

          // Step 2: Create the deal with the new lead ID
          if (newLeadId) {
            const dealData = {
              dealName: dealName,
              productIds: products.map(product => product.id),
              salesReps: salesReps.map(rep => rep.id),
              leadId: newLeadId,
            };
            console.log('📝 Creating deal with data:', dealData);

            const dealResponse = await dispatch(createDeal(dealData));

            if (
              dealResponse?.payload?.status === 201 &&
              dealResponse?.payload?.data?.success
            ) {
              // Extract the newly created deal ID from response
              const newDealId = dealResponse?.payload?.data?.data?.id;
              console.log('✅ Deal created successfully with ID:', newDealId);

              // Step 3: Update the lead with the deal ID
              if (newDealId) {
                const updateLeadData = {
                  dealId: newDealId,
                };
                console.log('📝 Updating lead with deal ID:', updateLeadData);

                const updateResponse = await dispatch(
                  updateLead({ leadId: newLeadId, leadData: updateLeadData }),
                );

                if (
                  updateResponse?.payload?.status === 200 ||
                  updateResponse?.payload?.data?.success
                ) {
                  console.log('✅ Lead updated successfully with deal ID');
                  setShowSuccessModal(true);
                  dispatch(fetchLeads());
                } else {
                  // Lead update failed but deal was created
                  console.warn('⚠️ Failed to update lead with deal ID');
                  // Still show success since both lead and deal were created
                  setShowSuccessModal(true);
                  dispatch(fetchLeads());
                }
              } else {
                // No deal ID returned, but deal was created
                console.warn('⚠️ No deal ID returned from deal creation');
                setShowSuccessModal(true);
                dispatch(fetchLeads());
              }
            } else {
              // Deal creation failed
              const dealErrorMessage =
                dealResponse?.payload?.data?.message ||
                dealResponse?.error?.message ||
                'Lead created but failed to create deal. You can add a deal later.';

              Alert.alert('Partial Success', dealErrorMessage, [
                {
                  text: 'OK',
                  style: 'default',
                  onPress: () => {
                    // Still show success and navigate since lead was created
                    setShowSuccessModal(true);
                    dispatch(fetchLeads());
                  },
                },
              ]);
            }
          } else {
            // No lead ID returned, show warning
            Alert.alert(
              'Warning',
              'Lead created but could not create associated deal. Please add a deal manually.',
              [
                {
                  text: 'OK',
                  style: 'default',
                  onPress: () => {
                    setShowSuccessModal(true);
                    dispatch(fetchLeads());
                  },
                },
              ],
            );
          }
        } else {
          // Lead creation failed
          const errorMessage =
            leadResponse?.payload?.data?.message ||
            leadResponse?.error?.message ||
            'Failed to create lead. Please try again.';

          Alert.alert('Error', errorMessage, [
            {
              text: 'OK',
              style: 'default',
            },
          ]);
        }
      } catch (error) {
        console.error('❌ Error in handleComplete:', error);
        Alert.alert(
          'Error',
          'An unexpected error occurred. Please try again.',
          [
            {
              text: 'OK',
              style: 'default',
            },
          ],
        );
      }
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
                  productName={product.productName}
                  productValue={product.productValue}
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
          {creating || isDealCreating || updating ? (
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
        title="Lead & Deal Created!"
        message="Your lead and associated deal have been created successfully."
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

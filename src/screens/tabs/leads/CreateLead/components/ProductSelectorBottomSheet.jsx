import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppTheme } from '../../../../../context/ThemeContext';
import CustomIcon from '../../../../../assets/icons/CustomIcon';

// Available products (mock data)
const availableProducts = [
  {
    id: '1',
    name: 'User Research Fundamentals',
    value: 400,
    commission: 34,
  },
  {
    id: '2',
    name: 'Wireframing & Prototyping in Figma',
    value: 400,
    commission: 34,
  },
  {
    id: '3',
    name: 'Usability Testing Bootcamp',
    value: 400,
    commission: 34,
  },
  {
    id: '4',
    name: 'Front-End Developer Bootcamp Package',
    value: 600,
    commission: 50,
  },
  {
    id: '5',
    name: 'Project Management Essentials',
    value: 350,
    commission: 28,
  },
  {
    id: '6',
    name: 'Creative Director Accelerator',
    value: 750,
    commission: 65,
  },
  {
    id: '7',
    name: 'Advanced CSS & Styling Techniques',
    value: 450,
    commission: 38,
  },
  {
    id: '8',
    name: 'JavaScript for Designers',
    value: 500,
    commission: 42,
  },
];

/**
 * ProductSelectorBottomSheet - Product Selection Modal
 *
 * Features:
 * - Search functionality for filtering products
 * - Selected products pills row (horizontal scroll)
 * - Multi-select product list with radio buttons
 * - Position assignment: Primary product / Potential upsell
 * - Confirm/Cancel actions
 *
 * @param {boolean} visible - Modal visibility state
 * @param {function} onClose - Callback when modal closes
 * @param {function} onConfirm - Callback when selection confirmed
 * @param {Array} currentProducts - Currently selected products
 */
const ProductSelectorBottomSheet = ({
  visible,
  onClose,
  onConfirm,
  currentProducts = [],
}) => {
  const { theme } = useAppTheme();

  // Initialize selected products from current products
  const [selectedProducts, setSelectedProducts] = useState(() =>
    currentProducts.map((prod) => ({
      ...prod,
      position: prod.isUpsell ? 'Potential upsell' : 'Primary product',
    }))
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return availableProducts;
    const query = searchQuery.toLowerCase();
    return availableProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Check if product is selected
  const isProductSelected = (productId) => {
    return selectedProducts.some((p) => p.id === productId);
  };

  // Get selected product data
  const getSelectedProduct = (productId) => {
    return selectedProducts.find((p) => p.id === productId);
  };

  // Toggle product selection
  const toggleProductSelection = (product) => {
    const isSelected = isProductSelected(product.id);
    if (isSelected) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        { ...product, position: 'Primary product' },
      ]);
    }
  };

  // Update product position
  const updateProductPosition = (productId, position) => {
    setSelectedProducts((prev) =>
      prev.map((prod) => (prod.id === productId ? { ...prod, position } : prod))
    );
  };

  // Handle confirm
  const handleConfirm = () => {
    const productsToAdd = selectedProducts.map((prod) => ({
      id: prod.id,
      name: prod.name,
      value: prod.value,
      commission: prod.commission,
      isUpsell: prod.position === 'Potential upsell',
    }));
    onConfirm(productsToAdd);
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset to current products
    setSelectedProducts(
      currentProducts.map((prod) => ({
        ...prod,
        position: prod.isUpsell ? 'Potential upsell' : 'Primary product',
      }))
    );
    setSearchQuery('');
    onClose();
  };

  // Remove product from selected pills
  const removeFromSelected = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Render selected product pill
  const renderSelectedPill = (product) => {
    // Truncate name if too long
    const displayName =
      product.name.length > 25
        ? product.name.substring(0, 25) + '...'
        : product.name;

    return (
      <View
        key={product.id}
        style={[styles.selectedPill, { backgroundColor: '#F5F5F5' }]}
      >
        <Text
          style={[
            theme.typography.BodySmall,
            { color: theme.colors.night, flex: 1 },
          ]}
          numberOfLines={1}
        >
          {displayName}
        </Text>
        <TouchableOpacity
          onPress={() => removeFromSelected(product.id)}
          style={styles.pillRemoveButton}
          activeOpacity={0.7}
        >
          <CustomIcon
            name="xmark"
            width={12}
            height={12}
            tintColour={theme.colors.night}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // Render position pills for selected product
  const renderPositionPills = (product) => {
    const positions = ['Primary product', 'Potential upsell'];
    return (
      <View style={styles.positionPillsContainer}>
        <Text
          style={[
            theme.typography.BodySmallMedium,
            { color: theme.colors.davysgrey, marginBottom: 8 },
          ]}
        >
          Product position
        </Text>
        <View style={styles.pillsRow}>
          {positions.map((position) => {
            const isSelected = product.position === position;
            const isPrimary = position === 'Primary product';

            return (
              <TouchableOpacity
                key={position}
                style={[
                  styles.positionPill,
                  isPrimary && isSelected && {
                    backgroundColor: theme.colors.night, // Black background for Primary
                  },
                  !isPrimary && isSelected && {
                    // borderColor: '#D0D0D0',
                    borderWidth: 1,
                    backgroundColor: theme.colors.night,
                  },
                  !isSelected && {
                    borderColor: '#D0D0D0',
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={() => updateProductPosition(product.id, position)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    theme.typography.BodySmallMedium,
                    isPrimary && isSelected && { color: theme.colors.white },
                    !isPrimary && isSelected && { color: theme.colors.white },
                    !isSelected && { color: theme.colors.davysgrey },
                  ]}
                >
                  {position}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // Render product list item
  const renderProductItem = (product) => {
    const isSelected = isProductSelected(product.id);
    const selectedProduct = getSelectedProduct(product.id);

    return (
      <TouchableOpacity
        key={product.id}
        style={[
          styles.productItem,
          isSelected && { backgroundColor: '#F5F5F5' }, // Light gray background for selected
          { borderBottomColor: '#E8E8E8' },
        ]}
        onPress={() => toggleProductSelection(product)}
        activeOpacity={0.7}
      >
        {/* Product Info Container */}
        <View style={styles.productInfo}>
          <Text
            style={[
              theme.typography.BodyLargeMedium,
              { color: theme.colors.night, marginBottom: 8 },
            ]}
          >
            {product.name}
          </Text>

          {/* Value and Commission Row */}
          <View style={[styles.detailsRow,{marginTop:4}]}>
            <View>
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.davysgrey },
                ]}
              >
                Value
              </Text>
              <Text
                style={[
                  theme.typography.BodyBold,
                  { color: theme.colors.midnightgreen, marginTop: 2 },
                ]}
              >
                ${product.value}
              </Text>
            </View>16
            <View style={{ marginLeft: 16, borderLeftWidth: 1, borderLeftColor: theme.colors.night10, paddingLeft: 16 }}>
              <Text
                style={[
                  theme.typography.BodySmallMedium,
                  { color: theme.colors.davysgrey },
                ]}
              >
                Commission
              </Text>
              <Text
                style={[
                  theme.typography.BodyBold,
                  { color: theme.colors.midnightgreen, marginTop: 2 },
                ]}
              >
                ${product.commission}
              </Text>
            </View>
          </View>

          {/* Position Pills - Only show when selected */}
          {isSelected && selectedProduct && renderPositionPills(selectedProduct)}
        </View>

        {/* Selection Radio */}
        <View
          style={[
            styles.radioButton,
            isSelected && {
              backgroundColor: theme.colors.midnightgreen,
              borderColor: theme.colors.midnightgreen,
            },
            !isSelected && {
              borderColor: '#D0D0D0',
            },
          ]}
        >
          {isSelected && (
            <CustomIcon
              name="check"
              width={14}
              height={14}
              tintColour={theme.colors.white}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleCancel}
      onBackButtonPress={handleCancel}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View
        style={[
          styles.modalContent,
          { backgroundColor: theme.colors.white },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: 'transparent' }]}>
          <Text
            style={[
              theme.typography.heading2Medium,
              { color: theme.colors.night, textAlign: 'center', flex: 1 },
            ]}
          >
            Add products
          </Text>
          <TouchableOpacity
            onPress={handleCancel}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <CustomIcon
              name="xmark"
              width={24}
              height={24}
              tintColour={theme.colors.night}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchBar,
            { borderColor: '#E0E0E0' },
          ]}
        >
          <CustomIcon
            name="search"
            width={20}
            height={20}
            tintColour={theme.colors.davysgrey}
          />
          <TextInput
            style={[
              styles.searchInput,
              theme.typography.BodyMedium,
              { color: theme.colors.night },
            ]}
            placeholder="Search products"
            placeholderTextColor={theme.colors.davysgrey}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Selected Products Pills */}
        {selectedProducts.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.selectedPillsRow}
            contentContainerStyle={styles.selectedPillsContent}
          >
            {selectedProducts.map((product) => renderSelectedPill(product))}
          </ScrollView>
        )}

        {/* Products List */}
        <ScrollView
          style={styles.productList}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => renderProductItem(product))
          ) : (
            <View style={{ padding: 32, alignItems: 'center' }}>
              <Text
                style={[
                  theme.typography.BodyMedium,
                  { color: theme.colors.davysgrey },
                ]}
              >
                No products found
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: theme.colors.midnightgreen },
            ]}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.white },
              ]}
            >
              Add products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cancelButton,
              {
                borderColor: '#D0D0D0',
                backgroundColor: theme.colors.white,
              },
            ]}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text
              style={[
                theme.typography.BodyMedium,
                { color: theme.colors.night },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    height: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: -8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  selectedPillsRow: {
    maxHeight: 50,
    marginBottom: 16,
  },
  selectedPillsContent: {
    gap: 8,
    paddingRight: 12,
  },
  selectedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 8,
    maxWidth: 200,
  },
  pillRemoveButton: {
    padding: 2,
  },
  productList: {
    flex: 1,
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  productInfo: {
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionPillsContainer: {
    marginTop: 12,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  positionPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmButton: {
    flex: 1.5,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default ProductSelectorBottomSheet;

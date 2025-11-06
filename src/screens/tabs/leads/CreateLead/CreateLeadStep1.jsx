import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import OriginOption from './components/OriginOption';

/**
 * CreateLeadStep1 - Lead Origin Selection Screen
 *
 * First step in the multi-step lead creation flow.
 * User selects where the lead originated from.
 *
 * Features:
 * - Header with back button and title
 * - Large section title
 * - Grid layout (2 columns) of origin options
 * - Single selection behavior
 * - Next button (enabled only when selection made)
 * - Passes selected origin to Step 2
 *
 * Navigation:
 * - Back: Returns to LeadsHomepage
 * - Next: Navigates to CreateLeadStep2 with origin data
 */
const CreateLeadStep1 = ({ navigation }) => {
  const { theme } = useAppTheme();
  const [selectedOrigin, setSelectedOrigin] = useState(null);

  // Available origin options
  const originOptions = [
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'Email', value: 'email' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Phone Call', value: 'phone' },
    { label: 'Referral', value: 'referral' },
    { label: 'Website', value: 'website' },
    { label: 'Walk-in', value: 'walkin' },
  ];

  /**
   * Handle back button press
   * Returns to LeadsHomepage
   */
  const handleBack = () => {
    navigation.goBack();
  };

  /**
   * Handle origin selection
   * @param {string} value - Selected origin value
   */
  const handleSelectOrigin = (value) => {
    setSelectedOrigin(value);
  };

  /**
   * Handle Next button press
   * Navigates to Step 2 with selected origin
   */
  const handleNext = () => {
    if (selectedOrigin) {
      navigation.navigate('CreateLeadStep2', {
        origin: selectedOrigin,
      });
    }
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
          { borderBottomColor: theme.colors.night10 },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton, {borderColor:theme.colors.night10, marginRight:16}]}
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
          Create new lead
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Title */}
        <Text
          style={[
            theme.typography.heading2Medium,
            { color: theme.colors.night, marginBottom: 24, width: '80%' },
          ]}
        >
          Select where the lead originated from
        </Text>

        {/* Origin Options Grid */}
        <View style={styles.gridContainer}>
          {originOptions.map((option) => (
            <View key={option.value} style={styles.gridItem}>
              <OriginOption
                label={option.label}
                value={option.value}
                selected={selectedOrigin === option.value}
                onSelect={handleSelectOrigin}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: selectedOrigin
                ? theme.colors.midnightgreen
                : theme.colors.davysgrey,
            },
          ]}
          onPress={handleNext}
          disabled={!selectedOrigin}
          activeOpacity={0.8}
        >
          <Text
            style={[
              theme.typography.BodyBold,
              { color: theme.colors.white },
            ]}
          >
            Next
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
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    // marginLeft: -8,
    borderRadius:100,
    borderWidth:1,
    width:40,
    height:40,
    justifyContent:'center',
    alignItems:'center'
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginHorizontal: -6,
  },
  gridItem: {
    width: '48%',
    paddingHorizontal: 6,
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
  nextButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateLeadStep1;

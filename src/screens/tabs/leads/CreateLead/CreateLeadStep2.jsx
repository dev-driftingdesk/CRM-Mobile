import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../../context/ThemeContext';
import CustomIcon from '../../../../assets/icons/CustomIcon';
import ContactPill from './components/ContactPill';
import FormInput from './components/FormInput';

const CreateLeadStep2 = ({ navigation, route }) => {
  const { theme } = useAppTheme();
  const { origin } = route.params || {};

  // Lead Information State
  const [leadName, setLeadName] = useState('');
  const [company, setCompany] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');

  // Communication State
  const [communications, setCommunications] = useState([
    { id: '1', type: 'phone', value: '+65 8234 2119', isPrimary: true },
    {
      id: '2',
      type: 'email',
      value: 'emma.rodriguez@creativepixel.com',
      isPrimary: true,
    },
    { id: '3', type: 'whatsapp', value: '+65 8234 2119', isPrimary: false },
  ]);
  const [preferredPlatform, setPreferredPlatform] = useState('');
  const [newContactValue, setNewContactValue] = useState('');
  const [newContactType, setNewContactType] = useState('phone');
  const [setAsPrimary, setSetAsPrimary] = useState(false);

  /**
   * Handle back button press
   */
  const handleBack = () => {
    navigation.goBack();
  };

  /**
   * Remove communication method
   */
  const handleRemoveCommunication = (id) => {
    setCommunications((prev) => prev.filter((comm) => comm.id !== id));
  };

  /**
   * Add new communication method
   */
  const handleAddCommunication = () => {
    if (!newContactValue.trim()) return;

    // Check primary contact limit
    const primaryCount = communications.filter((c) => c.isPrimary).length;
    const canSetPrimary = primaryCount < 2;

    const newComm = {
      id: Date.now().toString(),
      type: newContactType,
      value: newContactValue,
      isPrimary: setAsPrimary && canSetPrimary,
    };

    setCommunications((prev) => [...prev, newComm]);
    setNewContactValue('');
    setSetAsPrimary(false);
  };

  /**
   * Check if form is valid
   */
  const isFormValid = () => {
    return (
      leadName.trim() &&
      company.trim() &&
      communications.length > 0
    );
  };

  /**
   * Handle Next button press
   */
  const handleNext = () => {
    if (isFormValid()) {
      navigation.navigate('CreateLeadStep3', {
        origin,
        leadInfo: {
          leadName,
          company,
          companyAddress,
          companyWebsite,
        },
        communications,
        preferredPlatform,
      });
    }
  };

  // Check primary contact limit
  const primaryCount = communications.filter((c) => c.isPrimary).length;
  const canSetPrimary = primaryCount < 2;

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
            // backgroundColor: theme.colors.white,
            borderBottomColor: theme.colors.night10,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.backButton,{borderColor:theme.colors.night10, marginRight:16}]}
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
          {/* Lead Information Section */}
          <View style={styles.section}>
            <Text
              style={[
                theme.typography.heading2Medium,
                { color: theme.colors.night, marginBottom: 16 },
              ]}
            >
              Lead Information
            </Text>

            <FormInput
              label="Lead name"
              placeholder="e.g. Emma Rodriguez"
              value={leadName}
              onChangeText={setLeadName}
              required
            />

            <FormInput
              label="Company"
              placeholder="e.g. CreativePixel Agency"
              value={company}
              onChangeText={setCompany}
              required
            />

            <FormInput
              label="Company address"
              placeholder="e.g. 22B Upper Circular Rd, Singapore 058416"
              value={companyAddress}
              onChangeText={setCompanyAddress}
            />

            <FormInput
              label="Company website"
              placeholder="e.g. www.companyname.com"
              value={companyWebsite}
              onChangeText={setCompanyWebsite}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          {/* Communication Section */}
          <View style={styles.section}>
            <Text
              style={[
                theme.typography.heading2Medium,
                { color: theme.colors.night, marginBottom: 16 },
              ]}
            >
              Communication
            </Text>

            {/* Existing Contacts */}
            {communications.map((comm) => (
              <ContactPill
                key={comm.id}
                type={comm.type}
                value={comm.value}
                isPrimary={comm.isPrimary}
                onRemove={() => handleRemoveCommunication(comm.id)}
              />
            ))}

            <FormInput
              label="Platform preference"
              placeholder="Select where the client prefers to meet"
              value={preferredPlatform}
              onChangeText={setPreferredPlatform}
            />

            <FormInput
              label="Add contact"
              placeholder="Enter the number, email or other"
              value={newContactValue}
              onChangeText={setNewContactValue}
            />

            {/* Set as Primary Checkbox */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setSetAsPrimary(!setAsPrimary)}
              activeOpacity={0.7}
              disabled={!canSetPrimary && !setAsPrimary}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    borderColor: theme.colors.davysgrey,
                    backgroundColor: setAsPrimary
                      ? theme.colors.midnightgreen
                      : 'transparent',
                  },
                ]}
              >
                {setAsPrimary && (
                  <CustomIcon
                    name="check"
                    width={14}
                    height={14}
                    tintColour={theme.colors.white}
                  />
                )}
              </View>
              <Text
                style={[
                  theme.typography.BodyMedium,
                  {
                    color: canSetPrimary
                      ? theme.colors.davysgrey
                      : theme.colors.inactive,
                    flex: 1,
                  },
                ]}
              >
                Set as primary. You can only have two primary contact options
              </Text>
            </TouchableOpacity>

            {/* Add Communication Button */}
            <TouchableOpacity
              style={[
                styles.addButton,
                { borderColor: theme.colors.night10 },
              ]}
              onPress={handleAddCommunication}
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
                Add communication method
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
            styles.nextButton,
            {
              backgroundColor: isFormValid()
                ? theme.colors.midnightgreen
                : theme.colors.davysgrey,
            },
          ]}
          onPress={handleNext}
          disabled={!isFormValid()}
          activeOpacity={0.8}
        >
          <Text
            style={[theme.typography.BodyBold, { color: theme.colors.white }]}
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  nextButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateLeadStep2;

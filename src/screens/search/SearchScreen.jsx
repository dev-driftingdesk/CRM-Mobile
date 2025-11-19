import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../context/ThemeContext';
import IconComponent from '../../assets/icons/CustomIcon';

// Sample data
const recentSearches = [
  { id: '1', query: 'Emma Rodriguez', timestamp: Date.now() },
  { id: '2', query: 'CreativePixel Agency', timestamp: Date.now() - 1000 },
  { id: '3', query: 'UX Training', timestamp: Date.now() - 2000 },
  { id: '4', query: 'Vista Project Partners', timestamp: Date.now() - 3000 },
  { id: '5', query: 'Design System Workshop', timestamp: Date.now() - 4000 },
];

const recentlyVisited = [
  {
    id: '1',
    company: 'CreativePixel Agency',
    leadName: 'Emma Rodriguez',
    initials: 'RM',
  },
  {
    id: '2',
    company: 'Chennai Silk Emporium',
    leadName: 'Anita Rao',
    initials: 'TK',
  },
  {
    id: '3',
    company: 'Hyderabad Biryani House',
    leadName: 'Emma Rodriguez',
    initials: 'GD',
  },
];

const SearchScreen = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFilter = () => {
    console.log('Filter pressed');
  };

  const handleSearchPress = (query) => {
    console.log('Search query:', query);
    setSearchQuery(query);
    // Future: Navigate to search results screen
  };

  const handleLeadPress = (lead) => {
    console.log('Lead pressed:', lead);
    navigation.navigate('LeadDetails', { leadId: lead.id, lead });
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.white }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.white }]}>
        {/* Back Button */}
        <Pressable onPress={handleGoBack} style={[styles.backButton, { borderColor: '#E0E0E0' }]}>
          <IconComponent name="nav-arrow-left" width={30} height={30} tintColour={theme.colors.night} />
        </Pressable>

        {/* Search Input */}
        <View style={[styles.searchInputContainer, { borderColor: '#E0E0E0', backgroundColor: theme.colors.white }]}>
          <IconComponent name="search" width={20} height={20} tintColour={theme.colors.davysgrey} />
          <TextInput
            style={[styles.searchInput, theme.typography.BodyMedium, { color: theme.colors.night }]}
            placeholder="Search by keywords, names"
            placeholderTextColor={theme.colors.davysgrey}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>

        {/* Filter Button */}
        <Pressable onPress={handleFilter} style={[styles.filterButton, { borderColor: '#E0E0E0', backgroundColor: theme.colors.white }]}>
          <IconComponent name="filter-list" width={20} height={20} tintColour={theme.colors.night} />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Recent Searches Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, theme.typography.BodySmallMedium, { color: theme.colors.davysgrey }]}>
            Recent searches
          </Text>

          <View style={[styles.list, { backgroundColor: theme.colors.white }]}>
            {recentSearches.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => handleSearchPress(item.query)}
                style={[
                  styles.searchItem,
                  index !== recentSearches.length - 1 && { borderBottomColor: '#E0E0E0' }
                ]}
              >
                <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                  {item.query}
                </Text>
                <IconComponent name="nav-arrow-right" width={20} height={20} tintColour={theme.colors.davysgrey} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recently Visited Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, theme.typography.BodySmallMedium, { color: theme.colors.davysgrey }]}>
            Recently visited
          </Text>

          <View style={[styles.list, { backgroundColor: theme.colors.white }]}>
            {recentlyVisited.map((lead, index) => (
              <Pressable
                key={lead.id}
                onPress={() => handleLeadPress(lead)}
                style={[
                  styles.leadItem,
                  index !== recentlyVisited.length - 1 && { borderBottomColor: '#E0E0E0' }
                ]}
              >
                {/* Avatar */}
                <View style={[styles.avatar, { backgroundColor: '#E8E8E8' }]}>
                  <Text style={[theme.typography.BodyMedium, { color: theme.colors.night }]}>
                    {lead.initials}
                  </Text>
                </View>

                {/* Text Info */}
                <View style={[styles.textInfo,{display:'flex', flexDirection:'column', justifyContent:'space-between'}]}>
                  <Text style={[theme.typography.BodyMedium, { color: theme.colors.night,flex:1 }]}>
                    {lead.company}
                  </Text>
                  <Text style={[theme.typography.BodySmallMedium, { color: theme.colors.davysgrey, flex:1 }]}>
                    {lead.leadName}
                  </Text>
                </View>

                {/* Chevron */}
                <IconComponent name="nav-arrow-right" width={20} height={20} tintColour={theme.colors.davysgrey} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
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
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    // backgroundColor is set inline
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  leadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    flex: 1,
    // justifyContent:'space-between'
  },
});

export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function UserProfile({ navigation }) {
  // State could be expanded to store profile information
  const [profileDetails, setProfileDetails] = useState({
    name: 'Olivia Parker',
    birthday: '',
    gender: '',
    height: '',
    weight: '',
    bmi: ''
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image
              source={require('./../assets/hero2.jpg')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.profileName}>{profileDetails.name}</Text>
        </View>

        {/* Profile Details Card */}
        <View style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Your Profile</Text>
          
          {/* Profile Fields */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Birthday</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Gender</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Height</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Weight</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>BMI (Calculated)</Text>
          </View>

          {/* Add Details Button */}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      {/* <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#007AFF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="restaurant-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Meals</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="fitness-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Exercise</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="water-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Sugar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Analytics</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  placeholderView: {
    width: 40, // To balance the header
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C5E1F2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  fieldContainer: {
    paddingVertical: 12,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  addButton: {
    backgroundColor: '#E5F1F8',
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    color: '#8E8E93',
  },
});

export default UserProfile;
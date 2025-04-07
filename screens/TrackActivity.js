import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function TrackActivity({ navigation }) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  const activities = [
    { id: 1, name: 'Walking', icon: require('../assets/images/walking-icon.png') },
    { id: 2, name: 'Running', icon: require('../assets/images/walking-icon.png') },
    { id: 3, name: 'Stretching', icon: require('../assets/images/walking-icon.png') },
    { id: 4, name: 'Yoga', icon: require('../assets/images/walking-icon.png') },
    { id: 5, name: 'Zumba', icon: require('../assets/images/walking-icon.png') },
    { id: 6, name: 'Cycling', icon: require('../assets/images/walking-icon.png') },
  ];
  
  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity.id);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Activity</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select Activity</Text>
        
        <View style={styles.activitiesGrid}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[
                styles.activityCard,
                selectedActivity === activity.id && styles.selectedActivity,
              ]}
              onPress={() => handleSelectActivity(activity)}
            >
              <Image source={activity.icon} style={styles.activityIcon} />
              <Text style={styles.activityName}>{activity.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Start Tracking</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.forgotLinkText}>I forgot to track this activity</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="restaurant-outline" size={24} color="#666" />
          <Text style={styles.tabLabel}>Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="fitness-outline" size={24} color="#666" />
          <Text style={styles.tabLabel}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="trophy-outline" size={24} color="#666" />
          <Text style={styles.tabLabel}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="bar-chart-outline" size={24} color="#666" />
          <Text style={styles.tabLabel}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedActivity: {
    borderColor: '#0066cc',
    borderWidth: 2,
  },
  activityIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '500',
  },
  trackButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotLinkText: {
    color: '#0066cc',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});

export default TrackActivity;
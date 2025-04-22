import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Create({ navigation }) {
  const [selectedActivity, setSelectedActivity] = useState({ id: 0 });

  const activities = [
    { id: 1, rate: 0.04, name: 'Walking', icon: require('../assets/images/walking-icon.png') },
    { id: 2, rate: 0.17, name: 'Running', icon: require('../assets/images/run-icon.png') },
    { id: 3, rate: 0.03, name: 'Stretching', icon: require('../assets/images/stretching-icon.png') },
    { id: 4, rate: 0.05, name: 'Yoga', icon: require('../assets/images/yoga-icon.png') },
    { id: 5, rate: 0.13, name: 'Sumba', icon: require('../assets/images/zumba-icon.png') },
    { id: 6, rate: 0.12, name: 'Cycling', icon: require('../assets/images/cycling-icon.png') }
  ];

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Track Activity</Text>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select Activity</Text>

        <View style={styles.activitiesGrid}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[
                styles.activityCard,
                selectedActivity.id === activity.id && styles.selectedActivity,
              ]}
              onPress={() => handleSelectActivity(activity)}
            >
              <Image source={activity.icon} style={styles.activityIcon} />
              <Text style={styles.activityName}>{activity.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedActivity.id != 0 && (
          <>
            <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('Walking',
              {
                id: selectedActivity.id,
                activity: selectedActivity.name,
                icon: selectedActivity.icon,
                rate: selectedActivity.rate,
              })}>
              <Text style={styles.trackButtonText}>Start Tracking</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.forgotLink} onPress={() => navigation.navigate('RecordSugar',
              {
                id: selectedActivity.id,
                activity: selectedActivity.name,
                icon: selectedActivity.icon,
                rate: selectedActivity.rate,
              })}>
              <Text style={styles.forgotLinkText}>I forgot to track this activity</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
    marginLeft: 10,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginTop: -35,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
  },
  activityCard: {
    width: '46%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 21,
  },
  selectedActivity: {
    borderColor: '#1875C3',
    borderWidth: 2,
  },
  activityIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  activityName: {
    fontSize: 19,
    fontWeight: '700',
  },
  trackButton: {
    width: '90%',
    height: 55,
    backgroundColor: 'rgb(29, 130, 213)',
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -25,
    alignSelf: 'center', // <- This centers the button horizontally
  },

  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotLink: {
    alignItems: 'center',
    marginTop: 6,
  },
  forgotLinkText: {
    color: '#1875C3',
    fontSize: 17,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationColor: '#1875C3',
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

export default Create;
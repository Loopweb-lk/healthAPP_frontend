import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WalkingTrackEnd({ route, navigation }) {
  const { id, activity, icon, rate, totalRate, time } = route.params;

  useEffect(() => {
    const saveActivityRecord = async () => {
      const currentTimestamp = new Date().toISOString();

      const body = {
        activity: activity,
        timePeriod: time,
        timestamp: currentTimestamp,
        burnedCal: totalRate
      }

      const endpoint = '/api/activity/createActivity';
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }

      ApiServer.call(endpoint, 'POST', body, headers)
        .then(data => {
          if (data.message == "Activity Log created successfully") {

          }
        })
        .catch(error => {
          console.error('creation failed:', error);
        });
    };

    saveActivityRecord();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Activity</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Running Figure */}
        <View style={styles.illustrationContainer}>
          <Image
            source={icon}
            style={styles.runningFigure}
          // Alternatively, you could use an SVG component here
          />
        </View>

        {/* Calorie Information */}
        <View style={styles.calorieInfo}>
          <Text style={styles.calorieLabel}>You've burnt</Text>
          <Text style={styles.calorieValue}>{totalRate}<Text style={styles.calorieUnit}>cal</Text></Text>
        </View>

        <TouchableOpacity style={styles.statsButton} onPress={() => { navigation.navigate('BottomTabNavigation') }}>
          <Text style={styles.statsButtonText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60, // Space for bottom nav
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 350,
  },
  runningFigure: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    // If using actual image, you might need to adjust these dimensions
  },
  calorieInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  calorieLabel: {
    fontSize: 32,
    color: '#1875C3',
    fontWeight: '500',
  },
  calorieValue: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#1875C3',
  },
  calorieUnit: {
    fontSize: 24,
    fontWeight: '500',
  },
  equivalentText: {
    fontSize: 18,
    color: '#ACACAC',
    marginTop: 5,
  },
  statsButton: {
    backgroundColor: '#1875C3',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    height: 65,
  },
  statsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 7,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 4,
  },
});

export default WalkingTrackEnd;
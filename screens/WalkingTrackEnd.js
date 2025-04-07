import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function WalkingTrackEnd({ navigation }) {
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
            source={require('../assets/images/walking-icon.png')} 
            style={styles.runningFigure}
            // Alternatively, you could use an SVG component here
          />
        </View>

        {/* Calorie Information */}
        <View style={styles.calorieInfo}>
          <Text style={styles.calorieLabel}>You've burnt</Text>
          <Text style={styles.calorieValue}>123<Text style={styles.calorieUnit}>cal</Text></Text>
          <Text style={styles.equivalentText}>Equivalent to 3 boiled eggs</Text>
        </View>

        {/* Stats Button */}
        <TouchableOpacity style={styles.statsButton}>
          <Text style={styles.statsButtonText}>View Statistics</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#8E8E8E" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="fast-food-outline" size={24} color="#8E8E8E" />
          <Text style={styles.navText}>Diet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="fitness-outline" size={24} color="#8E8E8E" />
          <Text style={styles.navText}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#8E8E8E" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#8E8E8E" />
          <Text style={styles.navText}>Stats</Text>
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
    marginBottom: 30,
  },
  runningFigure: {
    width: 120,
    height: 120,
    // If using actual image, you might need to adjust these dimensions
  },
  calorieInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  calorieLabel: {
    fontSize: 18,
    color: '#1E88E5',
    fontWeight: '500',
    marginBottom: 8,
  },
  calorieValue: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  calorieUnit: {
    fontSize: 24,
    fontWeight: '500',
  },
  equivalentText: {
    fontSize: 14,
    color: '#ACACAC',
    marginTop: 8,
  },
  statsButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginTop: 20,
  },
  statsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
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
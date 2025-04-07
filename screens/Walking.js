import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Walking({ navigation }) {
  // State for timer and pause functionality
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Activity</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Activity Title */}
      <Text style={styles.activityTitle}>Walking</Text>
      
      {/* Runner Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/images/walking-icon.png')}
          style={styles.illustration}
        />
        {/* If you don't have the exact image, you can use a placeholder or create a simple SVG component */}
      </View>
      
      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>40:12</Text>
        <Text style={styles.timerSubtext}>20 more minutes to reach daily average</Text>
      </View>
      
      {/* Pause Button */}
      <TouchableOpacity 
        style={styles.pauseButton}
        onPress={() => setIsPaused(!isPaused)}
      >
        <Ionicons name={isPaused ? "play" : "pause"} size={24} color="white" />
      </TouchableOpacity>
      
      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#c0c0c0" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="musical-notes-outline" size={24} color="#c0c0c0" />
          <Text style={styles.tabLabel}>Music</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Ionicons name="walk-outline" size={24} color="#007AFF" />
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Exercise</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="water-outline" size={24} color="#c0c0c0" />
          <Text style={styles.tabLabel}>Sleep</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#c0c0c0" />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  placeholder: {
    width: 24,
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 200,
  },
  illustration: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  timerSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  pauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#c0c0c0',
  },
  activeTab: {
    color: '#007AFF',
  },
  activeTabLabel: {
    color: '#007AFF',
  },
});

export default Walking;
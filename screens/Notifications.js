import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Notifications({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>All notifications</Text>
        </View>
        
        <TouchableOpacity style={styles.notificationItem}>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Complete Your profile</Text>
            <Text style={styles.notificationSubtitle}>
              Complete Your profile and let's start tracking your meals
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationItem: {
    backgroundColor: '#EDEDED',
    marginBottom: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    borderRadius: 15,
  },
  notificationContent: {
    flexDirection: 'column',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
});

export default Notifications;
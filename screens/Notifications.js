import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {

    try {
      const endpoint = '/api/general/getNotifications';
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const data = await ApiServer.call(endpoint, 'GET', null, headers);
      setNotifications(data.notifications)

    } catch (error) {
      console.error('request failed', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const body = {
        id: id
      };

      const endpoint = '/api/general/deleteNotifications';
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }

      const response = await ApiServer.call(endpoint, 'POST', body, headers);
      if (response.message === "notification deleted successfully") {
        getNotifications();
      }
    } catch (error) {
      console.error('Deletion failed:', error);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>All notifications</Text>
        </View>

        {notifications.map(notification => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationItem}
            onPress={() => handleDelete(notification.id)}
          >
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationSubtitle}>{notification.msg}</Text>
            </View>
          </TouchableOpacity>
        ))}

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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

function GroceryList({ navigation, route }) {

  const { mealIds } = route.params;
  const [ingredientData, setingredientData] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchGrocery = async () => {
      setloading(true)
      const endpoint = '/api/meal/getIngredients';
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }

      const body = {
        food_ids: mealIds,
      }

      ApiServer.call(endpoint, 'POST', body, headers)
        .then(data => {
          setingredientData(data);
          setloading(false)
        })
        .catch(error => {
          Alert.alert('Data request failed', error.message);
        });
    };

    fetchGrocery();
  }, []);

  async function downloadFile() {
    try {
      const pdfUrl = ApiServer.baseServer + "/api/meal/getIngredientPDF";
      const fileUri = `${FileSystem.documentDirectory}grocery-list.pdf`;

      const response = await FileSystem.downloadAsync(pdfUrl, fileUri);

      if (response.status === 200) {
        Alert.alert('Download Complete', 'File downloaded successfully.');
        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(fileUri);
        }
      } else {
        Alert.alert('Download Failed', 'Failed to download the file.');
      }
    } catch (error) {
      console.error('Download Error:', error);
      Alert.alert('Error', 'An error occurred while downloading the file.');
    }
  }

  const renderSection = (items) => (
    <View style={styles.section}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.itemText}>{item.item}</Text>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grocery List</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.mainTitle}>Your weekly grocery items</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View></View>
        )}

        {Object.keys(ingredientData).length !== 0 && !loading ? (
          renderSection(ingredientData.ingredients)
        ) : (
          <Text>No ingredients available</Text>
        )}

        {Object.keys(ingredientData).length !== 0 ? (
          <TouchableOpacity style={styles.downloadButton} onPress={() => downloadFile()}>
            <Text style={styles.downloadButtonText}>Download into PDF</Text>
          </TouchableOpacity>
        ) : ("")}

      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="gray" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="restaurant-outline" size={24} color="gray" />
          <Text style={styles.navText}>Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="fitness-outline" size={24} color="gray" />
          <Text style={styles.navText}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="water-outline" size={24} color="gray" />
          <Text style={styles.navText}>Sugar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={24} color="gray" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
    textAlign: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerRight: {
    width: 24,
  },

  content: {
    flex: 1,
    padding: 46,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: -20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 16,
  },
  downloadButton: {
    backgroundColor: 'rgba(24, 117, 195, 1)',
    borderRadius: 120,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 55,
    marginTop: 5,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});

export default GroceryList;
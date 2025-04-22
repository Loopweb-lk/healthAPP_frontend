import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RecordSugar({ navigation }) {
  const [sugarValue, setSugarValue] = useState('');
  const [mealType, setMealType] = useState('');
  const [notes, setNotes] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    const currentTimestamp = new Date().toISOString();

    const body = {
      level: sugarValue,
      meal: mealType,
      note: notes,
      timestamp: currentTimestamp
    }

    const endpoint = '/api/sugar/createRecord';
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        if (data.message == "Sugar Log created successfully") {
          navigation.navigate('BottomTabNavigation');
        }
      })
      .catch(error => {
        console.error('creation failed:', error);
      });
  };

  const selectMealType = (meal) => {
    setMealType(meal);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Record Sugar</Text>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.label}>Sugar Value</Text>
          <TextInput
            style={styles.input}
            value={sugarValue}
            onChangeText={setSugarValue}
            keyboardType="numeric"
            placeholder="Enter value"
          />

          <Text style={styles.label}>Measured Before</Text>
          <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
            <Text style={mealType ? styles.dropdownText : styles.dropdownPlaceholder}>
              {mealType || 'Select meal'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="gray" />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectMealType('Breakfast')}>
                <Text>Breakfast</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectMealType('Lunch')}>
                <Text>Lunch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectMealType('Dinner')}>
                <Text>Dinner</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes"
            multiline
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, sugarValue ? styles.activeButton : {}]}
          onPress={handleSubmit}
          disabled={!sugarValue}
        >
          <Text style={[styles.submitText, sugarValue ? styles.activeButtonText : {}]}>Submit</Text>
        </TouchableOpacity>
      </View>


      {/* Bottom Tab Bar */}
      {/* <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#999" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="restaurant-outline" size={24} color="#999" />
          <Text style={styles.tabLabel}>Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="fitness-outline" size={24} color="#999" />
          <Text style={styles.tabLabel}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
          <Text style={styles.activeTabLabel}>Sugar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="bar-chart-outline" size={24} color="#999" />
          <Text style={styles.tabLabel}>Analytics</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: -34,
  },
  content: {
    flex: 1,
    padding: 26,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 24,
    fontSize: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: -20,
    marginBottom: 20,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: '#ccc',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    height: 60
  },
  activeButton: {
    backgroundColor: '#1875C3',
    height: 60,
    marginTop: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  activeButtonText: {
    color: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
  },
  activeTabLabel: {
    fontSize: 12,
    color: '#1875C3',
    marginTop: 4,
  },
});

export default RecordSugar;
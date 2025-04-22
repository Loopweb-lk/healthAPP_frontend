import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiServer from './../Services/ApiServer';

function Add_New_Meal_ltem({ navigation }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [itemName, setItemName] = useState('');
  const [calories, setCalories] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');
  const [selectedType, setSelectedType] = useState('Veg');

  const icons = [
    { id: 1, name: './../assets/icons/rice.png', source: require('./../assets/icons/rice.png') },
    { id: 2, name: './../assets/icons/tomato.png', source: require('./../assets/icons/tomato.png') },
    { id: 3, name: './../assets/icons/sandwich.png', source: require('./../assets/icons/sandwich.png') },
    { id: 4, name: './../assets/icons/drinks.png', source: require('./../assets/icons/drinks.png') },
    { id: 5, name: './../assets/icons/herbs.png', source: require('./../assets/icons/herbs.png') },
    { id: 6, name: './../assets/icons/salad.png', source: require('./../assets/icons/salad.png') },
  ];

  const handleAddItem = async () => {
    const endpoint = '/api/meal/createFoodItem';

    const body = {
      name: itemName,
      category: selectedMealType,
      size: quantity,
      calorie: calories,
      type: selectedType,
      image: selectedIcon
    };

    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        if (data.message == "Food Item created successfully") {
          navigation.goBack();
        }
      })
      .catch(error => {
        console.error('Register failed:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Meal Item</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Item Name */}
          <Text style={styles.labelText}>Item Name</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
          />

          {/* Quantity */}
          <Text style={styles.labelText}>Serving Size</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
          />

          {/* Estimated Calory Level */}
          <Text style={styles.labelText}>Estimated Calory Level</Text>
          <TextInput
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />



          <Text style={styles.labelText}>Meal Type</Text>
          <View style={styles.pickerWrapper2}>
            <Picker
              selectedValue={selectedMealType}
              style={styles.picker}
              onValueChange={(value) => setSelectedMealType(value)}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
            </Picker>
          </View>

          <Text style={styles.labelText}>Type</Text>
          <View style={styles.pickerWrapper2}>
            <Picker
              selectedValue={selectedType}
              style={styles.picker}
              onValueChange={(value) => setSelectedType(value)}
            >
              <Picker.Item label="Veg" value="Veg" />
              <Picker.Item label="Non-veg" value="Non-Veg" />
            </Picker>
          </View>

          {/* Choose Icon */}
          <Text style={styles.labelText}>Choose Icon</Text>
          <View style={styles.iconsGrid}>
            {icons.map((icon) => (
              <TouchableOpacity
                key={icon.id}
                style={[
                  styles.iconContainer,
                  selectedIcon === icon.name && styles.selectedIconContainer,
                ]}
                onPress={() => setSelectedIcon(icon.name)}
              >
                <Image source={icon.source} style={styles.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  labelText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '32%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedIconContainer: {
    borderColor: '#007bff',
    borderWidth: 2,
    backgroundColor: '#f0f8ff',
  },
  icon: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  addButton: {
    backgroundColor: '#1875C3',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  picker: {
    height: 280, // keep enough height for the wheel to work
    marginTop: -80, // shift up to hide top items
    marginBottom: -120, // shift down to hide bottom items
  },

  pickerWrapper2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '100%',
    marginBottom: 20,
    height: 60,
  },
});

export default Add_New_Meal_ltem;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Add_New_Meal_ltem({ navigation }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [itemName, setItemName] = useState('');
  const [calories, setCalories] = useState('');
  const [quantity, setQuantity] = useState('');

  const icons = [
    { id: 1, source: require('./../assets/icons/rice.png') },
    { id: 2, source: require('./../assets/icons/tomato.png') },
    { id: 3, source: require('./../assets/icons/sandwich.png') },
    { id: 4, source: require('./../assets/icons/drinks.png') },
    { id: 5, source: require('./../assets/icons/herbs.png') },
    { id: 6, source: require('./../assets/icons/salad.png') },
  ];

  const handleAddItem = () => {
    // Logic to save the meal item
    console.log('Adding meal item:', { itemName, calories, quantity, selectedIcon });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
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
            placeholder="Enter item name"
          />

          {/* Estimated Calory Level */}
          <Text style={styles.labelText}>Estimated Calory Level</Text>
          <TextInput
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
            placeholder="Enter calories"
            keyboardType="numeric"
          />

          {/* Quantity */}
          <Text style={styles.labelText}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
          />

          {/* Choose Icon */}
          <Text style={styles.labelText}>Choose Icon</Text>
          <View style={styles.iconsGrid}>
            {icons.map((icon) => (
              <TouchableOpacity
                key={icon.id}
                style={[
                  styles.iconContainer,
                  selectedIcon === icon.id && styles.selectedIconContainer,
                ]}
                onPress={() => setSelectedIcon(icon.id)}
              >
                <Image source={icon.source} style={styles.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Button */}
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
    backgroundColor: '#007bff',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Add_New_Meal_ltem;
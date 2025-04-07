import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function EnterMealItems({ navigation }) {

  const [calories, setCalories] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const mealItems = [
    { id: 1, name: 'Bullseye', quantity: 1 },
    { id: 2, name: 'Rice Bowl', quantity: 1 },
    { id: 3, name: 'Ice Cream', quantity: 1 },
    { id: 4, name: 'Salad', quantity: 1 },
    { id: 5, name: 'Sandwich', quantity: 1 },
    { id: 6, name: 'Ice Cream', quantity: 1 },
  ];

  const renderMealItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.mealItem}
      onPress={() => {}}>
      <Text style={styles.mealItemText}>{item.name}</Text>
      <Text style={styles.quantityText}>x {item.quantity}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter Meal Items</Text>
      </View>

      {/* Calories Display */}
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesTitle}>Your Meal Contains</Text>
        <Text style={styles.caloriesValue}>{calories}</Text>
        <Text style={styles.caloriesUnit}>Cal</Text>
        <Text style={styles.nutritionHint}>
          Only contains starch and sugar{'\n'}
          Try adding more vegetables, less Oils
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Meal Items Grid */}
      <View style={styles.mealItemsContainer}>
        {mealItems.map(renderMealItem)}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="restaurant" size={24} color="#666" />
          <Text style={styles.navText}>Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="fitness" size={24} color="#666" />
          <Text style={styles.navText}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="nutrition" size={24} color="#666" />
          <Text style={styles.navText}>Sugar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="stats-chart" size={24} color="#666" />
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  caloriesContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  caloriesTitle: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
  },
  caloriesValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  caloriesUnit: {
    fontSize: 20,
    color: '#007AFF',
  },
  nutritionHint: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  addButton: {
    padding: 8,
  },
  mealItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  mealItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quantityText: {
    fontSize: 12,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default EnterMealItems;
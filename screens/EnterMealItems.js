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
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // <-- Import GestureHandlerRootView
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
    { id: 7, name: 'Bullseye', quantity: 1 },
    { id: 8, name: 'Rice Bowl', quantity: 1 },
    { id: 9, name: 'Ice Cream', quantity: 1 },
    { id: 10, name: 'Salad', quantity: 1 },
    { id: 11, name: 'Sandwich', quantity: 1 },
    { id: 12, name: 'Ice Cream', quantity: 1 },
    { id: 13, name: 'Salad', quantity: 1 },
    { id: 14, name: 'Sandwich', quantity: 1 },
    { id: 15, name: 'Ice Cream', quantity: 1 },
  ];

  const renderMealItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.mealItem}
      onPress={() => { }}>
      <Text style={styles.mealItemText}>{item.name}</Text>
      <Text style={styles.quantityText}>x {item.quantity}</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Enter Meal Items</Text>

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
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={16} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Meal Items */}
        <ScrollView contentContainerStyle={styles.mealItemsContainer}>
          {mealItems.map(renderMealItem)}
        </ScrollView>



        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    textAlign: 'center',
    marginTop: -45,
  },
  caloriesContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  caloriesTitle: {
    fontSize: 38,
    color: '#1875C3',
    fontWeight: '600',
  },
  caloriesValue: {
    fontSize: 70,
    fontWeight: '500',
    color: '#1875C3',
    marginRight: 40,
  },
  caloriesUnit: {
    fontSize: 30,
    color: '#1875C3',
    marginTop: -48,
    marginLeft: 50,
    fontWeight: '500',
  },
  nutritionHint: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    fontSize: 17,
    padding: 15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    paddingVertical: 0,
  },
  addButton: {
    marginLeft: 8,
    height: 36,
    width: 36,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
    backgroundColor: '#1875C3',
    marginHorizontal: 16,
    padding: 22,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
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
    borderTopColor: '#E5E5E5',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff96',
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

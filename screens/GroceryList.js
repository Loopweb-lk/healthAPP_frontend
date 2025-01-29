import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function GroceryList ({ navigation }) {
  const groceryData = {
    grainsAndStaples: [
      { item: 'Red Rice', quantity: '500g' },
      { item: 'Brown Rice', quantity: '500g' },
      { item: 'String Hoppers', quantity: '1 packet' },
      { item: 'Coconut Milk', quantity: '2 cans (400ml each)' }
    ],
    proteins: [
      { item: 'Fish (for fish curry and grilled fish)', quantity: '300g' },
      { item: 'Chicken', quantity: '500g (for chicken curry)' },
      { item: 'Tofu', quantity: '250g (for stir-fry)' },
      { item: 'Eggs', quantity: '6 large' }
    ],
    vegetablesAndGreens: [
      { item: 'Spinach or Gotu Kola', quantity: '2 large bunches' },
      { item: 'Mukunuwenna', quantity: '1 large bunch' },
      { item: 'Okra (Ladies\' Fingers)', quantity: '250g' },
      { item: 'Brinjal (Eggplant)', quantity: '300g' },
      { item: 'Snake Gourd', quantity: '1 medium' },
      { item: 'Pumpkin', quantity: '300g' },
      { item: 'Carrots', quantity: '250g' },
      { item: 'Green Beans', quantity: '250g' },
      { item: 'Mixed Bell Peppers', quantity: '1 each of red, green, and yellow' },
      { item: 'Tomatoes', quantity: '6 medium' },
      { item: 'Onions', quantity: '4 large' },
      { item: 'Green Chillies', quantity: '100g' },
      { item: 'Cucumber', quantity: '2 large' }
    //   { item: 'Fresh Herbs', quantity: '1 bunch each of curry leaves, coriander, and pandan leaves' }
    ]
  };

  const renderSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
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
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Planner</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.mainTitle}>Your weekly grocery items</Text>
        
        {renderSection('Grains and Staples', groceryData.grainsAndStaples)}
        {renderSection('Proteins', groceryData.proteins)}
        {renderSection('Vegetables and Greens', groceryData.vegetablesAndGreens)}
        
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download into PDF</Text>
        </TouchableOpacity>
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
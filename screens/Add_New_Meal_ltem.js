import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Modal
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EnterMealItems({ navigation }) {
  const [calories, setCalories] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMealName, setMelectedMealName] = useState('');
  const [mealItems, setMealItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const imageMap = [
    { 'rice.png': require('./../assets/icons/rice.png') },
    { 'tomato.png': require('./../assets/icons/tomato.png') },
    { 'sandwich.png': require('./../assets/icons/sandwich.png') },
    { 'drinks.png': require('./../assets/icons/drinks.png') },
    { 'herbs.png': require('./../assets/icons/herbs.png') },
    { 'salad.png': require('./../assets/icons/salad.png') },
  ];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const endpoint = '/api/meal/foodItemsList';
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        }
        const data = await ApiServer.call(endpoint, 'GET', null, headers);

        const processedItems = data.foodItems.map(item => {
          const imageFile = item.image?.split('/').pop();
          return {
            ...item,
            image: imageMap[imageFile] || require('./../assets/icons/rice.png'),
            calories: Number(item.calorie)
          };
        });

        setMealItems(processedItems);
      } catch (error) {
        Alert.alert('request failed', error.message);
      }
    };

    fetchMeals();
  }, []);

  const toggleSelect = (id) => {
    const isSelected = selectedItems.includes(id);
    const item = mealItems.find((item) => item.id === id);

    if (isSelected) {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
      setCalories((prev) => prev - item.calories);

      if (selectedMealName.includes(' with ')) {
        const parts = selectedMealName.split(' with ').filter(name => name !== item.item_name);
        const newMealName = parts.join(' with ');
        setMelectedMealName(newMealName);
      } else {
        if (selectedMealName === item.item_name) {
          setMelectedMealName('');
        }
      }
    } else {
      setSelectedItems((prev) => [...prev, id]);
      setCalories((prev) => prev + item.calories);
      let mealName = '';
      if (selectedMealName === '' || selectedMealName == null) {
        mealName = item.item_name;
      } else {
        mealName = selectedMealName + ' with ' + item.item_name;
      }
      setMelectedMealName(mealName);
    }

  };

  const renderMealItem = (item) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.mealItem,
          isSelected && { backgroundColor: '#cce5ff' },
        ]}
        onPress={() => toggleSelect(item.id)}
      >
        <Text style={styles.mealItemText}>{item.item_name}</Text>
        <Text style={styles.quantityText}>x 1</Text>
      </TouchableOpacity>
    );
  };

  const searchItems = (query) => {
    setSearchQuery(query);

    if (!query || query.trim() === '') {
      setFilteredItems(mealItems);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = mealItems.filter(item =>
      item.item_name.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredItems(filtered);
  };

  const handleSave = async () => {

    setModalVisible(false);
    const endpoint = '/api/meal/createFoodItem';

    const body = {
      name: selectedMealName,
      category: category,
      size: 1,
      calorie: calories,
      type: type,
      image: './../assets/icons/rice.png'
    };

    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        if (data.message == "Food Item created successfully") {
          navigation.navigate('EnterMealItems')
        }
      })
      .catch(error => {
        console.error('Register failed:', error);
      });

    setCategory('');
    setType('');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Create A New Meal</Text>

        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesTitle}>Your Meal Contains</Text>
          <Text style={styles.caloriesValue}>{calories}<Text style={styles.caloriesUnit}>Cal</Text></Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={16} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={searchItems}
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNewMeal')}>
            <Icon name="add" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {(searchQuery !== '' ? filteredItems.length > 0 : mealItems.length > 1) ? (
          <ScrollView contentContainerStyle={styles.mealItemsContainer}>
            {(searchQuery !== '' ? filteredItems : mealItems).map(renderMealItem)}
          </ScrollView>
        ) : (
          <Text>No meals to show or only one item found.</Text>
        )}

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.nextButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.nextButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.label}>Category(Breakfast / Lunch / Dinner):</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter category"
                value={category}
                onChangeText={setCategory}
              />

              <Text style={styles.label}>Type (Veg / Non-Veg):</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter type"
                value={type}
                onChangeText={setType}
              />

              <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: '#888', marginTop: 10 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.submitButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </GestureHandlerRootView>
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
    marginRight: -20,
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
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    margin: 4,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 160,
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  mealItemText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,   // increased rounding
    padding: 8,
    marginTop: 5,
    width: '100%',
    height: '11%',
    alignSelf: 'center'
  },

  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },

});

export default EnterMealItems;

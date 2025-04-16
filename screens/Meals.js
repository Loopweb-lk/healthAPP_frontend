import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import React, { useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

function Meals({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Breakfast Meal 1',
      calories: 130,
      created: 'Created Yesterday',
      tags: ['edit-2', 'trash-2', 'copy']
    },
    {
      id: 2,
      name: 'Breakfast Meal 2',
      calories: 123,
      created: 'Created 30/12/2024',
      tags: ['edit-2', 'trash-2', 'copy']
    },
    {
      id: 3,
      name: 'Breakfast Meal 1',
      calories: 123,
      created: 'Created 20/12/2024',
      tags: ['edit-2', 'trash-2', 'copy']
    }
  ];

  const getIconName = (tag) => {
    switch (tag) {
      case 'edit-2':
        return 'edit-2';
      case 'trash-2':
        return 'trash-2';
      case 'copy':
        return 'copy';
      default:
        return 'checkmark';
    }
  };

  const handleFilter = () => {
    // Add your filter logic here
    setModalVisible(false);
  };

  const onFromDateChange = (event, selectedDate) => {
    setShowFromPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const renderTemplate = (template) => (
    <View
      key={template.id}
      style={{
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(24, 117, 195, 1)',
      }}
    >
      <View>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{template.name}</Text>
        <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>{template.created}</Text>
        <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
          {template.tags.map((tag, index) => (
            <View
              key={index}
              style={{
                backgroundColor: 'rgba(24, 117, 195, 0.7)',
                width: 24,
                height: 24,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity>
                <Feather
                  name={getIconName(tag)}
                  size={14}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text style={{ color: '#4CAF50', fontSize: 22, fontWeight: '800' }}>
          {template.calories} Cal
        </Text>
        <Text style={{ color: '#666', fontSize: 12, textAlign: 'right' }}>Total Sugar</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Ionicons name="chevron-back" size={24} color="black" />
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Meal Records</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="filter" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Date Filter Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
              <View style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                width: '80%',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Date Filter</Text>
                
                <View style={{ width: '100%', marginVertical: 10 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>From Date</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: 'rgba(24, 117, 195, 1)',
                      borderRadius: 10,
                      padding: 10,
                      width: '100%'
                    }}
                    onPress={() => setShowFromPicker(true)}
                  >
                    <Text>{fromDate.toLocaleDateString()}</Text>
                    <Ionicons name="calendar-outline" size={20} color="black" />
                  </TouchableOpacity>
                </View>

                <View style={{ width: '100%', marginVertical: 10 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>To Date</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: 'rgba(24, 117, 195, 1)',
                      borderRadius: 10,
                      padding: 10,
                      width: '100%'
                    }}
                    onPress={() => setShowToPicker(true)}
                  >
                    <Text>{toDate.toLocaleDateString()}</Text>
                    <Ionicons name="calendar-outline" size={20} color="black" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(24, 117, 195, 1)',
                    borderRadius: 10,
                    padding: 10,
                    width: '100%',
                    marginTop: 20,
                  }}
                  onPress={handleFilter}
                >
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                    Filter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {showFromPicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              onChange={onFromDateChange}
            />
          )}

          {showToPicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              onChange={onToDateChange}
            />
          )}

          {/* Rest of your existing code */}
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#2196F3', marginBottom: 16, textAlign: 'center' }}>
            Select a Template{'\n'}or Create New
          </Text>

          <Text style={{ fontSize: 16, color: '#666', marginBottom: 12 }}>Saved Templates</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {templates.map(template => renderTemplate(template))}
          </ScrollView>

          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ color: '#666', marginBottom: 8 }}>
              Had something new ?{'\n'}Let's record a new meal
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(222, 244, 255, 1)',
                borderRadius: 120,
                padding: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'rgba(24, 117, 195, 1)',
                width: '100%'
              }}
              onPress={() => navigation.navigate('EnterMealItems')}
            >
              <Text style={{ color: 'rgba(24, 117, 195, 1)', fontSize: 16 }}>Record New Template</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 16,
              marginTop: 20,
              borderTopWidth: 1,
              borderTopColor: '#eee',
              height: 80
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Meals;
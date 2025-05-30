import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiServer from './../Services/ApiServer';

function RecordMeal({ route, navigation }) {
  const { selectedItems, totalCal } = route.params;
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [selectedHour, setSelectedHour] = useState('10');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedMeridiem, setSelectedMeridiem] = useState('AM');
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');
  const [itemName, setItemName] = useState('');

  const saveMealRecord = async () => {
    const date = selectedDate;
    const timeString = `${selectedHour}:${selectedMinute} ${selectedMeridiem}`;
    const dateTimeString = `${selectedDate} ${selectedHour}:${selectedMinute} ${selectedMeridiem}`;

    const body = {
      name: itemName,
      date: date,
      timestamp: dateTimeString,
      totalCal: totalCal,
      selectedItems: selectedItems,
      mealType: selectedMealType
    };

    const endpoint = '/api/meal/createMeal';
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        if (data.message == "Meal created successfully") {
          navigation.navigate('BottomTabNavigation');
        }
      })
      .catch(error => {
        console.error('creation failed:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Record a Meal</Text>

      {/* Calendar */}
      <View style={styles.card}>
        <Calendar
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#007bff',
              selectedTextColor: '#fff',
            },
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#007bff',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#007bff',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#007bff',
            monthTextColor: '#2d4150',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
        />
      </View>

      {/* Time and Type Selectors */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Item Name</Text>
        <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={setItemName}
        />

        <Text style={styles.cardTitle}>Select Meal Time</Text>
        <View style={styles.timePickerContainer}>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedHour}
              style={styles.picker}
              onValueChange={(value) => setSelectedHour(value)}
            >
              {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map((hour) => (
                <Picker.Item key={hour} label={hour} value={hour} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMinute}
              style={styles.picker}
              onValueChange={(value) => setSelectedMinute(value)}
            >
              {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
                <Picker.Item key={minute} label={minute} value={minute} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMeridiem}
              style={styles.picker}
              onValueChange={(value) => setSelectedMeridiem(value)}
            >
              <Picker.Item label="AM" value="AM" />
              <Picker.Item label="PM" value="PM" />
            </Picker>
          </View>

        </View>

        <Text style={styles.cardTitle}>Select Type</Text>
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
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveMealRecord}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    marginTop: -22,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 1,
    marginHorizontal: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  calendar: {
    borderRadius: 10,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '30%',
    height: 60,
    overflow: 'hidden',
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
    height: 60,
  },

  saveButton: {
    backgroundColor: 'rgba(24, 117, 195, 1)',
    borderRadius: 120,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 15,
    width: '90%',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default RecordMeal;

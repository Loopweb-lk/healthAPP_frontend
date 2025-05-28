import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EnterActivityTime({ route, navigation }) {
  const { id, activity, icon, rate } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [startHour, setStartHour] = useState('10');
  const [startMinute, setStartMinute] = useState('00');
  const [startPeriod, setStartPeriod] = useState('AM');

  const [endHour, setEndHour] = useState('10');
  const [endMinute, setEndMinute] = useState('00');
  const [endPeriod, setEndPeriod] = useState('AM');

  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const periodOptions = ['AM', 'PM'];

  const convertTo24Hour = (hour, minute, period) => {
    let h = parseInt(hour, 10);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${minute}`;
  };

  const getDateTimeObject = (dateStr, hour, minute, period) => {
    const time24 = convertTo24Hour(hour, minute, period);
    return new Date(`${dateStr}T${time24}:00`);
  };

  const handleSubmit = async () => {

    const startTime = getDateTimeObject(selectedDate, startHour, startMinute, startPeriod);
    const endTime = getDateTimeObject(selectedDate, endHour, endMinute, endPeriod);
    const timePeriod = Math.max(0, Math.floor((endTime - startTime) / 1000));
    const totalRate = Number((rate * timePeriod).toFixed(2));

    const body = {
      activity: activity,
      timePeriod: timePeriod,
      timestamp: endTime,
      burnedCal: totalRate
    }

    const endpoint = '/api/activity/createActivity';
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        if (data.message == "Activity Log created successfully") {
          navigation.navigate('BottomTabNavigation');
        }
      })
      .catch(error => {
        console.error('creation failed:', error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Enter Activity Time</Text>

      {/* Calendar Card */}
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
            const selectedDate = new Date(day.dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate > today) {
              Alert.alert('Invalid Date', 'Selected date is a future date.');
            } else {
              setSelectedDate(day.dateString);
            }
          }}
        />
      </View>

      {/* Time and Type Selector */}
      <View style={styles.card}>
        <View style={styles.timeSelectionContainer}>
          <View style={styles.timeSection}>
            <Text style={styles.timeLabel}>Select Start Time</Text>
            <View style={styles.timeInputRow}>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={startHour}
                  onValueChange={(value) => setStartHour(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="#007bff"
                >
                  {hourOptions.map((hour) => (
                    <Picker.Item key={hour} label={hour} value={hour} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.timeSeparator}>:</Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={startMinute}
                  onValueChange={(value) => setStartMinute(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="#007bff"
                >
                  {minuteOptions.map((minute) => (
                    <Picker.Item key={minute} label={minute} value={minute} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.timeSeparator}></Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={startPeriod}
                  onValueChange={(value) => setStartPeriod(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="#007bff"
                >
                  {periodOptions.map((period) => (
                    <Picker.Item key={period} label={period} value={period} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.timeSection}>
            <Text style={styles.timeLabel}>Select End Time</Text>
            <View style={styles.timeInputRow}>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={endHour}
                  onValueChange={(value) => setEndHour(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="#007bff"
                >
                  {hourOptions.map((hour) => (
                    <Picker.Item key={hour} label={hour} value={hour} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.timeSeparator}>:</Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={endMinute}
                  onValueChange={(value) => setEndMinute(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="#007bff"
                >
                  {minuteOptions.map((minute) => (
                    <Picker.Item key={minute} label={minute} value={minute} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.timeSeparator}></Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={endPeriod}
                  onValueChange={(value) => setEndPeriod(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  dropdownIconColor="#007bff"
                >
                  {periodOptions.map((period) => (
                    <Picker.Item key={period} label={period} value={period} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit}
      >
        <Text style={styles.saveButtonText}>Submit Record</Text>
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
    marginLeft: 15,
    marginRight: 15,
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
  saveButton: {
    backgroundColor: 'rgba(24, 117, 195, 1)',
    borderRadius: 120,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeSelectionContainer: {
    marginHorizontal: 16,
  },
  timeSection: {
    marginBottom: 24,
  },
  timeLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  timeInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 280, // keep enough height for the wheel to work
    marginTop: -80, // shift up to hide top items
    marginBottom: -120, // shift down to hide bottom items
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '32%',
    marginBottom: 20,
    height: 60,
  },
  timeSeparator: {
    fontSize: 12,
    marginHorizontal: 8,
    color: '#555',
  },
});

export default EnterActivityTime;
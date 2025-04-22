import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Calender({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateObject, setDateObject] = useState(new Date());
  const [timeObject, setTimeObject] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [markedDates, setmarkedDates] = useState(null);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return strTime;
  };

  const getEvents = async () => {
    try {
      const endpoint = '/api/event/events';
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const data = await ApiServer.call(endpoint, 'GET', null, headers);

      const mappedData = data.records.map((item) => {
        const date = new Date(item.selectedDate);

        const dateString = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        });

        const subtitle = `${dateString}, ${item.eventTime}`;
        const today = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const eventDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const daysDiff = Math.round((eventDateOnly - todayOnly) / oneDay);

        const daysMore = daysDiff === 0
          ? 'Today'
          : daysDiff > 0
            ? `In ${daysDiff} day${daysDiff > 1 ? 's' : ''}`
            : `${Math.abs(daysDiff)} day${Math.abs(daysDiff) > 1 ? 's' : ''} ago`;

        return {
          title: item.eventName,
          subtitle,
          daysMore,
        };
      });

      const temp = data.records.reduce((acc, item) => {
        const dateKey = new Date(new Date(item.selectedDate).setDate(new Date(item.selectedDate).getDate() + 1)).toISOString().split('T')[0];
        acc[dateKey] = {
          selected: true,
          selectedColor: '#007bff',
          selectedTextColor: '#fff',
        };
        return acc;
      }, {});

      setAppointments(mappedData);
      setmarkedDates(temp);
    } catch (error) {
      Alert.alert('request failed', error.message);
    }
  }

  const handleSubmit = async () => {

    const body = {
      eventName: eventName,
      selectedDate: selectedDate,
      eventTime: eventTime
    }
    setModalVisible(false);

    const endpoint = '/api/event/createRecord';
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    try {
      const data = await ApiServer.call(endpoint, 'POST', body, headers);
      if (data.message === "Sugar Log created successfully") {
        await getEvents();
        setEventName('');
        setEventTime('');
        setSelectedDate('');
        setModalVisible(false);
      }
    } catch (error) {
      console.error('creation failed:', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Calender</Text>

      {/* Calendar */}
      <View style={styles.card}>
        {markedDates && Object.keys(markedDates).length > 0 && (
          <Calendar
            markedDates={markedDates}
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
        )}
      </View>


      {/* Upcoming Appointments */}
      <ScrollView style={styles.appointmentsSection}>
        <Text style={styles.appointmentsTitle}>Upcoming Appointments</Text>
        {appointments.map((apt, index) => (
          <View key={index} style={styles.appointmentCard}>
            <View>
              <Text style={styles.appointmentTitle}>{apt.title}</Text>
              <Text style={styles.appointmentSubtitle}>{apt.subtitle}</Text>
            </View>
            <Text style={styles.daysMoreText}>{apt.daysMore}</Text>
          </View>
        ))}

        {/* Create New */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#4B89DC" />
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </ScrollView >

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>

            <Text style={modalStyles.modalTitle}>Add Event</Text>

            <TextInput
              style={modalStyles.input}
              placeholder="Name"
              value={eventName}
              onChangeText={setEventName}
            />

            {/* Date Picker Trigger */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={modalStyles.input}
                placeholder="Date"
                value={selectedDate}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            {/* Time Picker Trigger */}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                style={modalStyles.input}
                placeholder="Time"
                value={eventTime}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            <View style={modalStyles.buttonRow}>
              <TouchableOpacity
                style={modalStyles.deleteButton}
                onPress={() => {
                  setEventName('');
                  setEventTime('');
                  setSelectedDate('');
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: '#1875C3', marginTop: 5, fontWeight: '600' }}>
                  Delete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={modalStyles.saveButton}
                onPress={handleSubmit}
              >
                <Text style={{ color: '#fff', marginTop: 5, fontWeight: '600' }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            {/* Date Picker */}

            <View style={{ marginLeft: -8, marginTop: 15 }}>
              {showDatePicker && (
                <DateTimePicker
                  style={{ backgroundColor: '#9B9898FF' }}
                  value={dateObject}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selected) => {
                    setShowDatePicker(false);
                    if (selected) {
                      const isoDate = selected.toISOString().split('T')[0];
                      setDateObject(selected);
                      setSelectedDate(isoDate);
                    }
                  }}
                />
              )}

              {/* Time Picker */}
              {showTimePicker && (
                <DateTimePicker
                  style={{ backgroundColor: '#9B9898FF' }}
                  value={timeObject}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selected) => {
                    setShowTimePicker(false);
                    if (selected) {
                      setTimeObject(selected);
                      setEventTime(formatTime(selected));
                    }
                  }}
                />
              )}

            </View>

          </View>
        </View>
      </Modal>


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
  calendar: {
    borderRadius: 10,
  },
  appointmentsSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  appointmentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  appointmentSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  daysMoreText: {
    fontSize: 14,
    color: '#4B89DC',
    fontWeight: '500',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEF4FF',
    borderRadius: 50,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#4B89DC',
    height: 48,
    width: '40%',
    alignSelf: 'center',
  },
  createButtonText: {
    color: '#4B89DC',
    marginLeft: 5,
    fontWeight: '500',
  },
});

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
    height: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#DEF4FF',
    padding: 10,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
    height: 50,
  },
  saveButton: {
    backgroundColor: '#1875C3',
    padding: 10,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
    height: 50,
  },
});

export default Calender;

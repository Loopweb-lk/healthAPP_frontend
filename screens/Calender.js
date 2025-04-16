import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Calender({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('10');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedMeridiem, setSelectedMeridiem] = useState('AM');
  const [selectedMealType, setSelectedMealType] = useState('Breakfast');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');

  const appointments = [
    {
      title: 'Doctor Appointment',
      subtitle: 'April 18, 10:00 AM',
      daysMore: 'In 2 days',
    },
    {
      title: 'Nutritionist Session',
      subtitle: 'April 20, 2:00 PM',
      daysMore: 'In 4 days',
    },
  ];

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
            console.log('Selected date:', day.dateString);
            setSelectedDate(day.dateString);
          }}
        />
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.appointmentsSection}>
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

        {/* Create New Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#4B89DC" />
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      {/* Add Event Modal */}
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

            <TextInput
              style={modalStyles.input}
              placeholder="Date"
              value={selectedDate}
              editable={false}
            />

            <TextInput
              style={modalStyles.input}
              placeholder="Time"
              value={eventTime}
              onChangeText={setEventTime}
            />

            <View style={modalStyles.buttonRow}>
              <TouchableOpacity
                style={modalStyles.deleteButton}
                onPress={() => {
                  setEventName('');
                  setEventTime('');
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: '#1875C3',marginTop: '5',fontWeight:'600' }}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={modalStyles.saveButton}
                onPress={() => {
                  console.log('Saved Event:', { eventName, selectedDate, eventTime });
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: '#fff',marginTop: '5',fontWeight:'600' }}>Save</Text>
              </TouchableOpacity>
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
  },
});

export default Calender;

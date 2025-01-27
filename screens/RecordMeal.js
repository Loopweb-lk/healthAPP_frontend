import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


const RecordMeal = () => {
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Record a Meal</Text>

            {/* Calendar Card */}
            <View style={styles.card}>
                {/* <Text style={styles.cardTitle}>Select a Date</Text> */}
                <Calendar
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: '#007bff',
                            selectedTextColor: '#fff',
                            // borderRadius: 0,
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
                        setSelectedDate(day.dateString); // Update selected date
                    }}
                />
            </View>

            {/* Time and Type Selector */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Select Meal Time</Text>
                <View style={styles.timePickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <Picker selectedValue="10" style={styles.picker}>
                            {Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map((hour) => (
                                <Picker.Item key={hour} label={hour} value={hour} style={{ fontSize: 11 }} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker selectedValue="00" style={styles.picker}>
                            {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
                                <Picker.Item key={minute} label={minute} value={minute} style={{ fontSize: 11 }} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker selectedValue="AM" style={styles.picker}>
                            <Picker.Item label="AM" value="AM" style={{ fontSize: 8 }} />
                            <Picker.Item label="PM" value="PM" style={{ fontSize: 8 }} />
                        </Picker>
                    </View>
                </View>
                <Text style={styles.cardTitle}>Select Type</Text>
                <View style={styles.pickerWrapper2}>
                    <Picker selectedValue="Breakfast" style={styles.picker}>
                        <Picker.Item label="Breakfast" value="Breakfast" />
                        <Picker.Item label="Lunch" value="Lunch" />
                        <Picker.Item label="Dinner" value="Dinner" />
                    </Picker>
                </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

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
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        width: '30%',
    },
    pickerWrapper2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        width: '100%',
    },
    picker: {
        height: 50,
        // width: '100%',
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
       alignSelf: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RecordMeal;

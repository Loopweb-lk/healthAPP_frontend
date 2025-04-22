import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SugarHistory({ navigation }) {
  const [sugarRecords, setSugarRecords] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const endpoint = '/api/sugar/sugar';
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        }
        const data = await ApiServer.call(endpoint, 'GET', null, headers);
        setSugarRecords(data.records);
      } catch (error) {
        Alert.alert('request failed', error.message);
      }
    };

    fetchMeals();
  }, []);

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || (type === 'from' ? fromDate : toDate);
    if (type === 'from') {
      setFromDate(currentDate);
    } else {
      setToDate(currentDate);
    }
    setShowFromDatePicker(false);
    setShowToDatePicker(false);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleFilter = async () => {

    const body = {
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    };

    console.log(body);

    const endpoint = '/api/sugar/findByDateRange';
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        setSugarRecords(data.records);
      })
      .catch(error => {
        console.error('creation failed:', error);
      });

    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sugar History</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="filter-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {sugarRecords && sugarRecords.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {sugarRecords.map((item) => (
            <View key={item.id} style={styles.recordCard}>
              <Text style={styles.dateText}>
                {item.timestamp.split('T')[0]}
              </Text>
              <View style={styles.recordRow}>
                <Text style={styles.labelText}>Sugar level</Text>
                <Text style={styles.valueText}>: {item.level}</Text>
              </View>
              <View style={styles.recordRow}>
                <Text style={styles.labelText}>Before</Text>
                <Text style={styles.valueText}>: {item.meal}</Text>
              </View>
              {item.note ? (
                <Text style={styles.notesText}>{item.note}</Text>
              ) : null}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>No records found.</Text>
      )}


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('RecordSugar')}>
          <Text style={styles.addButtonText}>Add New Record</Text>
        </TouchableOpacity>
      </View>


      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Sugar history</Text>

            <Text style={styles.modalLabel}>From Date</Text>
            <TouchableOpacity
              onPress={() => setShowFromDatePicker(true)}
              style={styles.dateInput}
            >
              <Text>{fromDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            <Text style={styles.modalLabel}>To Date</Text>
            <TouchableOpacity
              onPress={() => setShowToDatePicker(true)}
              style={styles.dateInput}
            >
              <Text>{toDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showFromDatePicker && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleDateChange(event, selectedDate, 'from')
                }
              />
            )}

            {showToDatePicker && (
              <DateTimePicker
                value={toDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleDateChange(event, selectedDate, 'to')
                }
              />
            )}

            <Pressable
              style={styles.modalButton}
              onPress={handleFilter}
            >
              <Text style={styles.modalButtonText}>Filter</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    padding: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: '#F5F5F8',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  recordCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  recordRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 14,
    color: '#757575',
    width: 80,
  },
  valueText: {
    fontSize: 14,
    color: '#212121',
  },
  notesText: {
    fontSize: 14,
    marginTop: 6,
    color: '#212121',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 60,
  },
  addButton: {
    backgroundColor: '#1875C3',
    borderRadius: 30,
    padding: 14,
    mnarginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalLabel: {
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontSize: 14,
  },
  dateInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#1875C3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default SugarHistory;

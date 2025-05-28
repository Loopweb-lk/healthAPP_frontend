import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UserProfile({ navigation }) {
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    email: '',
    mealType: '',
    CB: '',
    CI: '',
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableDetails, setEditableDetails] = useState({ ...profileDetails });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(2001, 10, 11)); // For date picker (months are 0-indexed)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const requestPassword = async () => {

      try {
        const endpoint = '/api/general/getProfile';
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        }
        const data = await ApiServer.call(endpoint, 'GET', null, headers);
        setProfileDetails({
          name: data.user.username,
          email: data.user.email,
          mealType: data.user.mealType,
          CB: data.user.calorieBurn,
          CI: data.user.calorieIntake,
        })

      } catch (error) {
        console.error('request failed', error.message);
      }
    };

    requestPassword();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const saveDetails = async () => {
    const endpoint = '/api/general/updateProfile';

    const body = {
      ...editableDetails
    };

    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        if (data.message == "Profile updated successfully") {
          navigation.navigate('BottomTabNavigation')
        }
      })
      .catch(error => {
        console.error('Register failed:', error);
      });

    setEditModalVisible(false);
  };

  const handleChange = (field, value) => {
    setEditableDetails({
      ...editableDetails,
      [field]: value
    });
  };

  const openEditModal = () => {
    setEditableDetails({ ...profileDetails });
    setEditModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Image
              source={require('./../assets/hero2.jpg')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.profileName}>{profileDetails.name}</Text>
        </View>

        {/* Profile Details Card */}
        <View style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Your Profile</Text>

          {/* Profile Fields */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text style={styles.fieldValue}>{profileDetails.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{profileDetails.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Meal Type</Text>
            <Text style={styles.fieldValue}>{profileDetails.mealType}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Daily Calorie Burn </Text>
            <Text style={styles.fieldValue}>{profileDetails.CB} cal</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Daily Calorie Burn</Text>
            <Text style={styles.fieldValue}>{profileDetails.CI} cal</Text>
          </View>

          <View style={styles.divider} />

          {/* Edit Details Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={openEditModal}
          >
            <Text style={styles.editButtonText}>Edit Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={false}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={styles.placeholderView} />
          </View>

          <ScrollView style={styles.modalScrollContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => handleChange('name', text)}
                  placeholder="Enter your name"
                />
              </View>
            </View>


            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Meal Option</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={toggleDropdown}>
                  <Text style={styles.textInput}>
                    {selectedOption ? selectedOption : 'Select Option'}
                  </Text>
                </TouchableOpacity>
              </View>

              {isDropdownOpen && (
                <>
                  <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
                    <View style={styles.overlay}></View>
                  </TouchableWithoutFeedback>
                  <View style={styles.dropdownContainer}>
                    <Picker
                      selectedValue={selectedOption}
                      style={styles.picker}
                      onValueChange={(itemValue) => {
                        setSelectedOption(itemValue);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Picker.Item style={styles.pickerItem} label="Veg" value="veg" />
                      <Picker.Item style={styles.pickerItem} label="Non-veg" value="non-veg" />
                    </Picker>
                  </View>
                </>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Daily calorie burn out goal(cal)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => handleChange('CB', text)}
                  placeholder="Height in cm"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Daily Calorie Intake Goal(cal)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => handleChange('CI', text)}
                  placeholder="Height in cm"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={saveDetails}
            >
              <Text style={styles.saveButtonText}>Save Details</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F2F2F7',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholderView: {
    width: 40, // To balance the header
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C5E1F2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#000',
  },
  fieldValue: {
    fontSize: 16,
    color: '#8E8E93',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  editButton: {
    backgroundColor: '#E5F1F8',
    borderRadius: 28,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderColor: '#1875C3',
    borderBlockColor: '#1875C3',
    borderWidth: 1,
    width: '60%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    color: '#8E8E93',
  },
  activeTabLabel: {
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  modalScrollContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#3C3C43',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  calculatedValue: {
    color: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1875C3',
    fontWeight: '600',
    fontSize: 16,
  },
  datePickerIOS: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    flex: 0.48, // Almost half width with space between
  },
  selectedGender: {
    backgroundColor: '#E5F1F8',
  },
  genderText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#8E8E93',
  },
  selectedGenderText: {
    color: '#007AFF',
    fontWeight: '500',
  },

  dropdownContainer: {
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#B1B1B1FF',
    color: "black"
  },

  pickerItem: {
    color: "#000000FF"
  }
});

export default UserProfile;
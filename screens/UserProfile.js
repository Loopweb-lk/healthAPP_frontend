import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

function UserProfile({ navigation }) {
  const [profileDetails, setProfileDetails] = useState({
    name: 'Olivia Parker',
    birthday: '2001/11/11',
    gender: 'Female',
    height: '170', // Changed to a realistic height in cm
    weight: '65',
    bmi: '22.5'
  });
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableDetails, setEditableDetails] = useState({...profileDetails});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(2001, 10, 11)); // For date picker (months are 0-indexed)

  const calculateBMI = (height, weight) => {
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    
    if (!isNaN(heightValue) && !isNaN(weightValue) && heightValue > 0) {
      // Convert height from cm to meters for BMI calculation
      const heightInMeters = heightValue / 100;
      const bmi = weightValue / (heightInMeters * heightInMeters);
      return bmi.toFixed(1); // Round to 1 decimal place
    }
    return "0";
  };

  const saveDetails = () => {
    // Calculate BMI
    const bmi = calculateBMI(editableDetails.height, editableDetails.weight);
    
    setProfileDetails({
      ...editableDetails,
      bmi: bmi
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
    // Reset editable details to current profile details
    setEditableDetails({...profileDetails});
    setDate(new Date(profileDetails.birthday.replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3')));
    setEditModalVisible(true);
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    
    // Format the date as YYYY/MM/DD
    const formattedDate = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}`;
    
    handleChange('birthday', formattedDate);
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
            <Text style={styles.fieldLabel}>Birthday</Text>
            <Text style={styles.fieldValue}>{profileDetails.birthday}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Gender</Text>
            <Text style={styles.fieldValue}>{profileDetails.gender}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Height</Text>
            <Text style={styles.fieldValue}>{profileDetails.height} cm</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Weight</Text>
            <Text style={styles.fieldValue}>{profileDetails.weight} kg</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>BMI (Calculated)</Text>
            <Text style={styles.fieldValue}>{profileDetails.bmi}</Text>
          </View>

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
            {/* <Text style={styles.modalTitle}>Edit Profile</Text> */}
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={editableDetails.name}
                  onChangeText={(text) => handleChange('name', text)}
                  placeholder="Enter your name"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Birthday</Text>
              <TouchableOpacity 
                style={styles.inputContainer}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.textInput}>{editableDetails.birthday}</Text>
                <Ionicons name="calendar-outline" size={20} color="#8E8E93" />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === 'ios' ? "spinner" : "default"}
                  onChange={onDateChange}
                  style={{backgroundColor:'black'}}
                />
              )}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity 
                  style={[
                    styles.genderOption, 
                    editableDetails.gender === 'Female' && styles.selectedGender
                  ]}
                  onPress={() => handleChange('gender', 'Female')}
                >
                  <Ionicons 
                    name={editableDetails.gender === 'Female' ? "radio-button-on" : "radio-button-off"} 
                    size={22} 
                    color={editableDetails.gender === 'Female' ? "#007AFF" : "#8E8E93"} 
                  />
                  <Text style={[
                    styles.genderText,
                    editableDetails.gender === 'Female' && styles.selectedGenderText
                  ]}>Female</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.genderOption, 
                    editableDetails.gender === 'Male' && styles.selectedGender
                  ]}
                  onPress={() => handleChange('gender', 'Male')}
                >
                  <Ionicons 
                    name={editableDetails.gender === 'Male' ? "radio-button-on" : "radio-button-off"} 
                    size={22} 
                    color={editableDetails.gender === 'Male' ? "#007AFF" : "#8E8E93"} 
                  />
                  <Text style={[
                    styles.genderText,
                    editableDetails.gender === 'Male' && styles.selectedGenderText
                  ]}>Male</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={editableDetails.height}
                  onChangeText={(text) => handleChange('height', text)}
                  placeholder="Height in cm"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={editableDetails.weight}
                  onChangeText={(text) => {
                    handleChange('weight', text);
                    // Auto-calculate BMI on weight change if height exists
                    if (editableDetails.height) {
                      const calculatedBMI = calculateBMI(editableDetails.height, text);
                      handleChange('bmi', calculatedBMI);
                    }
                  }}
                  placeholder="Weight in kg"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>BMI (Calculated)</Text>
              <View style={styles.inputContainer}>
                <Text style={[styles.textInput, styles.calculatedValue]}>
                  {calculateBMI(editableDetails.height, editableDetails.weight)}
                </Text>
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

      {/* Bottom Tab Bar */}
      {/* <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#007AFF" />
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="restaurant-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Meals</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="fitness-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Exercise</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="water-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Sugar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#8E8E93" />
          <Text style={styles.tabLabel}>Analytics</Text>
        </TouchableOpacity>
      </View> */}
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
});

export default UserProfile;
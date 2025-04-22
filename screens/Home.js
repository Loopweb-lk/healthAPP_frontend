import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Ionicons
} from "@expo/vector-icons";

function Home({ navigation }) {

  const [showSettings, setShowSettings] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  // Function to determine whether it's morning or evening
  const getGreeting = () => {
    let [fontsLoaded] = useFonts({
      Inter_400Regular,
      Inter_700Bold,
    });
    const hour = selectedTime.getHours();
    if (hour >= 0 && hour < 12) {
      return 'Good Morning';
    } else {
      return 'Good Evening';
    }
  };
  const getFormattedDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];

    return `${dayOfWeek}, ${dayOfMonth} ${month}`;
  };

  const SettingsPopup = () => (
    <View style={styles.settingsPopup}>
      <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.settingsText}>Your Profile</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.settingsItem}>
        <Text style={styles.settingsText}>Switch to Dark Mode</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('EmergencyContacts')}>
        <Text style={styles.settingsText}>Emergency Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsItem}>
        <Text style={styles.settingsText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsItem} onPress={() => { navigation.navigate('Login'); setShowSettings(!showSettings) }}>
        <Text style={styles.settingsText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.profileButton}>
          <Image source={{ uri: 'https://www.loopwebit.com/avter-g.png' }}
            style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
        <View style={styles.topBarIcons}>

          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.tipIconContainer}>
              <Icon name="notifications-outline" size={24} color="#333" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowSettings(!showSettings)}
          >
            <View style={styles.tipIconContainer}>
              <Ionicons name="settings-sharp" size={24} color="#333" />
            </View>

          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Popup Modal */}
      <Modal
        visible={showSettings}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSettings(false)}
        >
          <View style={styles.settingsContainer}>
            <SettingsPopup />
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{getGreeting()}</Text>
          <Text style={styles.headerDate}>{getFormattedDate()}</Text>
        </View>

        {/* Water Tip Card */}
        <View style={[styles.card, styles.tipCard]}>
          {/* <View style={styles.tipIconContainer}> */}
          {/* <Icon name="bulb-outline" size={24} color="#FFF" /> */}
          <Image source={{ uri: 'https://www.loopwebit.com/light.png' }}
            style={{ width: 45, height: 50 }}
          />
          {/* </View> */}
          <Text style={styles.tipText}>
            Drinking at least 1.5 to 2 liters of water a day helps flush toxins from your body
          </Text>
        </View>

        {/* Two Column Layout for Checkup and Sugar Level */}
        <View style={styles.rowContainer}>
          {/* Upcoming Checkups */}
          <View style={[styles.card, styles.checkupCard]}>
            <Text style={styles.cardTitle}>7 Days</Text>
            <Text style={styles.cardSubtitle}>Till next Checkup</Text>
            <View style={styles.appointmentList}>
              <Text style={styles.appointmentText}>17th Nov</Text>
              <Text style={styles.appointmentSubtext}>Clinic at Hospital</Text>
              <Text style={styles.appointmentText}>24th Nov</Text>
              <Text style={styles.appointmentSubtext}>Blood test Date</Text>
              <Text style={styles.appointmentText}>31th Nov</Text>
              <Text style={styles.appointmentSubtext}>Doctor Checkup</Text>
            </View>
            <TouchableOpacity style={styles.floatingAddButton} onPress={() => { navigation.navigate("Calender") }}>
              <MaterialIcons name="add-circle-outline" size={39} color="rgba(68, 92, 113, 1)" />
            </TouchableOpacity>
          </View>

          {/* Sugar Level Card */}
          <View style={[styles.card, styles.sugarCard]}>
            <Text style={styles.sugarValue}>90</Text>
            <Text style={styles.sugarLabel}>Sugar Level</Text>
            <Text style={styles.sugarTime}>Breakfast</Text>
          </View>
        </View>

        {/* Create Stats */}
        <View style={[styles.card, styles.CreateCard]}>
          <View style={styles.CreateIconContainer}>
            <Icon name="fitness" size={40} color="#000" />
          </View>
          <View style={styles.CreateStats}>
            <Text style={styles.CreateValue}>128 cal</Text>
            <Text style={styles.CreateTime}>/ 40 min</Text>
          </View>
        </View>

        {/* Calories Progress */}
        <View style={styles.progressContainer}>
          {['#4CAF50', '#FFC107', '#FF5722'].map((color, index) => (
            <View key={index} style={[styles.progressCard, styles.card]}>
              <View style={[styles.progressCircle, { borderColor: color }]}>
                <Text style={styles.progressText}>324/500</Text>
                <Text style={styles.progressLabel}>Calories</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Meal Planner */}
        <TouchableOpacity onPress={() => navigation.navigate('MealPlanner')} style={[styles.card, styles.mealPlannerCard]}>
          <View style={styles.mealPlannerContent}>
            <Icon name="restaurant-outline" size={24} color="#4CAF50" />
            <View style={styles.mealPlannerText}>
              <Text style={styles.mealPlannerTitle}>Plan your meals</Text>
              <Text style={styles.mealPlannerSubtitle}>Find the healthiest meal for you!</Text>
            </View>
            <Icon name="chevron-forward" size={24} color="#4CAF50" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 4
  },
  topBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  header: {
    marginBottom: 20,
    marginTop: -15,
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    fontFamily: "Inter_400Regular",
  },
  headerDate: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 5,

  },
  tipCard: {
    backgroundColor: '#66B2A1',
    flexDirection: 'row',
    alignItems: 'center',

  },
  tipIconContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 120,
    padding: 8,
    marginRight: 15,
  },
  tipText: {
    color: '#FFF',
    flex: 1,
    fontSize: 16,
    // lineHeight: 22,
    marginLeft: 15,
    fontWeight: '800',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkupCard: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'rgba(222, 244, 255, 1)',
  },
  sugarCard: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgba(52, 77, 99, 1)',
  },
  cardSubtitle: {
    color: 'rgba(52, 77, 99, 1)',
    fontSize: 16,
    // marginTop: 5,
    // marginBottom: 15,
  },
  appointmentList: {
    marginTop: 10,
  },
  appointmentText: {
    fontSize: 14,
    fontWeight: '800',
    color: 'rgba(52, 77, 99, 1)',
    // marginTop: 5,
  },
  appointmentSubtext: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  floatingAddButton: {
    position: 'absolute',
    right: 9,
    bottom: 20,
    // backgroundColor: '#4CAF50',
    // borderRadius: 15,
    padding: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  sugarValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
  },
  sugarLabel: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 5,
  },
  sugarTime: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  CreateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CreateIconContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 10,
  },
  CreateStats: {
    alignItems: 'flex-end',
  },
  CreateValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  CreateTime: {
    color: '#666',
    marginTop: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
  },
  progressCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  mealPlannerCard: {
    backgroundColor: '#FFF',
    marginBottom: 100,
  },
  mealPlannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealPlannerText: {
    flex: 1,
    marginHorizontal: 15,
  },
  mealPlannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealPlannerSubtitle: {
    color: '#666',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  settingsContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsPopup: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  settingsItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingsText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Home;
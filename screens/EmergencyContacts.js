import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Linking,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStaticNavigation, useNavigation, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EmergencyContacts({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contacts, setcontacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {

    try {
      const endpoint = '/api/general/getContacts';
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const data = await ApiServer.call(endpoint, 'GET', null, headers);
      setcontacts(data.contacts)

    } catch (error) {
      console.error('request failed', error.message);
    }
  };

  const handleCreateNew = () => {
    setIsModalVisible(true);
  };

  const handleSave = async () => {

    const endpoint = '/api/general/createContact';

    const body = {
      name: newContact.name,
      number: newContact.phone,
    };

    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    }

    ApiServer.call(endpoint, 'POST', body, headers)
      .then(data => {
        if (data.message == "Contact created successfully") {
          getContacts();
        }
      })
      .catch(error => {
        console.error('failed:', error);
      });
    setIsModalVisible(false);
    setNewContact({ name: '', phone: '' });
  };

  const handleFinish = () => {
    navigation.navigate('BottomTabNavigation');
  };

  const handleDelete = async (id) => {
    try {
      const body = {
        id: id
      };

      const endpoint = '/api/general/deleteContact';
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }

      const response = await ApiServer.call(endpoint, 'POST', body, headers);
      if (response.message === "Contact deleted successfully") {
        getContacts();
      }
    } catch (error) {
      console.error('Deletion failed:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Emergency contacts</Text>
        <Text style={styles.subtitle}>
          Add emergency contacts to notify when your blood sugar level is extremely high
        </Text>

        {contacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactCard}
            onPress={() => Linking.openURL(`tel:${contact.number}`)}
            onLongPress={() => handleDelete(contact.id)}
          >
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactPhone}>{contact.number}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.CreateButton}
            onPress={handleCreateNew}
          >
            <Text style={styles.CreateButtonText}>+  Create New</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinish}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>New Contact</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={newContact.name}
                  onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                  placeholder="Friend 1"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mobile No:</Text>
                <TextInput
                  style={styles.input}
                  value={newContact.phone}
                  onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                  placeholder="071 - XXX - XXXX"
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(245, 245, 248, 1)',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666666',
  },
  buttonContainer: {
    marginTop: 'auto',
    gap: 12,
  },
  CreateButton: {
    backgroundColor: 'rgba(24, 117, 195, 1)',
    borderRadius: 120,
    padding: 16,
    alignItems: 'center',
  },
  CreateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  finishButton: {
    backgroundColor: 'rgba(222, 244, 255, 1)',
    borderRadius: 120,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(24, 117, 195, 1)',
  },
  finishButtonText: {
    color: 'rgba(24, 117, 195, 1)',
    fontSize: 16,
    fontWeight: '600',
  },
  // New Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    fontSize: 16,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: 'rgba(24, 117, 195, 1)',
    padding: 12,
    borderRadius: 120,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmergencyContacts;
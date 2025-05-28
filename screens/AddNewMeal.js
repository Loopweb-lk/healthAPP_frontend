import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddNewMeal({ navigation }) {
    const [itemName, setItemName] = useState('');
    const [calorieLevel, setCalorieLevel] = useState('');

    const handleSave = async () => {

        const endpoint = '/api/meal/createFoodItems';

        const body = {
            name: itemName,
            calorie: calorieLevel,
        };

        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        }

        ApiServer.call(endpoint, 'POST', body, headers)
            .then(data => {
                if (data.message == "Meal Item created successfully") {
                    navigation.navigate('Add_New_Meal_ltem')
                }
            })
            .catch(error => {
                console.error('Register failed:', error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Meal Item</Text>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Item Name</Text>
                    <TextInput
                        style={styles.input}
                        value={itemName}
                        onChangeText={setItemName}
                        placeholder=""
                    />

                    <Text style={styles.label}>calorie </Text>
                    <TextInput
                        style={styles.input}
                        value={calorieLevel}
                        onChangeText={setCalorieLevel}
                        placeholder=""
                        keyboardType="numeric"
                    />
                </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity style={styles.nextButton} onPress={handleSave}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginRight: 30,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    formContainer2: {
        flex: 1,
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 16,
        color: '#777',
        marginTop: 20,
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 40,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        width: 40,
        height: 40,
        backgroundColor: '#F1F1F1',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    addButtonText: {
        fontSize: 24,
        color: '#999',
        marginTop: -2,
    },
    iconsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 100,
    },
    iconBox: {
        width: '31%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BDC5F0',
    },
    selectedIconBox: {
        borderColor: '#4F63CF',
        borderWidth: 2,
    },
    emptyIconBox: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },
    iconText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },
    nextButton: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        backgroundColor: '#3177CA',
        borderRadius: 30,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default AddNewMeal;

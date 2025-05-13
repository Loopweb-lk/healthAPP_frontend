import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function AddNewMeal({ navigation }) {
    const [itemName, setItemName] = useState('');
    const [calorieLevel, setCalorieLevel] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedIcons, setSelectedIcons] = useState([]);

    const foodIcons = [
        { id: 1, name: 'Bullseye', count: 1 },
        { id: 2, name: 'Rice Bowl', count: 1 },
        { id: 3, name: 'Ice Cream', count: 1 },
        { id: 4, name: 'Salad', count: 1 },
        { id: 5, name: 'Sandwich', count: 1 },
        { id: 6, name: 'Ice Cream', count: 1 },
        { id: 7, name: '', count: 0 },
        { id: 8, name: '', count: 0 },
        { id: 9, name: '', count: 0 },
    ];

    const handleNext = () => {
        console.log('Next pressed with:', {
            itemName,
            calorieLevel,
            quantity,
            selectedIcons,
        });
        // navigation.navigate('NextScreen', { itemDetails: { itemName, calorieLevel, quantity, selectedIcons } });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Meal</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                    style={styles.input}
                    value={itemName}
                    onChangeText={setItemName}
                    placeholder=""
                />

                <Text style={styles.label}>Estimated Calory Level</Text>
                <TextInput
                    style={styles.input}
                    value={calorieLevel}
                    onChangeText={setCalorieLevel}
                    placeholder=""
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Quantity</Text>
                <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder=""
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Choose Icon</Text>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.formContainer2}>
                    <View style={styles.iconsGrid}>
                        {foodIcons.map((icon) => (
                            <TouchableOpacity
                                key={icon.id}
                                style={[
                                    styles.iconBox,
                                    selectedIcons.includes(icon.id) && styles.selectedIconBox,
                                    icon.name === '' && styles.emptyIconBox
                                ]}
                                onPress={() => {
                                    if (icon.name === '') return;
                                    setSelectedIcons((prevSelected) =>
                                        prevSelected.includes(icon.id)
                                            ? prevSelected.filter((id) => id !== icon.id)
                                            : [...prevSelected, icon.id]
                                    );
                                }}
                                disabled={icon.name === ''}
                            >
                                {icon.name !== '' && (
                                    <Text style={styles.iconText}>{icon.name} x {icon.count}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
        bottom: 20,
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

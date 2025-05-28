import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import ApiServer from './../Services/ApiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MealPlanner({ navigation }) {

    const [mealData, setMealData] = useState({});
    const [MealIDs, setMealIDs] = useState(null);


    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const endpoint = '/api/meal/getMeals';
                const token = await AsyncStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`
                }
                const data = await ApiServer.call(endpoint, 'GET', null, headers);
                setMealData(data.mealPlan);
                setMealIDs(extractMealIds(data));
            } catch (error) {
                console.error('Request failed:', error);
                Alert.alert('Request failed', error.message);
            }
        };

        fetchMeals();
    }, []);


    const renderMealCard = (type, meal) => (
        <View style={styles.mealCard} key={`${meal.name}-${meal.calorie}-${type}`}>
            <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name.split(',')[0]}</Text>
                {meal.name.split(',').length > 1 && (
                    <Text style={styles.mealDetail}>{meal.name.split(',').slice(1).join(',').trim()}</Text>
                )}
                <Text style={styles.mealType}>{meal.category}</Text>
            </View>
            <View style={styles.calorieInfo}>
                <Text style={styles.calorieText}>{meal.calorie} Cal</Text>
            </View>
        </View>
    );

    const renderDaySection = (day, mealsObj) => (
        <View style={styles.daySection} key={day}>
            <Text style={styles.dayTitle}>{toTitleCase(day)}</Text>
            {renderMealCard('Breakfast', mealsObj.meals.breakfast)}
            {renderMealCard('Lunch', mealsObj.meals.lunch)}
            {renderMealCard('Snack', mealsObj.meals.snack)}
            {renderMealCard('Dinner', mealsObj.meals.dinner)}
            <Text style={styles.totalCalories}>Total Intake:  {mealsObj.totalCalories} Cal</Text>
        </View>
    );

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    function extractMealIds(data) {
        return Object.values(data.mealPlan)
            .flatMap(day => Object.values(day.meals).map(meal => meal.id))
            .join(',');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meal Planner</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.content}>
                {Object.entries(mealData).map(([day, meals]) => renderDaySection(day, meals))}
            </ScrollView>

            <TouchableOpacity
                style={styles.groceryButton}
                onPress={() => navigation.navigate('GroceryList', { mealIds: MealIDs })}
            >
                <Text style={styles.groceryButtonText}>Go to grocery list</Text>
            </TouchableOpacity>

 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 248, 1)',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    headerRight: {
        width: 24,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    daySection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },

    dayTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },

    mealCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    mealInfo: {
        flex: 1,
    },
    mealName: {
        fontSize: 16,
        fontWeight: '500',
    },
    mealDetail: {
        fontSize: 14,
        color: '#666',
    },
    mealType: {
        fontSize: 14,
        color: '#666',
    },
    calorieInfo: {
        backgroundColor: 'rgba(245, 245, 248, 1)',
        padding: 8,
        borderRadius: 8,
    },
    calorieText: {
        color: '#1875C3',
        fontWeight: '500',
    },

    totalCalories: {
        color: '#2ECC71',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 12,
        textAlign: 'center',
    },

    groceryButton: {
        backgroundColor: '#1875C3',
        margin: 16,
        padding: 16,
        borderRadius: 120,
        alignItems: 'center',
        marginBottom: 30,
    },
    groceryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        height: 79, // Adjust height for better spacing
        // backgroundColor: COLORS.white,
        borderRadius: 15,
        marginHorizontal: 10,
        paddingBottom: 5,
        bottom: 15,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
});

export default MealPlanner;

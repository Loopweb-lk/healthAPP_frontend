import React from 'react';
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

function MealPlanner({ navigation }) {
    const mealData = {
        Friday: [
            { name: 'String Hoppers', detail: 'Rice Curry', calorie: '256', type: 'Pol Sambol' },
            { name: 'String Hoppers', detail: 'Rice Curry', calorie: '251', type: 'Pol Sambol' },
            { name: 'String Hoppers', detail: 'Rice Curry', calorie: '252', type: 'Pol Sambol' },
        ],
        Saturday: [
            { name: 'String Hoppers', detail: 'Rice Curry', calorie: '257', type: 'Pol Sambol' },
            { name: 'String Hoppers', detail: 'Rice Curry', calorie: '216', type: 'Pol Sambol' },
            { name: 'String Hoppers', detail: 'Rice Curry', calorie: '156', type: 'Pol Sambol' },
        ],
    };

    const renderMealCard = (meal, index) => (
        <View style={styles.mealCard} key={`${meal.name}-${meal.calorie}-${index}`}>
            <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealDetail}>{meal.detail}</Text>
                <Text style={styles.mealType}>{meal.type}</Text>
            </View>
            <View style={styles.calorieInfo}>
                <Text style={styles.calorieText}>{meal.calorie} Cal</Text>
            </View>
        </View>
    );

    const renderDaySection = (day, meals) => (
        <View style={styles.daySection} key={day}>
            <Text style={styles.dayTitle}>{day}</Text>
            {meals.map((meal, index) => renderMealCard(meal, index))}
            {meals.length > 0 && (
                <Text style={styles.totalCalories}>
                    Total Intake: {meals.reduce((sum, meal) => sum + parseInt(meal.calorie), 0)} Cal
                </Text>
            )}
        </View>
    );

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
                onPress={() => navigation.navigate('GroceryList')}
            >
                <Text style={styles.groceryButtonText}>Go to grocery list</Text>
            </TouchableOpacity>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="home" size={24} color={COLORS.icon_color} />
                    <Text style={styles.navText}>Home</Text>
                    <View
                        style={{
                            width: 40, // Width of the underline
                            height: 3,
                            backgroundColor: '#b4ddff',
                            marginTop: 4,
                            borderRadius: 1,
                            marginLeft: 1,
                            top: 0, // Move underline closer to the label
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="restaurant-outline" size={24} color="#666" />
                    <Text style={styles.navText}>Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MealPlanner')}>
                    <Ionicons name="fitness-outline" size={24} color="#666" />
                    <Text style={styles.navText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="water-outline" size={24} color="#666" />
                    <Text style={styles.navText}>Sugar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="stats-chart-outline" size={24} color="#666" />
                    <Text style={styles.navText}>Analytics</Text>
                </TouchableOpacity>
            </View>
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

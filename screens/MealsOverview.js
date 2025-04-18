import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';

function MealsOverview({ navigation }) {
    const [timeframe, setTimeframe] = useState('week');
    const screenWidth = Dimensions.get('window').width - 30;

    const calorieData = [
        { value: 30, label: 'SUN' },
        { value: 80, label: 'MON' },
        { value: 120, label: 'TUE' },
        {
            value: 68,
            label: 'WED',
            dataPointText: '68',
            showStrip: true,
            showDataPoint: true,
        },
        { value: 80, label: 'THU' },
        { value: 95, label: 'FRI' },
        { value: 90, label: 'SAT' },
    ];

    const calorieMonthData = [
        { value: 30, label: 'Week1' },
        { value: 30, label: 'Week2' },
        { value: 120, label: 'Week3' },
        {
            value: 68,
            label: 'Week4',
            dataPointText: '68',
            showStrip: true,
            showDataPoint: true,
        },
        { value: 80, label: 'Week5' },
        { value: 150, label: 'Week6' },
        { value: 25, label: 'Week7' },
    ];

    const sugarData = [
        { value: 20, label: 'SUN' },
        { value: 70, label: 'MON' },
        { value: 100, label: 'TUE' },
        {
            value: 98,
            label: 'WED',
            dataPointText: '75',
            showDataPoint: true,
        },
        { value: 65, label: 'THU' },
        { value: 90, label: 'FRI' },
        { value: 85, label: 'SAT' },
    ];

    const todaySummary = [
        { meal: 'Breakfast', calory: 68, sugar: 75 },
        { meal: 'Lunch', calory: 68, sugar: 75 },
    ];

    const monthlySummary = [
        { day: 'Monday', calory: 80, sugar: 70 },
        { day: 'Tuesday', calory: 100, sugar: 90 },
        { day: 'Wednesday', calory: 95, sugar: 85 },
        { day: 'Thursday', calory: 110, sugar: 100 },
        { day: 'Friday', calory: 120, sugar: 105 },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meals Overview</Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.timeframeSelector}>
                <TouchableOpacity
                    style={[
                        styles.timeframeButton,
                        timeframe === 'week' && styles.timeframeButtonActive,
                    ]}
                    onPress={() => setTimeframe('week')}>
                    <Text
                        style={[
                            styles.timeframeText,
                            timeframe === 'week' && styles.timeframeTextActive,
                        ]}>
                        This week
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.timeframeButton,
                        timeframe === 'month' && styles.timeframeButtonActive,
                    ]}
                    onPress={() => setTimeframe('month')}>
                    <Text
                        style={[
                            styles.timeframeText,
                            timeframe === 'month' && styles.timeframeTextActive,
                        ]}>
                        This Month
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.caloriesSection}>
                {timeframe === 'week' ? (
                    <LineChart
                        width={screenWidth}
                        height={180}
                        spacing={(screenWidth - 20) / (calorieData.length - 1)}
                        initialSpacing={10}
                        maxValue={200}
                        noOfSections={4}
                        yAxisColor="transparent"
                        xAxisColor="lightgray"
                        yAxisTextStyle={{ color: 'gray' }}
                        xAxisLabelTextStyle={{ color: 'gray', fontSize: 10 }}
                        yAxisLabelWidth={0}
                        hideYAxisText
                        rulesColor="rgba(200, 200, 200, 0.6)"
                        rulesType="dashed"
                        xAxisIndicesHeight={10}
                        data={calorieData}
                        data2={sugarData}
                        data2Color="#F47174"
                        color="#40B4F7"
                        thickness={2}
                        data2Thickness={2}
                        curved
                        showDataPoint
                        dataPointColor="#40B4F7"
                        dataPointRadius={4}
                        data2PointColor="#F47174"
                        data2PointRadius={4}
                        showStripOnDataPoint
                        stripColor="lightgray"
                        stripHeight={160}
                    />
                ) : (
                    <LineChart
                        width={screenWidth}
                        height={180}
                        spacing={(screenWidth - 20) / (calorieData.length - 1)}
                        initialSpacing={10}
                        maxValue={200}
                        noOfSections={4}
                        yAxisColor="transparent"
                        xAxisColor="lightgray"
                        yAxisTextStyle={{ color: 'gray' }}
                        xAxisLabelTextStyle={{ color: 'gray', fontSize: 10 }}
                        yAxisLabelWidth={0}
                        hideYAxisText
                        rulesColor="rgba(200, 200, 200, 0.6)"
                        rulesType="dashed"
                        xAxisIndicesHeight={10}
                        data={calorieMonthData}
                        data2={sugarData}
                        data2Color="#F47174"
                        color="#40B4F7"
                        thickness={2}
                        data2Thickness={2}
                        curved
                        showDataPoint
                        dataPointColor="#40B4F7"
                        dataPointRadius={4}
                        data2PointColor="#F47174"
                        data2PointRadius={4}
                        showStripOnDataPoint
                        stripColor="lightgray"
                        stripHeight={160}
                    />
                )}
            </View>

            <View style={styles.row}>
                <Text style={styles.caloriesTitle}>Calory Level</Text>
                <Text style={styles.vs}> vs </Text>
                <Text style={styles.caloriesTotal}>Sugar Level</Text>
            </View>

            <ScrollView style={styles.activitiesList}>
                {timeframe === 'week' ? (
                    <>
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryHeader}>
                                <Text style={styles.summaryTitle}>Today's Summary</Text>
                                <View style={styles.legendContainer}>
                                    <Text style={styles.caloryLegend}>Calory</Text>
                                    <Text style={styles.sugarLegend}>Sugar</Text>
                                </View>
                            </View>

                            {todaySummary.map((item, index) => (
                                <View key={index} style={styles.mealItem}>
                                    <Text style={styles.mealName}>{item.meal}</Text>
                                    <Text style={styles.caloryValue}>{item.calory}</Text>
                                    <Text style={styles.sugarValue}>{item.sugar}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.bloodSugarCard}>
                            <Text style={styles.bloodSugarText}>
                                Blood sugar is in <Text style={styles.idealText}>ideal</Text> range.
                            </Text>
                            <Text style={styles.healthAdvice}>
                                A male should limit his daily sugar intake to 36 grams (9 teaspoons) to
                                maintain optimal health.
                            </Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryHeader}>
                                <Text style={styles.summaryTitle}>Weekdays Summary</Text>
                                <View style={styles.legendContainer}>
                                    <Text style={styles.caloryLegend}>Calory</Text>
                                    <Text style={styles.sugarLegend}>Sugar</Text>
                                </View>
                            </View>

                            {monthlySummary.map((item, index) => (
                                <View key={index} style={styles.mealItem}>
                                    <Text style={styles.mealName}>{item.day}</Text>
                                    <Text style={styles.caloryValue}>{item.calory}</Text>
                                    <Text style={styles.sugarValue}>{item.sugar}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.bloodSugarCard}>
                            <Text style={styles.bloodSugarText}>
                                Blood sugar is in <Text style={styles.idealText}>ideal</Text> range.
                            </Text>
                            <Text style={styles.healthAdvice}>
                                A male should limit his daily sugar intake to 36 grams (9 teaspoons) to
                                maintain optimal health.
                            </Text>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    timeframeSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    timeframeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 6,
    },
    timeframeButtonActive: {
        backgroundColor: '#1875C3',
    },
    timeframeText: {
        color: '#888',
        fontWeight: '500',
    },
    timeframeTextActive: {
        color: 'white',
    },
    caloriesSection: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    caloriesTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3ABADD',
    },
    caloriesTotal: {
        fontSize: 14,
        fontWeight: '500',
        color: '#EF8B8B',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    vs: {
        fontSize: 16,
        fontWeight: '500',
        color: '#888',
    },
    activitiesList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    legendContainer: {
        flexDirection: 'row',
        gap: 16,
        marginRight: 25,
    },
    caloryLegend: {
        color: '#40B4F7',
        fontWeight: '600',
        marginRight: 30,
    },
    sugarLegend: {
        color: '#F47174',
        fontWeight: '600',
    },
    mealItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f0f0f0',
    },
    mealName: {
        flex: 2,
        fontWeight: '400',
        color: '#333',
    },
    caloryValue: {
        flex: 1,
        textAlign: 'center',
        color: '#40B4F7',
    },
    sugarValue: {
        flex: 1,
        textAlign: 'center',
        color: '#F47174',
    },
    bloodSugarCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    bloodSugarText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    idealText: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    healthAdvice: {
        color: '#666',
        lineHeight: 20,
        fontSize: 14,
    },
    summaryTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
});

export default MealsOverview;

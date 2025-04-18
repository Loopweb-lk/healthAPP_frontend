import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';

function ActivityOverview({ navigation }) {
  const [timeframe, setTimeframe] = useState('week');

  const screenWidth = Dimensions.get('window').width - 70;

  // Chart data for react-native-gifted-charts
  const lineData = [
    { value: 150, label: 'SUN' },
    { value: 220, label: 'MON' },
    { value: 260, label: 'TUE' },
    { value: 290, label: 'WED', showVerticalLine: true },
    { value: 350, label: 'THU' },
    { value: 330, label: 'FRI' },
    { value: 300, label: 'SAT' },
  ];

  // Sample data for calorie and sugar chart (replace these with real data)
  const calorieData = [
    { value: 150, label: 'SUN' },
    { value: 200, label: 'MON' },
    { value: 250, label: 'TUE' },
    { value: 220, label: 'WED' },
    { value: 280, label: 'THU' },
    { value: 300, label: 'FRI' },
    { value: 270, label: 'SAT' },
  ];

  const sugarData = [
    { value: 50, label: 'SUN' },
    { value: 60, label: 'MON' },
    { value: 70, label: 'TUE' },
    { value: 65, label: 'WED' },
    { value: 75, label: 'THU' },
    { value: 80, label: 'FRI' },
    { value: 55, label: 'SAT' },
  ];

  const calorieMonthData = [
    { value: 1500, label: 'Week 1' },
    { value: 1800, label: 'Week 2' },
    { value: 2000, label: 'Week 3' },
    { value: 1700, label: 'Week 4' },
  ];

  const activityData = [
    { day: 'Monday', activities: [{ type: 'Running', duration: '30 Minutes', calories: 50 }, { type: 'Yoga', duration: '20 Minutes', calories: 50 }] },
    { day: 'Tuesday', activities: [{ type: 'Running', duration: '40 Minutes', calories: 50 }] },
    { day: 'Wednesday', activities: [{ type: 'Running', duration: '35 Minutes', calories: 50 }] },
    { day: 'Friday', activities: [{ type: 'Cycling', duration: '30 Minutes', calories: 25 }, { type: 'Yoga', duration: '25 Minutes', calories: 55 }] },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity Overview</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.timeframeSelector}>
        <TouchableOpacity
          style={[styles.timeframeButton, timeframe === 'week' && styles.timeframeButtonActive]}
          onPress={() => setTimeframe('week')}
        >
          <Text style={[styles.timeframeText, timeframe === 'week' && styles.timeframeTextActive]}>This week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.timeframeButton, timeframe === 'month' && styles.timeframeButtonActive]}
          onPress={() => setTimeframe('month')}
        >
          <Text style={[styles.timeframeText, timeframe === 'month' && styles.timeframeTextActive]}>This Month</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.caloriesSection}>
        <Text style={styles.caloriesTitle}>Calories Burned</Text>
        <Text style={styles.caloriesTotal}>1,840 kcal</Text>

        <View style={styles.caloriesSection}>
          {timeframe === 'week' ? (
            <LineChart
              width={screenWidth}
              height={180}
              spacing={(screenWidth - 20) / (calorieData.length - 1)}
              initialSpacing={10}
              maxValue={400}
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
              spacing={(screenWidth - 20) / (calorieMonthData.length - 1)}
              initialSpacing={10}
              maxValue={2500}
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
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Weekly Summary</Text>
        <ScrollView style={styles.activitiesList}>
          {activityData.map((dayData, index) => (
            <View key={index} style={styles.daySection}>
              <Text style={styles.dayText}>{dayData.day}</Text>
              {dayData.activities.map((activity, activityIndex) => (
                <View key={activityIndex} style={styles.activityItem}>
                  <View style={styles.activityIconContainer}>
                    <Ionicons
                      name={activity.type === 'Running' ? 'walk-outline' :
                        activity.type === 'Cycling' ? 'bicycle-outline' : 'body-outline'}
                      size={20}
                      color="white"
                    />
                  </View>
                  <View style={styles.activityDetails}>
                    <Text style={styles.activityType}>{activity.type}</Text>
                    <Text style={styles.activityDuration}>{activity.duration}</Text>
                  </View>
                  <View style={styles.caloriesInfo}>
                    <Text style={styles.caloriesAmount}>{activity.calories} Cal</Text>
                    <Text style={styles.caloriesBurned}>Calories Burnt</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  timeframeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  timeframeButtonActive: {
    backgroundColor: '#1875C3',
    color: 'black',
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
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#666',
  },
  caloriesTotal: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginTop: 4,
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  activitiesList: {
    flex: 1,
  },
  daySection: {
    marginBottom: 16,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1875C3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityDetails: {
    flex: 1,
    marginLeft: 12,
  },
  activityType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activityDuration: {
    fontSize: 14,
    color: '#888',
  },
  caloriesInfo: {
    alignItems: 'flex-end',
  },
  caloriesAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  caloriesBurned: {
    fontSize: 12,
    color: '#888',
  },
});

export default ActivityOverview;

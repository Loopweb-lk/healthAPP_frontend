
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-gifted-charts';

function ActivityOverview({ navigation }) {
  const [timeframe, setTimeframe] = useState('week');
  
  const screenWidth = Dimensions.get('window').width - 40;
  
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
  
  const activityData = [
    { day: 'Monday', activities: [{type: 'Running', duration: '30 Minutes', calories: 50}, {type: 'Yoga', duration: '20 Minutes', calories: 50}] },
    { day: 'Tuesday', activities: [{type: 'Running', duration: '40 Minutes', calories: 50}] },
    { day: 'Wednesday', activities: [{type: 'Running', duration: '35 Minutes', calories: 50}] },
    { day: 'Friday', activities: [{type: 'Cycling', duration: '30 Minutes', calories: 25}, {type: 'Yoga', duration: '25 Minutes', calories: 55}] },
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
        
        <View style={styles.chartContainer}>
          <Text style={styles.chartHighlight}>300kcal</Text>
          <LineChart
            data={lineData}
            width={screenWidth}
            height={180}
            spacing={screenWidth / 8}
            initialSpacing={10}
            color="#1875C3"
            thickness={2}
            maxValue={400}
            noOfSections={4}
            curved
            hideDataPoints
            yAxisColor="transparent"
            xAxisColor="lightgray"
            yAxisTextStyle={{color: 'gray'}}
            xAxisLabelTextStyle={{color: 'gray', fontSize: 10}}
            yAxisTextNumberOfLines={1}
            yAxisLabelWidth={0}
            hideYAxisText
            rulesColor="rgba(200, 200, 200, 0.6)"
            rulesType="dashed"
            xAxisIndicesHeight={10}
            customDataPoint={() => null}
            pointerConfig={{
              pointerStripHeight: 160,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              pointerColor: '#1875C3',
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              pointerLabelComponent: () => null,
              activatePointersOnLongPress: false,
              autoAdjustPointerLabelPosition: false,
              stripOverPointer: true,
            }}
          />
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

      {/* <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="restaurant-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="bicycle" size={24} color="#4169E1" />
          <Text style={[styles.tabText, styles.tabTextActive]}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="water-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Water</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="stats-chart-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Analytics</Text>
        </TouchableOpacity>
      </View> */}
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
  chartContainer: {
    marginTop: 16,
    position: 'relative',
  },
  chartHighlight: {
    position: 'absolute', 
    top: 40,
    right: 60,
    color: '#1875C3',
    fontWeight: '600',
    zIndex: 1,
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  tabTextActive: {
    color: '#4169E1',
  },
});

export default ActivityOverview;
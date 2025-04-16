import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function SugarHistory({ navigation }) {
  const sugarRecords = [
    {
      id: '1',
      date: '2024-12-25',
      level: '100',
      timing: 'Dinner',
      notes: '',
    },
    {
      id: '2',
      date: '2024-12-26',
      level: '100',
      timing: 'Dinner',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque varius turpis id vehicula faucibus. Vestibulum.',
    },
    {
      id: '3',
      date: '2024-12-28',
      level: '100',
      timing: 'Dinner',
      notes: '',
    },
    {
      id: '4',
      date: '2024-12-29',
      level: '100',
      timing: 'Dinner',
      notes: '',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sugar History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {sugarRecords.map((item) => (
          <View key={item.id} style={styles.recordCard}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.recordRow}>
              <Text style={styles.labelText}>Sugar level</Text>
              <Text style={styles.valueText}>: {item.level}</Text>
            </View>
            <View style={styles.recordRow}>
              <Text style={styles.labelText}>Before</Text>
              <Text style={styles.valueText}>: {item.timing}</Text>
            </View>
            {item.notes ? (
              <Text style={styles.notesText}>{item.notes}</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New Record</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={22} color="#9e9e9e" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="restaurant-outline" size={22} color="#9e9e9e" />
          <Text style={styles.tabLabel}>Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="fitness-outline" size={22} color="#9e9e9e" />
          <Text style={styles.tabLabel}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="water-outline" size={22} color="#2196F3" />
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Sugar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="bar-chart-outline" size={22} color="#9e9e9e" />
          <Text style={styles.tabLabel}>Analytics</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F8',
    padding: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: '#F5F5F8',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  recordCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  recordRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 14,
    color: '#757575',
    width: 80,
  },
  valueText: {
    fontSize: 14,
    color: '#212121',
  },
  notesText: {
    fontSize: 14,
    marginTop: 6,
    color: '#212121',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  addButton: {
    backgroundColor: '#1875C3',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#9e9e9e',
  },
  activeTabLabel: {
    color: '#2196F3',
  },
});

export default SugarHistory;
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Walking({ route, navigation }) {
  const { id, activity, icon, rate } = route.params;
  const [isPaused, setIsPaused] = useState(true);
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const stoped = async () => {
    const TotalRate = Number((rate * timeInSeconds).toFixed(2));
    navigation.navigate('WalkingTrackEnd',
      {
        id: id,
        activity: activity,
        icon: icon,
        rate: rate,
        totalRate: TotalRate,
        time: timeInSeconds
      });
  };

  const refresh = () => {
    setTimeInSeconds(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Activity</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Activity Title */}
      <Text style={styles.activityTitle}>{activity}</Text>

      {/* Runner Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={icon}
          style={styles.illustration}
        />
      </View>

      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(timeInSeconds)}</Text>
        <Text style={styles.timerSubtext}>20 more minutes to reach daily average</Text>
      </View>

      {/* Pause/Play Button */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>

        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => refresh()}
        >
          <Ionicons name="refresh" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setIsPaused(!isPaused)}
        >
          <Ionicons name={isPaused ? "play" : "pause"} size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stopButton}
          onPress={() => stoped()}
        >
          <Ionicons name="stop" size={30} color="white" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    marginTop: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  placeholder: {
    width: 24,
  },
  activityTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 350,
  },
  illustration: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: -10,
  },
  timer: {
    fontSize: 68,
    fontWeight: 'bold',
    color: '#1875C3',
  },
  timerSubtext: {
    fontSize: 17,
    color: '#666',
    marginTop: 8,
  },
  pauseButton: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#1875C3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },

  stopButton: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#C31818FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default Walking;

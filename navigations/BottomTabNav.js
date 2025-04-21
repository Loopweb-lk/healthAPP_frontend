import { View, Text } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Ionicons
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants";
import { Create, Home, Meals, Profile, Settings } from "../screens";
import Feather from "react-native-vector-icons/Feather"; // Import Feather icons
import ActivityOverview from "../screens/ActivityOverview";
import RecordSugar from "../screens/RecordSugar";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: true, // Enable labels
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 15,
    right: 0,
    left: 0,
    elevation: 0,
    height: 79, // Adjust height for better spacing
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginHorizontal: 10,
    paddingBottom: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginTop: -5,
  },
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Feather
                name="home"
                size={30}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 10, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 11, // Move label closer to the icon
                  marginLeft: 7, // Move label closer to the icon
                }}
              >
                Home
              </Text>
              {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Meals"
        component={Meals}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Ionicons name="restaurant-outline"
                size={28}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 7, // Move label closer to the icon
                }}
              >
                Meals
              </Text>
              {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Ionicons name="fitness-outline"
                size={28}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 7, // Move label closer to the icon
                }}
              >
                Exercise
              </Text>
              {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="RecordSugar"
        component={RecordSugar}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Ionicons name="water-outline"
                size={28}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 7, // Move label closer to the icon
                }}
              >
                Sugar
              </Text>
              {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ActivityOverview"
        component={ActivityOverview}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Ionicons name="stats-chart-outline" 
                size={28}
                color={COLORS.icon_color}
                style={{
                  position: "absolute",
                  top: 11, // Move icon closer to the middle
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View>
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  fontSize: 10,
                  top: 10, // Move label closer to the icon
                  marginLeft: 7, // Move label closer to the icon
                }}
              >
                Analytics
              </Text>
              {focused && (
                <View
                  style={{
                    width: 40, // Width of the underline
                    height: 3,
                    backgroundColor: '#b4ddff',
                    marginTop: 4,
                    borderRadius: 1,
                    marginLeft: 1,
                    top: 8, // Move underline closer to the label
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
